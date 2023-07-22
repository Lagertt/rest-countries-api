import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);

  async function fetchCountries() {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    setCountries(response.data);
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <main className="main">
    </main>
  );
}

export default App;
