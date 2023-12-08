import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GrayBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserContainer = styled.div`
  width: 75%;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Heading = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const SubHeading = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: pink;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const GrayButton = styled(Button)`
  background-color: red;
`;

interface User {
  id: number;
  name: string;
}

interface UserControlProps {
  isAdmin: boolean;
}

const UserControl: React.FC<UserControlProps> = ({ isAdmin }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>('');

  useEffect(() => {
    // Fetch users when the component mounts.
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If deletion is successful update user list.
        fetchUsers();
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'John', // Placeholder values.
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role: 'user',
          password: 'password123',
          access_token_identifier: 'access_token',
          refresh_token_identifier: 'refresh_token',
        }),
      });

      if (response.ok) {
        // If addition is successful --> update user list.
        fetchUsers();
        setNewUserName(''); // Clear input field.
      } else {
        console.error('Error adding user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <GrayBackground>
      <UserContainer>
        <Heading>User Control</Heading>
        {isAdmin && (
          <div>
            <SubHeading>Add User</SubHeading>
            <Input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter user name"
            />
            <Button onClick={handleAddUser}>Add User</Button>
          </div>
        )}
        <SubHeading>User List</SubHeading>
        <UserList>
          {users.map((user) => (
            <UserListItem key={user.id}>
              {user.name}{' '}
              {isAdmin && (
                <GrayButton onClick={() => handleDeleteUser(user.id)}>Delete</GrayButton>
              )}
            </UserListItem>
          ))}
        </UserList>
      </UserContainer>
    </GrayBackground>
  );
};

export default UserControl;