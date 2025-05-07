import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import { Chat } from "./components/Chat";
import { InputForm } from "./components/InputForm";
import { Button } from "./components/Button";
import logo from './assets/logo.svg'

const socket = io.connect("http://localhost:3001");

export function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0a0211] text-[#fff] font-sans flex justify-center items-center">
      {!showChat ? (
        <div className="flex flex-col text-center w-[300px]">
          <div className="flex flex-col items-center">
            <img src={logo} alt="Donnut logo" className="w-40 h-40" />
            <h3 className="pb-10 font-semibold font text-3xl">
              Donnut
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <InputForm
              type="text"
              placeHolder="Name"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <InputForm
              type="text"
              placeHolder="Room name"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <Button onClick={joinRoom}>Join</Button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}