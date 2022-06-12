import React, { Component } from "react";
import SkillItem from "./SkillItem";

export default class Skills extends Component {
  state = {
    skillData: null
  };
  
  componentDidMount() {
    this.getSkillData()
    .then(res => this.setState({ skillData: res }))
    .catch(err => console.log(err));
  }

  getSkillData = async () => {
    const response = await fetch('/api/skills');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div className="py-4">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="md:mx-4">
              <h3 className="text-2xl text-gray-800 font-bold mb-4">Skills</h3>
            </div>
          </div>
          {this.state.skillData?.map((skill, id) => (
            <SkillItem skill={skill} key={id} />
          ))}
        </div>
      </div>
    );
  }
}
