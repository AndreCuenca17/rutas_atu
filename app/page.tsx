// app/page.tsx
"use client";
import { useState, useEffect, memo } from "react";
import { useRoute } from "@/context/RouteContext";
import { Marker } from "@/types/marker";
import MapClientWrapper from "./MapClientWrapper";
import Drawer from "@/components/Drawer";

// Memoizar el MapClientWrapper para que solo se re-renderice cuando cambien los markers
const MemoizedMapWrapper = memo(MapClientWrapper);

export default function HomePage() {
  const { currentRoute, isDrawerOpen, setIsDrawerOpen } = useRoute();
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const loadMarkers = async () => {
      try {
        const response = await fetch(`/api/markers/${currentRoute}`);
        if (response.ok) {
          const data = await response.json();
          setMarkers(data);
        }
      } catch (error) {
        console.error('Error loading markers:', error);
      }
    };

    loadMarkers();
  }, [currentRoute]);

  return (
    <main className="flex flex-col md:flex-row h-screen">
      <section className="flex-1">
        <MemoizedMapWrapper markers={markers} />
      </section>
      
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
      />
    </main>
  );
}