# Personal Profile Site

A customizable single-page personal profile website built with React and Vite.

The project provides a simple way to create a visually focused personal page featuring a profile photo, automatically calculated age, customizable badges, expandable content sections, and a photo carousel.

It can be adapted for personal profiles, introductions, portfolio-style pages, creator pages, biography pages, or other projects centered around an individual.

## Preview

![Personal Profile Site Preview](screenshots/personal-profile-preview.png)

## Features

- Circular main profile photo
- First and last name display
- Automatic age calculation from a birth date
- Customizable profile badges
- Multiple badge color variants
- Expandable content sections
- Unlimited customizable sections
- Photo carousel
- Flexible number of carousel photos
- Responsive single-page layout
- Simple file-based customization
- Built with reusable React components

## Tech Stack

- React
- Vite
- JavaScript
- CSS

## Project Structure

```text
project/
├── public/
│   └── photos/
│       ├── main_photo.png
│       └── pc/
│           ├── photo1.png
│           ├── photo2.png
│           ├── photo3.png
│           └── ...
│
├── src/
│   ├── components/
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Getting Started

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd <project-folder>
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## Customizing the Profile

Most of the profile content can be configured from `src/App.jsx`.

### Profile Information

The main profile information is defined in the `profile` object:

```jsx
const profile = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "06/15/1995",
  photo: "/photos/main_photo.png",
};
```

The birth date should use the format:

```text
MM/DD/YYYY
```

The application calculates the person's current age automatically, so the displayed age updates over time without needing to be manually changed.

## Main Profile Photo

Place the main profile image at:

```text
public/photos/main_photo.png
```

The profile header displays this image in a circular format.

A square image works best. For example:

```text
1080 × 1080
```

The image can be replaced without changing the component as long as the filename and path remain the same.

## Profile Badges

Badges are configured using the `badges` array in `App.jsx`.

Example:

```jsx
const badges = [
  {
    label: "Outgoing",
    variant: "default",
  },
  {
    label: "Creative",
    variant: "purple",
  },
  {
    label: "Strong-Willed",
    variant: "red",
  },
];
```

Each badge contains:

- `label` — the text displayed inside the badge
- `variant` — the visual style applied to the badge

Available badge variants include:

```text
default
red
purple
```

Additional badges can be added by adding more objects to the array.

## Expandable Sections

Content sections are configured through the `sections` array.

Example:

```jsx
const sections = [
  {
    title: "About",
    defaultOpen: false,
    paragraphs: [
      "First paragraph goes here.",
      "Another paragraph can go here.",
    ],
  },
  {
    title: "Background",
    defaultOpen: false,
    paragraphs: [
      "Background information goes here.",
    ],
  },
];
```

Each section supports:

- A custom title
- An open or closed default state
- Multiple paragraphs

There is no fixed number of sections. Additional sections can be created by adding more objects to the array.

Likewise, each section can contain as many paragraphs as needed.

## Photo Carousel

Carousel images are stored in:

```text
public/photos/pc/
```

Images use sequential filenames:

```text
photo1.png
photo2.png
photo3.png
photo4.png
photo5.png
...
```

The number of photos displayed is controlled by `PHOTO_COUNT` in `App.jsx`.

For example:

```jsx
const PHOTO_COUNT = 5;
```

The application generates the image paths automatically:

```jsx
const photos = Array.from({ length: PHOTO_COUNT }, (_, index) => ({
  src: `/photos/pc/photo${index + 1}.png`,
  alt: `${profile.firstName} photo ${index + 1}`,
}));
```

To add more photos:

1. Add the images to `public/photos/pc/`.
2. Continue the sequential naming pattern.
3. Increase `PHOTO_COUNT`.

For example, for eight photos:

```text
photo1.png
photo2.png
photo3.png
photo4.png
photo5.png
photo6.png
photo7.png
photo8.png
```

Then change:

```jsx
const PHOTO_COUNT = 8;
```

The carousel will automatically include all eight images.

### Recommended Carousel Image Size

The layout is designed to work well with portrait-oriented images.

Recommended size:

```text
1080 × 1920
```

Using images with a consistent aspect ratio provides the best visual result.

## Components

The interface is separated into reusable React components, including:

- `ProfileHeader` — displays the profile image, name, age, and badges
- `ExpandableSection` — displays collapsible content sections
- `PhotoCarousel` — handles the profile photo gallery

This keeps the profile data separate from most of the presentation logic and makes the site easier to customize.

## Building for Production

Create a production build with:

```bash
npm run build
```

Vite will generate the production-ready files, which can then be deployed to a compatible static web host or web server.

## Customization

The project is intentionally simple and can be extended with additional features such as:

- Social media links
- Contact information
- Additional badge styles
- Custom themes
- Biography sections
- Skills or interests
- External links
- Additional profile components
- Different carousel behavior

The existing components can also be modified or replaced without changing the basic profile data structure.

## License

This project is provided as an example personal profile website. Add the license of your choice before redistributing or publishing the project for broader use.