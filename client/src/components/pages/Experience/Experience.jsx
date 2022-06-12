import React, {Component } from "react";
import ExperienceItem from "./ExperienceItem";

export default class Experience extends Component {
  state = {
    experienceData: null
  };

  componentDidMount() {
    this.getExperienceData()
    .then(res => this.setState({ experienceData: res }))
    .catch(err => console.log(err));
  }

  getExperienceData = async () => {
    const response = await fetch('/api/experiences');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <section className="pb-4">
        <div className="flex flex-wrap md:px-4">
          {this.state.experienceData?.map((experience, id) => (
            <ExperienceItem experience={experience} key={id} />
          ))}
        </div>
      </section>
    );
  }
}