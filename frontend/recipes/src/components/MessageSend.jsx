import "../styles/chat.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import sendIcon from "../assets/send.svg";
import { useState } from "react";

const MessageSend = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  // handles message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div>
      <InputGroup className="form-container">
        <Form.Control
          className="send-message"
          placeholder="Type a message..."
          value={message}
          size="lg"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
          aria-label="Send message"
          aria-describedby="basic-addon2"
        />
        <Button onClick={handleSubmit} className="send-button">
          <img className="send-icon" src={sendIcon} alt="send icon" />
        </Button>
      </InputGroup>
    </div>
  );
};

export default MessageSend;
