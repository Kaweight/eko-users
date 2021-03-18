import React, { Component } from 'react';
import axios from 'axios';

import { deleteUserData } from '../api/prepareFormData';
import AddUser from './AddUser';

class UserList extends Component {
  state = {
    persons: [],
    displayedPersons: [],
    isUserListDisplayed: false,
    first_name: '',
    last_name: '',
    postal_code: '',
    street: '',
    city: '',
    age: ''
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

  showUserList = () => (
    <ul>
      {this.state.persons.map(person => (
        <li key={person.id}>
          {person.last_name}
          <button onClick={() => this.deleteUser(person.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );

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
        <AddUser fetchUserList={this.fetchUserList} />
        <button onClick={this.toggleListDisplay}>{isUserListDisplayed ? 'Hide users' : 'Show users'}</button>
        {isUserListDisplayed && (this.showUserList())}

      </>
    );
  }
}

export default UserList;