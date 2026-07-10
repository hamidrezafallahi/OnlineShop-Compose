import React, { useState } from 'react';

import { useLocale } from 'next-intl';

import {
  EditIcon,
  PlusIcon2,
  SpinnerIcon,
  TrashbinIcon,
} from '@components/atoms/iconComponents';
import { useCUDDataMutation } from '@services/base';
import { showErrorToast } from '@utils/core';

import { Switch } from '../switch';
import { ITreeContext } from './';

interface TreeActionsProps {
  node: ITreeContext;
  active: boolean;
  endPoint: string;
  onClick: (e: any) => void;
}
export default function TreeActions({ ...props }: TreeActionsProps) {
  const { node, active, endPoint, onClick } = props;
  const locale = useLocale();
  return (
    <div
      className={`relative flex items-center gap-2 end-32 transition-all duration-75 ${locale == "fa" ? active && "-translate-x-32" : active && "translate-x-32"} `}
    >
      <EditCategory
        onClick={() => {
          onClick(node);
        }}
      />
      <DeleteCategory endpoint={endPoint} id={node.id} />
      <ActiveCategory endpoint={endPoint} id={node.id} active={node.isActive} />
      <AddSubCategory
        onClick={() => {
          onClick({ parentCategoryId: node.id });
        }}
      />
    </div>
  );
}
const EditCategory = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <EditIcon />
    </button>
  );
};
const DeleteCategory = ({ id, endpoint }: { id: number; endpoint: string }) => {
  const [deleted, setDeleted] = useState(false);
  const [deleteApi, { isLoading }] = useCUDDataMutation();
  const deleteHandler = async () => {
    const res = await deleteApi({
      url: `api/${endpoint + "/" + id}`,
      method: "DELETE",
    }).unwrap();
    if (res) {
      setDeleted(res.isSuccess);
    }
  };
  return (
    <button disabled={deleted} onClick={deleteHandler}>
      {isLoading ? (
        <SpinnerIcon config={{ fill: "#999", stroke: "#444" }} />
      ) : deleted ? (
        <TrashbinIcon config={{ stroke: "#888" }} />
      ) : (
        <TrashbinIcon config={{ stroke: "#f00" }} />
      )}
    </button>
  );
};
const ActiveCategory = ({
  id,
  endpoint,
  active,
}: {
  id: number;
  endpoint: string;
  active: boolean;
}) => {
  const [isActive, setIsActive] = useState(active);
  const [ActiveApi, { isLoading }] = useCUDDataMutation();
  const activeHandler = async (e:boolean) => {
    const res = await ActiveApi({
      url: `api/${endpoint + "/active"}`,
      body: {
        id,
        isActive: e,
      },
      method: "PUT",
    }).unwrap();
    if (!res.isSuccess) {
       showErrorToast(res.error)
    }
  };
  return <Switch onChange={activeHandler} checked={isActive}  />;
};

const AddSubCategory = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <PlusIcon2 />
    </button>
  );
};
