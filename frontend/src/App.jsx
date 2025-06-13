import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBox from './components/ChatBox'

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function App() {
  const [sessionId, setSessionId] = useState(null)

  useEffect(() => {
    let id = sessionStorage.getItem('sessionId');
    if (!id) {
      id = generateUniqueId();
      sessionStorage.setItem('sessionId', id);
    }
    setSessionId(id);
  }, []);

  return (
    <>
      <div className="app-wrapper">
        <ChatBox sessionId={sessionId}/>
      </div>
    </>
  )
}

export default App
