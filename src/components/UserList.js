import React, { Component } from 'react';
import axios from 'axios';

class UserList extends Component {
  state = {
    persons: [],
    isUserListDisplayed: false
  }

  componentDidMount() {
    axios.get(`http://fronttest.ekookna.pl/`)
      .then(res => {
        console.log('res: ', res);
        this.setState({ persons: res.data.users });
      })
  }

  showUserList = () => (
    <ul>
      {this.state.persons.map(person => (
        <li key={person.index}>
          {person.last_name}
        </li>
      ))}
    </ul>
  );

  toggleListDisplay = () => {
    this.setState({ isUserListDisplayed: !this.state.isUserListDisplayed })
  }

  render() {
    const { isUserListDisplayed } = this.state;
    return (
      <>
        <button onClick={this.toggleListDisplay}>{isUserListDisplayed ? 'Hide users' : 'Show users'}</button>
        {isUserListDisplayed && this.showUserList()}
      </>
    );
  }
}

export default UserList;