// src/components/Home.js
import React, { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Call backend API
    fetch("https://vitrixlab.pythonanywhere.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h1>Users from Backend</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
