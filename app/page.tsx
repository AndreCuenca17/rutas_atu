import Map from "@/components/Map";

// import Sidebar from "@/components/Sidebar";
// import RouteInfo from "@/components/RouteInfo";

export default function HomePage() {
  
  const markers = [
    { lat: -12.0464, lng: -77.0428, title: "Centro de Lima" },
    { lat: -12.0465, lng: -77.0430, title: "Marker 1" },
    { lat: -12.0466, lng: -77.0432, title: "Marker 2" },
  ];
  
  return (
    <main className="flex flex-col md:flex-row h-screen">
      {/* <Sidebar />
      <section className="flex-1 relative">
        
        <RouteInfo />
      </section> */}
      <section className="flex-1">
        <Map markers={markers} />
      </section>
    </main>
  );
}