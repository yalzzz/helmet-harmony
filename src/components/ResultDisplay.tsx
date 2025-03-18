
import React, { useState, useEffect } from 'react';
import { Check, X, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  imageUrl: string;
  onReset: () => void;
  className?: string;
}

type DetectionState = 'idle' | 'loading' | 'detected' | 'not-detected' | 'error';

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl, onReset, className }) => {
  const [detectionState, setDetectionState] = useState<DetectionState>('idle');
  
  // Simulate detection process
  useEffect(() => {
    if (imageUrl) {
      setDetectionState('loading');
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        // Random result for demonstration
        const hasHelmet = Math.random() > 0.5;
        setDetectionState(hasHelmet ? 'detected' : 'not-detected');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [imageUrl]);
  
  if (detectionState === 'idle') {
    return null;
  }
  
  return (
    <div className={cn("w-full animate-fade-in", className)}>
      <div className="relative rounded-lg overflow-hidden mb-4">
        <img 
          src={imageUrl} 
          alt="Uploaded image" 
          className={cn(
            "w-full h-auto object-contain max-h-[500px] image-fade-in",
            detectionState === 'loading' ? "opacity-80" : ""
          )}
        />
        
        {detectionState === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <Loader size={40} className="text-white animate-spin" />
              <p className="text-white font-medium">Analyzing image...</p>
            </div>
          </div>
        )}
        
        {detectionState === 'detected' && (
          <div className="absolute top-4 right-4 bg-green-500/90 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-lg animate-slide-down">
            <Check size={18} />
            <span className="font-medium">Helmet Detected</span>
          </div>
        )}
        
        {detectionState === 'not-detected' && (
          <div className="absolute top-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-lg animate-slide-down">
            <X size={18} />
            <span className="font-medium">No Helmet Detected</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onReset} className="button-effect">
          Upload New Image
        </Button>
      </div>
    </div>
  );
};

export default ResultDisplay;
