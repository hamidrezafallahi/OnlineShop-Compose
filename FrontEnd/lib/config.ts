import 'server-only';

import {
  configResponse,
  menuResponse,
} from '@models/config';

import {
  serverApiBaseUrl,
} from './api';

export async function getConfig(configName: string) {
  try {
    const res = await fetch(`${serverApiBaseUrl}/configs/${configName}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`getConfig failed: ${res.status} ${serverApiBaseUrl}/configs/${configName}`);
      return { config: '' } as configResponse;
    }
    return (await res.json()) as configResponse;
  } catch (e) {
    console.error(`getConfig error for ${configName}`, e);
    return { config: '' } as configResponse;
  }
}

export async function getMenu(): Promise<menuResponse> {
  try {
    const res = await fetch(`${serverApiBaseUrl}/EntityConfigs/menu`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(
        `getMenu failed: ${res.status} ${serverApiBaseUrl}/EntityConfigs/menu`,
      );
      return { data: [] };
    }
    const data = (await res.json()) as menuResponse;
    return { data: Array.isArray(data?.data) ? data.data : [] };
  } catch (e) {
    console.error('getMenu error', e);
    return { data: [] };
  }
}