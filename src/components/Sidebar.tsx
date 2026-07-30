import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  MapPin, 
  CreditCard, 
  CloudSun, 
  ShieldCheck, 
  ChevronRight, 
  Compass, 
  Layers, 
  Users,
  Menu,
  X
} from 'lucide-react';
import { NavigationTab, UserRole } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  activeLandCount: number;
  pendingReviewCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  userRole,
  onRoleChange,
  isMobileOpen,
  setIsMobileOpen,
  activeLandCount,
  pendingReviewCount
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Dashboard Home',
      icon: LayoutDashboard,
      badge: null,
      description: 'Overview & status'
    },
    {
      id: 'land_portal' as NavigationTab,
      label: 'Land Portal (C of O)',
      icon: FileText,
      badge: pendingReviewCount > 0 ? `${pendingReviewCount} Pending` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      description: 'Multi-step registration'
    },
    {
      id: 'surveyor_map' as NavigationTab,
      label: 'Surveyor Dispatch Map',
      icon: MapPin,
      badge: 'Live GIS',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      description: 'Interactive map & estimates'
    },
    {
      id: 'subscription' as NavigationTab,
      label: 'Subscription & Plans',
      icon: CreditCard,
      badge: 'Upgrade',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      description: 'Freemium & Pro tiers'
    },
    {
      id: 'weather_geo' as NavigationTab,
      label: 'Weather & GPS Tools',
      icon: CloudSun,
      badge: 'GNSS',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      description: 'Satellite & telemetry'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-slate-100 
        flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo & Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onTabChange('dashboard'); setIsMobileOpen(false); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-sky-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
              <Compass className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-white font-sans">GeoEase</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">MVP</span>
              </div>
              <p className="text-xs text-slate-400">PropTech & Cadastral GIS</p>
            </div>
          </div>
          <button 
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security / System Status banner */}
        <div className="mx-4 mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-medium text-emerald-200">Ministry Gateway Live</p>
            <p className="text-emerald-400/80">State Title Registry Synchronized</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Core Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-600/90 to-teal-700/80 text-white shadow-md shadow-emerald-950/40 border border-emerald-500/30' 
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:bg-slate-700'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-none">{item.label}</div>
                    <div className={`text-[11px] mt-1 ${isActive ? 'text-emerald-100/80' : 'text-slate-400'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${item.badgeColor || 'bg-slate-700 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Role Switcher & User Profile */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="mb-3">
            <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase flex items-center justify-between">
              <span>View Perspective</span>
              <Users className="w-3.5 h-3.5 text-slate-500" />
            </label>
            <select
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="mt-1.5 w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="landowner">Landowner / Applicant</option>
              <option value="surveyor">Licensed Field Surveyor</option>
              <option value="ministry">Ministry / Lands Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="User profile" 
                className="w-9 h-9 rounded-full object-cover border border-emerald-500/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Engr. Donald Nwajiaku</p>
              <p className="text-[11px] text-emerald-400 truncate capitalize font-medium">{userRole} Account</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
