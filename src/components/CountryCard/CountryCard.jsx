import React from 'react';
import cl from './CountryCard.module.scss';
import formatNumb from '../../utils/formatNumb';

function CountryCard({ country }) {
  return (
    <article className={cl.elem}>
      <div className={cl.flag}>
        <img src={`${country.flags.png}`} alt="flag"></img>
      </div>
      <div className={cl.descr}>
        <h2>{country.name.common}</h2>
        <ul>
          <li>
            <span>Population:</span> {formatNumb(country.population)}
          </li>
          <li>
            <span>Region:</span> {country.region}
          </li>
          <li>
            <span>Capital:</span> {country.capital}
          </li>
        </ul>
      </div>
    </article>
  );
}

export default CountryCard;
