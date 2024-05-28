import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Modal, Typography } from 'antd';
import ThemeService from '../api/ThemeService';
import ThreadService from '../api/ThreadService';
import PostService from '../api/PostService';
import ThreadCreate from './ThreadCreate';
import ThreadListCard from './ThreadListCard';
const {Title} = Typography;

export default function ThreadList({user}) {
  // Получаем значение параметров из URL.  
  // Например, /theme/Random -> name будет равно "Random"
  const { name } = useParams();

  const [theme, setTheme] = useState(null);
  const [threads, setThreads] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editThreadOP, setEditThreadOP] = useState(null); // состояние для хранения треда для редактирования


  

  const loadThemeAndThreads = useCallback(async () => {
    // Загрузка информации о теме
    const data = await ThemeService.getByName(name);
    setTheme(data);

    // Загрузка тредов с главными постами
    if (data && data.thread) {
      const threadsArray = [];
      for (let threadItem of data.thread) {
        // добавление треда в массив тредов с главными постами
        const threadWithMainPost = 
          await ThreadService.getOnlyWithOriginalPost(threadItem.id);
        threadsArray.push(threadWithMainPost);
      }
      setThreads(threadsArray);
    }
  }, [name]);

  useEffect(() => {
    // Действия, которые нужно выполнить при загрузке страницы с темой
    // и при изменении переменной name
    loadThemeAndThreads();
  }, [name, loadThemeAndThreads]);


  // Функция добавления треда на клиенте
  // const addThreadOnClient = (newThread) => setThreads([...threads, newThread]);

  // Функция удаления треда на клиенте
  const removeThreadOnClient = (removeId) =>
    setThreads(threads.filter(({ id }) => id !== removeId));

  // Обработка редактирования треда с помощью модального окна
  const handleEditThreadModal = (threadId) => {
    const thread = threads.find((t) => t.id === threadId);
    const post = {
      id: thread.post[0].id,
      threadId: thread.post[0].threadId,
      replyToPostId: thread.post[0].replyToPostId,
      userId: thread.post[0].userId,
      isOriginalPost: thread.post[0].isOriginalPost,
      title: thread.post[0].title,
      text: thread.post[0].text,
      createdAt: thread.post[0].createdAt,
      authorIpAddress: thread.post[0].authorIpAddress,
    }
    setEditThreadOP(post);
    setEditModalOpen(true);
  };

  const handleEditThread = async (values) => {
    const updatedThreadOP = { ...editThreadOP, ...values };
    const isUpdated = await PostService.update(updatedThreadOP);
    if (isUpdated) {
      setThreads(threads.map((thread) => 
        (thread.id === updatedThreadOP.threadId  
          ? {...thread, post: [updatedThreadOP, ...thread.post.slice(1)]} 
          : thread)));
    }
    setEditModalOpen(false);
    setEditThreadOP(null);
  }


  // Функция удаления треда в БД и на клиенте
  const handleDeleteThread = async (id) => {
    const isDeleted = await ThreadService.delete(id);
    if (isDeleted) {
      removeThreadOnClient(id);
      loadThemeAndThreads();
    }
  }

  // Функция обработки отмены редактирования треда
  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditThreadOP(null);
  };

  const formatDateTime = (dateString) => {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', options);
  };

  // Вывод списка тредов, каждый из которых содержит
  // ссылку на страницу треда и кнопку удаления
  // function Threads() {
  //   return (
  //     <>
  //       <h3>{theme && theme.name}</h3>
  //       <p>{theme && theme.description}</p>
  //       <hr />

  //       {threads && threads.map(({ id, isPinned, isArchived, createdAt, post, user: userAuthor, rating }) => (
  //         <div key={id}>
  //           <Link to={`/theme/${name}/thread/${id}`}>
  //             #{id}
  //           </Link> {" "}
  //           {isPinned ? "📌 " : ""}
  //           {isArchived ? "🗃️ " : ""}
  //           {post && post[0] && formatDateTime(createdAt)} {" "}
  //           {userAuthor && userAuthor.userName} {" "}

  //           {user && user.isAuthenticated && (user.userRole === "moderator" || user.userRole === "admin") &&
  //             <button onClick={() => handleDelete(id)}>
  //               ❌
  //             </button>} {" "}
  //           <br />
  //           <strong>{post && post[0] && post[0].title}</strong>
  //           <p>{post && post[0] && post[0].text}</p>
  //           <hr />
  //         </div>
  //       ))}
  //     </>
  //   );
  // }

  function Threads() {
    return (
      <>
        {threads && threads.map(({ id, isPinned, isArchived, createdAt, post, user: userAuthor, rating }) => (
          <ThreadListCard
            key={id}
            metaTitle={
               "#" + id + " " +
              (isPinned ? "📌 " : "") +
              (isArchived ? "🗃️ " : "") +
              (post && post[0] && formatDateTime(createdAt)) + " " +
              (userAuthor && userAuthor.userName)
            }
            title={(post && post[0] && post[0].title)}
            description={post && post[0] && post[0].text}
            threadId={id}
            themeName={theme && theme.name}

            user={user}
            onEditModal={handleEditThreadModal}
            onDelete={handleDeleteThread}
          />
        ))}
      </>
    );
  }


  return (
    <>
      <Title>{theme && theme.name}</Title>
      <Title level={3}>{theme && theme.description}</Title>

      {user && user.isAuthenticated && 
      <ThreadCreate updateAllThreads={loadThemeAndThreads} 
                    themeId={theme && theme.id}  
                    userId = {user.id}
                    /> }

      <Threads />

      <Modal
        title="Редактировать тред"
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form
          initialValues={editThreadOP}
          onFinish={handleEditThread}
        >
          <Form.Item
            name="title"
            label="Заголовок"
            rules={[{ required: true, message: 'Пожалуйста, введите заголовок треда' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="text"
            label="Текст"
            rules={[{ required: true, message: 'Пожалуйста, введите текст треда' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
            <Button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
              Отмена
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
};