
import React, { useEffect, useRef, useState } from 'react';
import { NetworkLink, NetworkNode } from '@/lib/types';
import StatusBadge from './StatusBadge';

interface NetworkTopologyGraphProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  width?: number;
  height?: number;
  className?: string;
}

const NetworkTopologyGraph: React.FC<NetworkTopologyGraphProps> = ({
  nodes,
  links,
  width = 800,
  height = 600,
  className
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [hoveredLink, setHoveredLink] = useState<NetworkLink | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number, y: number } }>({});

  useEffect(() => {
    // Simple placement algorithm - this would be replaced with a more advanced force-directed layout in a real app
    const positions: { [key: string]: { x: number, y: number } } = {};
    
    // Place router nodes in the center
    const routers = nodes.filter(n => n.type === 'router');
    const routerCount = routers.length;
    const centerX = width / 2;
    const centerY = height / 2;
    const routerRadius = 150;
    
    routers.forEach((router, i) => {
      const angle = (i / routerCount) * Math.PI * 2;
      positions[router.id] = {
        x: centerX + Math.cos(angle) * (routerRadius / 2),
        y: centerY + Math.sin(angle) * (routerRadius / 2)
      };
    });
    
    // Place switches around routers they're connected to
    const switches = nodes.filter(n => n.type === 'switch');
    switches.forEach((switchNode, i) => {
      // Find connected router
      const connectedLink = links.find(link => 
        (link.source === switchNode.id && nodes.find(n => n.id === link.target)?.type === 'router') ||
        (link.target === switchNode.id && nodes.find(n => n.id === link.source)?.type === 'router')
      );
      
      let connectedRouterId;
      if (connectedLink) {
        connectedRouterId = connectedLink.source === switchNode.id ? connectedLink.target : connectedLink.source;
      } else {
        // If no router is connected, place around the first router
        connectedRouterId = routers[0]?.id;
      }
      
      if (connectedRouterId && positions[connectedRouterId]) {
        const routerPos = positions[connectedRouterId];
        const angle = ((i + 0.5) / switches.length) * Math.PI * 2;
        
        positions[switchNode.id] = {
          x: routerPos.x + Math.cos(angle) * routerRadius,
          y: routerPos.y + Math.sin(angle) * routerRadius
        };
      } else {
        // Fallback if no router
        positions[switchNode.id] = {
          x: centerX + 100 + Math.random() * 100,
          y: centerY + 100 + Math.random() * 100
        };
      }
    });
    
    // Place other nodes around their connected devices
    const otherNodes = nodes.filter(n => n.type !== 'router' && n.type !== 'switch');
    
    otherNodes.forEach((node, i) => {
      // Find connected switch or router
      const connectedLink = links.find(link => 
        link.source === node.id || link.target === node.id
      );
      
      if (connectedLink) {
        const connectedId = connectedLink.source === node.id ? connectedLink.target : connectedLink.source;
        if (positions[connectedId]) {
          const connectedPos = positions[connectedId];
          const angle = ((i + 0.5) / otherNodes.length) * Math.PI * 2;
          const nodeType = nodes.find(n => n.id === connectedId)?.type;
          const distance = nodeType === 'router' ? routerRadius * 1.5 : routerRadius * 0.8;
          
          positions[node.id] = {
            x: connectedPos.x + Math.cos(angle) * distance,
            y: connectedPos.y + Math.sin(angle) * distance
          };
        }
      }
    });
    
    // Make sure all nodes have positions
    nodes.forEach(node => {
      if (!positions[node.id]) {
        positions[node.id] = {
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.8 + height * 0.1
        };
      }
    });
    
    setNodePositions(positions);
  }, [nodes, links, width, height]);

  const getNodeIcon = (type: NetworkNode['type']) => {
    switch (type) {
      case 'server':
        return (
          <g transform="translate(-10, -10) scale(0.04)">
            <path fill="currentColor" d="M480 160H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-17.7-14.3-32-32-32zm0 160H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-17.7-14.3-32-32-32zm0 160H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-17.7-14.3-32-32-32z" />
          </g>
        );
      case 'router':
        return (
          <g transform="translate(-10, -10) scale(0.04)">
            <path fill="currentColor" d="M624 384h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-464 96c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm208-96H242.7c-16.6-28.6-47.2-48-82.7-48s-66.1 19.4-82.7 48H48V48h352v336zm112 96c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" />
          </g>
        );
      case 'switch':
        return (
          <g transform="translate(-10, -10) scale(0.04)">
            <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-296c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm16 32H152c-26.5 0-48 21.5-48 48v32c0 26.5 21.5 48 48 48h192c26.5 0 48-21.5 48-48v-32c0-26.5-21.5-48-48-48z" />
          </g>
        );
      case 'client':
        return (
          <g transform="translate(-10, -10) scale(0.04)">
            <path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" />
          </g>
        );
      case 'database':
        return (
          <g transform="translate(-10, -10) scale(0.04)">
            <path fill="currentColor" d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z" />
          </g>
        );
      default:
        return (
          <g transform="translate(-10, -10) scale(0.04)">
            <circle cx="256" cy="256" r="200" fill="currentColor" />
          </g>
        );
    }
  };

  const getNodeColor = (status: NetworkNode['status']) => {
    switch (status) {
      case 'healthy': return '#38a169';
      case 'warning': return '#d69e2e';
      case 'error': return '#e53e3e';
      default: return '#a0aec0';
    }
  };

  const getLinkColor = (status: NetworkLink['status']) => {
    switch (status) {
      case 'active': return '#38a169';
      case 'degraded': return '#d69e2e';
      case 'down': return '#e53e3e';
      default: return '#a0aec0';
    }
  };

  const getLinkWidth = (status: NetworkLink['status']) => {
    return status === 'down' ? 1 : 2;
  };

  const getLinkStrokeDasharray = (status: NetworkLink['status']) => {
    return status === 'down' ? '5,5' : status === 'degraded' ? '10,4' : 'none';
  };

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node === selectedNode ? null : node);
  };

  const handleLinkMouseEnter = (link: NetworkLink, event: React.MouseEvent) => {
    setHoveredLink(link);
    setTooltipPos({ x: event.clientX, y: event.clientY });
  };

  const handleLinkMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <div className="relative w-full h-full">
      <svg 
        ref={svgRef} 
        width={width} 
        height={height} 
        className={className}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Draw links */}
        {links.map((link) => {
          const sourcePos = nodePositions[link.source] || { x: 0, y: 0 };
          const targetPos = nodePositions[link.target] || { x: 0, y: 0 };
          
          return (
            <line 
              key={link.id}
              x1={sourcePos.x}
              y1={sourcePos.y}
              x2={targetPos.x}
              y2={targetPos.y}
              stroke={getLinkColor(link.status)}
              strokeWidth={hoveredLink === link ? getLinkWidth(link.status) + 1 : getLinkWidth(link.status)}
              strokeDasharray={getLinkStrokeDasharray(link.status)}
              className="network-link cursor-pointer"
              onMouseEnter={(e) => handleLinkMouseEnter(link, e)}
              onMouseLeave={handleLinkMouseLeave}
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map((node) => {
          const pos = nodePositions[node.id] || { x: 0, y: 0 };
          const isSelected = selectedNode?.id === node.id;
          
          return (
            <g 
              key={node.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              className="network-node cursor-pointer"
              onClick={() => handleNodeClick(node)}
            >
              {isSelected && (
                <circle
                  r="24"
                  fill="none"
                  stroke={getNodeColor(node.status)}
                  strokeWidth="2"
                  opacity="0.7"
                  className="animate-pulse"
                />
              )}
              <circle
                r="20"
                fill={isSelected ? 'white' : '#f7fafc'}
                stroke={getNodeColor(node.status)}
                strokeWidth={isSelected ? 3 : 2}
              />
              <g className={`text-${isSelected ? getNodeColor(node.status) : 'gray-700'}`}>
                {getNodeIcon(node.type)}
              </g>
              <text
                textAnchor="middle"
                y="35"
                className="text-xs font-medium fill-current text-gray-900"
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
      
      {hoveredLink && (
        <div
          className="chart-tooltip"
          style={{
            left: tooltipPos.x + 10,
            top: tooltipPos.y + 10,
          }}
        >
          <div className="font-semibold mb-1">Conexão</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <span>Status:</span>
            <span>
              {hoveredLink.status === 'active' ? 'Ativa' : 
               hoveredLink.status === 'degraded' ? 'Degradada' : 'Desconectado'}
            </span>
            <span>Banda:</span>
            <span>{hoveredLink.bandwidth} Mbps</span>
            <span>Latência:</span>
            <span>{hoveredLink.latency} ms</span>
            <span>Perda de pacotes:</span>
            <span>{hoveredLink.packetLoss}%</span>
          </div>
        </div>
      )}
      
      {selectedNode && (
        <div className="absolute right-0 top-0 w-64 bg-white rounded-md shadow-lg border border-gray-200 p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{selectedNode.name}</h3>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-2">
            <StatusBadge status={selectedNode.status} />
          </div>
          
          <div className="mt-3 space-y-1.5">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Tipo: </span>
              <span>{selectedNode.type === 'server' ? 'Servidor' : 
                    selectedNode.type === 'router' ? 'Roteador' :
                    selectedNode.type === 'switch' ? 'Switch' :
                    selectedNode.type === 'client' ? 'Cliente' :
                    selectedNode.type === 'database' ? 'Banco de Dados' : selectedNode.type}
              </span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700">IP: </span>
              <span>{selectedNode.ipAddress}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700">Local: </span>
              <span>{selectedNode.location}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Métricas</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">CPU</span>
                  <span className="text-xs font-medium">{selectedNode.metrics.cpu}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-network-blue-600 h-1.5 rounded-full" style={{ width: `${selectedNode.metrics.cpu}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Memória</span>
                  <span className="text-xs font-medium">{selectedNode.metrics.memory}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-network-teal-600 h-1.5 rounded-full" style={{ width: `${selectedNode.metrics.memory}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Disco</span>
                  <span className="text-xs font-medium">{selectedNode.metrics.diskUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${selectedNode.metrics.diskUsage}%` }}></div>
                </div>
              </div>
              {selectedNode.metrics.temperature && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Temperatura</span>
                    <span className="text-xs font-medium">{selectedNode.metrics.temperature}°C</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${
                      selectedNode.metrics.temperature > 60 ? 'bg-network-alert-red' : 
                      selectedNode.metrics.temperature > 50 ? 'bg-network-alert-yellow' : 'bg-network-alert-green'
                    }`} style={{ width: `${(selectedNode.metrics.temperature / 100) * 100}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
            <button className="text-xs text-blue-600 hover:text-blue-800">Ver detalhes completos</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTopologyGraph;
