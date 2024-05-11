import React, { useState } from "react"
//import { useNavigate } from "react-router-dom"
import { Button, Form, Input } from 'antd';
import WebAPI_URL from "../config"

/**
 * Компонент, отображающий страницу регистрации
 * @param {User} user пользователь
 * @param {User} setUser метод изменения пользователя
 */
const Register = ({ user, setUser }) => {
    //const [errorMessages, setErrorMessages] = useState([]);
    //const navigate = useNavigate();
    const [registerOutcome, setRegisterOutcome] = useState("");
    const [isSuccessfullyRegistered, setIsSuccessfullyRegistered] = useState(false);

    /**
     * Функция обращения к swagger для регистрации
     * @param {any} event
     */
    const Register = async (formValues) => {
        //event.preventDefault();

        // var { email, password, passwordConfirm } = event.target.elements;
        // console.log(email.value, password.value)

        const requestOptions =
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formValues.email,
                userName: formValues.userName,
                password: formValues.password,
                passwordConfirm: formValues.passwordConfirm,
            }),
            credentials: 'include', // включает отправку куки с запросами, даже когда идет кроссдоменный запрос
        };


        

        return await fetch(WebAPI_URL + "account/register", requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    //setUser({ isAuthenticated: true, userName: "" });
                    //console.log("Good Response:", response.errorMsg);
                    setRegisterOutcome("Регистрация прошла успешно! Теперь вы можете авторизоваться");
                    setIsSuccessfullyRegistered(true);
                    //navigate("/");
                } else if (response.status === 201) {
                    //console.log("Not Good Response:", response);
                    setRegisterOutcome("Регистрация не удалась");
                    setIsSuccessfullyRegistered(false);
                    //navigate("/");
                } else {
                    setRegisterOutcome("Непредвиденное поведение");
                }
                //return response.json();
            })
            // .then(
            //     (data) => {
            //         console.log("Data:", data);
            //         if (typeof data !== "undefined" &&
            //             typeof data.userName !== "undefined" &&
            //             typeof data.dateTimeJoined !== "undefined" &&
            //             typeof data.lastVisited !== "undefined" &&
            //             typeof data.id !== "undefined")
            //         {
            //             setUser({ isAuthenticated: true, 
            //                       userName: data.userName,
            //                       dateTimeJoined: data.dateTimeJoined,
            //                       lastVisited: data.lastVisited,
            //                       id: data.id });
            //             //window.location.assign("/");
            //             navigate("/");
            //         }
            //         typeof data !== "undefined" && 
            //             typeof data.error !== "undefined" && 
            //                 setErrorMessages(data.error)
            //     },
            //     (error) => {
            //         console.log(error);
            //     }
            //)
    }

    // const renderErrorMessage = () => 
    //     errorMessages.map((error, index) => <div key={index}>{error}</div>)


    let registerForm =
        <>
            {/* <h3>Регистрация</h3>
            <form onSubmit={Register}>
                <label>Электронная почта: </label>
                <input type="text" name="email" placeholder="Почта" required/>
                <br />
                <label>Имя пользователя: </label>
                <input type="text" name="userName" placeholder="Имя пользователя" required/>
                <br />
                <label>Пароль: </label>
                <input type="password" name="password" placeholder="Пароль" required/>
                <br />
                <label>Повторите пароль: </label>
                <input type="password" name="passwordConfirm" placeholder="Повторите пароль" required/>
                <br />
                <button type="submit">Зарегистрироваться</button>
            </form> */}

            <Form
            onFinish={Register}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ rememberme: true }}
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
                label="Логин"
                name="userName"
                rules={[
                    { required: true, message: "Пожалуйста, введите логин" },
                ]}
            >
                <Input placeholder="Login" />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[
                    { required: true, message: "Пожалуйста, введите пароль" },
                ]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>
            
            <Form.Item
                label="Повторите пароль"
                name="passwordConfirm"
                rules={[
                    { required: true, message: "Пожалуйста, повторите пароль" },
                ]}
            >
                <Input.Password placeholder="Password Again" />
            </Form.Item>

            <Form.Item 
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Button type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </Form.Item>
          </Form>
        </>

    return (
        <>
            {user.isAuthenticated ? (
                <>
                    <h3>Пользователь {user.userName} зарегистрирован в системе.</h3>
                    Выйдите из системы, если хотите зарегистрировать новую учетную запись
                </>
            ) : (
                <>
                    {!isSuccessfullyRegistered && registerForm}

                    {registerOutcome}
                </>
            )}
        </>
    )
}

export default Register
