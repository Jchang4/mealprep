import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  tabIndex: PropTypes.number,
  word: PropTypes.string.isRequired,
  wordIdx: PropTypes.number.isRequired,
  selectedColor: PropTypes.string,
  highlight: PropTypes.string,
  onClick: PropTypes.func,
};
const defaultProps = {
  selectedColor: '',
  highlight: '',
  onClick: () => {},
};

class SelectWord extends Component {

  state = {
    hovered: false
  }

  handleMouseEnter(e) {
    this.setState({ hovered: true });
  }

  handleMouseLeave(e) {
    this.setState({ hovered: false });
  }

  render() {
    const {
      word,
      wordIdx,
      selectedColor,
      highlight,
      onClick,
    } = this.props;

    const { hovered } = this.state;

    return (
      <div
        className="SelectWord"
        style={{ backgroundColor: (hovered) ? highlight : selectedColor }}
        onClick={(e) => onClick(wordIdx, word)}
        onMouseOver={(e) => this.handleMouseEnter(e)}
        onMouseLeave={(e) => this.handleMouseLeave(e)}
      >
        {word}
      </div>
    );
  }
}

SelectWord.propTypes = propTypes;
SelectWord.defaultProps = defaultProps;

export default SelectWord;
