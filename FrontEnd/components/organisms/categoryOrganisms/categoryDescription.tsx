import React from 'react';

export  function CategoryDescription({desc}:{desc:string}) {
  return (
    <div className='bg-white p-4'>{desc}</div>
  )
}
