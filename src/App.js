import React, { useEffect, useState } from 'react';
import CountryCard from './components/CountryCard/CountryCard.jsx';
import Header from './components/Header/Header.jsx';
import Search from './components/Search/Search.jsx';
import CountriesService from './API/CountriesService.js';
import FilterPopup from './components/FilterPopup/FilterPopup.jsx';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchValue, setSearchValue] = useState('');

  async function fetchCountries() {
    const countries = await CountriesService.getAll();
    setCountries(countries);
  }

  async function filterByRegion(region) {
    setSelectedRegion(region);
    const countries = await CountriesService.getByRegion(region);
    countries && setCountries(countries);
  }

  async function filterByName(name) {
    console.log(name);
    if (name !== '') {
      const countries = await CountriesService.getByName(name);
      setCountries(countries);
    } else {
      fetchCountries();
    }
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
            <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSubmit={() => filterByName(searchValue)}
            />
            <FilterPopup
              items={['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']}
              defaultItem="Filter by Region"
              value={selectedRegion}
              onChange={filterByRegion}
            />
          </div>

          <div className="countries">
            {countries ? (
              countries.map((country, index) => (
                <CountryCard country={country} index={index} key={`${index}_${country.name}`} />
              ))
            ) : (
              <h1 className="error">По выбранному параметру стран не найдено</h1>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
