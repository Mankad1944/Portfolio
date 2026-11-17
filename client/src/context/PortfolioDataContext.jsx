import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_DATA as initialData } from '../data/portfolioData';

const PortfolioDataContext = createContext();

export const PortfolioDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-custom-content');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialData,
          ...parsed,
          journeyMeta: {
            ...initialData.journeyMeta,
            ...(parsed.journeyMeta || {}),
          },
          tickerSeparator: parsed.tickerSeparator || initialData.tickerSeparator || '✳',
        };
      }
    } catch (e) {
      console.warn('Failed to load saved content from localStorage', e);
    }
    return initialData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync with backend on initial mount if available
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const res = await fetch('/api/portfolio/custom/data');
        if (res.ok) {
          const resData = await res.json();
          if (resData.hasCustom && resData.data) {
            const merged = {
              ...initialData,
              ...resData.data,
              journeyMeta: {
                ...initialData.journeyMeta,
                ...(resData.data.journeyMeta || {}),
              },
              tickerSeparator: resData.data.tickerSeparator || initialData.tickerSeparator || '✳',
            };
            setData(merged);
            try {
              localStorage.setItem('portfolio-custom-content', JSON.stringify(merged));
            } catch (_) {}
          }
        }
      } catch {
        // Backend not reachable, local state will be used seamlessly
      }
    };
    fetchBackendData();
  }, []);

  const updateData = async (newData) => {
    setData(newData);
    try {
      localStorage.setItem('portfolio-custom-content', JSON.stringify(newData));
    } catch (e) {
      console.warn('Failed saving to localStorage', e);
    }

    // Attempt to persist to backend API
    try {
      await fetch('/api/portfolio/custom/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: newData }),
      });
    } catch (_) {}
  };

  const resetData = async () => {
    setData(initialData);
    try {
      localStorage.removeItem('portfolio-custom-content');
    } catch (_) {}

    try {
      await fetch('/api/portfolio/custom/reset', { method: 'POST' });
    } catch (_) {}
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        data,
        updateData,
        resetData,
        isAdminOpen,
        setIsAdminOpen,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => useContext(PortfolioDataContext);
