import React from 'react';
import cl from './Header.module.scss';

function Header({ title }) {
  return (
    <header className={cl.header}>
      <div className={`${cl.header__container} container`}>
        <h1 className={cl.title}>{title}</h1>
        <button className={cl.button}>
          <svg
            className={cl.svg}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <span className={cl.button__text}>Dark Mode</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
