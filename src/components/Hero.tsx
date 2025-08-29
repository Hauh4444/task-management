import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

interface HeroProps {
  onNavigate: (section: 'hero' | 'dashboard') => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Manage Tasks
            <span className="block gradient-primary bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your workflow with our intuitive task management platform. 
            Built for developers, designed for everyone.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              className="group shadow-medium hover:shadow-glow"
              onClick={() => onNavigate('dashboard')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-6 animate-slide-up">
          <div className="glass-effect rounded-full px-6 py-3 flex items-center gap-2 text-white">
            <CheckCircle className="h-5 w-5 text-success" />
            <span>Smart Organization</span>
          </div>
          <div className="glass-effect rounded-full px-6 py-3 flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-warning" />
            <span>Time Tracking</span>
          </div>
          <div className="glass-effect rounded-full px-6 py-3 flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-primary-glow" />
            <span>Team Collaboration</span>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-bounce">
        <div className="glass-effect rounded-lg p-4 text-white">
          <CheckCircle className="h-6 w-6" />
        </div>
      </div>
      <div className="absolute bottom-32 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="glass-effect rounded-lg p-4 text-white">
          <Clock className="h-6 w-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;