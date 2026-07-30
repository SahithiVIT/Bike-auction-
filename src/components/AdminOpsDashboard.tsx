import React, { useState, useEffect } from 'react';
import { SystemMetric, SystemLog, Auction } from '../types';
import {
  Activity, ShieldAlert, Cpu, Database, Terminal, Play, Pause, AlertTriangle,
  Download, Zap, RefreshCw, BarChart2, Radio, Server
} from 'lucide-react';

interface AdminOpsDashboardProps {
  metrics: SystemMetric | null;
  logs: SystemLog[];
  auctions: Auction[];
  onTriggerSimulatedBid: () => Promise<void>;
  onTogglePauseAuction: (id: string) => Promise<void>;
  onRefreshMetrics: () => void;
}

export const AdminOpsDashboard: React.FC<AdminOpsDashboardProps> = ({
  metrics,
  logs,
  auctions,
  onTriggerSimulatedBid,
  onTogglePauseAuction,
  onRefreshMetrics
}) => {
  const [logFilter, setLogFilter] = useState<string>('ALL');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const filteredLogs = logFilter === 'ALL' ? logs : logs.filter(l => l.level === logFilter);

  const handleTriggerSim = async () => {
    try {
      setIsSimulating(true);
      await onTriggerSimulatedBid();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  const exportLogsAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `motobid-system-audit-logs-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">System Operations & Observability</h1>
            <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold rounded-full flex items-center gap-1">
              <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time API latency metrics, concurrent stream connections, transactional audit logs, and operational controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerSim}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <Zap className="w-4 h-4 fill-current" />
            {isSimulating ? 'Injecting Bid...' : 'Trigger Live Mock Bid'}
          </button>

          <button
            onClick={onRefreshMetrics}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Telemetry Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Latency (p50)</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">
            {metrics ? `${metrics.latencyP50Ms} ms` : '--'}
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold">Fast Sub-20ms</div>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Latency (p99)</span>
            <BarChart2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">
            {metrics ? `${metrics.latencyP99Ms} ms` : '--'}
          </div>
          <div className="text-[10px] text-amber-400 font-semibold">Peak Tail Latency</div>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Bid Stream Rate</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400 font-mono">
            {metrics ? `${metrics.bidsPerSecond} /s` : '0 /s'}
          </div>
          <div className="text-[10px] text-slate-400 font-semibold">Total: {metrics?.totalBidsProcessed || 0} Bids</div>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>SSE Connections</span>
            <Radio className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">
            {metrics?.activeConnections || 1}
          </div>
          <div className="text-[10px] text-sky-400 font-semibold">Active Clients</div>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Heap Memory</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">
            {metrics ? `${metrics.memoryUsageMb} MB` : '--'}
          </div>
          <div className="text-[10px] text-purple-400 font-semibold">Node.js Memory</div>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Reserve Met %</span>
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono">
            {metrics ? `${Math.round(metrics.reserveMetRatio * 100)}%` : '--'}
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold">Auction Success</div>
        </div>

      </div>

      {/* Real-Time Audit Log Terminal View */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
        
        {/* Terminal Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-slate-900/80 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm text-white">Production Audit & System Log Stream</h3>
            <span className="text-xs text-slate-500 font-mono">({filteredLogs.length} events)</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Filter Pills */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['ALL', 'INFO', 'BID_EVENT', 'WARN', 'ERROR', 'SYS'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLogFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    logFilter === lvl ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={exportLogsAsJson}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 font-semibold"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-xs max-h-96 overflow-y-auto space-y-2 bg-slate-950">
          {filteredLogs.length === 0 ? (
            <div className="text-slate-600 text-center py-8">No log entries matching filter</div>
          ) : (
            filteredLogs.map((log) => {
              let levelBg = 'text-slate-400 bg-slate-900 border-slate-800';
              if (log.level === 'INFO') levelBg = 'text-sky-400 bg-sky-950/40 border-sky-800/40';
              if (log.level === 'BID_EVENT') levelBg = 'text-amber-400 bg-amber-950/40 border-amber-800/40';
              if (log.level === 'WARN') levelBg = 'text-amber-300 bg-amber-950/60 border-amber-800';
              if (log.level === 'ERROR') levelBg = 'text-rose-400 bg-rose-950/60 border-rose-800';
              if (log.level === 'SYS') levelBg = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';

              return (
                <div key={log.id} className="flex items-start gap-3 hover:bg-slate-900/50 p-1.5 rounded-lg transition-colors">
                  <span className="text-slate-500 flex-shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  <span className={`px-2 py-0.5 rounded border text-[10px] font-bold flex-shrink-0 ${levelBg}`}>
                    {log.level}
                  </span>
                  <span className="text-slate-200 flex-1">{log.message}</span>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Auction Moderation Console Table */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white">Active Auction Moderation</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Title & VIN</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Current Bid</th>
                <th className="pb-3">Bids</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auctions.map((auc) => (
                <tr key={auc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 font-medium text-white">
                    <div>{auc.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">VIN: {auc.spec.vin}</div>
                  </td>
                  <td className="py-3 text-slate-300">{auc.category}</td>
                  <td className="py-3 font-mono font-bold text-amber-400">${auc.currentBid.toLocaleString()}</td>
                  <td className="py-3 text-slate-300">{auc.bidsCount}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      auc.status === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400' :
                      auc.status === 'PAUSED' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {auc.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onTogglePauseAuction(auc.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        auc.status === 'LIVE'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                      }`}
                    >
                      {auc.status === 'LIVE' ? 'Pause' : 'Resume'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
