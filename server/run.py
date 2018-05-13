from config.env import log_env, SERVICE_HOST, SERVICE_PORT
from mealprep.mealprep import app

if __name__ == '__main__':
    log_env()

    app.run(host=SERVICE_HOST, port=SERVICE_PORT)
