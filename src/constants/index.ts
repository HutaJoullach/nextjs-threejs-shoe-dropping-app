import {
  typescript,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  docker,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "project",
    title: "Project",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "React Frontend Developer",
    icon: typescript,
  },
  {
    title: "Backend Developer",
    icon: typescript,
  },
  {
    title: "React Native Developer",
    icon: typescript,
  },
  {
    title: "Content Creator",
    icon: typescript,
  },
];

const technologies = [
  {
    name: "React.js",
    icon: reactjs,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Redux",
    icon: redux,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "",
    icon: typescript,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: ["", "", "", ""],
  },
  {
    title: "React Native Developer",
    company_name: "",
    icon: typescript,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: ["", "", "", ""],
  },
  {
    title: "Web Developer",
    company_name: "",
    icon: typescript,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: ["", "", "", ""],
  },
  {
    title: "Full stack Developer",
    company_name: "",
    icon: typescript,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: ["", "", "", ""],
  },
];

const testimonials = [
  {
    testimonial: "",
    name: "",
    designation: "",
    company: "",
    image: "",
  },
  {
    testimonial: "",
    name: "",
    designation: "",
    company: "",
    image: "",
  },
  {
    testimonial: "",
    name: "",
    designation: "",
    company: "",
    image: "",
  },
];

const projects = [
  {
    name: "",
    description: "",
    tags: [
      {
        name: "react",
        color: "",
      },
      {
        name: "mongodb",
        color: "",
      },
      {
        name: "tailwind",
        color: "",
      },
    ],
    image: typescript,
    source_code_link: "https://github.com/",
  },
  {
    name: "",
    description: "",
    tags: [
      {
        name: "react",
        color: "",
      },
      {
        name: "restapi",
        color: "",
      },
      {
        name: "scss",
        color: "",
      },
    ],
    image: typescript,
    source_code_link: "https://github.com/",
  },
  {
    name: "",
    description: "",
    tags: [
      {
        name: "nextjs",
        color: "",
      },
      {
        name: "supabase",
        color: "",
      },
      {
        name: "css",
        color: "",
      },
    ],
    image: typescript,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
