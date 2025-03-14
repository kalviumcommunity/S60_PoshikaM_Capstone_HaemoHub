import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // useEffect(() => {
    //     const fetchHistory = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:3006/chat-history");
    //         setMessages(response.data.map(chat => ({
    //         text: chat.userMessage,
    //         sender: "user"
    //         })).concat(response.data.map(chat => ({
    //         text: chat.botResponse,
    //         sender: "bot"
    //         }))));
    //     } catch (error) {
    //         console.error("Error loading chat history", error);
    //     }
    //     };
    //     fetchHistory();
    // }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);

        try {
        const response = await axios.post("http://localhost:3006/chat", {
            message: input,
        });

        setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
        } catch (error) {
        setMessages([...newMessages, { text: "Error: Unable to fetch response", sender: "bot" }]);
        }

        setInput("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
        <div className="mb-10">
            <Navbar/>
        </div>
        <div className="w-[50vw] mt-10 border border-gray-300 rounded-xl shadow-lg p-6">
            <div className="h-[500px] overflow-y-auto mb-4 p-4 border rounded-lg">
                {messages.map((msg, index) => (
                    <div
                    key={index}
                    className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                    >
                    <span className={`font-semibold ${msg.sender === "user" ? "text-yellow-500" : "text-green-600"}`}>
                        {msg.sender === "user" ? "You : " : "Reply : "}
                    </span>
                    {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex items-center space-x-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={sendMessage}
                    className="px-5 py-3 bg-red-700 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Send
                </button>
            </div>
        </div>
    </div>
  );
};

export default Chat;