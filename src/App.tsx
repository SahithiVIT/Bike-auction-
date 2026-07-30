import React, { useState, useEffect } from 'react';
import { Auction, Bid, SystemMetric, SystemLog, UserRole, BikeCategory } from './types';
import { Navbar } from './components/Navbar';
import { AuctionCard } from './components/AuctionCard';
import { AuctionDetailModal } from './components/AuctionDetailModal';
import { CreateAuctionModal } from './components/CreateAuctionModal';
import { AdminOpsDashboard } from './components/AdminOpsDashboard';
import { TestRunnerView } from './components/TestRunnerView';
import { ArchitectureDocsView } from './components/ArchitectureDocsView';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { NotificationBanner, ToastNotification } from './components/NotificationBanner';
import { Search, Filter, RefreshCw, Zap, Bike, ShieldCheck, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'auctions' | 'analytics' | 'tests' | 'docs'>('auctions');
  const [userRole, setUserRole] = useState<UserRole>('BUYER');

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Watchlist State
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('motobid_watchlist');
      return saved ? JSON.parse(saved) : ['auc-001', 'auc-003'];
    } catch {
      return ['auc-001', 'auc-003'];
    }
  });
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);

  // Modal State
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [selectedBids, setSelectedBids] = useState<Bid[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // Telemetry & Logs
  const [metrics, setMetrics] = useState<SystemMetric | null>(null);
  const [logs, setLogs] = useState<SystemLog[]>([]);

  // Toast Notifications
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const addNotification = (type: 'BID' | 'SOFT_CLOSE' | 'SOLD', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setNotifications(prev => [{ id, type, title, message }, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);
  };

  // Save watchlist
  useEffect(() => {
    localStorage.setItem('motobid_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (auctionId: string) => {
    setWatchlist(prev =>
      prev.includes(auctionId) ? prev.filter(id => id !== auctionId) : [...prev, auctionId]
    );
  };

  // Fetch All Auctions
  const fetchAuctions = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('search', searchQuery);
      if (selectedCategory !== 'ALL') queryParams.append('category', selectedCategory);
      if (selectedStatus !== 'ALL') queryParams.append('status', selectedStatus);

      const res = await fetch(`/api/auctions?${queryParams.toString()}`);
      const data = await res.json();
      if (data.auctions) setAuctions(data.auctions);
    } catch (err) {
      console.error('Failed to fetch auctions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Metrics & Logs
  const fetchTelemetry = async () => {
    try {
      const [mRes, lRes] = await Promise.all([
        fetch('/api/metrics'),
        fetch('/api/logs')
      ]);
      const mData = await mRes.json();
      const lData = await lRes.json();
      if (mData) setMetrics(mData);
      if (lData.logs) setLogs(lData.logs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAuctions();
    fetchTelemetry();
  }, [searchQuery, selectedCategory, selectedStatus]);

  // Connect to SSE Real-Time Event Stream
  useEffect(() => {
    const eventSource = new EventSource('/api/stream');

    eventSource.addEventListener('bid_placed', (e: any) => {
      const data = JSON.parse(e.data);
      const { auction, newBid, softCloseTriggered } = data;

      setAuctions(prev => prev.map(a => a.id === auction.id ? auction : a));

      // Update selected modal if viewing same auction
      setSelectedAuction(curr => curr && curr.id === auction.id ? auction : curr);
      setSelectedBids(prev => [newBid, ...prev]);

      // Add Notification
      addNotification(
        'BID',
        `New High Bid: $${newBid.amount.toLocaleString()}`,
        `Placement on "${auction.title}" by ${newBid.bidderName}`
      );

      if (softCloseTriggered) {
        addNotification(
          'SOFT_CLOSE',
          '⚡ Anti-Sniping Soft Close Triggered!',
          `Auction duration extended by 2 minutes for "${auction.title}".`
        );
      }

      fetchTelemetry();
    });

    eventSource.addEventListener('auction_created', (e: any) => {
      const newAuction = JSON.parse(e.data);
      setAuctions(prev => [newAuction, ...prev]);
      addNotification('BID', 'New Listing Published', newAuction.title);
      fetchTelemetry();
    });

    eventSource.addEventListener('auction_updated', (e: any) => {
      const updated = JSON.parse(e.data);
      setAuctions(prev => prev.map(a => a.id === updated.id ? updated : a));
      setSelectedAuction(curr => curr && curr.id === updated.id ? updated : curr);
    });

    eventSource.addEventListener('auction_sold', (e: any) => {
      const data = JSON.parse(e.data);
      setAuctions(prev => prev.map(a => a.id === data.auction.id ? data.auction : a));
      setSelectedAuction(curr => curr && curr.id === data.auction.id ? data.auction : curr);
      addNotification('SOLD', '⚡ Auction Sold Instant Buy-Now!', data.auction.title);
    });

    eventSource.addEventListener('log_event', (e: any) => {
      const newLog = JSON.parse(e.data);
      setLogs(prev => [newLog, ...prev.slice(0, 199)]);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  // Fetch Bids when selecting an auction
  const handleSelectAuction = async (auction: Auction) => {
    setSelectedAuction(auction);
    try {
      const res = await fetch(`/api/auctions/${auction.id}`);
      const data = await res.json();
      if (data.bids) setSelectedBids(data.bids);
    } catch (err) {
      console.error(err);
    }
  };

  // Place Bid action
  const handlePlaceBid = async (auctionId: string, amount: number, maxProxy?: number) => {
    const res = await fetch(`/api/auctions/${auctionId}/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bidderId: 'usr-buyer-01',
        bidderName: userRole === 'ADMIN' ? 'Admin_Ops' : 'Live_Bidder',
        amount,
        maxProxyAmount: maxProxy
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to place bid');
    }
  };

  // Buy Now action
  const handleBuyNow = async (auctionId: string) => {
    const res = await fetch(`/api/auctions/${auctionId}/buy-now`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bidderId: 'usr-buyer-01',
        bidderName: 'Instant_Buyer'
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Buy-Now failed');
    }
  };

  // Create Listing action
  const handleCreateAuction = async (auctionData: any) => {
    const res = await fetch('/api/auctions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auctionData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create auction');
  };

  // Admin Pause Toggle
  const handleTogglePause = async (auctionId: string) => {
    const res = await fetch(`/api/auctions/${auctionId}/toggle-pause`, {
      method: 'POST'
    });
    const data = await res.json();
    if (!res.ok) console.error(data.error);
  };

  // Trigger Simulated Bot Bid
  const handleTriggerSimulatedBid = async () => {
    await fetch('/api/simulation/trigger-bid', { method: 'POST' });
  };

  const activeAuctionsCount = auctions.filter(a => a.status === 'LIVE').length;
  const totalGMV = metrics?.totalGMV || auctions.reduce((acc, a) => acc + a.currentBid, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        activeAuctionsCount={activeAuctionsCount}
        totalGMV={totalGMV}
      />

      {/* Main Container Views */}
      <main className="flex-1">
        
        {/* TAB 1: AUCTIONS BROWSER VIEW */}
        {activeTab === 'auctions' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            
            {/* Hero Banner Strip */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5" /> High-End Motorcycle Auctions
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Discover & Bid on Premium Motorcycles
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Real-time bidding, proxy auto-bids, verified VIN inspection specs, and anti-sniping soft close time protection.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
                  <div className="text-xl font-black text-amber-400 font-mono">{activeAuctionsCount}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Auctions</div>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
                  <div className="text-xl font-black text-emerald-400 font-mono">${totalGMV.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Volume</div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search Bar Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Make, Model, Year, VIN, or Location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              {/* Category Pills & Status Filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                
                {/* Status Dropdown */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-amber-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="LIVE">Live Now</option>
                  <option value="UPCOMING">Upcoming</option>
                  <option value="SOLD">Ended / Sold</option>
                </select>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
                  {['ALL', 'Sport', 'Cruiser', 'Adventure', 'Cafe Racer', 'Vintage', 'Naked'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

              </div>

            </div>

            {/* Auction Items Cards Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 bg-slate-900 rounded-2xl animate-pulse border border-slate-800" />
                ))}
              </div>
            ) : auctions.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
                <Bike className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No auctions found</h3>
                <p className="text-xs text-slate-400">Try adjusting search query or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onSelect={handleSelectAuction}
                    isWatchlisted={watchlist.includes(auction.id)}
                    onToggleWatchlist={toggleWatchlist}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: OPS & TELEMETRY VIEW */}
        {activeTab === 'analytics' && (
          <AdminOpsDashboard
            metrics={metrics}
            logs={logs}
            auctions={auctions}
            onTriggerSimulatedBid={handleTriggerSimulatedBid}
            onTogglePauseAuction={handleTogglePause}
            onRefreshMetrics={fetchTelemetry}
          />
        )}

        {/* TAB 3: SYSTEM INTEGRATION TEST RUNNER */}
        {activeTab === 'tests' && <TestRunnerView />}

        {/* TAB 4: ARCHITECTURE SPECS & DOCS */}
        {activeTab === 'docs' && <ArchitectureDocsView />}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="font-semibold text-slate-400">
            MotoBid Production Platform • Built for Software Engineering Internship Deliverables
          </p>
          <p className="text-[11px] text-slate-600">
            Powered by Express, React 19, Tailwind CSS v4, Server-Sent Events, and Gemini AI.
          </p>
        </div>
      </footer>

      {/* Detail Modal Overlay */}
      {selectedAuction && (
        <AuctionDetailModal
          auction={selectedAuction}
          bids={selectedBids}
          onClose={() => setSelectedAuction(null)}
          onPlaceBid={handlePlaceBid}
          onBuyNow={handleBuyNow}
          userRole={userRole}
          onTogglePause={handleTogglePause}
        />
      )}

      {/* Create Listing Modal Overlay */}
      {isCreateModalOpen && (
        <CreateAuctionModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateAuction}
        />
      )}

      {/* Saved Watchlist Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistAuctions={auctions.filter(a => watchlist.includes(a.id))}
        onSelectAuction={handleSelectAuction}
        onRemoveFromWatchlist={toggleWatchlist}
      />

      {/* Toast Notifications */}
      <NotificationBanner
        notifications={notifications}
        onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
      />

    </div>
  );
}
