import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Home, Login, Profile } from 'pages';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {

  const mode = useSelector((state) => state.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className = 'app'>
      <BrowserRouter>
        <ThemeProvider theme = {theme}>
          <CssBaseline />
          
          {/* if the user is not authorized, send them to the 'login' home page */}

          <Routes>

            <Route path = '/'                element = {isAuth ? <Navigate to = '/home' /> : <Login />}  />
            <Route path = '/home'            element = {isAuth ? <Home      /> : <Navigate to = '/' />} />
            <Route path = '/profile/:userId' element = {isAuth ? <Profile   /> : <Navigate to = '/' />} />

          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;