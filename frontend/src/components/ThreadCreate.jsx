import React, { useState } from 'react'
import { Button, Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ThreadService from '../api/ThreadService'
import PostService from '../api/PostService'
import ImageService from '../api/ImageService'

const { Dragger } = Upload; 


// Поскольку тред является оболочкой для списка постов с главным постом
// то новый тред создается совместно с главным постом
// то есть нужно ввести данные главного поста
// а данные нового треда заполняются автоматически

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
};



export default function ThreadCreate({ updateAllThreads, themeId, userId }) {
    const [title, setTitle] = useState("-");
    const [text, setText] = useState();

    const [form] = Form.useForm();

    const handleSubmit = async (formValues) => {
        //e.preventDefault(); // предотвращение перезагрузки страницы при отправке формы

        // Получение значений полей формы
        //const title1 = e.target.elements.title.value;
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

        // Создание объекта треда, который отправится на сервер
        const thread = {
            themeId: themeId,
            userId: userId.toString(),
            isPinned: false,
            isArchived: false,
            createdAt: dateTime1,
            lastPostDateTime: dateTime1
        }
        const createdThread = await ThreadService.create(thread);

        // Создание объекта поста, который отправится на сервер
        const post = {
            threadId: createdThread.id,
            replyToPostId: null,
            userId: userId.toString(),
            isOriginalPost: true,
            title: title,
            text: text,
            createdAt: dateTime1,
        }
        
        const createdPost = await PostService.create(post);

        // Создание записи в таблице Image и загрузка изображения на сервер
        if (formValues.fileInput && formValues.fileInput.length > 0) {
            const formData = new FormData();
            formData.append('FormFile', formValues.fileInput[0].originFileObj);
            formData.append('PostId', createdPost.id);

            await ImageService.upload(formData);
        }

        // Обновление списка тредов на клиенте (чтобы отображался новый тред с оригинальным постом)
        updateAllThreads();

        // Очищение строки создания поста
        setTitle("-");
        //e.target.elements.title.value = "-";
        setText("");
        //e.target.elements.text.value = "";
        // if (e.target.elements.fileInput) {
        //     e.target.elements.fileInput.value = "";
        // }
        // Очищение формы методом antd
        form.resetFields();
    }

    return (
        <>
            {/* <h4>Создать тред</h4>
            <form onSubmit={handleSubmit}>
                <label>Название: </label>
                <input type="text" name="title" placeholder="Введите заголовок" defaultValue="-" required onChange={e => setTitle(e.target.value)}/>
                <br />
                <label>Текст: </label>
                <textarea name="text" placeholder="Введите текста поста" required onChange={e => setText(e.target.value)}/>
                <br />
                <input type="file" accept="image/*"></input>
                <br />
                <button type="submit">Создать</button>
            </form> */}

            <Form
                form={form}
                onFinish={handleSubmit}
                name="threadCreate"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ title: "-" }}
                autoComplete="off"
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h4>Создать тред</h4>
                </div>

                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{  required: true, message: 'Заголовок не может быть пустым!' }]}
                >
                    <Input onChange={e => setTitle(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Текст поста"
                    name="text"
                    rules={[{ required: true, message: 'Текст поста не может быть пустым!' }]}
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
                        Создать тред
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}
