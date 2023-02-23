import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Home, Login, NavBar, Profile } from "pages";

function App() {

  return (
    <div className = "app">
      <BrowserRouter>
        <Routes>
          <Route path = '/'     element = {<Login />} />
          <Route path = '/home' element = {<Home  />}  />
          <Route path = '/profile/:userId' element ={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
