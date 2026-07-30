export type NavigationTab = 
  | 'dashboard'
  | 'land_portal'
  | 'surveyor_map'
  | 'subscription'
  | 'weather_geo';

export type UserRole = 'landowner' | 'surveyor' | 'ministry';

export type LandStatus = 
  | 'Draft'
  | 'Pending Review'
  | 'Submitted'
  | 'Beacon Verification'
  | 'Surveyor Assigned'
  | 'Ministry Review'
  | 'Approved';

export type SurveyType = 
  | 'Boundary Survey'
  | 'Topographic Survey'
  | 'Cadastral Survey'
  | 'Subdivision / Partition'
  | 'As-Built Survey';

export type TerrainType = 
  | 'Flat Urban / Dry Land'
  | 'Hilly / Elevated Terrain'
  | 'Swampy / Wetland'
  | 'Dense Forest / Heavy Brush';

export type UrgencyLevel = 'Standard (5-7 Days)' | 'Express (48 Hours)' | 'Emergency (24 Hours)';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'title_deed' | 'deed_of_assignment' | 'survey_plan' | 'passport_photo' | 'tax_clearance' | 'other';
  sizeFormatted: string;
  uploadDate: string;
  status: 'Verified' | 'Pending Review' | 'Uploaded';
  fileUrl?: string;
}

export interface LandParcel {
  id: string;
  title: string;
  alias?: string;
  landSizeSqm: number;
  acreage: number;
  state: string;
  lga: string;
  address: string;
  zoning: 'Residential' | 'Commercial' | 'Agricultural' | 'Industrial' | 'Mixed Use';
  coordinates: Coordinate;
  beacons: string[];
  status: LandStatus;
  cOfONumber?: string;
  registrationDate: string;
  estimatedValueUSD?: number;
  documents: DocumentItem[];
  notes?: string;
  ownerName: string;
  surveyorAssigned?: string;
  applicationProgressPercent: number;
}

export interface Surveyor {
  id: string;
  name: string;
  firmName: string;
  rating: number;
  reviewsCount: number;
  completedSurveys: number;
  phone: string;
  email: string;
  avatarUrl: string;
  status: 'Available' | 'En Route' | 'On Site' | 'Busy';
  location: Coordinate & { address: string };
  proximityKm: number;
  baseRateUSD: number;
  licenseNumber: string;
  badge: 'Certified NIS' | 'Senior Cadastral' | 'GIS Specialist';
  equipment: string[];
}

export interface SurveyRequest {
  id: string;
  parcelId?: string;
  parcelTitle: string;
  surveyType: SurveyType;
  coordinates: Coordinate;
  landSizeSqm: number;
  terrainType: TerrainType;
  urgency: UrgencyLevel;
  estimatedCostUSD: number;
  status: 'Requested' | 'Assigned' | 'En Route' | 'In Progress' | 'Completed';
  assignedSurveyorId?: string;
  assignedSurveyorName?: string;
  createdAt: string;
  targetDate: string;
  clientNotes?: string;
}

export interface WeatherInfo {
  locationName: string;
  tempC: number;
  condition: string;
  conditionCategory: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Windy' | 'Clear';
  humidityPercent: number;
  windSpeedKmh: number;
  pressureHpa: number;
  cloudCoverPercent: number;
  visibilityKm: number;
  uvIndex: number;
  gpsAccuracyMeters: number;
  satellitesConnected: number;
  surveySuitabilityScore: number; // 0-100
  droneFlightSafe: boolean;
  solarNoon: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'dispatch';
  read: boolean;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  subtitle: string;
  priceMonthly: number;
  priceAnnual: number;
  userCategory: string;
  badge?: string;
  features: PlanFeature[];
  ctaText: string;
  isPopular?: boolean;
}
