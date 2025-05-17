
import React from 'react';
import { AlertData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AlertItemProps {
  alert: AlertData;
  className?: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, className }) => {
  const getAlertIcon = () => {
    switch (alert.level) {
      case 'critical':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-network-alert-red/20 flex items-center justify-center text-network-alert-red">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-network-alert-yellow/20 flex items-center justify-center text-network-alert-yellow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getAlertBorderClass = () => {
    switch (alert.level) {
      case 'critical':
        return 'border-l-4 border-network-alert-red';
      case 'warning':
        return 'border-l-4 border-network-alert-yellow';
      case 'info':
        return 'border-l-4 border-blue-500';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      'bg-white rounded-md shadow p-4 flex gap-4',
      getAlertBorderClass(),
      alert.acknowledged ? 'opacity-60' : '',
      className
    )}>
      {getAlertIcon()}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{alert.title}</h3>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true, locale: ptBR })}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
            Origem: {alert.source}
          </span>
          {alert.acknowledged ? (
            <span className="text-xs text-gray-500">Reconhecido</span>
          ) : (
            <button className="text-xs text-blue-600 hover:text-blue-800">
              Reconhecer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
