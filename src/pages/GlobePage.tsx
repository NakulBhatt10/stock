import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════
interface Index {
  name: string;
  val: number;
  chg: number;
}

interface Stock {
  sym: string;
  name: string;
  price: string;
  chg: number;
}

interface Market {
  id: string;
  country: string;
  city: string;
  flag: string;
  lat: number;
  lon: number;
  color: string;
  utcOffset: number;
  open: string;
  close: string;
  tz: string;
  weekend: number[];
  indices: Index[];
  topStocks: Stock[];
}

// ═══════════════════════════════════════════════════════
//  WORLD MARKET DATA
// ═══════════════════════════════════════════════════════
const MARKETS_DATA: Market[] = [
  { id:'india', country:'India', city:'Mumbai', flag:'🇮🇳',
    lat:19.08, lon:72.88, color:'#ff7f40', utcOffset:5.5,
    open:'09:15', close:'15:30', tz:'IST', weekend:[0,6],
    indices:[
      {name:'NIFTY 50',    val:22450.85, chg:+0.42},
      {name:'SENSEX',      val:74128.31, chg:+0.38},
      {name:'NIFTY BANK',  val:48235.60, chg:+0.55},
    ],
    topStocks:[
      {sym:'RELIANCE',  name:'Reliance Inds',   price:'₹2,847', chg:+1.2},
      {sym:'TCS',       name:'Tata Consultancy',price:'₹3,421', chg:-0.3},
      {sym:'HDFC BANK', name:'HDFC Bank',       price:'₹1,623', chg:+0.8},
      {sym:'INFY',      name:'Infosys',         price:'₹1,457', chg:+0.6},
    ]
  },
  { id:'pakistan', country:'Pakistan', city:'Karachi', flag:'🇵🇰',
    lat:24.86, lon:67.01, color:'#00b894', utcOffset:5,
    open:'09:15', close:'15:30', tz:'PKT', weekend:[5,6],
    indices:[{name:'KSE 100', val:65842.35, chg:+0.78}],
    topStocks:[
      {sym:'OGDC',  name:'Oil & Gas Dev Co',   price:'Rs192', chg:+1.2},
      {sym:'HBL',   name:'Habib Bank',         price:'Rs168', chg:+0.8},
      {sym:'PPL',   name:'Pakistan Petroleum', price:'Rs124', chg:+0.5},
    ]
  },
  { id:'japan', country:'Japan', city:'Tokyo', flag:'🇯🇵',
    lat:35.68, lon:139.69, color:'#ff6b6b', utcOffset:9,
    open:'09:00', close:'15:30', tz:'JST', weekend:[0,6],
    indices:[
      {name:'NIKKEI 225', val:38274.05, chg:+0.67},
      {name:'TOPIX',      val:2714.03,  chg:+0.54},
    ],
    topStocks:[
      {sym:'7203',  name:'Toyota Motor',    price:'¥3,641', chg:+0.8},
      {sym:'6758',  name:'Sony Group',      price:'¥12,100',chg:+1.3},
      {sym:'6861',  name:'Keyence Corp',    price:'¥55,280',chg:+2.1},
      {sym:'9984',  name:'SoftBank Group',  price:'¥7,890', chg:+2.1},
    ]
  },
  { id:'china', country:'China', city:'Shanghai', flag:'🇨🇳',
    lat:31.23, lon:121.47, color:'#ff4444', utcOffset:8,
    open:'09:30', close:'15:00', tz:'CST', weekend:[0,6],
    indices:[
      {name:'SSE COMPOSITE', val:3127.58, chg:-0.15},
      {name:'SHENZHEN COMP', val:9854.32, chg:-0.08},
      {name:'CSI 300',       val:3562.88, chg:-0.12},
    ],
    topStocks:[
      {sym:'BABA',     name:'Alibaba Group',   price:'HK$79', chg:-0.6},
      {sym:'TENCENT',  name:'Tencent Holdings',price:'HK$312',chg:+0.3},
      {sym:'PING AN',  name:'Ping An Ins.',    price:'¥41',   chg:-0.2},
      {sym:'ICBC',     name:'Ind & Comm Bank', price:'¥5.62', chg:+0.4},
    ]
  },
  { id:'hongkong', country:'Hong Kong', city:'Hong Kong', flag:'🇭🇰',
    lat:22.32, lon:114.17, color:'#7bed9f', utcOffset:8,
    open:'09:30', close:'16:00', tz:'HKT', weekend:[0,6],
    indices:[
      {name:'HANG SENG',      val:16541.42, chg:-0.48},
      {name:'HANG SENG TECH', val:3285.10,  chg:-0.62},
    ],
    topStocks:[
      {sym:'0005', name:'HSBC Holdings',  price:'HK$60', chg:-0.3},
      {sym:'1299', name:'AIA Group',      price:'HK$64', chg:+0.5},
      {sym:'0700', name:'Tencent',        price:'HK$310',chg:+0.8},
    ]
  },
  { id:'southkorea', country:'South Korea', city:'Seoul', flag:'🇰🇷',
    lat:37.57, lon:126.98, color:'#5352ed', utcOffset:9,
    open:'09:00', close:'15:30', tz:'KST', weekend:[0,6],
    indices:[
      {name:'KOSPI',  val:2642.36, chg:+0.29},
      {name:'KOSDAQ', val:854.72,  chg:+0.51},
    ],
    topStocks:[
      {sym:'005930', name:'Samsung Elec',  price:'₩75,800', chg:+1.2},
      {sym:'000660', name:'SK Hynix',      price:'₩143,500',chg:+2.1},
      {sym:'035420', name:'NAVER Corp',    price:'₩168,200',chg:-0.4},
    ]
  },
  { id:'taiwan', country:'Taiwan', city:'Taipei', flag:'🇹🇼',
    lat:25.04, lon:121.56, color:'#26de81', utcOffset:8,
    open:'09:00', close:'13:30', tz:'TST', weekend:[0,6],
    indices:[{name:'TAIEX', val:20234.82, chg:+1.24}],
    topStocks:[
      {sym:'2330', name:'TSMC',               price:'NT$755',chg:+2.1},
      {sym:'2317', name:'Hon Hai (Foxconn)',   price:'NT$156',chg:+0.8},
      {sym:'2454', name:'MediaTek',           price:'NT$895',chg:+1.5},
    ]
  },
  { id:'singapore', country:'Singapore', city:'Singapore', flag:'🇸🇬',
    lat:1.35, lon:103.82, color:'#ff6b81', utcOffset:8,
    open:'09:00', close:'17:00', tz:'SGT', weekend:[0,6],
    indices:[{name:'STI', val:3254.71, chg:+0.14}],
    topStocks:[
      {sym:'DBS',  name:'DBS Group',          price:'S$33', chg:+0.5},
      {sym:'SIA',  name:'Singapore Airlines', price:'S$6.8',chg:+1.1},
      {sym:'OCBC', name:'OCBC Bank',          price:'S$13', chg:+0.3},
    ]
  },
  { id:'malaysia', country:'Malaysia', city:'Kuala Lumpur', flag:'🇲🇾',
    lat:3.14, lon:101.69, color:'#fd9644', utcOffset:8,
    open:'09:00', close:'17:00', tz:'MYT', weekend:[0,6],
    indices:[{name:'KLCI', val:1567.42, chg:+0.08}],
    topStocks:[
      {sym:'MAYBANK', name:'Malayan Banking',  price:'RM10', chg:+0.3},
      {sym:'CIMB',    name:'CIMB Group',       price:'RM7',  chg:-0.2},
      {sym:'TENAGA',  name:'Tenaga Nasional',  price:'RM12', chg:+0.5},
    ]
  },
  { id:'indonesia', country:'Indonesia', city:'Jakarta', flag:'🇮🇩',
    lat:-6.21, lon:106.85, color:'#ff5252', utcOffset:7,
    open:'09:00', close:'15:50', tz:'WIB', weekend:[0,6],
    indices:[{name:'IDX COMPOSITE', val:7358.67, chg:+0.31}],
    topStocks:[
      {sym:'TLKM', name:'Telkom Indonesia',    price:'Rp3,240',chg:+0.5},
      {sym:'BBCA', name:'Bank BCA',            price:'Rp9,650',chg:+0.8},
      {sym:'ASII', name:'Astra International', price:'Rp5,425',chg:-0.3},
    ]
  },
  { id:'thailand', country:'Thailand', city:'Bangkok', flag:'🇹🇭',
    lat:13.75, lon:100.52, color:'#a29bfe', utcOffset:7,
    open:'10:00', close:'16:30', tz:'ICT', weekend:[0,6],
    indices:[{name:'SET INDEX', val:1421.83, chg:-0.22}],
    topStocks:[
      {sym:'PTT',   name:'PTT Group',       price:'฿33', chg:-0.4},
      {sym:'KBANK', name:'Kasikorn Bank',   price:'฿142',chg:+0.6},
      {sym:'AOT',   name:'Airports Thailand',price:'฿67',chg:+1.1},
    ]
  },
  { id:'philippines', country:'Philippines', city:'Manila', flag:'🇵🇭',
    lat:14.60, lon:120.98, color:'#0652DD', utcOffset:8,
    open:'09:30', close:'15:30', tz:'PHT', weekend:[0,6],
    indices:[{name:'PSEi', val:6742.85, chg:+0.15}],
    topStocks:[
      {sym:'SM',  name:'SM Investments',        price:'₱985',chg:+0.6},
      {sym:'ALI', name:'Ayala Land',            price:'₱32', chg:+0.4},
      {sym:'BPI', name:'Bank of Phil Islands',  price:'₱112',chg:-0.2},
    ]
  },
  { id:'australia', country:'Australia', city:'Sydney', flag:'🇦🇺',
    lat:-33.87, lon:151.21, color:'#eccc68', utcOffset:10,
    open:'10:00', close:'16:00', tz:'AEST', weekend:[0,6],
    indices:[
      {name:'ASX 200',  val:7842.30, chg:+0.22},
      {name:'ALL ORDS', val:8106.45, chg:+0.19},
    ],
    topStocks:[
      {sym:'BHP',  name:'BHP Group',   price:'A$44',  chg:+0.6},
      {sym:'CBA',  name:'CommBank',    price:'A$119', chg:+0.4},
      {sym:'CSL',  name:'CSL Limited', price:'A$285', chg:-0.2},
    ]
  },
  { id:'uk', country:'United Kingdom', city:'London', flag:'🇬🇧',
    lat:51.51, lon:-0.13, color:'#4ecdc4', utcOffset:0,
    open:'08:00', close:'16:30', tz:'GMT', weekend:[0,6],
    indices:[
      {name:'FTSE 100', val:7733.08,  chg:-0.12},
      {name:'FTSE 250', val:19458.42, chg:-0.08},
    ],
    topStocks:[
      {sym:'SHEL', name:'Shell PLC',    price:'£25', chg:+0.5},
      {sym:'HSBA', name:'HSBC Holdings',price:'£6.4',chg:-0.3},
      {sym:'AZN',  name:'AstraZeneca', price:'£119',chg:+1.2},
      {sym:'ULVR', name:'Unilever',    price:'£37', chg:+0.3},
    ]
  },
  { id:'germany', country:'Germany', city:'Frankfurt', flag:'🇩🇪',
    lat:50.11, lon:8.68, color:'#ffd700', utcOffset:1,
    open:'09:00', close:'17:30', tz:'CET', weekend:[0,6],
    indices:[
      {name:'DAX',  val:18138.65, chg:+0.23},
      {name:'MDAX', val:25842.30, chg:+0.18},
    ],
    topStocks:[
      {sym:'SAP', name:'SAP SE',     price:'€172',chg:+0.9},
      {sym:'SIE', name:'Siemens AG', price:'€178',chg:+0.4},
      {sym:'BMW', name:'BMW Group',  price:'€98', chg:-0.3},
      {sym:'ALV', name:'Allianz SE', price:'€258',chg:-0.2},
    ]
  },
  { id:'france', country:'France', city:'Paris', flag:'🇫🇷',
    lat:48.86, lon:2.35, color:'#e74c8b', utcOffset:1,
    open:'09:00', close:'17:30', tz:'CET', weekend:[0,6],
    indices:[{name:'CAC 40', val:8152.75, chg:+0.18}],
    topStocks:[
      {sym:'MC',  name:'LVMH',          price:'€817',chg:+0.6},
      {sym:'TTE', name:'TotalEnergies', price:'€61', chg:+1.1},
      {sym:'SAN', name:'Sanofi',        price:'€104',chg:-0.3},
      {sym:'AIR', name:'Airbus SE',     price:'€156',chg:+0.8},
    ]
  },
  { id:'switzerland', country:'Switzerland', city:'Zurich', flag:'🇨🇭',
    lat:47.38, lon:8.54, color:'#ff4757', utcOffset:1,
    open:'09:00', close:'17:30', tz:'CET', weekend:[0,6],
    indices:[{name:'SMI', val:11523.41, chg:+0.11}],
    topStocks:[
      {sym:'NESN', name:'Nestlé SA', price:'CHF 98', chg:+0.3},
      {sym:'ROG',  name:'Roche',     price:'CHF 245',chg:-0.5},
      {sym:'NOVN', name:'Novartis',  price:'CHF 89', chg:+0.7},
    ]
  },
  { id:'netherlands', country:'Netherlands', city:'Amsterdam', flag:'🇳🇱',
    lat:52.37, lon:4.90, color:'#ff6348', utcOffset:1,
    open:'09:00', close:'17:30', tz:'CET', weekend:[0,6],
    indices:[{name:'AEX', val:871.43, chg:+0.35}],
    topStocks:[
      {sym:'ASML',  name:'ASML Holding',price:'€785',   chg:+1.8},
      {sym:'SHELL', name:'Shell NL',    price:'€32',    chg:+0.5},
      {sym:'ADYEN', name:'Adyen NV',    price:'€1,340', chg:-0.9},
    ]
  },
  { id:'sweden', country:'Sweden', city:'Stockholm', flag:'🇸🇪',
    lat:59.33, lon:18.07, color:'#70a1ff', utcOffset:1,
    open:'09:00', close:'17:30', tz:'CET', weekend:[0,6],
    indices:[{name:'OMX 30', val:2485.62, chg:+0.21}],
    topStocks:[
      {sym:'ERICB', name:'Ericsson B',  price:'SEK 78',  chg:+0.5},
      {sym:'VOLVA', name:'Volvo Cars',  price:'SEK 28',  chg:-0.4},
      {sym:'ATCO',  name:'Atlas Copco',price:'SEK 175', chg:+0.7},
    ]
  },
  { id:'russia', country:'Russia', city:'Moscow', flag:'🇷🇺',
    lat:55.75, lon:37.62, color:'#b2bec3', utcOffset:3,
    open:'10:00', close:'18:45', tz:'MSK', weekend:[0,6],
    indices:[
      {name:'MOEX', val:3285.42, chg:+0.31},
      {name:'RTS',  val:1124.85, chg:+0.28},
    ],
    topStocks:[
      {sym:'GAZP', name:'Gazprom',  price:'₽158',  chg:+0.5},
      {sym:'SBER', name:'Sberbank', price:'₽312',  chg:+1.2},
      {sym:'LKOH', name:'Lukoil',  price:'₽7,245',chg:+0.8},
    ]
  },
  { id:'turkey', country:'Turkey', city:'Istanbul', flag:'🇹🇷',
    lat:41.01, lon:28.95, color:'#e17055', utcOffset:3,
    open:'10:00', close:'18:00', tz:'TRT', weekend:[0,6],
    indices:[{name:'BIST 100', val:8248541, chg:+1.18}],
    topStocks:[
      {sym:'GARAN', name:'Garanti Bank',    price:'₺118',chg:+2.3},
      {sym:'AKBNK', name:'Akbank',          price:'₺45', chg:+1.8},
      {sym:'THYAO', name:'Turkish Airlines',price:'₺280',chg:+3.1},
    ]
  },
  { id:'usa', country:'United States', city:'New York', flag:'🇺🇸',
    lat:40.71, lon:-74.01, color:'#00c8ff', utcOffset:-5,
    open:'09:30', close:'16:00', tz:'EST', weekend:[0,6],
    indices:[
      {name:'DOW JONES',   val:38654.42, chg:+0.31},
      {name:'NASDAQ',      val:16284.73, chg:+0.58},
      {name:'S&P 500',     val:5123.41,  chg:+0.45},
      {name:'RUSSELL 2000',val:2048.35,  chg:+0.22},
    ],
    topStocks:[
      {sym:'AAPL', name:'Apple Inc',   price:'$189',chg:+1.1},
      {sym:'MSFT', name:'Microsoft',   price:'$415',chg:+0.7},
      {sym:'NVDA', name:'NVIDIA Corp', price:'$878',chg:+2.3},
      {sym:'AMZN', name:'Amazon',      price:'$182',chg:+1.0},
    ]
  },
  { id:'canada', country:'Canada', city:'Toronto', flag:'🇨🇦',
    lat:43.65, lon:-79.38, color:'#ff6b6b', utcOffset:-5,
    open:'09:30', close:'16:00', tz:'EST', weekend:[0,6],
    indices:[
      {name:'TSX COMPOSITE', val:21487.65, chg:+0.19},
      {name:'TSX 60',        val:1285.42,  chg:+0.17},
    ],
    topStocks:[
      {sym:'SHOP', name:'Shopify',    price:'CA$102',chg:+1.8},
      {sym:'RY',   name:'Royal Bank', price:'CA$134',chg:+0.4},
      {sym:'CNR',  name:'CN Rail',    price:'CA$171',chg:-0.1},
    ]
  },
  { id:'brazil', country:'Brazil', city:'São Paulo', flag:'🇧🇷',
    lat:-23.55, lon:-46.63, color:'#00c896', utcOffset:-3,
    open:'10:00', close:'17:55', tz:'BRT', weekend:[0,6],
    indices:[{name:'IBOVESPA', val:127542.30, chg:+0.63}],
    topStocks:[
      {sym:'PETR4', name:'Petrobras',    price:'R$38', chg:+1.3},
      {sym:'VALE3', name:'Vale SA',      price:'R$65', chg:+0.9},
      {sym:'ITUB4', name:'Itaú Unibanco',price:'R$31', chg:+0.4},
      {sym:'MELI',  name:'MercadoLibre', price:'$1,658',chg:+1.8},
    ]
  },
  { id:'mexico', country:'Mexico', city:'Mexico City', flag:'🇲🇽',
    lat:19.43, lon:-99.13, color:'#fd79a8', utcOffset:-6,
    open:'08:30', close:'15:00', tz:'CST', weekend:[0,6],
    indices:[{name:'IPC (S&P/BMV)', val:54628.41, chg:+0.28}],
    topStocks:[
      {sym:'AMX',    name:'América Móvil',  price:'MXN$14',chg:+0.6},
      {sym:'CEMEX',  name:'Cemex SAB',      price:'MXN$9', chg:-0.3},
      {sym:'WALMEX', name:'Walmart Mexico', price:'MXN$75',chg:+0.5},
    ]
  },
  { id:'argentina', country:'Argentina', city:'Buenos Aires', flag:'🇦🇷',
    lat:-34.60, lon:-58.38, color:'#74b9ff', utcOffset:-3,
    open:'11:00', close:'17:00', tz:'ART', weekend:[0,6],
    indices:[{name:'MERVAL', val:1124587, chg:+1.42}],
    topStocks:[
      {sym:'YPF',  name:'YPF SA',        price:'$18', chg:+2.1},
      {sym:'GGAL', name:'Grupo Galicia',  price:'$12', chg:+3.2},
      {sym:'BBAR', name:'Banco Frances',  price:'$10', chg:+2.8},
    ]
  },
  { id:'saudiarabia', country:'Saudi Arabia', city:'Riyadh', flag:'🇸🇦',
    lat:24.69, lon:46.72, color:'#00cec9', utcOffset:3,
    open:'10:00', close:'15:00', tz:'AST', weekend:[5,6],
    indices:[{name:'TASI', val:11842.35, chg:+0.47}],
    topStocks:[
      {sym:'2222', name:'Saudi Aramco',  price:'SAR 27', chg:+0.8},
      {sym:'1120', name:'Al Rajhi Bank', price:'SAR 98', chg:+0.5},
      {sym:'7010', name:'STC Group',     price:'SAR 65', chg:-0.3},
    ]
  },
  { id:'uae', country:'UAE', city:'Dubai', flag:'🇦🇪',
    lat:25.20, lon:55.27, color:'#fdcb6e', utcOffset:4,
    open:'10:00', close:'14:00', tz:'GST', weekend:[5,6],
    indices:[
      {name:'DFM INDEX', val:4285.63, chg:+0.21},
      {name:'ADX INDEX', val:9542.18, chg:+0.16},
    ],
    topStocks:[
      {sym:'ENBD',  name:'Emirates NBD',        price:'AED 18',chg:+0.6},
      {sym:'EMAAR', name:'Emaar Properties',    price:'AED 8', chg:+0.4},
      {sym:'FAB',   name:'First Abu Dhabi Bank',price:'AED 14',chg:-0.2},
    ]
  },
  { id:'egypt', country:'Egypt', city:'Cairo', flag:'🇪🇬',
    lat:30.04, lon:31.24, color:'#fab1a0', utcOffset:2,
    open:'10:00', close:'14:30', tz:'EET', weekend:[5,6],
    indices:[{name:'EGX 30', val:24185.42, chg:+0.54}],
    topStocks:[
      {sym:'COMI', name:'Commercial Intl Bank', price:'EGP 85',chg:+1.3},
      {sym:'TMGH', name:'Talaat Moustafa Grp',  price:'EGP 18',chg:+0.8},
      {sym:'ETEL', name:'Telecom Egypt',        price:'EGP 14',chg:-0.2},
    ]
  },
  { id:'southafrica', country:'South Africa', city:'Johannesburg', flag:'🇿🇦',
    lat:-26.20, lon:28.04, color:'#6c5ce7', utcOffset:2,
    open:'09:00', close:'17:00', tz:'SAST', weekend:[0,6],
    indices:[
      {name:'JSE ALL SHARE', val:74852.31, chg:+0.32},
      {name:'JSE TOP 40',    val:67421.85, chg:+0.28},
    ],
    topStocks:[
      {sym:'NPN', name:'Naspers Ltd',    price:'R1,842',chg:+1.2},
      {sym:'ANG', name:'Anglo American', price:'R465',  chg:+0.8},
      {sym:'BIL', name:'BHP Billiton',   price:'R548',  chg:+0.5},
    ]
  },
  { id:'nigeria', country:'Nigeria', city:'Lagos', flag:'🇳🇬',
    lat:6.52, lon:3.38, color:'#55efc4', utcOffset:1,
    open:'10:00', close:'14:30', tz:'WAT', weekend:[0,6],
    indices:[{name:'NGX ALL SHARE', val:98742.65, chg:+0.85}],
    topStocks:[
      {sym:'DANGCEM', name:'Dangote Cement',price:'₦654',chg:+1.1},
      {sym:'ZENITH',  name:'Zenith Bank',   price:'₦28', chg:+2.3},
      {sym:'GTCO',    name:'GTBank',        price:'₦38', chg:+1.6},
    ]
  },
];

const REGIONS: Record<string, string[]> = {
  'South Asia':        ['india','pakistan'],
  'East Asia':         ['japan','china','hongkong','southkorea','taiwan'],
  'SE Asia / Pacific': ['singapore','malaysia','indonesia','thailand','philippines','australia'],
  'Europe':            ['uk','germany','france','switzerland','netherlands','sweden','russia','turkey'],
  'Americas':          ['usa','canada','brazil','mexico','argentina'],
  'Middle East':       ['saudiarabia','uae','egypt'],
  'Africa':            ['southafrica','nigeria'],
};

// ═══════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════
function isOpen(mkt: Market): boolean {
  const now = new Date();
  const loc = new Date(now.getTime() + mkt.utcOffset * 3600000);
  const day = loc.getUTCDay();
  if ((mkt.weekend || [0,6]).includes(day)) return false;
  const mins = loc.getUTCHours() * 60 + loc.getUTCMinutes();
  const [oh, om] = mkt.open.split(':').map(Number);
  const [ch, cm] = mkt.close.split(':').map(Number);
  return mins >= oh * 60 + om && mins < ch * 60 + cm;
}

function localTime(mkt: Market): string {
  const loc = new Date(Date.now() + mkt.utcOffset * 3600000);
  return [loc.getUTCHours(), loc.getUTCMinutes(), loc.getUTCSeconds()]
    .map(n => String(n).padStart(2, '0')).join(':');
}

function latVec(lat: number, lon: number, r = 1): THREE.Vector3 {
  const phi = (90 - lat) * Math.PI / 180;
  const tht = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(tht),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(tht)
  );
}

function mkGlowSprite(hexColor: string, sz: number): THREE.Sprite {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d')!;
  const r = parseInt(hexColor.slice(1,3),16);
  const g = parseInt(hexColor.slice(3,5),16);
  const b = parseInt(hexColor.slice(5,7),16);
  const grd = x.createRadialGradient(32,32,0,32,32,32);
  grd.addColorStop(0,   `rgba(${r},${g},${b},1)`);
  grd.addColorStop(0.3, `rgba(${r},${g},${b},0.8)`);
  grd.addColorStop(0.6, `rgba(${r},${g},${b},0.3)`);
  grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
  x.fillStyle = grd;
  x.fillRect(0,0,64,64);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(c),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  }));
  sp.scale.set(sz, sz, 1);
  return sp;
}

// ═══════════════════════════════════════════════════════
//  LABEL BUBBLE COMPONENT
// ═══════════════════════════════════════════════════════
interface LabelProps {
  mkt: Market;
  open: boolean;
  style: React.CSSProperties;
  onClick: () => void;
}

function MarketLabel({ mkt, open, style, onClick }: LabelProps) {
  const mainIdx   = mkt.indices[0];
  const bestStock = mkt.topStocks.reduce((b, s) => s.chg > b.chg ? s : b);
  const chgCol    = mainIdx.chg >= 0 ? '#00ff9d' : '#ff3355';
  const chgTxt    = mainIdx.chg >= 0
    ? `▲${mainIdx.chg.toFixed(2)}%`
    : `▼${Math.abs(mainIdx.chg).toFixed(2)}%`;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        transform: 'translate(-50%, calc(-100% - 14px))',
        background: 'rgba(0,4,14,0.85)',
        border: '1px solid rgba(0,200,255,0.28)',
        borderRadius: 6,
        padding: '5px 9px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        whiteSpace: 'nowrap',
        minWidth: 110,
        fontFamily: "'Rajdhani', sans-serif",
        ...style,
      }}
    >
      {/* Tooltip arrow */}
      <div style={{
        position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)',
        borderLeft:'5px solid transparent', borderRight:'5px solid transparent',
        borderTop:'5px solid rgba(0,200,255,0.28)',
      }}/>
      <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:'0.78rem', fontWeight:600, color:'#cde8ff', marginBottom:2 }}>
        <span>{mkt.flag}</span>
        <span>{mkt.country}</span>
        <span style={{
          width:6, height:6, borderRadius:'50%', display:'inline-block',
          background: open ? '#00ff9d' : '#ff3355',
          boxShadow: open ? '0 0 4px #00ff9d' : 'none',
        }}/>
      </div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.62rem', color:'#5a8aad' }}>
        {mainIdx.name}: <b style={{ color:'#cde8ff' }}>{mainIdx.val.toLocaleString('en',{maximumFractionDigits:2})}</b>
        <span style={{ color: chgCol }}>&nbsp;{chgTxt}</span>
      </div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.6rem', color:'#3a6080', marginTop:1 }}>
        ★ {bestStock.sym} {bestStock.price}&nbsp;
        <span style={{ color: bestStock.chg >= 0 ? '#00ff9d' : '#ff3355' }}>
          {bestStock.chg >= 0 ? '+' : ''}{bestStock.chg.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  INFO PANEL COMPONENT
// ═══════════════════════════════════════════════════════
interface InfoPanelProps {
  mkt: Market | null;
  onClose: () => void;
}

function InfoPanel({ mkt, onClose }: InfoPanelProps) {
  const [localT, setLocalT] = useState('');

  useEffect(() => {
    if (!mkt) return;
    setLocalT(localTime(mkt));
    const iv = setInterval(() => setLocalT(localTime(mkt)), 1000);
    return () => clearInterval(iv);
  }, [mkt]);

  if (!mkt) {
    return (
      <div style={{ textAlign:'center', padding:'60px 0 0', fontFamily:"'JetBrains Mono',monospace", fontSize:'0.75rem', color:'#2a4a6a', lineHeight:2 }}>
        🌍<br/>CLICK ANY MARKER<br/>TO VIEW DETAILS
      </div>
    );
  }

  const open = isOpen(mkt);

  return (
    <>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:12, borderBottom:'1px solid rgba(0,200,255,0.1)' }}>
        <span style={{ fontSize:'2.4rem' }}>{mkt.flag}</span>
        <div>
          <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.88rem', fontWeight:700, color:'#00c8ff', letterSpacing:1 }}>
            {mkt.country.toUpperCase()}
          </div>
          <div style={{ fontSize:'0.78rem', color:'#5a8aad', marginTop:2 }}>📍 {mkt.city}</div>
        </div>
        <button
          onClick={onClose}
          style={{ marginLeft:'auto', background:'none', border:'1px solid rgba(0,200,255,0.25)', color:'#5a8aad', fontSize:'1rem', width:26, height:26, borderRadius:4, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
        >✕</button>
      </div>

      {/* Market Status */}
      <div style={{
        display:'flex', alignItems:'center', gap:8, padding:'8px 12px',
        borderRadius:6, marginBottom:12, fontFamily:"'JetBrains Mono',monospace", fontSize:'0.78rem', fontWeight:600,
        background: open ? 'rgba(0,255,157,0.07)' : 'rgba(255,51,85,0.07)',
        border: `1px solid ${open ? 'rgba(0,255,157,0.22)' : 'rgba(255,51,85,0.18)'}`,
        color: open ? '#00ff9d' : '#ff3355',
      }}>
        <div style={{
          width:8, height:8, borderRadius:'50%',
          background: open ? '#00ff9d' : '#ff3355',
          boxShadow: open ? '0 0 8px #00ff9d' : 'none',
          animation: open ? 'mePulse 1.8s infinite' : 'none',
        }}/>
        <span>{open ? '⚡ MARKET OPEN' : '🔒 MARKET CLOSED'}</span>
        <span style={{ marginLeft:'auto', fontSize:'0.68rem', color:'#5a8aad' }}>{mkt.open}–{mkt.close} {mkt.tz}</span>
      </div>

      {/* Local time */}
      <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:"'JetBrains Mono',monospace", fontSize:'0.72rem', color:'#5a8aad', marginBottom:4 }}>
        <span>🕐 Local Time:</span>
        <b style={{ color:'#8ab8d8' }}>{localT}</b>
        <span style={{ color:'#2a4a6a' }}>{mkt.tz} (UTC{mkt.utcOffset >= 0 ? '+' : ''}{mkt.utcOffset})</span>
      </div>

      {/* Indices */}
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.58rem', letterSpacing:3, color:'#2a4a6a', textTransform:'uppercase', margin:'12px 0 7px' }}>INDICES</div>
      {mkt.indices.map(ix => {
        const cc = ix.chg >= 0 ? '#00ff9d' : '#ff3355';
        const ct = ix.chg >= 0 ? `+${ix.chg.toFixed(2)}%` : `${ix.chg.toFixed(2)}%`;
        const vf = ix.val >= 10000
          ? ix.val.toLocaleString('en',{maximumFractionDigits:0})
          : ix.val.toLocaleString('en',{maximumFractionDigits:2});
        return (
          <div key={ix.name} style={{ background:'rgba(0,200,255,0.03)', border:'1px solid rgba(0,200,255,0.09)', borderRadius:6, padding:'9px 11px', marginBottom:5 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.68rem', color:'#00c8ff', fontWeight:700 }}>{ix.name}</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.72rem', fontWeight:600, padding:'2px 6px', borderRadius:3, color: cc, background: ix.chg >= 0 ? 'rgba(0,255,157,0.1)' : 'rgba(255,51,85,0.1)' }}>{ct}</span>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'1.05rem', fontWeight:700, color:'#cde8ff', marginTop:3 }}>{vf}</div>
          </div>
        );
      })}

      {/* Top Stocks */}
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.58rem', letterSpacing:3, color:'#2a4a6a', textTransform:'uppercase', margin:'12px 0 7px' }}>TOP STOCKS</div>
      {mkt.topStocks.map(s => {
        const cc = s.chg >= 0 ? '#00ff9d' : '#ff3355';
        const ct = (s.chg >= 0 ? '▲ +' : '▼ ') + Math.abs(s.chg).toFixed(1) + '%';
        return (
          <div key={s.sym} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:5, background:'rgba(0,200,255,0.02)', border:'1px solid rgba(0,200,255,0.07)', marginBottom:4 }}>
            <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.68rem', color:'#00c8ff', fontWeight:700, minWidth:60 }}>{s.sym}</span>
            <span style={{ fontSize:'0.72rem', color:'#8ab8d8', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.name}</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.75rem', color:'#cde8ff', whiteSpace:'nowrap' }}>{s.price}</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.68rem', marginLeft:'auto', whiteSpace:'nowrap', color: cc }}>{ct}</span>
          </div>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function GlobePage() {
  const navigate    = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const marketsRef  = useRef<Market[]>(MARKETS_DATA.map(m => ({
    ...m,
    indices:   m.indices.map(i => ({ ...i })),
    topStocks: m.topStocks.map(s => ({ ...s })),
  })));

  const [selMkt,    setSelMkt]    = useState<Market | null>(null);
  const [utcClock,  setUtcClock]  = useState('UTC 00:00:00');
  const [openCount, setOpenCount] = useState(0);
  const [, forceUpdate]           = useState(0);

  // Three.js refs (not state — no re-renders)
  const sceneRef    = useRef<THREE.Scene | null>(null);
  const cameraRef   = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starMatRef  = useRef<THREE.PointsMaterial | null>(null);
  const rgrpRef     = useRef<THREE.Group | null>(null);
  const animTRef    = useRef(0);
  const rafRef      = useRef<number>(0);

  // Orbit state
  const sphRef      = useRef({ theta: 0.4, phi: 1.3, r: 2.9 });
  const ptrRef      = useRef({ down: false, moved: false, t: 0, lx: 0, ly: 0 });
  const autoRotRef  = useRef(true);
  const autoTimerRef= useRef<ReturnType<typeof setTimeout> | null>(null);

  // Label positions (screen coords) — stored in ref, updated each frame
  const labelDataRef = useRef<Array<{
    mkt: Market; wpos: THREE.Vector3; screenX: number; screenY: number; opacity: number; visible: boolean;
  }>>([]);

  // Label state triggers re-render only when needed
  const [labelTick, setLabelTick] = useState(0);

  const selMktRef = useRef<Market | null>(null);
  selMktRef.current = selMkt;

  // ── BUILD SCENE ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current!;
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    renderer.setClearColor(0x000508, 1);
    rendererRef.current = renderer;

    // Scene & Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W() / H(), 0.01, 200);
    camera.position.set(0, 0, 2.9);
    sceneRef.current  = scene;
    cameraRef.current = camera;

    // Lights
    scene.add(new THREE.AmbientLight(0x112244, 0.9));
    const sun = new THREE.DirectionalLight(0xfffdf0, 1.3);
    sun.position.set(5, 3, 4); scene.add(sun);
    const rim = new THREE.DirectionalLight(0x003366, 0.5);
    rim.position.set(-4, -2, -4); scene.add(rim);

    // Stars
    const sCount = 10000;
    const sPos   = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount * 3; i++) sPos[i] = (Math.random() - .5) * 120;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.85 });
    starMatRef.current = starMat;
    scene.add(new THREE.Points(starGeo, starMat));

    const bsPos = new Float32Array(300 * 3);
    for (let i = 0; i < 300 * 3; i++) bsPos[i] = (Math.random() - .5) * 100;
    const bsGeo = new THREE.BufferGeometry();
    bsGeo.setAttribute('position', new THREE.BufferAttribute(bsPos, 3));
    scene.add(new THREE.Points(bsGeo, new THREE.PointsMaterial({ color: 0xaaddff, size: 0.1, transparent: true, opacity: 0.6 })));

    // Earth
    const earthGeo = new THREE.SphereGeometry(1, 72, 72);
    const earthMat = new THREE.MeshPhongMaterial({ color: 0x1a4a8a, shininess: 10, specular: 0x113355 });
    const earth    = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // Texture
    const txl = new THREE.TextureLoader();
    const texUrls = [
      'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_atmos_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/textures/planets/earth_atmos_2048.jpg',
    ];
    function tryTex(idx = 0) {
      if (idx >= texUrls.length) return;
      txl.load(texUrls[idx], tx => {
        earthMat.map = tx; earthMat.color.set(0xffffff); earthMat.needsUpdate = true;
      }, undefined, () => tryTex(idx + 1));
    }
    tryTex();

    // Atmosphere
    const mkAtm = (r: number, col: number, op: number) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(r, 64, 64),
        new THREE.MeshPhongMaterial({ color: col, transparent: true, opacity: op, side: THREE.FrontSide, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      scene.add(m);
    };
    mkAtm(1.06, 0x0066ff, 0.10);
    mkAtm(1.12, 0x0033cc, 0.05);
    mkAtm(1.20, 0x001166, 0.03);

    // Grid lines
    const addGrid = (pts: THREE.Vector3[], op: number) => {
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x004488, transparent: true, opacity: op })));
    };
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 362; lon += 2) pts.push(latVec(lat, lon, 1.003));
      addGrid(pts, lat === 0 ? 0.22 : 0.12);
    }
    for (let lon = 0; lon < 360; lon += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2) pts.push(latVec(lat, lon, 1.003));
      addGrid(pts, 0.08);
    }

    // Markers & pulse rings
    const mgrp = new THREE.Group(); scene.add(mgrp);
    const rgrp = new THREE.Group(); scene.add(rgrp);
    rgrpRef.current = rgrp;

    const labelData: typeof labelDataRef.current = [];

    marketsRef.current.forEach((mkt, idx) => {
      const open = isOpen(mkt);
      const col  = open ? '#00ff9d' : '#ff3355';
      const wpos = latVec(mkt.lat, mkt.lon, 1.015);

      const dot = mkGlowSprite(col, open ? 0.07 : 0.05);
      dot.position.copy(wpos); mgrp.add(dot);

      const sd = mkGlowSprite(open ? '#ffffff' : '#ff8899', open ? 0.025 : 0.018);
      sd.position.copy(wpos); mgrp.add(sd);

      if (open) {
        const g = new THREE.RingGeometry(0.012, 0.022, 20);
        const ring = new THREE.Mesh(g, new THREE.MeshBasicMaterial({
          color: 0x00ff9d, transparent: true, opacity: 0.7, side: THREE.DoubleSide,
          depthWrite: false, blending: THREE.AdditiveBlending,
        }));
        ring.position.copy(wpos);
        ring.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), wpos.clone().normalize());
        ring.userData.phase = Math.random() * Math.PI * 2;
        rgrp.add(ring);
      }

      labelData[idx] = { mkt, wpos, screenX: 0, screenY: 0, opacity: 0, visible: false };
    });

    labelDataRef.current = labelData;

    // ── ANIMATE ──────────────────────────────────────
    let frameCount = 0;
    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      animTRef.current += 0.016;
      const t = animTRef.current;

      if (autoRotRef.current) sphRef.current.theta += 0.0018;

      const { theta, phi, r } = sphRef.current;
      camera.position.set(
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.cos(theta)
      );
      camera.lookAt(0, 0, 0);

      // Pulse rings
      rgrp.children.forEach(child => {
        const ring = child as THREE.Mesh;
        const p = t * 2.5 + ring.userData.phase;
        const s = 1 + (Math.sin(p) * .5 + .5) * 2.5;
        ring.scale.setScalar(s);
        (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 * (1 - (s - 1) / 2.5));
      });

      if (starMatRef.current) starMatRef.current.opacity = 0.75 + Math.sin(t * 0.8) * 0.1;

      // Update label positions
      let changed = false;
      labelDataRef.current.forEach(ld => {
        const camDir = camera.position.clone().normalize();
        const markerDir = ld.wpos.clone().normalize();
        const dot = markerDir.dot(camDir);
        const facing = dot > 0.08;

        const v = ld.wpos.clone().project(camera);
        const sx = (v.x + 1) / 2 * W();
        const sy = -(v.y - 1) / 2 * H();
        const inView = sx > -60 && sx < W() + 60 && sy > -60 && sy < H() + 60;
        const visible = facing && inView;
        const opacity = visible ? Math.min(1, (dot - 0.08) / 0.25) : 0;

        if (ld.visible !== visible || Math.abs(ld.screenX - sx) > 0.5 || Math.abs(ld.screenY - sy) > 0.5 || Math.abs(ld.opacity - opacity) > 0.01) {
          ld.visible  = visible;
          ld.screenX  = sx;
          ld.screenY  = sy;
          ld.opacity  = opacity;
          changed = true;
        }
      });

      // Only re-render React labels every ~3 frames to avoid overhead
      frameCount++;
      if (changed && frameCount % 3 === 0) setLabelTick(f => f + 1);

      renderer.render(scene, camera);
    }
    animate();

    // ── RESIZE ───────────────────────────────────────
    function onResize() {
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  // ── POINTER / WHEEL CONTROLS ─────────────────────
  const resumeAuto = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => { autoRotRef.current = true; }, 3500);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;

    function onDown(e: PointerEvent) {
      if (e.target !== canvas) return;
      ptrRef.current = { down: true, moved: false, t: Date.now(), lx: e.clientX, ly: e.clientY };
      autoRotRef.current = false;
    }
    function onMove(e: PointerEvent) {
      if (!ptrRef.current.down) return;
      const dx = e.clientX - ptrRef.current.lx;
      const dy = e.clientY - ptrRef.current.ly;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) ptrRef.current.moved = true;
      sphRef.current.theta -= dx * 0.005;
      sphRef.current.phi = Math.max(0.15, Math.min(Math.PI - 0.15, sphRef.current.phi + dy * 0.005));
      ptrRef.current.lx = e.clientX;
      ptrRef.current.ly = e.clientY;
    }
    function onUp(e: PointerEvent) {
      if (!ptrRef.current.moved && Date.now() - ptrRef.current.t < 300) handleClick(e);
      ptrRef.current.down = false;
      resumeAuto();
    }
    function onWheel(e: WheelEvent) {
      sphRef.current.r = Math.max(1.5, Math.min(6, sphRef.current.r + e.deltaY * 0.004));
      autoRotRef.current = false;
      resumeAuto();
    }

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup',   onUp);
    canvas.addEventListener('wheel',       onWheel);

    // ── TOUCH PINCH ZOOM ─────────────────────────
    let pinchDist0 = 0;
    function getTouchDist(e: TouchEvent) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      return Math.hypot(dx, dy);
    }
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 2) { pinchDist0 = getTouchDist(e); autoRotRef.current = false; }
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 2) {
        const d = getTouchDist(e);
        const scale = pinchDist0 / d;
        sphRef.current.r = Math.max(1.5, Math.min(6, sphRef.current.r * scale));
        pinchDist0 = d;
        e.preventDefault();
      }
    }
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup',   onUp);
      canvas.removeEventListener('wheel',       onWheel);
      canvas.removeEventListener('touchstart',  onTouchStart);
      canvas.removeEventListener('touchmove',   onTouchMove);
    };
  }, [resumeAuto]);

  function handleClick(e: PointerEvent) {
    let best: Market | null = null;
    let bestD = 45;
    const camera = cameraRef.current!;
    const W = window.innerWidth, H = window.innerHeight;

    labelDataRef.current.forEach(ld => {
      if (!ld.visible) return;
      const d = Math.hypot(e.clientX - ld.screenX, e.clientY - ld.screenY);
      if (d < bestD) { bestD = d; best = ld.mkt; }
    });
    if (best) selectMkt(best);
  }

  // ── MARKET SELECTION ─────────────────────────────
  function selectMkt(mkt: Market) {
    setSelMkt(mkt);
  }
  function closeMkt() {
    setSelMkt(null);
  }

  // ── SIDEBAR OPEN COUNT ───────────────────────────
  useEffect(() => {
    const count = marketsRef.current.filter(m => isOpen(m)).length;
    setOpenCount(count);
  }, []);

  // ── UTC CLOCK ────────────────────────────────────
  useEffect(() => {
    function tick() {
      const n = new Date();
      const ut = [n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds()]
        .map(x => String(x).padStart(2,'0')).join(':');
      setUtcClock(`UTC ${ut}`);
    }
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // ── PRICE TICK ───────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      marketsRef.current.forEach(mkt => {
        mkt.indices.forEach(ix => {
          const d = (Math.random() - .5) * 0.006;
          ix.val *= (1 + d * 0.05);
          ix.chg = Math.max(-8, Math.min(8, ix.chg + d));
        });
        mkt.topStocks.forEach(s => {
          const d = (Math.random() - .5) * 0.15;
          s.chg = Math.max(-8, Math.min(8, s.chg + d));
        });
      });
      setOpenCount(marketsRef.current.filter(m => isOpen(m)).length);
      forceUpdate(f => f + 1);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  // ── RENDER ───────────────────────────────────────
  const markets = marketsRef.current;

  // ── INJECT FONTS & GLOBAL STYLES ────────────────
  useEffect(() => {
    // Google Fonts
    if (!document.getElementById('me-font-link')) {
      const preconn = document.createElement('link');
      preconn.rel = 'preconnect';
      preconn.href = 'https://fonts.googleapis.com';
      preconn.id = 'me-font-preconn';
      document.head.appendChild(preconn);

      const fontLink = document.createElement('link');
      fontLink.id   = 'me-font-link';
      fontLink.rel  = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap';
      document.head.appendChild(fontLink);
    }

    // Global styles
    if (!document.getElementById('me-global-style')) {
      const style = document.createElement('style');
      style.id = 'me-global-style';
      style.textContent = `
        *,*::before,*::after{box-sizing:border-box}
        html,body{width:100%;height:100%;overflow:hidden;background:#000508}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(0,200,255,0.3);border-radius:2px}
        @keyframes mePulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.6}}
        @keyframes meDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.6}}
        .me-sidebar::-webkit-scrollbar{width:3px}
        .me-sidebar::-webkit-scrollbar-thumb{background:rgba(0,200,255,0.2)}
        .me-ip::-webkit-scrollbar{width:3px}
        .me-ip::-webkit-scrollbar-thumb{background:rgba(0,200,255,0.2)}
        .me-back-btn:hover{background:rgba(0,200,255,0.15)!important;border-color:rgba(0,200,255,0.6)!important;color:#00c8ff!important;}
        .me-hamburger:hover{background:rgba(0,200,255,0.1)!important;}
        .me-mli:hover{background:rgba(0,200,255,0.05);border-left-color:rgba(0,200,255,0.4)!important;}
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Clean up on unmount
      document.getElementById('me-font-preconn')?.remove();
      document.getElementById('me-font-link')?.remove();
      document.getElementById('me-global-style')?.remove();
    };
  }, []);

  return (
    <>
      {/* Globe Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position:'fixed', inset:0, width:'100%', height:'100%', display:'block', cursor:'grab', background:'#000508' }}
      />

      {/* Labels layer — hidden on mobile to avoid clutter */}
      {!isMobile && (
        <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:50 }}>
          {labelDataRef.current.map((ld, i) => {
            if (!ld.visible) return null;
            return (
              <div key={markets[i].id} style={{ pointerEvents:'all' }}>
                <MarketLabel
                  mkt={markets[i]}
                  open={isOpen(markets[i])}
                  style={{ left: ld.screenX, top: ld.screenY, opacity: ld.opacity }}
                  onClick={() => selectMkt(markets[i])}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, height: isMobile ? 48 : 52,
        display:'flex', alignItems:'center', padding: isMobile ? '0 10px' : '0 16px',
        gap: isMobile ? 8 : 12,
        background:'rgba(0,4,12,0.92)', borderBottom:'1px solid rgba(0,200,255,0.12)',
        backdropFilter:'blur(20px)', zIndex:200,
        fontFamily:"'Rajdhani',sans-serif",
      }}>

        {/* Back Button */}
        <button
          className="me-back-btn"
          onClick={() => navigate(-1)}
          title="Go back"
          style={{
            display:'flex', alignItems:'center', gap:5,
            background:'rgba(0,200,255,0.06)',
            border:'1px solid rgba(0,200,255,0.25)',
            color:'#5a8aad', cursor:'pointer',
            borderRadius:5, padding: isMobile ? '4px 8px' : '5px 10px',
            fontFamily:"'JetBrains Mono',monospace",
            fontSize: isMobile ? '0.65rem' : '0.7rem',
            letterSpacing:1, whiteSpace:'nowrap',
            transition:'all .18s',
            flexShrink:0,
          }}
        >
          <span style={{ fontSize: isMobile ? '0.75rem' : '0.85rem' }}>←</span>
          {!isMobile && <span>BACK</span>}
        </button>

        {/* Logo */}
        <div style={{
          fontFamily:"'Orbitron',sans-serif",
          fontSize: isMobile ? '0.75rem' : '1rem',
          fontWeight:900, color:'#00c8ff',
          letterSpacing: isMobile ? 1 : 3,
          textShadow:'0 0 20px rgba(0,200,255,0.6)',
          whiteSpace:'nowrap',
        }}>
          🌍 Fin<span style={{ color:'#00ff9d' }}>Quest</span>
        </div>

        {/* Stats — hide on small mobile */}
        {!isMobile && [['OPEN', String(openCount)], ['MARKETS', '30'], ['INDICES', '55+']].map(([k,v]) => (
          <div key={k} style={{
            fontFamily:"'JetBrains Mono',monospace", fontSize:'0.72rem',
            padding:'4px 10px', borderRadius:4,
            border:'1px solid rgba(0,200,255,0.18)', background:'rgba(0,200,255,0.04)',
            color:'#6a9bbf', whiteSpace:'nowrap',
          }}>
            {k} <b style={{ color:'#cde8ff', marginLeft:4 }}>{v}</b>
          </div>
        ))}

        {/* Open count on mobile */}
        {isMobile && (
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.62rem', padding:'3px 7px', borderRadius:4, border:'1px solid rgba(0,200,255,0.18)', background:'rgba(0,200,255,0.04)', color:'#6a9bbf' }}>
            OPEN <b style={{ color:'#00ff9d', marginLeft:3 }}>{openCount}</b>
          </div>
        )}

        {!isMobile && (
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.62rem', color:'#2a4a6a', letterSpacing:1, whiteSpace:'nowrap' }}>DRAG · ZOOM · CLICK</div>
        )}

        {/* UTC clock */}
        <div style={{ marginLeft:'auto', fontFamily:"'JetBrains Mono',monospace", fontSize: isMobile ? '0.62rem' : '0.78rem', color:'#3a6a8f', letterSpacing:1, whiteSpace:'nowrap' }}>
          {isMobile ? utcClock.replace('UTC ', '') : utcClock}
        </div>

        {/* Hamburger (mobile) */}
        {isMobile && (
          <button
            className="me-hamburger"
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              background:'rgba(0,200,255,0.06)', border:'1px solid rgba(0,200,255,0.2)',
              color:'#5a8aad', cursor:'pointer', borderRadius:5,
              width:32, height:32, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:4, padding:6,
              flexShrink:0, transition:'all .18s',
            }}
          >
            {[0,1,2].map(i => (
              <div key={i} style={{ width:14, height:1.5, background: sidebarOpen ? '#00c8ff' : '#5a8aad', borderRadius:2, transition:'all .2s' }}/>
            ))}
          </button>
        )}
      </div>

      {/* ── SIDEBAR ── */}
      {/* Mobile overlay backdrop */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:149, backdropFilter:'blur(2px)' }}
        />
      )}

      <div className="me-sidebar" style={{
        position:'fixed',
        top: isMobile ? 48 : 52,
        left: 0, bottom: 0,
        width: isMobile ? 200 : 215,
        background:'rgba(0,4,14,0.95)',
        borderRight:'1px solid rgba(0,200,255,0.1)',
        backdropFilter:'blur(20px)', zIndex:150, overflowY:'auto', padding:'8px 0',
        fontFamily:"'Rajdhani',sans-serif",
        // Mobile: slide in/out
        transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        transition: isMobile ? 'transform .28s cubic-bezier(.4,0,.2,1)' : 'none',
      }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.56rem', letterSpacing:3, color:'#2a4a6a', textTransform:'uppercase', padding:'8px 14px 3px' }}>WORLD MARKETS</div>
        {Object.entries(REGIONS).map(([rgn, ids]) => (
          <div key={rgn}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.56rem', letterSpacing:3, color:'#2a4a6a', textTransform:'uppercase', padding:'8px 14px 3px' }}>{rgn}</div>
            {ids.map(id => {
              const mkt = markets.find(m => m.id === id);
              if (!mkt) return null;
              const open = isOpen(mkt);
              const mi   = mkt.indices[0];
              const cc   = mi.chg >= 0 ? '#00ff9d' : '#ff3355';
              const ct   = mi.chg >= 0 ? `▲${mi.chg.toFixed(2)}%` : `▼${Math.abs(mi.chg).toFixed(2)}%`;
              const isSel = selMkt?.id === mkt.id;
              return (
                <div
                  key={id}
                  className="me-mli"
                  onClick={() => { selectMkt(mkt); if (isMobile) setSidebarOpen(false); }}
                  style={{
                    display:'flex', alignItems:'center', gap:8, padding:'7px 12px',
                    cursor:'pointer',
                    borderLeft: isSel ? '2px solid #00c8ff' : '2px solid transparent',
                    background: isSel ? 'rgba(0,200,255,0.08)' : 'transparent',
                    fontSize:'0.82rem', transition:'all .18s',
                  }}
                >
                  <span style={{ fontSize:'0.95rem', flexShrink:0 }}>{mkt.flag}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:600, color:'#cde8ff', fontSize:'0.8rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{mkt.country}</div>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.6rem', color:'#5a8aad', whiteSpace:'nowrap' }}>
                      {mi.name} <span style={{ color: cc }}>{ct}</span>
                    </div>
                  </div>
                  <div style={{
                    width:7, height:7, borderRadius:'50%', flexShrink:0,
                    background: open ? '#00ff9d' : 'rgba(255,51,85,0.5)',
                    boxShadow: open ? '0 0 5px #00ff9d' : 'none',
                  }}/>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── INFO PANEL ── */}
      <div className="me-ip" style={{
        position:'fixed',
        top: isMobile ? 48 : 52,
        right: 0,
        // Mobile: full-width bottom sheet; desktop: right panel
        bottom: 0,
        width: isMobile ? '100%' : 310,
        background:'rgba(0,4,14,0.96)',
        borderLeft: isMobile ? 'none' : '1px solid rgba(0,200,255,0.12)',
        borderTop: isMobile ? '1px solid rgba(0,200,255,0.15)' : 'none',
        backdropFilter:'blur(20px)', zIndex:160, overflowY:'auto', padding:14,
        transform: selMkt
          ? (isMobile ? 'translateY(0)' : 'translateX(0)')
          : (isMobile ? 'translateY(100%)' : 'translateX(100%)'),
        transition:'transform .32s cubic-bezier(.4,0,.2,1)',
        fontFamily:"'Rajdhani',sans-serif",
        // Mobile: only take 70% height
        ...(isMobile && selMkt ? { top:'auto', height:'72%' } : {}),
      }}>
        <InfoPanel mkt={selMkt} onClose={closeMkt} />
      </div>

      {/* ── LEGEND ── */}
      <div style={{
        position:'fixed', bottom: isMobile ? 10 : 14,
        left:'50%', transform:'translateX(-50%)',
        display:'flex', gap: isMobile ? 10 : 14,
        background:'rgba(0,4,14,0.82)', border:'1px solid rgba(0,200,255,0.1)',
        borderRadius:6, padding: isMobile ? '5px 10px' : '7px 14px',
        backdropFilter:'blur(10px)', zIndex:200, pointerEvents:'none',
        fontFamily:"'JetBrains Mono',monospace",
      }}>
        {[
          { label:'Market Open',    dot:{ background:'#00ff9d', boxShadow:'0 0 5px #00ff9d' } },
          { label:'Market Closed',  dot:{ background:'#ff3355' } },
          { label: isMobile ? 'Tap' : 'Click to Explore', dot:{ background:'linear-gradient(135deg,#00c8ff,#00ff9d)' } },
        ].map(({ label, dot }) => (
          <div key={label} style={{ display:'flex', alignItems:'center', gap:5, fontSize: isMobile ? '0.52rem' : '0.6rem', color:'#5a8aad' }}>
            <div style={{ width: isMobile ? 6 : 7, height: isMobile ? 6 : 7, borderRadius:'50%', flexShrink:0, ...dot }}/>
            {label}
          </div>
        ))}
      </div>

      {/* Mobile: tap-globe hint (only when no panel open) */}
      {isMobile && !selMkt && (
        <div style={{
          position:'fixed', bottom:36, left:'50%', transform:'translateX(-50%)',
          fontFamily:"'JetBrains Mono',monospace", fontSize:'0.55rem',
          color:'#2a4a6a', letterSpacing:2, whiteSpace:'nowrap', zIndex:200, pointerEvents:'none',
        }}>
          TAP GLOBE · PINCH ZOOM · DRAG ROTATE
        </div>
      )}
    </>
  );
}