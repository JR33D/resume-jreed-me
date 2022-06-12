import React, { Component } from "react";
import Skills from "./Skills/Skills";

export default class About extends Component {
  render() {
    return (
      <section className="py-8">
        <div className="flex flex-wrap md:px-4">
          <div className="w-full">
            <div className="md:mx-4">
              <h3 className="text-2xl text-gray-800 font-bold mb-4">Who am I?</h3>
              <p className="text-sm text-gray-400 leading-6 mb-3">
                I am know as a passionate professional with multiple broad technical skill sets. Known for ability to complete
                multiple roles on a team, to help meet or define requirement and quality standards as needed. From my time consulting
                to working for private companies I have taken parts in all sides of software development from requirements gathering
                directly from the client to working on a multi-role team of developers, testers, product owners and designers.
              </p>
            </div>
            <Skills />
          </div>
        </div>
      </section>
    );
  };
}