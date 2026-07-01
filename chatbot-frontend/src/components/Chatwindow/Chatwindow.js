import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./Chatwindow.css";

const ChatWindow = (props) => {
  const {messages, updateChatMessages, activeChatId} = props
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    try {
      if (input.trim()) {
        const reqMessages = JSON.parse(JSON.stringify(messages));
        // updateChatMessages((prevMsg) => [...prevMsg, {"role": "user", "content": input}])
        updateChatMessages(activeChatId, {"role": "user", "content": input})
        console.log(messages)
        setLoading(true);
        const resp = await axios.post('http://127.0.0.1:5000/chat', {
          message: [...reqMessages, {
            "role": "user",
            "content": input
          }],
        });
        const response = resp.data;
        console.log(response)
        // updateChatMessages((prevMsg) => [...prevMsg, {"role": "assistant", "content": response.response}])
        updateChatMessages(activeChatId, {"role": "assistant", "content": response.response})
        setLoading(false);
        setInput("");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role != "system" ? `${msg.role == "user" ? "user" : "assitant"}` : "hide"}`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="loading">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); handleSend();}}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit' >Send</button>
        </form>
    </div>
  );
};

export default ChatWindow;
