import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "./PersonalAdvisory.css"; 

function PersonalAdvisory() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    crop: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, crop, message } = form;

    if (!name || !email || !crop || !message) {
      return handleError("All fields are required");
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/advisory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message);
        setForm({
          name: "",
          email: "",
          crop: "",
          message: "",
        });
      } else {
        handleError(result.message);
      }

    } catch (err) {
      handleError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advisory-page">
      <div className="advisory-container">

        <h1>🌱 Personal Advisory</h1>

        <form className="advisory-form" onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="crop"
            placeholder="Crop Type (e.g. Wheat)"
            value={form.crop}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Describe your problem..."
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit">
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        <div className="advisory-tips">
          <p><b>💡 Example Questions:</b></p>
          <ul>
            <li>How to improve wheat yield?</li>
            <li>Which fertilizer should I use?</li>
            <li>Best irrigation method for rice?</li>
          </ul>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default PersonalAdvisory;