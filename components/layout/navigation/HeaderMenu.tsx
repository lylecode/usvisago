import { headerData } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function HeaderMenu() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 text-base text-neutral-800 md:gap-10">
      <Link href="/" className="md:hidden">
        首页
      </Link>
      {headerData.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`hoverEffect hover:text-blue-600 ${pathname === item?.href && 'text-black'}`}>
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default HeaderMenu;
