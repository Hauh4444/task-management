import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertTriangle className="h-20 w-20 text-warning mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page <code className="px-2 py-1 bg-muted rounded text-sm">{location.pathname}</code> could not be found.
          </p>
        </div>
        
        <Button asChild variant="default">
          <a href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
