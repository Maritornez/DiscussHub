import React, { useState } from "react"
//import { useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input } from "antd"
import WebAPI_URL from "../config"

const LogIn = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
 // const navigate = useNavigate();

  const logIn = async (formValues) => {
    //event.preventDefault() // не нужно при использовании antd
    //console.log("Success:", formValues)

    //var { email, password } = document.forms[0]
    //console.log(email.value, password.value)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password,
        // rememberme: formValues.rememberme,
      }),
      credentials: 'include', // включает отправку куки с запросами, даже когда идет кроссдоменный запрос
    }

    return await fetch(WebAPI_URL + "account/login", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setUser({ isAuthenticated: true, userName: "" });
        }
        return response.json();
      })
      .then(
        (data) => {
          //console.log("Data:", data)
          if (typeof data !== "undefined" &&
              typeof data.userName !== "undefined" &&
              typeof data.dateTimeJoined !== "undefined" &&
              typeof data.lastVisited !== "undefined" &&
              typeof data.id !== "undefined" &&
              typeof data.userRole !== "undefined") 
          {
            setUser({ isAuthenticated: true, 
                      userName: data.userName,
                      dateTimeJoined: data.dateTimeJoined,
                      lastVisited: data.lastVisited,
                      id: data.id,
                      userRole: data.userRole });
            //navigate("/");
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>)

  return (
    <>
      {user.isAuthenticated ? (
        <h3>Пользователь {user.userName} успешно вошел в систему</h3>
      ) : (
        <>
          {/* <h3>Вход</h3>
          <form onSubmit={logIn}>
            Пользователь
            <input type="text" name="email" placeholder="Почта" required/>
            <br />
            Пароль
            <input type="password" name="password" placeholder="Пароль" required/>
            <br />
            Запомнить меня?
            <input type="checkbox" name="rememberme" defaultChecked={true}/>
            <br /> 
            <button type="submit">Войти</button>
          </form>
          {renderErrorMessage()} */}

          <Form
            onFinish={logIn}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ rememberme: true }}
            onFinishFailed={renderErrorMessage}
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
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="rememberme"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Запомнить меня</Checkbox>
              {renderErrorMessage()}
            </Form.Item>

            <Form.Item 
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  )
}

export default LogIn
