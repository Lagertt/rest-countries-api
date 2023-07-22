import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountryCard from './components/CountryCard/CountryCard.jsx';

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
      {countries ? (
        countries.map((country, index) => <CountryCard country={country} index={index} />)
      ) : (
        <h1>Стран нет</h1>
      )}
    </main>
  );
}

export default App;
