import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/login.module.css';
import baseUrl from '../utils/baseUrl';

import axios from 'axios';

function Register() {

   const [email, setEmail] = useState();
   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [password2, setPassword2] = useState();
   const loginBtn = useRef();

   const [serverResponse, setServerResponse] = useState(null);

   useEffect(() => {
      document.title = 'ToDo - Регистрация';
   }, [])

   const submitRegisterForm = async (e) => {
      e.preventDefault();

      loginBtn.current.disabled = true;

      const fd = new FormData();

      fd.append('email', email);
      fd.append('username', username);
      fd.append('password', password);
      fd.append('password2', password2);

      await axios.post(baseUrl + '/api/register/', fd,
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      )
         .then((response) => {
            if (response.data.success) {
               setServerResponse(<p className={styles.success}>Регистрация прошла успешно.</p>)
            }
            else {
               setServerResponse(<p className={styles.danger}>{response.data.error}</p>)
            }
         })
         .catch((error) => {
            console.log(error);
         })

      loginBtn.current.disabled = false;
   }


   return (
      <div className={styles.page_content}>
         <form onSubmit={submitRegisterForm}>
            <div className={styles.login_form}>
               <h1>Регистрация</h1>

               <input type='text' required placeholder='e-mail' className={styles.input} onChange={(e) => setEmail(e.target.value)} ></input>
               
               <input type='text' required placeholder='имя пользователя' className={styles.input} onChange={(e) => setUsername(e.target.value)} ></input>

               <input type='password' required autoComplete='off' placeholder='пароль' className={styles.input} onChange={(e) => setPassword(e.target.value)} ></input>
               
               <input type='password' required autoComplete='off' placeholder='подтверждение пароля' className={styles.input} onChange={(e) => setPassword2(e.target.value)} ></input>

               {serverResponse &&
                  serverResponse
               }
               <div className={styles.login_btn_container}>
                  <button type='submit' className={styles.login_btn} ref={loginBtn}>
                     Регистрация
                  </button>
               </div>

               <NavLink className={styles.go_to_page} to='/login'>
                  Войти
               </NavLink>
            </div>
         </form>
      </div>
   );
}

export default Register;