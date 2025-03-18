
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadZone from '@/components/UploadZone';
import ResultDisplay from '@/components/ResultDisplay';
import { useToast } from '@/components/ui/use-toast';

const Index: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageSelected = (file: File, previewUrl: string) => {
    setImageFile(file);
    setImagePreview(previewUrl);
    toast({
      title: "Image uploaded",
      description: "Your image has been uploaded and is being processed.",
    });
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI-Powered Helmet Detection
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Upload an image to instantly detect if a person is wearing a helmet.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="glass-panel max-w-3xl mx-auto overflow-hidden">
            {!imagePreview ? (
              <UploadZone onImageSelected={handleImageSelected} />
            ) : (
              <ResultDisplay 
                imageUrl={imagePreview} 
                onReset={handleReset} 
                className="p-6" 
              />
            )}
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "High Accuracy",
                description: "Our AI model has been trained on thousands of images for precise detection."
              },
              {
                title: "Instant Results",
                description: "Get immediate feedback on whether a helmet is being worn in your uploaded image."
              },
              {
                title: "Safety First",
                description: "Ensure compliance with safety protocols in construction, sports, and more."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 rounded-lg animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
