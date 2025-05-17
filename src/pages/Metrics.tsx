
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockNetworkStats } from '@/lib/mock-data';

const MetricsPage = () => {
  // Generate sample time series data
  const generateTimeSeriesData = (hours = 24, baseValue = 50, variance = 20) => {
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < hours; i++) {
      const time = new Date(now);
      time.setHours(now.getHours() - (hours - i));
      
      const value = Math.max(0, baseValue + (Math.random() - 0.5) * variance * 2);
      
      data.push({
        time: time.toISOString(),
        value: Math.round(value),
        display: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`
      });
    }
    
    return data;
  };

  const cpuData = generateTimeSeriesData(24, 45, 25);
  const memoryData = generateTimeSeriesData(24, 65, 15);
  const latencyData = generateTimeSeriesData(24, 3, 4);
  const packetLossData = generateTimeSeriesData(24, 0.15, 0.3);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Métricas de Performance</h2>
        <p className="text-muted-foreground">Análise detalhada de métricas e indicadores de performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Utilização de CPU</CardTitle>
                <CardDescription>Média de uso de CPU nos dispositivos</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione dispositivos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos dispositivos</SelectItem>
                  <SelectItem value="servers">Apenas servidores</SelectItem>
                  <SelectItem value="routers">Apenas roteadores</SelectItem>
                  <SelectItem value="switches">Apenas switches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={cpuData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="display" 
                  stroke="#718096" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#718096" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                  allowDecimals={false}
                  unit="%"
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="CPU" 
                  stroke="#3182ce" 
                  fill="#3182ce" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <div className="text-xs text-gray-500">Pico de utilização em 24h: 85%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Utilização de Memória</CardTitle>
                <CardDescription>Média de uso de memória nos dispositivos</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione dispositivos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos dispositivos</SelectItem>
                  <SelectItem value="servers">Apenas servidores</SelectItem>
                  <SelectItem value="routers">Apenas roteadores</SelectItem>
                  <SelectItem value="switches">Apenas switches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={memoryData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="display" 
                  stroke="#718096" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#718096" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                  allowDecimals={false}
                  unit="%"
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="Memória" 
                  stroke="#805ad5" 
                  fill="#805ad5" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <div className="text-xs text-gray-500">Pico de utilização em 24h: 93%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Latência da Rede</CardTitle>
                <CardDescription>Tempo médio de resposta entre dispositivos</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione conexões" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas conexões</SelectItem>
                  <SelectItem value="internal">Apenas internas</SelectItem>
                  <SelectItem value="external">Apenas externas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={latencyData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="display" 
                  stroke="#718096" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#718096" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                  unit=" ms"
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Latência" 
                  stroke="#38a169" 
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <div>Latência média: {mockNetworkStats.avgLatency.toFixed(1)} ms</div>
              <div>Pico em 24h: 12.4 ms</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Perda de Pacotes</CardTitle>
                <CardDescription>Percentual médio de pacotes perdidos</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione conexões" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas conexões</SelectItem>
                  <SelectItem value="internal">Apenas internas</SelectItem>
                  <SelectItem value="external">Apenas externas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={packetLossData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="display" 
                  stroke="#718096" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#718096" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                  unit="%"
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Perda de Pacotes" 
                  stroke="#e53e3e" 
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <div>Perda média: {mockNetworkStats.avgPacketLoss.toFixed(2)}%</div>
              <div>Pico em 24h: 1.35%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas de Performance</CardTitle>
          <CardDescription>
            Dados consolidados de performance da rede
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Latência (ms)</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Mínima</span>
                <span>0.5</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Média</span>
                <span>{mockNetworkStats.avgLatency.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Máxima</span>
                <span>12.4</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Perda de Pacotes (%)</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Mínima</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Média</span>
                <span>{mockNetworkStats.avgPacketLoss.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Máxima</span>
                <span>2.50</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Utilização de Banda</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Largura de banda total</span>
                <span>{Math.round(mockNetworkStats.totalBandwidth / 1000)} Gbps</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Utilização média</span>
                <span>42%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Pico de utilização</span>
                <span>78%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsPage;
