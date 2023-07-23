import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountryCard from './components/CountryCard/CountryCard.jsx';
import Header from './components/Header/Header.jsx';

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
    <>
      <Header title="Where in the world?" />
      <main className="main">
        <div className="main__container container">
          {countries ? (
            countries.map((country, index) => (
              <CountryCard country={country} index={index} key={`${index}_${country.name}`} />
            ))
          ) : (
            <h1>Стран нет</h1>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
