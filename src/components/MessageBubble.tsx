
import React from 'react';
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-purple-600' 
            : 'bg-green-500'
        }`}>
          {isUser ? (
            <span className="text-white text-sm font-medium">U</span>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
            {isUser ? 'You' : 'ChatGPT'}
          </div>
          <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-0 leading-relaxed whitespace-pre-wrap">
              {formatContent(message.content)}
            </p>
          </div>
          
          {!isUser && (
            <div className="flex items-center space-x-1 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ThumbsUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ThumbsDown className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
