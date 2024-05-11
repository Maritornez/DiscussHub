import React, { useState } from 'react';
import ThemeService from '../api/ThemeService';

export default function ThemeCreate({ addThemeOnClient }) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    // Функция добавления новой темы
    const handleSubmit = async (e) => {
        e.preventDefault(); // предотвращение перезагрузки страницы при отправке формы

        // Получание значений полей формы
        //const name1 = e.target.elements.name.value;
        //const description1 = e.target.elements.description.value;

        // Создание объекта, который отправится на сервер
        const theme = {
            name: name,
            description: description
        };
        
        const createdTheme = await ThemeService.create(theme);
        addThemeOnClient(createdTheme);

        // Очищение строки создания темы
        setName("");
        e.target.elements.name.value = "";
        setDescription("");
        e.target.elements.description.value = "";
    };
    

    return (
        <>
            <h4>Новая тема</h4>
            <form onSubmit={handleSubmit}>
                <label>Название: </label>
                <input type="text" name="name" placeholder="Введите название" required onChange={e => setName(e.target.value)} />
                <label>Описание: </label>
                <textarea name="description" placeholder="Введите описание" required onChange={e => setDescription(e.target.value)}/>
                <button type="submit">Создать</button>
            </form>
        </>
  )
}
