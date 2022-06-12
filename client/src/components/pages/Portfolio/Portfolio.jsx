import React, { Component } from "react";
import PortfolioItem from "./PortfolioItem";

export default class Portfolio extends Component {
  state = { portfolioData: null };

  componentDidMount() {
    this.getPortfolioData()
    .then(res => this.setState({ portfolioData: res }))
    .catch(err => console.log(err));
  }

  getPortfolioData = async () => {
    const response = await fetch('/api/projects');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <section className="pb-10">
        <div className="flex flex-wrap md:px-4">
          {this.state.portfolioData?.map((portfolio, id) => (
            <PortfolioItem portfolio={portfolio} key={id} />
          ))}
        </div>
      </section>
    );
  }
}
