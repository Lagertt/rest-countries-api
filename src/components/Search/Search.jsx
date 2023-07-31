import React from 'react';
import cl from './Search.module.scss';

function Search({ searchValue, setSearchValue, onSubmit }) {
  function clearInput() {
    setSearchValue('');
  }

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      onSubmit();
    }
  };

  return (
    <div className={cl.search} onKeyDown={onKeyDown}>
      <svg
        onClick={onSubmit}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={cl.input__search}
        placeholder="Search for a country…"
      ></input>
      {searchValue && (
        <svg
          onClick={clearInput}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      )}
    </div>
  );
}

export default Search;
