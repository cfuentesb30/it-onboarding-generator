import logging
import os
import secrets

from flask import Flask
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger(__name__)

MAX_UPLOAD_BYTES = 5 * 1024 * 1024  # total request size cap (form + logo)

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

    limiter.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    return app
