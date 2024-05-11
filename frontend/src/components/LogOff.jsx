import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "antd"
import WebAPI_URL from "../config"

const LogOff = ({ setUser }) => {
  const navigate = useNavigate()

  const logOff = async (formValues) => {
    //event.preventDefault()

    const requestOptions = {
      method: "POST",
      credentials: 'include', // включает отправку куки с запросами всегда, даже когда идет кроссдоменный запрос
    }
    return await fetch(WebAPI_URL + "account/logoff", requestOptions)
      .then((response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "", id: "", userRole: ""})

        response.status === 401 
          && navigate("/login")
        // navigate("/")
      })      
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        Вы действительно хотите выйти?
      </div>

      {/* <form onSubmit={logOff}>
        <button type="submit">Выход</button>
      </form> */}
    
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Form
          onFinish={logOff}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: '0 auto' }}
          initialValues={{ rememberme: true }}
          autoComplete="off"
        >
          <Form.Item 
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              Выйти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LogOff


