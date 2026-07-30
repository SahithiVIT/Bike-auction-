import React from 'react';
import { Auction } from '../types';
import { X, Bookmark, ExternalLink, Gauge, MapPin } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistAuctions: Auction[];
  onSelectAuction: (auction: Auction) => void;
  onRemoveFromWatchlist: (auctionId: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistAuctions,
  onSelectAuction,
  onRemoveFromWatchlist
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-current" />
            <h2 className="text-base font-extrabold text-white">Saved Watchlist</h2>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
              {watchlistAuctions.length}
            </span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {watchlistAuctions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
              <p>Your watchlist is empty.</p>
              <p className="text-[11px] text-slate-600">Click the bookmark icon on any auction card to track its bidding status.</p>
            </div>
          ) : (
            watchlistAuctions.map((auc) => (
              <div
                key={auc.id}
                onClick={() => {
                  onSelectAuction(auc);
                  onClose();
                }}
                className="p-3 bg-slate-950 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all flex items-center gap-3 cursor-pointer group"
              >
                <img
                  src={auc.images[0]}
                  alt={auc.title}
                  className="w-16 h-12 object-cover rounded-xl bg-slate-900"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {auc.title}
                  </h4>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{auc.spec.year} {auc.spec.make}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">${auc.currentBid.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWatchlist(auc.id);
                  }}
                  className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
