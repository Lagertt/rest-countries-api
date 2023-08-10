import React, { useEffect } from 'react';
import CountriesService from '../../API/CountriesService';
import { Link, useHref } from 'react-router-dom';
import { useState } from 'react';
import formatNumb from '../../utils/formatNumb';
import cl from './CountryDetail.module.scss';

function CountryDetail({ country }) {
  const [borderCountries, setBorderCountries] = useState(undefined);

  async function fetchBorderCountries() {
    const borderCountries = country && (await CountriesService.getByListCode(country.borders));
    borderCountries && setBorderCountries(borderCountries);
  }

  useEffect(() => {
    fetchBorderCountries();
  }, [country]);

  return (
    <div className={cl.country}>
      <div className={cl.flag}>
        <img src={`${country.flags.png}`} alt="flag"></img>
      </div>

      <div className={cl.properties}>
        <h1 className={cl.name}>{country.name.common}</h1>
        <ul className={cl.prop__list}>
          {country.name.nativeName && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Native Name: </span>
              {Object.entries(country.name.nativeName).map((item, key) => {
                return key === Object.entries(country.name.nativeName).length - 1
                  ? `${item[1].common}`
                  : `${item[1].common}, `;
              })}
            </li>
          )}

          {country.tld && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Top Level Domain: </span>
              {country.tld.map((item, index) =>
                index === country.tld.length - 1 ? `${item}` : `${item}, `
              )}
            </li>
          )}

          {country.name.official && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Official Name: </span>
              {country.name.official}
            </li>
          )}

          {country.population && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Population: </span>
              {formatNumb(country.population)}
            </li>
          )}

          {country.region && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Region: </span>
              {country.region}
            </li>
          )}

          {country.currencies && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Currencies: </span>
              {Object.values(country.currencies)[0].name}
            </li>
          )}

          {country.subregion && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Sub Region: </span>
              {country.subregion}
            </li>
          )}

          {country.languages && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Languages: </span>
              {Object.entries(country.languages).map((item, key) => {
                return key === Object.entries(country.languages).length - 1
                  ? `${item[1]}`
                  : `${item[1]}, `;
              })}
            </li>
          )}

          {country.capital && (
            <li className={cl.prop__item}>
              <span className={cl.prop__title}>Capital: </span>
              {country.capital[0]}
            </li>
          )}
        </ul>

        {borderCountries && (
          <div className={cl.borders}>
            Border Countries:
            {borderCountries && (
              <ul className={cl.borders__list}>
                {borderCountries.map((item) => (
                  <Link to={`../rest-countries-api/${item.cca2}`} key={item.name.common}>
                    <button className="button">{item.name.common}</button>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryDetail;
