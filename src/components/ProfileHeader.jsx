import PropTypes from "prop-types";
import "./components.css";

export default function ProfileHeader({
  firstName,
  lastName,
  age,
  photo,
  photoAlt,
  badges = [],
}) {
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  return (
    <section className="mel-card mel-profile-header">
      <div className="mel-profile-photo-wrap">
        <img
          className="mel-profile-photo"
          src={photo}
          alt={photoAlt || fullName || "Profile"}
        />
      </div>

      <div className="mel-profile-content">
        <div className="mel-profile-title-row">
          <h1 className="mel-profile-name">{fullName}</h1>

          {age !== undefined && age !== null && (
            <span className="mel-profile-age" aria-label={`Age ${age}`}>
              {age}
            </span>
          )}
        </div>
      </div>

      {badges.length > 0 && (
        <div className="mel-badge-list" aria-label="Profile badges">
          {badges.map((badge, index) => {
            const badgeData =
              typeof badge === "string"
                ? {
                    label: badge,
                    variant: "default",
                  }
                : badge;

            return (
              <span
                key={`${badgeData.label}-${index}`}
                className={`mel-badge mel-badge--${
                  badgeData.variant || "default"
                }`}
              >
                {badgeData.label}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}

ProfileHeader.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  photo: PropTypes.string.isRequired,
  photoAlt: PropTypes.string,
  badges: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        variant: PropTypes.oneOf([
          "default",
          "red",
          "purple",
          "green",
          "gold",
          "muted",
        ]),
      }),
    ])
  ),
};