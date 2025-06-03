
import React from 'react';
import { Plus, MessageSquare, Trash2, Menu, X, Search, Library, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

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

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onLoadChat: (chat: Chat) => void;
  onDeleteChat: (chatId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ 
  chats, 
  currentChatId, 
  onNewChat, 
  onLoadChat, 
  onDeleteChat, 
  isOpen, 
  onToggle 
}: SidebarProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onToggle}
      />
      
      <div className="fixed md:relative w-80 h-full bg-gray-900 text-white z-50 md:z-auto flex flex-col">
        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="md:hidden text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Button
            onClick={onNewChat}
            className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white rounded-lg py-2 text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New chat
          </Button>
        </div>

        <div className="px-3 py-2">
          <div className="flex items-center space-x-2 text-gray-400 text-sm py-2">
            <Search className="w-4 h-4" />
            <span>Search chats</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1">
            <div className="text-gray-400 text-xs uppercase tracking-wide py-2">Today</div>
            {chats.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative rounded-lg p-2 cursor-pointer transition-colors text-sm ${
                    currentChatId === chat.id
                      ? 'bg-gray-800'
                      : 'hover:bg-gray-800'
                  }`}
                  onClick={() => onLoadChat(chat)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-300 truncate">
                          {chat.title}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 ml-2 h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t border-gray-700 p-3 space-y-1">
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer text-sm">
            <Library className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">Library</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">Upgrade plan</span>
            <span className="ml-auto text-xs bg-yellow-600 text-yellow-100 px-2 py-1 rounded">
              More access to the best models
            </span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg cursor-pointer text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">U</span>
              </div>
              <span className="text-gray-300">User</span>
            </div>
            <Settings className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
