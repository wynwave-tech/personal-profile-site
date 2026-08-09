import { useId, useState } from "react";
import PropTypes from "prop-types";
import "./components.css";

export default function ExpandableSection({
  title,
  paragraphs = [],
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className={`mel-card mel-expandable ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="mel-expandable-trigger"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="mel-expandable-title">{title}</span>
        <span className="mel-expandable-action">
          {isOpen ? "Collapse" : "Click to expand"}
        </span>
        <span className="mel-expandable-icon" aria-hidden="true">
          +
        </span>
      </button>

      <div
        id={contentId}
        className="mel-expandable-content"
        hidden={!isOpen}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

ExpandableSection.propTypes = {
  title: PropTypes.string.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
  defaultOpen: PropTypes.bool,
};
