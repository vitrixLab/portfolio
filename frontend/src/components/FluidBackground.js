import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FluidBackground = ({ className = '', style = {} }) => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const animationRef = useRef(null);
  const lastFrameTime = useRef(0);
  const frameDelay = 150; // ms between frames for smooth animation

  const fetchFluidFrame = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/fluid-stream`, { timeout: 5000 });
      if (response.data.status === 'success') {
        return response.data.frame;
      } else {
        console.warn('API returned error:', response.data.message);
        return null;
      }
    } catch (err) {
      console.warn('Fluid frame fetch failed, using fallback. Error:', err.message);
      return null;
    }
  }, []);

  const drawFrame = useCallback(async (timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Only fetch new frame if enough time has passed
    if (timestamp - lastFrameTime.current > frameDelay) {
      const frameData = await fetchFluidFrame();
      
      if (frameData) {
        const img = new Image();
        img.onload = () => {
          // Clear canvas and draw new frame
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Scale image to fit canvas while maintaining aspect ratio
          const canvasAspect = canvas.width / canvas.height;
          const imgAspect = img.width / img.height;
          
          let drawWidth, drawHeight, drawX, drawY;
          
          if (canvasAspect > imgAspect) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspect;
            drawX = 0;
            drawY = (canvas.height - drawHeight) / 2;
          } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgAspect;
            drawX = (canvas.width - drawWidth) / 2;
            drawY = 0;
          }
          
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          
          if (!isLoaded) {
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          console.warn('Failed to load fluid frame image');
          drawFallbackGradient(ctx, canvas.width, canvas.height, timestamp);
        };
        img.src = frameData;
        
        lastFrameTime.current = timestamp;
      } else {
        // Fallback gradient animation
        drawFallbackGradient(ctx, canvas.width, canvas.height, timestamp);
        if (!isLoaded) {
          setIsLoaded(true);
        }
      }
    }

    animationRef.current = requestAnimationFrame(drawFrame);
  }, [fetchFluidFrame, isLoaded, frameDelay]);

  const drawFallbackGradient = (ctx, width, height, timestamp) => {
    // Fallback CSS-style gradient animation if tensor backend fails
    const time = timestamp * 0.001;
    
    // Create dynamic gradient
    const gradient = ctx.createLinearGradient(
      Math.sin(time * 0.5) * width * 0.5 + width * 0.5,
      Math.cos(time * 0.3) * height * 0.5 + height * 0.5,
      Math.cos(time * 0.4) * width * 0.5 + width * 0.5,
      Math.sin(time * 0.6) * height * 0.5 + height * 0.5
    );
    
    const alpha1 = 0.3 + 0.2 * Math.sin(time * 0.8);
    const alpha2 = 0.2 + 0.3 * Math.cos(time * 0.6);
    const alpha3 = 0.4 + 0.2 * Math.sin(time * 1.2);
    
    gradient.addColorStop(0, `rgba(0, 255, 209, ${alpha1})`);
    gradient.addColorStop(0.3, `rgba(0, 85, 255, ${alpha2})`);
    gradient.addColorStop(0.7, `rgba(0, 255, 170, ${alpha3})`);
    gradient.addColorStop(1, 'rgba(0, 100, 150, 0.2)');
    
    // Fill with gradient
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup
    resizeCanvas();
    
    // Start animation
    animationRef.current = requestAnimationFrame(drawFrame);

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [drawFrame, resizeCanvas]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${className}`}
        style={{
          zIndex: 0,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          ...style
        }}
      />
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className=\"absolute inset-0 flex items-center justify-center z-10\">
          <div className=\"text-center\">
            <div className=\"w-8 h-8 border-2 border-[#00FFD1] border-t-transparent rounded-full animate-spin mx-auto mb-2\"></div>
            <p className=\"text-[#00FFD1] text-sm font-medium\">Initializing AI Dynamics...</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className=\"absolute inset-0 bg-gradient-to-br from-blue-900/20 to-teal-900/20 z-0\" />
      )}
    </>
  );
};

export default FluidBackground;"