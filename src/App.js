import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import { createContext, useContext, useEffect, useReducer } from 'react';
import Login from './components/accounts/login/login';
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './components/homepage/homepage';
import Courses from './components/courses/courses';
import Teachers from './components/teachers/teachers';
import Blogs from './components/blogs/blogs';
import Homepagecontent from './components/HomepageContent/homepagecontent';
import Coursedetail from './components/coursedetail/coursedetail';
import Teacherdetail from './components/teacherdetail/teacherdetail';
import Blogdetail from './components/BlogDetail/blogdetail';
import Aboutus from './components/aboutus/aboutus';
import Contact from './components/contact/contact';
import Videolesson from './components/lessons/videolesson/videolesson';
import Notebooklesson from './components/lessons/notebooklesson/notebooklesson';
import Test from './components/lessons/test/test';
import Blogupdate from './components/blogs/update/blogupdate';
import Blogcreate from './components/blogs/create/blogcreate';
import Teachercreate from './components/teachers/create/teachercreate';
import Teacherupdate from './components/teachers/update/teacherupdate';
import Createcourse from './components/courses/create/createcourse';
import Updatecourse from './components/courses/update/updatecourse';
import Updatecoursecontent from './components/courses/update/updatecoursecontent';



export const LoginContext = createContext();
export const BaseURLContext = createContext();


function App() {



  const reducer = (state, action) => {
    let newState = state;
    switch (action.type) {
      case 'login':
        newState.login = true
        newState.key = action.payload
        break;
      case 'logout':
        Cookies.set("login", false)
        Cookies.set("userid", undefined);
        Cookies.set("avatar", undefined)
        newState.login = false
        newState.key = ""
        newState.username = ""
        break;
      case 'setusername':
        newState.username = action.payload

        break;
      case 'setavatar':
        newState.avatar = action.payload
        break;
    }
    return newState;

  }


  const [state, dispatch] = useReducer(reducer, {
    "login": false,
    "username": "",
    "key": "",
    "avatar": ""
  });


  useEffect(() => {
    Cookies.set("key", state.key);
    Cookies.set("login", state.login);
    return () => {
    };
  }, [state.usename, state.email, state.key]);
  return (
    <Router >
      <BaseURLContext.Provider value="http://taducchi.pythonanywhere.com/">

        <LoginContext.Provider value={{ state, dispatch }} >
          <div className="App">

            
            <Routes>
              <Route path="/app" element={<Homepage />}>
                <Route path="" element={<Homepagecontent />} />
                <Route path={`courses`} element={<Courses />} />
                <Route path={`courses/:courseId`} element={<Coursedetail />} />
                <Route path={`courses/create/`} element={<Createcourse />} />
                <Route path={`courses/:courseId/update`} element={<Updatecourse />} />
                <Route path={`courses/:courseId/update-content`} element={<Updatecoursecontent />} />

                <Route path={`teachers`} element={<Teachers />} />
                <Route path={`teachers/:teacherId`} element={<Teacherdetail />} />
                <Route path={`teachers/create`} element={<Teachercreate />} />
                <Route path={`teachers/:teacherId/update`} element={<Teacherupdate />} />
                <Route path={`blogs`} element={<Blogs />} />
                <Route path={`blogs/create`} element={<Blogcreate />} />
                <Route path={`blogs/:blogId`} element={<Blogdetail />} />
                <Route path={`blogs/:blogId/update`} element={<Blogupdate />} />
                <Route path={`aboutus`} element={<Aboutus />} />
                <Route path={`contact`} element={<Contact />} />



              </Route>
              <Route path="/account" element={<Login />} />
              <Route path="/courses/:course_id/videolessons/:videolessonId" element={<Videolesson />} />
              <Route path="/courses/:course_id/notebooklessons/:notebooklessonId" element={<Notebooklesson />} />
              <Route path="/courses/:course_id/tests/:testId" element={<Test />} />


            </Routes>

          </div>
        </LoginContext.Provider>

      </BaseURLContext.Provider>
    </Router>


  );
}

export default App;
