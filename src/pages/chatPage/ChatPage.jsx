import React, { useEffect, useState } from 'react'
import styles from './ChatPage.module.css'
import { ChatNav } from '../../components/chatNav/ChatNav'
import { ChatSubNav } from '../../components/chatSubNav/ChatSubNav'
import ChatBot from '../../components/chatBot/ChatBot'
import ChatSuggestions from '../../components/chatSuggestions/ChatSuggestions'
import { Footer } from '../../components/footer/Footer'
import { NavigationGuard } from '../../components/NavigationGuard'
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
title,
contextMemory,
variables
}) => {
 const [isSessionSaved, setIsSessionSaved] = useState(false);
  return (
     <div className={styles.appContainer}>
            <NavigationGuard
        when={messages.length > 0}          // only block if messages exist
        isSessionSaved={isSessionSaved}     // ✅ new check
        onConfirm={() => setMessages([])}   // delete = clear data
      />

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
              messages={messages}
               contextMemory={contextMemory}
              variables={variables}
                setIsSessionSaved={setIsSessionSaved}/>
            </div>
              <ChatBot searchInput={searchInput}
               setSearchInput={setSearchInput}
                messages={messages} 
                sendMessage={sendMessage}
                setTimerange={setTimerange}
                setDataset={setDataset}
                dataset={dataset}
                timerange={timerange}
                />

        </div>
  )
}
