import React, { useEffect, useState } from 'react';
import CountriesService from '../API/CountriesService.js';
import Header from '../components/Header/Header.jsx';
import { Link, useHref } from 'react-router-dom';
import SkeletonDetail from './SkeletonDetail.jsx';
import CountryDetail from '../components/CountryDetail/CountryDetail.jsx';

function Detail() {
  const [country, setCountry] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const href = useHref();

  async function fetchCountry() {
    const country = await CountriesService.getByCode(href.slice(href.lastIndexOf('/') + 1));
    if (country) {
      setCountry(country[0]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCountry();
  }, [href]);

  return (
    <>
      <Header title="Where in the world?" />

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
        {isLoading ? <SkeletonDetail /> : country && <CountryDetail country={country} />}
      </main>
    </>
  );
}

export default Detail;
