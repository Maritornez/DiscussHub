import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// HashLink используется для создания якорей на странице. Якори прикреплены к постам. Ссылки в ответах к постам ведут к якорям постов
// import { HashLink } from 'react-router-hash-link';
import { Button, Form, Image, Input, Modal, Tooltip, Tree, Typography  } from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import ThreadService from '../api/ThreadService';
import PostService from '../api/PostService';
import ImageService from '../api/ImageService';
import PostCreate from './PostCreate';
import ReactMarkdown from 'react-markdown';

const { Title } = Typography;



export default function PostList({user}) {
  // Получаем значение параметров из URL
  // name - имя темы, id - ID треда
  const { name: themeName, id: threadId } = useParams(); 

  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null); // состояние для хранения поста для редактирования

  const [form] = Form.useForm();
  const [images, setImages] = useState({});

  const loadThreadAndPosts = useCallback(async () => {
    // Загрузка треда.
    // Посты треда содержатся в треде в поле "post", но они не содержат инфу о пользователях. 
    // Поэтому посты загружаются отдельно 
    const threadData = await ThreadService.get(threadId);
    setThread(threadData);
    
    // Загрузка постов треда с помощью метода из PostService
    const postsData = await PostService.getByThreadId(threadId);
    setPosts(postsData);
    //console.log(posts)

    const imagesData = await fetchImages(postsData);
    setImages(imagesData);
  }, [threadId]);

  useEffect(() => {
    loadThreadAndPosts();
  }, [threadId, loadThreadAndPosts]);

  const fetchImages = async (posts) => {
    const imagesData = {};
    for (const post of posts) {
        if (post.image.length > 0) {
        const imageUrl = await ImageService.getFileByPostId(post.id);
        if (imageUrl) {
          imagesData[post.id] = imageUrl;
        }
        }
    }
    return imagesData;
  };

  // Функция обновления конкретного поста
  // const updateThePostOnClient = (post) => {
  //   const newPostList = posts.map(p => p.id === post.id ? post : p)
  //   setPosts(newPostList);
  // }

  // Функция дабавления нового поста на клиенте
  // const addPostOnClient = (post) => setPosts([...posts, post]);

  // Функция удаления поста на клиенте
  // const removePostOnClient = (removeId) => {
  //   setPosts(posts.filter(({ id }) => id !== removeId));
  // }

  // Обработка редактирования поста с помощью модального окна
  const handleEditPostModal = (post) => {
    setEditPost(post)
    setEditModalOpen(true);
  };

  const handleEditPost = async (values) => {
    const updatedPost = { ...editPost, ...values };
    const isUpdated = await PostService.update(updatedPost);
    if (isUpdated) {
      setPosts(posts.map((post) => post.id === updatedPost.id ? updatedPost : post));      
    }
      setEditModalOpen(false);
      setEditPost(null);
  }

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditPost(null);
  };

  // Функция удаления поста в БД и на клиенте
  const handleDelete = async (id) => {
    const isDeleted = await PostService.delete(id);
    if (isDeleted) {
      //removePostOnClient(id);
      loadThreadAndPosts(); // 
    }
  }

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


  // Функция для преобразования данных о постах в формат, который может использовать Tree
  const convertPostsToTreeData = (posts) => {
    // Создаем объект для быстрого доступа к постам по id
    const postsById = {};
    posts.forEach(post => {
      postsById[post.id] = { ...post, children: [] };
    });
  
    // Создаем дерево
    posts.forEach(post => {
      if (post.replyToPostId) {
        const parentPost = postsById[post.replyToPostId];
        if (parentPost) {
          parentPost.children.push(postsById[post.id]);
        }
      }
    });
  
    // Преобразуем данные в формат, который может использовать Tree
    const treeData = Object.values(postsById).filter(post => !post.replyToPostId).map(post => convertPostToTreeNode(post));
  
    return treeData;
  };
  
  const convertPostToTreeNode = (post) => ({
    title: 
      <div style={{
        border: "1px solid #ccc", /* Рамка вокруг поста */
        backgroundColor: "#f5f5f5", /* Цвет фона поста */
        padding: "10px", /* Отступ внутри поста */
        marginBottom: "10px", /* Отступ между постами */
        wordWrap: "break-word", /* Перенос слов */
        hyphens: "auto", /* Автоматический перенос слов с дефисом */
      }}>
        #{post.id} {" "}
        {formatDateTime(post.createdAt)} {" "}
        {post.user && post.user.userName} {" "}

        {user && user.isAuthenticated &&
          <Tooltip title="Ответить">
            <Button type="text" size="small" onClick={() => copyPostId(post.id)}>↩</Button> {" "}
          </Tooltip>}

        {user && user.isAuthenticated && (user.userRole === "moderator" || user.userRole === "admin") &&
          <Button type="text" size="small" onClick={() => handleEditPostModal(post)}><EditOutlined /></Button>} {" "}

        {!post.isOriginalPost && user && user.isAuthenticated && (user.userRole === "moderator" || user.userRole === "admin") &&
          <Button type="text" size="small" onClick={() => handleDelete(post.id)}><DeleteOutlined /></Button>} {" "}
        <br />

        <strong>{post.title}</strong>
        <br />
        <br />

        <div style={{ display: 'flex', justifyContent: 'left', margin: '0px' }}>
          {images[post.id] && <Image src={images[post.id]} alt={`Image for post ${post.id}`} width={400}/>}
          <div style={{ margin: '0 20px', whiteSpace: 'pre-wrap' }}>
            <ReactMarkdown>{post.text}</ReactMarkdown>
          </div>
        </div>
        
        {/*post.inverseReplyToPost.length !== 0 && <>Ответы: {" "}</>*/} 
        {/*post.inverseReplyToPost.map(({ id }) => (
            <span key={id}>
              <HashLink to={`/theme/${themeName}/thread/${threadId}#${id}`}> 
                #{id} {" "}
              </HashLink>
            </span>
        ))*/}

        
      </div>,
    key: post.id,
    children: post.children.map(convertPostToTreeNode),
  });

  const copyPostId = (postId) => {
      // const replyToPostInput = document.querySelector('input[name="replyToPostId"]');
      // replyToPostInput.value = postId;
      form.setFieldsValue({ replyToPostId: postId });
    };

  // Вывод списка постов, каждый из которых содержит кнопку удаления
  // function PostsOld() {
  //   return (
  //     <>
  //       <h3>
  //         Тред #{thread && thread.id} {" "}
  //         {thread && thread.isPinned ? "📌" : ""} {" "}
  //           {thread && thread.isArchived ? "🗃️" : ""} {" "}
  //       </h3>
  //       <hr />
        
  //       {posts && posts
  //         .map(({ id: postId, title, text, createdAt, user: userAuthor, inverseReplyToPost, isOriginalPost }) => ( 
  //           <div key={postId} id={postId}>
  //             #{postId} {" "}
  //             {formatDateTime(createdAt)} {" "}
  //             {userAuthor && userAuthor.userName} {" "}

  //             {user && user.isAuthenticated &&
  //               <Tooltip title="Ответить">
  //                 <Button type="text" size="small" onClick={() => copyPostId(postId)}>↩</Button> {" "}
  //               </Tooltip>}
  //             {!isOriginalPost && user && user.isAuthenticated && (user.userRole === "moderator" || user.userRole === "admin") &&
  //               <Button type="text" size="small" onClick={() => handleDelete(postId)}><DeleteOutlined /></Button>} {" "}
  //             <br />

  //             <strong>{title}</strong>
  //             <br />
  //             <br />
  //             <p>{text}</p>
              
  //             {inverseReplyToPost.length !== 0 && <>Ответы: {" "}</>} 
  //             {inverseReplyToPost.map(({ id }) => (
  //                 <span key={id}>
  //                   <HashLink to={`/theme/${themeName}/thread/${threadId}#${id}`}> 
  //                     #{id} {" "}
  //                   </HashLink>
  //                 </span>
  //             ))}

  //             <hr />
  //           </div>
  //         ))}
  //     </>
  //   )
  // }



// Использование Tree в компоненте
function Posts() {
  const treeData = convertPostsToTreeData(posts);

  return (
    <Tree
      treeData={treeData}
      defaultExpandAll
      showLine
    />
  );
}

  return (
    <>
      <Title level={4}>
       {themeName} {" > "} Тред #{thread && thread.id} {" "}
        {thread && thread.isPinned ? "📌" : ""} {" "}
          {thread && thread.isArchived ? "🗃️" : ""} {" "}
      </Title>
      <hr />

      {user && user.isAuthenticated &&
        <PostCreate updateAllPosts={loadThreadAndPosts} threadId={threadId} userId={user.id} form={form}/>}

      <Posts />

      <Modal
        title="Редактирование поста"
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form
          initialValues={editPost}
          onFinish={handleEditPost}
        >
          <Form.Item
            name="title"
            label="Заголовок"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите заголовок поста',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="text"
            label="Текст"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите текст поста',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>

            <Button type="text" onClick={handleCancelEdit}>
              Отмена
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}