import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState<any>({ username: "", id: "" });
  const [error, setError] = useState<any>({ error: false, status: "" });
  const navigate = useNavigate();

  const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

  useEffect(() => {
    setUser({ ...user, id: uniqueId() });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate("/chat", { state: user });
  };

  return (
    <section className="flex flex-col gap-y-5 w-screen h-screen px-10 py-5">
      <h1 className="text-2xl text-blue-600 font-bold">PreChat</h1>
      <section className="flex-1 flex justify-center items-center">
        <form
          className="w-full flex flex-col bg-gray-600 p-4 text-white 
          gap-y-2 shadow-md shadow-gray-600"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
          <h1>Enter your username:</h1>
          <input
            type="text"
            className="border-b-2 border-b-gray-200 outline-0 bg-transparent 
            /text-white py-2 px-1 focus:border-b-blue-500"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="John Doe"
            required
          />
          <button className="bg-blue-600 mt-2 p-1 font-bold">Enter</button>
        </form>
      </section>
    </section>
  );
};

export default Login;
