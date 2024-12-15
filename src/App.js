import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Problemslist from './components/Problems/ProblemsList';
import Problems from './components/Problems/Problems/Problems';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import user1 from './assets/User1.png'

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersString = localStorage.getItem('Codingusers');
    if (!usersString) {
      const initialUsers = [
        {
          id: 1,
          name: 'Vaibhav lal',
          password: '1234567',
          email: 'vaibhav@user.com',
          imgUrl: user1,
        },
        {
          id: 2,
          name: 'Rajat lal',
          password: '1234567',
          email: 'rajat@user.com',
          imgUrl:user1
        },
        {
          id: 3,
          name: 'Ayush kumar',
          password: '1234567',
          email: 'ayush@user.com',
          imgUrl: user1
        },
        {
          id:4,
          name: 'Harsh sharma',
          password: '1234567',
          email: 'harsh@user.com',
          imgUrl: user1
        },
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    } else {
      setUsers(JSON.parse(usersString));
    }
  }, [])


  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/problems' element={<Problemslist/>} />
      <Route path='/problems/:difficulty/:questionId' element={<Problems />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
