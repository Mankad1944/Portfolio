import React, { useEffect, useRef, useState } from 'react';

export const AnimatedCounter = ({ value, duration = 1800 }) => {
  const [currentNum, setCurrentNum] = useState('0');
  const [suffixVal, setSuffixVal] = useState('');
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Parse value like "03+", "08", "04+"
    const match = String(value).match(/^(0*)(\d+)(.*)$/);
    if (!match) {
      setCurrentNum(String(value));
      setSuffixVal('');
      return;
    }
    const leadingZeros = match[1]; // e.g. "0"
    const targetNum = parseInt(match[2], 10);
    const suffix = match[3] || '';
    setSuffixVal(suffix);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * targetNum);
            setCurrentNum(`${leadingZeros}${current}`);
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="kpi-counter-container">
      <span className="kpi-plus-symbol">{currentNum}{suffixVal}</span>
    </span>
  );
};
