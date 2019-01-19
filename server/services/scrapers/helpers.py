import re


def remove_whitespace_and_newline_chars(string):
    """ Remove two or more spaces and new-line characters """
    return re.sub(r"\s{2,}|\n", "", string)
