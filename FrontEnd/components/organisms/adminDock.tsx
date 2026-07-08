import { jwtDecode } from 'jwt-decode';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { MenuIcon } from '@components/atoms/iconComponents';
import { TokenPayload } from '@components/templates/register/type';

export default async function AdminDock() {
  const locale = await getLocale()
  const menu = [
    { label: "Dashboard", href: `/${locale}/admin`, icon: <MenuIcon /> },
    { label: "Users", href: `/${locale}/admin/users`, icon: <MenuIcon /> },
    { label: "Products", href: `/${locale}/admin/products`, icon: <MenuIcon /> },
    { label: "Orders", href: `/${locale}/admin/orders`, icon: <MenuIcon /> },
  ];
   const cookieStore =await cookies();
  const token = cookieStore.get('candyAccess')?.value;
   const decoded: TokenPayload = token ? jwtDecode(token):{
  role: 'Customer',
  name: 'Customer',
  email: 'Customer'
};
console.log(decoded)
   switch (decoded.role) {
    case "SuperAdmin":
       return (
      <div className="bottom-4 left-1/2 z-20 fixed flex justify-between items-center gap-3 bg-neutral-800/80 shadow-xl backdrop-blur-lg px-3 xs:px-5 py-2 xs:py-3 border border-neutral-700 rounded-2xl w-[95%] xs:w-auto -translate-x-1/2">
        <div className="hidden xs:flex justify-center items-center bg-black rounded-xl w-12 h-12 font-bold text-white text-2xl">
          W<span className="text-xl">.</span>
        </div>
  
        {/* آیتم‌ها */}
        <nav className="flex flex-1 justify-around xs:justify-center items-center gap-1 xs:gap-3">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex xs:flex-row flex-col justify-center items-center gap-1 xs:gap-2 hover:bg-neutral-700/70 px-3 xs:px-5 py-2 xs:py-2 rounded-xl text-gray-300 hover:text-white text-xs xs:text-sm transition-all"
            >
              <span className="text-white">{item.icon}</span>
              <span className="hidden xs:inline-block text-neutral">{item.label}</span>
            </Link>
          ))}
        </nav>
  
         <Link
          href={`/${locale}`}
          className="hidden xs:flex bg-neutral-200 hover:bg-white ml-3 px-6 py-2 rounded-xl font-medium text-black transition-all"
        >
          Landing
        </Link>
      </div>
    );
 
   
    default:
      return
   }
   
}
