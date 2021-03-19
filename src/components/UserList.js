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
    age: '',
    search: ''
  }


  updateSearch = (event) => {
    this.setState({ search: event.target.value.trim() });
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
    const filteredUsers = this.state.persons.filter(
      (person) => person.last_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
    return (
      <ul>
        {filteredUsers.map(person => (
          <li key={person.id}>
            {person.last_name}
            <button onClick={() => this.deleteUser(person.id)}>DELETE</button>
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
        <AddUser fetchUserList={this.fetchUserList} />
         Search Users: <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
        <button onClick={this.toggleListDisplay}>{isUserListDisplayed ? 'Hide users' : 'Show users'}</button>
        {isUserListDisplayed && (this.showUserList())}
      </>
    );
  }
}

export default UserList;