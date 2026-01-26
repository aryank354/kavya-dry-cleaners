import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, X } from 'lucide-react';

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
    <div className="bg-orange-600 text-white px-4 py-3 relative z-50 animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm md:text-base font-medium">
          <Bell className="animate-bounce" size={20} />
          <span>
            <strong className="uppercase tracking-wider mr-2 bg-white/20 px-2 py-0.5 rounded text-xs">Update</strong>
            {news.message}
          </span>
        </div>
        <button onClick={() => setIsVisible(false)} className="bg-white/10 hover:bg-white/20 p-1 rounded-full transition-colors">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;