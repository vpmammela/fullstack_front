import React, { useState } from 'react';
import styled from 'styled-components';

const GrayBackground = styled.div`
  position: absolute;
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

interface User {
  id: number;
  name: string;
}

interface UserControlProps {
  isAdmin: boolean;
}

// TODO: Make sure this works correctly and code is sensible --> number of users is unknown.
const UserControl: React.FC<UserControlProps> = ({ isAdmin }) => {
  const initialUsers: User[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    // Add more initial users as needed
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [newUserName, setNewUserName] = useState<string>('');

  const handleDeleteUser = (userId: number) => {
    if (isAdmin) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } else {
      alert('Sinulla ei ole lupaa poistaa käyttäjiä.');
    }
  };

  const handleAddUser = () => {
    if (isAdmin && newUserName.trim() !== '') {
      const newUser: User = {
        id: users.length + 1,
        name: newUserName.trim(),
      };

      setUsers([...users, newUser]);
      setNewUserName('');
    } else {
      alert('Sinulla ei ole lupaa lisätä käyttäjiä tai kenttä on tyhjä.');
    }
  };

  return (
    <GrayBackground>
    <div>
      <h2>User Control</h2>
      {isAdmin && (
        <div>
          <h3>Add User</h3>
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter user name"
          />
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}{' '}
            {isAdmin && (
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
    </GrayBackground>
  );
};

export default UserControl;