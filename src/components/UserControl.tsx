import React, { useState, useEffect, ReactNode } from 'react';
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

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
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
  name: ReactNode;
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
}

interface UserControlProps {
  isAdmin: boolean;
}

const UserControl: React.FC<UserControlProps> = ({ isAdmin }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: ''
  });

  useEffect(() => {
    // Fetch users when the component mounts.
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://localhost:5180/api/v1/users');
      const data = await response.json();
      console.log('Fetched Users:', data); // Log the fetched data.
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Delete single user.
  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`https://localhost:5180/api/v1/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If deletion is successful, update user list.
        fetchUsers();
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Add single user.
  const handleAddUser = async () => {
    try {
      const response = await fetch('https://localhost:5180/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.email,
          role: newUser.role,
          password: newUser.password,
        }),
      });

      if (response.ok) {
        // If addition is successful, update user list.
        fetchUsers();
        // Clear input fields.
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          password: ''
        });
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
        <Heading>Käyttäjien hallinta</Heading>

        {!isAdmin && (
          <FormContainer>
            <SubHeading>Lisää uusi käyttäjä</SubHeading>
            <Input
              type="text"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              placeholder="Etunimi"
            />
            <Input
              type="text"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              placeholder="Sukunimi"
            />
            <Input
              type="text"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Sähköposti"
            />
            <Input
              type="text"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              placeholder="Rooli"
            />
            <Input
              type="text"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Salasana"
            />
            <br />
            <button onClick={handleAddUser}>Lisää</button>
          </FormContainer>
        )}

        <SubHeading>Käyttäjälista</SubHeading>
        <UserList>
          {users.map((user) => (
            <UserListItem key={user.id}>
              {user.firstName} {user.lastName}{' '}
              {isAdmin && (
                <GrayButton onClick={() => handleDeleteUser(user.id)}>Poista</GrayButton>
              )}
            </UserListItem>
          ))}
        </UserList>
      </UserContainer>
    </GrayBackground>
  );
};

export default UserControl;