from config.env import POSTGRES_URI

class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = POSTGRES_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False # remove annoying logs

class ProductionConfig(Config):
    ENV = 'production'
    # SQLALCHEMY_DATABASE_URI = 'postgresql://localdev:Assword@localhost:5433/mealprep'

class DevelopmentConfig(Config):
    ENV = 'development'
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
