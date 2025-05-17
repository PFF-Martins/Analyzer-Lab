
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'error' | 'unknown' | 'active' | 'degraded' | 'down';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getBadgeVariant = () => {
    switch (status) {
      case 'healthy':
      case 'active':
        return 'bg-network-alert-green text-white hover:bg-network-alert-green/80';
      case 'warning':
      case 'degraded':
        return 'bg-network-alert-yellow text-white hover:bg-network-alert-yellow/80';
      case 'error':
      case 'down':
        return 'bg-network-alert-red text-white hover:bg-network-alert-red/80';
      case 'unknown':
      default:
        return 'bg-gray-500 text-white hover:bg-gray-500/80';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'healthy':
        return 'Saudável';
      case 'warning':
        return 'Atenção';
      case 'error':
        return 'Erro';
      case 'unknown':
        return 'Desconhecido';
      case 'active':
        return 'Ativo';
      case 'degraded':
        return 'Degradado';
      case 'down':
        return 'Inoperante';
      default:
        return status;
    }
  };

  return (
    <Badge className={cn('font-medium', getBadgeVariant(), className)}>
      {getLabel()}
    </Badge>
  );
};

export default StatusBadge;
