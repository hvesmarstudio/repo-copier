import React from 'react';
import { Database, Cpu, Layout, Layers } from 'lucide-react';

export const ArchitectureGraphic: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[350px] lg:min-h-[400px] flex items-center justify-center perspective-1000 group">
      <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 preserve-3d">
        {/* Layer 1: Data */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-200 flex items-center justify-center isometric-layer isometric-layer-1 opacity-90">
           <div className="flex flex-col items-center gap-2">
             <Database className="text-gray-400" size={32} />
             <span className="text-xs font-mono font-bold text-gray-500">DATA LAYER</span>
           </div>
           {/* Connecting dots */}
           <div className="absolute -top-4 -right-4 w-2 h-2 bg-black rounded-full animate-pulse"></div>
        </div>

        {/* Layer 2: Processing */}
        <div className="absolute inset-0 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 flex items-center justify-center isometric-layer isometric-layer-2 z-10">
           <div className="flex flex-col items-center gap-2">
             <Cpu className="text-white" size={32} />
             <span className="text-xs font-mono font-bold text-white">INTELLIGENCE</span>
           </div>
           {/* Animated circuits */}
           <div className="absolute inset-0 border-2 border-dashed border-gray-600 rounded-2xl animate-spin-slow"></div>
        </div>

        {/* Layer 3: Interface */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-200 flex items-center justify-center isometric-layer isometric-layer-3 z-20 opacity-90">
           <div className="flex flex-col items-center gap-2">
             <Layout className="text-gray-900" size={32} />
             <span className="text-xs font-mono font-bold text-gray-900">INTERFACE</span>
           </div>
           <div className="absolute top-4 right-4 w-20 h-2 bg-gray-100 rounded"></div>
           <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-100 rounded-full"></div>
        </div>
        
        {/* Floating particles around */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-gray-300 rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '20s' }}></div>
      </div>
    </div>
  );
};