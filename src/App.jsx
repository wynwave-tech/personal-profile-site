import "./App.css";

import {
  ProfileHeader,
  ExpandableSection,
  PhotoCarousel,
} from "./components";

// ==========================================================
// HELPERS
// ==========================================================

function calculateAge(birthDate) {
  const [month, day, year] = birthDate.split("/").map(Number);

  if (!month || !day || !year) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - year;

  const birthdayHasPassed =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!birthdayHasPassed) {
    age -= 1;
  }

  return age;
}

// ==========================================================
// PROFILE INFORMATION
// Birth date format: MM/DD/YYYY
// ==========================================================

const profile = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "06/15/1995",
  photo: "/photos/main_photo.png",
};

const profileAge = calculateAge(profile.birthDate);

// Available badge variants:
// default, red, purple, green, gold, muted

const badges = [
  {
    label: "Outgoing",
    variant: "default",
  },
  {
    label: "Social",
    variant: "default",
  },
  {
    label: "Independent",
    variant: "purple",
  },
  {
    label: "Creative",
    variant: "purple",
  },
  {
    label: "Adventurous",
    variant: "default",
  },
  {
    label: "Strong-Willed",
    variant: "red",
  },
  {
    label: "Reserved",
    variant: "purple",
  },
  {
    label: "Thoughtful",
    variant: "default",
  },
  {
    label: "Spontaneous",
    variant: "gold",
  },
  {
    label: "Unique Personality",
    variant: "green",
  },
];

// ==========================================================
// EXPANDABLE SECTIONS
// Add or remove as many sections and paragraphs as needed.
// ==========================================================

const sections = [
  {
    title: "About",
    defaultOpen: false,
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    title: "Background",
    defaultOpen: false,
    paragraphs: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
  {
    title: "Personal Notes",
    defaultOpen: false,
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    ],
  },
];

// ==========================================================
// PHOTO CAROUSEL
// Files:
// public/photos/pc/photo1.png
// public/photos/pc/photo2.png
// etc.
// ==========================================================

const PHOTO_COUNT = 5;

const photos = Array.from({ length: PHOTO_COUNT }, (_, index) => ({
  src: `/photos/pc/photo${index + 1}.png`,
  alt: `${profile.firstName} photo ${index + 1}`,
}));

function App() {
  return (
    <div className="app">
      <main className="profile-page">
        <ProfileHeader
          firstName={profile.firstName}
          lastName={profile.lastName}
          age={profileAge}
          photo={profile.photo}
          photoAlt={`${profile.firstName} ${profile.lastName}`}
          badges={badges}
        />

        <div className="profile-sections">
          {sections.map((section) => (
            <ExpandableSection
              key={section.title}
              title={section.title}
              paragraphs={section.paragraphs}
              defaultOpen={section.defaultOpen}
            />
          ))}
        </div>

        <PhotoCarousel
          photos={photos}
          ariaLabel={`${profile.firstName} ${profile.lastName} photo gallery`}
        />
      </main>
    </div>
  );
}

export default App;