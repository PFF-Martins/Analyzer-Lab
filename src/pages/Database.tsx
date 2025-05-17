
import React from 'react';

const DatabasePage = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Base de Dados</h2>
        <p className="text-muted-foreground text-sm md:text-base">Gerenciamento e análise da base de dados da rede.</p>
      </div>
      
      <div className="flex items-center justify-center h-64 md:h-80 border rounded-lg bg-muted/20">
        <div className="text-center p-4">
          <h3 className="text-lg md:text-xl font-medium mb-2">Módulo em Desenvolvimento</h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Esta funcionalidade estará disponível em breve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;
