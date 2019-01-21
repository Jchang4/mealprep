import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number,
};

const defaultProps = {
  aspectRatio: 3/4
};

class Image extends Component {
  render() {
    const { src, alt, aspectRatio } = this.props;
    return (
      <div className="Image">
        <div style={{
          position: 'relative',
          paddingTop: `calc(100% * ${aspectRatio})`
        }}>
          <div className="position-absolute-full">
            <img
              className="Image_img"
              src={src}
              alt={alt}
            />
          </div>
        </div>
      </div>
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
