import React, { useState } from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PostService from '../api/PostService';
import ThreadService from '../api/ThreadService';
import ImageService from '../api/ImageService'; 
const { Dragger } = Upload;


export default function PostCreate({ updateAllPosts, threadId, userId, form }) {
    //const [replyToPostId, setReplyToPostId] = useState();
    const [title, setTitle] = useState("-");
    const [text, setText] = useState();
    
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };    

    const handleSubmit = async (formValues) => {
        //e.preventDefault(); // предотвращение перезагрузки страницы при отправке формы

        // Получание значений полей формы
        // нужно для того, чтобы при автоподстановке номера поста номер поста в replyToPostId обновлялся. С помощью OnChange на кнопке не автообновляется
        const replyToPostId1 = formValues.replyToPostId !== '' 
                ? formValues.replyToPostId : null
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

        

        // Создание объекта поста, который отправится на сервер
        const post = {
            threadId: threadId,
            replyToPostId: replyToPostId1, 
            userId: userId.toString(),            
            isOriginalPost: false,
            title: title,
            text: text,
            createdAt: dateTime1
     }

        // Создание поста на сервере и на клиенте
        const createdPost = await PostService.create(post);

        // Создание записи в таблице Image и загрузка изображения на сервер
        if (formValues.fileInput && formValues.fileInput.length > 0) {
            const formData = new FormData();
            formData.append('FormFile', formValues.fileInput[0].originFileObj);
            formData.append('PostId', createdPost.id);

            await ImageService.upload(formData);
        }

        updateAllPosts();

        // Очищение строки создания поста
        //setReplyToPostId();
        // formValues.replyToPostId = "";
        setTitle("-");
        // formValues.title = "-";
        setText("");
        // formValues.text = "";
        // if (formValues.fileInput) {
        //     formValues.fileInput = "";
        // }
        // Очищение формы методом antd
        form.resetFields();

        // Обновление поля lastPostDateTime в tread
        var threadFromDB = await ThreadService.get(threadId);
        var thread = {
            id: threadFromDB.id,
            themeId: threadFromDB.themeId,
            userId: threadFromDB.userId,
            isPinned: threadFromDB.isPinned,
            isArchived: threadFromDB.isArchived,
            createdAt: threadFromDB.createdAt,
            lastPostDateTime: dateTime1
        }
        await ThreadService.update(thread);
        

        // Обработка сохранение изображения в базе данных

        
    }

    return (
        <>
            {/* <h4>Создать пост</h4>
            <form onSubmit={handleSubmit}>
                <label>Ответить на пост #</label>
                <input type="text" name="replyToPostId" placeholder="Введите номер поста"/>
                <label>Заголовок: </label>
                <input type="text" name="title" defaultValue="-" required onChange={e => setTitle(e.target.value)}/>
                <label>Текст поста:</label>
                <textarea name="text" required onChange={e => setText(e.target.value)}/>
                <input type="file" name="fileInput" accept="image/*"></input>
                <button type="submit">Создать</button>
            </form> */}

            <Form
                form={form}
                onFinish={handleSubmit}
                name="postCreate"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ title: "-" }}
                autoComplete="off"
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h4>Создать пост</h4>
                </div>

                <Form.Item
                    label="Ответить на пост #"
                    name="replyToPostId"
                    rules={[{ required: true, message: 'Ответьте на пост, например, на OP' }]}
                >
                    <Input placeholder="Введите номер поста"/>
                </Form.Item>

                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{ required: true, message: 'Заголовок не может быть пустым' }]}
                >
                    <Input onChange={e => setTitle(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Текст поста"
                    name="text"
                    rules={[{ required: true, message: 'Текст поста не может быть пустым' }]}
                >
                    <Input.TextArea rows={8} onChange={e => setText(e.target.value)}/>
                </Form.Item>

                <Form.Item 
                    label="Картинка:"
                    name="fileInput"
                    valuePropName="fileList" 
                    getValueFromEvent={normFile}
                >
                    <Dragger
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false}
                    >
                        <button
                        style={{
                            border: 0,
                            background: 'none',
                        }}
                        type="button"
                        >
                        <PlusOutlined />
                        <div
                            style={{
                            marginTop: 8,
                            }}
                        >
                            Upload
                        </div>
                        </button>
                    </Dragger>
                </Form.Item>
                
                <Form.Item 
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Создать пост
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}
