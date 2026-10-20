'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME } from '@/lib/site';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
  { name: 'Notifications', href: '/admin/notifications', icon: 'notifications' },
  { name: 'Members', href: '/admin/members', icon: 'group' },
  { name: 'Attendance', href: '/admin/attendance', icon: 'fact_check' },
  { name: 'Staff', href: '/admin/staff', icon: 'badge' },
  { name: 'Transactions', href: '/admin/transactions', icon: 'payments' },
  { name: 'Audit Log', href: '/admin/audit-log', icon: 'history' },
  { name: 'Services', href: '/admin/services', icon: 'category' },
  { name: 'Catalog', href: '/admin/catalog', icon: 'inventory_2' },
  { name: 'Schedule', href: '/admin/schedule', icon: 'calendar_month' },
  { name: 'Potential Customers', href: '/admin/potential-customers', icon: 'person_add' },
  { name: 'SMS', href: '/admin/sms', icon: 'sms' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface-dark border-r border-surface-dark-lighter z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-surface-dark-lighter">
            <Link href="/admin/dashboard" className="flex flex-col items-start gap-1.5" onClick={onClose}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-wordmark.png" alt={SITE_NAME} className="h-6 w-auto object-contain" />
              <p className="text-white/60 text-xs">Admin Panel</p>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-white/60 hover:bg-surface-dark-lighter hover:text-white'
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

        </div>
      </aside>
    </>
  );
}





