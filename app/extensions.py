from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()


def normalize_database_url(url: str) -> str:
    """SQLAlchemy needs the driver in the scheme to use psycopg 3; accept the
    plain postgres:// / postgresql:// forms most hosts and docs hand out."""
    for prefix in ("postgres://", "postgresql://"):
        if url.startswith(prefix):
            return "postgresql+psycopg://" + url[len(prefix):]
    return url
