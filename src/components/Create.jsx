import React, { useEffect, useState, useRef } from 'react';

import styles from './css/create.module.css';

import axiosInstance from '../utils/axiosInstance';

function Create() {

   const [error, setError] = useState(null);

   const [title, setTitle] = useState(null);
   const [description, setDescription] = useState(null);

   // для выключения кнопки
   const createBtn = useRef();

   // ответ сервера
   const [serverResponse, setServerResponse] = useState(null);

   useEffect(() => {
      document.title = 'ToDo - Создание';
   }, [])

   const createTask = async (e) => {

      e.preventDefault();

      createBtn.current.disabled = true;

      const fd = new FormData();

      fd.append('title', title);
      fd.append('description', description);

      await axiosInstance.post(`/api/todo/`, fd)

         .then((response) => {
            if (response.status === 200) {
               if (response.data.success) {
                  setServerResponse(<p className={styles.success}>Создано</p>)
               }
               else {
                  // ошибка полей сериалайзера
                  setServerResponse(<p className={styles.danger}>{response.data}</p>)
               }
            }
         })

         .catch((err) => {
            if (err.status === 500) {
               setError('Ошибка сервера. Попробуйте позже');
            }
         })

      createBtn.current.disabled = false;
   }

   return (
      <div className={styles.page_content}>
         {error ?
            <p>{error}</p>
            :
            <form onSubmit={createTask}>
               <h1>Создание задачи</h1>

               <input required placeholder='Заголовок' className={styles.input} onChange={(e) => setTitle(e.target.value)}></input>
               <textarea required placeholder='Описание' className={styles.input} style={{ height: '200px' }} onChange={(e) => setDescription(e.target.value)}></textarea>

               {serverResponse &&
                  serverResponse
               }
               <div className={styles.create_btn_container}>
                  <button type='submit' className={styles.create_btn} ref={createBtn}>
                     Создать
                  </button>
               </div>
            </form>
         }
      </div>
   );
}

export default Create;