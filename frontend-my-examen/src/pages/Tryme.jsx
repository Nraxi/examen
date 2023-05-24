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

  const handleDownload = () => {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'data.txt';
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };




  return (
    <div>
      <h4>display it as a json blob</h4>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleDownload}>Download file</button>
      <p>
        Small explantion:
        <br />
        It downloads as a txt file</p>
    </div>
  );
}

export default Tryme;
