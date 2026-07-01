import React, { useEffect, useState } from "react";
import Sidebar from "./components/SideBar/Sidebar";
import ChatWindow from "./components/Chatwindow/Chatwindow";
import "./App.css";

const App = () => {

  const [chats, setChats] = useState(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats")) || {};
    return savedChats
  });
  const [activeChatId, setActiveChatId] = useState(null);

  const createNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setChats((prevChats) => {
      const updatedChats = { ...prevChats, [newChatId]: [] };
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      return updatedChats;
    });
    setActiveChatId(newChatId);
  };

  const updateChatMessages = (chatId, newMessages) => {
    setChats((prevChats) => {
      const updatedChats = { ...prevChats, [chatId]: newMessages };
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      console.log(JSON.parse(localStorage.getItem("chats")))
      return updatedChats;
    });
  };

  useEffect(() => {

  })
  const activeMessages = chats[activeChatId] || [{ "role": "system", "content": "You are a rude but helpful assistant"}];

  
  return (
    <div className="app">
      <Sidebar setChat={setChats}/>
      <ChatWindow updateChatMessages={updateChatMessages} messages={activeMessages} activeChatId={activeChatId}/>
    </div>
  );
};

export default App;
