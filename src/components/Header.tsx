import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, X, User, Settings, Shield, LogOut, MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, userSession, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/auth');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6 py-3 fixed top-0 left-0 right-0 z-30 h-16 animate-fade-in">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mr-3 text-muted-foreground hover:text-foreground transition-colors hover-lift p-1 rounded-md"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <img 
          src="https://raw.githubusercontent.com/Ishaan145/Saaransh/main/saaransh-app/public/mca.png" 
          alt="MCA Emblem" 
          className="h-8 sm:h-10 mr-2 sm:mr-4 animate-float"
        />
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">
            Project Saaransh
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block max-w-xs lg:max-w-none">
            AI-powered sentiment analysis for MCA e-consultation feedback
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <Button 
          onClick={() => navigate('/reports')}
          variant="outline" 
          size="sm"
          className="hidden md:flex hover-lift animate-scale-in"
        >
          <Download className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Export Reports</span>
          <span className="lg:hidden">Export</span>
        </Button>
        
        <div className="hidden sm:block relative animate-slide-up">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSearch}
            className="bg-secondary border-input-border rounded-lg pl-9 sm:pl-10 pr-4 py-2 text-sm w-40 sm:w-48 lg:w-56 focus:outline-none focus:ring-2 focus:ring-ring transition-all hover-lift"
          />
        </div>

        <button className="text-muted-foreground hover:text-foreground relative p-2 hover-lift transition-colors rounded-lg">
          <Bell size={18} className="sm:w-5 sm:h-5" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
          </span>
        </button>

        <div className="relative animate-scale-in" ref={profileRef}>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 cursor-pointer p-1 hover-lift rounded-lg transition-all"
          >
            <img 
              src={user?.avatar || "https://placehold.co/40x40/E2E8F0/475569?text=U"} 
              alt="User Avatar" 
              className="rounded-full h-8 w-8 sm:h-9 sm:w-9 border-2 border-border" 
            />
            <div className="hidden md:block text-sm">
              <p className="font-semibold text-foreground">{user?.name}</p>
              <p className="text-muted-foreground text-xs">{user?.role}</p>
            </div>
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-30 animate-scale-in">
              <div className="p-3 sm:p-4 border-b border-border">
                <p className="font-semibold text-card-foreground">{user?.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {user?.email}
                </p>
                {userSession && (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center">
                    <MapPin size={12} className="mr-1.5" />
                    Last login from {userSession.location}
                  </div>
                )}
              </div>
              <div className="p-2">
                <a 
                  href="#" 
                  onClick={() => handleMenuClick('/profile')} 
                  className="flex items-center px-3 py-2 text-sm text-card-foreground hover:bg-secondary rounded-md transition-colors"
                >
                  <User size={16} className="mr-3" />
                  My Profile
                </a>
                <a 
                  href="#" 
                  onClick={() => handleMenuClick('/settings')} 
                  className="flex items-center px-3 py-2 text-sm text-card-foreground hover:bg-secondary rounded-md transition-colors"
                >
                  <Settings size={16} className="mr-3" />
                  User Settings
                </a>
                <a 
                  href="#" 
                  onClick={() => handleMenuClick('/authorizations')} 
                  className="flex items-center px-3 py-2 text-sm text-card-foreground hover:bg-secondary rounded-md transition-colors"
                >
                  <Shield size={16} className="mr-3" />
                  Authorizations
                </a>
              </div>
              <div className="border-t border-border p-2">
                <a 
                  href="#" 
                  onClick={handleLogout} 
                  className="flex items-center px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                >
                  <LogOut size={16} className="mr-3" />
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;