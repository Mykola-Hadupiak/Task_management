// import { useState } from 'react';
import './Header.scss';
import { ButtonMain } from '../ButtonMain';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <div className="logo" />

        <p className="header__title">
          Pro Manage
        </p>
      </div>

      <ButtonMain />
    </div>
  );
};
