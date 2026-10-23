import logging
import os
import secrets

from flask import Flask
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.middleware.proxy_fix import ProxyFix

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger(__name__)

MAX_UPLOAD_BYTES = 5 * 1024 * 1024  # total request size cap (form + logo)

# NOTE: default in-memory storage is per-process. With gunicorn's multiple
# workers (see Dockerfile CMD), each worker tracks its own counters, so
# configured limits (e.g. 10/min) are enforced approximately per-worker,
# not exactly/globally across the whole app — roughly workers-times looser
# than configured, and counters reset on every deploy/restart.
limiter = Limiter(key_func=get_remote_address, default_limits=[])


def create_app():
    app = Flask(__name__)

    secret_key = os.getenv("SECRET_KEY")
    if not secret_key:
        # Don't take the whole service down over a missing env var — fall back to a
        # random key generated at boot. This is still far safer than a hardcoded
        # shared default, it just won't survive a restart (no session/CSRF feature
        # currently depends on that). Set SECRET_KEY in the environment to fix properly.
        secret_key = secrets.token_hex(32)
        logger.warning(
            "SECRET_KEY is not set — using a random per-process key. "
            "Set SECRET_KEY in the environment for stable sessions across restarts."
        )
    app.secret_key = secret_key

    app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_BYTES

    # Render terminates TLS and proxies into the container over exactly one
    # hop, so request.remote_addr would otherwise be Render's proxy address
    # for every visitor (collapsing everyone into one rate-limit bucket).
    # x_for=1 trusts exactly one hop of X-Forwarded-For — trusting more hops
    # than actually exist would let a client spoof its own IP via that
    # header, so this value must track the real proxy topology, not be
    # bumped up "to be safe".
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)

    limiter.init_app(app)

    # The public generator never touches the database, so it keeps working
    # without DATABASE_URL (e.g. `python run.py` on its own); only the
    # management panel and /healthz/db need it.
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        from .extensions import db, migrate, normalize_database_url
        app.config["SQLALCHEMY_DATABASE_URI"] = normalize_database_url(database_url)
        app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True}
        db.init_app(app)
        migrate.init_app(app, db)
    else:
        logger.warning("DATABASE_URL is not set — database features are disabled.")

    from .routes import main
    app.register_blueprint(main)

    return app
