import { BrowserRouter, Routes, Route } from "react-router-dom";

import SessionPage from 'pages/sessionPage';
import VolunteerPage from 'pages/volunteerPage';
import ChatPage from 'pages/chatPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/session" element={<SessionPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
