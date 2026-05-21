import React, { useState, useEffect } from "react";
import "./Warehouse.css"; 

function PersonalAdvisory() {
  const [experts, setExperts] = useState([]);
  const [showDetails, setShowDetails] = useState(null); // Details popup ke liye
  const [showSlots, setShowSlots] = useState(null);     // Booking popup ke liye
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/experts")
      .then((res) => res.json())
      .then((data) => { if (data.success) setExperts(data.data); })
      .catch((err) => console.log("Error:", err));
  }, []);

  const filteredExperts = experts.filter(exp => 
    exp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    exp.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="warehouse-page">
      {/* --- HERO SECTION --- */}
      <div className="warehouse-hero">
        <h1>👨‍🔬 Expert Advisory</h1>
        <p>Verified specialists se sahi salah lein.</p>
        <div style={{ marginTop: "20px", width: "100%", maxWidth: "500px" }}>
            <input 
              type="text" 
              placeholder="Search Expert..." 
              style={{ width: "100%", padding: "12px 20px", borderRadius: "8px", border: "none" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="main-content">
        <div className="warehouse-grid">
          {filteredExperts.map((exp) => (
            <div className="w-card" key={exp._id}>
              <div style={{ position: "absolute", top: "10px", right: "10px", padding: "4px 8px", borderRadius: "5px", fontSize: "10px", fontWeight: "bold", background: exp.isOnline ? "#dcfce7" : "#f1f5f9", color: exp.isOnline ? "#166534" : "#475569" }}>
                {exp.isOnline ? "● ONLINE" : "○ OFFLINE"}
              </div>

              <img src={exp.imageUrl} alt={exp.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
              
              <div style={{ padding: "10px 0" }}>
                <h4>{exp.name}</h4>
                <p style={{ color: "#064e3b", fontWeight: "bold" }}>{exp.specialization}</p>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>Fees: ₹{exp.fees}</p>
              </div>

              <div className="w-btns">
                <button className="btn-v" onClick={() => setShowDetails(exp)}>Details</button>
                <button className="btn-r" style={{background: '#064e3b'}} onClick={() => setShowSlots(exp)}>Book Slot</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- POPUP 1: EXPERT DETAILS --- */}
      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'white', padding: '25px', borderRadius: '12px', maxWidth: '450px', width: '90%', position: 'relative' }}>
            <button onClick={() => setShowDetails(null)} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✖</button>
            <div style={{ textAlign: 'center' }}>
                <img src={showDetails.imageUrl} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #064e3b' }} />
                <h2 style={{ color: '#064e3b', marginTop: '10px' }}>{showDetails.name}</h2>
                <p><strong>{showDetails.specialization}</strong></p>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'left', background: '#f9fafb', padding: '15px', borderRadius: '10px' }}>
              <p>🎓 <strong>Education:</strong> {showDetails.education}</p>
              <p>💼 <strong>Experience:</strong> {showDetails.experience}</p>
              <p>💰 <strong>Fee:</strong> ₹{showDetails.fees}</p>
              <p>📞 <strong>Phone:</strong> {showDetails.phone}</p>
            </div>
            <button className="btn-submit" style={{ marginTop: '20px', width: '100%' }} onClick={() => { setShowDetails(null); setShowSlots(showDetails); }}>Book This Expert</button>
          </div>
        </div>
      )}

      {/* --- POPUP 2: SLOT BOOKING --- */}
      {showSlots && (
        <div className="modal-overlay" onClick={() => setShowSlots(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'white', padding: '25px', borderRadius: '12px', maxWidth: '400px', width: '90%', position: 'relative' }}>
            <button onClick={() => setShowSlots(null)} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✖</button>
            <h3 style={{ color: '#064e3b' }}>Available Slots</h3>
            <p>Select time for <strong>{showSlots.name}</strong></p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
              {showSlots.slots.map(slot => (
                <button key={slot} className="w-tag" style={{ position: 'static', cursor: 'pointer' }} onClick={() => alert("Slot Selected")}>{slot}</button>
              ))}
            </div>
            <button className="btn-submit" style={{ marginTop: '20px', width: '100%' }}>Proceed to Payment (₹{showSlots.fees})</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalAdvisory;
