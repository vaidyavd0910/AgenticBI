import React from 'react'
import styles from './ChatPage.module.css'
import { ChatNav } from '../../components/chatNav/ChatNav'
import { ChatSubNav } from '../../components/chatSubNav/ChatSubNav'
import ChatBot from '../../components/chatBot/ChatBot'
import ChatSuggestions from '../../components/chatSuggestions/ChatSuggestions'
import { Footer } from '../../components/footer/Footer'
export const ChatPage = () => {
  return (
     <div className={styles.appContainer}>
          <ChatNav />
          <div className={styles.stickySubnav}>
            <ChatSubNav />
          </div>
          <div className={styles.content}>
            <div style={{ height: '600px' }}>
              <ChatBot/>
            </div>
          </div>
        </div>
  )
}
