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

    axios.post(`https://fronttest.ekookna.pl/user`, createUserData(user))
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
      <main className="form-signin">
        <form onSubmit={this.handleSubmit}>
          <h2 className="h3 mb-3 fw-normal">Add a new User</h2>
          <input
            type="text" name="first_name" placeholder="Name" className="form-control"
            onChange={e => this.setState({ first_name: e.target.value })}
            value={this.state.first_name} maxLength="100" />

          <input type="text" name="last_name" placeholder="Surname" className="form-control"
            onChange={e => this.setState({ last_name: e.target.value })}
            value={this.state.last_name} maxLength="100" />

          <input type="text" name="postal_code" placeholder="Postal Code" className="form-control"
            onChange={e => this.setState({ postal_code: e.target.value })}
            value={this.state.postal_code} maxLength="10" />

          <input type="text" name="street" placeholder="Street" className="form-control"
            onChange={e => this.setState({ street: e.target.value })}
            value={this.state.street} maxLength="100" />

          <input type="text" name="city" placeholder="City" className="form-control"
            onChange={e => this.setState({ city: e.target.value })}
            value={this.state.city} maxLength="100" />

          <input type="number" name="age" placeholder="Age" className="form-control"
            onChange={e => this.setState({ age: e.target.value })}
            value={this.state.age} max="100" />

          <button type="submit" className="btn-add">Add User</button>
        </form>
      </main>
    );
  }
}

export default AddUser;