import React, { Component } from 'react';
import axios from 'axios';

import { deleteUserData } from '../api/prepareFormData';
import AddUser from './AddUser';

class UserList extends Component {
  state = {
    persons: [],
    isUserListDisplayed: false,
    first_name: '',
    last_name: '',
    postal_code: '',
    street: '',
    city: '',
    age: '',
    lastNameFilter: '',
    minPersonAge: '',
    maxPersonAge: ''
  }

  updateMinPersonAge = (event) => {
    this.setState({ minPersonAge: event.target.value });
  }
  updateMaxPersonAge = (event) => {
    this.setState({ maxPersonAge: event.target.value });
  }

  updateLastNameFilter = (event) => {
    this.setState({ lastNameFilter: event.target.value.trim() });
  }

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList = () => {
    axios.get(`https://fronttest.ekookna.pl/`)
      .then(res => {
        console.log('res: ', res);
        this.setState({
          persons: res.data.users
        });
      })
  }

  showUserList = () => {
    let filteredUsers = [...this.state.persons];
    if (this.state.lastNameFilter) {
      filteredUsers = filteredUsers.filter(person => person.last_name.toLowerCase().includes(this.state.lastNameFilter.toLowerCase()))
    }
    if (this.state.minPersonAge) {
      filteredUsers = filteredUsers.filter(person => person.age >= this.state.minPersonAge);
    }
    if (this.state.maxPersonAge) {
      filteredUsers = filteredUsers.filter(person => person.age <= this.state.maxPersonAge);
    }

    return (
      <ul>
        {filteredUsers.map(person => (
          <li key={person.id}>
            <p>Name: <strong>{person.first_name}</strong></p>
            <p>Surname: <strong>{person.last_name}</strong></p>
            <p>Postal Code: {person.postal_code}</p>
            <p>Street: {person.street}</p>
            <p>City: {person.city}</p>
            <p>Age: {person.age}</p>
            <button className="btn-delete"
              onClick={() => this.deleteUser(person.id)}>DELETE USER</button>
          </li>
        ))}
      </ul>
    )
  };

  toggleListDisplay = () => {
    this.setState({ isUserListDisplayed: !this.state.isUserListDisplayed })
  }

  deleteUser = (id) => {
    axios.post(`https://fronttest.ekookna.pl/user/${id}`, deleteUserData())
      .then(res => {
        console.log('res: ', res);
        const newPersons = this.state.persons.filter(person => person.id !== id);
        this.setState({
          persons: newPersons
        })
      })
  }

  render() {
    const { isUserListDisplayed } = this.state;

    return (
      <main className="form-signin">
        <AddUser fetchUserList={this.fetchUserList} />
        <input type="text" name="last-name-filter" placeholder="Search by surname" className="form-control"
          value={this.state.lastNameFilter}
          onChange={this.updateLastNameFilter.bind(this)} />

        <input type="number" name="min-age-filter" placeholder="Search from the lower age limit" className="form-control"
          value={this.state.minPersonAge}
          onChange={this.updateMinPersonAge.bind(this)} minLength="0" />

        <input type="number" name="max-age-filter" placeholder="Search to the upper age limit" className="form-control"
          value={this.state.maxPersonAge}
          onChange={this.updateMaxPersonAge.bind(this)} maxLength="150" />

        <button type="submit" className="btn-show"
          onClick={this.toggleListDisplay}>{isUserListDisplayed ? 'Hide Users' : 'Show Users'}</button>
        {isUserListDisplayed && (this.showUserList())}
      </main>
    );
  }
}

export default UserList;