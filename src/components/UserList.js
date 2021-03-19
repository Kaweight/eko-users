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
    axios.get(`http://fronttest.ekookna.pl/`)
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
            <h3>Name: {person.first_name}</h3>
            <h3>Last Name: {person.last_name}</h3>
            <p>Postal Code: {person.postal_code}</p>
            <p>Street: {person.street}</p>
            <p>City: {person.city}</p>
            <p>Age: {person.age}</p>
            <button onClick={() => this.deleteUser(person.id)}>DELETE USER</button>
          </li>
        ))}
      </ul>
    )
  };

  toggleListDisplay = () => {
    this.setState({ isUserListDisplayed: !this.state.isUserListDisplayed })
  }

  deleteUser = (id) => {
    axios.post(`http://fronttest.ekookna.pl/user/${id}`, deleteUserData())
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
      <>
        minAge: <input type="number" value={this.state.minPersonAge} onChange={this.updateMinPersonAge.bind(this)} minLength="0" />
        maxAge: <input type="number" value={this.state.maxPersonAge} onChange={this.updateMaxPersonAge.bind(this)} maxLength="150" />
        <AddUser fetchUserList={this.fetchUserList} />
        Search Users: <input type="text" value={this.state.lastNameFilter} onChange={this.updateLastNameFilter.bind(this)} />
        <button onClick={this.toggleListDisplay}>{isUserListDisplayed ? 'Hide users' : 'Show users'}</button>
        {isUserListDisplayed && (this.showUserList())}
      </>
    );
  }
}

export default UserList;