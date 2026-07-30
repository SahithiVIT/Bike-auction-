import React, { useState, useEffect } from 'react';
import { Auction } from '../types';
import { Clock, Tag, Eye, Bookmark, Zap, MapPin, Gauge } from 'lucide-react';

interface AuctionCardProps {
  auction: Auction;
  onSelect: (auction: Auction) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (auctionId: string) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({
  auction,
  onSelect,
  isWatchlisted,
  onToggleWatchlist
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isExpired: boolean }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const end = new Date(auction.endTime).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, isExpired: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [auction.endTime]);

  const isUrgent = !timeLeft.isExpired && timeLeft.hours === 0 && timeLeft.minutes < 15;

  return (
    <div
      onClick={() => onSelect(auction)}
      className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Banner Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={auction.images[0]}
          alt={auction.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Badge & Status */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 rounded-lg">
            {auction.category}
          </span>
          {auction.status === 'LIVE' && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-500/90 text-slate-950 rounded-lg flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
              LIVE
            </span>
          )}
          {auction.status === 'SOLD' && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-purple-600 text-white rounded-lg">
              SOLD
            </span>
          )}
          {auction.status === 'UPCOMING' && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-sky-600 text-white rounded-lg">
              UPCOMING
            </span>
          )}
        </div>

        {/* Watchlist Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(auction.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-colors ${
            isWatchlisted
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:text-white'
          }`}
          title="Toggle Watchlist"
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Countdown Timer overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md font-mono font-bold border ${
              isUrgent
                ? 'bg-rose-950/90 text-rose-400 border-rose-500/50 animate-pulse'
                : 'bg-slate-900/85 text-slate-200 border-slate-700/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {timeLeft.isExpired ? (
              <span>Auction Closed</span>
            ) : (
              <span>
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            )}
          </div>

          {auction.softCloseExtendedCount && auction.softCloseExtendedCount > 0 ? (
            <span className="px-2 py-1 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg">
              Soft-Close +{auction.softCloseExtendedCount * 2}m
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">{auction.spec.year} {auction.spec.make}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {auction.spec.odometerMiles.toLocaleString()} mi</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {auction.spec.location}</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {auction.title}
          </h3>
        </div>

        {/* Price & Bidding Status Box */}
        <div className="pt-3 border-t border-slate-800/80 flex items-end justify-between">
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {auction.status === 'SOLD' ? 'Winning Bid' : 'Current High Bid'}
            </div>
            <div className="text-2xl font-black text-amber-400 tracking-tight">
              ${auction.currentBid.toLocaleString()}
            </div>
            <div className="text-[10px] font-semibold mt-0.5">
              {auction.reserveMet ? (
                <span className="text-emerald-400">✓ Reserve Price Met</span>
              ) : (
                <span className="text-amber-500/90">Reserve Not Met</span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">
              {auction.bidsCount} {auction.bidsCount === 1 ? 'bid' : 'bids'}
            </div>

            {auction.buyItNowPrice && auction.status === 'LIVE' && (
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded text-[10px] font-bold">
                <Zap className="w-2.5 h-2.5 fill-current" />
                Buy Now: ${auction.buyItNowPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
