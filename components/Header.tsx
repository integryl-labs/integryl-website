"use client";

/* eslint-disable @next/next/no-img-element -- brand SVGs, served as-is */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { darkHeaderRoutes, nav } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dark = darkHeaderRoutes.includes(pathname);
  const close = () => setOpen(false);

  return (
    <header className={`site-header${dark ? " site-header--dark" : ""}${open ? " open" : ""}`}>
      <div className="wrap header-inner">
        <Link className="brand" href="/" aria-label="Integryl home" onClick={close}>
          <img className="logo-light" src="/img/header-logo-light-background.svg" alt="Integryl" width={131} height={46} />
          <img className="logo-dark" src="/img/header-logo-dark-background.svg" alt="Integryl" width={131} height={46} />
        </Link>
        <nav className="site-nav" id="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn--sm" href="/engage" onClick={close}>
          Engage
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>
    </header>
  );
}
