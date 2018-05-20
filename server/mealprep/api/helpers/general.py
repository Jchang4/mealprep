
def can_be_float(number):
    try:
        float(number)
        return True
    except:
        return False
