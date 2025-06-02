"use client";
import React, { useState } from "react";
import { X, ChevronDown, ChevronRight } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  const [isMetrosOpen, setIsMetrosOpen] = useState(false);
  const [isCorredoresOpen, setIsCorredoresOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <aside className="fixed top-0 right-0 h-full w-full sm:w-90 bg-white text-black px-4 py-6 shadow-lg flex flex-col z-50 transition-transform duration-300 ease-in-out">
      <div className="w-auto h-auto">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={24} className="text-gray-600 hover:text-gray-900" />
        </button>
      </div>
      <div className="w-full sm:w-80 h-auto mx-auto flex flex-col my-10 overflow-y-auto text-white">
        <button
          className="relative bg-[#003166] w-full mx-auto p-4 hover:cursor-pointer"
          onClick={() => setIsMetrosOpen(!isMetrosOpen)}
        > 
          Metro de Lima y Callao
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            {isMetrosOpen ? (
              <ChevronDown size={24} className="inline ml-2" />
            ) : (
              <ChevronRight size={24} className="inline ml-2" />
            )}
          </div>
        </button>
        {isMetrosOpen && (
          <>
            <button
              className="bg-[#006FFF] w-full mx-auto p-4 hover:cursor-pointer"
              onClick={() => console.log("Línea 1")}
            >
              Línea 1
            </button>
            <button
              className="bg-[#006FFF] w-full mx-auto p-4 hover:cursor-pointer"
              onClick={() => console.log("Línea 2")}
            >
              Línea 2
            </button>
          </>
        )}
        <button
          className="bg-[#1100FF] relative w-full mx-auto p-4 hover:cursor-pointer"
          onClick={() => setIsCorredoresOpen(!isCorredoresOpen)}
        >
          Corredores complementarios
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            {isCorredoresOpen ? (
              <ChevronDown size={24} className="inline ml-2" />
            ) : (
              <ChevronRight size={24} className="inline ml-2" />
            )}
          </div>
        </button>
        {isCorredoresOpen && (
          <>
            <button
              className="bg-[#FF0000] w-full mx-auto p-4 hover:cursor-pointer"
              onClick={() => console.log("Corredor Rojo")}
            >
              Corredor Rojo
            </button>
            <button
              className="bg-[#8000E2] w-full mx-auto p-4 hover:cursor-pointer"
              onClick={() => console.log("Corredor Morado")}
            >
              Corredor Morado
            </button>
            <button
              className="bg-[#2600FF] w-full mx-auto p-4 hover:cursor-pointer"
              onClick={() => console.log("Corredor Azul")}
            >
              Corredor Azul
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Drawer;
