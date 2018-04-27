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

class LabelSelector extends Component {

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
