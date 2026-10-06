'use client';
import React, { useState } from 'react';
import { Upload, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface ProductImageUploaderProps {
  images: any[];
  setImages: (images: any[]) => void;
}

export default function ProductImageUploader({ images, setImages }: ProductImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const MAX_IMAGES = 3;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const files = e.target.files;
    if (!files) return;
    if (images.length + files.length > MAX_IMAGES) {
      setErrorMsg(`Validation Error: You can only upload up to ${MAX_IMAGES} images total.`);
      return;
    }

    setIsUploading(true);
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const originalFile = files[i];
      try {
        // Compress to KB
        const compressedFile = await imageCompression(originalFile, { maxSizeMB: 0.5, maxWidthOrHeight: 1200 });
        
        const formData = new FormData();
        formData.append('file', compressedFile, originalFile.name);

        const response = await fetch('/api/upload-image', { method: 'POST', body: formData });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to upload image due to network error.');
        }

        newImages.push({
          id: data.path,
          url: data.url, // This URL goes to the database
          name: originalFile.name,
          size: (compressedFile.size / 1024).toFixed(2) + ' KB',
          storagePath: data.path
        });
      } catch (err: any) {
        setErrorMsg(err.message);
        setIsUploading(false);
        return;
      }
    }
    setImages(newImages);
    setIsUploading(false);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === images.length - 1) return;
    
    const newImages = [...images];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap array elements
    [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
    setImages(newImages); // This updates the preview order (1st, 2nd, 3rd)
  };

  const removeImage = (index: number) => {
    // Optionally call an API to delete from Supabase storage using images[index].storagePath
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Product Images</h3>
        <span className="text-[11px] font-semibold text-slate-500">{images.length} of {MAX_IMAGES}</span>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2">
           <span>🚨</span> {errorMsg}
        </div>
      )}

      {images.length < MAX_IMAGES && (
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-400 transition cursor-pointer bg-slate-50/50 relative">
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleImageUpload} 
            disabled={isUploading} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          />
          <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-xs font-bold text-slate-800">
            {isUploading ? 'Compressing & Uploading...' : 'Drag photos or browse'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Images will be compressed to KB automatically</p>
        </div>
      )}

      <div className="space-y-2">
        {images.map((img, index) => (
           <div key={img.id || index} className="flex items-center justify-between p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded overflow-hidden flex items-center justify-center">
                  {img.url ? (
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">IMG</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 truncate max-w-[120px]">{img.name}</p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-2">
                    {img.size}
                    {index === 0 && <span className="text-[9px] font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded uppercase">1st (Primary)</span>}
                    {index === 1 && <span className="text-[9px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded uppercase">2nd</span>}
                    {index === 2 && <span className="text-[9px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded uppercase">3rd</span>}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  disabled={index === 0} 
                  onClick={() => moveImage(index, 'up')} 
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button 
                  disabled={index === images.length - 1} 
                  onClick={() => moveImage(index, 'down')} 
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => removeImage(index)} 
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}
