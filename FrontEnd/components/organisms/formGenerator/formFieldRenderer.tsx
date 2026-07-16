import { Checkbox } from '@components/atoms/defaultElements/customCheckbox';
import CustomDatePicker
  from '@components/atoms/defaultElements/customDatePicker';
import { Input } from '@components/atoms/defaultElements/customInput';
import { Rate } from '@components/atoms/defaultElements/customRate';
import { Select } from '@components/atoms/defaultElements/customSelect';
import { Textarea } from '@components/atoms/defaultElements/customTextarea';
import { DynamicSelect } from '@components/atoms/defaultElements/dynamicSelect';
import Uploader from '@components/atoms/defaultElements/uploader';
import ImagesInput from '@components/molecules/imagesInput';

// import ReactJson from 'react-json-view';
// npm i react-json-view
// npm i @types/react-json-view
import { FormFieldRendererProps } from './type';

const FormFieldRenderer = ({
  field,
  register,
  error,
  setValue,
  getValues,
  defaultValues,
  watch,
  trigger,
}: FormFieldRendererProps) => {

  switch (field.Type) {
    case "text":
    case "number":
    case "price":
      return (
        <div className="col-span-2 sm:col-span-1">
          <Input
            placeholder={field.PlaceHolder}
            aria-label={field.Name}
            type={field.Type === "price" ? "number" : field.Type}
            {...register}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    case "file":
      return (
        <div className="col-span-2 sm:col-span-1 h-10">
          <Uploader
            value={getValues(field.Name) || ""}
            onChange={(file) => setValue(field.Name, file)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    case "textarea":
      return (
        <div className="col-span-2 sm:col-span-1">
          <Textarea placeholder={field.PlaceHolder} {...register} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    case "date":
      return (
        <div className="col-span-2 sm:col-span-1">
          <CustomDatePicker
            defaultValue={getValues(field.Name) || ""}
            onChange={(e) => {
              setValue(field.Name, new Date(e as number).toISOString());
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
          <Checkbox {...register} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    case "select":
      const options = field.Options?.map((op)=>({label:op.label,value:op.value}))  || [{label:"گزینه ای پیدا نشد",value:''}]
       return (
        <div className="col-span-2 sm:col-span-1">
          <Select
            options={options}
            value={watch(field.Name)}
            onChange={(val) => {
              setValue(field.Name, val);
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
      case "rate":
        return (
        <div className="col-span-2 sm:col-span-1">
        <Rate mode="rate"  value={watch(field.Name) || ""}
            onChange={(e) => {
              setValue(field.Name, e);
            }}/>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    case "dynamicSelect":
      let temp = new Object();
      if (
        field.FetchConfig?.fetchFilters &&
        field.FetchConfig?.fetchFilters.length > 0
      ) {
        field.FetchConfig?.fetchFilters.map((f) => {
          temp = {
            ...temp,
            [f]:
              watch(f) && String(watch(f)).length > 0
                ? watch(f)
                : defaultValues &&
                    defaultValues[f] &&
                    typeof defaultValues[f] == "string" &&
                    defaultValues[f]?.length > 0
                  ? defaultValues[f]
                  : 0,
          };
        });
      }
      const config = { api: field.FetchConfig?.api, ...temp };
      return (
        <div className="col-span-2 sm:col-span-1">
          <DynamicSelect
            {...register}
            fetchConfig={config}
            value={watch(field.Name) || ""}
            onChange={(e) => {
              setValue(field.Name, e);
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    case "fileArray":
      return (
        <div className="col-span-2">
          <ImagesInput
            // {...register(field.Name, getValidationRules(field))}
            // getValues={getValues}
            onChange={(
              e: { id: number; file: undefined | File; isMain: boolean }[],
            ) => {
              const fileArray = e.map((f) => f.file).filter((f) => f); // فقط File ها
              const isMainArray = e.map((f) => f.isMain);
              setValue("Images", fileArray);
              setValue("IsMainImages", isMainArray);
              trigger("Images");
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    //   case "json":
    // return (
    //   <div className="col-span-2">
    //     <label className="block mb-2 font-medium text-sm">
    //       {field.Caption}
    //     </label>
    //     <div className="border rounded-lg h-96 overflow-hidden">
    //       <ReactJson
    //         src={watch(field.Name) || {}}
    //         onEdit={(edit:any) => {
    //           setValue(field.Name, edit.updated_src);
    //           trigger(field.Name);
    //         }}
    //         onAdd={(add:any) => {
    //           setValue(field.Name, add.updated_src);
    //           trigger(field.Name);
    //         }}
    //         onDelete={(del:any) => {
    //           setValue(field.Name, del.updated_src);
    //           trigger(field.Name);
    //         }}
    //         theme="monokai"
    //         enableClipboard={true}
    //         displayDataTypes={false}
    //         displayObjectSize={false}
    //         collapsed={false}
    //       />
    //     </div>
    //     {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    //   </div>
    // );
 

    default:
      return (
        <div className="col-span-2 sm:col-span-1">
          <Input placeholder={field.PlaceHolder} {...register} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
  }
};
export default FormFieldRenderer;
