import React, { useEffect, useState } from 'react';
import './Profile.css';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { handleSuccess, handleError } from '../utils';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────
   Sub-dashboards
───────────────────────────────────────── */
function FarmerDashboard({ user, stats, recentCrops }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card green"  onClick={() => navigate('/directsell')}>
          <span className="stat-icon">🌾</span>
          <span className="stat-number">{stats.cropCount}</span>
          <span className="stat-label">Crops Listed</span>
        </div>
        <div className="stat-card teal"   onClick={() => navigate('/soildetection')}>
          <span className="stat-icon">🧪</span>
          <span className="stat-label">Soil Detection</span>
        </div>
        <div className="stat-card blue"   onClick={() => navigate('/watermanagement')}>
          <span className="stat-icon">💧</span>
          <span className="stat-label">Water Mgmt</span>
        </div>
        <div className="stat-card orange" onClick={() => navigate('/insurance')}>
          <span className="stat-icon">🛡️</span>
          <span className="stat-label">Insurance</span>
        </div>
        <div className="stat-card purple" onClick={() => navigate('/seeds')}>
          <span className="stat-icon">🌱</span>
          <span className="stat-label">Seeds</span>
        </div>
        <div className="stat-card brown"  onClick={() => navigate('/personaladvisory')}>
          <span className="stat-icon">💡</span>
          <span className="stat-label">Advisory</span>
        </div>
      </div>

      {(user.mainCrops || user.farmArea || user.soilType || user.irrigationType) && (
        <div className="info-card">
          <h3>🌾 Farming Information</h3>
          <div className="info-grid">
            {user.mainCrops      && <InfoItem icon="🌱" label="Main Crops"     value={user.mainCrops} />}
            {user.farmArea       && <InfoItem icon="📏" label="Farm Area"      value={`${user.farmArea} Acres`} />}
            {user.soilType       && <InfoItem icon="🧪" label="Soil Type"      value={user.soilType} />}
            {user.irrigationType && <InfoItem icon="💧" label="Irrigation"     value={user.irrigationType} />}
          </div>
        </div>
      )}

      {recentCrops?.length > 0 && (
        <div className="info-card">
          <h3>🌾 My Crop Listings</h3>
          <div className="listing-list">
            {recentCrops.map(c => (
              <div className="listing-item" key={c._id}>
                <span className="listing-icon">🌾</span>
                <div>
                  <p className="listing-title">{c.cropName} &nbsp;•&nbsp; {c.qualityGrade}</p>
                  <p className="listing-sub">{c.quantity} kg &nbsp;•&nbsp; ₹{c.price}/kg &nbsp;•&nbsp; {c.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function ProviderDashboard({ stats, recentLands }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card blue"   onClick={() => navigate('/khetrent')}>
          <span className="stat-icon">🏡</span>
          <span className="stat-number">{stats.landCount}</span>
          <span className="stat-label">Lands Posted</span>
        </div>
        <div className="stat-card orange" onClick={() => navigate('/Machinery')}>
          <span className="stat-icon">🚜</span>
          <span className="stat-label">Machinery</span>
        </div>
        <div className="stat-card teal"   onClick={() => navigate('/warehouse')}>
          <span className="stat-icon">🏢</span>
          <span className="stat-label">Warehouse</span>
        </div>
        <div className="stat-card purple" onClick={() => navigate('/transportation')}>
          <span className="stat-icon">🚚</span>
          <span className="stat-label">Transportation</span>
        </div>
      </div>

      {recentLands?.length > 0 && (
        <div className="info-card">
          <h3>🏡 My Land Listings</h3>
          <div className="listing-list">
            {recentLands.map(l => (
              <div className="listing-item" key={l._id}>
                <span className="listing-icon">🏡</span>
                <div>
                  <p className="listing-title">{l.area} {l.areaUnit} land in {l.village}, {l.district}</p>
                  <p className="listing-sub">
                    ₹{l.rentAmount} {l.rentUnit}&nbsp;•&nbsp;
                    <span className={`status-badge ${l.status}`}>{l.status}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function BuyerDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card green"  onClick={() => navigate('/directsell')}>
          <span className="stat-icon">🛒</span>
          <span className="stat-label">Buy Crops</span>
        </div>
        <div className="stat-card blue"   onClick={() => navigate('/warehouse')}>
          <span className="stat-icon">📦</span>
          <span className="stat-label">Warehouse</span>
        </div>
        <div className="stat-card orange" onClick={() => navigate('/transportation')}>
          <span className="stat-icon">🚚</span>
          <span className="stat-label">Transportation</span>
        </div>
      </div>
      <div className="info-card empty-state">
        <p>🛒 Browse the marketplace and place your first order!</p>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Helper
───────────────────────────────────────── */
function InfoItem({ icon, label, value }) {
  return (
    <div className="info-item">
      <span className="info-icon">{icon}</span>
      <div><small>{label}</small><p>{value}</p></div>
    </div>
  );
}

const ROLE_META = {
  farmer:   { label: '👨‍🌾 Farmer',   color: '#1b4332' },
  provider: { label: '🏡 Provider',  color: '#1a3a5c' },
  buyer:    { label: '🛒 Buyer',     color: '#5c2d1a' },
};

/* ─────────────────────────────────────────
   EDIT FIELDS per role
───────────────────────────────────────── */
const FARMER_FIELDS = [
  { label: 'Phone',            key: 'phone',          placeholder: 'Phone number',       type: 'text'   },
  { label: 'Location',         key: 'location',       placeholder: 'Village / District', type: 'text'   },
  { label: 'Main Crops',       key: 'mainCrops',      placeholder: 'e.g. Wheat, Rice',   type: 'text'   },
  { label: 'Farm Area (acres)',key: 'farmArea',       placeholder: 'Total area',         type: 'number' },
  { label: 'Soil Type',        key: 'soilType',       placeholder: 'e.g. Loamy, Black',  type: 'text'   },
  { label: 'Irrigation Type',  key: 'irrigationType', placeholder: 'e.g. Drip, Canal',   type: 'text'   },
];
const PROVIDER_FIELDS = [
  { label: 'Phone',    key: 'phone',    placeholder: 'Phone number',       type: 'text' },
  { label: 'Location', key: 'location', placeholder: 'Village / District', type: 'text' },
];
const BUYER_FIELDS = [
  { label: 'Phone',    key: 'phone',    placeholder: 'Phone number',       type: 'text' },
  { label: 'Location', key: 'location', placeholder: 'City / District',   type: 'text' },
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading]         = useState(true);
  const [editMode, setEditMode]       = useState(false);
  const [form, setForm]               = useState({
    phone: '', location: '', mainCrops: '', farmArea: '', soilType: '', irrigationType: '',
  });

  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    try {
      const res  = await fetch('https://kissanapp.onrender.com/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setProfileData(data.data);
        const u = data.data.user;
        setForm({
          phone: u.phone || '', location: u.location || '',
          mainCrops: u.mainCrops || '', farmArea: u.farmArea || '',
          soilType: u.soilType || '', irrigationType: u.irrigationType || '',
        });
      } else {
        handleError(data.message || 'Failed to load profile');
      }
    } catch {
      handleError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleSave = async () => {
    try {
      const res  = await fetch('https://kissanapp.onrender.com/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        handleSuccess('Profile updated!');
        setEditMode(false);
        fetchProfile();
      } else {
        handleError(data.message || 'Update failed');
      }
    } catch {
      handleError('Update failed');
    }
  };

  if (loading)      return <div className="profile-loading">⏳ Loading Dashboard...</div>;
  if (!profileData) return <div className="profile-loading">❌ Failed to load profile.</div>;

  const { user, stats, recentLands, recentCrops } = profileData;
  const role     = user.role || 'farmer';
  const roleMeta = ROLE_META[role] || ROLE_META.farmer;
  const editFields = role === 'farmer' ? FARMER_FIELDS : role === 'provider' ? PROVIDER_FIELDS : BUYER_FIELDS;

  const PAGE_BG = {
    farmer:   'linear-gradient(145deg, #a8edbb 0%, #c8f5d5 25%, #e0faf0 55%, #b7f0ce 100%)',
    provider: 'linear-gradient(145deg, #a8edbb 0%, #c8f5d5 25%, #e0faf0 55%, #b7f0ce 100%)',
    buyer:    'linear-gradient(145deg, #a8edbb 0%, #c8f5d5 25%, #e0faf0 55%, #b7f0ce 100%)',
  };

  return (
    <div className="profile-page" style={{ background: PAGE_BG[role] }}>
    <div className="profile-container">

      {/* ── Header Card ── */}
      <div className="profile-header-card" style={{ background: `linear-gradient(135deg, ${roleMeta.color}, #40916c)` }}>
        <div className="profile-header-left">
          <div className="profile-avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <div className="profile-header-info">
            <h2>{user.name}</h2>
            <span className="role-badge">{roleMeta.label}</span>
            <p>📧 {user.email}</p>
            {user.phone    && <p>📱 {user.phone}</p>}
            {user.location && <p>📍 {user.location}</p>}
          </div>
        </div>
        <button className="edit-btn" onClick={() => setEditMode(p => !p)}>
          {editMode ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit Profile</>}
        </button>
      </div>

      {/* ── Edit Form ── */}
      {editMode && (
        <div className="profile-edit-card">
          <h3>✏️ Edit Profile</h3>
          <div className="edit-grid">
            {editFields.map(({ label, key, placeholder, type }) => (
              <div className="edit-field" key={key}>
                <label>{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
          <button className="save-btn" onClick={handleSave}><FaSave /> Save Changes</button>
        </div>
      )}

      {/* ── Role Dashboard ── */}
      <div className="stats-section">
        <h3>
          {role === 'farmer'   && '🌾 Farmer Dashboard'}
          {role === 'provider' && '🏡 Provider Dashboard'}
          {role === 'buyer'    && '🛒 Buyer Dashboard'}
        </h3>

        {role === 'farmer'   && <FarmerDashboard   user={user} stats={stats} recentCrops={recentCrops} />}
        {role === 'provider' && <ProviderDashboard stats={stats} recentLands={recentLands} />}
        {role === 'buyer'    && <BuyerDashboard />}
      </div>

    </div>
    </div>
  );
}

export default Profile;
