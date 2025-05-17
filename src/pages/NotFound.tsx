
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-network-blue-700">404</h1>
        <p className="text-xl text-network-blue-500 mb-6">Página não encontrada</p>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi removida.
        </p>
        <a href="/" className="bg-network-blue-600 hover:bg-network-blue-700 text-white font-medium px-4 py-2 rounded-md">
          Voltar para o Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
