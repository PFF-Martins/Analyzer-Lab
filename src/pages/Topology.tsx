
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import NetworkTopologyGraph from '@/components/NetworkTopologyGraph';
import StatusBadge from '@/components/StatusBadge';
import { mockNodes, mockLinks } from '@/lib/mock-data';
import { NetworkNode, NetworkLink } from '@/lib/types';

const TopologyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    servers: true,
    routers: true,
    switches: true,
    clients: true,
    databases: true,
    healthy: true,
    warning: true,
    error: true,
    unknown: true
  });
  const [selectedView, setSelectedView] = useState('graph');

  // Filter nodes based on search term and filters
  const filteredNodes = mockNodes.filter(node => {
    // Filter by search term
    if (searchTerm && 
        !node.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !node.ipAddress.includes(searchTerm)) {
      return false;
    }
    
    // Filter by type
    if (
      (node.type === 'server' && !filters.servers) ||
      (node.type === 'router' && !filters.routers) ||
      (node.type === 'switch' && !filters.switches) ||
      (node.type === 'client' && !filters.clients) ||
      (node.type === 'database' && !filters.databases)
    ) {
      return false;
    }
    
    // Filter by status
    if (
      (node.status === 'healthy' && !filters.healthy) ||
      (node.status === 'warning' && !filters.warning) ||
      (node.status === 'error' && !filters.error) ||
      (node.status === 'unknown' && !filters.unknown)
    ) {
      return false;
    }
    
    return true;
  });
  
  // Filter links to only include those connected to filtered nodes
  const filteredLinks = mockLinks.filter(link => {
    const sourceNodeExists = filteredNodes.some(node => node.id === link.source);
    const targetNodeExists = filteredNodes.some(node => node.id === link.target);
    return sourceNodeExists && targetNodeExists;
  });

  const handleFilterToggle = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const getNodeTypeLabel = (type: NetworkNode['type']) => {
    switch (type) {
      case 'server': return 'Servidor';
      case 'router': return 'Roteador';
      case 'switch': return 'Switch';
      case 'client': return 'Cliente';
      case 'database': return 'Banco de Dados';
      default: return type;
    }
  };

  const getLinkStatusLabel = (status: NetworkLink['status']) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'degraded': return 'Degradada';
      case 'down': return 'Desconectada';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Topologia da Rede</h2>
        <p className="text-muted-foreground">Visualização e análise da estrutura da rede.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Mapa da Rede</CardTitle>
              <CardDescription>
                Visualização interativa dos dispositivos e conexões
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar dispositivo ou IP..."
                  className="pl-8 w-[200px] md:w-[260px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs defaultValue="graph" value={selectedView} onValueChange={setSelectedView} className="hidden md:block">
                <TabsList>
                  <TabsTrigger value="graph">Gráfico</TabsTrigger>
                  <TabsTrigger value="list">Lista</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Tipo de Dispositivo</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Button 
                        variant={filters.servers ? "default" : "outline"} 
                        size="sm" 
                        className="text-xs w-full justify-start"
                        onClick={() => handleFilterToggle('servers')}
                      >
                        Servidores
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant={filters.routers ? "default" : "outline"} 
                        size="sm" 
                        className="text-xs w-full justify-start"
                        onClick={() => handleFilterToggle('routers')}
                      >
                        Roteadores
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant={filters.switches ? "default" : "outline"} 
                        size="sm" 
                        className="text-xs w-full justify-start"
                        onClick={() => handleFilterToggle('switches')}
                      >
                        Switches
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant={filters.clients ? "default" : "outline"} 
                        size="sm" 
                        className="text-xs w-full justify-start"
                        onClick={() => handleFilterToggle('clients')}
                      >
                        Clientes
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant={filters.databases ? "default" : "outline"} 
                        size="sm" 
                        className="text-xs w-full justify-start"
                        onClick={() => handleFilterToggle('databases')}
                      >
                        Bancos de Dados
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Button 
                        variant={filters.healthy ? "default" : "outline"} 
                        size="sm" 
                        className="text-xs w-full justify-start bg-network-alert-green hover:bg-network-alert-green/80 text-white"
                        onClick={() => handleFilterToggle('healthy')}
                      >
                        Saudável
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant={filters.warning ? "default" : "outline"} 
                        size="sm" 
                        className="text-xs w-full justify-start bg-network-alert-yellow hover:bg-network-alert-yellow/80 text-white"
                        onClick={() => handleFilterToggle('warning')}
                      >
                        Atenção
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant={filters.error ? "default" : "outline"} 
                        size="sm" 
                        className="text-xs w-full justify-start bg-network-alert-red hover:bg-network-alert-red/80 text-white"
                        onClick={() => handleFilterToggle('error')}
                      >
                        Erro
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Total:</span>
                    <span>{filteredNodes.length} dispositivos</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="font-medium">Conexões:</span>
                    <span>{filteredLinks.length} links</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              {selectedView === 'graph' ? (
                <div className="border rounded-md p-2 h-[600px] bg-gray-50 overflow-auto">
                  <NetworkTopologyGraph 
                    nodes={filteredNodes}
                    links={filteredLinks}
                    width={1200}
                    height={600}
                  />
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tipo</th>
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Endereço IP</th>
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Local</th>
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">CPU</th>
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Memória</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredNodes.map((node) => (
                          <tr key={node.id} className="hover:bg-muted/30">
                            <td className="px-4 py-3 font-medium">{node.name}</td>
                            <td className="px-4 py-3">{getNodeTypeLabel(node.type)}</td>
                            <td className="px-4 py-3">{node.ipAddress}</td>
                            <td className="px-4 py-3">{node.location}</td>
                            <td className="px-4 py-3">
                              <StatusBadge status={node.status} />
                            </td>
                            <td className="px-4 py-3">{node.metrics.cpu}%</td>
                            <td className="px-4 py-3">{node.metrics.memory}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conexões da Rede</CardTitle>
          <CardDescription>
            Status e métricas de todas as conexões entre dispositivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Origem</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Destino</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Banda</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Latência</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Perda de Pacotes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredLinks.map((link) => {
                    const sourceNode = mockNodes.find(n => n.id === link.source);
                    const targetNode = mockNodes.find(n => n.id === link.target);
                    
                    return (
                      <tr key={link.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{link.id}</td>
                        <td className="px-4 py-3">{sourceNode?.name ?? link.source}</td>
                        <td className="px-4 py-3">{targetNode?.name ?? link.target}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={link.status} />
                        </td>
                        <td className="px-4 py-3">{link.bandwidth} Mbps</td>
                        <td className="px-4 py-3">{link.latency} ms</td>
                        <td className="px-4 py-3">{link.packetLoss}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopologyPage;
