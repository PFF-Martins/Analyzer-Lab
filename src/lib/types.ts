
export interface NetworkNode {
  id: string;
  name: string;
  type: 'server' | 'router' | 'switch' | 'client' | 'database';
  status: 'healthy' | 'warning' | 'error' | 'unknown';
  ipAddress: string;
  location: string;
  metrics: {
    cpu: number;
    memory: number;
    diskUsage: number;
    temperature?: number;
  };
}

export interface NetworkLink {
  id: string;
  source: string;
  target: string;
  status: 'active' | 'degraded' | 'down';
  bandwidth: number;
  latency: number;
  packetLoss: number;
}

export interface TrafficData {
  timestamp: string;
  inbound: number;
  outbound: number;
  errors?: number;
  dropped?: number;
}

export interface AlertData {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  source: string;
  acknowledged: boolean;
}

export interface MetricPoint {
  timestamp: string;
  value: number;
}

export interface MetricSeries {
  name: string;
  data: MetricPoint[];
}

export interface NetworkStats {
  totalNodes: number;
  activeNodes: number;
  totalBandwidth: number;
  avgLatency: number;
  avgPacketLoss: number;
  uptimePercentage: number;
}

export interface TopologyData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}
