import { useState } from 'react';
import './App.css';
import ChatBot from './components/chatBot/ChatBot';
import { ChatNav } from './components/chatNav/ChatNav';
import { ChatSubNav } from './components/chatSubNav/ChatSubNav';
import ChatSuggestions from './components/chatSuggestions/ChatSuggestions';
import { CustomInput } from './components/customInput/CustomInput';
import { Footer } from './components/footer/Footer';
import { ChatSectionLayout } from './layouts/chatSectionLayout/ChatSectionLayout';
import { ChatPage } from './pages/chatPage/ChatPage';
import { NewAnalysis } from './pages/newAnalysis/NewAnalysis';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-analysis" element={<NewAnalysis />} />
        <Route path="/" element={<ChatSectionLayout isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}  />}>
          <Route path="/chatPage" element={<ChatPage isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;