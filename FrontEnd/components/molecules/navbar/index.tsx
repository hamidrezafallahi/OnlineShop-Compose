import React from 'react';

import { Button } from '@components/atoms/defaultElements/customButton';

function Navbar() {
  const menuItems = ["آموزش سیستم", "درباره ما", "مشتریان", "محصولات"];

  return (
    <header>
      <Button  className="top-16 left-16 z-10 fixed">
        ورود/ ثبت نام
      </Button>
      <nav className="top-10 z-10 fixed flex justify-center px-6 w-full mix-blend-difference">
        <div className="flex justify-between px-10 rounded-2xl w-full h-24 text-white">
          <div className="flex justify-center items-center w-80">
            <Button   className="flex ml-5 w-fit h-fit">
              SearchIcon
            </Button>
          </div>

          <div className="flex justify-end items-center w-1/2">
            <div className="flex justify-evenly items-center w-full font-bold">
              <ul className="flex justify-evenly items-center w-full">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Button
                      
                      className="hover:text-logo-blue0 text-base duration-300"
                    >
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>
              MainLogo  
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
