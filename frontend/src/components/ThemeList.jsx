import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeService from '../api/ThemeService';
import ThemeCreate from './ThemeCreate';

export default function ThemeList({user}) {
  // Состояния компонента
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate();


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
      navigate("/")
    }
  }
  
  // Функция редактирования темы
  // const handleEdit = async (id) => {
    //...
  // }

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

            {user && user.isAuthenticated && user.userRole === "admin" &&
              <button onClick={() => handleDelete(id)}>
                Удалить
              </button> } {" "}
            
            {/*user && user.isAuthenticated && user.userRole === "admin" &&
              <button onClick={() => handleEdit(id)}>
                Редактировать
              </button>*/}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <Themes />
      {user && user.isAuthenticated && user.userRole === "admin" &&
        <ThemeCreate addThemeOnClient={addThemeOnClient}/>}
    </>
  );
}






