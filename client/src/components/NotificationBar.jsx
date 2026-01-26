import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, X, AlertCircle } from 'lucide-react';

const NotificationBar = ({ apiUrl }) => {
  const [news, setNews] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/news`);
        if (response.data && response.data.length > 0) {
          setNews(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching news");
      }
    };
    fetchNews();
  }, [apiUrl]);

  if (!news || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-2.5 md:px-4 md:py-3 relative z-50 animate-in slide-in-from-top duration-500 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
        
        {/* Content - Responsive Layout */}
        <div className="flex items-center gap-2 md:gap-3 text-xs sm:text-sm md:text-base font-medium flex-1 min-w-0">
          
          {/* Icon - Hidden on very small screens, shown on larger */}
          <div className="hidden sm:flex items-center justify-center">
            <Bell className="animate-bounce flex-shrink-0" size={18} />
          </div>
          
          {/* Alert Icon for mobile */}
          <div className="sm:hidden flex items-center justify-center">
            <AlertCircle className="flex-shrink-0" size={16} />
          </div>
          
          {/* Message Text - Truncated on mobile */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="uppercase tracking-wider bg-white/20 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-bold flex-shrink-0">
              Update
            </span>
            <span className="truncate sm:whitespace-normal">
              {news.message}
            </span>
          </div>
        </div>
        
        {/* Close Button - Always visible */}
        <button 
          onClick={() => setIsVisible(false)} 
          className="bg-white/10 hover:bg-white/20 active:bg-white/30 p-1 md:p-1.5 rounded-full transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X size={16} className="md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;