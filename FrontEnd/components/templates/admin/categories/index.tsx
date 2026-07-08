"use client";
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@components/atoms/defaultElements/customButton';
import Tree, { ITreeContext } from '@components/atoms/defaultElements/tree';
import FormGenerator from '@components/organisms/formGenerator';
import { IFormConfig } from '@components/organisms/formGenerator/type';

interface IProps {
  categories: ITreeContext[];
  entityFormConfig: IFormConfig;
}
export default function AdminCategoryTemplate({ ...props }: IProps) {
  const { categories, entityFormConfig } = props;
  const [defaultValues,setDefaultValues]=useState<ITreeContext|undefined>(undefined)
  const mapCategoryToContext = (cat: ITreeContext): ITreeContext => ({
    id: cat.id,
    parentCategoryId:cat.parentCategoryId,
    persianName: cat.persianName,
    englishName: cat.englishName,
    categoryEnglishDesc:cat.categoryEnglishDesc,
    categoryPersianDesc:cat.categoryPersianDesc,
    categoryCover:cat.categoryCover,
    isShowInLanding:cat.isShowInLanding,
    isActive:cat.isActive,
    subCategories: cat.subCategories?.map(mapCategoryToContext) ?? [],
  });
  const t = useTranslations();
  const content: ITreeContext[] = categories.map(mapCategoryToContext); 
  return (
    <div className="relative flex flex-col gap-4">
      <Button
        className="-top-10 absolute bg-white hover:bg-primary hover:text-white end-0"
        type="button"
        onClick={()=>{setDefaultValues(undefined)}}
      >
        {t("general.new")}
      </Button>
      <Tree data={content} clickable endPoint={entityFormConfig.endPoint} onClick={(e:ITreeContext) => setDefaultValues(e)} />
      <FormGenerator entityFormConfig={entityFormConfig} defaultValues={defaultValues}/>
    </div>
  );
}
