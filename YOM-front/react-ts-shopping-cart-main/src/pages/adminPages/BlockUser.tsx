import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  avatarPath: string;
  phoneNumber: string;
  dateCreated: string;
  dateModified: string;
  userRole: string;
  isBlocked: boolean;
}

const BlockUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7014/api/Admin/User/AllUsers');
        setUsers(response.data);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7014/api/Admin/User/AllBlockedUsers');
        setBlockedUsers(response.data);
      } catch (error) {
        console.error('Error fetching blocked users:', error);
      }
    };

    fetchUsers();
    fetchBlockedUsers();
  }, []);

  const handleBlockUser = async (userId: string) => {
    try {
      const response = await axios.post(`https://localhost:7014/api/Admin/User/Block/${userId}`);

      if (response.status === 200) {
        // Move the user to the blocked list
        const blockedUser = users.find(u => u.id === userId);
        setBlockedUsers(prev => [...prev, blockedUser!]);
        setUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        console.error('Error blocking the user:', response.data);
      }
    } catch (error) {
      console.error('Error while trying to block the user:', error);
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      const response = await axios.post(`https://localhost:7014/api/Admin/User/UnBlock/${userId}`);

      if (response.status === 200) {
        // Move the user back to the non-blocked list
        const unblockedUser = blockedUsers.find(u => u.id === userId);
        setUsers(prev => [...prev, unblockedUser!]);
        setBlockedUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        console.error('Error unblocking the user:', response.data);
      }
    } catch (error) {
      console.error('Error while trying to unblock the user:', error);
    }
  };

  return (
    <div className="admin-flex">
      <AdminSideBar />
      <div className="BlockUser-content">
        <h2>Users</h2>
        <table className="BlockUser-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td><td>{user.id}</td></td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="BlockUser-blockBtn" onClick={() => handleBlockUser(user.id)}>Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <h2>Blocked Users</h2>
        <table className="BlockUser-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blockedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="BlockUser-unblockBtn" onClick={() => handleUnblockUser(user.id)}>Unblock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlockUser;
