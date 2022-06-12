import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import profile from "../../../images/profile.jpg";

const socials = [
  {
    id: 1,
    icon: <FaGithub />,
    link: "https://github.com/jr33d",
  },
  {
    id: 2,
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/in/jr33d/",
  },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 bg-white md:mx-8 lg:mx-4 mb-8 p-6 shadow-md rounded-md -mt-40">
      <div className="w-48 h-48 rounded-md overflow-hidden mx-auto mb-5">
        <img src={profile} alt="shafiqhammad" className="w-full" />
      </div>
      <div className="text-center">
        <h1 className="text-xl text-gray-800 font-bold mb-1">Jeremy Reed</h1>
        <p className="text-sm text-gray-400 mb-3">
          Father, Engineer, Gamer
        </p>
        <ul className="flex flex-wrap justify-center">
          {socials.map((social, id) => (
            <SocialIcon social={social} key={id} />
          ))}
        </ul>
        <a
          href="reed_resume.pdf"
          className="inline-block mb-3 rounded bg-purple-600 text-center border-0 py-2 px-6 text-white leading-7 tracking-wide hover:bg-purple-800"
          download="reed_resume"
        >
          Download Resume
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;

const SocialIcon = (props) => {
  const { icon, link } = props.social;
  return (
    <li className="m-2">
      <a
        href={link}
        className="w-8 h-8 bg-purple-100 rounded text-purple-800 flex items-center justify-center hover:text-white hover:bg-purple-600"
      >
        {icon}
      </a>
    </li>
  );
};
