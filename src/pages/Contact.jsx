import React, { useState } from "react";
import ContactForm from '../components/ContactForm'
import WelcomeMessage from "../components/Text";

function Contact() {
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
    const [userData, setUserData] = useState({
      name: "",
      age: 0,
    });
  
    const handleFormSubmit = (data) => {
      setUserData(data);
      setShowWelcomeMessage(true);
    };
  
    return (
      <div className="app">
        {showWelcomeMessage ? (
          <WelcomeMessage name={userData.name} age={userData.age} />
        ) : (
          <ContactForm onFormSubmit={handleFormSubmit} />
        )}
      </div>
    );
  }

export default Contact