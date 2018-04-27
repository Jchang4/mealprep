from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flaskr.flaskr import app

# Default App Config
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://justin:guitar1@localhost:5432/flaskrtest' # local
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://justin:letsdoit1@localhost:5433/flaskrtest' # mealprep

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models
from flaskr.models.profile import Profile
