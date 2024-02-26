import React, { createContext, useContext, useState } from "react";

const MailContext = createContext();

export const MailProvider = ({children}) => {
    const [prompt, setPrompt] = useState('');
    const [generatedData, setGeneratedData] = useState('');

    const setMail = ({prompt, generatedData}) => {
        setPrompt(prompt);
        setGeneratedData(generatedData);
    };

    return (
        <MailContext.Provider value={{prompt, generatedData, setMail}}>
            {children}
        </MailContext.Provider>
    );
};

export const useMailContext = () => {
    const context = useContext(MailContext);
    if (!context) {
      throw new Error('useMailContext must be used within a MailProvider');
    }
    return context;
  };