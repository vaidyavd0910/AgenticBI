import React, { useState } from 'react'
import styles from './ChatPage.module.css'
import { ChatNav } from '../../components/chatNav/ChatNav'
import { ChatSubNav } from '../../components/chatSubNav/ChatSubNav'
import ChatBot from '../../components/chatBot/ChatBot'
import ChatSuggestions from '../../components/chatSuggestions/ChatSuggestions'
import { Footer } from '../../components/footer/Footer'
import { fetchQueryResult } from '../../service/Api'
export const ChatPage = ({isSidebarExpanded, setIsSidebarExpanded}) => {

  const [messages, setMessages] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [prevQuery, setPrevQuery] = useState("")

  const sendMessage = async (searchQuery, isRerun = false) => {

      const queryValue = isRerun ? prevQuery : searchQuery
      setPrevQuery(queryValue);

      
      if(!isRerun) {
        if (!searchInput.trim()) return;
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


  return (
     <div className={styles.appContainer}>
         
            <div style={{padding: '5px'}}>
              <ChatSubNav isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} sendMessage={sendMessage} />
            </div>
              <ChatBot searchInput={searchInput} setSearchInput={setSearchInput} messages={messages} sendMessage={sendMessage}/>
        </div>
  )
}
