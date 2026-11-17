import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Ticker = () => {
  const { data } = usePortfolioData();
  const tickerItems = data.tickerItems || [
    { text: 'Curiosity', icon: '✦' },
    { text: 'Code with care', icon: '⚡' },
    { text: 'Learn every day', icon: '★' },
    { text: 'Make it useful', icon: '⌘' },
  ];
  const separator = data.tickerSeparator || '✳';
  const repeated = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  const renderIcon = (icon) => {
    if (!icon) return null;
    const isImage = typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:image'));
    if (isImage) {
      return <img src={icon} alt="" className="ticker-logo-img" />;
    }
    return <span className="ticker-item-icon">{icon}</span>;
  };

  return (
    <div className="ticker" aria-label="Portfolio values marquee">
      <div className="ticker-marquee">
        {repeated.map((rawItem, index) => {
          const item = typeof rawItem === 'string' ? { text: rawItem, icon: '✦' } : rawItem;
          return (
            <span key={index} className="ticker-item">
              {renderIcon(item.icon)}
              <span className="ticker-item-text">{item.text}</span>
              <b className="ticker-separator">{separator}</b>
            </span>
          );
        })}
      </div>
    </div>
  );
};
