from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from mealprep.mealprep import app

# Default App Config
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://justin:guitar1@localhost:5432/mealprep' # local
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://justin:letsdoit1@localhost:5433/mealprep' # mealprep

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models
from mealprep.models.profile import Profile
