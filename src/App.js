import React, { useEffect, useState } from 'react';
import CountryCard from './components/CountryCard/CountryCard.jsx';
import Header from './components/Header/Header.jsx';
import Search from './components/Search/Search.jsx';
import CountriesService from './API/CountriesService.js';
import FilterPopup from './components/FilterPopup/FilterPopup.jsx';

function App() {
  const [countries, setCountries] = useState([]);

  async function fetchCountries() {
    const countries = await CountriesService.getAll();
    setCountries(countries);
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <Header title="Where in the world?" />
      <main className="main">
        <div className="container">
          <div className="settings">
            <Search />
            <FilterPopup
              items={['Africa', 'America', 'Asia', 'Europe', 'Oceania']}
              defaultItem="Filter by Region"
            />
          </div>

          <div className="countries">
            {countries ? (
              countries.map((country, index) => (
                <CountryCard country={country} index={index} key={`${index}_${country.name}`} />
              ))
            ) : (
              <h1>Стран нет</h1>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
