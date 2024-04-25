import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ThemeService from '../api/ThemeService';
import ThreadService from '../api/ThreadService';

export default function ThreadList() {
  const { name } = useParams(); // Получаем значение параметров из URL
  // Теперь переменная id содержит значение из URL, например, /theme/123 -> id будет равно "123"
  const [theme, setTheme] = useState(null);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Действия, которые нужно выполнить при загрузке страницы с темой
    // Примерно что-то вроде загрузки данных о теме с использованием id
    const getThreads = async () => {
        const data = await ThemeService.getByName(name);
        setTheme(data);
        
        // Загрузка тредов с главными постами
        if (data && data.thread) {
          const threadsArray = [];
          for (let threadItem of data.thread) {
            // добавление треда в массив тредов с главными постами
            const threadWithMainPost = await ThreadService.getOnlyWithOriginalPost(threadItem.id);
            threadsArray.push(threadWithMainPost);
          }
          setThreads(threadsArray);
        }
    };
    getThreads();
  }, [name]);

  // Функция добавления нового треда на клиенте
  const removeThreadOnClient = (removeId) => 
    setThreads(threads.filter(({ id }) => id !== removeId));

  // Функция удаления треда в БД и на клиенте
  const handleDelete = async (id) => {
    const isDeleted = await ThreadService.delete(id);
    if (isDeleted) {
      removeThreadOnClient(id);
    }
  }

  const formatDateTime = (dateString) => {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
  
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', options);
  };
  // Вывод списка тредов, каждый из которых содержит
  // ссылку на страницу треда и кнопку удаления
  function Threads() {
    return (
      <>
        <h3>{theme && theme.name}</h3>
        <p>{theme && theme.description}</p>
        <ul>
          {threads && threads.map(({id, isPinned, isArchieved, createdAd, post, rating}) => (
              <li key={id}>
                <Link to={`/thread/${id}`}>
                  #{id} 
                </Link> {" "}
                {isPinned ? "📌" : ""} {" "}
                {isArchieved ? "🗃️" : ""} {" "}
                {post && post[0] && formatDateTime(post[0].createdAt)} {" "}
                
                <button onClick={() => handleDelete(id)}> {" "}
                  Удалить
                </button>
                <p>{post && post[0] && post[0].title}</p>
              </li>
            ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <Threads />
    </>
  )

};