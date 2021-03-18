import React, { Component } from 'react';
import axios from 'axios';

import { createUserData } from '../api/prepareFormData';

class AddUser extends Component {
  state = {
    first_name: '',
    last_name: '',
    postal_code: '',
    street: '',
    city: '',
    age: '',
    error: false
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      postal_code: this.state.postal_code,
      street: this.state.street,
      city: this.state.city,
      age: this.state.age
    }

    axios.post(`http://fronttest.ekookna.pl/user`, createUserData(user))
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          this.setState({ requestSaved: true, error: false });
          this.props.fetchUserList();
        } else {
          this.setState({ requestSaved: false, error: true });
        }
        console.log(res.data);
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="first_name" onChange={e => this.setState({ first_name: e.target.value })} value={this.state.first_name} maxLength="100" />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" onChange={e => this.setState({ last_name: e.target.value })} value={this.state.last_name} maxLength="100" />
        </label>
        <label>
          Postal Code:
          <input type="text" name="postal_code" onChange={e => this.setState({ postal_code: e.target.value })} value={this.state.postal_code} maxLength="10" />
        </label>
        <label>
          Street:
          <input type="text" name="street" onChange={e => this.setState({ street: e.target.value })} value={this.state.street} maxLength="100" />
        </label>
        <label>
          City:
          <input type="text" name="city" onChange={e => this.setState({ city: e.target.value })} value={this.state.city} maxLength="100" />
        </label>
        <label>
          Age:
          <input type="number" name="age" onChange={e => this.setState({ age: e.target.value })} value={this.state.age} max="200" />
        </label>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddUser;