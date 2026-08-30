import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./Pages/NotFound";
import MainLoader from "./components/loaders/MainLoader";
import SoundRecorder from "./Pages/tests/SoundRecorder";
import AdminHome from "./Pages/admin/AdminHome";
import axios from "axios";
import { config, server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/slicer/auth";
import { SocketProvider } from "./socket/socket";

const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Reginster"));
const Home = lazy(() => import("./Pages/Home"));
const Profile = lazy(() => import("./Pages/Profile"));



const App = () => {

  const {user,loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
  axios.get(`${server}/user/profile`,config).then(res=> dispatch(login(res.data.user))).catch(err => {
    console.log(err?.response?.data?.message || 'Something went wrong!');
    dispatch(logout())});
  }, [dispatch])
  return loading? <MainLoader />: (
    <BrowserRouter>
    <Suspense fallback={<MainLoader />}>
      <Routes>
        <Route element={<SocketProvider><ProtectedRoute user={user} /></SocketProvider>}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register-pro" element={<Register />} />
        </Route>

        
          <Route path="/login" element={<ProtectedRoute user={!user} redirect="/" ><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute user={!user} redirect="/" ><Register /></ProtectedRoute>} />  
                  
          <Route path="/testadmin" element={<AdminHome />} />   
          <Route path="/test/recoder" element={<SoundRecorder />} />   
          <Route path="*" element={<NotFound />} />   
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;


