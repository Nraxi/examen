import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tryme() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/api/tryme")
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h4>display it as a json blob</h4>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Tryme;
