import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";

const ContactUs = () => {
  const toast = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    reason: "DEVELOPER SUPPORT",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.current.show({
        severity: "success",
        summary: "Submittion Successful",
        detail: "We will get in touch with you soon"
    });
    setFormData({
        email: "",
        name: "",
        reason: "DEVELOPER SUPPORT",
        comments: "",
      })
  };

  return (
    <div className="h-full bg-gray-50 py-8">
        <Toast ref={toast} />
      <div className="w-full mx-auto p-4">
        <div className="text-center mb-8">
          <p className="text-gray-600 max-w-5xl text-xl mx-auto">
            At <strong>Coding world</strong> we value your feedback and
            inquiries. Whether you’re interested in learning more about our
            services, need technical support, or want to discuss a potential
            partnership, we’re here to assist you. Our team is dedicated to
            providing you with the best possible experience.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-between items-start space-y-4 md:space-y-0">
          <div className="w-full md:w-[40%] p-4">
            <div className="mb-4">
              <img
                src="https://testlifecycle.com/_app/immutable/assets/contactp.CNi6onic.png"
                alt=""
                className="h-40 object-contain"
              />
              <p className="text-3xl ml-5 mt-5 font-bold text-gray-800 mb-2">
                Get in Touch
              </p>
              <p className="text-md ml-5 text-gray-800">
                For the fastest response, please fill out our online form. This
                allows us to direct your inquiry to the appropriate team member
                who can best assist you.
              </p>
            </div>
            <div className="space-y-6 ml-5">
              <div className="p-6 bg-white rounded-lg border-2 border-blue-800 shadow">
                <h2 className="font-bold text-lg mb-2">Developer Support</h2>
                <p className="text-gray-600">
                  Need assistance with APIs, integrations, or coding solutions?
                  Submit your query here, and our team will assist you promptly.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow border-2 border-blue-800">
                <h2 className="font-bold text-lg mb-2">Partnership Requests</h2>
                <p className="text-gray-600">
                  Interested in collaborating with us on new tools or projects?
                  Send us a partnership proposal today.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow border-2 border-blue-800">
                <h2 className="font-bold text-lg mb-2">General Inquiries</h2>
                <p className="text-gray-600">
                  For all other questions or feedback, reach out to us here.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[40%] p-4" style={{ marginTop: "15rem" }}>
            <div className="p-6 bg-white rounded-lg shadow border-2 border-blue-800">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">
                    Reason for Contact
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                  >
                    <option>DEVELOPER SUPPORT</option>
                    <option>PARTNERSHIP REQUESTS</option>
                    <option>GENERAL INQUIRIES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Comments</label>
                  <textarea
                    name="comments"
                    rows="4"
                    value={formData.comments}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            We look forward to hearing from you and are committed to providing
            quick responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
