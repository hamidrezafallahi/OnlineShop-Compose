import 'server-only';

import {
  configResponse,
  menuResponse,
} from '@models/config';

import {
  apiBaseServerSideUrl,
  apiBaseUrl,
} from './api';

export async function getConfig(configName: string) {
    const res = await fetch(`${apiBaseUrl}/configs/configName`
        , {
            cache: "no-store",
        });
    const data: configResponse = await res.json();
    return data;
}
export async function getMenu() {
     const res = await fetch(`${apiBaseServerSideUrl}/EntityConfigs/menu`
        , {
            cache: "no-store",
        });
     const data: menuResponse = await res.json();
    return data;
}