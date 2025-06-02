import "@/styles/globals.css";
import { RouteProvider } from "@/context/RouteContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Proyecto ADA",
  description: "Encuentra el paradero más cercano usando Dijkstra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="">
        <RouteProvider>
          <Navbar />
          {children}
        </RouteProvider>
      </body>
    </html>
  );
}
