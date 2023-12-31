import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isauth = Boolean(useSelector((state)=> state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={!isauth ? <LoginPage /> : <Navigate to="/home" />} />
            <Route path="/home" element={isauth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isauth ? <ProfilePage /> : <Navigate to="/" />} />
          </Routes> 
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
