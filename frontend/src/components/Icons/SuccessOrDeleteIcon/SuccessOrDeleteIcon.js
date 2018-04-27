import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { green500, red500 } from 'material-ui/styles/colors';
import ActionCheck from 'material-ui/svg-icons/action/check-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';

const propTypes = {
  success: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

const defaultProps = {};

class SuccessOrDeleteIcon extends Component {
  render() {
    const {
      success,
      onDeleteClick,
      className,
    } = this.props;

    return (
      <div className={`${className} SuccessOrDeleteIcon`}>
        {success && (
          <div className="SuccessOrDeleteIcon_btn">
            <ActionCheck
              color={green500}
              style={{width: '50px', height: '50px'}}
            />
          </div>
        )}

        {!success && (
          <div
            className="SuccessOrDeleteIcon_btn"
            onClick={(e) => onDeleteClick(e)}
          >
            <ActionDelete
              color={red500}
              style={{width: '30px', height: '30px'}}
            />
          </div>
        )}
      </div>
    );
  }
}

SuccessOrDeleteIcon.propTypes = propTypes;
SuccessOrDeleteIcon.defaultProps = defaultProps;

export default SuccessOrDeleteIcon;
