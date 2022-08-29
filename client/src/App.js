import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouts from "./AppRouts";
import { AppContext, socket } from "./context/appContext";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  const [clients, setClients] = useState([]);
  const [serviceMsg, setServiceMsg] = useState(false);

  const [store, setStore] = useState({});
  const [displayFooter, setDisplayFooter] = useState(true);

  return (
    <AppContext.Provider
      value={{
        socket,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        messages,
        setMessages,
        newMessages,
        setNewMessages,
        clients,
        setClients,
        serviceMsg,
        setServiceMsg,
        store,
        setStore,
        displayFooter,
        setDisplayFooter,
      }}
    >
      <div className="App">
        <AppRouts />
      </div>
    </AppContext.Provider>
  );
}

export default App;
