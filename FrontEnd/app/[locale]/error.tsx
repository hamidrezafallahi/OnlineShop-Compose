'use client';

import { useEffect } from 'react';

import { reportClientError } from '@components/organisms/runtimeErrorBridge';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
  useEffect(() => {
    reportClientError(error.message, error, {
      scope: 'app/[locale]/error',
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-auto px-4 py-24 max-w-lg text-center">
      <h1 className="font-bold text-[var(--store-text-on-dark)] text-2xl">
        خطایی رخ داد
      </h1>
      <p className="text-[color-mix(in_srgb,var(--store-text-on-dark)_80%,transparent)] text-sm leading-relaxed">
        {process.env.NODE_ENV === 'development'
          ? error.message
          : 'لطفاً دوباره تلاش کنید. اگر مشکل ادامه داشت با پشتیبانی تماس بگیرید.'}
      </p>
      {process.env.NODE_ENV === 'development' && error.digest ? (
        <p className="opacity-70 font-mono text-xs">digest: {error.digest}</p>
      ) : null}
      <button type="button" className="store-btn store-btn-primary" onClick={reset}>
        تلاش مجدد
      </button>
    </div>
  );
}
