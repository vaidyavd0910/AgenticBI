import { useEffect, useState } from 'react';
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
import { ToastContainer } from 'react-toastify';
import { showToast } from './utils/helperFunctions/toastFunction';

function App() {

    const [messages, setMessages] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    // const [prevQuery, setPrevQuery] = useState("")
    const [value, setValue] = useState('');
    const [dataset, setDataset] =useState('');
    const [timerange, setTimerange] = useState('');
    const [title, setTitle] = useState(" Session Name");
    const [contextMemory, setContextMemory] = useState([]);
    const [variables, setVariables] = useState([]);

   
    const sendMessage = async (searchQuery, dataset, timerange, isNewAnalysis = false) => {
        const queryValue =  searchQuery
        // setPrevQuery(queryValue);
        
        // if(!isRerun) {
          if (!queryValue.trim()) return;
          
          const loaderMessage = { sender: 'loader', text: 'getting response' };

          if(isNewAnalysis) {
            const newMessages = [{ sender: 'user', text: searchQuery }];
            setMessages(newMessages);
            setSearchInput('');
            setMessages([...newMessages, loaderMessage]);
          }
          else {
            const newMessages = [...messages, { sender: 'user', text: searchQuery }];
            setMessages(newMessages);
            setSearchInput('');
            setMessages([...newMessages, loaderMessage]);
          }
          // const newMessages = [...messages, { sender: 'user', text: searchQuery }];
          // setMessages(newMessages);
          // setSearchInput('');
      
          // const loaderMessage = { sender: 'loader', text: 'getting response' };
          // setMessages([...newMessages, loaderMessage]);
        // }
        // else {
        //   const loaderMessage = { sender: 'loader', text: 'getting response' };
        //   const newMessages = [...messages, loaderMessage];
        //   setMessages(newMessages);
        // }
    
        try {
          const response = await fetchQueryResult(queryValue,dataset,timerange);
          if (response.context_memory && response.context_memory.length > 0) {
      const formattedContext = Object.entries(response.context_memory[0]).map(
        ([key, value]) => ({
          label: `${key}:`,
          value,
        })
      );
      setContextMemory(formattedContext);
    }

    // ✅ Update variables detected dynamically
    if (response.Variables_Detected) {
      setVariables(response.Variables_Detected);
    }

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
    const restartChat = async () => {
          console.log(messages, "message 258")
          const userQueries = messages
            .filter((msg) => msg.sender === "user")
            .map((msg) => msg.text);
showToast("Refreshing...",'succss')
          setMessages([]);
          
          setTimeout(async() => {
            for (const query of userQueries) {
              setMessages((prev) => [...prev, { sender: "user", text: query }]);
              
              await sendMessage(query, dataset, timerange);
            }
          }, 2000);
        };

    useEffect(() => {
      console.log(messages, "messages test 111");
    }, [messages])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/new-analysis" element={<NewAnalysis />} />
        <Route path="/" element={<ChatSectionLayout isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}  />}>
          <Route path="/" element={<LandingPage 
              sendMessage={sendMessage} 
              setValue={setValue} value={value}
              setTimerange={setTimerange}
              setDataset={setDataset}
              dataset={dataset}
              timerange={timerange}
              setTitle={setTitle}
              messages={messages}
              setMessages={setMessages}
            />} 
              />
          <Route path="/chatPage" element={
            <ChatPage 
              isSidebarExpanded={isSidebarExpanded} 
              setIsSidebarExpanded={setIsSidebarExpanded}
              messages={messages}
              setMessages={setMessages}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              sendMessage={sendMessage}
              setValue={setValue} value={value}
              restartChat={restartChat}
              setTimerange={setTimerange}
              setDataset={setDataset}
              dataset={dataset}
              timerange={timerange}
              setTitle={setTitle}
              title={title}
              contextMemory={contextMemory}
              variables={variables}
            />} />
          <Route path="/chatAnalysis" element={<ChatAnalysis sendMessage={sendMessage} setDataset={setDataset} setTimerange={setTimerange} />} />
          <Route path="/chatSuggestions" element={<ChatSuggestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  );
}

export default App;