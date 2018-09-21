from flask import current_app

def server_log(message, type='info'):
    if current_app and current_app.logger:
        if type == 'error':
            current_app.logger.error(message)
        elif type == 'debug':
            current_app.logger.debug(message)
        else:
            current_app.logger.info(message)
    else:
        print('{}: {}'.format(type.upper(), message))
