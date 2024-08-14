import './App.css';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Outlet/NavBar';
import ScrollToTop from './components/Features/ScrollToTop/ScrollToTop';
import Error from './components/Pages/Error';
import { AuthContextProvider } from './components/Features/Auth/Context/AuthContext';
import ProtectedRoutes from './components/Features/ProtectedRoutes';
import { AnimatePresence } from 'framer-motion';
import '../src/components/Pages/style.css';
import { Account } from './components/Pages/Account';
import {CodemastersChatbot} from './components/AI-CHATBOT/CodemastersChatbot'

const CPlusPlusPlaylist = React.lazy(() => import('./components/Courses/VideoPlaylists').then(module => ({ default: module.CPlusPlusPlaylist })));
const CSSPlaylist = React.lazy(() => import('./components/Courses/VideoPlaylists').then(module => ({ default: module.CSSPlaylist })));
const HTMLPlaylist = React.lazy(() => import('./components/Courses/VideoPlaylists').then(module => ({ default: module.HTMLPlaylist })));
const JSPlaylist = React.lazy(() => import('./components/Courses/VideoPlaylists').then(module => ({ default: module.JSPlaylist })));
const JavaPlaylist = React.lazy(() => import('./components/Courses/VideoPlaylists').then(module => ({ default: module.JavaPlaylist })));
const PythonPlaylist = React.lazy(() => import('./components/Courses/VideoPlaylists').then(module => ({ default: module.PythonPlaylist })));
const ReactPlaylist = React.lazy(() => import('./components/Courses/VideoPlaylists').then(module => ({ default: module.ReactPlaylist })));
const SQLPlaylist = React.lazy(() => import('./components/Courses/VideoPlaylists').then(module => ({ default: module.SQLPlaylist })));

const HtmlQuiz = React.lazy(() => import("./components/Quiz/HtmlQuiz"));
const CssQuiz = React.lazy(() => import("./components/Quiz/CssQuiz"));
const JsQuiz = React.lazy(() => import("./components/Quiz/JsQuiz"));
const JavaQuiz = React.lazy(() => import("./components/Quiz/JavaQuiz"));
const ReactQuiz = React.lazy(() => import("./components/Quiz/ReactQuiz"));
const AngularQuiz = React.lazy(() => import("./components/Quiz/AngularQuiz"));
const SpringBootQuiz = React.lazy(() => import("./components/Quiz/SpringBootQuiz"));

const About = React.lazy(() => import('./components/Pages/About').then(module => ({ default: module.About })));
const Login = React.lazy(() => import('./components/Features/LoginAndLogout/Login').then(module => ({ default: module.Login })));
const SignUp = React.lazy(() => import('./components/Features/LoginAndLogout/SignUp').then(module => ({ default: module.SignUp })));

// Lazy load components
const Home = React.lazy(() => import('./components/Pages/Home'));
// const About = React.lazy(() => import('./components/Pages/About').then(module => ({ default: module.About })));
const Contact = React.lazy(() => import('./components/Pages/Contact').then(module => ({ default: module.Contact })));
const Courses = React.lazy(() => import('./components/Pages/Courses').then(module => ({ default: module.Courses })));
const Quizzes = React.lazy(() => import('./components/Pages/Quizzes').then(module => ({ default: module.Quizzes })));
const Roadmaps = React.lazy(() => import('./components/Pages/Roadmaps').then(module => ({ default: module.Roadmaps })));


function App() {
  return (
    <React.Fragment>
      <AnimatePresence>
        <CodemastersChatbot />
        <NavBar />
        <ScrollToTop/>
        <AuthContextProvider>
          <Suspense 
            fallback=
            {<div class="loader loader-with-bg">
              <div class="justify-content-center jimu-primary-loading"></div>
            </div>
            }>
            <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/courses' element={
                  <ProtectedRoutes>
                    <Courses />
                  </ProtectedRoutes>
                } />
              <Route path='/courses/JSDevelopment' element={
                <ProtectedRoutes>
                  <JSPlaylist />
                </ProtectedRoutes>
              } />
              <Route path='/courses/Python' element={
                <ProtectedRoutes>
                  <PythonPlaylist />
                </ProtectedRoutes>
              } />
              <Route path='/courses/C++' element={
                <ProtectedRoutes>
                  <CPlusPlusPlaylist />
                </ProtectedRoutes>
              } />
              <Route path='/courses/Java' element={
                <ProtectedRoutes>
                  <JavaPlaylist />
                </ProtectedRoutes>
              } />
              <Route path='/courses/Sql' element={
                <ProtectedRoutes>
                  <SQLPlaylist />
                </ProtectedRoutes>
              } />
              <Route path='/courses/Html' element={
                <ProtectedRoutes>
                  <HTMLPlaylist />
                </ProtectedRoutes>
              } />
              <Route path='/courses/CSS' element={
                <ProtectedRoutes>
                  <CSSPlaylist />
                </ProtectedRoutes>
              } />
              <Route path='/courses/React' element={
                <ProtectedRoutes>
                  <ReactPlaylist />
                </ProtectedRoutes>
              } />
              <Route path='/quizzes' element={
                <ProtectedRoutes>
                  <Quizzes />
                </ProtectedRoutes>
              } />
              <Route path='/quizzes/HTML' element={
                <ProtectedRoutes>
                  <HtmlQuiz />
                </ProtectedRoutes>
              } />
              <Route path='/quizzes/CSS' element={
                <ProtectedRoutes>
                  <CssQuiz />
                </ProtectedRoutes>
              } />
              <Route path='/quizzes/JavaScript' element={
                <ProtectedRoutes>
                  <JsQuiz />
                </ProtectedRoutes>
              } />
              <Route path='/quizzes/Java' element={
                <ProtectedRoutes>
                  <JavaQuiz />
                </ProtectedRoutes>
              } />
              <Route path='/quizzes/React' element={
                <ProtectedRoutes>
                  <ReactQuiz />
                </ProtectedRoutes>
              } />
              <Route path='/quizzes/Angular' element={
                <ProtectedRoutes>
                  <AngularQuiz />
                </ProtectedRoutes>
              } />
              <Route path='/quizzes/SpringBoot' element={
                <ProtectedRoutes>
                  <SpringBootQuiz />
                </ProtectedRoutes>
              } />
              <Route path='/roadmaps' element={
                <ProtectedRoutes>
                  <Roadmaps />
                </ProtectedRoutes>
              } />
              <Route path='/Contact' element={<Contact />}/>
              <Route path='/login' element={<Login />}/>
              <Route path="/signup" element={<SignUp/>} />

              <Route path="/Account" element={  
                    <Account/>
              } />
              <Route path='*' element={<Error />}/>
            </Routes>
          </Suspense>
        </AuthContextProvider>
      </AnimatePresence>
    </React.Fragment>
  );
}

export default App;

// mongoimport --uri "mongodb+srv://rajeevkavala34:rajeev123@cluster0.r9ejurn.mongodb.net/CodeMasters" --collection courses --file "D:\Web Development\New folder\codemasters\coursedata.json"

