import React, { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users?.map((user) => {
    return (
      <li className='individual-user' key={user.id}>
        <img src={user.profile_pic} alt='user-pfp'></img>
        <p>{user.username}</p>
      </li>
    );
  });

  return (
    <div className='users-list'>
      <ul>{userComponents}</ul>
    </div>
  );
}

export default UsersList;
