import React, { useEffect, useState, useRef } from 'react';

import { useParams } from 'react-router-dom';

import styles from './css/create.module.css';

import axiosInstance from '../utils/axiosInstance';

function Edit() {

   // id берем из url
   let { id } = useParams();

   const [error, setError] = useState(null);

   const [title, setTitle] = useState(null);
   const [description, setDescription] = useState(null);
   const [status, setStatus] = useState(false);

   // для выключения кнопки
   const createBtn = useRef();

   const [serverResponse, setServerResponse] = useState(null);

   // берем данные текущей задачи
   const getData = async () => {

      await axiosInstance.get(`/api/todo/${id}`)

         .then((response) => {
            if (response.status === 200) {
               setTitle(response.data.title);
               setDescription(response.data.description);
               setStatus(response.data.status);
            }
         })
         .catch((err) => {
            if (err.status === 404) {
               setError('Ничего не найдено');
            }
         })
   }

   useEffect(() => {
      document.title = 'ToDo - Редактрование';

      getData();
   }, [])

   // обновляем задачу
   const updateTask = async (e) => {

      e.preventDefault();

      createBtn.current.disabled = true;

      const fd = new FormData();

      fd.append('title', title);
      fd.append('description', description);
      fd.append('status', status);

      await axiosInstance.put(`/api/todo/${id}/`, fd)

      .then((response) => {
         if (response.status === 200) {
            if (response.data.success) {
               setServerResponse(<p className={styles.success}>Обновлено</p>)
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
            <form onSubmit={updateTask}>
               <h1>Редактирование задачи</h1>

               <input required placeholder='Заголовок' defaultValue={title} className={styles.input} onChange={(e) => setTitle(e.target.value)}></input>
               <textarea required placeholder='Описание' defaultValue={description} className={styles.input} style={{ height: '200px' }} onChange={(e) => setDescription(e.target.value)}></textarea>
               <div className={styles.status_container}>
               <input type='checkbox' id='status' checked={status} onChange={(e) => setStatus(e.target.checked)}></input>
               <label htmlFor='status'>Выполнено</label>
               </div>

               {serverResponse &&
                  serverResponse
               }
               <div className={styles.create_btn_container}>
                  <button type='submit' className={styles.create_btn} ref={createBtn}>
                     Обновить
                  </button>
               </div>
            </form>
         }
      </div>
   );
}

export default Edit;