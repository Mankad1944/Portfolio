import React, { useEffect, useRef, useState } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Journey = () => {
  const { data } = usePortfolioData();
  const experience = data.experience || [];
  const journeyMeta = data.journeyMeta || {
    roadAhead: {
      label: 'PRESENT & FUTURE',
      title: 'The Road Ahead ↗',
      desc: 'Exploring agentic AI systems, scalable cloud microservices, and next-gen web interfaces.',
    },
    startPoint: {
      period: '2019 · BEGINNING',
      role: 'Day One / The Genesis',
      company: 'Where the journey began',
      desc: 'Wrote first line of code, built first interactive web tools, and ignited a lifelong passion for software craftsmanship.',
      tags: ['First Code', 'Curiosity', 'Foundations', 'Web'],
    },
  };

  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const windowRef = useRef(null);
  const trackRef = useRef(null);
  const trackLineRef = useRef(null);
  const progressLineRef = useRef(null);

  const [sectionHeight, setSectionHeight] = useState('360vh');
  const [maxTravelDistance, setMaxTravelDistance] = useState(0);

  useEffect(() => {
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    const sizeJourney = () => {
      if (!sectionRef.current || !pinRef.current || !trackRef.current || !windowRef.current) return;

      // Position horizon line precisely between first dot ("The Road Ahead") and last dot ("2019 · Beginning")
      const allStations = trackRef.current.querySelectorAll('.journey-milestone-station');
      if (allStations.length >= 2 && trackLineRef.current) {
        const firstStation = allStations[0];
        const lastStation = allStations[allStations.length - 1];
        const firstDot = firstStation.querySelector('.timeline-horizon-node');
        const lastDot = lastStation.querySelector('.timeline-horizon-node');

        const lineStart = firstStation.offsetLeft + (firstDot ? firstDot.offsetLeft : 36);
        const lineEnd = lastStation.offsetLeft + (lastDot ? lastDot.offsetLeft : 36);

        trackLineRef.current.style.left = `${lineStart}px`;
        trackLineRef.current.style.width = `${Math.max(0, lineEnd - lineStart)}px`;
      }

      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = windowRef.current.clientWidth;
      // Generous travel distance so scroll is expansive and luxurious
      const maxTravel = Math.max(0, trackWidth - windowWidth + 120);
      const pinHeight = pinRef.current.getBoundingClientRect().height || window.innerHeight;

      // Increased scroll runway
      const travelDistance = Math.ceil(maxTravel * 1.5 + window.innerHeight * 0.85);
      setSectionHeight(`${Math.ceil(pinHeight + travelDistance)}px`);
      setMaxTravelDistance(maxTravel);

      updateJourney(maxTravel, travelDistance);
    };

    const updateJourney = (maxTravelVal, distanceVal) => {
      if (!sectionRef.current || !trackRef.current || !windowRef.current) return;

      const maxTravel = maxTravelVal !== undefined ? maxTravelVal : maxTravelDistance;
      const distance = distanceVal || Math.max(1, parseInt(sectionHeight, 10) - window.innerHeight);

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const pinTop = 76; // Pin sticky offset matching nav
      const scrolled = pinTop - sectionRect.top;
      const rawProgress = clamp(scrolled / Math.max(distance, 1), 0, 1);

      // Translate track horizontally based on vertical scroll
      const currentTranslate = maxTravel * rawProgress;
      trackRef.current.style.transform = `translate3d(${-currentTranslate}px, 0, 0)`;

      // Scale central timeline progress bar (stops exactly at the terminal point)
      if (progressLineRef.current) {
        progressLineRef.current.style.transform = `scaleX(${rawProgress})`;
      }

      // Check card reveals with text-fill effect
      const windowWidth = windowRef.current.clientWidth;
      const stations = trackRef.current.querySelectorAll('.journey-milestone-station');

      stations.forEach((station) => {
        const card = station.querySelector('.experience-card');
        const stationLeft = station.offsetLeft - currentTranslate;
        const stationRight = stationLeft + station.offsetWidth;
        const isVisible = stationRight > 0 && stationLeft < windowWidth * 0.88;

        if (scrolled > -80 && isVisible) {
          if (card) card.classList.add('is-revealed');
          station.classList.add('is-active');
        } else if (scrolled <= -150) {
          if (card) card.classList.remove('is-revealed');
          station.classList.remove('is-active');
        }
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateJourney();
          ticking = false;
        });
      }
    };

    sizeJourney();
    const timer1 = setTimeout(sizeJourney, 60);
    const timer2 = setTimeout(sizeJourney, 300);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', sizeJourney, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', sizeJourney);
    };
  }, [experience, maxTravelDistance, sectionHeight]);

  const manualScroll = (dir) => {
    if (!sectionRef.current) return;
    const currentScroll = window.scrollY;
    const scrollStep = window.innerHeight * 0.55;
    window.scrollTo({
      top: dir === 'next' ? currentScroll + scrollStep : currentScroll - scrollStep,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="journey-pinned-section"
      id="experience"
      ref={sectionRef}
      style={{ '--journey-section-height': sectionHeight }}
    >
      <div className="journey-pin-box" ref={pinRef}>
        <div className="wrap journey-inner">
          {/* Zoomed out sleek heading */}
          <div className="section-head journey-zoomed-head">
            <div>
              <div className="eyebrow">Experience · 03</div>
              <h2 className="zoomed-out-heading">
                My journey <span className="serif accent">so far.</span>
              </h2>
            </div>
            <p className="journey-head-sub">
              Scroll vertically to glide through the timeline. Starting from the future horizon, descending through career milestones to where it all began.
            </p>
          </div>

          {/* Central Timeline Window (No scrollbar!) */}
          <div className="journey-alternating-window" ref={windowRef}>
            {/* Alternating Track starting from the middle of the page */}
            <div className="journey-alternating-track start-middle-track" ref={trackRef}>
              {/* Central Timeline Horizon Line bounded strictly between first and last point */}
              <div className="journey-track-bounded-line" ref={trackLineRef}>
                <span className="journey-horizon-progress" ref={progressLineRef} />
              </div>

              {/* STATION 0: THE ROAD AHEAD (Present & Future) - BROUGHT TO FRONT / FIRST */}
              <div className="journey-milestone-station station-top station-road-ahead" data-index="road-ahead">
                <div className="timeline-horizon-node" title="Present & Future">
                  <span className="horizon-node-dot active-beacon-dot" />
                  <span className="horizon-node-pulse" />
                </div>
                <div className="timeline-connector-stem stem-down" />
                <article className="experience-card rectangular-card card-top road-ahead-card">
                  <div className="experience-card-inner">
                    <div className="experience-header-row">
                      <span className="experience-date">{journeyMeta.roadAhead?.label || 'PRESENT & FUTURE'}</span>
                      <span className="experience-badge highlight-badge">✦ The Horizon</span>
                    </div>
                    <div className="experience-content">
                      <div className="road-ahead-title-row">
                        <span className="beacon-ring-mini" />
                        <h3>{journeyMeta.roadAhead?.title || 'The Road Ahead ↗'}</h3>
                      </div>
                      <p>{journeyMeta.roadAhead?.desc || 'Exploring agentic AI systems, scalable cloud microservices, and next-gen web interfaces.'}</p>
                    </div>
                  </div>
                </article>
              </div>

              {/* EXPERIENCE STATIONS IN DESCENDING ORDER */}
              {experience.map((item, index) => {
                // Alternating: index 0 (2023) is bottom, index 1 (2021) is top, index 2 (2019) is bottom, index 3 is top
                const isTop = index % 2 !== 0;
                return (
                  <div
                    key={index}
                    className={`journey-milestone-station ${isTop ? 'station-top' : 'station-bottom'}`}
                    data-index={index}
                  >
                    {/* Anchor Node Dot Resting EXACTLY on the Horizon Timeline */}
                    <div className="timeline-horizon-node" title={item.period}>
                      <span className="horizon-node-dot" />
                      <span className="horizon-node-pulse" />
                    </div>

                    {/* Vertical Connector Stem bridging the card to the timeline dot */}
                    <div className={`timeline-connector-stem ${isTop ? 'stem-down' : 'stem-up'}`} />

                    {/* Sleek Horizontal Rectangular Card */}
                    <article className={`experience-card rectangular-card ${isTop ? 'card-top' : 'card-bottom'}`}>
                      <div className="experience-card-inner">
                        <div className="experience-header-row">
                          <span className="experience-date">{item.period}</span>
                          <span className="experience-badge">{isTop ? '↑ Chapter' : '↓ Chapter'}</span>
                        </div>
                        <div className="experience-content">
                          <h3>{item.role}</h3>
                          <h4>{item.company}</h4>
                          <p>{item.desc}</p>
                          <div className="tag-row">
                            {item.tags &&
                              item.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="tag">
                                  {tag}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}

              {/* LAST STATION: THE START POINT / WHERE IT ALL BEGAN - TERMINAL POINT */}
              {(() => {
                const isTop = (experience.length % 2) !== 0;
                return (
                  <div
                    className={`journey-milestone-station station-start-point ${isTop ? 'station-top' : 'station-bottom'}`}
                    data-index="start-point"
                  >
                    <div className="timeline-horizon-node" title="Start Point · 2019 Beginning">
                      <span className="horizon-node-dot terminal-node-dot" />
                      <span className="horizon-node-pulse" />
                    </div>
                    <div className={`timeline-connector-stem ${isTop ? 'stem-down' : 'stem-up'}`} />
                    <article className={`experience-card rectangular-card start-point-card ${isTop ? 'card-top' : 'card-bottom'}`}>
                      <div className="experience-card-inner">
                        <div className="experience-header-row">
                          <span className="experience-date">{journeyMeta.startPoint?.period || '2019 · BEGINNING'}</span>
                          <span className="experience-badge start-badge">◉ The Beginning</span>
                        </div>
                        <div className="experience-content">
                          <h3>{journeyMeta.startPoint?.role || 'Day One / The Genesis'}</h3>
                          <h4>{journeyMeta.startPoint?.company || 'Where the journey began'}</h4>
                          <p>{journeyMeta.startPoint?.desc || 'Wrote first line of code, built first interactive web tools, and ignited a lifelong passion for software craftsmanship.'}</p>
                          <div className="tag-row">
                            {(journeyMeta.startPoint?.tags || ['First Code', 'Curiosity', 'Foundations']).map((tag, tIdx) => (
                              <span key={tIdx} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Journey Controls & Scroll Indicator */}
          <div className="journey-bottom-bar">
            <div className="journey-hint-pill">
              <span className="journey-hint-arrow">↓</span>
              <span>SCROLL VERTICALLY · DESCENDING TIMELINE · ENDS AT ORIGIN</span>
            </div>

            <div className="journey-nav-buttons">
              <button
                type="button"
                className="journey-nav-btn"
                onClick={() => manualScroll('prev')}
                aria-label="Previous milestone"
                title="Scroll back"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                className="journey-nav-btn"
                onClick={() => manualScroll('next')}
                aria-label="Next milestone"
                title="Scroll forward"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
