// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Payafterharvest() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { itemType, itemId, itemName, rentPrice } = location.state;

//   const [form, setForm] = useState({ name: "", phone: "", harvestDate: "" });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/pay-after-harvest", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, itemType, itemId }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert("Request submitted! You can pay after harvest.");
//         navigate("/machinery");
//       } else alert("Failed to submit request");
//     } catch (err) {
//       alert("Error submitting request");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="pay-after-page">
//       <h2>💰 Pay After Harvest</h2>
//       <p>Item: {itemName} | Rent: ₹{rentPrice}/day</p>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Your Name" required onChange={handleChange} />
//         <input name="phone" placeholder="Your Mobile Number" required onChange={handleChange} />
//         <input type="date" name="harvestDate" required onChange={handleChange} />
//         <button type="submit">Submit Request</button>
//       </form>
//     </div>
//   );
// }

// export default Payafterharvest;