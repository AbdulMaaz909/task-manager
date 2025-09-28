'use client'
import { useState, useRef, useEffect } from 'react';
import { CiChat1 } from "react-icons/ci";
import { Send, X, Bot, User } from 'lucide-react';

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [chatStarted, setChatStarted] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessageToBackend = async (message) => {
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    // Add any additional fields your backend expects
                    // timestamp: new Date().toISOString(),
                    // userId: 'user-123', // if you have user identification
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Assuming your backend returns { message: "bot response" } or { response: "bot response" }
            // Adjust the property name based on your backend response structure
            return data.message || data.response || data.reply || 'Sorry, I could not process your request.';
            
        } catch (error) {
            console.error('Error sending message to backend:', error);
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                return 'Sorry, I cannot connect to the server right now. Please try again later.';
            } else if (error.message.includes('500')) {
                return 'Sorry, there was a server error. Please try again later.';
            } else {
                return 'Sorry, something went wrong. Please try again.';
            }
        }
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const currentInput = inputValue;
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setError('');

        try {
            // Get response from backend
            const botResponseText = await sendMessageToBackend(currentInput);
            
            const botResponse = {
                id: Date.now() + 1,
                text: botResponseText,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
            setError('Failed to get response. Please try again.');
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const startChat = () => {
        setChatStarted(true);
        if (messages.length === 0) {
            const welcomeMessage = {
                id: Date.now(),
                text: "Welcome! I'm your virtual assistant. How can I help you today?",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([welcomeMessage]);
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-50">
            {/* Chat Interface */}
            {open && (
                <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="bg-[#FF6969] text-white p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Bot className="w-6 h-6" />
                            <div>
                                <h3 className="font-semibold">AI Assistant</h3>
                                <p className="text-xs opacity-90">Online now</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setOpen(false)}
                            className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {!chatStarted ? (
                        /* Welcome Screen */
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <Bot className="w-16 h-16 text-[#FF6969] mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Start a conversation
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Our AI assistant is here to help you with any questions you might have.
                            </p>
                            <button 
                                onClick={startChat}
                                className="bg-[#FF6969] text-white px-6 py-2 rounded-full hover:bg-[#FF5555] transition-colors"
                            >
                                Start Chat
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                            message.sender === 'user' 
                                                ? 'bg-[#FF6969] text-white rounded-br-none' 
                                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                        }`}>
                                            <div className="flex items-start space-x-2">
                                                {message.sender === 'bot' && (
                                                    <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-sm">{message.text}</p>
                                                    <p className={`text-xs mt-1 ${
                                                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                                                    }`}>
                                                        {message.timestamp}
                                                    </p>
                                                </div>
                                                {message.sender === 'user' && (
                                                    <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 rounded-lg rounded-bl-none px-4 py-2 max-w-xs">
                                            <div className="flex items-center space-x-2">
                                                <Bot className="w-4 h-4" />
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {error && (
                                    <div className="flex justify-start">
                                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg max-w-xs">
                                            <p className="text-sm">{error}</p>
                                        </div>
                                    </div>
                                )}
                                
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="border-t border-gray-200 p-4">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        disabled={isTyping}
                                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6969] focus:border-transparent disabled:opacity-50"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={inputValue.trim() === '' || isTyping}
                                        className="bg-[#FF6969] text-white p-2 rounded-full hover:bg-[#FF5555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Chat Toggle Button */}
            <div className="relative">
                <CiChat1 
                    className="w-16 h-16 rounded-full bg-[#FF6969] p-3 cursor-pointer text-white hover:bg-[#FF5555] transition-colors shadow-lg"
                    onClick={() => setOpen(!open)}
                />
                {!open && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;