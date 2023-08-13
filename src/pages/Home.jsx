import React, { useEffect, useState } from 'react';
import Search from '../components/Search/Search.jsx';
import CountriesService from '../API/CountriesService.js';
import FilterPopup from '../components/FilterPopup/FilterPopup.jsx';
import CountryCard from '../components/CountryCard/CountryCard.jsx';
import Header from '../components/Header/Header.jsx';
import { Link } from 'react-router-dom';
import Skeleton from '../components/CountryCard/Skeleton.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';

function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const countCountriesOnPage = 16;
  const [currentCountries, setCurrentCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  async function fetchCountries() {
    const countries = await CountriesService.getAll();
    setCountries(countries);
    countries && setCurrentCountries(countries.slice(0, countCountriesOnPage));
    setIsLoading(false);
  }

  async function filterByRegion(region) {
    setSelectedRegion(region);
    setIsLoading(true);

    const countries =
      region === 'All'
        ? await CountriesService.getAll()
        : await CountriesService.getByRegion(region);
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

  function changePage() {
    const fstIndex = currentPage * countCountriesOnPage;
    const sndIndex = fstIndex + countCountriesOnPage;
    countries && setCurrentCountries(countries.slice(fstIndex, sndIndex));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    changePage();
  }, [countries]);

  useEffect(() => {
    changePage();
  }, [currentPage]);

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
              items={['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']}
              defaultItem="Filter by Region"
              value={selectedRegion}
              onChange={filterByRegion}
            />
          </div>

          <div className="countries">
            {isLoading ? (
              [...new Array(12)].map((_, index) => <Skeleton key={index} />)
            ) : countries ? (
              currentCountries.map((country, index) => (
                <Link to={country.cca2} key={`${index}_${country.name.common}`}>
                  <CountryCard country={country} index={index} />
                </Link>
              ))
            ) : (
              <h1 className="error">По выбранному параметру стран не найдено</h1>
            )}
          </div>

          <div className="pagination">
            <Pagination
              countPages={Math.round((countries && countries.length) / countCountriesOnPage)}
              setCurrentPage={(numberPage) => setCurrentPage(numberPage)}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
