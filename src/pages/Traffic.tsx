
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrafficChart from '@/components/TrafficChart';
import { generateTrafficData } from '@/lib/mock-data';

const TrafficPage = () => {
  const trafficData = generateTrafficData();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Análise de Tráfego</h2>
        <p className="text-muted-foreground">Monitoramento e análise de tráfego da rede.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Tráfego da Rede</CardTitle>
              <CardDescription>Visualização do tráfego ao longo do tempo</CardDescription>
            </div>
            <Tabs defaultValue="24h">
              <TabsList>
                <TabsTrigger value="1h">1h</TabsTrigger>
                <TabsTrigger value="6h">6h</TabsTrigger>
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <TrafficChart data={trafficData} className="h-80" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análise de Protocolos</CardTitle>
            <CardDescription>Distribuição do tráfego por protocolo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">HTTP/HTTPS</span>
                  <span className="text-sm font-medium">64%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">DNS</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">SMTP</span>
                  <span className="text-sm font-medium">8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">FTP</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Outros</span>
                  <span className="text-sm font-medium">11%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{ width: "11%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top IPs de Origem</CardTitle>
            <CardDescription>IPs com maior tráfego de saída</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.1.10</div>
                  <div className="text-xs text-muted-foreground">Web Server 01</div>
                </div>
                <div className="text-sm">245 GB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.1.20</div>
                  <div className="text-xs text-muted-foreground">Database Primary</div>
                </div>
                <div className="text-sm">183 GB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.0.1</div>
                  <div className="text-xs text-muted-foreground">Core Router</div>
                </div>
                <div className="text-sm">157 GB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.1.11</div>
                  <div className="text-xs text-muted-foreground">App Server 01</div>
                </div>
                <div className="text-sm">132 GB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.2.15</div>
                  <div className="text-xs text-muted-foreground">Admin Workstation</div>
                </div>
                <div className="text-sm">94 GB</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top IPs de Destino</CardTitle>
            <CardDescription>IPs com maior tráfego de entrada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.1.20</div>
                  <div className="text-xs text-muted-foreground">Database Primary</div>
                </div>
                <div className="text-sm">312 GB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.1.10</div>
                  <div className="text-xs text-muted-foreground">Web Server 01</div>
                </div>
                <div className="text-sm">267 GB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.1.12</div>
                  <div className="text-xs text-muted-foreground">Backup Server</div>
                </div>
                <div className="text-sm">201 GB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.0.1</div>
                  <div className="text-xs text-muted-foreground">Core Router</div>
                </div>
                <div className="text-sm">145 GB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">192.168.1.11</div>
                  <div className="text-xs text-muted-foreground">App Server 01</div>
                </div>
                <div className="text-sm">98 GB</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrafficPage;
