import { useTranslations } from 'next-intl';

import { Badge } from '@components/atoms/defaultElements/badge';
import { Button } from '@components/atoms/defaultElements/customButton';
import { ResetIcon } from '@components/atoms/iconComponents';

import { IFormHeaderProps } from './type';

const FormHeader = ({ ...props }: IFormHeaderProps) => {
  const t = useTranslations();
  const { DisplayName, icon, isEdit, resetField } = props;
  return (
    <div className="flex justify-evenly items-center bg-white/10 shadow-lg hover:shadow-xl backdrop-blur-md p-4 border border-white/20 rounded-2xl w-full overflow-hidden">
      <div>{DisplayName}</div>
      {icon}
      <Badge
        variant={isEdit ? "warning" : "success"}
        className="flex justify-center items-center !p-1 w-16"
      >
        {isEdit ? t("general.edit") : t("general.new")}
      </Badge>
      <Button
        onClick={() => {
          resetField();
        }}
        className="bg-white !p-3 !rounded-full"
      >
        <ResetIcon />
      </Button>
    </div>
  );
};
export default FormHeader