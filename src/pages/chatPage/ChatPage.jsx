import React from 'react'
import styles from './ChatPage.module.css'
import { ChatNav } from '../../components/chatNav/ChatNav'
import { ChatSubNav } from '../../components/chatSubNav/ChatSubNav'
import ChatBot from '../../components/chatBot/ChatBot'
import ChatSuggestions from '../../components/chatSuggestions/ChatSuggestions'
import { Footer } from '../../components/footer/Footer'
export const ChatPage = ({
  isSidebarExpanded,
  restartChat, 
  setIsSidebarExpanded, 
  messages, 
  setMessages, 
  searchInput, 
  setSearchInput, 
  sendMessage,
  setValue , 
  value,
setDataset,
setTimerange,
dataset,
timerange,
setTitle,
title
}) => {

  return (
     <div className={styles.appContainer}>
         
            <div style={{marginLeft : '15px',marginRight: '15px'}}>
              <ChatSubNav 
              isSidebarExpanded={isSidebarExpanded} 
              restartChat={restartChat} 
              setSearchInput={setSearchInput} 
              setIsSidebarExpanded={setIsSidebarExpanded} 
              sendMessage={sendMessage} 
              setValue={setValue} 
              value={value} 
              setMessages={setMessages}
              setTimerange={setTimerange}
              setDataset={setDataset}
              dataset={dataset}
              timerange={timerange}
              setTitle={setTitle}
              title={title}
              messages={messages}/>
            </div>
              <ChatBot searchInput={searchInput} setSearchInput={setSearchInput} messages={messages} sendMessage={sendMessage}/>
        </div>
  )
}
