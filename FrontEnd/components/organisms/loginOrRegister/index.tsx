"use client";
import React, { useState } from 'react';

import { Button } from '@components/atoms/defaultElements/customButton';
import { Input } from '@components/atoms/defaultElements/customInput';

function LoginOrRegister() {
  const [loginFlag, setLoginFlag] = useState(false);

  const handleShowLogin = () => [setLoginFlag(true)];

  const handleShowRegister = () => [setLoginFlag(false)];

  return (
    <>
      <div className="flex justify-between border">
        <Button onClick={handleShowLogin}>Login</Button>
        <Button onClick={handleShowRegister}>Register</Button>
      </div>
      {loginFlag ? <Login /> : <Register />}
    </>
  );
}

export default LoginOrRegister;

const Login = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-col gap-5 bg-white/10 shadow-lg backdrop-blur-md p-4 border border-white/20 rounded-2xl w-full sm:w-1/3 h-screen sm:h-96 overflow-hidden text-center">
        <div className="bg-red-400 mx-auto w-20 h-20">
          candy rose logo must be here
        </div>

        <Input placeholder="email or phone number" />
        <Input placeholder="password" />
        <Button className="bg-primary">ورود</Button>
      </div>
    </div>
  );
};
const Register = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-col gap-5 bg-white/10 shadow-lg backdrop-blur-md p-4 border border-white/20 rounded-2xl w-full sm:w-1/3 h-screen sm:h-96 overflow-hidden text-center">
        <div className="bg-red-400 mx-auto w-20 h-20">
          candy rose logo must be here
        </div>

        <Input placeholder="email or phone number" />
        <Input placeholder="password" />
        <Button className="bg-primary">ورود</Button>
      </div>
    </div>
  );
};
