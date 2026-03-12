import React from 'react';
import './ReflectiveCard.css';
import { Radio } from 'lucide-react'; 
import MyPhoto from './assets/profile.jpg'; 

const ReflectiveCard = () => (
  <div className="reflective-card">
    <div className="card-shine"></div>
    <div className="card-top">
      <div className="student-badge"><span>IT STUDENT</span></div>
      <Radio size={18} color="rgba(255,255,255,0.6)" />
    </div>
    <div className="profile-photo-wrapper">
      <img src={MyPhoto} alt="Profile" className="profile-img" />
    </div>
    <div className="name-container">
      <h1 className="name-text">JOHN PATRICK E. BUCOL</h1>
      <h2 className="title-text">WEB DEVELOPER</h2>
    </div>
    <div className="card-bottom">
      <div className="id-badge">ID NUMBER: 2022-01374</div>
    </div>
  </div>
);
export default ReflectiveCard;