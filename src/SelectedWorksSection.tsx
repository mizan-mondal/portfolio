import './App.css';

interface CardData {
  title: string;
  description: string;
  imageUrl: string;
}

const projects: CardData[] = [
  {
    title: 'MyWorker AI',
    description: 'AI platform simplifying hiring, management, and workforce scaling.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  },
  {
    title: 'Oblique Strategies',
    description: 'An experimental experience exploring non-linear navigation patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'Neuromorphic Engine',
    description: 'A data visualization system inspired by neural networks and organic structures.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
  },
];

interface Props {
  translateYVal: number;
  viewportHeight: number;
}

export function SelectedWorksSection({ translateYVal, viewportHeight }: Props) {
  // This section occupies a tall vertical space to create scroll distance.
  // The inner viewport is pinned to the screen using a counter-offset,
  // and cards translate horizontally as the user scrolls vertically.
  const sectionHeight = viewportHeight * 5;
  const parentPadding = 32; // 2rem padding of the white panel

  // Pin offset: counteract the panel's upward movement to keep the viewport fixed on screen
  const panelProgress = translateYVal - viewportHeight - parentPadding;
  const maxPin = sectionHeight - viewportHeight;
  const pinOffset = Math.max(0, Math.min(maxPin, panelProgress));

  // Progress through horizontal scrolling (0 → 1)
  const progress = maxPin > 0 ? Math.max(0, Math.min(1, panelProgress / maxPin)) : 0;

  // Horizontal layout — card widths in vw
  const titleCardWidth = 42;
  const projectCardWidth = 52;
  const gap = 3;
  // Total track width: title + gap + (project + gap) * n
  const totalWidth = titleCardWidth + gap + projects.length * (projectCardWidth + gap);
  const maxTranslateX = Math.max(0, totalWidth - 100); // subtract one viewport
  const translateX = -progress * maxTranslateX;

  // Diagonal entry: cards to the right of center have a Y offset (below),
  // which smoothly resolves to 0 as they approach center
  const totalCards = 1 + projects.length;
  const getCardStyle = (cardIndex: number): React.CSSProperties => {
    const cardArrival = cardIndex / totalCards;
    const remaining = cardArrival - progress;

    let yOffset: number;
    if (remaining > 0) {
      yOffset = Math.min(100, remaining * 300);
    } else {
      yOffset = 0;
    }

    // Scale: slightly smaller when far, full size near center
    const dist = Math.abs(progress - cardArrival);
    const cardScale = 1 - Math.min(0.06, dist * 0.12);

    // Opacity: dimmer when far from center
    const cardOpacity = Math.max(0.25, 1 - Math.max(0, dist - 0.2) * 2.5);

    return {
      transform: `translateY(${yOffset}px) scale(${cardScale})`,
      opacity: cardOpacity,
    };
  };

  return (
    <div className="hsw-section" style={{ height: `${sectionHeight}px` }}>
      <div
        className="hsw-viewport"
        style={{
          top: `${pinOffset}px`,
          height: `${viewportHeight}px`,
        }}
      >
        <div
          className="hsw-track"
          style={{ transform: `translateX(${translateX}vw)` }}
        >
          {/* Title Card */}
          <div
            className="hsw-card hsw-card--title"
            style={{ width: `${titleCardWidth}vw`, ...getCardStyle(0) }}
          >
            <h2 className="sw-heading">
              Selected work<br />
              <span className="sw-heading-italic">&amp; explorations</span>
            </h2>
            <a href="#" className="sw-view-all">
              <span>VIEW ALL PROJECTS</span>
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.47 8.65V6.55L8.33 3.75V4.9L5.47 2.1V0L9.32 3.84V4.82L5.47 8.65ZM0 5.11V3.54H8.61V5.11H0Z" fill="currentColor" />
              </svg>
            </a>
          </div>

          {/* Project Cards */}
          {projects.map((project, i) => (
            <div
              key={i}
              className="hsw-card hsw-card--project"
              style={{ width: `${projectCardWidth}vw`, ...getCardStyle(i + 1) }}
            >
              <a href="#" className="hsw-card__link">
                <div className="hsw-card__image-wrap">
                  <img src={project.imageUrl} alt={project.title} className="hsw-card__image" />
                </div>
                <div className="hsw-card__info">
                  <div className="hsw-card__info-left">
                    <h3 className="hsw-card__title">{project.title}</h3>
                    <p className="hsw-card__desc">{project.description}</p>
                  </div>
                  <span className="hsw-card__cta">
                    EXPLORE PROJECT
                    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.47 8.65V6.55L8.33 3.75V4.9L5.47 2.1V0L9.32 3.84V4.82L5.47 8.65ZM0 5.11V3.54H8.61V5.11H0Z" fill="currentColor" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
