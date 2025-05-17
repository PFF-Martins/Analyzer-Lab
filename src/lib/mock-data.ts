
import { AlertData, NetworkLink, NetworkNode, NetworkStats, TopologyData, TrafficData } from "./types";

// Generate mock nodes
export const mockNodes: NetworkNode[] = [
  {
    id: "server1",
    name: "Web Server 01",
    type: "server",
    status: "healthy",
    ipAddress: "192.168.1.10",
    location: "Data Center A",
    metrics: {
      cpu: 45,
      memory: 62,
      diskUsage: 78,
      temperature: 52
    }
  },
  {
    id: "server2",
    name: "App Server 01",
    type: "server",
    status: "healthy",
    ipAddress: "192.168.1.11",
    location: "Data Center A",
    metrics: {
      cpu: 65,
      memory: 77,
      diskUsage: 52,
      temperature: 58
    }
  },
  {
    id: "router1",
    name: "Core Router",
    type: "router",
    status: "healthy",
    ipAddress: "192.168.0.1",
    location: "Data Center A",
    metrics: {
      cpu: 32,
      memory: 45,
      diskUsage: 28,
      temperature: 48
    }
  },
  {
    id: "switch1",
    name: "Main Switch",
    type: "switch",
    status: "warning",
    ipAddress: "192.168.0.2",
    location: "Data Center A",
    metrics: {
      cpu: 68,
      memory: 52,
      diskUsage: 30
    }
  },
  {
    id: "db1",
    name: "Database Primary",
    type: "database",
    status: "healthy",
    ipAddress: "192.168.1.20",
    location: "Data Center A",
    metrics: {
      cpu: 72,
      memory: 85,
      diskUsage: 91,
      temperature: 62
    }
  },
  {
    id: "client1",
    name: "Admin Workstation",
    type: "client",
    status: "healthy",
    ipAddress: "192.168.2.15",
    location: "Office Floor 2",
    metrics: {
      cpu: 22,
      memory: 40,
      diskUsage: 65
    }
  },
  {
    id: "router2",
    name: "Edge Router",
    type: "router",
    status: "healthy",
    ipAddress: "192.168.0.3",
    location: "Data Center B",
    metrics: {
      cpu: 28,
      memory: 35,
      diskUsage: 20,
      temperature: 42
    }
  },
  {
    id: "server3",
    name: "Backup Server",
    type: "server",
    status: "warning",
    ipAddress: "192.168.1.12",
    location: "Data Center B",
    metrics: {
      cpu: 12,
      memory: 25,
      diskUsage: 92,
      temperature: 40
    }
  },
  {
    id: "switch2",
    name: "Department Switch",
    type: "switch",
    status: "healthy",
    ipAddress: "192.168.0.4",
    location: "Office Floor 1",
    metrics: {
      cpu: 15,
      memory: 22,
      diskUsage: 18
    }
  },
  {
    id: "client2",
    name: "Dev Workstation",
    type: "client",
    status: "error",
    ipAddress: "192.168.2.20",
    location: "Office Floor 1",
    metrics: {
      cpu: 95,
      memory: 98,
      diskUsage: 45
    }
  }
];

// Generate mock links
export const mockLinks: NetworkLink[] = [
  {
    id: "link1",
    source: "router1",
    target: "server1",
    status: "active",
    bandwidth: 980,
    latency: 2.3,
    packetLoss: 0.02
  },
  {
    id: "link2",
    source: "router1",
    target: "server2",
    status: "active",
    bandwidth: 940,
    latency: 1.8,
    packetLoss: 0.01
  },
  {
    id: "link3",
    source: "router1",
    target: "switch1",
    status: "active",
    bandwidth: 850,
    latency: 0.9,
    packetLoss: 0.0
  },
  {
    id: "link4",
    source: "switch1",
    target: "db1",
    status: "active",
    bandwidth: 750,
    latency: 1.2,
    packetLoss: 0.01
  },
  {
    id: "link5",
    source: "switch1",
    target: "client1",
    status: "degraded",
    bandwidth: 350,
    latency: 8.5,
    packetLoss: 2.5
  },
  {
    id: "link6",
    source: "router1",
    target: "router2",
    status: "active",
    bandwidth: 920,
    latency: 3.1,
    packetLoss: 0.05
  },
  {
    id: "link7",
    source: "router2",
    target: "server3",
    status: "active",
    bandwidth: 880,
    latency: 2.8,
    packetLoss: 0.03
  },
  {
    id: "link8",
    source: "router2",
    target: "switch2",
    status: "active",
    bandwidth: 820,
    latency: 1.5,
    packetLoss: 0.01
  },
  {
    id: "link9",
    source: "switch2",
    target: "client2",
    status: "down",
    bandwidth: 0,
    latency: 500,
    packetLoss: 100
  }
];

// Complete topology data
export const mockTopologyData: TopologyData = {
  nodes: mockNodes,
  links: mockLinks
};

// Generate mock traffic data for the past 24 hours
export const generateTrafficData = (): TrafficData[] => {
  const data: TrafficData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() - (24 - i));
    
    // Generate some random but somewhat realistic traffic patterns
    const hourOfDay = time.getHours();
    let baseFactor = 1;
    
    // Simulate higher traffic during work hours
    if (hourOfDay >= 9 && hourOfDay <= 17) {
      baseFactor = 2 + Math.sin((hourOfDay - 9) * Math.PI / 8) * 1.5;
    }
    
    const inbound = Math.floor(baseFactor * (50 + Math.random() * 150));
    const outbound = Math.floor(baseFactor * (30 + Math.random() * 100));
    const errors = Math.floor(Math.random() * 5);
    const dropped = Math.floor(Math.random() * 10);
    
    data.push({
      timestamp: time.toISOString(),
      inbound,
      outbound,
      errors,
      dropped
    });
  }
  
  return data;
};

// Generate mock alerts
export const mockAlerts: AlertData[] = [
  {
    id: "alert1",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
    level: "critical",
    title: "High CPU Usage",
    message: "Client Dev Workstation (192.168.2.20) has CPU usage above 90% for more than 5 minutes.",
    source: "client2",
    acknowledged: false
  },
  {
    id: "alert2",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    level: "warning",
    title: "Increased Latency",
    message: "Connection from Switch (192.168.0.2) to Client (192.168.2.15) experiencing high latency (8.5ms).",
    source: "link5",
    acknowledged: true
  },
  {
    id: "alert3",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
    level: "critical",
    title: "Connection Down",
    message: "Connection from Department Switch to Dev Workstation is down. Packet loss at 100%.",
    source: "link9",
    acknowledged: false
  },
  {
    id: "alert4",
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(), // 3 hours ago
    level: "info",
    title: "Backup Completed",
    message: "Scheduled backup of Database Primary completed successfully.",
    source: "db1",
    acknowledged: true
  },
  {
    id: "alert5",
    timestamp: new Date(Date.now() - 240 * 60000).toISOString(), // 4 hours ago
    level: "warning",
    title: "Disk Space Warning",
    message: "Backup Server (192.168.1.12) disk usage is at 92%.",
    source: "server3",
    acknowledged: false
  }
];

// Generate network statistics
export const mockNetworkStats: NetworkStats = {
  totalNodes: mockNodes.length,
  activeNodes: mockNodes.filter(node => node.status === "healthy" || node.status === "warning").length,
  totalBandwidth: mockLinks
    .filter(link => link.status !== "down")
    .reduce((sum, link) => sum + link.bandwidth, 0),
  avgLatency: mockLinks
    .filter(link => link.status !== "down")
    .reduce((sum, link) => sum + link.latency, 0) / 
    mockLinks.filter(link => link.status !== "down").length,
  avgPacketLoss: mockLinks
    .filter(link => link.status !== "down")
    .reduce((sum, link) => sum + link.packetLoss, 0) / 
    mockLinks.filter(link => link.status !== "down").length,
  uptimePercentage: 99.42
};
