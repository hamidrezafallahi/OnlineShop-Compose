'use client';

import React, { useTransition } from 'react';

import {
  useParams,
  useRouter,
} from 'next/navigation';

import {
  CloseEyeIcon,
  EyeIcon,
} from '@components/atoms/iconComponents';
import { fetchDefault } from '@lib/setDefault';

import { Button } from '../customButton';

interface IProps {
  id: number;
  isDefault: boolean;
}
 
export default function DefaultComponent({ id, isDefault }: IProps) {
 
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const router = useRouter();
  const handleDefault = (formData: FormData) => {
    startTransition(async () => {
     const refresh =  await fetchDefault(params.field as string,formData);
     if(refresh){
      router.refresh()
     }
    });
  };

  return (
    <form action={handleDefault}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="isDefault" value={String(isDefault)} />
      
      <Button 
        className='bg-white' 
        type='submit' 
        disabled={isPending}
      >
        {isPending ? (
          '...'
        ) : isDefault ? (
          <EyeIcon />
        ) : (
          <CloseEyeIcon />
        )}
      </Button>
    </form>
  );
}