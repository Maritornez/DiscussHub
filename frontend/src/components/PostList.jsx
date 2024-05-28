import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// HashLink используется для создания якорей на странице. Якори прикреплены к постам. Ссылки в ответах к постам ведут к якорям постов
import { HashLink } from 'react-router-hash-link';
import { Button, Form, Tooltip, Tree  } from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import ThreadService from '../api/ThreadService';
import PostService from '../api/PostService';
import PostCreate from './PostCreate';


export default function PostList({user}) {
  // Получаем значение параметров из URL
  // name - имя темы, id - ID треда
  const { name: themeName, id: threadId } = useParams(); 

  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);

  const [form] = Form.useForm(); // форма для создания поста

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
  }, [threadId]);

  useEffect(() => {
    loadThreadAndPosts();
  }, [threadId, loadThreadAndPosts]);

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
        {post.userAuthor && post.userAuthor.userName} {" "}

        {user && user.isAuthenticated &&
          <Tooltip title="Ответить">
            <Button type="text" size="small" onClick={() => copyPostId(post.id)}>↩</Button> {" "}
          </Tooltip>}
        {!post.isOriginalPost && user && user.isAuthenticated && (user.userRole === "moderator" || user.userRole === "admin") &&
          <Button type="text" size="small" onClick={() => handleDelete(post.id)}><DeleteOutlined /></Button>} {" "}
        <br />

        <strong>{post.title}</strong>
        <br />
        <br />
        <p>{post.text}</p>
        
        {post.inverseReplyToPost.length !== 0 && <>Ответы: {" "}</>} 
        {post.inverseReplyToPost.map(({ id }) => (
            <span key={id}>
              <HashLink to={`/theme/${themeName}/thread/${threadId}#${id}`}> 
                #{id} {" "}
              </HashLink>
            </span>
        ))}

        <hr />
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
      {user && user.isAuthenticated &&
        <PostCreate undateAllPosts={loadThreadAndPosts} threadId={threadId} userId={user.id} form={form}/>}
      <Posts />
    </>
  )
}