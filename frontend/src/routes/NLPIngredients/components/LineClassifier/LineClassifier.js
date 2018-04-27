import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { red500 } from 'material-ui/styles/colors';
import SelectWord from '../SelectWord';
import ActionDelete from 'material-ui/svg-icons/action/delete';


const propTypes = {
  ingredient: PropTypes.shape({
    original: PropTypes.string,
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  hightlight: PropTypes.string,
  onWordClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

const defaultProps = {
  hightlight: '',
  onWordClick: () => {},
  onDeleteClick: () => {},
};

class LineClassifier extends Component {
  render() {
    const {
      ingredient,
      hightlight,
      onWordClick,
      onDeleteClick,
    } = this.props;

    return (
      <div>
        <div className="LineClassifier flex-center text-center">
          {ingredient.words.map((word,i) => (
            <SelectWord
              key={i}
              word={word}
              wordIdx={i}
              selectedColor={(ingredient[word+i] && ingredient[word+i].color)
                  ? ingredient[word+i].color
                  : ''}
              highlight={hightlight}
              onClick={(i, w) => onWordClick(i, w)}
            />
          ))}

          <div
            className="LineClassifier_delete flex-center"
            style={{ alignItems: 'center' }}
            onClick={() => onDeleteClick()}
          >
            <ActionDelete  style={{width: '25px', height: '25px', color: red500}} />
          </div>
        </div>
      </div>
    );
  }
}

LineClassifier.propTypes = propTypes;
LineClassifier.defaultProps = defaultProps;

export default LineClassifier;
