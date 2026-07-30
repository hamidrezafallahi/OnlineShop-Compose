'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { browserApiBaseUrl } from '@lib/api';
import {
  getTokens,
  showErrorToast,
  showSuccessToast,
} from '@utils/core';

type BackupFile = {
  fileName: string;
  sizeBytes: number;
  createdAtUtc: string;
};

type ApiEnvelope<T> = {
  isSuccess: boolean;
  error?: string | null;
  data?: T | null;
};

type BackupListData = {
  items: BackupFile[];
  totalCount: number;
};

type SeedStatus = {
  seedsAvailable: boolean;
  seedsDirectory: string;
  files: string[];
  autoSeedNote: string;
};

type SeedResult = {
  success: boolean;
  message: string;
  appliedFiles: string[];
};

function formatBytes(bytes: number, locale: string) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;
  return `${new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    maximumFractionDigits: 1,
  }).format(value)} ${units[exponent]}`;
}

function formatDate(value: string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiEnvelope<T>> {
  const token = getTokens('candyAccess');
  const response = await fetch(`${browserApiBaseUrl}/${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...(token.valid ? { Authorization: `Bearer ${token.val}` } : {}),
      ...(!(init?.body instanceof FormData)
        ? { 'Content-Type': 'application/json' }
        : {}),
    },
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error('UNAUTHORIZED');
  }

  if (response.status === 204) {
    return { isSuccess: true, data: null };
  }

  const payload = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok && !payload?.error) {
    throw new Error(`HTTP ${response.status}`);
  }
  return payload;
}

export default function AdminBackupPanel() {
  const t = useTranslations();
  const locale = useLocale();
  const [items, setItems] = useState<BackupFile[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [busyFile, setBusyFile] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [seedStatus, setSeedStatus] = useState<SeedStatus | null>(null);
  const [seeding, setSeeding] = useState(false);

  const loadSeedStatus = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await apiRequest<SeedStatus>('Seed');
        if (result.isSuccess && result.data) {
          setSeedStatus(result.data);
        }
      } catch {
        // Seed panel is optional; backup still works.
      }
    });
  }, []);

  const loadBackups = useCallback(() => {
    startTransition(async () => {
      try {
        setLoadError(false);
        const result = await apiRequest<BackupListData>('Backup');
        if (!result.isSuccess) {
          setLoadError(true);
          showErrorToast(result.error || t('admin.backupLoadError'));
          return;
        }
        setItems(result.data?.items ?? []);
      } catch {
        setLoadError(true);
        showErrorToast(t('admin.backupLoadError'));
      }
    });
  }, [t]);

  useEffect(() => {
    loadBackups();
    loadSeedStatus();
  }, [loadBackups, loadSeedStatus]);

  const handleApplySeed = async (clean: boolean) => {
    const ok = window.confirm(
      clean ? t('admin.seedConfirmClean') : t('admin.seedConfirm'),
    );
    if (!ok) return;

    setSeeding(true);
    try {
      const result = await apiRequest<SeedResult>(
        `Seed/sample?clean=${clean ? 'true' : 'false'}`,
        { method: 'POST' },
      );
      if (!result.isSuccess) {
        showErrorToast(result.error || t('admin.seedApplyError'));
        return;
      }
      showSuccessToast(t('admin.seedApplySuccess'));
      loadSeedStatus();
    } catch {
      showErrorToast(t('admin.seedApplyError'));
    } finally {
      setSeeding(false);
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const result = await apiRequest<BackupFile>('Backup', { method: 'POST' });
      if (!result.isSuccess) {
        showErrorToast(result.error || t('admin.backupCreateError'));
        return;
      }
      showSuccessToast(t('admin.backupCreateSuccess'));
      loadBackups();
    } catch {
      showErrorToast(t('admin.backupCreateError'));
    } finally {
      setCreating(false);
    }
  };

  const handleDownload = async (fileName: string) => {
    setBusyFile(fileName);
    try {
      const token = getTokens('candyAccess');
      const response = await fetch(
        `${browserApiBaseUrl}/Backup/${encodeURIComponent(fileName)}/download`,
        {
          headers: token.valid
            ? { Authorization: `Bearer ${token.val}` }
            : undefined,
        },
      );

      if (!response.ok) {
        showErrorToast(t('admin.backupDownloadError'));
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      showSuccessToast(t('admin.backupDownloadSuccess'));
    } catch {
      showErrorToast(t('admin.backupDownloadError'));
    } finally {
      setBusyFile(null);
    }
  };

  const handleDelete = async (fileName: string) => {
    const confirmed = window.confirm(t('admin.backupDeleteConfirm', { file: fileName }));
    if (!confirmed) return;

    setBusyFile(fileName);
    try {
      const result = await apiRequest<BackupFile>(
        `Backup/${encodeURIComponent(fileName)}`,
        { method: 'DELETE' },
      );
      if (!result.isSuccess) {
        showErrorToast(result.error || t('admin.backupDeleteError'));
        return;
      }
      showSuccessToast(t('admin.backupDeleteSuccess'));
      setItems((prev) => prev.filter((item) => item.fileName !== fileName));
    } catch {
      showErrorToast(t('admin.backupDeleteError'));
    } finally {
      setBusyFile(null);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{t('admin.backupTitle')}</h1>
          <p className="admin-page-subtitle">{t('admin.backupSubtitle')}</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-primary w-full sm:w-auto justify-center"
          onClick={handleCreate}
          disabled={creating || isPending}
        >
          {creating ? t('admin.backupCreating') : t('admin.backupCreate')}
        </button>
      </header>

      <section className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <div className="admin-stat-card">
          <span className="text-[var(--admin-text-muted)] text-xs uppercase tracking-wide">
            {t('admin.backupCount')}
          </span>
          <strong className="text-3xl text-primary">{items.length}</strong>
          <p className="text-[var(--admin-text-muted)] text-sm">
            {t('admin.backupCountHint')}
          </p>
        </div>
        <div className="admin-stat-card sm:col-span-1 xl:col-span-3">
          <span className="font-medium text-[var(--admin-text)]">
            {t('admin.backupHintTitle')}
          </span>
          <p className="max-w-3xl text-[var(--admin-text-muted)] text-sm leading-relaxed">
            {t('admin.backupHint')}
          </p>
        </div>
      </section>

      <section className="admin-panel overflow-hidden">
        <div className="admin-toolbar">
          <div>
            <h2 className="font-semibold text-[var(--admin-text)] text-base">
              {t('admin.backupListTitle')}
            </h2>
            <p className="text-[var(--admin-text-muted)] text-sm">
              {t('admin.backupListSubtitle')}
            </p>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-ghost"
            onClick={loadBackups}
            disabled={isPending || creating}
          >
            {t('admin.backupRefresh')}
          </button>
        </div>

        {isPending && items.length === 0 ? (
          <div className="admin-empty">
            <p className="admin-empty-title">{t('general.loading')}</p>
          </div>
        ) : loadError ? (
          <div className="admin-empty">
            <p className="admin-empty-title">{t('admin.backupLoadError')}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="admin-empty">
            <p className="admin-empty-title">{t('admin.backupEmpty')}</p>
            <p className="text-[var(--admin-text-muted)] text-sm">
              {t('admin.backupEmptyHint')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-[var(--admin-border)] border-b text-[var(--admin-text-muted)] text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 font-medium text-start">
                    {t('admin.backupFileName')}
                  </th>
                  <th className="px-4 py-3 font-medium text-start">
                    {t('admin.backupCreatedAt')}
                  </th>
                  <th className="px-4 py-3 font-medium text-start">
                    {t('admin.backupSize')}
                  </th>
                  <th className="px-4 py-3 font-medium text-end">
                    {t('general.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const isBusy = busyFile === item.fileName;
                  return (
                    <tr
                      key={item.fileName}
                      className="border-[var(--admin-border)] border-b last:border-b-0"
                    >
                      <td className="px-4 py-3 text-[var(--admin-text)] font-medium">
                        {item.fileName}
                      </td>
                      <td className="px-4 py-3 text-[var(--admin-text-muted)]">
                        {formatDate(item.createdAtUtc, locale)}
                      </td>
                      <td className="px-4 py-3 text-[var(--admin-text-muted)]">
                        {formatBytes(item.sizeBytes, locale)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end items-center gap-2">
                          <button
                            type="button"
                            className="admin-btn"
                            disabled={isBusy || creating}
                            onClick={() => handleDownload(item.fileName)}
                          >
                            {t('admin.backupDownload')}
                          </button>
                          <button
                            type="button"
                            className="admin-btn text-[var(--error-color)]"
                            disabled={isBusy || creating}
                            onClick={() => handleDelete(item.fileName)}
                          >
                            {t('general.delete')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-panel overflow-hidden">
        <div className="admin-toolbar">
          <div>
            <h2 className="font-semibold text-[var(--admin-text)] text-base">
              {t('admin.seedTitle')}
            </h2>
            <p className="text-[var(--admin-text-muted)] text-sm">
              {t('admin.seedSubtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={loadSeedStatus}
              disabled={seeding}
            >
              {t('admin.backupRefresh')}
            </button>
            <button
              type="button"
              className="admin-btn"
              disabled={seeding || !seedStatus?.seedsAvailable}
              onClick={() => handleApplySeed(false)}
            >
              {seeding ? t('admin.seedApplying') : t('admin.seedApply')}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              disabled={seeding || !seedStatus?.seedsAvailable}
              onClick={() => handleApplySeed(true)}
            >
              {t('admin.seedApplyClean')}
            </button>
          </div>
        </div>

        <div className="space-y-3 px-4 py-4">
          <p className="text-[var(--admin-text-muted)] text-sm leading-relaxed">
            {t('admin.seedAutoNote')}
          </p>
          {!seedStatus?.seedsAvailable ? (
            <p className="text-[var(--error-color)] text-sm">
              {t('admin.seedUnavailable')}
            </p>
          ) : (
            <>
              <p className="font-medium text-[var(--admin-text)] text-sm">
                {t('admin.seedFilesTitle')}
              </p>
              <ul className="gap-1 grid grid-cols-1 sm:grid-cols-2 text-[var(--admin-text-muted)] text-sm">
                {seedStatus.files.map((file) => (
                  <li key={file} className="font-mono text-xs">
                    {file}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
