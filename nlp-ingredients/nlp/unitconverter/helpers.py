import operator
from .conversions_map import CONVERSIONS_AMERICAN, UNITS

def is_valid_unit(u):
    if u in UNITS:
        return True
    return False


# Sorted units from largest to smallest
SORTED_UNITS = [name for name,_ in sorted(CONVERSIONS_AMERICAN.items(),
                      key=lambda x: x[1]['gallon'],
                      reverse=True)]
def get_largest_unit(units):
    """ Returns largest unit in units

        :param units list<string> : list of units, i.e. ['teaspoon', 'tablespoon', 'cup']
    """
    for u in SORTED_UNITS:
        if u in units:
            return u
    return None
