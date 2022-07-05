import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Createpost from "./pages/newpost";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import {AuthContext} from './helpers/AuthContext';
import {useState} from "react";
import Editpost from "./pages/editpost";
function App() {
  const [AuthState, setAuthState]=useState(false);
  console.log(AuthState);
    return (
    <div>
      <AuthContext.Provider value={{AuthState, setAuthState}}>
        <Router>
          <Link to="/newpost">What's on your mind?</Link>
          <br></br>
          <Link to="/">Back to Home Page</Link>
          <br></br>
          {!AuthState && (
            <>
          
          <Link to="/users/login">Login</Link>
          <br></br>
          <Link to="/users/">Registration</Link>
          </>
          
          )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newpost" element={<Createpost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/editpost/:id" element={<Editpost />} />
          <Route path="/users/" element={<Registration />} />
          <Route path="/users/login" element={<Login />} />
        </Routes>
        </Router>
        </AuthContext.Provider>
        
    </div>
  );
}

export default App;
