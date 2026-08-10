import logging
import os

from flask import Flask
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)

MAX_UPLOAD_BYTES = 5 * 1024 * 1024  # total request size cap (form + logo)

limiter = Limiter(key_func=get_remote_address, default_limits=[])


def create_app():
    app = Flask(__name__)

    secret_key = os.getenv("SECRET_KEY")
    if not secret_key:
        if os.getenv("FLASK_ENV") == "production":
            raise RuntimeError("SECRET_KEY must be set when FLASK_ENV=production.")
        secret_key = "dev-secret"
    app.secret_key = secret_key

    app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_BYTES

    limiter.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    return app
