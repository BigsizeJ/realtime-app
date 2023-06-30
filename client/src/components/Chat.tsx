import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import UserList from "./UserList";

const socket = io("http://localhost:3000");

const Chat = () => {
  const location = useLocation();
  const { state } = location;
  const [onlineUser, setOnlineUser] = useState<any>([]);
  const [notif, setNotif] = useState<any>([]);
  const [newNotif, setNewNotif] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const getOnline = (data: any) => {
      setOnlineUser(data);
    };

    socket.emit("connected", state);
    socket.on("online", getOnline);
    socket.on("receivedMessage", (data) =>
      setNotif([...notif, { message: data.message, read: data.read }])
    );

    return () => {
      socket.off("online", getOnline);
    };
  }, [socket]);

  useEffect(() => {
    if (notif.length <= 0) return;
    const hasUnread = notif.find((n: any) => n.read === false);
    if (hasUnread) return setNewNotif(true);
    setNewNotif(false);
  }, [notif]);

  const alertUser = (socketID: string) => {
    const message = prompt("Write your message:");
    if (message === "") return;
    socket.emit("alertUser", {
      ...state,
      message: message,
      receiver: socketID,
    });
  };

  const readNotif = (message: string) => {
    const newNotif = notif;
    const updateNotif = newNotif.map((n: any) => {
      if (n.message === message) return { ...n, read: true };
      return n;
    });
    console.log(updateNotif);

    setNotif(updateNotif);
  };

  return (
    <section className="w-screen h-screen relative">
      <UserList users={onlineUser} />
    </section>
  );
};

export default Chat;
