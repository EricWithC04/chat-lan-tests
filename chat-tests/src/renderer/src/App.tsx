// import './App.css'
import { Routes, Route } from "react-router-dom"
import { Profiles } from "./pages/profiles/Profiles"
import { ChatPage } from "./pages/chat/ChatPage"
import { Config } from "./pages/config/Config"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Profiles />}/>
      <Route path="/chat" element={<ChatPage />}/>
      <Route path="/config" element={<Config />}/>
    </Routes>
  )
}

export default App