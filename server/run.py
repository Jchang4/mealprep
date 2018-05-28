from config.env import log_env, SERVICE_HOST, SERVICE_PORT
from mealprep.mealprep import create_app

if __name__ == '__main__':
    log_env()
    app = create_app()
    app.run(host=SERVICE_HOST, port=SERVICE_PORT)
