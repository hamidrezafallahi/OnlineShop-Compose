import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@components/atoms/defaultElements/customButton';
import { ResetIcon } from '@components/atoms/iconComponents';

import { IFormHeaderProps } from './type';

const FormHeader = ({ ...props }: IFormHeaderProps) => {
  const t = useTranslations();
  const { DisplayName, icon, isEdit, resetField, backHref } = props;

  return (
    <header className="admin-panel flex flex-col sm:flex-row flex-wrap justify-between items-stretch sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 md:px-5">
      <div className="flex items-center gap-3 min-w-0">
        <div className="shrink-0">{icon}</div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="admin-page-title !text-base sm:!text-lg md:!text-xl">
              {isEdit
                ? t('admin.editTitle', { entity: DisplayName })
                : t('admin.createTitle', { entity: DisplayName })}
            </h1>
            <span
              className={
                isEdit
                  ? 'admin-badge admin-badge-warning'
                  : 'admin-badge admin-badge-success'
              }
            >
              {isEdit ? t('general.edit') : t('general.new')}
            </span>
          </div>
          <p className="admin-page-subtitle">
            {isEdit
              ? t('admin.formSubtitleEdit')
              : t('admin.formSubtitleCreate')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {backHref && (
          <Link href={backHref} className="admin-btn flex-1 sm:flex-none justify-center">
            {t('general.back')}
          </Link>
        )}
        <Button
          type="button"
          onClick={() => resetField()}
          className="admin-icon-btn !bg-[var(--admin-surface-elevated)]"
          aria-label={t('general.reset')}
          title={t('general.reset')}
        >
          <ResetIcon />
        </Button>
      </div>
    </header>
  );
};

export default FormHeader;
