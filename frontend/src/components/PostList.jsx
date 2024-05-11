import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// HashLink используется для создания якорей на странице. Якори прикреплены к постам. Ссылки в ответах к постам ведут к якорям постов
import { HashLink } from 'react-router-hash-link';
import ThreadService from '../api/ThreadService';
import PostService from '../api/PostService';
import PostCreate from './PostCreate';


export default function PostList({user}) {
  // Получаем значение параметров из URL
  // name - имя темы, id - ID треда
  const { name: themeName, id: threadId } = useParams(); 

  const [thread, setThread] = useState(null);
  const [originalPost, setOriginalPost] = useState(null);
  const [posts, setPosts] = useState([]);

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

    const originalPostData = postsData.find(post => post.isOriginalPost);
    setOriginalPost(originalPostData);
    //console.log("originalPost: ", originalPost);
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


  // Вывод списка постов, каждый из которых содержит
  // кнопку удаления
  function Posts() {
    const copyPostId = (postId) => {
      const replyToPostInput = document.querySelector('input[name="replyToPostId"]');
      replyToPostInput.value = postId;
    };

    return (
      <>
        <h3>Тред #{thread && thread.id}</h3>
        <hr />

        {/* Оригинальный пост */}
        <div>
          #{originalPost && originalPost.id} {" "}
          {thread && thread.isPinned ? "📌" : ""} {" "}
          {thread && thread.isArchived ? "🗃️" : ""} {" "} 
          {/*console.log("originalPost in jsx: ", originalPost)*/}
          {originalPost && formatDateTime(originalPost.createdAt)} {" "}
          {originalPost && originalPost.user && originalPost.user.userName} {" "}

          {user && user.isAuthenticated && 
            <button onClick={() => copyPostId(originalPost && originalPost.id)}>Ответить</button>} {" "}

          <h4>{originalPost && originalPost.title}</h4>
          <p>{originalPost && originalPost.text}</p>
 
          {originalPost && originalPost.inverseReplyToPost 
            && originalPost.inverseReplyToPost.length !== 0 
            && <>Ответы: {" "}</>}
          {originalPost && originalPost.inverseReplyToPost 
            && originalPost.inverseReplyToPost.map(({ id }) => (
              <span key={id}>
                <HashLink to={`/theme/${themeName}/thread/${threadId}#${id}`}>
                  #{id} {" "}
                </HashLink>
              </span>
          ))}

          <hr />
        </div>
        
        {/* Остальные посты на странице */}
        {posts && posts
          .filter(post => !post.isOriginalPost)
          .map(({ id: postId, title, text, createdAt, user: userAuthor, inverseReplyToPost }) => ( 
            <div key={postId} id={postId}>
              #{postId} {" "}
              {formatDateTime(createdAt)} {" "}
              {userAuthor && userAuthor.userName} {" "}

              {user && user.isAuthenticated &&
                <button onClick={() => copyPostId(postId)}>Ответить</button>} {" "}
              {user && user.isAuthenticated && (user.userRole === "moderator" || user.userRole === "admin") &&
                <button onClick={() => handleDelete(postId)}>Удалить</button>} {" "}

              <h4>{title}</h4>
              <p>{text}</p>
              
              {inverseReplyToPost.length !== 0 && <>Ответы: {" "}</>} 
              {inverseReplyToPost.map(({ id }) => (
                  <span key={id}>
                    <HashLink to={`/theme/${themeName}/thread/${threadId}#${id}`}> 
                      #{id} {" "}
                    </HashLink>
                  </span>
              ))}

              <hr />
            </div>
          ))}
      </>
    )
  }

  return (
    <>
      <Posts />
      {user && user.isAuthenticated &&
        <PostCreate undateAllPosts={loadThreadAndPosts} threadId={threadId} userId={user.id}/>}
    </>
  )
}