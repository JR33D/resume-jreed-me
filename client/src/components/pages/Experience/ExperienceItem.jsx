import React, { Component } from "react";

export default class ExperienceItem extends Component {
  render() {
    const { title, company, description, startDate, endDate } = this.props.experience;
    return (
      <div className="w-full">
        <div className="my-4 md:mx-4 shadow p-6 rounded-md bg-white group hover:shadow-md">
          <div className="w-2/3 md:1/2 float-left text-left">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </div>
          <div className="w-1/3 md:1/2 float-right text-right">
            <h2 className="text-lg font-medium text-gray-800 mb-2">{company}</h2>
            <p className="text-gray-400">{startDate}-{endDate ?? "Present"}</p>
          </div>
          <div className="clear-both"></div>
        </div>
      </div>
    );
  };
}