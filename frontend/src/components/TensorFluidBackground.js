import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TensorFluidBackground = ({ children }) => {
  const containerRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);\n\n  const fetchTensorFrame = async () => {
    try {
      const response = await axios.get(`${API}/fluid-stream`, { 
        timeout: 3000,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.data.status === 'success' && response.data.frame) {
        setBackgroundImage(response.data.frame);
        if (isLoading) {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log('Tensor backend not available, using CSS gradient fallback');
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };\n\n  useEffect(() => {
    // Initial fetch
    fetchTensorFrame();
    
    // Set up interval for continuous animation
    intervalRef.current = setInterval(fetchTensorFrame, 200); // 5 FPS for smooth animation
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoading]);\n\n  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Tensor-based background (when available) */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: backgroundImage ? 1 : 0,
            zIndex: 0
          }}
        />
      )}
      
      {/* CSS Fallback gradient (always present) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-blue-900/30 to-cyan-900/50 transition-opacity duration-500"
        style={{
          opacity: backgroundImage ? 0.3 : 1, // Blend with tensor or show fully
          zIndex: 1
        }}
      />
      
      {/* Animated CSS overlay for additional depth */}
      <div 
        className="absolute inset-0 opacity-20 animate-pulse"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(0, 255, 209, 0.15) 0%, transparent 50%), linear-gradient(45deg, rgba(0, 85, 255, 0.1) 0%, rgba(0, 255, 170, 0.1) 100%)',
          zIndex: 2,
          animation: 'tensorFlow 8s ease-in-out infinite'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Loading indicator (brief) */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-black/50 rounded-lg p-4 text-center backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-[#00FFD1] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-[#00FFD1] text-xs font-medium">AI Tensor Loading...</p>
          </div>
        </div>
      )}
    </div>
  );\n};\n\n// Add custom animation keyframes\nconst style = document.createElement('style');\nstyle.textContent = `\n  @keyframes tensorFlow {\n    0%, 100% { \n      transform: translateX(0) rotate(0deg);\n      opacity: 0.2;\n    }\n    25% { \n      transform: translateX(10px) rotate(1deg);\n      opacity: 0.3;\n    }\n    50% { \n      transform: translateX(-5px) rotate(-0.5deg);\n      opacity: 0.25;\n    }\n    75% { \n      transform: translateX(15px) rotate(0.5deg);\n      opacity: 0.35;\n    }\n  }\n`;\ndocument.head.appendChild(style);\n\nexport default TensorFluidBackground;"