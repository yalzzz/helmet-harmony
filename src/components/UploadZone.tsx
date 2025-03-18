
import React, { useState, useCallback, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onImageSelected: (file: File, previewUrl: string) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const processFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        onImageSelected(file, previewUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  return (
    <div
      className={cn(
        "upload-zone w-full p-8 rounded-lg flex flex-col items-center justify-center gap-4 min-h-[250px] animate-fade-in transition-all duration-300",
        isDragging ? "dragging" : "",
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-2">
        <ImageIcon size={24} className="text-primary" />
      </div>

      <div className="text-center">
        <h3 className="text-xl font-medium mb-2">Upload Image</h3>
        <p className="text-muted-foreground text-sm max-w-md mb-4">
          Drag and drop your image here, or click the button below to select a file from your device
        </p>
      </div>

      <Button 
        onClick={handleButtonClick}
        className="button-effect flex items-center gap-2"
      >
        <Upload size={16} />
        <span>Select Image</span>
      </Button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default UploadZone;
