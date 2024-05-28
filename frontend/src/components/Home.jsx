import React from 'react'
import { Link } from 'react-router-dom';
import { Typography, Image } from 'antd'
import tableImage from '../images/round-table.png'
const { Title } = Typography

export default function Home() {
  return (
    <>
        <Title level={1}>DiscussHub</Title>
        <Title level={3}>Добро пожаловать!</Title>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <Image src={tableImage} alt="round-table" width="100%" preview={false} />
        </div>

        <p>
          <strong>Форум</strong> — это онлайн-платформа, созданная для обмена информацией, обсуждения тем и взаимодействия между пользователями. На форуме пользователи могут создавать новые треды для обсуждения тем, оставлять посты в существующих тредах, делиться своим опытом, задавать вопросы, отвечать на вопросы других участников и так далее.
          Форум организован в виде тем и тредов, каждый из которых посвящен определенной тематике и аспекту в рамках конкретной темы.
        </p>

        <p>
          Вы можете начать обзор с раздела <Link to="/theme/Random">Random</Link>. В нем можно встретить любую тему, потому что он не предназначен для конкретной темы.
        </p>

    </>
  )
}
