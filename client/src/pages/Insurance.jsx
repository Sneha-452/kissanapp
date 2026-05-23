import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import "./Insurance.css";

const insurancePlans = [
  {
    name: "PMFBY - Pradhan Mantri Fasal Bima Yojana",
    coverage: "Crop loss due to natural disasters",
    premium: "2% of sum insured",
  },
  {
    name: "Livestock Insurance Scheme",
    coverage: "Coverage for cattle, sheep, and goats",
    premium: "Varies by animal type",
  },
  {
    name: "Private Crop Insurance",
    coverage: "Customizable crop protection",
    premium: "Varies by farm area and crop",
  },
];

function Insurance() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    crop: "",
    area: "",
    plan: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, crop, area, plan } = form;

    if (!name || !email || !phone || !crop || !area || !plan) {
      return handleError("All fields are required");
    }

    try {
      setLoading(true);

      const response = await fetch("https://kissanapp.onrender.com/api/insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message);
        setForm({ name: "", email: "", phone: "", crop: "", area: "", plan: "" });
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
    <div className="insurance-page">
      <header className="banner">
        <h1>🌾 Crop & Livestock Insurance</h1>
        <p>
          Protect your farm against losses due to natural disasters or unforeseen events.
          Explore government and private insurance options and apply easily.
        </p>
      </header>

      <section className="plans-section">
        <h2>Available Insurance Plans</h2>
        <div className="plans-container">
          {insurancePlans.map((plan, idx) => (
            <div className="plan-card" key={idx}>
              <h3>{plan.name}</h3>
              <p><strong>Coverage:</strong> {plan.coverage}</p>
              <p><strong>Premium:</strong> {plan.premium}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="apply-section">
        <h2>Apply for Insurance</h2>
        <form onSubmit={handleSubmit} className="apply-form">
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
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="crop"
            placeholder="Crop / Livestock"
            value={form.crop}
            onChange={handleChange}
          />
          <input
            type="text"
            name="area"
            placeholder="Farm Area (in acres)"
            value={form.area}
            onChange={handleChange}
          />
          <select name="plan" value={form.plan} onChange={handleChange}>
            <option value="">Select Insurance Plan</option>
            {insurancePlans.map((plan, idx) => (
              <option key={idx} value={plan.name}>{plan.name}</option>
            ))}
          </select>
          <button type="submit">{loading ? "Submitting..." : "Submit Application"}</button>
        </form>
      </section>

      <section className="tips-section">
        <h2>Tips & FAQs</h2>
        <ul>
          <li>Check eligibility criteria for government schemes.</li>
          <li>Ensure your crop/livestock details are accurate.</li>
          <li>Keep premium payments up-to-date to claim insurance.</li>
        </ul>
      </section>
    </div>
  );
}

export default Insurance;
