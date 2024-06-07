import "../styles/chat.css";
// import { Button, Form, InputGroup } from "react-bootstrap";
import sendIcon from "../assets/send.svg";
import { useState } from "react";
import { FormControl, Button, Input } from "@chakra-ui/react";
// import { Field } from "formik";

const MessageSend = ({ sendMessage, placeholder}) => {
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
      <FormControl style={{ width: '400px' }} isRequired className="form-container">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
          className="send-message"
          placeholder= {placeholder}
        />
        <Button onClick={handleSubmit} className="send-button">
          <img className="send-icon" src={sendIcon} alt="send icon" />
        </Button>
      </FormControl>
    </div>
  );
};

export default MessageSend;
