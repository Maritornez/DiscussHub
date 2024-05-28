import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ThreadList from './components/ThreadList';
import PostList from './components/PostList';
import Layout from './components/Layout';
import Register from './components/Register';
import LogIn from './components/LogIn';
import LogOff from './components/LogOff';


export default function App() {
  // Текущий вошедший пользователь
  const [user, setUser] = useState({ isAuthenticated: false, userName: "", id: "", userRole: "" })

  // useEffect(() => {
  //   const getUser = async () => {
  //     return await fetch("api/account/isauthenticated")
  //       .then((response) => {
  //         response.status === 401 &&
  //           setUser({ isAuthenticated: false, userName: "", id: "", userRole: "" })
  //           const contentType = response.headers.get("content-type");
  //           if (contentType && contentType.indexOf("application/json") !== -1) {
  //             console.log("All is OK" + response)
  //             return response.json();
  //           } else {
  //             console.log("Invalid content type: " + contentType);
  //             console.log(response);
  //             throw new Error("Invalid JSON");
  //           }
  //       })
  //       .then(
  //         (data) => {
  //           if (
  //             typeof data !== "undefined" &&
  //             typeof data.userName !== "undefined" &&
  //             typeof data.dateTimeJoined !== "undefined" &&
  //             typeof data.lastVisited !== "undefined" &&
  //             typeof data.userRole !== "undefined" &&
  //             typeof data.id !== "undefined" &&
  //             typeof data.userRole !== "undefined"
  //           ) {
  //             setUser({ isAuthenticated: true, 
  //                       dateTimeJoined: data.dateTimeJoined, 
  //                       lastVisited: data.lastVisited,
  //                       userName: data.userName,
  //                       id: data.id,
  //                       userRole: data.userRole })
  //           }
  //         },
  //         (error) => {
  //           console.log(error)
  //         }
  //       )
  //   }
  //   getUser()
  // }, [setUser])


  // return (
  //   <BrowserRouter>
  //     <Header />
  //     <ThemeList />
  //     <Routes>
  //       <Route path='/' element={<Home />}/>
  //       <Route path='/theme/:name' element={<ThreadList />}/>
  //       <Route path="*" element={<Navigate to="/" />}/>
  //     </Routes>
  //   </BrowserRouter>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user}/>}>
          <Route index element={<Home />}/>
          <Route path='theme/:name' element={<ThreadList user={user}/>}/>
          <Route path='theme/:name/thread/:id' element={<PostList user={user}/>}/>
          <Route path='/register' element={<Register user={user} setUser={setUser} />}/>
          <Route path="/login" element={<LogIn user={user} setUser={setUser} />} />
          <Route path="/logoff" element={<LogOff user={user} setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );

}
