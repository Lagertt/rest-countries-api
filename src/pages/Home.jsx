import React, { useEffect, useState } from 'react';
import Search from '../components/Search/Search.jsx';
import CountriesService from '../API/CountriesService.js';
import FilterPopup from '../components/FilterPopup/FilterPopup.jsx';
import CountryCard from '../components/CountryCard/CountryCard.jsx';
import Header from '../components/Header/Header.jsx';
import { Link } from 'react-router-dom';
import Skeleton from '../components/CountryCard/Skeleton.jsx';

function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCountries() {
    const countries = await CountriesService.getAll();
    setCountries(countries);
    setIsLoading(false);
  }

  async function filterByRegion(region) {
    setSelectedRegion(region);
    setIsLoading(true);
    const countries = await CountriesService.getByRegion(region);
    countries && setCountries(countries);
    setIsLoading(false);
  }

  async function filterByName(name) {
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
            {isLoading ? (
              [...new Array(12)].map((index) => <Skeleton key={index} />)
            ) : countries.length > 0 ? (
              countries.map((country, index) => (
                <Link to={country.cca2} key={`${index}_${country.name.common}`}>
                  <CountryCard country={country} index={index} />
                </Link>
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

export default Home;
