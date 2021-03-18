import React, { Component } from 'react';
import axios from 'axios';

const createFormData = (fields) => {
  const formData = new FormData();
  Object.entries(fields).forEach(field => formData.append(field[0], field[1]));
  return formData;
}

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

    axios.post(`http://fronttest.ekookna.pl/user`, createFormData(user))
      .then(res => {
        (res.status === 200 || res.status === 201)
          ? this.setState({ requestSaved: true, error: false })
          : this.setState({ requestSaved: false, error: true });
        console.log(res.data);
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="first_name" onChange={e => this.setState({ first_name: e.target.value })} value={this.state.first_name} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" onChange={e => this.setState({ last_name: e.target.value })} value={this.state.last_name} />
        </label>
        <label>
          Postal Code:
          <input type="text" name="postal_code" onChange={e => this.setState({ postal_code: e.target.value })} value={this.state.postal_code} />
        </label>
        <label>
          Street:
          <input type="text" name="street" onChange={e => this.setState({ street: e.target.value })} value={this.state.street} />
        </label>
        <label>
          City:
          <input type="text" name="city" onChange={e => this.setState({ city: e.target.value })} value={this.state.city} />
        </label>
        <label>
          Age:
          <input type="number" name="age" onChange={e => this.setState({ age: e.target.value })} value={this.state.age} />
        </label>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddUser;