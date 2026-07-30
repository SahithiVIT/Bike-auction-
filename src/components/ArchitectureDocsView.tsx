import React, { useState } from 'react';
import { FileText, Cpu, Database, Server, Lock, Layers, Zap, ShieldCheck, Terminal, Download, Copy, Check } from 'lucide-react';

export const ArchitectureDocsView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleDownloadDoc = () => {
    window.open('/api/submission-doc', '_blank');
  };

  const handleCopyDoc = async () => {
    try {
      const res = await fetch('/api/submission-doc');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy submission document', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-slate-200">
      
      {/* Doc Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-lg uppercase">
              System Design Specification
            </span>
            <span className="text-xs text-slate-400 font-mono">Document Rev 2.4 • Production Spec</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            MotoBid Platform Architecture & Engineering Design
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Technical specifications, system design topologies, bidding state machine algorithms, real-time concurrency models, and operational deployment guides for the software engineering assignment.
          </p>
        </div>

        {/* Action Buttons for Mobile/Desktop Access */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadDoc}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            Download SUBMISSION_DOCUMENT.md
          </button>
          
          <button
            onClick={handleCopyDoc}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Document Text'}
          </button>
        </div>
      </div>

      {/* Section 1: System Overview Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          1. System Architecture Topology
        </h2>

        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs">
            
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-sm">React 19 Frontend SPA</h3>
              <p className="text-slate-400 leading-normal">
                Vite build, Tailwind CSS v4 design, Motion route transitions, real-time SSE stream subscriber, live countdown tick loops.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-sm">Express Transaction Server</h3>
              <p className="text-slate-400 leading-normal">
                REST API, atomic mutation lock handlers, minimum increment tier evaluator, anti-sniping soft-close timer manager, SSE push broadcaster.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/20">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-sm">State & Integration Layer</h3>
              <p className="text-slate-400 leading-normal">
                In-memory transactional log store, proxy bid ceiling index, Gemini AI @google/genai condition evaluator API.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Real-time Bidding & Soft Close Sequence */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          2. Live Bidding & Anti-Sniping Sequence
        </h2>

        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2 text-slate-300">
            <div className="text-amber-400 font-bold">[BID TRANSACTION WORKFLOW]</div>
            <p>1. Buyer submits POST /api/auctions/:id/bid with {`{ amount, maxProxy }`}.</p>
            <p>2. Express mutator acquires atomic mutex lock on auction record.</p>
            <p>3. Evaluates minimum increment rule: amount ≥ currentBid + getMinimumIncrement(currentBid).</p>
            <p>4. Evaluates Soft-Close Anti-Sniping window: If timeRemaining ≤ 120,000ms, extend endTime += 120,000ms.</p>
            <p>5. Proxy Engine evaluates high proxy ceiling M: If competing proxy exists, auto-rebid up to M.</p>
            <p>6. Reserve Price Check: If currentBid ≥ reservePrice, set reserveMet = true.</p>
            <p>7. Broadcasts updated state via SSE stream to all active browser connections.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Data Model ER Schema */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-400" />
          3. Core Data Schema Specifications
        </h2>

        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="space-y-2">
            <h3 className="font-extrabold text-amber-400 font-mono">Auction Entity</h3>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 overflow-x-auto">
{`{
  id: string; // "auc-001"
  title: string;
  category: BikeCategory;
  spec: {
    vin: string;
    make: string;
    model: string;
    year: number;
    odometerMiles: number;
    engineCc: number;
    titleStatus: string;
    modifications: string[];
    serviceHistory: string[];
  };
  startingBid: number;
  currentBid: number;
  reservePrice: number;
  reserveMet: boolean;
  buyItNowPrice?: number;
  endTime: string; // ISO
  status: 'LIVE' | 'PAUSED' | 'SOLD';
  softCloseExtendedCount: number;
}`}
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="font-extrabold text-amber-400 font-mono">Bid Entity</h3>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 overflow-x-auto">
{`{
  id: string; // "bid-101"
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  maxProxyAmount?: number;
  timestamp: string; // ISO with ms
  isProxy: boolean;
  status: 'LEADING' | 'OUTBID' | 'BUY_NOW';
}`}
            </pre>
          </div>

        </div>
      </section>

      {/* Section 4: Engineering Trade-offs & Design Assumptions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          4. Trade-Offs & Engineering Assumptions
        </h2>

        <div className="overflow-x-auto bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Decision Area</th>
                <th className="pb-3">Selected Architecture</th>
                <th className="pb-3">Trade-Off / Justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 font-bold text-amber-400">Real-Time Sync Protocol</td>
                <td className="py-3 font-medium text-white">Server-Sent Events (SSE) over HTTP/1.1</td>
                <td className="py-3 text-slate-400">
                  SSE guarantees automatic reconnection, HTTP/2 multiplexing, zero extra dependency overhead, and flawless traversal through corporate reverse proxies and Cloud Run container ingress.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-amber-400">Concurrency Control</td>
                <td className="py-3 font-medium text-white">In-Memory Transactional Mutex Lock</td>
                <td className="py-3 text-slate-400">
                  Avoids external database bottleneck during high-frequency bidding bursts while preserving strict serializability for minimum increment evaluation.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-amber-400">Anti-Sniping Soft-Close</td>
                <td className="py-3 font-medium text-white">Dynamic 2-Minute Extension Window</td>
                <td className="py-3 text-slate-400">
                  Eliminates last-second bot sniping exploits, ensuring true market price discovery for sellers while giving human bidders fair opportunity to respond.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-amber-400">AI Valuation Integration</td>
                <td className="py-3 font-medium text-white">Gemini @google/genai Server Route Proxy</td>
                <td className="py-3 text-slate-400">
                  Keeps GEMINI_API_KEY secure on server side, generating instant mechanical risk assessments and valuation estimates without browser leaks.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Setup & Local Deployment Guide */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-400" />
          5. Local Setup & Production Deployment Manual
        </h2>

        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4 text-xs">
          
          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm">Local Development Commands:</h3>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-amber-400 font-mono">
{`# 1. Install workspace dependencies
npm install

# 2. Launch Express + Vite Development Server (Port 3000)
npm run dev

# 3. Compile standalone bundle for production Cloud Run execution
npm run build

# 4. Start production Node server
npm start`}
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm">Production Environment Variables (`.env`):</h3>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 font-mono">
{`GEMINI_API_KEY="AI_STUDIO_INJECTED_API_KEY"
PORT=3000
NODE_ENV="production"`}
            </pre>
          </div>

        </div>
      </section>

    </div>
  );
};
