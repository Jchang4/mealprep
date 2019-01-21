import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new';
import FlatButton from 'material-ui/FlatButton';
import SuccessOrDeleteIcon from '../../Icons/SuccessOrDeleteIcon';


const propTypes = {
  title: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
  socialRank: PropTypes.number,
  // Card Props
  success: PropTypes.bool,
  onClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  success: false,
  onClick: () => {},
  onDeleteClick: () => {},
  className: '',
};

class RecipeCard extends Component {

  shortenNumber(number, numDecimals=2) {
    let num = String(number);
    let idx = num.indexOf('.');
    if (idx > 0) {
      num = num.substring(0, idx+numDecimals+1);
    }
    return num;
  }

  handleOpenNewTab(e) {
    const { sourceUrl } = this.props;
    e.stopPropagation();
    e.preventDefault();
    window.open(sourceUrl, '_blank');
  }

  render() {
    const {
      // recipeId,
      title,
      publisher,
      imageUrl,
      // sourceUrl,
      socialRank,
      success,
      onClick,
      onDeleteClick,
      className,
    } = this.props;

    let successClassName = (success) ? 'card--success' : '';

    return (
      <div className={`${className} ${successClassName} RecipeCard card hover round-corners`} onClick={onClick}>
        {/* Top Icons */}
        <SuccessOrDeleteIcon
          className={(success)
            ? 'RecipeCard_top_btn RecipeCard_top_btn--success' 
            : 'RecipeCard_top_btn'
          }
          success={success}
          onDeleteClick={onDeleteClick}
        />

        {/* Image */}
        <div
          className="RecipeCard_img"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>

        {/* Text */}
        <div className="RecipeCard_textContainer">
          {/* Title */}
          <div className="RecipeCard_header">
            {title}
          </div>
          {/* Publisher + Social Rank */}
          <div
            className="flex-center"
            style={{
              margin: '0.5rem 0',
              justifyContent: 'space-between',
            }}
          >
            <div className="RecipeCard_subheader">
              {publisher}
            </div>
            <div className="RecipeCard_subheader">
              Rank: {this.shortenNumber(socialRank)}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '1rem'}}>
          <FlatButton
            secondary={true}
            label="Open in New Tab"
            labelPosition="before"
            icon={<ActionOpenInNew/>}
            onClick={(e) => this.handleOpenNewTab(e)}
          />
        </div>
      </div>
    );
  }
}

RecipeCard.propTypes = propTypes;
RecipeCard.defaultProps = defaultProps;

export default RecipeCard;
