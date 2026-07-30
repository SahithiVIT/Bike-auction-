import React from 'react';
import { UserRole } from '../types';
import { Bike, Shield, Activity, FileCode, CheckCircle2, Eye, PlusCircle, Bookmark } from 'lucide-react';

interface NavbarProps {
  activeTab: 'auctions' | 'analytics' | 'tests' | 'docs';
  setActiveTab: (tab: 'auctions' | 'analytics' | 'tests' | 'docs') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenCreateModal: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  activeAuctionsCount: number;
  totalGMV: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenCreateModal,
  watchlistCount,
  onOpenWatchlist,
  activeAuctionsCount,
  totalGMV
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Status */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('auctions')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Bike className="w-6 h-6 text-slate-950 font-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    Moto<span className="text-amber-400">Bid</span>
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                    PROD v2.4
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">Live Motorcycle Auction Engine</p>
              </div>
            </button>

            {/* Live Status Indicator */}
            <div className="hidden lg:flex items-center gap-4 border-l border-slate-800 pl-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-medium text-emerald-400">{activeAuctionsCount} Live Auctions</span>
              </div>
              <div className="text-slate-500">|</div>
              <div>
                <span className="text-slate-400">Platform GMV: </span>
                <span className="font-bold text-amber-400">${totalGMV.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('auctions')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'auctions'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              Auctions
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Ops & Telemetry
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'tests'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Automated Tests
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'docs'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              Architecture Specs
            </button>
          </nav>

          {/* Action Tools & User Persona Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Watchlist button */}
            <button
              onClick={onOpenWatchlist}
              className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700/60"
              title="View Watchlist"
            >
              <Bookmark className="w-4 h-4" />
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {watchlistCount}
                </span>
              )}
            </button>

            {/* Create Listing (Admin or Seller) */}
            <button
              onClick={onOpenCreateModal}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 transition-all shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              List Motorcycle
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setUserRole('BUYER')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  userRole === 'BUYER'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3 h-3" />
                Buyer
              </button>
              <button
                onClick={() => setUserRole('ADMIN')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  userRole === 'ADMIN'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-3 h-3" />
                Admin Ops
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-950 border-t border-slate-800/80 px-2 py-2 text-xs">
        <button
          onClick={() => setActiveTab('auctions')}
          className={`px-3 py-1 rounded-md font-medium ${activeTab === 'auctions' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          Auctions
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-3 py-1 rounded-md font-medium ${activeTab === 'analytics' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          Ops
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-3 py-1 rounded-md font-medium ${activeTab === 'tests' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          Tests
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`px-3 py-1 rounded-md font-medium ${activeTab === 'docs' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          Specs
        </button>
      </div>
    </header>
  );
};
