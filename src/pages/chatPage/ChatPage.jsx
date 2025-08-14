import React from 'react'
import styles from './ChatPage.module.css'
import { ChatNav } from '../../components/chatNav/ChatNav'
import { ChatSubNav } from '../../components/chatSubNav/ChatSubNav'
import ChatBot from '../../components/chatBot/ChatBot'
import ChatSuggestions from '../../components/chatSuggestions/ChatSuggestions'
import { Footer } from '../../components/footer/Footer'
export const ChatPage = ({isSidebarExpanded, setIsSidebarExpanded}) => {
  return (
     <div className={styles.appContainer}>
          <ChatNav />
          <div className={styles.stickySubnav}>
            <ChatSubNav isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} />
          </div>
          <ChatBot/>
        </div>
  )
}
