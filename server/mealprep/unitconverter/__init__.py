

conversions_american = {
    'teaspoon': {
        'teaspoon': 1.0,
        'tablespoon': 0.333333,
        'cup': 0.0205372,
        'pint': 0.0104167,
        'ounce': 0.166667,
        'quart': 0.00520833,
        'gallon': 0.00130208,
        'liter': 0.00492892,
    },
    'tablespoon': {
        'teaspoon': 3.0,
        'tablespoon': 1.0,
        'cup': 0.0616115,
        'pint': 0.03125,
        'ounce': 0.5,
        'quart': 0.015625,
        'gallon': 0.00390625,
        'liter': 0.0147868,
    },
    'cup': {
        'teaspoon': 48.6922,
        'tablespoon': 16.2307,
        'cup': 1.0,
        'pint': 0.50721,
        'ounce': 8.11537,
        'quart': 0.253605,
        'gallon': 0.0634013,
        'liter': 0.24,
    },
    'pint': {
        'teaspoon': 96.0,
        'tablespoon': 32.0,
        'cup': 1.97157,
        'pint': 1.0,
        'ounce': 16.0,
        'quart': 0.5,
        'gallon': 0.125,
        'liter': 0.473176,
    },
    'ounce': {
        'teaspoon': 6.0,
        'tablespoon': 2.0,
        'cup': 0.123223,
        'pint': 0.0625,
        'ounce': 1.0,
        'quart': 0.03125,
        'gallon': 0.0078125,
        'liter': 0.0295735,
    },
    'quart': {
        'teaspoon': 192.0,
        'tablespoon': 64.0,
        'cup': 3.94314,
        'pint': 2.0,
        'ounce': 32.0,
        'quart': 1.0,
        'gallon': 0.25,
        'liter': 0.946353,
    },
    'liter': {
        'teaspoon': 202.884,
        'tablespoon': 67.628,
        'cup': 4.16667,
        'pint': 2.11338,
        'ounce': 33.814,
        'quart': 1.05669,
        'liter': 1.0,
        'gallon': 0.264172,
    },
    'gallon': {
        'teaspoon': 768.0,
        'tablespoon': 256.0,
        'cup': 15.7725,
        'pint': 8.0,
        'ounce': 128.0,
        'quart': 4.0,
        'liter': 3.78541,
        'gallon': 1.0,
    },
}

conversions_metric = {

}


def convert_unit(quantity, from_unit, to_unit):
    """ Convert one unit to another

        Unit options: 'teaspoon', 'tablespoon', 'cup', 'pint', 'ounce', 'quart', 'liter', 'gallon'
    """
    if not conversions_american.get(from_unit):
        raise ValueException('Invalid "from_unit".')
    if not conversions_american[from_unit].get(to_unit):
        raise ValueException('Invalid "to_unit".')
    return quantity * conversions_american[from_unit][to_unit]















if __name__ == '__main__':
    import random

    units = list(conversions_american.keys())
    print(units)

    def get_rand_unit(exclude=''):
        r = random.randint(0, len(units)-1)
        while units[r] == exclude:
            r = random.randint(0, len(units)-1)
        return units[r]

    for i in range(10):
        rand_quant = random.uniform(0.1,15)
        rand_unit1 = get_rand_unit()
        rand_unit2 = get_rand_unit(exclude=rand_unit1)
        convert = convert_unit(rand_quant, rand_unit1, rand_unit2)
        print('from: {} {}'.format(round(rand_quant, 4), rand_unit1))
        print('to:   {} {}'.format(round(convert, 4), rand_unit2))
        print()
