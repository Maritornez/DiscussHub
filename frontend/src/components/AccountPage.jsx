import React, {useState} from 'react'
import { Button, Form, Input, Typography } from 'antd';
import AccountService from '../api/AccountService';

function AccountPage({user}) {
    const [formEditEmail] = Form.useForm();
    const [formEditPassword] = Form.useForm();
    const [isSuccessfullyChangeEmail, setIsSuccessfullyChangeEmail] = useState(false);
    const [isSuccessfullyChangePassword, setIsSuccessfullyChangePassword] = useState(false);

    const handleEditEmail = async (formValues) => {
        const emailObj = {
            newEmail: formValues.email
        }

        const result = await AccountService.editEmail(emailObj);

        if (result !== null) {
            setIsSuccessfullyChangeEmail(true)
        }
    }

    const handleEditPassword = async (formValues) => {
        const passwordObj = {
            currentPassword: formValues.oldPassword,
            newPassword: formValues.newPassword
        }

        const result = await AccountService.editPassword(passwordObj);

        if (result !== null) {
            setIsSuccessfullyChangePassword(true)
        }
    }

    return (
        <>
            <Typography.Title level={3}>Почта</Typography.Title>
            <Form
                form={formEditEmail}
                onFinish={handleEditEmail}
                name="accountEditEmailForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    email: user.email,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Электронная почта"
                    name="email"
                    rules={[
                        { required: true, message: "Пожалуйста, введите почту" },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                
                <Form.Item 
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Изменить почту
                    </Button>
                </Form.Item>
            </Form>
            {isSuccessfullyChangeEmail && <p>Почта успешно изменена</p>}

            <Typography.Title level={3}>Пароль</Typography.Title>
            <Form
                form={formEditPassword}
                onFinish={handleEditPassword}
                name="accountEditPasswordForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
            >
                
                <Form.Item
                    label="Старый пароль"
                    name="oldPassword"
                    rules={[
                        { required: true, message: "Пожалуйста, введите пароль" },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    label="Новый пароль"
                    name="newPassword"
                    rules={[
                        { required: true, message: "Пожалуйста, введите пароль" },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                
                <Form.Item 
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Изменить пароль
                    </Button>
                </Form.Item>
            </Form>
            {isSuccessfullyChangePassword && <p>Пароль успешно изменен</p>}
        </>
    )
}

export default AccountPage