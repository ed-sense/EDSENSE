import React from 'react'
const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("payload");
    window.location.reload();
  };
const Logout = () => {
  return (
    <div>
        <button
          style={{
            height: "100px",
            width: "250px",
            backgroundColor: "white",
            color: "#3498db",
            border: "3px solid #3498db",
            fontSize: "30px",
            borderRadius: "5px",
            margin: "0 40px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#3498db";
            e.currentTarget.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#3498db";
          }}
        >
          Exit Test
        </button>
    </div>
  )
}

export default Logout