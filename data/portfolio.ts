// Media is centralized here. Photography and the About portrait are supplied by the user.
// Film URLs stream from the supplied Cloudinary library.
import filmData from "./films.json";

export const profile = {
  name: "Ajmal Aboobaker",
  email: "ajmalaboobaker22@gmail.com",
  phone: "+971 50 860 8475",
  whatsapp: "https://wa.me/971508608475",
  instagram:
    "https://www.instagram.com/ajmal_aboobaker_?stkn=eHI5c2hha2NsMHg0&utm_source=qr",
};
export type Category =
  | "Portraits"
  | "Events"
  | "Commercial"
  | "Sports"
  | "Lifestyle"
  | "Travel"
  | "Automotive"
  | "Documentary";
export type Project = {
  id: string;
  title: string;
  category: Category;
  type: "photo";
  thumbnail: string;
  media: string;
  orientation: "portrait" | "landscape" | "wide";
  aspectRatio: number;
  year: string;
  location: string;
  featured: boolean;
  alt: string;
  placeholder: boolean;
};
const photo = (
  id: string,
  title: string,
  category: Category,
  file: string,
  orientation: Project["orientation"],
  aspectRatio: number,
  alt: string,
  featured = true,
): Project => ({
  id,
  title,
  category,
  type: "photo",
  thumbnail: `/images/portfolio/${file}`,
  media: `/images/portfolio/${file}`,
  orientation,
  aspectRatio,
  year: "",
  location: "",
  featured,
  alt,
  placeholder: false,
});
// Descriptive captions, not invented commission names or client credits.
export const projects: Project[] = [
  photo(
    "portrait-collection",
    "Portrait collection",
    "Portraits",
    "ajmal-06.png",
    "wide",
    1.964329643296433,
    "Portfolio collage of a seated studio portrait and speakers at formal events",
    true,
  ),
  photo(
    "portrait-01",
    "Portrait study 01",
    "Portraits",
    "ajmal-01.webp",
    "portrait",
    0.8002343292325718,
    "Black-and-white portrait of a woman in a sequined dress seated beside a table",
    true,
  ),
  photo(
    "portrait-02",
    "Portrait study 02",
    "Portraits",
    "ajmal-02.webp",
    "portrait",
    0.8002343292325718,
    "Black-and-white portrait of a woman resting her face against her hand",
    true,
  ),
  photo(
    "fashion-runway",
    "On the runway",
    "Commercial",
    "ajmal-08.png",
    "wide",
    1.964329643296433,
    "Fashion photography collage showing models presenting clothing on a runway",
    true,
  ),
  photo(
    "exhibition",
    "Art in frame",
    "Events",
    "ajmal-07.png",
    "wide",
    1.964329643296433,
    "Exhibition photography collage of peacock artworks displayed in a gallery",
    true,
  ),
  photo(
    "portrait-03",
    "Portrait study 03",
    "Portraits",
    "ajmal-03.webp",
    "portrait",
    0.8002343292325718,
    "Black-and-white portrait of a woman wearing pearl earrings and a sequined dress",
    true,
  ),
  photo(
    "portrait-04",
    "Portrait study 04",
    "Portraits",
    "ajmal-04.webp",
    "portrait",
    0.8002343292325718,
    "Black-and-white studio portrait of a woman with her hands resting on her shoulder",
    false,
  ),
  photo(
    "portrait-05",
    "Portrait study 05",
    "Portraits",
    "ajmal-05.webp",
    "portrait",
    0.8002343292325718,
    "Black-and-white close-up portrait of a woman with her eyes closed",
    false,
  ),
  photo(
    "little-moments",
    "Little moments",
    "Lifestyle",
    "ajmal-09.png",
    "wide",
    1.964329643296433,
    "Family photography collage featuring a baby beside balloons and a smiling toddler",
    false,
  ),
];
export const categories = [
  "All",
  "Portraits",
  "Events",
  "Commercial",
  "Sports",
  "Lifestyle",
  "Travel",
] as const;
export const media = {
  hero: "/videos/accenture-hero-from-3s.mp4",
  heroPoster: "/images/films/accenture-hero-from-3s.jpg",
  showreel:
    "https://res.cloudinary.com/e7r13ecz/video/upload/v1791274069/MARRIOTT_EMEA_CONFERENCE_DAY_1_1.mp4",
  showreelTitle: "Marriott EMEA Conference — Day 1",
  showreelPoster: "/images/films/marriott-emea.jpg",
  about: "/images/about/ajmal-aboobaker.png",
};
export type Film = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  year: string;
  location: string;
  featured: boolean;
  placeholder: boolean;
};
export const films: Film[] = filmData;
export const services = [
  "Photography",
  "Videography",
  "Video Editing",
  "Photo Editing",
  "Sports Photography",
  "Sports Video Editing",
  "Sports Photo Editing",
  "Commercial Content",
  "Event Coverage",
];
export const serviceOptions = [
  "Photography",
  "Videography",
  "Photography + Videography",
  "Video Editing",
  "Photo Editing",
  "Sports Photography",
  "Sports Video Editing",
  "Sports Photo Editing",
  "Sports Content",
  "Commercial Project",
  "Other",
];
export const experience = [
  {
    years: "06",
    place: "Abu Dhabi, UAE",
    company: "Bigframe Film Photography Company",
    description:
      "Photography, videography, photo and video editing, and sports content.",
  },
  {
    years: "02",
    place: "Kerala, India",
    company: "Alpha Studio",
    description: "Building a foundation in photography and videography.",
  },
  {
    years: "03",
    place: "Kerala, India",
    company: "Independent practice",
    description:
      "Freelance photography, videography, editing and client projects.",
  },
];
