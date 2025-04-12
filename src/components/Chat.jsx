import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BaseUrl } from '../App';
import { FaPaperPlane, FaArrowLeft, FaEnvelope, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChatModal = ({ isOpen, onClose, initialUser }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  // Get values directly from localStorage
  const receiver = localStorage.getItem('campa');
  const sender = localStorage.getItem('investor');
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const prevMessagesLengthRef = useRef(0);

  const fetchMessages = async () => {
    try {
      // Adjust this endpoint to match your backend
      const response = await axios.get(`${BaseUrl}/msg/conversation`, {
        params: {
          sender: sender,
          receiver: receiver
        }
      });

      // Process messages from the response
      const processedMessages = response.data.messages.map(msg => ({
        ...msg,
        isFromMe: msg.sender === sender
      }));

      setMessages(processedMessages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Create timestamp for the message
    const timestamp = new Date();
    
    // Create local message object for immediate UI update
    const messageObj = {
      _id: Date.now().toString(),
      sender: sender,
      receiver: receiver,
      content: newMessage,
      createdAt: timestamp.toISOString(),
      isFromMe: true
    };

    // Update UI immediately
    setMessages(prev => [...prev, messageObj]);
    
    // Clear input and scroll to bottom
    setNewMessage('');
    setShouldScrollToBottom(true);
    
    try {
      // Send message to backend with sender/receiver from localStorage
      await axios.post(`${BaseUrl}/msg/send`, {
        sender: sender,
        receiver: receiver,
        msg: newMessage
      });
      
      // Optional: Refresh messages to ensure consistency
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      // Could add UI indication of failed message here
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isNearBottom =
      Math.abs((container.scrollHeight - container.scrollTop) - container.clientHeight) < 50;

    setShouldScrollToBottom(isNearBottom);
  };

  useEffect(() => {
    if (shouldScrollToBottom || messages.length > prevMessagesLengthRef.current) {
      scrollToBottom();
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, shouldScrollToBottom]);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      
      // Periodically refresh messages
      const interval = setInterval(() => {
        fetchMessages();
      }, 5000); // Every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageGroups = () => {
    const groups = [];
    let currentDate = '';

    messages.forEach(message => {
      const messageDate = new Date(message.createdAt).toLocaleDateString();

      if (messageDate !== currentDate) {
        groups.push({
          date: messageDate,
          messages: []
        });
        currentDate = messageDate;
      }

      groups[groups.length - 1].messages.push(message);
    });

    return groups;
  };

  if (!isOpen) return null;

  const messageGroups = getMessageGroups();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white flex items-center justify-between rounded-t-lg">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold flex items-center">
              <FaEnvelope className="mr-2" /> Chat with {receiver}
            </h2>
          </div>
          <button onClick={handleClose} className="hover:text-gray-600 dark:hover:text-gray-300">
            <FaTimes />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 dark:text-white">Loading messages...</div>
        ) : (
          <div className="flex flex-col h-[500px]">
            <div
              className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 scroll-smooth"
              ref={messagesContainerRef}
              onScroll={handleScroll}
            >
              {messages.length > 0 ? (
                <div className="space-y-2">
                  {messageGroups.map((group, groupIndex) => (
                    <div key={`group-${groupIndex}`}>
                      <div className="flex justify-center my-3">
                        <div className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                          {group.date}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {group.messages.map((message) => {
                          const isFromMe = message.sender === sender;

                          return (
                            <div key={message._id} className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                              <div className={`flex items-start max-w-[75%] ${isFromMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center 
                                    bg-gray-400 dark:bg-gray-600 text-white text-xs font-bold">
                                    {message.sender.charAt(0).toUpperCase()}
                                  </div>
                                </div>

                                <div className={`mx-2 mb-1 ${isFromMe ? 'text-right' : ''}`}>
                                  <div className={`relative p-3 rounded-lg ${
                                    isFromMe 
                                      ? 'bg-gray-500 text-white rounded-tr-none'
                                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                                  }`}>
                                    <span className="font-semibold text-xs block mb-1">
                                      {isFromMe ? 'You' : message.sender}
                                    </span>
                                    <p className="break-words whitespace-pre-wrap">{message.content}</p>
                                    <p className="text-xs mt-1 text-right text-gray-300 dark:text-gray-400">
                                      {formatTime(message.createdAt)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No messages yet. Start a conversation!
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex bg-white dark:bg-gray-800">
              <input
                type="text"
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg py-2 px-4 focus:outline-none dark:bg-gray-700 dark:text-white"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                disabled={!newMessage.trim()}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatModal;