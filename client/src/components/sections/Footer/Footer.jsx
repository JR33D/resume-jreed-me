import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 absolute bottom-0 left-0 w-full">
      <div className="container px-4">
        <p className="text-sm text-gray-400 text-center">
          © { new Date().getFullYear() } All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
