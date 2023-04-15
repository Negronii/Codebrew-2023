import { BrowserRouter, Routes, Route } from "react-router-dom";

import SessionPage from 'pages/sessionPage';
import VolunteerPage from 'pages/volunteerPage';
import ChatPage from 'pages/chatPage';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
