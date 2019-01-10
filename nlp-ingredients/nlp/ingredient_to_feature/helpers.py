import re


def is_punctuation(s):
    return s in ('(', ')',
                 '[', ']',
                 '!', '.',
                 ',', '&',
                 '*')


def is_number(s):
    try:
        float(s)
        return True
    except:
        return False


def fractions_to_floats(line):
    """ Change all fractions to floats """
    has_two_fractions = re.compile(
        r'(\d+)\s+(\d+)/(\d+)')  # i.e. 1 1/8 => 1.13
    has_one_fraction = re.compile(r'(\d+)/(\d+)')          # i.e. 1/2   => 1.5
    # i.e. 16, 2 => 16.0, 2.0
    one_number = re.compile(r'\d+^.')

    def has_two_handler(n):
        fraction = float(n.group(2)) / float(n.group(3))
        num = float(n.group(1)) + fraction
        return str(round(num, 2))

    def has_one_handler(n):
        fraction = float(n.group(1)) / float(n.group(2))
        return str(round(fraction, 2))

    def one_number_handler(n):
        return str(n.group(0) + '.0')

    if has_two_fractions.search(line):
        return has_two_fractions.sub(has_two_handler, line)
    elif has_one_fraction.search(line):
        return has_one_fraction.sub(has_one_handler, line)
    elif one_number.search(line):
        return one_number.sub(one_number_handler, line)
    else:
        return line
