
class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://justin:guitar1@localhost:5432/mealprep'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    ENV = 'production'
    SQLALCHEMY_DATABASE_URI = 'postgresql://justin:letsdoit1@localhost:5433/mealprep'

class DevelopmentConfig(Config):
    ENV = 'development'
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
