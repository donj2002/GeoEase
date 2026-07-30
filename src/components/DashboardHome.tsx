import React, { useState } from 'react';
import { 
  Compass, 
  Plus, 
  CloudSun, 
  ShieldCheck, 
  FileCheck, 
  Clock, 
  MapPin, 
  Building2, 
  Ruler, 
  Layers, 
  ArrowRight, 
  TrendingUp, 
  Satellite, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Eye,
  Wind,
  Droplets,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { LandParcel, WeatherInfo, Surveyor, SurveyRequest, NavigationTab } from '../types';

interface DashboardHomeProps {
  landParcels: LandParcel[];
  weather: WeatherInfo;
  surveyors: Surveyor[];
  activeRequests: SurveyRequest[];
  onNavigate: (tab: NavigationTab) => void;
  onOpenRegisterModal: () => void;
  onOpenSurveyorModal: () => void;
  onSelectParcelForCertificate: (parcel: LandParcel) => void;
  searchQuery: string;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  landParcels,
  weather,
  surveyors,
  activeRequests,
  onNavigate,
  onOpenRegisterModal,
  onOpenSurveyorModal,
  onSelectParcelForCertificate,
  searchQuery
}) => {
  const [selectedParcelDetail, setSelectedParcelDetail] = useState<LandParcel | null>(null);

  // Filter parcels based on search query
  const filteredParcels = landParcels.filter(p => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.lga.toLowerCase().includes(query) ||
      p.state.toLowerCase().includes(query) ||
      p.beacons.some(b => b.toLowerCase().includes(query)) ||
      (p.cOfONumber && p.cOfONumber.toLowerCase().includes(query))
    );
  });

  const approvedCount = landParcels.filter(p => p.status === 'Approved').length;
  const pendingCount = landParcels.filter(p => p.status !== 'Approved').length;
  const totalAreaSqm = landParcels.reduce((acc, p) => acc + p.landSizeSqm, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 p-6 md:p-8 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official PropTech & Cadastral Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">GeoEase Cadastral Dashboard</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Bypass traditional bureaucratic bottlenecks. Manage C of O land registrations, request on-demand licensed field survey teams, and verify GPS beacon coordinates with real-time GNSS satellite telemetry.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={onOpenSurveyorModal}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2.5 transition-all border border-emerald-300/40"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Request Surveyor Team</span>
            </button>
            <button
              onClick={onOpenRegisterModal}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Register New Land</span>
            </button>
          </div>
        </div>

        {/* Quick Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Active Registrations</span>
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white mt-1">{landParcels.length} <span className="text-xs font-normal text-slate-400">plots</span></div>
            <div className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>All recorded in system</span>
            </div>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>C of O Issued</span>
              <FileCheck className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400 mt-1">{approvedCount} <span className="text-xs font-normal text-slate-400">titles</span></div>
            <div className="text-[11px] text-slate-400 mt-0.5">Verified certificates</div>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Pending Review</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-amber-400 mt-1">{pendingCount} <span className="text-xs font-normal text-slate-400">in pipeline</span></div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ministry processing</div>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Surveyed Area</span>
              <Ruler className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-white mt-1">{(totalAreaSqm / 10000).toFixed(2)} <span className="text-xs font-normal text-slate-400">ha</span></div>
            <div className="text-[11px] text-sky-400 mt-0.5">{totalAreaSqm.toLocaleString()} SQM</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Land Registrations List + Side Weather & Dispatch Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Active Land Registrations Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span>Active Land Registrations & C of O Status</span>
              </h2>
              <p className="text-xs text-slate-400">Real-time status of submitted parcels, beacon verification, and title deeds</p>
            </div>
            <button
              onClick={() => onNavigate('land_portal')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {filteredParcels.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-sm font-semibold text-white">No land parcels match "{searchQuery}"</p>
              <p className="text-xs text-slate-400">Try clearing your search or add a new land plot.</p>
              <button
                onClick={onOpenRegisterModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-medium"
              >
                <Plus className="w-4 h-4" /> Register New Parcel
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredParcels.map((parcel) => {
                const isApproved = parcel.status === 'Approved';
                return (
                  <div 
                    key={parcel.id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-lg space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-emerald-400 font-mono">{parcel.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            isApproved 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                              : parcel.status === 'Ministry Review' 
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}>
                            {parcel.status}
                          </span>
                          <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                            {parcel.zoning}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mt-1">{parcel.title}</h3>
                      </div>

                      <div className="text-right sm:text-right shrink-0">
                        <div className="text-sm font-bold text-white">{parcel.landSizeSqm.toLocaleString()} SQM</div>
                        <div className="text-xs text-slate-400">({parcel.acreage} Acres)</div>
                      </div>
                    </div>

                    {/* Location & Beacons Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{parcel.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Satellite className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate font-mono">
                          GPS: {parcel.coordinates.lat.toFixed(4)}, {parcel.coordinates.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar & Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-400 font-medium">Pipeline Progress</span>
                          <span className="text-emerald-400 font-bold">{parcel.applicationProgressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${parcel.applicationProgressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isApproved ? (
                          <button
                            onClick={() => onSelectParcelForCertificate(parcel)}
                            className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-500/40 flex items-center gap-1.5 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>View C of O Certificate</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onNavigate('land_portal')}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Track Review</span>
                          </button>
                        )}
                        <button
                          onClick={() => onNavigate('surveyor_map')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Dispatch Team</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column (1 col): Weather Widget + Active Surveyor Dispatches */}
        <div className="space-y-6">
          
          {/* Weather & Satellite Condition Widget (As requested in User Prompt) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Weather & Telemetry</h3>
                  <p className="text-[11px] text-slate-400">{weather.locationName}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                Live Feed
              </span>
            </div>

            {/* Temperature & Conditions */}
            <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="text-3xl font-extrabold text-white tracking-tight">{weather.tempC}°C</div>
                <div className="text-xs font-medium text-emerald-400 mt-0.5">{weather.condition}</div>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1 justify-end">
                  <Droplets className="w-3.5 h-3.5 text-sky-400" />
                  <span>{weather.humidityPercent}% Humidity</span>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Wind className="w-3.5 h-3.5 text-teal-400" />
                  <span>{weather.windSpeedKmh} km/h Wind</span>
                </div>
              </div>
            </div>

            {/* Survey Suitability Gauge */}
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Satellite className="w-4 h-4 text-emerald-400" />
                  Survey & Drone Suitability
                </span>
                <span className="font-extrabold text-emerald-400 text-sm">{weather.surveySuitabilityScore}% Optimal</span>
              </div>
              
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 h-2 rounded-full" 
                  style={{ width: `${weather.surveySuitabilityScore}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 block">GNSS Accuracy:</span>
                  <strong className="text-white">±{weather.gpsAccuracyMeters}m RTK</strong>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 block">Satellites Locked:</span>
                  <strong className="text-sky-300">{weather.satellitesConnected} Active Sats</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('weather_geo')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Full Weather & GNSS Telemetry</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Dispatched Survey Teams */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Active Surveyor Dispatches</h3>
              </div>
              <span className="text-xs text-slate-400">{activeRequests.length} Active</span>
            </div>

            {activeRequests.length === 0 ? (
              <div className="text-center py-6 space-y-2">
                <p className="text-xs text-slate-400">No active survey dispatches at this moment.</p>
                <button
                  onClick={onOpenSurveyorModal}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline"
                >
                  Dispatch field team now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeRequests.map((req) => (
                  <div key={req.id} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate">{req.parcelTitle}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {req.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">Type: <strong className="text-slate-200">{req.surveyType}</strong></p>
                    <div className="flex items-center justify-between text-[11px] pt-1 text-slate-300 border-t border-slate-800/60">
                      <span>Assigned: <strong className="text-emerald-400">{req.assignedSurveyorName || 'Surv. Adebayo Ogunlesi'}</strong></span>
                      <span className="font-bold text-white">${req.estimatedCostUSD}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => onNavigate('surveyor_map')}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Open Surveyor Dispatch Map</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
