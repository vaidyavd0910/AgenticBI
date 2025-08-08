import './App.css';
import ChatBot from './components/chatBot/ChatBot';
import { ChatNav } from './components/chatNav/ChatNav';
import { ChatSubNav } from './components/chatSubNav/ChatSubNav';
import ChatSuggestions from './components/chatSuggestions/ChatSuggestions';
import { CustomInput } from './components/customInput/CustomInput';
import { Footer } from './components/footer/Footer';
import { ChatPage } from './pages/chatPage/ChatPage';
import { NewAnalysis } from './pages/newAnalysis/NewAnalysis';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-analysis" element={<NewAnalysis />} />
        <Route path="/chatPage" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;