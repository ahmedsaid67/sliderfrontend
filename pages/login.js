import React, { useState } from 'react';
import { submitLogin } from '../context/features/auth/loginSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'; 


const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const loginStyle = {
  backgroundColor: '#fff',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  textAlign: 'center',
  padding: '30px',
  maxWidth: '400px',
  width: '100%',
};

const titleStyle = {
  color: '#333',
  fontSize: '32px',
  marginBottom: '20px',
};

const inputStyle = {
  width: '100%',
  padding: '15px',
  margin: '10px 0',
  border: '2px solid #ddd',
  borderRadius: '5px',
  fontSize: '18px',
};

const buttonStyle = {
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '15px 20px',
  cursor: 'pointer',
  fontSize: '20px',
  transition: 'background-color 0.3s',
};



const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Kullanıcı Adı:', username);
    console.log('Şifre:', password);
    dispatch(submitLogin(username,password))
    router.push('/');
  };

  return (
    <div style={containerStyle}>
      <div style={loginStyle}>
        <h1 style={titleStyle}>Giriş Yap</h1>
        <form onSubmit={handleSubmit}>
          <div style={inputStyle}>
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div style={inputStyle}>
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Şifre"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>Giriş Yap</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
