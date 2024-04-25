import * as React from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ThemeService from '../api/ThemeService';
import ThemeCreate from './ThemeCreate';

export default function ThemeList() {
  // Состояния компонента
  const [themes, setThemes] = useState([]);


  useEffect(() => {
    const getThemes = async () => {
        setThemes(await ThemeService.getAllWithoutThreads());
    };
    getThemes();
  }, []);

  // Функция добавления новой темы на клиенте
  const addThemeOnClient = (theme) => setThemes([...themes, theme]);

  // Функция удаления темы на клиенте
  const removeThemeOnClient = (removeId) => 
    setThemes(themes.filter(({ id }) => id !== removeId));
  
  // Функция удаления темы в БД и на клиенте
  const handleDelete = async (id) => {
    const isDeleted = await ThemeService.delete(id);
    if (isDeleted) {
      removeThemeOnClient(id);
    }
  }
  
  // Функция редактирования темы
  const handleEdit = async (id) => {

  }

  // Вывод списка тем, каждая из которых содержит 
  // ссылку на страницу темы и кнопку удаления
  function Themes() {
    return (
      <>
        <h3>Темы</h3>
        {themes && themes.map(({ id, name, description }) => (
          <div key={id}>
            <Link to={`/theme/${name}`}>
              <strong>{name}</strong> ({description})
            </Link>
            <button onClick={() => handleDelete(id)}>
              Удалить
            </button>
            <button onClick={() => handleEdit(id)}>
              Редактировать
            </button>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <Themes />
      <ThemeCreate addThemeOnClient={addThemeOnClient} />
    </>
  );
}






