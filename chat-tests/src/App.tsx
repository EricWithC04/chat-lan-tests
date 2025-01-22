// import './App.css'
import { Routes, Route } from "react-router-dom"
import { Profiles } from "./pages/profiles/Profiles"
import { ChatPage } from "./pages/chat/ChatPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Profiles />}/>
      <Route path="/chat" element={<ChatPage />}/>
    </Routes>
  )
}

export default App