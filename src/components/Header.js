import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Header Component
const Header = () => {
  const [hover, setHover] = useState(false);

  return (
    <div style={{ backgroundColor: "#003366" }} className="border-bottom px-4 py-3">
      <div className="d-flex align-items-center">
        <button
          className="btn me-3 p-2 rounded"
          style={{
            backgroundColor: hover ? "#1976d2" : "#003366",
            color: "white"
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="d-flex align-items-center">
          <div className="  me-3 d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
          <img 
  src="/sc-Photoroom.png" 
  alt="SC Logo" 
  className="me-2" 
  style={{ width: "30px", height: "30px", objectFit: "contain" }} 
/>

          </div>
          <span className="h4 text-white fw-semibold mb-0 header-font">Standard Chartered</span>
        </div>
      </div>
    </div>
  );
};

export default Header;