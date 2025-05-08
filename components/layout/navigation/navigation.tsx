'use client';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';

const Navigation = () => {
  return (
    <nav className="flex h-20 items-center justify-between">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">USVisa</span>
          <span className="italic text-foreground">Go</span>
        </span>
      </Link>

      <HeaderMenu />

      {/* <div className="flex items-center gap-8 text-base font-medium text-neutral-800">
        <Link href="#" className="hover:text-blue-600 transition-colors">
          帮助中心
        </Link>

        <Link
          href="#"
          className="rounded-md border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
        >
          现在订阅
        </Link>

        <Link href="#" className="hover:text-blue-600 transition-colors">
          我的服务
        </Link>

        <span className="mx-2 text-neutral-200">|</span>

        <NavLink href="#">简体中文</NavLink>
      </div> */}
    </nav>
  );
};

export default Navigation;
