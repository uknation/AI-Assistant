
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import MessageBubble from './MessageBubble';
import Sidebar from './Sidebar';
import Header from './Header';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's my perspective on that topic:",
      "Great question! Based on what you've shared, I think:",
      "Let me help you with that. Here's what I would suggest:",
      "That's a thoughtful inquiry. From my understanding:",
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse}\n\nRegarding "${userMessage}", I'd say that this is a topic that requires careful consideration. There are multiple aspects to consider, and I think the best approach would be to break it down step by step.\n\nWould you like me to elaborate on any particular aspect of this topic?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    if (!currentChatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: inputValue.slice(0, 30) + (inputValue.length > 30 ? '...' : ''),
        messages: [userMessage],
        lastMessage: new Date(),
      };
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
    }

    try {
      const responseContent = await generateResponse(inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, userMessage, assistantMessage], lastMessage: new Date() }
          : chat
      ));
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setInputValue('');
  };

  const loadChat = (chat: Chat) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-800">
      <Sidebar 
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={startNewChat}
        onLoadChat={loadChat}
        onDeleteChat={deleteChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {messages.length === 0 ? (
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="text-center max-w-2xl">
                  <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h1 className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                    How can I help you today?
                  </h1>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-4 py-6">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  {isTyping && (
                    <div className="mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-medium">ChatGPT</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 inline-block">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4">
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Message ChatGPT"
                      className="min-h-[52px] max-h-32 py-3 px-4 pr-12 resize-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-transparent"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="sm"
                      className="absolute right-2 bottom-2 w-8 h-8 p-0 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300 disabled:opacity-30"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  ChatGPT can make mistakes. Check important info.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
