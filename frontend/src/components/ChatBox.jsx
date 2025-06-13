import {useState} from 'react'
import axios from 'axios';

function ChatBox() {
    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("")
    const [history, setHistory] = useState([])
    const addHistory = (newItem) => {
        setHistory(prev => [...prev, newItem]);
    }
    const handleSubmit = async(e) => {
        try{
            e.preventDefault();
            console.log('Sending a Message: ' + message);
            addHistory({ role: "user", content: message })
            setMessage("");
            const res = await axios.post("http://localhost:8000/chat", {message: message});
            console.log(res)
            addHistory({ role: "socrates", content: res.data.response })
            
            
        }catch(err){
            console.error("Failed to send message", err)
        }
        
        
    };

    return(
        <>
        <h1 className='header'>Talk to Socrates</h1>
        <div className="chat-container">
            <div className="chat-history">
                {history.map((item, index) => (
                    <div
                    key={index}
                    className={`message ${item.role}`}
                  >
                    <strong>{item.role === 'user' ? 'You' : 'Socrates'}</strong>
                    <div>{item.content}</div>
                  </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-area">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Talk to Socrates..."
                />
                <button type="submit">Send</button>
            </form>
        </div>

        </>
    )

}
export default ChatBox