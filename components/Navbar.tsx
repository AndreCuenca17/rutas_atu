"use client";
import React from "react";
import { useRoute } from "@/context/RouteContext";
import { Menu } from "lucide-react";
import Drawer from "./Drawer";
import Image from "next/image";

const Navbar = () => {
  // Usa solo el estado del contexto, elimina el useState local
  const { isDrawerOpen, setIsDrawerOpen } = useRoute();

  return (
    <nav className="bg-[#054D94] w-full top-0 left-0 z-50 relative">
      <div className="flex justify-center py-4">
        <Image
          src={"/logoatu.png"}
          alt="ATU Logo"
          className="h-12"
          width={180}
          height={60}
          priority
        />
      </div>
      <div className="absolute top-0 right-5 flex h-full items-center">
        <button
          className="transform transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {/* Icono pequeño en móvil */}
          <span className="block md:hidden">
            <Menu size={32} />
          </span>
          {/* Icono grande en escritorio */}
          <span className="hidden md:block">
            <Menu size={48} />
          </span>
        </button>
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </nav>
  );
};

export default Navbar;
