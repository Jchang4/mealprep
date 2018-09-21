from flask import jsonify

def create_request(code, **kwargs):
    res = jsonify(kwargs)
    res.status_code = code
    return res

# Success
# ------------------
def GenericSuccessResponse(**kwargs):
    """ Return 200 with data (optional) """
    return create_request(200, **kwargs)

def CreatedNewItemResponse(**kwargs):
    """ Return 201 with data (optional) """
    return create_request(201, **kwargs)


# Errors
# ------------------
def NotFoundResponse(message, **kwargs):
    """ Return 404 error with message and data (optional) """
    return create_request(404, **{**kwargs, 'message': message})

def BadRequestResponse(message, **kwargs):
    """ Return 400 error with message and data (optional) """
    return create_request(400, **{**kwargs, 'message': message})

def ServerErrorResponse(exception, message, **kwargs):
    """ Return 500 error with message and data (optional) """
    return create_request(500, **{**kwargs,
                                'message': (str(exception) or repr(exception) or message) })
