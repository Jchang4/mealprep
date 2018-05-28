#!/usr/bin/env python3
import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from mealprep.mealprep import create_app
from mealprep.models import create_db

os.environ['FLASK_APP'] = 'manage.py'

app = create_app()
db = create_db(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
