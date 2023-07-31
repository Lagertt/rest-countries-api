import React, { useEffect } from 'react';
import CountriesService from '../API/CountriesService.js';
import Header from '../components/Header/Header.jsx';
import { Link, useHref } from 'react-router-dom';
import { useState } from 'react';

function Detail() {
  const [country, setCountry] = useState(undefined);
  const [borderCountries, setBorderCountries] = useState(undefined);
  const href = useHref();

  async function fetchCountry() {
    const country = await CountriesService.getByCode(href.slice(1));
    country && setCountry(country[0]);
  }

  async function fetchBorderCountries() {
    const borderCountries = country && (await CountriesService.getByListCode(country.borders));
    borderCountries && setBorderCountries(borderCountries);
  }

  useEffect(() => {
    fetchCountry();
  }, [href]);

  useEffect(() => {
    fetchBorderCountries();
  }, [country]);

  return (
    <>
      <Header title="Where in the world?" />
      <Link to="/">
        <button>Back to main page</button>
      </Link>

      <button onClick={() => console.log(country)}>Показать страну</button>

      {country && (
        <div>
          <div>
            <img src={`${country.flags.png}`} alt="flag"></img>
            <h1>{country.name.common}</h1>
            <ul>
              <li>
                <span>Native Name: </span>
                {Object.entries(country.name.nativeName).map((item, key) => {
                  return key === Object.entries(country.name.nativeName).length - 1
                    ? `${item[1].common}`
                    : `${item[1].common}, `;
                })}
              </li>
              <li>
                <span>Population: </span>
                {country.population}
              </li>
              <li>
                <span>Region: </span>
                {country.region}
              </li>
              <li>
                <span>Sub Region: </span>
                {country.subregion}
              </li>
              {country.capital && (
                <li>
                  <span>Capital: </span>
                  {country.capital[0]}
                </li>
              )}

              <li>
                <span>Top Level Domain: </span>
                {country.tld.map((item, index) =>
                  index === country.tld.length - 1 ? `${item}` : `${item}, `
                )}
              </li>
              <li>
                <span>Currencies: </span>
                {Object.values(country.currencies)[0].name}
              </li>
              <li>
                <span>Languages: </span>
                {Object.entries(country.languages).map((item, key) => {
                  return key === Object.entries(country.languages).length - 1
                    ? `${item[1]}`
                    : `${item[1]}, `;
                })}
              </li>
            </ul>
          </div>

          <div>
            Border Countries:
            {borderCountries &&
              borderCountries.map((item) => (
                <Link to={`../${item.cca2}`} key={item.name.common}>
                  <button>{item.name.common}</button>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
