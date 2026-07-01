import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = ({ chats, activeChatId, onNewChat, onSelectChat }) => {
  return (
    <div className="sidebar">
      <h2>ChatGPT Clone</h2>
      <button onClick={onNewChat}>+ New Chat</button>
      <ul>
        {Object.keys(chats).map((chatId) => (
          <li
            key={chatId}
            className={chatId === activeChatId ? "active" : ""}
            onClick={() => onSelectChat(chatId)}
          >
            {chatId}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Sidebar;
