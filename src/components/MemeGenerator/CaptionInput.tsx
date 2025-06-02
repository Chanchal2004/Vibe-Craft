import React, { useState } from "react";
import { Wand2, Palette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { CaptionInputProps } from "../../types/meme";
import { motion } from "framer-motion";

export const CaptionInput: React.FC<CaptionInputProps> = ({
  label,
  value,
  position,
  color,
  outlineColor,
  onChange,
  onColorChange,
  onOutlineColorChange,
  onSuggestionClick,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showOutlinePicker, setShowOutlinePicker] = useState(false);
  const [activeColorPicker, setActiveColorPicker] = useState<"text" | "outline">("text");

  const handleColorPickerToggle = (type: "text" | "outline") => {
    if (type === "text") {
      setShowColorPicker(!showColorPicker);
      setShowOutlinePicker(false);
      setActiveColorPicker("text");
    } else {
      setShowOutlinePicker(!showOutlinePicker);
      setShowColorPicker(false);
      setActiveColorPicker("outline");
    }
  };

  return (
    <div className="mb-4 relative">
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleColorPickerToggle("text")}
            className="p-1 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            title="Change text color"
          >
            <div 
              className="w-5 h-5 rounded-full border border-gray-300" 
              style={{ backgroundColor: color }} 
            />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleColorPickerToggle("outline")}
            className="p-1 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            title="Change outline color"
          >
            <div 
              className="w-5 h-5 rounded-full border border-gray-300" 
              style={{ backgroundColor: outlineColor }} 
            />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onSuggestionClick}
            className="text-indigo-600 p-1 rounded-full flex items-center justify-center hover:bg-indigo-50 transition-colors"
            title="Get suggestion"
          >
            <Wand2 size={16} />
          </motion.button>
        </div>
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={`Enter ${position} text...`}
      />
      
      {showColorPicker && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 z-10 mt-2 bg-white p-2 rounded-md shadow-lg"
        >
          <HexColorPicker color={color} onChange={onColorChange} />
          <div className="text-xs text-center mt-2 text-gray-600">Text Color</div>
        </motion.div>
      )}
      
      {showOutlinePicker && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 z-10 mt-2 bg-white p-2 rounded-md shadow-lg"
        >
          <HexColorPicker color={outlineColor} onChange={onOutlineColorChange} />
          <div className="text-xs text-center mt-2 text-gray-600">Outline Color</div>
        </motion.div>
      )}
    </div>
  );
};