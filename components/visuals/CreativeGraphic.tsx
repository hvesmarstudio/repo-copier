import React, { useState, useEffect } from 'react';
import { FileText, Image, PenTool } from 'lucide-react';

export const CreativeGraphic: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Analyzing brand voice... Generating variations... Adapting to LinkedIn format...";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        index = 0;
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 h-full w-full p-2 md:p-4 max-h-[500px]">
       {/* Card 1: Text Gen */}
       <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
         <div className="absolute top-4 right-4 text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">GENERATOR</div>
         <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <PenTool size={14} className="text-white" />
            </div>
            <div className="h-2 w-24 bg-gray-100 rounded"></div>
         </div>
         <p className="font-mono text-sm text-gray-600 min-h-[3rem]">
           {text}<span className="animate-pulse">|</span>
         </p>
       </div>

       {/* Card 2: Image Placeholders */}
       <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-center gap-3 group hover:bg-black hover:text-white transition-colors duration-300">
          <Image size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium">Visual Asset</span>
       </div>

       {/* Card 3: Analytics */}
       <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-between group">
          <div className="flex justify-between items-start">
             <FileText size={20} />
             <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2 mt-4">
             <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-black w-[70%] group-hover:w-[90%] transition-all duration-700"></div>
             </div>
             <div className="h-1 w-2/3 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-black w-[40%] group-hover:w-[60%] transition-all duration-700 delay-100"></div>
             </div>
          </div>
       </div>
    </div>
  );
};