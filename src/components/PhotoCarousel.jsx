import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./components.css";

const SWIPE_THRESHOLD = 55;

function normalizePhoto(photo, index) {
  if (typeof photo === "string") {
    return {
      src: photo,
      alt: `Gallery image ${index + 1}`,
      caption: "",
    };
  }

  return {
    src: photo.src,
    alt: photo.alt || `Gallery image ${index + 1}`,
    caption: photo.caption || "",
  };
}

export default function PhotoCarousel({
  photos = [],
  ariaLabel = "Photo gallery",
}) {
  const normalizedPhotos = useMemo(
    () => photos.map((photo, index) => normalizePhoto(photo, index)),
    [photos]
  );

  const photoCount = normalizedPhotos.length;

  /*
   * displayIndex refers to the rendered slide track.
   *
   * Rendered slides:
   * [last clone] [photo 1] [photo 2] ... [last photo] [first clone]
   *
   * Therefore:
   * displayIndex 1 = real photo 1
   */
  const [displayIndex, setDisplayIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef(null);
  const touchCurrentX = useRef(null);

  const renderedPhotos = useMemo(() => {
    if (photoCount <= 1) {
      return normalizedPhotos;
    }

    return [
      normalizedPhotos[photoCount - 1],
      ...normalizedPhotos,
      normalizedPhotos[0],
    ];
  }, [normalizedPhotos, photoCount]);

  const activeIndex =
    photoCount <= 1
      ? 0
      : (displayIndex - 1 + photoCount) % photoCount;

  const activePhoto = normalizedPhotos[activeIndex];

  useEffect(() => {
    if (photoCount <= 1) {
      setDisplayIndex(0);
      return;
    }

    setTransitionEnabled(false);
    setDisplayIndex(1);
    setDragOffset(0);

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [photoCount]);

  if (!photoCount) {
    return (
      <section className="mel-card mel-carousel mel-carousel--empty">
        No photos have been added.
      </section>
    );
  }

  const next = () => {
    if (photoCount <= 1 || isDragging) {
      return;
    }

    setTransitionEnabled(true);
    setDragOffset(0);
    setDisplayIndex((current) => current + 1);
  };

  const previous = () => {
    if (photoCount <= 1 || isDragging) {
      return;
    }

    setTransitionEnabled(true);
    setDragOffset(0);
    setDisplayIndex((current) => current - 1);
  };

  const goTo = (photoIndex) => {
    if (
      photoCount <= 1 ||
      isDragging ||
      photoIndex === activeIndex
    ) {
      return;
    }

    setTransitionEnabled(true);
    setDragOffset(0);
    setDisplayIndex(photoIndex + 1);
  };

  const handleTransitionEnd = () => {
    if (photoCount <= 1) {
      return;
    }

    /*
     * We reached the cloned first image after moving forward.
     * Instantly reset to the real first image without animation.
     */
    if (displayIndex === photoCount + 1) {
      setTransitionEnabled(false);
      setDisplayIndex(1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });

      return;
    }

    /*
     * We reached the cloned last image after moving backward.
     * Instantly reset to the real last image without animation.
     */
    if (displayIndex === 0) {
      setTransitionEnabled(false);
      setDisplayIndex(photoCount);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  };

  const handleTouchStart = (event) => {
    if (photoCount <= 1) {
      return;
    }

    const startX = event.touches[0].clientX;

    touchStartX.current = startX;
    touchCurrentX.current = startX;

    setIsDragging(true);
    setTransitionEnabled(false);
    setDragOffset(0);
  };

  const handleTouchMove = (event) => {
    if (
      !isDragging ||
      touchStartX.current === null
    ) {
      return;
    }

    const currentX = event.touches[0].clientX;
    const distance = currentX - touchStartX.current;

    touchCurrentX.current = currentX;
    setDragOffset(distance);
  };

  const finishSwipe = () => {
    if (
      !isDragging ||
      touchStartX.current === null ||
      touchCurrentX.current === null
    ) {
      return;
    }

    const distance =
      touchCurrentX.current - touchStartX.current;

    setIsDragging(false);
    setTransitionEnabled(true);
    setDragOffset(0);

    if (Math.abs(distance) < SWIPE_THRESHOLD) {
      touchStartX.current = null;
      touchCurrentX.current = null;
      return;
    }

    if (distance < 0) {
      setDisplayIndex((current) => current + 1);
    } else {
      setDisplayIndex((current) => current - 1);
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  const cancelSwipe = () => {
    setIsDragging(false);
    setTransitionEnabled(true);
    setDragOffset(0);

    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  const trackStyle = {
    transform: `translate3d(
      calc(-${displayIndex * 100}% + ${dragOffset}px),
      0,
      0
    )`,
    transition: transitionEnabled
      ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none",
  };

  return (
    <section
      className="mel-card mel-carousel"
      aria-label={ariaLabel}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
      tabIndex={0}
    >
      <div
        className={`mel-carousel-stage ${
          isDragging ? "is-dragging" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={finishSwipe}
        onTouchCancel={cancelSwipe}
      >
        <div
          className="mel-carousel-track"
          style={trackStyle}
          onTransitionEnd={handleTransitionEnd}
        >
          {renderedPhotos.map((photo, index) => (
            <div
              className="mel-carousel-slide"
              key={`${photo.src}-${index}`}
              aria-hidden={
                photoCount > 1 && index !== displayIndex
                  ? "true"
                  : undefined
              }
            >
              <img
                className="mel-carousel-image"
                src={photo.src}
                alt={photo.alt}
                loading={
                  index === displayIndex ? "eager" : "lazy"
                }
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {photoCount > 1 && (
          <>
            <button
              type="button"
              className="mel-carousel-arrow mel-carousel-arrow--left"
              onClick={previous}
              aria-label="Previous photo"
            >
              <span
                className="mel-carousel-chevron"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="mel-carousel-arrow mel-carousel-arrow--right"
              onClick={next}
              aria-label="Next photo"
            >
              <span
                className="mel-carousel-chevron"
                aria-hidden="true"
              />
            </button>
          </>
        )}

        <div
          className="mel-carousel-counter"
          aria-live="polite"
        >
          {activeIndex + 1} / {photoCount}
        </div>
      </div>

      {activePhoto?.caption && (
        <p className="mel-carousel-caption">
          {activePhoto.caption}
        </p>
      )}

      {photoCount > 1 && (
        <div
          className="mel-carousel-dots"
          aria-label="Choose a photo"
        >
          {normalizedPhotos.map((photo, index) => (
            <button
              type="button"
              key={`${photo.src}-${index}`}
              className={`mel-carousel-dot ${
                index === activeIndex ? "is-active" : ""
              }`}
              onClick={() => goTo(index)}
              aria-label={`View photo ${index + 1}`}
              aria-current={
                index === activeIndex ? "true" : undefined
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

PhotoCarousel.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        caption: PropTypes.string,
      }),
    ])
  ),
  ariaLabel: PropTypes.string,
};