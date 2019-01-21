import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const propTypes = {
  btnLabel: PropTypes.string,
  onEnter: PropTypes.func,
  // General
  style: PropTypes.object,
};

const defaultProps = {
  btnLabel: "Search",
  onEnter: () => {},
  style: {},
};

class SearchBar extends Component {

  handleSearchBarChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  handleSearchButtonClick(e) {
    this.props.onEnter(this.state.search);
  }

  render() {
    const { btnLabel, style } = this.props;

    return (
      <div className="SearchBar_container" style={style}>
        <div className="SearchBar">
          <TextField
            style={{width: '100%'}}
            onChange={(e) => this.handleSearchBarChange(e)}
            floatingLabelText={(
              <div style={{display: 'flex'}}>
                <SearchIcon />
                <div style={{marginLeft: '0.5rem'}}>Search</div>
              </div>
            )}
          />

          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <RaisedButton
              label={btnLabel}
              primary={true}
              onClick={(e) => this.handleSearchButtonClick(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
