from .helpers import is_valid_unit, get_largest_unit
from .conversions_map import CONVERSIONS_AMERICAN

def convert_from_to(from_unit, to_unit, quantity):
    """ Convert quantity from one unit to another
        Both units must be valid otherwise throw a ValueError
    """
    if not is_valid_unit(from_unit):
        raise ValueError('Invalid from_unit: {}. Cannot convert.'.format(from_unit))
    if not is_valid_unit(to_unit):
        raise ValueError('Invalid to_unit: {}. Cannot convert.'.format(to_unit))
    return quantity * CONVERSIONS_AMERICAN[from_unit][to_unit]

def combine_to_largest(unit_one, quant_one, unit_two, quant_two):
    """ Combine quantities to the largest unit
        i.e. if the units are teaspoon and cups, use cups
                              cups and gallons,  use gallons

        Return: <tuple> (unit, quantity)
    """
    unit = get_largest_unit([unit_one, unit_two])
    final_quant = 0

    if unit == unit_one:
        final_quant = quant_one
        final_quant += convert_from_to(unit_two, unit_one, quant_two)
    else:
        final_quant = quant_two
        final_quant += convert_from_to(unit_one, unit_two, quant_one)
    return unit, final_quant
