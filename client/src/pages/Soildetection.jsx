import React from "react";
import { useNavigate } from "react-router-dom";
import "./Warehouse.css"; 

function SoilDetection() {
  const navigate = useNavigate();

  const handleCall = () => window.location.href = "tel:+919876543210";
  const handleWhatsApp = () => window.open("https://wa.me/919876543210", "_blank");

  return (
    <div className="warehouse-page" style={{ background: "#f4f7f6" }}>
     
      <div className="warehouse-hero" style={{ padding: "80px 20px", background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)" }}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: "15px" }}>Zameen Ki Sehat, Behtar Paidavar</h1>
        <p style={{ fontSize: "1.2rem", opacity: "0.9", maxWidth: "800px", margin: "0 auto" }}>
          Get scientifically accurate soil reports and expert advice to increase your crop income.
        </p>
        <div style={{ marginTop: "30px", display: "flex", gap: "15px", justifyContent: "center" }}>
          <button className="btn-apply" style={{ padding: "14px 40px", fontSize: "1.1rem", borderRadius: "50px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }} 
                  onClick={() => navigate("/book-soil-test")}>
            Book Soil Test
          </button>
          <button className="btn-reset" style={{ padding: "14px 40px", borderRadius: "50px", background: "rgba(255,255,255,0.1)", border: "1px solid #fff", color: "#fff" }}
                  onClick={handleCall}>
            Free Advice
          </button>
        </div>
      </div>

      <div className="main-content" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        
        <div className="warehouse-grid" style={{ marginTop: "-50px", position: "relative", zIndex: "2" }}>
            {[
                { icon: "🧪", title: "10+ Parameters", desc: "N, P, K, pH & Micronutrients" },
                { icon: "⏱️", title: "Fast Results", desc: "Report within 3-5 days" },
                { icon: "📄", title: "Expert Advice", desc: "Fertilizer dosage charts" }
            ].map((stat, i) => (
                <div key={i} className="w-card" style={{ padding: "25px", textAlign: "center", borderRadius: "15px", border: "none", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{stat.icon}</div>
                    <h4 style={{ color: "#1b4332" }}>{stat.title}</h4>
                    <p style={{ color: "#666", fontSize: "0.9rem" }}>{stat.desc}</p>
                </div>
            ))}
        </div>

        
        <section style={{ margin: "80px 0" }}>
            <h2 style={{ textAlign: "center", color: "#1b4332", marginBottom: "40px" }}>How It Works</h2>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
                {[
                    { s: "01", t: "Sample Collection", d: "Technician visits your farm" },
                    { s: "02", t: "Lab Testing", d: "Analysis in certified lab" },
                    { s: "03", t: "Digital Report", d: "Health card on your phone" },
                    { s: "04", t: "Farmer Advice", d: "Personalized fertilizer tips" }
                ].map((step, i) => (
                    <div key={i} style={{ flex: "1", minWidth: "200px", position: "relative" }}>
                        <span style={{ fontSize: "3rem", fontWeight: "900", color: "#e9ecef", position: "absolute", top: "-20px", left: "0", zIndex: "1" }}>{step.s}</span>
                        <div style={{ position: "relative", zIndex: "2", paddingTop: "20px" }}>
                            <h4 style={{ color: "#2d6a4f", marginBottom: "10px" }}>{step.t}</h4>
                            <p style={{ fontSize: "0.9rem", color: "#666" }}>{step.d}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

       
        <div className="modal-inner-grid" style={{ background: "#fff", padding: "40px", borderRadius: "20px", border: "none", boxShadow: "0 5px 25px rgba(0,0,0,0.03)" }}>
            <div>
                <h3 style={{ color: "#1b4332", marginBottom: "20px" }}>🧪 Lab Parameters</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    {["Soil pH Value", "Nitrogen (N)", "Phosphorus (P)", "Potassium (K)", "Zinc & Boron", "Organic Carbon"].map(p => (
                        <div key={p} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#555" }}>
                            <span style={{ color: "#2d6a4f", fontWeight: "bold" }}>✓</span> {p}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ borderLeft: "1px solid #eee", paddingLeft: "40px" }}>
                <h3 style={{ color: "#1b4332", marginBottom: "20px" }}>🌾 Supported Crops</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {["Wheat", "Paddy", "Cotton", "Sugarcane", "Potato", "Fruits"].map(c => (
                        <span key={c} style={{ background: "#f0fdf4", color: "#166534", padding: "8px 16px", borderRadius: "50px", fontSize: "0.85rem", border: "1px solid #bbf7d0" }}>{c}</span>
                    ))}
                </div>
                <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#777" }}>Reports are customized as per the crop variety you choose.</p>
            </div>
        </div>


        <div style={{ margin: "60px 0", background: "linear-gradient(to right, #fff9db, #fff3bf)", padding: "30px", borderRadius: "15px", borderLeft: "5px solid #fab005" }}>
            <h4 style={{ color: "#856404", marginBottom: "15px" }}>⚠️ Important: Sample Collection</h4>
            <p style={{ fontSize: "0.95rem", color: "#947600", lineHeight: "1.6" }}>
                Sahi report ke liye mitti khet ke 8-10 alag jagaho se 'V' shape cut karke lein. 
                Sookhi mitti ko saaf thaili mein bharein aur mitti nali ya khet ke kone se na lein.
            </p>
        </div>
        

      
        <section style={{ marginBottom: "80px" }}>
            <h2 style={{ textAlign: "center", color: "#1b4332", marginBottom: "40px" }}>Testing Packages</h2>
            <div className="warehouse-grid">
                <div className="w-card" style={{ padding: "40px", borderRadius: "20px", border: "none", textAlign: "center" }}>
                    <h3 style={{ color: "#1b4332" }}>Standard Card</h3>
                    <div style={{ margin: "20px 0" }}>
                        <span style={{ fontSize: "2.5rem", fontWeight: "bold" }}>₹499</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: "0", color: "#666", marginBottom: "30px", lineHeight: "2" }}>
                        <li>✓ N, P, K Testing</li>
                        <li>✓ pH & EC Levels</li>
                        <li>✓ Organic Carbon</li>
                        <li style={{ textDecoration: "line-through", opacity: "0.5" }}>Micronutrients</li>
                    </ul>
                    <button className="btn-v full-width" style={{ borderRadius: "50px" }} onClick={() => navigate("/book-soil-test")}>Choose Standard</button>
                </div>

                <div className="w-card" style={{ padding: "40px", borderRadius: "20px", background: "#1b4332", color: "#fff", border: "none", textAlign: "center", transform: "scale(1.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                    <h3 style={{ color: "#fff" }}>Advanced Card</h3>
                    <div style={{ margin: "20px 0" }}>
                        <span style={{ fontSize: "2.5rem", fontWeight: "bold" }}>₹899</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: "0", color: "#a7c4bc", marginBottom: "30px", lineHeight: "2" }}>
                        <li>✓ Everything in Standard</li>
                        <li>✓ Zinc, Boron, Sulfur, Iron</li>
                        <li>✓ Personalized Dose Chart</li>
                        <li>✓ Expert Call Support</li>
                    </ul>
                    <button className="btn-v full-width" style={{ borderRadius: "50px", background: "#fff", color: "#1b4332" }} onClick={() => navigate("/book-soil-test")}>Choose Advanced</button>
                </div>
            </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: "30px", marginBottom: "50px" }}>
            <h2 style={{ color: "#1b4332", marginBottom: "15px" }}>Abhi Book Karein, Behtar Kal Ke Liye</h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>Our team is ready to help you optimize your farm soil.</p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn-r" style={{ background: "#25D366", padding: "12px 30px" }} onClick={handleWhatsApp}>WhatsApp Now</button>
                <button className="btn-v" style={{ padding: "12px 30px" }} onClick={handleCall}>Call Soil Expert</button>
            </div>
        </div>

      </div>
    </div>
  );
}

export default SoilDetection;