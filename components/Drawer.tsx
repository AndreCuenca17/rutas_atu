"use client";
import React, { useState } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  Train,
  Bus,
  LineChart,
  Video,
} from "lucide-react";
import { useRoute } from "@/context/RouteContext";
import Link from "next/link";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  const [isMetrosOpen, setIsMetrosOpen] = useState(false);
  const [isCorredoresOpen, setIsCorredoresOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { setCurrentRoute } = useRoute();

  const videoUrl = "https://www.youtube.com/embed/4k2nwVAqfOE?si=egxiVpD9MSbnZQMg";
  const videoTitle = "Comparación de Algoritmo de Dijkstra";
  const videoDescription =
    "Comparación de la implementación del algoritmo de Dijkstra (con y sin colas de prioridad) en el contexto de rutas de transporte público en Lima y Callao.";

  if (!isOpen) return null;

  const handleRouteClick = (route: string) => {
    console.log(`Ruta seleccionada: ${route}`);
    setCurrentRoute(route);
    onClose(); // Cerrar drawer después de seleccionar

    if (["linea1", "linea2"].includes(route)) {
      setIsMetrosOpen(!isMetrosOpen);
    }

    if (["rojo", "morado", "azul"].includes(route)) {
      setIsCorredoresOpen(!isCorredoresOpen);
    }
  };

  const handleButtonVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevenir navegación del Link
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  // Agregar estas funciones aquí:
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      closeVideo();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Escape") {
      closeVideo();
    }
  };

  return (
    <aside className="fixed top-0 right-0 h-full w-full sm:w-90 bg-white text-black shadow-lg flex flex-col z-50 transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="bg-[#054D94] w-full text-white p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:transform hover:scale-110 transition-colors duration-200"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-1">Transporte Público</h2>
        <p className="text-blue-200 text-sm">Lima y Callao</p>
      </div>

      {/* Content - Ahora con flex-1 y flex flex-col */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sección principal con scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {/* Metro Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              onClick={() => setIsMetrosOpen(!isMetrosOpen)}
            >
              <div className="flex items-center space-x-3">
                <Train size={20} />
                <span className="font-medium">Metro de Lima y Callao</span>
              </div>
              <div
                className="transform transition-transform duration-200"
                style={{
                  transform: isMetrosOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <ChevronDown size={20} />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isMetrosOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="p-2 space-y-1">
                <button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                  onClick={() => handleRouteClick("linea1")}
                >
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                    Línea 1
                  </span>
                </button>
                <button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                  onClick={() => handleRouteClick("linea2")}
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                    Línea 2
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Corredores Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
              onClick={() => setIsCorredoresOpen(!isCorredoresOpen)}
            >
              <div className="flex items-center space-x-3">
                <Bus size={20} />
                <span className="font-medium">Corredores Complementarios</span>
              </div>
              <div
                className="transform transition-transform duration-200"
                style={{
                  transform: isCorredoresOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                <ChevronDown size={20} />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isCorredoresOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="p-2 space-y-1">
                <button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 group"
                  onClick={() => handleRouteClick("rojo")}
                >
                  <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 group-hover:text-red-700 font-medium">
                    Corredor Rojo
                  </span>
                </button>
                <button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200 group"
                  onClick={() => handleRouteClick("morado")}
                >
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 group-hover:text-purple-700 font-medium">
                    Corredor Morado
                  </span>
                </button>
                <button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                  onClick={() => handleRouteClick("azul")}
                >
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                    Corredor Azul
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de presentación - Ahora al final */}
        <div className="p-6 pt-0 space-y-4 flex flex-col">
          <Link href="/exposicion/analisis_complejidad">
            <button
              className="w-full flex rounded-xl items-center justify-between p-4 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200"
              onClick={onClose}
            >
              <div className="flex items-center space-x-3">
                <LineChart size={20} />
                <span className="font-medium">Análisis de complejidad</span>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <ChevronRight />
              </div>
            </button>
          </Link>

          <button
            className="w-full flex rounded-xl items-center justify-between p-4 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200"
            onClick={handleButtonVideo}
          >
            <div className="flex items-center space-x-3">
              <Video size={20} />
              <span className="font-medium">Ver comparación de Dijkstra</span>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <ChevronRight />
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Selecciona una ruta para ver información detallada
        </p>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header del modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {videoTitle}
              </h3>
              <button
                onClick={closeVideo}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                type="button"
                aria-label="Cerrar video"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Contenedor del video */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoUrl}
                title={videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer opcional */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">{videoDescription}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Drawer;
