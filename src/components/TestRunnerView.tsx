import React, { useState } from 'react';
import { TestCaseResult } from '../types';
import { Play, CheckCircle2, XCircle, Clock, ShieldCheck, Terminal, AlertTriangle, RefreshCw } from 'lucide-react';

export const TestRunnerView: React.FC = () => {
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lastRunTime, setLastRunTime] = useState<string | null>(null);

  const handleRunTests = async () => {
    try {
      setIsRunning(true);
      const res = await fetch('/api/tests/run', { method: 'POST' });
      const data = await res.json();
      if (data.testResults) {
        setTestResults(data.testResults);
        setLastRunTime(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const passedCount = testResults.filter(t => t.status === 'PASSED').length;
  const failedCount = testResults.filter(t => t.status === 'FAILED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white tracking-tight">Automated System Integration Test Suite</h1>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-full">
              SUITE v2.4
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Validates core bidding algorithms, anti-sniping soft-close window triggers, proxy maximum auto-bids, reserve threshold state transitions, and race condition atomic mutation guards.
          </p>
        </div>

        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
        >
          {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
          {isRunning ? 'Executing Test Suite...' : 'Run All Integration Tests'}
        </button>
      </div>

      {/* Summary Scorecard */}
      {testResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Total Test Cases</div>
              <div className="text-2xl font-black text-white mt-0.5">{testResults.length}</div>
            </div>
            <Terminal className="w-8 h-8 text-amber-400" />
          </div>

          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-emerald-400 font-medium">Passed Assertions</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">{passedCount}</div>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-rose-400 font-medium">Failed Assertions</div>
              <div className="text-2xl font-black text-rose-400 mt-0.5">{failedCount}</div>
            </div>
            <XCircle className="w-8 h-8 text-rose-400" />
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Last Execution</div>
              <div className="text-sm font-extrabold text-slate-200 mt-0.5">{lastRunTime || 'N/A'}</div>
            </div>
            <Clock className="w-8 h-8 text-sky-400" />
          </div>
        </div>
      )}

      {/* Test List Cards */}
      <div className="space-y-4">
        {testResults.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-base font-extrabold text-white">System Test Suite Ready</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Click "Run All Integration Tests" above to execute automated backend test assertions verifying auction business rules and concurrency locks.
            </p>
          </div>
        ) : (
          testResults.map((tc) => (
            <div key={tc.id} className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {tc.status === 'PASSED' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-extrabold text-white">{tc.name}</h4>
                    <p className="text-xs text-slate-400">{tc.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-slate-950 text-slate-400 font-mono text-[10px] rounded-lg border border-slate-800">
                    {tc.durationMs} ms
                  </span>
                  <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg ${
                    tc.status === 'PASSED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {tc.status}
                  </span>
                </div>
              </div>

              {/* Step Assertion Logs */}
              <div className="p-4 bg-slate-950 rounded-xl font-mono text-xs space-y-1.5 border border-slate-800/80">
                {tc.logs.map((log, i) => (
                  <div key={i} className="text-slate-300 flex items-start gap-2">
                    <span className="text-amber-500">›</span>
                    <span>{log}</span>
                  </div>
                ))}
                {tc.error && (
                  <div className="text-rose-400 pt-2 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Assertion Failed: {tc.error}
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
