import React from 'react';

interface CircularBackgroundPatternProps {
  className?: string;
  opacity?: number;
}

export const CircularBackgroundPattern: React.FC<CircularBackgroundPatternProps> = ({ 
  className = '', 
  opacity = 0.08 
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
        style={{ opacity }}
      >
        <defs>
          {/* Основной паттерн из пересекающихся пунктирных кругов */}
          <pattern 
            id="dotted-circles-pattern" 
            patternUnits="userSpaceOnUse"
            width="200" 
            height="200"
          >
            {/* Большой центральный круг */}
            <circle 
              cx="100" 
              cy="100" 
              r="80"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="2"
              strokeDasharray="6 12"
              strokeLinecap="round"
            />
            
            {/* Пересекающиеся круги - верхний левый */}
            <circle 
              cx="50" 
              cy="50" 
              r="60"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1.5"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
            
            {/* Пересекающиеся круги - верхний правый */}
            <circle 
              cx="150" 
              cy="50" 
              r="60"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1.5"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
            
            {/* Пересекающиеся круги - нижний левый */}
            <circle 
              cx="50" 
              cy="150" 
              r="60"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1.5"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
            
            {/* Пересекающиеся круги - нижний правый */}
            <circle 
              cx="150" 
              cy="150" 
              r="60"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1.5"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
            
            {/* Дополнительные малые круги для сложности */}
            <circle 
              cx="100" 
              cy="50" 
              r="25"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1.2"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
            
            <circle 
              cx="100" 
              cy="150" 
              r="25"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1.2"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
            
            <circle 
              cx="50" 
              cy="100" 
              r="25"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1.2"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
            
            <circle 
              cx="150" 
              cy="100" 
              r="25"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1.2"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
          </pattern>
          
          {/* Дополнительный сдвинутый паттерн для глубины */}
          <pattern 
            id="dotted-circles-offset" 
            patternUnits="userSpaceOnUse"
            width="200" 
            height="200"
            patternTransform="translate(100, 100)"
          >
            {/* Сдвинутые круги */}
            <circle 
              cx="100" 
              cy="100" 
              r="70"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="1"
              strokeDasharray="5 10"
              strokeLinecap="round"
            />
            
            <circle 
              cx="50" 
              cy="50" 
              r="40"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="0.8"
              strokeDasharray="2 5"
              strokeLinecap="round"
            />
            
            <circle 
              cx="150" 
              cy="150" 
              r="40"
              fill="none" 
              stroke="#f87000" 
              strokeWidth="0.8"
              strokeDasharray="2 5"
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        
        {/* Основной слой паттерна */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#dotted-circles-pattern)"
        />
        
        {/* Дополнительный слой для создания глубины */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#dotted-circles-offset)"
          style={{ opacity: 0.6 }}
        />
      </svg>
    </div>
  );
};