import React from 'react';
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
  Navigation,
  Login,
  Register,
  Main,
  Edit,
  Create,
} from './components';

const token = JSON.parse(localStorage.getItem('a'));

// если пользователь неавторизован, делаем переадресацию на страницу входа
createRoot(document.getElementById('root')).render(
  <Router>
    <Navigation />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {token ?
        <>
          <Route path='/' element={<Main />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
        </>
        :
        <Route path='*' element={<Login />} />

      }
    </Routes>
  </Router>
);

reportWebVitals();