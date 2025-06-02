import React, { useRef, useEffect } from "react";
import { MemeCanvasProps } from "../../types/meme";
import { motion } from "framer-motion";

export const MemeCanvas: React.FC<MemeCanvasProps> = ({ 
  meme, 
  onCaptionPositionChange
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Function to draw text with outline
  const drawTextWithOutline = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    fillColor: string,
    outlineColor: string
  ) => {
    ctx.font = `bold ${fontSize}px Impact, sans-serif`;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = fontSize / 10;
    ctx.textAlign = "center";
    
    // Add stroke (outline)
    ctx.strokeText(text, x, y);
    
    // Add fill
    ctx.fillText(text, x, y);
  };

  const startDrag = (e: React.MouseEvent, position: 'top' | 'middle' | 'bottom') => {
    if (!canvasRef.current) return;
    
    const caption = meme.captions.find(c => c.position === position);
    if (!caption) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startCaptionX = caption.x;
    const startCaptionY = caption.y;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      const newX = startCaptionX + dx;
      const newY = startCaptionY + dy;
      
      onCaptionPositionChange(position, newX, newY);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      id="meme-canvas" 
      ref={canvasRef}
      className="relative bg-white rounded-lg shadow-md overflow-hidden"
      style={{ 
        width: '100%', 
        maxWidth: '600px',
        height: '500px',
        margin: '0 auto'
      }}
    >
      <img 
        src={meme.url} 
        alt="Meme template" 
        className="w-full h-full object-contain"
      />
      
      {meme.captions.map((caption) => (
        <motion.div
          key={caption.position}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute cursor-move select-none"
          style={{
            left: caption.x,
            top: caption.y,
            transform: 'translate(-50%, -50%)',
            textShadow: `2px 2px 0 ${caption.outlineColor}, -2px -2px 0 ${caption.outlineColor}, 2px -2px 0 ${caption.outlineColor}, -2px 2px 0 ${caption.outlineColor}`,
            color: caption.color,
            fontSize: `${caption.fontSize}px`,
            fontFamily: 'Impact, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '80%',
            wordWrap: 'break-word'
          }}
          onMouseDown={(e) => startDrag(e, caption.position)}
        >
          {caption.text || (
            <span className="opacity-50">
              {caption.position === 'top' ? 'Top text (drag to position)' : 
              caption.position === 'middle' ? 'Middle text (drag to position)' : 
              'Bottom text (drag to position)'}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};