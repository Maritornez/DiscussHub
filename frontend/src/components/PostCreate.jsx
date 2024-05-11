import React, { useState } from 'react';
import PostService from '../api/PostService';
import ThreadService from '../api/ThreadService';

export default function PostCreate({ undateAllPosts, threadId, userId }) {
    //const [replyToPostId, setReplyToPostId] = useState();
    const [title, setTitle] = useState("-");
    const [text, setText] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault(); // предотвращение перезагрузки страницы при отправке формы

        // Получание значений полей формы
        // нужно для того, чтобы при автоподстановке номера поста номер поста в replyToPostId обновлялся. С помощью OnChange на кнопке не автообновляется
        const replyToPostId1 = e.target.elements.replyToPostId.value !== '' 
                ? e.target.elements.replyToPostId.value : null
        //setReplyToPostId(replyToPostId1); 
        //const title1 = e.target.elements.title.value !== '' 
        //                        ? e.target.elements.title.value : "-";
        //const text1 = e.target.elements.text.value;
        const dateTime1 = new Date().toISOString();

        // Получение выбранного файла
        // if (e.target.elements.fileInput) {
        //     const file1 = e.target.elements.fileInput.files[0];
        //     if (file1) {
        //         console.log("Выбранный файл:", file1);
        //         console.log("Имя файла:", file1.name);
        //         console.log("Размер файла (в байтах):", file1.size);
        //         console.log("MIME-тип файла:", file1.type);
        //         console.log("Время последнего изменения файла:", new Date(file1.lastModified));
        //         //... здесь можно выполнить нужные действия с файлом, например, загрузить его на сервер
        //     } else {
        //         console.log("Файл не выбран");
        //     }
        // }
        // Обработка выбранного файла
        //...                                                                       // Добавить обработку файла

        

        // Создание объекта, который отправится на сервер
        const post = {
            threadId: threadId,
            replyToPostId: replyToPostId1,                                          // Добавить возможность отвечать на посты
            userId: userId.toString(),                                            // Добавить запись userId
            isOriginalPost: false,
            title: title,
            text: text,
            createdAt: dateTime1,
            authorIpAddress: "127.0.0.1"                                            // Добавить запись IP-адреса пользователя
            //image: null                                                           // Добавить обработку изображений
        }

        // Создание поста на сервере и на клиенте
        await PostService.create(post);
        undateAllPosts();

        // Очищение строки создания поста
        //setReplyToPostId();
        e.target.elements.replyToPostId.value = "";
        setTitle("-");
        e.target.elements.title.value = "-";
        setText("");
        e.target.elements.text.value = "";
        if (e.target.elements.fileInput) {
            e.target.elements.fileInput.value = "";
        }

        // Обновление поля lastPostDateTime в tread
        var threadFromDB = await ThreadService.get(threadId);
        var thread = {
            id: threadFromDB.id,
            themeId: threadFromDB.themeId,
            userId: threadFromDB.userId,
            authorIpAddress: threadFromDB.authorIpAddress,
            isPinned: threadFromDB.isPinned,
            isArchived: threadFromDB.isArchived,
            createdAt: threadFromDB.createdAt,
            lastPostDateTime: dateTime1
        }
        await ThreadService.update(thread);
        
    }

    return (
        <>
            <h4>Новый пост</h4>
            <form onSubmit={handleSubmit}>
                <label>Ответ на этот пост: </label>
                <input type="text" name="replyToPostId" placeholder="Введите номер поста"/>
                <label>Заголовок: </label>
                <input type="text" name="title" placeholder="Введите заголовок" defaultValue="-" required onChange={e => setTitle(e.target.value)}/>
                <label>Текст: </label>
                <textarea name="text" placeholder="Введите текста поста" required onChange={e => setText(e.target.value)}/>
                <input type="file" accept="image/*"></input>
                <button type="submit">Создать</button>
            </form>
        </>
  )
}
