
import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 animate-fade-in">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
            <Shield size={24} className="stroke-[1.5px]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Helmet Detection</h1>
            <p className="text-sm text-muted-foreground">
              Advanced AI-powered safety analysis
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
