import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function ChatBox({ sessionId }) {
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL;

    const addHistory = (newItem) => {
        setHistory((prev) => [...prev, newItem]);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            addHistory({ role: "user", content: message });
            setLoading(true);
            setMessage("");

            const res = await axios.post(`${API_URL}/chat`, { message, sessionId });

            addHistory({ role: "socrates", content: res.data.response });
        } catch (err) {
            console.error("Failed to send message", err);
            addHistory({ role: "socrates", content: "Sorry, there was an error." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className='header'>SocraticAI</h1>
            <div className="chat-container">
                <div className="chat-history">
                    {history.map((item, index) => (
                        <div key={index} className={`message ${item.role}`}>
                            <strong>{item.role === 'user' ? 'You' : 'Socrates'}</strong>
                            <div>{item.content}</div>
                        </div>
                    ))}
                    {loading && (
                        <div className="message socrates">
                            <strong>Socrates</strong>
                            <div>Socrates is thinking.... (If this is your first message, it might take 1-2 minutes for a response because I am on the free version of onrender)</div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
                <form onSubmit={handleSubmit} className="input-area">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Talk to Socrates..."
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Thinking..." : "Send"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default ChatBox;