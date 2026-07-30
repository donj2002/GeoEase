import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Compass, 
  Menu, 
  Radio, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Satellite, 
  ShieldAlert,
  ChevronDown,
  X
} from 'lucide-react';
import { NotificationItem, NavigationTab } from '../types';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenRegisterModal: () => void;
  onOpenSurveyorModal: () => void;
  onNavigate: (tab: NavigationTab) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onOpenRegisterModal,
  onOpenSurveyorModal,
  onNavigate,
  notifications,
  onMarkNotificationRead,
  searchQuery,
  setSearchQuery
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Mobile Toggle & Brand Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>GNSS RTK Fix: <strong className="text-emerald-400">3D Sub-Meter (0.35m)</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/50 px-2.5 py-1.5 rounded-lg border border-slate-800">
            <Satellite className="w-3.5 h-3.5 text-sky-400" />
            <span>22 Sats Locked</span>
          </div>
        </div>
      </div>

      {/* Global Land & Beacon Search */}
      <div className="flex-1 max-w-md relative hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search land parcel, beacon ID (BC/2026/...), or LGA..."
            className="w-full bg-slate-950/80 border border-slate-700/80 text-slate-100 text-xs rounded-xl pl-9 pr-8 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none placeholder-slate-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons & Notifications */}
      <div className="flex items-center gap-2.5">
        {/* Quick Request Surveyor CTA */}
        <button
          onClick={onOpenSurveyorModal}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3.5 py-2 rounded-xl shadow-md shadow-emerald-950/50 flex items-center gap-2 transition-all border border-emerald-400/30"
        >
          <Compass className="w-4 h-4 text-emerald-100" />
          <span className="hidden sm:inline">Request Surveyor</span>
        </button>

        {/* Quick New C of O Land Registration */}
        <button
          onClick={onOpenRegisterModal}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Register Land</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-xs text-white">System Alerts & Cadastral Updates</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {unreadCount} Unread
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-3.5 hover:bg-slate-800/60 transition-colors cursor-pointer flex gap-3 ${!notif.read ? 'bg-emerald-950/20' : ''}`}
                    >
                      <div className="mt-0.5">
                        {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {notif.type === 'dispatch' && <Compass className="w-4 h-4 text-sky-400" />}
                        {notif.type === 'info' && <Clock className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-200 truncate">{notif.title}</p>
                          <span className="text-[10px] text-slate-500 shrink-0">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-800 bg-slate-950/80 text-center">
                <button 
                  onClick={() => {
                    onNavigate('land_portal');
                    setShowNotifDropdown(false);
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  View All Registrations & Activity Log →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
