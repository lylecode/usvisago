import Link from "next/link";
import React from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const NavLink = ({ href, children, className }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`hover:text-blue-600 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
