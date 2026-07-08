"use client"
import React from 'react';

import { useParams } from 'next/navigation';

import { useGetConditionallyMutation } from '@services/base';

import { TrashbinIcon } from '../../iconComponents';

function DeleteComponent({ ...props }: { id: string }) {
  const { id } = props;
  const params = useParams();
  const [deleteRecord,{data,isLoading}] = useGetConditionallyMutation()
  const handleDeleteRecord =async ()=>{
const deleteRes = await deleteRecord({
    url:`api/${params.field}/${id}`,
    method:'DELETE'
  })

if(deleteRes){
  console.log(deleteRes)
}
  }
  return (
    <button 
    disabled={isLoading}
    onClick={handleDeleteRecord}
    className="mx-1 text-blue-600 hover:underline">
      <TrashbinIcon config={{ stroke: "#f00" }} />
    </button>
  );
}

export default DeleteComponent;
