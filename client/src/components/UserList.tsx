import React, { useState } from "react";

const UserList = ({ users }: any) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <section
      className={`${
        show ? "w-52 p-4" : "w-12 py-4"
      } bg-blue-600 text-white w-52 h-full absolute `}
    >
      <div className="relative w-full h-full flex flex-col">
        <button
          className="absolute top-0 right-0 text-base lowercase border-2 
        border-gray-200 px-1"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? "Hide" : "Show"}
        </button>
        <div
          className={`${
            show ? "flex" : "hidden"
          } flex-col gap-y-1 mt-12 overflow-y-auto flex-1 overflow-x-hidden`}
        >
          {users.map((user: any) => (
            <div className="bg-blue-400 p-1 hover:bg-blue-500 cursor-pointer">
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserList;
