import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import ActionArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ActionArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const propTypes = {
  pageNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onNextClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
};

const defaultProps = {

};

class PagingButtons extends Component {
  render() {
    const {
      pageNumber,
      totalPages,
      onPrevClick,
      onNextClick,
    } = this.props;

    return (
      <div className="PagingButtons">
        <div className="flex-center" style={{justifyContent: 'space-between'}}>
          <div className="PagingButtons_arrow" onClick={() => onPrevClick()}>
            <ActionArrowBack />
          </div>
          <div>
            Page {pageNumber}
            {totalPages && <span> / {totalPages}</span>}
          </div>
          <div className="PagingButtons_arrow" onClick={() => onNextClick()}>
            <ActionArrowForward />
          </div>
        </div>
      </div>
    );
  }
}

PagingButtons.propTypes = propTypes;
PagingButtons.defaultProps = defaultProps;

export default PagingButtons;
