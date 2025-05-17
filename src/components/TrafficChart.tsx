
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrafficData } from '@/lib/types';

interface TrafficChartProps {
  data: TrafficData[];
  className?: string;
}

const TrafficChart: React.FC<TrafficChartProps> = ({ data, className }) => {
  // Format data for better display
  const formattedData = data.map(item => {
    const timestamp = new Date(item.timestamp);
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    
    return {
      ...item,
      time: `${hours}:${minutes}`,
      inbound: Math.round(item.inbound),
      outbound: Math.round(item.outbound),
      errors: item.errors,
      dropped: item.dropped
    };
  });

  // Customize tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{`Horário: ${label}`}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-blue-600">{`Entrada: ${payload[0].value} Mbps`}</p>
            <p className="text-sm text-green-600">{`Saída: ${payload[1].value} Mbps`}</p>
            {payload[2]?.value !== undefined && (
              <p className="text-sm text-red-600">{`Erros: ${payload[2].value}`}</p>
            )}
            {payload[3]?.value !== undefined && (
              <p className="text-sm text-orange-500">{`Descartados: ${payload[3].value}`}</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            stroke="#718096" 
            tick={{ fill: '#718096', fontSize: 12 }}
          />
          <YAxis 
            stroke="#718096" 
            tick={{ fill: '#718096', fontSize: 12 }}
            allowDecimals={false}
            unit=" Mbps"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => {
              const color = value === 'inbound' ? 'text-blue-600' : 
                           value === 'outbound' ? 'text-green-600' : 
                           value === 'errors' ? 'text-red-600' : 'text-orange-500';
              const label = value === 'inbound' ? 'Entrada' : 
                           value === 'outbound' ? 'Saída' : 
                           value === 'errors' ? 'Erros' : 'Descartados';
              return <span className={color}>{label}</span>;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="inbound" 
            name="inbound"
            stroke="#3182ce" 
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="outbound" 
            name="outbound"
            stroke="#38a169" 
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
          {formattedData[0]?.errors !== undefined && (
            <Line 
              type="monotone" 
              dataKey="errors" 
              name="errors"
              stroke="#e53e3e" 
              strokeWidth={2}
              strokeDasharray="5 5"
              activeDot={{ r: 4 }}
              dot={{ r: 2 }}
            />
          )}
          {formattedData[0]?.dropped !== undefined && (
            <Line 
              type="monotone" 
              dataKey="dropped" 
              name="dropped"
              stroke="#dd6b20" 
              strokeWidth={2}
              strokeDasharray="5 5"
              activeDot={{ r: 4 }}
              dot={{ r: 2 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficChart;
