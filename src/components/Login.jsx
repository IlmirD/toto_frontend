import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/login.module.css';
import baseUrl from '../utils/baseUrl';

import axios from 'axios';

function Login() {

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const loginBtn = useRef();

   const [serverResponse, setServerResponse] = useState(null);

   useEffect(() => {
      document.title = 'ToDo - Вход';
   }, [])

   const submitLoginForm = async (e) => {

      e.preventDefault();

      loginBtn.current.disabled = true;

      const fd = new FormData();

      fd.append('username', username);
      fd.append('password', password);

      await axios.post(baseUrl + '/api/token/', fd,
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      )
         .then((response) => {
            // если ответ 200, то сохраняем токены
            localStorage.setItem('a', JSON.stringify(response.data.access));
            localStorage.setItem('r', JSON.stringify(response.data.refresh));

            loginBtn.current.disabled = false;

            window.location.replace('/');
         })

         .catch(() => {
            setServerResponse('Неправильное имя пользователя или пароль.');

            loginBtn.current.disabled = false;
         })
   }

   return (
      <div className={styles.page_content}>
         <form onSubmit={submitLoginForm}>
            <div className={styles.login_form}>
               <h1>Вход</h1>

               <input type='text' required placeholder='имя пользователя' className={styles.input} onChange={(e) => setUsername(e.target.value)} ></input>

               <input type='password' required autoComplete='off' placeholder='пароль' className={styles.input} onChange={(e) => setPassword(e.target.value)} ></input>

               {serverResponse &&
                  <p className={styles.danger}>{serverResponse}</p>
               }
               <div className={styles.login_btn_container}>
                  <button type='submit' className={styles.login_btn} ref={loginBtn}>
                     Войти
                  </button>
               </div>

               <NavLink className={styles.go_to_page} to='/register'>
                  Регистрация
               </NavLink>
            </div>
         </form>
      </div>
   );
}

export default Login;