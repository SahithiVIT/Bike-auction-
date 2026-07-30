import React from 'react';
import { Zap, Clock, AlertTriangle, X } from 'lucide-react';

export interface ToastNotification {
  id: string;
  type: 'BID' | 'SOFT_CLOSE' | 'SOLD';
  title: string;
  message: string;
}

interface NotificationBannerProps {
  notifications: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  notifications,
  onDismiss
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto p-4 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl border border-amber-500/40 shadow-2xl flex items-start justify-between gap-3 animate-slide-up"
        >
          <div className="flex items-start gap-3">
            {n.type === 'BID' && <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 fill-current" />}
            {n.type === 'SOFT_CLOSE' && <Clock className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5 animate-pulse" />}
            {n.type === 'SOLD' && <AlertTriangle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />}

            <div className="text-xs">
              <h4 className="font-extrabold text-white text-sm">{n.title}</h4>
              <p className="text-slate-300 mt-0.5 leading-relaxed">{n.message}</p>
            </div>
          </div>

          <button
            onClick={() => onDismiss(n.id)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
