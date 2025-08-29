import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm";
import Hero from "@/components/Hero";
import TaskBoard from "@/components/TaskBoard";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'hero' | 'dashboard'>('hero');
  const { user, loading } = useAuth();

  const navigateToSection = (section: 'hero' | 'dashboard') => {
    setActiveSection(section);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Just a moment...</p>
        </div>
      </div>
    );
  }

  // Show auth form if not logged in
  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen">
      <Navigation onNavigate={navigateToSection} currentSection={activeSection} />
      
      {activeSection === 'hero' ? (
        <Hero onNavigate={navigateToSection} />
      ) : (
        <div className="pt-20">
          <TaskBoard />
        </div>
      )}
    </div>
  );
};

export default Index;
