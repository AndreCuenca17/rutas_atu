import "@/styles/globals.css";

export const metadata = {
  title: "Proyecto ADA",
  description: "Encuentra el paradero más cercano usando Dijkstra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="">
        {children}
      </body>
    </html>
  );
}