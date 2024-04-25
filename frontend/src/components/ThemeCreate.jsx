import React from 'react';
import ThemeService from '../api/ThemeService';

export default function ThemeCreate({ addThemeOnClient }) {
    // Функция добавления новой темы
    const handleSubmit = async (e) => {
        e.preventDefault(); // предотвращение перезагрузки страницы при отправке формы

        // Получание значений полей формы
        const name1 = e.target.elements.name.value;
        const description1 = e.target.elements.description.value;

        // Создание объекта, который отправится на сервер
        const theme = {
            name: name1,
            description: description1
        };
        
        try {
            const createdTheme = await ThemeService.create(theme);
            addThemeOnClient(createdTheme);
            // Очищение строки создания темы
            e.target.elements.name.value = "";
            e.target.elements.description.value = "";
        } catch (error) {
            console.error("Error while creating theme:", error);
        }
    };
    

    return (
    <>
        <h4>Новая тема</h4>
        <form onSubmit={handleSubmit}>
            <label>Название: </label>
            <input type="text" name="name" placeholder="Введите название" />
            <label>Описание: </label>
            <input type="text" name="description" placeholder="Введите описание" />
            <button type="submit">Создать</button>
        </form>
    </>
  )
}
