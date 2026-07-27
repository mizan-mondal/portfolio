import { useRef, useEffect, useState } from 'react';

interface AchievementCardProps {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  index: number;
}

export function AchievementCard({ title, description, imageUrl, ctaText, index }: AchievementCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`sw-card ${isVisible ? 'sw-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <a href="#" className="sw-card__link">
        <div className="sw-card__image-wrap">
          <div className="sw-card__image-inner">
            <img
              src={imageUrl}
              alt={title}
              className="sw-card__image"
            />
          </div>
        </div>
        <div className="sw-card__info">
          <div className="sw-card__info-left">
            <h3 className="sw-card__title">{title}</h3>
            <p className="sw-card__desc">{description}</p>
          </div>
          <div className="sw-card__info-right">
            <span className="sw-card__cta">
              {ctaText}
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.47 8.65V6.55L8.33 3.75V4.9L5.47 2.1V0L9.32 3.84V4.82L5.47 8.65ZM0 5.11V3.54H8.61V5.11H0Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
