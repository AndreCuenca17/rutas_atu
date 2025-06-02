import "@/styles/globals.css";
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
