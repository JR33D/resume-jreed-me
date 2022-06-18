import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromName: '',
      fromEmail: '',
      subject: '',
      message: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var obj = {
      [name]: value
    };
    this.setState(obj);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.buildMessageObject())
    };

    const response = await fetch('/api/contact', requestOptions);
    const data = await response.json();
    if(data.message) {
      toast("We are sorry there was an error sending your message.")
    } else {
      toast(data.status)
    }
  }

  buildMessageObject() {
    return {
      fromName: this.state.fromName,
      fromEmail: this.state.fromEmail,
      subject: this.state.subject,
      message: this.state.message
    };
  }

  render() {
    return (
      <section className="pb-10">
        <div className="flex flex-wrap md:px-4">
          <form className="p-8 md:mx-4 bg-white rounded-md shadow-md" onSubmit={this.handleSubmit}>
            <div className="m-3">
              <h3 className="text-2xl text-gray-800 font-bold mb-6">
                Get in Touch
              </h3>
            </div>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/2">
                <div className="m-3">
                  <input
                    type="text"
                    name="fromName"
                    placeholder="Your Name"
                    required
                    value={this.state.fromName}
                    onChange={this.handleInputChange}
                    className="w-full border border-gray-100 rounded py-4 px-6 text-sm bg-white"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="m-3">
                  <input
                    type="email"
                    name="fromEmail"
                    placeholder="Your Email"
                    required
                    value={this.state.fromEmail}
                    onChange={this.handleInputChange}
                    className="w-full border border-gray-100 rounded py-4 px-6 text-sm bg-white"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="m-3">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    value={this.state.subject}
                    onChange={this.handleInputChange}
                    className="w-full border border-gray-100 rounded py-4 px-6 text-sm bg-white"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="m-3">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    rows="6"
                    className="w-full border border-gray-100 rounded py-4 px-6 text-sm bg-white"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="m-3 text-right">
                  <input
                    type="submit"
                    value="Send Message"
                    className="rounded bg-purple-600 text-center border-0 py-3 px-6 text-white leading-7 tracking-wide hover:bg-purple-800 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <ToastContainer />
          </form>
        </div>
      </section>
    );
  }
}