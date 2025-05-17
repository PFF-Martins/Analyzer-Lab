
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: 'up' | 'down' | 'stable';
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = '%',
  icon,
  className,
  trend,
  subtitle
}) => {
  const getProgressColor = () => {
    if (value < 60) return 'bg-network-alert-green';
    if (value < 80) return 'bg-network-alert-yellow';
    return 'bg-network-alert-red';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend === 'up') {
      return <svg className="w-4 h-4 text-network-alert-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
    } else if (trend === 'down') {
      return <svg className="w-4 h-4 text-network-alert-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;
    } else {
      return <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}{unit}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        <Progress 
          value={value} 
          max={100} 
          className={cn("h-1 mt-2", getProgressColor())}
        />
      </CardContent>
      {trend && (
        <CardFooter className="pt-0">
          <div className="flex items-center text-xs">
            {getTrendIcon()}
            <span className="ml-1">
              {trend === 'up' ? 'Aumentando' : trend === 'down' ? 'Diminuindo' : 'Estável'}
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default MetricCard;
