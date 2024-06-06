import '../styles/chat.css'
import ReactMarkdown from 'react-markdown';

const Message = ({user, message}) => {

    return (
        <>
            <div className={user == "user" ? "message-container-me" : 'message-container'}> 
                <div className='text-container'>
                    <p className='contact'> {user == "user" ? "Me" : "Assistant"} </p>
                    <p className='message'> 
                    <ReactMarkdown>{message}</ReactMarkdown>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Message