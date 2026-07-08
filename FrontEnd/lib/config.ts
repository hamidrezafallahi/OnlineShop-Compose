import 'server-only';

import {
  configResponse,
  menuResponse,
} from '@models/config';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export async function getConfig(configName: string) {
    const res = await fetch(`${baseUrl}api/configs/configName`
        , {
            cache: "no-store",
        });
    const data: configResponse = await res.json();
    return data;
}
export async function getMenu() {
    const res = await fetch(`${baseUrl}api/EntityConfigs/menu`
        , {
            cache: "no-store",
        });
    const data: menuResponse = await res.json();
    return data;
}