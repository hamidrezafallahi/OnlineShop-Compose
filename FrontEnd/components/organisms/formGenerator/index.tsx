"use client";
import React, {
  useEffect,
  useTransition,
} from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { Button } from '@components/atoms/defaultElements/customButton';
import { saveEntity } from '@lib/saveEntity';

import FormFieldRenderer from './formFieldRenderer';
import FormHeader from './formHeader';
import {
  FormField,
  FormGeneratorProps,
} from './type';

export default function FormGenerator({
  entityFormConfig,
  defaultValues,
}: FormGeneratorProps) {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const route = useRouter();
  const t = useTranslations();
  const formFields: FormField[] = JSON.parse(entityFormConfig.formFieldsJson);
  const getValidationRules = (field: FormField): RegisterOptions => {
    const rules: RegisterOptions = {};
    field.Rules?.forEach((r) => {
      if (r.Rule === "required" && r.Condition) {
        rules.required = r.Message || `${field.Caption} is required`;
      }
    });
    return rules;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    resetField,
    reset,
    watch,
    trigger,
  } = useForm({ mode: "onBlur", defaultValues });
   const handleAddOrUpdateRecord: SubmitHandler<any> = async (data) => {
     const cleanedData: any = {
      id: data["id"] ? Number(data["id"]) : undefined,
    };
    formFields.forEach((field) => {
      if (field.Type === "json" && data[field.Name]) {
        cleanedData[field.Name] = JSON.stringify(data[field.Name]);
      } else {
        cleanedData[field.Name] =
          typeof data[field.Name] === "string" && data[field.Name].length === 0
            ? undefined
            : data[field.Name];
      }
    });
    const hasFileArray = formFields.some((field) => field.Type === "fileArray");
    let bodyToSend: any = cleanedData;
    if (hasFileArray) {
      const formData = new FormData();
      for (const key in cleanedData) {
        if (key !== "Images" && key !== "IsMainImages") {
          if (cleanedData[key] instanceof File) {
            formData.append(key, cleanedData[key]);
          } else {
            formData.append(key, cleanedData[key] ?? "");
          }
        } else {
          if (key == "Images") {
            const imagesFiles = cleanedData["Images"] || [];
            imagesFiles.forEach((file: File) => {
              formData.append("Images", file);
            });
          } else {
            const isMainImages = cleanedData["IsMainImages"] || [];
            isMainImages.forEach((isMain: boolean) => {
              formData.append("IsMainImages", isMain.toString());
            });
          }
        }
      }
      bodyToSend = formData;
    } else {
      const hasFile = formFields.some((field) => field.Type === "file");
      if (hasFile) {
        const formData = new FormData();
        for (const key in cleanedData) {
          if (cleanedData[key] instanceof File) {
            formData.append(key, cleanedData[key]);
          } else if (cleanedData[key] !== undefined) {
            formData.append(key, cleanedData[key] ?? "");
          }
        }
        bodyToSend = formData;
      }
    }
    startTransition(async () => {
      const res = await saveEntity({
        endPoint: entityFormConfig.endPoint,
        body: bodyToSend,
        method: defaultValues?.id ? "PUT" : "POST",
      });
      console.log("startTransition",res)
      if (res?.isSuccess) {
        Object.entries(formFields).forEach(([k, v]) => {
          resetField(v.Name, undefined);
          setValue(v.Name, undefined);
        });
        route.push(`/${locale}/admin/${entityFormConfig.endPoint}`);
      }
    });
  };

  const handleResetButton = () => {
    if (defaultValues) {
      Object.entries(formFields).forEach(([k, v]) => {
        resetField(v.Name, defaultValues[v.Name]);
      });
    } else {
      Object.entries(formFields).forEach(([k, v]) => {
        resetField(v.Name, undefined);
        setValue(v.Name, undefined);
      });
    }
  };
  useEffect(() => {
    if (defaultValues === undefined) {
      formFields.forEach((field) => {
        resetField(field.Name as any, { defaultValue: "" });
        setValue(field.Name as any, "");
      });
      reset({});
    } else {
      reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <div className="flex flex-col gap-4">
      <FormHeader
        DisplayName={
          locale !== "fa"
            ? entityFormConfig.englishDisplayName
            : entityFormConfig.persianDisplayName
        }
        icon={
          <div
            dangerouslySetInnerHTML={{
              __html: entityFormConfig.entityIconBase64,
            }}
          />
        }
        isEdit={defaultValues?.id ? true : false}
        resetField={handleResetButton}
      />
      <form
        onSubmit={handleSubmit(handleAddOrUpdateRecord)}
        className="hidden-show-scrollbar gap-4 grid grid-cols-2 bg-white/10 shadow-lg hover:shadow-xl backdrop-blur-md p-4 border border-white/20 rounded-2xl w-full !h-[calc(100dvh-125px)] overflow-y-scroll"
      >
        {formFields
          .filter((field) => field.Type !== "hidden")
          .sort((a, b) => (a.Order || 0) - (b.Order || 0))
          .map((field, index) => (
            <label key={index}>
              {field.Caption}
              <FormFieldRenderer
                key={field.Name}
                field={field}
                defaultValues={defaultValues}
                getValues={getValues}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register(field.Name, getValidationRules(field))}
                error={errors[field.Name]?.message as string | undefined}
              />
            </label>
          ))}
        <Button
          className="col-span-2 bg-white text-secondary"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "..." : t("general.save")}
        </Button>
      </form>
    </div>
  );
}
