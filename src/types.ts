export type AuctionStatus = 'LIVE' | 'UPCOMING' | 'ENDED' | 'SOLD' | 'PAUSED' | 'RESERVE_NOT_MET';

export type BikeCategory = 'Sport' | 'Cruiser' | 'Adventure' | 'Cafe Racer' | 'Vintage' | 'Naked' | 'Touring';

export interface MotorcycleSpec {
  vin: string;
  make: string;
  model: string;
  year: number;
  odometerMiles: number;
  engineCc: number;
  horsepower?: number;
  transmission: string;
  titleStatus: 'Clean' | 'Rebuilt' | 'Salvage' | 'Lien';
  frameCondition: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  modifications: string[];
  serviceHistory: string[];
  location: string;
  sellerNotes: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  bidderAvatar?: string;
  amount: number;
  maxProxyAmount?: number;
  timestamp: string; // ISO string with ms
  isProxy: boolean;
  status: 'LEADING' | 'OUTBID' | 'WINNING' | 'BUY_NOW';
}

export interface Auction {
  id: string;
  title: string;
  category: BikeCategory;
  spec: MotorcycleSpec;
  images: string[];
  startingBid: number;
  currentBid: number;
  reservePrice: number;
  reserveMet: boolean;
  buyItNowPrice?: number;
  startTime: string; // ISO date
  endTime: string; // ISO date
  status: AuctionStatus;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  bidsCount: number;
  watchersCount: number;
  lastBidTime?: string;
  winnerId?: string;
  winnerName?: string;
  winningBid?: number;
  featured?: boolean;
  conditionRating: number; // 1 to 5 stars
  softCloseExtendedCount?: number; // how many times soft close extended
}

export interface SystemMetric {
  timestamp: string;
  activeConnections: number;
  bidsPerSecond: number;
  latencyP50Ms: number;
  latencyP99Ms: number;
  totalGMV: number;
  totalBidsProcessed: number;
  activeAuctionsCount: number;
  reserveMetRatio: number;
  memoryUsageMb: number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'BID_EVENT' | 'SYS';
  message: string;
  metadata?: Record<string, any>;
}

export interface TestCaseResult {
  id: string;
  name: string;
  category: 'Bidding Logic' | 'Concurrency' | 'Timer & Soft Close' | 'Validation' | 'Permissions';
  description: string;
  status: 'PASSED' | 'FAILED' | 'RUNNING' | 'PENDING';
  durationMs: number;
  logs: string[];
  error?: string;
}

export interface AIInspectionReport {
  estimatedMarketValue: { min: number; max: number };
  conditionScore: number; // 1-100
  keyHighlights: string[];
  potentialRisks: string[];
  fairStartingBid: number;
  recommendation: 'STRONG_BUY' | 'FAIR_DEAL' | 'INSPECT_CAREFULLY' | 'OVERPRICED';
  verdictSummary: string;
}

export type UserRole = 'BUYER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  balance: number;
}
