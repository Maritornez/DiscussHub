import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import ThemeService from '../api/ThemeService';
import ThreadService from '../api/ThreadService';
import ThreadCreate from './ThreadCreate';

export default function ThreadList({user}) {
  // Получаем значение параметров из URL.  
  // Например, /theme/Random -> name будет равно "Random"
  const { name } = useParams();

  const [theme, setTheme] = useState(null);
  const [threads, setThreads] = useState([]);

  

  const loadThemeAndThreads = useCallback(async () => {
    // Загрузка информации о теме
    const data = await ThemeService.getByName(name);
    setTheme(data);

    // Загрузка тредов с главными постами
    if (data && data.thread) {
      const threadsArray = [];
      for (let threadItem of data.thread) {
        // добавление треда в массив тредов с главными постами
        const threadWithMainPost = 
          await ThreadService.getOnlyWithOriginalPost(threadItem.id);
        threadsArray.push(threadWithMainPost);
      }
      setThreads(threadsArray);
    }
  }, [name]);

  useEffect(() => {
    // Действия, которые нужно выполнить при загрузке страницы с темой
    // и при изменении переменной name
    loadThemeAndThreads();
  }, [name, loadThemeAndThreads]);


  // Функция добавления треда на клиенте
  // const addThreadOnClient = (newThread) => setThreads([...threads, newThread]);

  // Функция удаления треда на клиенте
  const removeThreadOnClient = (removeId) =>
    setThreads(threads.filter(({ id }) => id !== removeId));

  // Функция удаления треда в БД и на клиенте
  const handleDelete = async (id) => {
    const isDeleted = await ThreadService.delete(id);
    if (isDeleted) {
      removeThreadOnClient(id);
      loadThemeAndThreads();
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
        <hr />

        {threads && threads.map(({ id, isPinned, isArchived, createdAt, post, user: userAuthor, rating }) => (
          <div key={id}>
            <Link to={`/theme/${name}/thread/${id}`}>
              #{id}
            </Link> {" "}
            {isPinned ? "📌" : ""} {" "}
            {isArchived ? "🗃️" : ""} {" "}
            {post && post[0] && formatDateTime(createdAt)} {" "}
            {userAuthor && userAuthor.userName} {" "}

            {user && user.isAuthenticated && (user.userRole === "moderator" || user.userRole === "admin") &&
              <button onClick={() => handleDelete(id)}>
                Удалить
              </button>} {" "}
              
            <h4>{post && post[0] && post[0].title}</h4>
            <p>{post && post[0] && post[0].text}</p>
            <hr />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <Threads />
      {user && user.isAuthenticated && 
      <ThreadCreate updateAllThreads={loadThemeAndThreads} 
                    themeId={theme && theme.id}  
                    userId = {user.id}
                    /> }
    </>
  )
};