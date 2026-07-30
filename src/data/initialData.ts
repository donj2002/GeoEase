import { LandParcel, Surveyor, SurveyRequest, WeatherInfo, NotificationItem, SubscriptionPlan } from '../types';

export const INITIAL_LAND_PARCELS: LandParcel[] = [
  {
    id: 'PARCEL-2026-001',
    title: 'Epe Ocean-View Sector A',
    alias: 'Epe Coastal Estate Plot 4B',
    landSizeSqm: 1800,
    acreage: 0.445,
    state: 'Lagos State',
    lga: 'Epe',
    address: 'Kilometer 14, Lekki-Epe Expressway, Epe, Lagos',
    zoning: 'Residential',
    coordinates: { lat: 6.5818, lng: 3.9821 },
    beacons: ['BC/2026/EP-8801', 'BC/2026/EP-8802', 'BC/2026/EP-8803', 'BC/2026/EP-8804'],
    status: 'Approved',
    cOfONumber: 'CofO/2026/LG/994102',
    registrationDate: '2026-03-15',
    estimatedValueUSD: 85000,
    ownerName: 'Engr. Donald Nwajiaku',
    surveyorAssigned: 'Surv. Adebayo Ogunlesi (GIS-042)',
    applicationProgressPercent: 100,
    notes: 'Primary residential plot with approved perimeter survey and beacon verification completed.',
    documents: [
      { id: 'doc-101', name: 'Approved_Perimeter_Survey_Epe.pdf', type: 'survey_plan', sizeFormatted: '3.4 MB', uploadDate: '2026-03-10', status: 'Verified' },
      { id: 'doc-102', name: 'Deed_of_Assignment_Stamped.pdf', type: 'deed_of_assignment', sizeFormatted: '1.8 MB', uploadDate: '2026-03-11', status: 'Verified' },
      { id: 'doc-103', name: 'Lagos_State_Tax_Clearance_2026.pdf', type: 'tax_clearance', sizeFormatted: '890 KB', uploadDate: '2026-03-12', status: 'Verified' },
      { id: 'doc-104', name: 'Certificate_of_Occupancy_Issued.pdf', type: 'title_deed', sizeFormatted: '4.1 MB', uploadDate: '2026-03-15', status: 'Verified' },
    ]
  },
  {
    id: 'PARCEL-2026-002',
    title: 'Maitama Extension Hill Crest',
    alias: 'Abuja Central Parcel 12',
    landSizeSqm: 4500,
    acreage: 1.11,
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal (AMAC)',
    address: 'Plot 104, Diplomatic Zone Road, Maitama, Abuja',
    zoning: 'Commercial',
    coordinates: { lat: 9.0820, lng: 7.4951 },
    beacons: ['BC/2026/FCT-102', 'BC/2026/FCT-103', 'BC/2026/FCT-104', 'BC/2026/FCT-105', 'BC/2026/FCT-106'],
    status: 'Ministry Review',
    registrationDate: '2026-06-20',
    estimatedValueUSD: 340000,
    ownerName: 'GeoEase Development Corp',
    surveyorAssigned: 'GeoSpatial Consults Ltd',
    applicationProgressPercent: 80,
    notes: 'Awaiting final signature from AGIS Ministry Director after successful beacon inspection.',
    documents: [
      { id: 'doc-201', name: 'AGIS_Cadastral_Survey_Draft.pdf', type: 'survey_plan', sizeFormatted: '5.1 MB', uploadDate: '2026-06-18', status: 'Verified' },
      { id: 'doc-202', name: 'Power_of_Attorney_Notarized.pdf', type: 'deed_of_assignment', sizeFormatted: '2.2 MB', uploadDate: '2026-06-19', status: 'Verified' },
    ]
  },
  {
    id: 'PARCEL-2026-003',
    title: 'Port Harcourt Trans-Amadi Hub',
    alias: 'Trans-Amadi Logistics Yard',
    landSizeSqm: 12000,
    acreage: 2.96,
    state: 'Rivers State',
    lga: 'Port Harcourt City',
    address: 'Industrial Layout Phase II, Trans-Amadi, Port Harcourt',
    zoning: 'Industrial',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    beacons: ['BC/2026/RV-551', 'BC/2026/RV-552', 'BC/2026/RV-553', 'BC/2026/RV-554'],
    status: 'Surveyor Assigned',
    registrationDate: '2026-07-05',
    estimatedValueUSD: 520000,
    ownerName: 'Rivers Logistics Services',
    surveyorAssigned: 'Surv. Chidi Okonkwo (FNIS)',
    applicationProgressPercent: 50,
    notes: 'Topographic contour and soil bearing survey underway by dispatched field team.',
    documents: [
      { id: 'doc-301', name: 'Site_Layout_Draft_Plan.pdf', type: 'survey_plan', sizeFormatted: '2.9 MB', uploadDate: '2026-07-04', status: 'Pending Review' }
    ]
  },
  {
    id: 'PARCEL-2026-004',
    title: 'Ibadan Bodija Agri-Tech Zone',
    alias: 'Bodija Plot 88',
    landSizeSqm: 5000,
    acreage: 1.23,
    state: 'Oyo State',
    lga: 'Ibadan North',
    address: 'Old Bodija Estate Way, Ibadan',
    zoning: 'Agricultural',
    coordinates: { lat: 7.4221, lng: 3.9012 },
    beacons: ['BC/2026/OY-091', 'BC/2026/OY-092'],
    status: 'Beacon Verification',
    registrationDate: '2026-07-18',
    estimatedValueUSD: 62000,
    ownerName: 'GreenPastures Farms',
    surveyorAssigned: 'Surv. Folake Adeleke',
    applicationProgressPercent: 35,
    notes: 'Beacon stone placement verified via GNSS RTK satellite coordinates.',
    documents: [
      { id: 'doc-401', name: 'Purchase_Receipt_Oyo_Government.pdf', type: 'other', sizeFormatted: '1.2 MB', uploadDate: '2026-07-17', status: 'Verified' }
    ]
  }
];

export const INITIAL_SURVEYORS: Surveyor[] = [
  {
    id: 'SURV-001',
    name: 'Surv. Adebayo Ogunlesi',
    firmName: 'AeroGeo Precision Surveys',
    rating: 4.9,
    reviewsCount: 88,
    completedSurveys: 142,
    phone: '+234 803 456 7890',
    email: 'adebayo@aerogeo.ng',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    status: 'Available',
    location: { lat: 6.5244, lng: 3.3792, address: 'Ikeja, Lagos State' },
    proximityKm: 3.2,
    baseRateUSD: 180,
    licenseNumber: 'NIS-SURV-2018-9941',
    badge: 'Senior Cadastral',
    equipment: ['Multi-Frequency RTK GNSS Rover', 'LiDAR Survey Drone', 'Total Station Leica TS16']
  },
  {
    id: 'SURV-002',
    name: 'Surv. Chidi Okonkwo',
    firmName: 'Delta-Geo Integrated Ltd',
    rating: 4.8,
    reviewsCount: 64,
    completedSurveys: 98,
    phone: '+234 802 987 6543',
    email: 'chidi@deltageo.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'En Route',
    location: { lat: 4.8156, lng: 7.0498, address: 'Trans-Amadi, Port Harcourt' },
    proximityKm: 1.8,
    baseRateUSD: 210,
    licenseNumber: 'NIS-SURV-2015-4412',
    badge: 'Certified NIS',
    equipment: ['Trimble R12i GNSS Receiver', 'Fixed-Wing Mapping Drone', 'Digital Echo Sounder']
  },
  {
    id: 'SURV-003',
    name: 'Surv. Folake Adeleke',
    firmName: 'Apex GIS Solutions',
    rating: 4.95,
    reviewsCount: 112,
    completedSurveys: 210,
    phone: '+234 814 111 2233',
    email: 'folake@apexgis.ng',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    status: 'Available',
    location: { lat: 7.3775, lng: 3.9470, address: 'Bodija, Ibadan, Oyo State' },
    proximityKm: 4.5,
    baseRateUSD: 160,
    licenseNumber: 'NIS-SURV-2019-3310',
    badge: 'GIS Specialist',
    equipment: ['RTK Base Station & Rover Pair', 'DJI Mavic 3 Enterprise RTK Drone']
  },
  {
    id: 'SURV-004',
    name: 'Surv. Ibrahim Hassan',
    firmName: 'Capital Cadastral Systems',
    rating: 4.7,
    reviewsCount: 45,
    completedSurveys: 76,
    phone: '+234 805 333 4455',
    email: 'ibrahim@capitalcadastral.org',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    status: 'On Site',
    location: { lat: 9.0765, lng: 7.3986, address: 'Central Business District, Abuja' },
    proximityKm: 5.1,
    baseRateUSD: 240,
    licenseNumber: 'NIS-SURV-2016-7782',
    badge: 'Senior Cadastral',
    equipment: ['Emlid Reach RS2+ Multi-band RTK', 'Laser Scanner Faro Focus Premium']
  }
];

export const INITIAL_WEATHER: WeatherInfo = {
  locationName: 'Lagos & Coastline Region (Sector 4)',
  tempC: 28.5,
  condition: 'Partly Sunny & Ideal Survey Conditions',
  conditionCategory: 'Partly Cloudy',
  humidityPercent: 62,
  windSpeedKmh: 11.2,
  pressureHpa: 1013.4,
  cloudCoverPercent: 25,
  visibilityKm: 14.5,
  uvIndex: 6,
  gpsAccuracyMeters: 0.35,
  satellitesConnected: 22,
  surveySuitabilityScore: 94,
  droneFlightSafe: true,
  solarNoon: '12:42 PM'
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'C of O Application Update',
    message: 'Ministry review stage for Epe Ocean-View Sector A has been completed! Certificate issued.',
    timestamp: '10 mins ago',
    type: 'success',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Surveyor Dispatched',
    message: 'Surv. Adebayo Ogunlesi accepted your boundary verification dispatch for Epe plot.',
    timestamp: '1 hour ago',
    type: 'dispatch',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Optimal Survey Window',
    message: 'Satellite lock quality is currently 94% (0.35m accuracy). Ideal window for drone & RTK plotting.',
    timestamp: '3 hours ago',
    type: 'info',
    read: true
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_freemium',
    name: 'Landowner Freemium',
    subtitle: 'Essential land registration & C of O status tracking for individual property owners.',
    priceMonthly: 0,
    priceAnnual: 0,
    userCategory: 'Individual Landowners',
    ctaText: 'Current Active Plan',
    features: [
      { text: 'Register up to 2 Land Plots for C of O', included: true },
      { text: 'Standard C of O Application Status Tracker', included: true },
      { text: 'On-Demand Surveyor Dispatch Access', included: true },
      { text: 'Basic GPS & Weather Conditions Widget', included: true },
      { text: 'High-Precision RTK Satellite Coordinate Export', included: false },
      { text: 'Ministry Fast-Track Verification Queue', included: false },
      { text: 'Multi-User Agency Team Dashboard', included: false },
      { text: 'Automated CAD & GIS Shapefile Exporter', included: false }
    ]
  },
  {
    id: 'plan_pro',
    name: 'Surveyor Agency Pro',
    subtitle: 'Full-featured GeoTech suite for licensed surveyors, land brokers, and field survey teams.',
    priceMonthly: 49,
    priceAnnual: 39,
    userCategory: 'Surveyors & Land Agencies',
    badge: 'MOST POPULAR',
    isPopular: true,
    ctaText: 'Upgrade to Pro',
    features: [
      { text: 'Unlimited Land Plots & C of O Pipeline', included: true },
      { text: 'Priority Ministry Beacon & Title Verification', included: true },
      { text: 'Instant Surveyor Dispatch Request Routing', included: true },
      { text: 'Real-Time GNSS / RTK Satellite Telemetry', included: true },
      { text: 'Export DXF, SHP, GeoJSON & DWG Files', included: true },
      { text: 'Customized Survey Cost Estimation Tool', included: true },
      { text: 'Team Management (Up to 10 Field Agents)', included: true },
      { text: 'Dedicated Ministry Liaison Support', included: false }
    ]
  },
  {
    id: 'plan_enterprise',
    name: 'Government & Enterprise',
    subtitle: 'For State Ministries of Land, Urban Planning Boards, & Large Infrastructure Developers.',
    priceMonthly: 299,
    priceAnnual: 239,
    userCategory: 'Government & Corporations',
    ctaText: 'Contact Enterprise Sales',
    features: [
      { text: 'Unlimited Enterprise Users & Ministry Clerks', included: true },
      { text: 'Full GIS Cadastral Map Integration API', included: true },
      { text: 'Smart Contract Land Title Tokenization', included: true },
      { text: 'Automated Beacon Stone Fraud Prevention', included: true },
      { text: 'LiDAR Drone Survey Fleet Coordination', included: true },
      { text: '24/7 Priority SLA & Dedicated Account Lead', included: true },
      { text: 'Custom Webhook & ERP Database Connector', included: true },
      { text: 'White-Label Government Portal Branding', included: true }
    ]
  }
];
