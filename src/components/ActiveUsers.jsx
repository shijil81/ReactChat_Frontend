import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUserApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';

function ActiveUsers() {
  const navigate = useNavigate();

  // State variables to store user data, error messages, and search input
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // Function to fetch users from API
  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError('No token found, please login');
      return;
    }

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await getAllUserApi(reqHeader);

      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      setError('Failed to fetch users');
      console.error("Error fetching users:", error);
    }
  };

  // useEffect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Navigate to chat page with selected user data
  const handleUserClick = (user) => {
    navigate('/chat', { state: { user } });
    console.log("Selected user:", user);
  };

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Search bar */}
      <div className='d-flex align-items-center justify-content-center mb-3'>
        <input
          type='text'
          className='w-50 rounded-5 border-black form-control py-1 text-center shadow'
          placeholder='Search Users'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className='fs-5' style={{ marginLeft: '-30px' }} />
      </div>

      {/* Error message display */}
      {error && <div className='text-danger'>{error}</div>}

      {/* Display filtered users or a 'User not found' message if no match */}
      <div className='scrollable-container'>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user?._id}
              className='rounded-4 p-2 mt-2 mx-auto'
              style={{ width: '60%', backgroundImage: 'linear-gradient(#fbc1cd, #d8b8fb)' }}
              onClick={() => handleUserClick(user)}
            >
              <div className='d-flex align-items-center'>
                <img
                  src={
                    user.profile
                      ? `${serverUrl}/uploads/${user.profile}`
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFgQrbwN1RthTLcuPTI9yRyRAJDwHyP1KSQ&s'
                  }
                  alt='profile'
                  className='rounded-circle'
                  style={{ height: '80px', width: '80px' }}
                />
                <h3 className='ms-2'>{user?.username}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className='text-danger fw-bold text-center mt-5'>
            <h1>User not found</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default ActiveUsers;
