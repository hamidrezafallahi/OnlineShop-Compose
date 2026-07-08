"use client";
import React, { useState } from 'react';

import Image from 'next/image';

import { CardTitle } from '@components/atoms/defaultElements/card';
import logo from '@public/arianSystemLogo1.png';

import { LoginForm } from './login';
import { SignUpForm } from './signUp';

function Register() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-5 bg-white/10 shadow-lg hover:shadow-xl backdrop-blur-md p-4 border border-white/20 rounded-2xl w-full sm:w-96 h-fit overflow-hidden text-center">
        <CardTitle className="flex justify-center">
          <Image alt="logo" src={logo} width={60} height={60} />
        </CardTitle>
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <SignUpForm setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}

export default Register;
