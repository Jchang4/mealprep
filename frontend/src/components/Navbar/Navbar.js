import React, { Component } from 'react';

// Components
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  title: {
    cursor: 'pointer',
  },
  button: {
    color: '#FAFAFA',
  }
};

class Navbar extends Component {

  handleRedirect(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <AppBar
        title={<span style={styles.title}>Meal Prep</span>}
        onTitleClick={(e) => this.handleRedirect('/')}
        iconElementLeft={<span></span>}
        iconElementRight={<div>
          <FlatButton
            label="Recipes"
            style={styles.button}
            onClick={() => this.handleRedirect('recipes')}
          />
          <FlatButton
            label="Grocery List"
            style={styles.button}
            onClick={() => this.handleRedirect('grocery')}
          />
          <FlatButton
            label="NLP"
            style={styles.button}
            onClick={() => this.handleRedirect('nlp')}
          />
        </div>}
      />
    );
  }
}

export default Navbar;
