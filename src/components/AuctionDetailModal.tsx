import React, { useState, useEffect } from 'react';
import { Auction, Bid, AIInspectionReport, UserRole } from '../types';
import { getNextMinimumBid, getMinimumIncrement } from '../lib/auctionEngine';
import {
  X, Clock, ShieldCheck, Zap, AlertTriangle, Cpu, Gauge, FileText, CheckCircle2,
  History, Sparkles, MapPin, DollarSign, Lock, Play, Pause, AlertCircle
} from 'lucide-react';

interface AuctionDetailModalProps {
  auction: Auction;
  bids: Bid[];
  onClose: () => void;
  onPlaceBid: (auctionId: string, amount: number, maxProxy?: number) => Promise<void>;
  onBuyNow: (auctionId: string) => Promise<void>;
  userRole: UserRole;
  onTogglePause?: (auctionId: string) => Promise<void>;
}

export const AuctionDetailModal: React.FC<AuctionDetailModalProps> = ({
  auction,
  bids,
  onClose,
  onPlaceBid,
  onBuyNow,
  userRole,
  onTogglePause
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(auction.images[0] || '');
  const [activeTab, setActiveTab] = useState<'bidding' | 'specs' | 'history' | 'ai_inspect'>('bidding');

  // Bid Form state
  const nextMin = getNextMinimumBid(auction);
  const minInc = getMinimumIncrement(auction.currentBid);
  const [bidAmount, setBidAmount] = useState<number>(nextMin);
  const [maxProxy, setMaxProxy] = useState<number | ''>('');
  const [enableProxy, setEnableProxy] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Gemini AI Report state
  const [aiReport, setAiReport] = useState<AIInspectionReport | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Sync min bid
  useEffect(() => {
    setBidAmount(getNextMinimumBid(auction));
  }, [auction.currentBid]);

  // Live Timer
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  useEffect(() => {
    const updateTimer = () => {
      const diff = new Date(auction.endTime).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeftStr('AUCTION CLOSED');
        setIsUrgent(false);
        return;
      }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeftStr(`${hrs}h ${mins}m ${secs}s`);
      setIsUrgent(hrs === 0 && mins < 10);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [auction.endTime]);

  // Handle Bid submit
  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (bidAmount < nextMin) {
      setErrorMessage(`Bid must be at least $${nextMin.toLocaleString()}`);
      return;
    }

    try {
      setIsSubmitting(true);
      const proxyCeiling = enableProxy && typeof maxProxy === 'number' && maxProxy > bidAmount ? maxProxy : undefined;
      await onPlaceBid(auction.id, bidAmount, proxyCeiling);
      setSuccessMessage(`Success! High bid of $${bidAmount.toLocaleString()} recorded.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to place bid');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch AI Inspection
  const fetchAiInspection = async () => {
    if (aiReport || isLoadingAi) return;
    try {
      setIsLoadingAi(true);
      const res = await fetch('/api/ai/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spec: auction.spec,
          title: auction.title,
          currentBid: auction.currentBid,
          conditionRating: auction.conditionRating
        })
      });
      const data = await res.json();
      if (data.report) setAiReport(data.report);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-lg uppercase">
              {auction.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">VIN: {auction.spec.vin}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Admin Pause Button */}
            {userRole === 'ADMIN' && onTogglePause && auction.status === 'LIVE' && (
              <button
                onClick={() => onTogglePause(auction.id)}
                className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold hover:bg-rose-500/30"
              >
                <Pause className="w-3.5 h-3.5" /> Emergency Pause
              </button>
            )}
            {userRole === 'ADMIN' && onTogglePause && auction.status === 'PAUSED' && (
              <button
                onClick={() => onTogglePause(auction.id)}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold hover:bg-emerald-500/30"
              >
                <Play className="w-3.5 h-3.5" /> Resume Auction
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery & Bike Quick Highlights */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Primary Main Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={selectedImage || auction.images[0]}
                alt={auction.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-amber-400 border border-amber-500/30">
                {auction.spec.year} {auction.spec.make} {auction.spec.model}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {auction.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {auction.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === imgUrl ? 'border-amber-400 ring-2 ring-amber-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specs Quick Strip */}
            <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-xs">
              <div>
                <div className="text-slate-400 font-medium">Odometer</div>
                <div className="font-bold text-slate-200 mt-0.5">{auction.spec.odometerMiles.toLocaleString()} miles</div>
              </div>
              <div>
                <div className="text-slate-400 font-medium">Engine CC</div>
                <div className="font-bold text-slate-200 mt-0.5">{auction.spec.engineCc} cc</div>
              </div>
              <div>
                <div className="text-slate-400 font-medium">Title Status</div>
                <div className="font-bold text-emerald-400 mt-0.5">{auction.spec.titleStatus}</div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-xs flex items-center justify-between">
              <div>
                <div className="text-slate-400">Seller / Dealer</div>
                <div className="font-bold text-slate-200 flex items-center gap-1.5 mt-0.5">
                  {auction.sellerName}
                  <span className="text-amber-400 font-mono">★ {auction.sellerRating}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-400">Location</div>
                <div className="font-medium text-slate-300">{auction.spec.location}</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Console & Detailed Tabs */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                {auction.title}
              </h1>
            </div>

            {/* Live Timer & Reserve Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Current Price</div>
                <div className="text-3xl font-black text-amber-400 tracking-tight mt-0.5">
                  ${auction.currentBid.toLocaleString()}
                </div>
                <div className="text-xs font-semibold mt-1">
                  {auction.reserveMet ? (
                    <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Reserve Met</span>
                  ) : (
                    <span className="text-amber-500">Reserve Not Met (${auction.reservePrice.toLocaleString()})</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Time Remaining</div>
                <div className={`text-xl font-black font-mono mt-1 ${isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-100'}`}>
                  {timeLeftStr}
                </div>
                {auction.softCloseExtendedCount ? (
                  <div className="text-[10px] text-amber-400 font-semibold mt-1">
                    ⚡ Soft-Close Extended (+{auction.softCloseExtendedCount * 2}m)
                  </div>
                ) : null}
              </div>
            </div>

            {/* Navigation Tab Bar */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
              <button
                onClick={() => setActiveTab('bidding')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'bidding' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                Live Bidding
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'specs' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Bike Specs
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'history' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                Bid History ({bids.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('ai_inspect');
                  fetchAiInspection();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'ai_inspect' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Valuation
              </button>
            </div>

            {/* TAB 1: Live Bidding Console */}
            {activeTab === 'bidding' && (
              <div className="space-y-4">
                {auction.status === 'LIVE' ? (
                  <form onSubmit={handleBidSubmit} className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                    
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Minimum Increment: <strong className="text-amber-400">+${minInc}</strong></span>
                      <span>Next Min Valid Bid: <strong className="text-emerald-400">${nextMin.toLocaleString()}</strong></span>
                    </div>

                    {/* Quick Bid Adders */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setBidAmount(nextMin)}
                        className="py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-slate-200 border border-slate-700 transition-colors"
                      >
                        Exact Min (${nextMin.toLocaleString()})
                      </button>
                      <button
                        type="button"
                        onClick={() => setBidAmount(nextMin + minInc)}
                        className="py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-slate-200 border border-slate-700 transition-colors"
                      >
                        +${minInc} (${(nextMin + minInc).toLocaleString()})
                      </button>
                      <button
                        type="button"
                        onClick={() => setBidAmount(nextMin + minInc * 2)}
                        className="py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-slate-200 border border-slate-700 transition-colors"
                      >
                        +${minInc * 2} (${(nextMin + minInc * 2).toLocaleString()})
                      </button>
                    </div>

                    {/* Custom Bid Amount Input */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Custom Bid Amount ($USD)</label>
                      <input
                        type="number"
                        min={nextMin}
                        step={minInc}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-lg font-black text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    {/* Proxy Auto-Bid Ceiling Option */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enableProxy}
                          onChange={(e) => setEnableProxy(e.target.checked)}
                          className="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0"
                        />
                        Enable Proxy Auto-Bidding (Set Maximum Limit)
                      </label>
                      
                      {enableProxy && (
                        <div>
                          <input
                            type="number"
                            placeholder={`Max Ceiling (e.g. $${(bidAmount + minInc * 5).toLocaleString()})`}
                            value={maxProxy}
                            onChange={(e) => setMaxProxy(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 focus:outline-none focus:border-amber-500 font-mono"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            The system will automatically place bids on your behalf up to this maximum limit.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Feedback Messages */}
                    {errorMessage && (
                      <div className="p-3 bg-rose-950/80 text-rose-300 text-xs rounded-xl border border-rose-500/40 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        {errorMessage}
                      </div>
                    )}
                    {successMessage && (
                      <div className="p-3 bg-emerald-950/80 text-emerald-300 text-xs rounded-xl border border-emerald-500/40 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        {successMessage}
                      </div>
                    )}

                    {/* Submit Bid Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing Transaction...' : `Confirm & Place Bid ($${bidAmount.toLocaleString()})`}
                    </button>

                  </form>
                ) : (
                  <div className="p-6 bg-slate-950 rounded-2xl text-center border border-slate-800 space-y-2">
                    <Lock className="w-8 h-8 text-slate-500 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-200">Auction is {auction.status}</h4>
                    <p className="text-xs text-slate-400">Bidding is closed for this listing.</p>
                  </div>
                )}

                {/* Instant Buy-It-Now Option */}
                {auction.buyItNowPrice && auction.status === 'LIVE' && (
                  <div className="p-4 bg-gradient-to-r from-amber-950/40 to-orange-950/40 rounded-2xl border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-current" /> Instant Buy-It-Now
                      </div>
                      <div className="text-xs text-slate-300">Bypass bidding and win immediately</div>
                    </div>
                    <button
                      onClick={() => onBuyNow(auction.id)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
                    >
                      Buy Now for ${auction.buyItNowPrice.toLocaleString()}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Bike Specs Sheet */}
            {activeTab === 'specs' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div><span className="text-slate-400">Make / Model:</span> <strong className="text-white">{auction.spec.make} {auction.spec.model}</strong></div>
                  <div><span className="text-slate-400">Year:</span> <strong className="text-white">{auction.spec.year}</strong></div>
                  <div><span className="text-slate-400">Transmission:</span> <strong className="text-white">{auction.spec.transmission}</strong></div>
                  <div><span className="text-slate-400">Horsepower:</span> <strong className="text-white">{auction.spec.horsepower || 'N/A'} hp</strong></div>
                  <div><span className="text-slate-400">Frame Condition:</span> <strong className="text-emerald-400">{auction.spec.frameCondition}</strong></div>
                  <div><span className="text-slate-400">Title Status:</span> <strong className="text-emerald-400">{auction.spec.titleStatus}</strong></div>
                </div>

                {/* Modifications List */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider">Aftermarket & Modifications</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {auction.spec.modifications.map((mod, i) => (
                      <li key={i}>{mod}</li>
                    ))}
                  </ul>
                </div>

                {/* Service History */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider">Service History</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {auction.spec.serviceHistory.map((srv, i) => (
                      <li key={i}>{srv}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: Bid History Table */}
            {activeTab === 'history' && (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {bids.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No bids recorded yet. Be the first to bid!</p>
                ) : (
                  bids.map((b) => (
                    <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-200 flex items-center gap-2">
                          {b.bidderName}
                          {b.status === 'LEADING' && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded">HIGH BIDDER</span>
                          )}
                          {b.status === 'BUY_NOW' && (
                            <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold rounded">BUY NOW</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {new Date(b.timestamp).toLocaleTimeString()} • {new Date(b.timestamp).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="text-right font-mono font-bold text-amber-400 text-sm">
                        ${b.amount.toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 4: Gemini AI Inspection & Valuation */}
            {activeTab === 'ai_inspect' && (
              <div className="space-y-4 text-xs">
                {isLoadingAi ? (
                  <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                    <p className="text-slate-300 font-medium">Gemini AI mechanical inspector analyzing listing specs & historical sales...</p>
                  </div>
                ) : aiReport ? (
                  <div className="space-y-4">
                    
                    {/* Valuation Banner */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-slate-400 font-medium">Estimated Fair Market Value</div>
                        <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                          ${aiReport.estimatedMarketValue.min.toLocaleString()} - ${aiReport.estimatedMarketValue.max.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 font-medium">Condition Score</div>
                        <div className="text-xl font-extrabold text-amber-400 mt-0.5">
                          {aiReport.conditionScore} / 100
                        </div>
                      </div>
                    </div>

                    {/* Key Highlights & Risks */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-1">
                        <h5 className="font-bold text-emerald-400">Key Highlights</h5>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {aiReport.keyHighlights.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      </div>
                      <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl space-y-1">
                        <h5 className="font-bold text-rose-400">Mechanical Risks to Inspect</h5>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {aiReport.potentialRisks.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    </div>

                    {/* Verdict Summary */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <h5 className="font-bold text-slate-200 uppercase tracking-wider">Expert Verdict Summary</h5>
                      <p className="text-slate-300 leading-relaxed">{aiReport.verdictSummary}</p>
                    </div>

                  </div>
                ) : null}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
