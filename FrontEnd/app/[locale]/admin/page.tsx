import React from 'react';

function AdminPage() {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 p-4 w-full min-h-screen">
      <ReportCart />
      <ReportCart />
      <ReportCart />
      <ReportCart />
      <ReportCart />

    </div>
  );
}

export default AdminPage;
const ReportCart = () => {
  return (
    <div className="gap-3 grid grid-cols-1 sm:grid-cols-3 bg-neutral-800/80 shadow-xl backdrop-blur-lg p-3 border border-neutral-700 rounded-lg">
      <div className='flex justify-center items-center bg-white p-2 rounded-sm'>ReportCart</div>
      <div className='flex justify-center items-center bg-white p-2 rounded-sm'>ReportCart</div>
      <div className='flex justify-center items-center bg-white p-2 rounded-sm'>ReportCart</div>
      <div className='flex justify-center items-center bg-white p-2 rounded-sm'>ReportCart</div>

    </div>
  );
};
