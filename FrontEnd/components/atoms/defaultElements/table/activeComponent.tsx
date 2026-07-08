import React from 'react';

import { useParams } from 'next/navigation';

import { useGetConditionallyMutation } from '@services/base';

import {
  Switch,
  SwitchProps,
} from '../switch';

interface IProps extends Omit<SwitchProps, "id"> {
  id: number;
  checked:boolean;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
function ActiveComponent({ ...props }: IProps) {
  const { id,checked } = props;
  const params = useParams();
  const [active] = useGetConditionallyMutation();
  const handleSwitchChange = async (e: boolean) => {
    const res = await active({
      url: `${baseUrl}api/${params.field}/active`,
      body: {
        Id: id,
        IsActive: e,
      },
      method: "PUT",
    });
    if (res.error) {
      console.log(res);
    }
  };
  return <Switch onChange={handleSwitchChange} checked={checked}   />;
}

export default ActiveComponent;
