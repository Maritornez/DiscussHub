import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd'
import ThemeService from '../api/ThemeService';
const {Title} = Typography;

export default function ThemeCreate({ addThemeOnClient }) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const [form] = Form.useForm();

    // Функция добавления новой темы
    const handleSubmit = async (formValues) => {
        //e.preventDefault(); // предотвращение перезагрузки страницы при отправке формы

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
        //e.target.elements.name.value = "";
        setDescription("");
        //e.target.elements.description.value = "";
        form.resetFields();
    };
    

    return (
        <>
            {/* <h4>Новая тема</h4>
            <form onSubmit={handleSubmit}>
                <label>Название: </label>
                <input type="text" name="name" placeholder="Введите название" required onChange={e => setName(e.target.value)} />
                <label>Описание: </label>
                <textarea name="description" placeholder="Введите описание" required onChange={e => setDescription(e.target.value)}/>
                <button type="submit">Создать</button>
            </form> */}

            <Form
                form={form}
                onFinish={handleSubmit}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ title: "-" }}
                autoComplete="off"
            >
                <Title level={5}>Новая тема</Title>

                <Form.Item
                    label="Название"
                    name="name"
                    rules={[{  required: true, message: 'Название не может быть пустым!' }]}
                >
                    <Input onChange={e => setName(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{ required: true, message: 'Описание не может быть пустым!' }]}
                >
                    <Input.TextArea rows={8} onChange={e => setDescription(e.target.value)}/>
                </Form.Item>

                <Form.Item 
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Создать тему
                    </Button>
                </Form.Item>

            </Form>
        </>
  )
}
