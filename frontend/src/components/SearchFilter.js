import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Input } from 'semantic-ui-react'

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}, this.props.getText(event.target.value));
  }


  render() {
    return (
      <div className="container">
        <Input onChange={this.handleChange} style={{ marginBottom: '50px' }} size='massive' placeholder='Filter...' />
      </div>
    )
  }
}

export default SearchFilter;