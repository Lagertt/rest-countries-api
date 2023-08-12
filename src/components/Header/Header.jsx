import React from 'react';
import cl from './Header.module.scss';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

function Header({ title }) {
  return (
    <header className={cl.header}>
      <div className={`${cl.header__container} container`}>
        <h1 className={cl.title}>{title}</h1>
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}

export default Header;
