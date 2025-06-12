import {useState} from 'react'
import axios from 'axios';

function ChatBox() {
    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("")
    const handleSubmit = async(e) => {
        try{
            e.preventDefault();
            console.log('Sending a Message: ' + message);
            const res = await axios.post("http://localhost:8000/chat", {message: message});
            console.log(res)
            setResponse(res.data.response)
            setMessage("");
        }catch(err){
            console.error("Failed to send message", err)
        }
        
        
    };

    return(
        <>
        <h1>Talk to Socrates</h1>
        <div>
            <form onSubmit={handleSubmit}>
            <input 
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Ask Socrates a Question.....'
            />
            <button type='submit'>Send</button>
            </form>
           <p>{response}</p>
        </div>
        </>
    )

}
export default ChatBox