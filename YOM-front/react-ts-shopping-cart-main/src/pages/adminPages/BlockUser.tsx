import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import '../../assets/css/AdminPages/adminBlock.css'
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

  const [userPage, setUserPage] = useState<number>(1);
  const [blockedUserPage, setBlockedUserPage] = useState<number>(1);
  const [totalUsersPages, setUsersPages] = useState(1);
  const [totalBlockedUsersPages, setBlockedUsersPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7014/api/Admin/User/AllUsers?pageNumber=1');
        setUsers(response.data.users);
        setUsersPages(response.data.totalPages);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7014/api/Admin/User/AllBlockedUsers?pageNumber=1');
        setBlockedUsers(response.data.users);
        setBlockedUsersPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching blocked users:', error);
      }
    };

    fetchUsers();
    fetchBlockedUsers();
  }, []);



  const getUsers = async (page: number) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/Admin/User/AllUsers?pageNumber=${page}`);
      setUsers(response.data.users);
      setUsersPages(response.data.totalPages);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getBlockedUsers = async (page: number) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/Admin/User/AllBlockedUsers?pageNumber=${page}`);
      setBlockedUsers(response.data.users);
      setBlockedUsersPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching blocked users:', error);
    }
  };


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

  const handleUserClickPage = async (pg: number) => {
    console.log(pg);
    if (userPage) {
      setUserPage(pg);
      getUsers(pg);
    }
  }
  const handleBlockedClickPage = async (pg: number) => {
    console.log(pg);
    if (blockedUserPage) {
      setBlockedUserPage(pg);
      getUsers(pg);
    }
  }

  return (
    <div className="admin-flex">
      <AdminSideBar />
      <div className="admin-Allblocks">
        <div>
          <h2>Користувачі</h2>
          <table className="admin-blocks-table">
            <thead>
              <tr>
                <th>Номер</th>
                <th>Данні користувача</th>
                <th>Нік</th>
                <th>Телефон</th>
                <th>Пошта</th>
                <th>Дія</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ color: "#1684EA" }}>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.userName}</td>
                  <td>{user.phoneNumber ? user.phoneNumber : "-"}</td>
                  <td>{user.email}</td>
                  <td className='admin-blocks-buttons'>
                    <button className="block" onClick={() => handleBlockUser(user.id)}>Block</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='admin-pagination'>
            <button
              onClick={() => handleUserClickPage(userPage !== undefined ? userPage - 1 : 1)}
              disabled={userPage === 1}
            >
              Попередня
            </button>
            <span>
              Сторінка {userPage} з {totalUsersPages}
            </span>
            <button
              onClick={() => handleUserClickPage(userPage !== undefined ? userPage + 1 : 1)}
              disabled={userPage === totalUsersPages}
            >
              Наступна
            </button>
          </div>
        </div>

        <div>
          <h2>Заблоковані користувачі</h2>
          <table className="admin-blocks-table">
            <thead>
              <tr>
                <th>Номер</th>
                <th>Данні користувача</th>
                <th>Нік</th>
                <th>Телефон</th>
                <th>Пошта</th>
                <th>Дія</th>
              </tr>
            </thead>
            <tbody>
              {blockedUsers.map(user => (
                <tr key={user.id}>
                  <td style={{ color: "#1684EA" }}>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.userName}</td>
                  <td>{user.phoneNumber ? user.phoneNumber : "-"}</td>
                  <td>{user.email}</td>
                  <td className='admin-blocks-buttons'>
                    <button className="unblock" onClick={() => handleUnblockUser(user.id)}>Unblock</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='admin-pagination'>
          <button
            onClick={() => handleBlockedClickPage(blockedUserPage !== undefined ? blockedUserPage - 1 : 1)}
            disabled={blockedUserPage === 1}
          >
            Попередня
          </button>
          <span>
            Сторінка {blockedUserPage} з {totalBlockedUsersPages}
          </span>
          <button
            onClick={() => handleBlockedClickPage(blockedUserPage !== undefined ? blockedUserPage + 1 : 1)}
            disabled={blockedUserPage === totalBlockedUsersPages}
          >
            Наступна
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlockUser;
