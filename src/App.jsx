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
import { ChatAnalysis } from './pages/chatAnalysis/ChatAnalysis';
import { LandingPage } from './pages/landingPage/LandingPage';
import { fetchQueryResult } from './service/Api';

function App() {

    const [messages, setMessages] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [prevQuery, setPrevQuery] = useState("")
  
    const sendMessage = async (searchQuery, isRerun = false) => {
        const queryValue = isRerun ? prevQuery : searchQuery
        setPrevQuery(queryValue);
        
        if(!isRerun) {
          if (!queryValue.trim()) return;
          const newMessages = [...messages, { sender: 'user', text: searchQuery }];
          setMessages(newMessages);
          setSearchInput('');
      
          const loaderMessage = { sender: 'loader', text: 'getting response' };
          setMessages([...newMessages, loaderMessage]);
        }
        else {
          const loaderMessage = { sender: 'loader', text: 'getting response' };
          const newMessages = [...messages, loaderMessage];
          setMessages(newMessages);
        }
    
        try {
          const response = await fetchQueryResult(queryValue);
          const botResponse = {
            sender: 'bot',
            chart: response.data?.showChart || false,
            summary: response.summary,
            insights: response.insights,
            table: response.table,
            graph: response.graph,
            contextMemory: response.context_memory,
            variablesDetected: response.Variables_Detected
          };
    
          setMessages(prev =>
            prev.map(msg => (msg.sender === 'loader' ? botResponse : msg))
          );
        } catch (err) {
          console.error("API Error:", err);
          setMessages(prev =>
            prev.map(msg =>
              msg.sender === 'loader' ? { sender: 'bot', text: 'Server error' } : msg
            )
          );
        }
    };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-analysis" element={<NewAnalysis />} />
        <Route path="/" element={<ChatSectionLayout isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}  />}>
          <Route path="/" element={<LandingPage sendMessage={sendMessage} />} />
          <Route path="/chatPage" element={
            <ChatPage 
              isSidebarExpanded={isSidebarExpanded} 
              setIsSidebarExpanded={setIsSidebarExpanded}
              messages={messages}
              setMessages={setMessages}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              sendMessage={sendMessage}
            />} />
          <Route path="/chatAnalysis" element={<ChatAnalysis />} />
          <Route path="/chatSuggestions" element={<ChatSuggestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;