
import React from 'react';
import { Menu, ChevronDown, Share, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              AI Assistant
            </h1>
            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
