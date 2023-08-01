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

      {/* <button onClick={() => console.log(country)}>Показать страну</button> */}

      <main className="container">
        <Link to="/">
          <button className="back-button button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H14" />
            </svg>
            Back to main page
          </button>
        </Link>
        {country && (
          <>
            <div className="country">
              <div className="flag">
                <img src={`${country.flags.png}`} alt="flag"></img>
              </div>

              <div className="properties">
                <h1 className="name">{country.name.common}</h1>
                <ul className="prop__list">
                  <li className="prop__item">
                    <span className="prop__title">Native Name: </span>
                    {Object.entries(country.name.nativeName).map((item, key) => {
                      return key === Object.entries(country.name.nativeName).length - 1
                        ? `${item[1].common}`
                        : `${item[1].common}, `;
                    })}
                  </li>
                  <li className="prop__item">
                    <span className="prop__title">Population: </span>
                    {country.population}
                  </li>
                  <li className="prop__item">
                    <span className="prop__title">Region: </span>
                    {country.region}
                  </li>
                  <li className="prop__item">
                    <span className="prop__title">Sub Region: </span>
                    {country.subregion}
                  </li>
                  {country.capital && (
                    <li className="prop__item">
                      <span className="prop__title">Capital: </span>
                      {country.capital[0]}
                    </li>
                  )}

                  <li className="prop__item">
                    <span className="prop__title">Top Level Domain: </span>
                    {country.tld.map((item, index) =>
                      index === country.tld.length - 1 ? `${item}` : `${item}, `
                    )}
                  </li>
                  <li className="prop__item">
                    <span className="prop__title">Currencies: </span>
                    {Object.values(country.currencies)[0].name}
                  </li>
                  <li className="prop__item">
                    <span className="prop__title">Languages: </span>
                    {Object.entries(country.languages).map((item, key) => {
                      return key === Object.entries(country.languages).length - 1
                        ? `${item[1]}`
                        : `${item[1]}, `;
                    })}
                  </li>
                </ul>
                <div className="borders">
                  Border Countries:
                  {borderCountries && (
                    <ul className="borders__list">
                      {borderCountries.map((item) => (
                        <Link to={`../${item.cca2}`} key={item.name.common}>
                          <button className="button borders__item">{item.name.common}</button>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Detail;
