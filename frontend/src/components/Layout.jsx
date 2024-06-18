import React from "react";
import { Link, Outlet } from "react-router-dom";
import ThemeList from './ThemeList';
import logoImage from '../images/icon.png';
import { Layout as LayoutAntd, Menu, theme } from "antd";
const { Header, Sider, Content, Footer } = LayoutAntd;


const Layout = ({ user }) => {
  const itemsHeader = [
    {
      label: <Link to={"/"}>Главная</Link>,
      key: "1",
    },
    {
      label: <Link to={"/account"}>Аккаунт</Link>
    },
    {
      label: <Link to={"/register"}>Регистрация</Link>,
      key: "2",
    },
    {
      label: <Link to={"/login"}>Вход</Link>,
      key: "3",
    },
    {
      label: <Link to={"/logoff"}>Выход</Link>,
      key: "4",
    },
  ]
  

  // return (
  //   <>
  //     <div>
  //       {user.isAuthenticated ? (
  //         <>
  //           <h4>Пользователь: {user.userName}</h4>
  //           <span>Роль: {user.userRole}</span>
  //         </>
  //       ) : (
  //         <h4>Пользователь: Гость</h4>
  //       )}
  //     </div>

  //     <nav>
  //       <Link to="/">Главная</Link> {" "}
  //       <Link to="/register">Регистрация</Link> {" "}
  //       <Link to="/login">Вход</Link> {" "}
  //       <Link to="/logoff">Выход</Link>
  //     </nav>

  //     <ThemeList user={user}/>
  //     <Outlet />
  //   </>
  // )

  const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

  return (
    <LayoutAntd>
      <Header 
        style={{ 
          position: "sticky", 
          top: 0,
          zIndex: 1, 
          width: "100%"
        }}
      >
        <img src={logoImage} alt="-" width="64" height="64" style={{
            float: "left",}}/>

        <div className="demo-logo" />

        <div 
          style={{
            float: "right",
            color: "rgba(255, 255, 255, 0.65)",
          }}
        >
          
          {user.isAuthenticated ? (
            <>
              <strong>{user.userName}</strong> {" "}
              <span>Роль: {user.userRole}</span>
            </>
          ) : (
            <strong>Гость</strong>
          )}
          
        </div>

        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={['1']} 
          items={itemsHeader} 
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <LayoutAntd>
        <Sider
          width={300}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Занимает всю высоту окна просмотра
            background: colorBgContainer,
            padding: '0 8px 8px',
          }}
        >
          <ThemeList user={user}/>
          <Footer style={{ marginTop: 'auto', 
                       textAlign: 'center',
                       color: '#c4c4c4',
                       backgroundColor: '#fff',
                       height: '80px',
                       overflow: 'auto', }}
          >DiscussHub &copy; 2024. <br/>Все права защищены</Footer>
        </Sider>
        <LayoutAntd
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet /> {/* Рендерит текущий дочерний маршрут */}
          </Content>
        </LayoutAntd> 
      </LayoutAntd>
      
    </LayoutAntd>
  )
}

export default Layout
