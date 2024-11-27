import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/main.module.css';

import axiosInstance from '../utils/axiosInstance';

function Main() {

   const [error, setError] = useState(null);

   const [data, setData] = useState(null);

   // чтобы скрыть задачу после удаления
   const taskRef = useRef([]);

   const getData = async () => {
      await axiosInstance.get(`/api/todo/?filter=all`)

         .then((response) => {
            if (response.status === 200) {
               setData(response.data);
            }
         })
         .catch(() => {
            // для обработки ошибки сервера 500 и т.д
            setError('Ошибка сервера');
         })
   }

   useEffect(() => {
      document.title = 'ToDo - Главная';
      getData();
   }, [])


   // удаляем задачу
   const deleteTask = async (id) => {

      await axiosInstance.delete(`/api/todo/${id}/`)

         .then((response) => {
            if (response.status === 200) {
               if (response.data.success) {
                  // скрываем задачу из списка
                  taskRef.current[id].style.display = 'none';
               }
            }
         })
         // обрабатываем ошибки
         .catch((err) => {
            if (err.status === 404) {
               setError('Ошибка. Задача не найдена');
            }

            if (err.status === 500) {
               setError('Ошибка сервера. Попробуйте позже');
            }
         })
   }


   // фильтрация по статусу
   const filterToDo = async (filter) => {
      await axiosInstance.get(`/api/todo/?filter=${filter}`)

         .then((response) => {
            if (response.status === 200) {
               setData(response.data);
            }
         })
         .catch(() => {
            setError('Ошибка сервера');
         })
   }

   return (
      <div className={styles.page_content}>
         {error ?
            <p>{error}</p>
            :
            <>
               <h1>Список задач</h1>

               <div className={styles.filter_container}>
                  <select id="todo" onChange={(e) => filterToDo(e.target.value)}>
                  <option value="all">Все</option>
                  <option value="true">Выполненые</option>
                  <option value="false">Не выполненные</option>
                  </select>
               </div>

               {data && data.map((d) =>
                  <div ref={el => taskRef.current[d.id] = el} key={d.id} className={styles.todo_list}>
                     <h2>{d.title}</h2>
                     <p>{d.description}</p>
                     <p>{d.status ? 'Выполнено' : 'Не выполнено'}</p>
                     <p className={styles.timestamp}>{d.timestamp}</p>

                     <div className={styles.edit_container}>
                        <NavLink to={`/edit/${d.id}`}>
                           <p className={styles.edit_btn}>Редактировать</p>
                        </NavLink>
                        <button className={styles.delete_btn} onClick={() => deleteTask(d.id)}>Удалить</button>
                     </div>
                  </div>
               )}
            </>
         }
      </div>
   );
}

export default Main;