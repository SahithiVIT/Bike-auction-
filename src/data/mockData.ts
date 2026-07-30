import { Auction } from '../types';

// Future ISO timestamps calculated relative to runtime
const now = new Date();

export const INITIAL_AUCTIONS: Auction[] = [
  {
    id: 'auc-001',
    title: '2023 Ducati Panigale V4 S - Corse Livery',
    category: 'Sport',
    spec: {
      vin: 'ZDM121AA9NB019283',
      make: 'Ducati',
      model: 'Panigale V4 S',
      year: 2023,
      odometerMiles: 1420,
      engineCc: 1103,
      horsepower: 214,
      transmission: '6-Speed with Quickshifter EVO 2',
      titleStatus: 'Clean',
      frameCondition: 'Excellent',
      modifications: [
        'Akrapovič Titanium Full Exhaust System',
        'Ducati Performance Carbon Fiber Frame Guards',
        'Rizoma Stealth Aero Mirrors',
        'Ohlins Smart EC 2.0 Electronic Suspension'
      ],
      serviceHistory: [
        '500-Mile Break-in Service at Ducati Official Austin (12/2023)',
        'Annual Inspection & Desmo Check Clear (05/2024)'
      ],
      location: 'Austin, TX',
      sellerNotes: 'Garage kept in climate-controlled facility. Never track ridden, flawless fairings with full PPF wrap. Comes with two original keys, factory exhaust, and pit stands.'
    },
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    startingBid: 18000,
    currentBid: 24500,
    reservePrice: 24000,
    reserveMet: true,
    buyItNowPrice: 29500,
    startTime: new Date(now.getTime() - 2 * 24 * 3600 * 1000).toISOString(),
    endTime: new Date(now.getTime() + 18 * 3600 * 1000).toISOString(), // 18 hours remaining
    status: 'LIVE',
    sellerId: 'seller-88',
    sellerName: 'Apex Motor Group',
    sellerRating: 4.9,
    bidsCount: 14,
    watchersCount: 89,
    lastBidTime: new Date(now.getTime() - 12 * 60 * 1000).toISOString(),
    featured: true,
    conditionRating: 5,
    softCloseExtendedCount: 0
  },
  {
    id: 'auc-002',
    title: '2022 BMW R 1250 GS Adventure - Triple Black',
    category: 'Adventure',
    spec: {
      vin: 'WB10J9105N9E82910',
      make: 'BMW',
      model: 'R 1250 GS Adventure',
      year: 2022,
      odometerMiles: 8650,
      engineCc: 1254,
      horsepower: 136,
      transmission: '6-Speed Shaft Drive',
      titleStatus: 'Clean',
      frameCondition: 'Excellent',
      modifications: [
        'Touratech Aluminum Panniers & Top Case',
        'Denali D7 LED Driving Lights with CANsmart Controller',
        'Barkbusters VP Handguards',
        'Sargent World Sport Performance Seat'
      ],
      serviceHistory: [
        '6,000-Mile Valve Check & Service at Lone Star BMW (03/2024)',
        'New Michelin Anakee Wild Tires fitted at 8,100 miles'
      ],
      location: 'Denver, CO',
      sellerNotes: 'Outfitted for transcontinental touring. Includes full BMW Dynamic ESA package, heated grips, cruise control, and keyless ride. Minor scuff on left pannier corner.'
    },
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    startingBid: 14000,
    currentBid: 17200,
    reservePrice: 18500,
    reserveMet: false,
    buyItNowPrice: 21000,
    startTime: new Date(now.getTime() - 3 * 24 * 3600 * 1000).toISOString(),
    endTime: new Date(now.getTime() + 4 * 3600 * 1000 + 15 * 60 * 1000).toISOString(), // 4 hrs 15 mins left
    status: 'LIVE',
    sellerId: 'seller-42',
    sellerName: 'Rockies Moto Trade',
    sellerRating: 4.8,
    bidsCount: 9,
    watchersCount: 64,
    lastBidTime: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
    featured: true,
    conditionRating: 4,
    softCloseExtendedCount: 0
  },
  {
    id: 'auc-003',
    title: '1974 Triumph Bonneville T120V Custom Cafe Racer',
    category: 'Cafe Racer',
    spec: {
      vin: 'T120V-FJ59102',
      make: 'Triumph',
      model: 'Bonneville T120V',
      year: 1974,
      odometerMiles: 3400, // post restoration
      engineCc: 750,
      horsepower: 50,
      transmission: '5-Speed Right-Shift',
      titleStatus: 'Clean',
      frameCondition: 'Good',
      modifications: [
        'Hand-hammered Aluminum Monocoque Tank & Tail Section',
        'Amal Premier 930 Carburetors',
        'Tarozzi Rearsets & Clip-on Handlebars',
        'Boyer Bransden Electronic Ignition System'
      ],
      serviceHistory: [
        'Full Engine Blueprinting & Rebuild by British Auto Classics (2022)',
        'Carb Sync & Oil Flush (06/2024)'
      ],
      location: 'Portland, OR',
      sellerNotes: 'Award-winning show bike featured at The One Moto Show 2023. Runs crisp on first kick. Custom leather saddle with diamond stitching.'
    },
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    startingBid: 6500,
    currentBid: 9800,
    reservePrice: 9000,
    reserveMet: true,
    buyItNowPrice: 12500,
    startTime: new Date(now.getTime() - 4 * 24 * 3600 * 1000).toISOString(),
    endTime: new Date(now.getTime() + 1 * 3600 * 1000 + 30 * 60 * 1000).toISOString(), // 1 hr 30 mins left
    status: 'LIVE',
    sellerId: 'seller-19',
    sellerName: 'Rose City Vintage Motors',
    sellerRating: 5.0,
    bidsCount: 18,
    watchersCount: 112,
    lastBidTime: new Date(now.getTime() - 3 * 60 * 1000).toISOString(),
    featured: true,
    conditionRating: 5,
    softCloseExtendedCount: 1
  },
  {
    id: 'auc-004',
    title: '2021 Yamaha YZF-R1M Carbon Special Edition',
    category: 'Sport',
    spec: {
      vin: 'JYARN65E2MA001192',
      make: 'Yamaha',
      model: 'YZF-R1M',
      year: 2021,
      odometerMiles: 2980,
      engineCc: 998,
      horsepower: 200,
      transmission: '6-Speed Quickshift',
      titleStatus: 'Clean',
      frameCondition: 'Excellent',
      modifications: [
        'Full Factory Carbon Fiber Bodywork',
        'Öhlins Electronic Racing Suspension (ERS)',
        'Grave Motorsports Decat Exhaust Pipe',
        'FTEcu ECU Flash'
      ],
      serviceHistory: [
        'Annual Oil & Brake Fluid Service (04/2024)',
        'Bridgestone RS11 Tires installed 200 miles ago'
      ],
      location: 'Los Angeles, CA',
      sellerNotes: 'Numbered carbon badge edition. Equipped with CCU telemetry logger for track data recording. Clean title in hand.'
    },
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    startingBid: 16000,
    currentBid: 20500,
    reservePrice: 22000,
    reserveMet: false,
    buyItNowPrice: 25000,
    startTime: new Date(now.getTime() - 1 * 24 * 3600 * 1000).toISOString(),
    endTime: new Date(now.getTime() + 28 * 3600 * 1000).toISOString(),
    status: 'LIVE',
    sellerId: 'seller-55',
    sellerName: 'SoCal Superbikes',
    sellerRating: 4.7,
    bidsCount: 7,
    watchersCount: 45,
    lastBidTime: new Date(now.getTime() - 120 * 60 * 1000).toISOString(),
    featured: false,
    conditionRating: 4,
    softCloseExtendedCount: 0
  },
  {
    id: 'auc-005',
    title: '2020 Harley-Davidson Fat Boy 114 30th Anniversary',
    category: 'Cruiser',
    spec: {
      vin: '1HD1YFJ40LB029182',
      make: 'Harley-Davidson',
      model: 'Fat Boy 114 30th Anniversary',
      year: 2020,
      odometerMiles: 4100,
      engineCc: 1868,
      horsepower: 94,
      transmission: '6-Speed Cruise Drive',
      titleStatus: 'Clean',
      frameCondition: 'Excellent',
      modifications: [
        'Vance & Hines Big Radius Exhaust',
        'Screamin Eagle Heavy Breather Intake',
        'Custom Blacked-out Engine Covers',
        'Memphis Shades Quick Detachable Windshield'
      ],
      serviceHistory: [
        '5,000-Mile Preventive Maintenance performed early at HD Dealership (05/2024)'
      ],
      location: 'Milwaukee, WI',
      sellerNotes: 'Limited serial edition #1,120 of 2,500 worldwide. Vivid Black paint with bronze highlights. Kept in heated showroom.'
    },
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    startingBid: 12000,
    currentBid: 16800,
    reservePrice: 16000,
    reserveMet: true,
    buyItNowPrice: 19500,
    startTime: new Date(now.getTime() - 5 * 24 * 3600 * 1000).toISOString(),
    endTime: new Date(now.getTime() - 2 * 3600 * 1000).toISOString(), // Ended 2 hrs ago
    status: 'SOLD',
    sellerId: 'seller-33',
    sellerName: 'Midwest H-D Collection',
    sellerRating: 4.9,
    bidsCount: 22,
    watchersCount: 98,
    lastBidTime: new Date(now.getTime() - 2 * 3600 * 1000 - 4 * 60 * 1000).toISOString(),
    winnerId: 'usr-901',
    winnerName: 'CruiserKing_99',
    winningBid: 16800,
    featured: false,
    conditionRating: 5,
    softCloseExtendedCount: 2
  },
  {
    id: 'auc-006',
    title: '2024 Honda CRF1100L Africa Twin Adventure Sports ES',
    category: 'Adventure',
    spec: {
      vin: 'JH2SD0910RK002194',
      make: 'Honda',
      model: 'Africa Twin Adventure Sports ES',
      year: 2024,
      odometerMiles: 650,
      engineCc: 1084,
      horsepower: 101,
      transmission: 'DCT Dual Clutch Automatic',
      titleStatus: 'Clean',
      frameCondition: 'Excellent',
      modifications: [
        'Showa Electronically Equipped Ride Adjustment (EERERA™)',
        'Givi Trekker Outback 48L Luggage System',
        'Honda OEM Centerstand & Heated Grips'
      ],
      serviceHistory: [
        '600-Mile Initial Inspection & Filter Change (07/2024)'
      ],
      location: 'Seattle, WA',
      sellerNotes: 'Practically brand new 2024 DCT model in Pearl Glare White Tri-Color. Factory warranty valid through 2027.'
    },
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    startingBid: 13500,
    currentBid: 13500,
    reservePrice: 16500,
    reserveMet: false,
    buyItNowPrice: 18200,
    startTime: new Date(now.getTime() + 2 * 3600 * 1000).toISOString(), // Starts in 2 hours
    endTime: new Date(now.getTime() + 3 * 24 * 3600 * 1000).toISOString(),
    status: 'UPCOMING',
    sellerId: 'seller-77',
    sellerName: 'Pacific Northwest Powersports',
    sellerRating: 4.9,
    bidsCount: 0,
    watchersCount: 38,
    featured: false,
    conditionRating: 5,
    softCloseExtendedCount: 0
  }
];
