import { readMarkersFromJson } from "@/lib/readJson";
import { Marker } from "@/types/marker";
import MapClientWrapper from "./MapClientWrapper";


// import Sidebar from "@/components/Sidebar";
// import RouteInfo from "@/components/RouteInfo";

export default function HomePage() {
  
  const markers: Marker[] = readMarkersFromJson("paraderos_azul.json")
  
  return (
    <main className="flex flex-col md:flex-row h-screen">
      {/* <Sidebar />
      <section className="flex-1 relative">
        
        <RouteInfo />
      </section> */}
      <section className="flex-1">
        <MapClientWrapper markers={markers} />
      </section>
    </main>
  );
}