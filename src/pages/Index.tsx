
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import MetricCard from '@/components/MetricCard';
import AlertItem from '@/components/AlertItem';
import TrafficChart from '@/components/TrafficChart';
import { Network, Activity, Database, Wifi } from 'lucide-react';
import { mockAlerts, mockNetworkStats, mockNodes, mockLinks, generateTrafficData } from '@/lib/mock-data';

const Index = () => {
  const trafficData = generateTrafficData();
  const activeNodes = mockNodes.filter(n => n.status === 'healthy' || n.status === 'warning').length;
  const healthyNodes = mockNodes.filter(n => n.status === 'healthy').length;
  const warningNodes = mockNodes.filter(n => n.status === 'warning').length;
  const errorNodes = mockNodes.filter(n => n.status === 'error').length;
  const activeLinks = mockLinks.filter(l => l.status === 'active' || l.status === 'degraded').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral da saúde e performance da rede.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Dispositivos Ativos" 
          value={activeNodes} 
          unit={`/${mockNodes.length}`} 
          icon={<Wifi className="h-4 w-4" />}
          subtitle="Dispositivos em operação"
        />
        <MetricCard 
          title="Banda Utilizada" 
          value={Math.round(mockNetworkStats.totalBandwidth / 1000)} 
          unit="Gbps" 
          icon={<Network className="h-4 w-4" />}
          trend="up"
          subtitle="Capacidade total da rede"
        />
        <MetricCard 
          title="Média de Latência" 
          value={mockNetworkStats.avgLatency} 
          unit="ms" 
          icon={<Activity className="h-4 w-4" />}
          subtitle="Tempo médio de resposta"
        />
        <MetricCard 
          title="Taxa de Uptime" 
          value={mockNetworkStats.uptimePercentage} 
          unit="%" 
          icon={<Database className="h-4 w-4" />}
          subtitle="Disponibilidade da rede"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Tráfego de Rede</CardTitle>
            <CardDescription>Últimas 24 horas de tráfego (Mbps)</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficChart data={trafficData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Status da Rede</CardTitle>
            <CardDescription>Saúde dos componentes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Dispositivos</span>
                <div className="flex gap-1.5">
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {healthyNodes} OK
                  </span>
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                    {warningNodes} Alerta
                  </span>
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800">
                    {errorNodes} Erro
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-l-full" style={{ width: `${(healthyNodes / mockNodes.length) * 100}%` }}></div>
                <div className="bg-yellow-500 h-2.5" style={{ width: `${(warningNodes / mockNodes.length) * 100}%`, marginLeft: `-2px` }}></div>
                <div className="bg-red-500 h-2.5 rounded-r-full" style={{ width: `${(errorNodes / mockNodes.length) * 100}%`, marginLeft: `-2px` }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Conexões</span>
                <div className="flex gap-1.5">
                  <StatusBadge status="active" className="text-xs px-2 py-0.5" />
                  <span className="inline-flex items-center text-xs">{activeLinks}/{mockLinks.length}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(activeLinks / mockLinks.length) * 100}%` }}></div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-medium mb-2">Detalhes do Sistema</h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latência Média</span>
                  <span className="font-medium">{mockNetworkStats.avgLatency.toFixed(1)} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Perda de Pacotes</span>
                  <span className="font-medium">{mockNetworkStats.avgPacketLoss.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Última Verificação</span>
                  <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Alertas Recentes</CardTitle>
          <CardDescription>Problemas e notificações do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAlerts.slice(0, 3).map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
            {mockAlerts.length > 3 && (
              <div className="text-center pt-2">
                <a href="/alerts" className="text-sm text-blue-600 hover:text-blue-800">
                  Ver todos os {mockAlerts.length} alertas
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
