import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckSquare, Menu, X, Github, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NavigationProps {
  onNavigate: (section: 'hero' | 'dashboard') => void;
  currentSection: 'hero' | 'dashboard';
}

const Navigation = ({ onNavigate, currentSection }: NavigationProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('hero')}
          >
            <div className="p-2 gradient-primary rounded-lg group-hover:shadow-glow transition-smooth">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Task Dashboard</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              variant={currentSection === 'hero' ? 'default' : 'ghost'}
              onClick={() => onNavigate('hero')}
            >
              Home
            </Button>
            <Button
              variant={currentSection === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => onNavigate('dashboard')}
            >
              Dashboard
            </Button>
            
            {/* GitHub Link */}
            <Button variant="outline" asChild>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            
            {/* User Menu */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="text-muted-foreground truncate max-w-32">{user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Button
                variant={currentSection === 'hero' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('hero');
                  setMenuOpen(false);
                }}
                className="justify-start"
              >
                Home
              </Button>
              <Button
                variant={currentSection === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('dashboard');
                  setMenuOpen(false);
                }}
                className="justify-start"
              >
                Dashboard
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              
              {/* User Info */}
              <div className="pt-4 border-t border-border/50 mt-2">
                <div className="flex items-center gap-2 text-sm mb-3 px-3">
                  <User className="h-4 w-4" />
                  <span className="text-muted-foreground truncate">{user?.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="w-full justify-start text-destructive hover:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;