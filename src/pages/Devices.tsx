
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockNodes } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';

const DevicesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dispositivos</h2>
        <p className="text-muted-foreground">Gerenciamento e monitoramento de dispositivos da rede.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Dispositivos</CardTitle>
          <CardDescription>Todos os dispositivos registrados na rede</CardDescription>
        </CardHeader>
        <CardContent>
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
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Disco</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockNodes.map((device) => (
                    <tr key={device.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{device.name}</td>
                      <td className="px-4 py-3">
                        {device.type === 'server' ? 'Servidor' : 
                         device.type === 'router' ? 'Roteador' :
                         device.type === 'switch' ? 'Switch' :
                         device.type === 'client' ? 'Cliente' :
                         device.type === 'database' ? 'Banco de Dados' : device.type}
                      </td>
                      <td className="px-4 py-3">{device.ipAddress}</td>
                      <td className="px-4 py-3">{device.location}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={device.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            device.metrics.cpu > 80 ? 'bg-network-alert-red' : 
                            device.metrics.cpu > 60 ? 'bg-network-alert-yellow' : 
                            'bg-network-alert-green'
                          }`} style={{ width: `${device.metrics.cpu}%` }}></div>
                        </div>
                        <span className="text-xs">{device.metrics.cpu}%</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            device.metrics.memory > 80 ? 'bg-network-alert-red' : 
                            device.metrics.memory > 60 ? 'bg-network-alert-yellow' : 
                            'bg-network-alert-green'
                          }`} style={{ width: `${device.metrics.memory}%` }}></div>
                        </div>
                        <span className="text-xs">{device.metrics.memory}%</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            device.metrics.diskUsage > 80 ? 'bg-network-alert-red' : 
                            device.metrics.diskUsage > 60 ? 'bg-network-alert-yellow' : 
                            'bg-network-alert-green'
                          }`} style={{ width: `${device.metrics.diskUsage}%` }}></div>
                        </div>
                        <span className="text-xs">{device.metrics.diskUsage}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevicesPage;
