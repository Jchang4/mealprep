import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectedLabel: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
  onLabelSelect: PropTypes.func,
};

const defaultProps = {
  selectedLabel: '',
  onLabelSelect: () => {},
};

// Keycodes from 1-9
// Reference: https://css-tricks.com/snippets/javascript/javascript-keycodes/
const KEYCODE_MAP = [49, 50, 51, 52, 53, 54, 55, 56, 57];

class LabelSelector extends Component {

  labelEls = [];

  componentDidMount() {
    this.addAllEventListeners();
  }

  componentWillUnmount() {
    this.labelEls.forEach((label, i) => {
      document.removeEventListener('keypress', this.addEventListener(label, i), false);
    });
  }

  /* Add button listeners to each label option
  * Keys are assigned in order, 1-9
  */
  addAllEventListeners() {
    this.labelEls.forEach((label, i) => {
      document.addEventListener('keypress', this.addEventListener(label, i), false);
    });
  }

  addEventListener(label, idx) {
    const { onLabelSelect } = this.props;

    function eventHandler(e) {
      if (e.keyCode === KEYCODE_MAP[idx]) {
        onLabelSelect(label.name, label.color);
      }
    }

    return eventHandler;
  }

  render() {
    const {
      selectedLabel,
      labels,
      onLabelSelect
    } = this.props;

    return (
      <div className="LabelSelector">

        {labels.map((label,i) => (
          <div
            key={i}
            ref={n => (this.labelEls.push({el: n, name: label.name, color: label.color}))}
            className={`LabelSelector_group ${(label.name === selectedLabel) ? 'selected' : ''}`}
          >
            <div className="LabelSelector_name">
              {label.name}
            </div>
            <div
              className="LabelSelector_circle hover"
              style={{ background: label.color }}
              onClick={(e) => onLabelSelect(label.name, label.color)}
            ></div>
          </div>
        ))}

      </div>
    );
  }
}

LabelSelector.propTypes = propTypes;
LabelSelector.defaultProps = defaultProps;

export default LabelSelector;
