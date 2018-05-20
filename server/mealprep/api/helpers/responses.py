from flask import jsonify



def create_request(status_code, message=None, other_data={}):
    res = { **other_data }
    if message:
        res['message'] = message
    res = jsonify(res)
    res.status_code = status_code
    return res


# Success
# ------------------
def GenericSuccessResponse(**kwargs):
    """ Return 200 with data (optional) """
    return create_request(200, other_data=kwargs)

def CreatedNewItemResponse():
    """ Return 201 with data (optional) """
    return create_request(201, other_data=kwargs)


# Errors
# ------------------
def NotFound(message, **kwargs):
    """ Return 404 error with message and data (optional) """
    return create_request(404, message, kwargs)

def BadRequest(message, **kwargs):
    """ Return 400 error with message and data (optional) """
    return create_request(400, message, kwargs)

def ServerError(message, **kwargs):
    """ Return 500 error with message and data (optional) """
    return create_request(400, message, kwargs)
