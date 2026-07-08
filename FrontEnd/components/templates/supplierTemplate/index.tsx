import React from 'react';

import {
  SupplierProducts,
  SupplierProfile,
} from '@components/organisms/supplierOrganisms';
import { IUser } from '@models/user';

export default async function SupplierTemplate({supplier}:{supplier:IUser}) {
  return (
       <div className="flex flex-col items-center gap-4 p-8 pt-28">
        <SupplierProfile user={supplier}/>  
         <SupplierProducts id={supplier.id} />
        {/* <SupplierBrands id={supplier.id}  />
        <SupplierCategory id={supplier.id}/>
        <SupplierTags id={supplier.id}/>
        <SupplierCommentsAndRates  /> */}
    </div>
  )
}
