import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Calculator, 
  Satellite, 
  CheckCircle2, 
  UserCheck, 
  Ruler, 
  Clock, 
  Radio, 
  Send, 
  Filter, 
  Phone, 
  Mail, 
  Star, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  Info,
  Navigation
} from 'lucide-react';
import { Surveyor, SurveyRequest, SurveyType, TerrainType, UrgencyLevel, LandParcel } from '../types';

interface SurveyorDispatchMapProps {
  surveyors: Surveyor[];
  landParcels: LandParcel[];
  activeRequests: SurveyRequest[];
  onRequestSurveyor: (request: SurveyRequest) => void;
}

export const SurveyorDispatchMap: React.FC<SurveyorDispatchMapProps> = ({
  surveyors,
  landParcels,
  activeRequests,
  onRequestSurveyor
}) => {
  // Input fields for dispatch calculator
  const [selectedParcelId, setSelectedParcelId] = useState<string>('');
  const [parcelTitle, setParcelTitle] = useState<string>('Epe Coastal Estate Plot 4B');
  const [lat, setLat] = useState<number>(6.5818);
  const [lng, setLng] = useState<number>(3.9821);
  const [landSizeSqm, setLandSizeSqm] = useState<number>(1800);
  const [surveyType, setSurveyType] = useState<SurveyType>('Boundary Survey');
  const [terrainType, setTerrainType] = useState<TerrainType>('Flat Urban / Dry Land');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Standard (5-7 Days)');
  const [selectedSurveyorId, setSelectedSurveyorId] = useState<string>(surveyors[0]?.id || '');
  const [mapLayer, setMapLayer] = useState<'street' | 'satellite' | 'cadastral'>('satellite');

  const [isDispatchedSuccess, setIsDispatchedSuccess] = useState(false);

  // Sync when parcel selector changes
  const handleParcelSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedParcelId(id);
    const p = landParcels.find(item => item.id === id);
    if (p) {
      setParcelTitle(p.title);
      setLat(p.coordinates.lat);
      setLng(p.coordinates.lng);
      setLandSizeSqm(p.landSizeSqm);
    }
  };

  // Cost Calculator Math
  const calculateEstimatedCost = () => {
    let baseRate = 150;
    if (surveyType === 'Topographic Survey') baseRate = 220;
    if (surveyType === 'Cadastral Survey') baseRate = 280;
    if (surveyType === 'Subdivision / Partition') baseRate = 250;
    if (surveyType === 'As-Built Survey') baseRate = 200;

    // Size factor
    const sizeMultiplier = 1 + (landSizeSqm / 5000) * 0.4;

    // Terrain factor
    let terrainMult = 1.0;
    if (terrainType === 'Hilly / Elevated Terrain') terrainMult = 1.25;
    if (terrainType === 'Swampy / Wetland') terrainMult = 1.45;
    if (terrainType === 'Dense Forest / Heavy Brush') terrainMult = 1.35;

    // Urgency factor
    let urgencyMult = 1.0;
    if (urgency === 'Express (48 Hours)') urgencyMult = 1.3;
    if (urgency === 'Emergency (24 Hours)') urgencyMult = 1.6;

    const subtotal = (baseRate * sizeMultiplier * terrainMult * urgencyMult);
    const equipmentFee = 45; // RTK GNSS setup
    const beaconStonesFee = Math.ceil(landSizeSqm / 500) * 15; // $15 per beacon stone

    return {
      subtotal: Math.round(subtotal),
      equipmentFee,
      beaconStonesFee,
      total: Math.round(subtotal + equipmentFee + beaconStonesFee)
    };
  };

  const costBreakdown = calculateEstimatedCost();

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const surveyor = surveyors.find(s => s.id === selectedSurveyorId) || surveyors[0];

    const newReq: SurveyRequest = {
      id: `DISPATCH-${Date.now()}`,
      parcelId: selectedParcelId,
      parcelTitle: parcelTitle || 'Custom Land Coordinates',
      surveyType,
      coordinates: { lat, lng },
      landSizeSqm,
      terrainType,
      urgency,
      estimatedCostUSD: costBreakdown.total,
      status: 'In Progress',
      assignedSurveyorId: surveyor.id,
      assignedSurveyorName: surveyor.name,
      createdAt: new Date().toISOString().split('T')[0],
      targetDate: urgency.includes('24') ? 'Tomorrow' : urgency.includes('48') ? 'In 2 Days' : 'In 5 Days'
    };

    onRequestSurveyor(newReq);
    setIsDispatchedSuccess(true);
    setTimeout(() => setIsDispatchedSuccess(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>On-Demand Cadastral GIS Field Dispatch</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Surveyor Dispatch & Interactive Map</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Plot coordinates, calculate precise survey estimates, and dispatch licensed surveyors equipped with RTK GNSS & LiDAR drones.
          </p>
        </div>

        {/* Map Layer Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setMapLayer('street')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mapLayer === 'street' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
          >
            Street View
          </button>
          <button
            onClick={() => setMapLayer('satellite')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mapLayer === 'satellite' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
          >
            Satellite GIS
          </button>
          <button
            onClick={() => setMapLayer('cadastral')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mapLayer === 'cadastral' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
          >
            Cadastral Beacons
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map (Left 2 cols) + Cost Calculator & Form (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Large Map Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
            
            {/* Map Canvas Frame */}
            <div className="relative w-full h-[420px] sm:h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner group">
              
              {/* Simulated Map Visual Canvas */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: mapLayer === 'satellite' 
                    ? `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600')`
                    : mapLayer === 'cadastral'
                    ? `url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=1600')`
                    : `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1600')`
                }}
              >
                {/* Dark Overlay gradient */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-brightness-90" />
              </div>

              {/* Map Grid Overlay lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

              {/* Plotted Center Pin Callout */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/50 text-white text-[11px] font-bold shadow-xl flex items-center gap-1.5 animate-bounce">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{parcelTitle}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg mt-1 map-pulse">
                  <MapPin className="w-5 h-5 text-emerald-300" />
                </div>
              </div>

              {/* Nearby Dispatched Surveyors Pins */}
              <div className="absolute top-1/4 left-1/3 z-20 flex flex-col items-center cursor-pointer group/pin">
                <div className="bg-slate-900/90 text-sky-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-sky-500/40">
                  Surv. Adebayo (3.2km)
                </div>
                <div className="w-6 h-6 rounded-full bg-sky-500/80 border border-white flex items-center justify-center text-white text-[10px] font-bold">
                  S1
                </div>
              </div>

              <div className="absolute bottom-1/3 right-1/4 z-20 flex flex-col items-center cursor-pointer">
                <div className="bg-slate-900/90 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/40">
                  Surv. Chidi (1.8km)
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500/80 border border-white flex items-center justify-center text-white text-[10px] font-bold">
                  S2
                </div>
              </div>

              {/* Map Floating HUD Info */}
              <div className="absolute top-3 left-3 z-30 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs text-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>GPS Plot active</span>
                </div>
                <div className="font-mono text-[11px]">LAT: {lat.toFixed(5)}</div>
                <div className="font-mono text-[11px]">LNG: {lng.toFixed(5)}</div>
                <div className="text-[10px] text-slate-400">Area: {landSizeSqm} SQM</div>
              </div>

              <div className="absolute bottom-3 right-3 z-30 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                <Satellite className="w-3.5 h-3.5 text-sky-400" />
                <span>RTK Base Lock • 22 Sats</span>
              </div>
            </div>

            {/* Quick Coordinate Plot Bar */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Select Land Parcel or Input Coordinates
                </span>
                <span className="text-[11px] text-emerald-400 font-normal">Auto-Centering Map</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Select Saved Parcel</label>
                  <select
                    value={selectedParcelId}
                    onChange={handleParcelSelectChange}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">-- Manual Coordinates --</option>
                    {landParcels.map((p) => (
                      <option key={p.id} value={p.id}>{p.title} ({p.lga})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Nearby Licensed Surveyors Directory */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <span>Available Licensed Surveyors Nearby</span>
                </h3>
                <p className="text-xs text-slate-400">NIS certified surveyors ready for immediate field dispatch</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                {surveyors.length} Field Teams
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {surveyors.map((surveyor) => {
                const isSelected = selectedSurveyorId === surveyor.id;
                return (
                  <div
                    key={surveyor.id}
                    onClick={() => setSelectedSurveyorId(surveyor.id)}
                    className={`
                      p-4 rounded-xl border cursor-pointer transition-all space-y-3
                      ${isSelected 
                        ? 'bg-slate-950 border-emerald-500 ring-2 ring-emerald-500/20' 
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={surveyor.avatarUrl}
                        alt={surveyor.name}
                        className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate">{surveyor.name}</h4>
                          <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">
                            {surveyor.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{surveyor.firmName}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{surveyor.rating} ({surveyor.reviewsCount})</span>
                      </div>
                      <div>Proximity: <strong className="text-white">{surveyor.proximityKm} km</strong></div>
                      <div>Base: <strong className="text-emerald-400">${surveyor.baseRateUSD}</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Estimated Cost Calculator & Dispatch Request Form */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 sticky top-20">
            
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-base font-bold text-white">Survey Cost Estimator & Dispatch</h3>
                <p className="text-xs text-slate-400">Algorithmic field cost calculator</p>
              </div>
            </div>

            {isDispatchedSuccess && (
              <div className="p-3 bg-emerald-950 text-emerald-300 text-xs rounded-xl border border-emerald-500/50 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Surveyor dispatch request sent successfully! Field team notified.</span>
              </div>
            )}

            <form onSubmit={handleDispatchSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Land Size in SQM</label>
                <input
                  type="number"
                  min={100}
                  value={landSizeSqm}
                  onChange={(e) => setLandSizeSqm(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Type of Survey Needed *</label>
                <select
                  value={surveyType}
                  onChange={(e) => setSurveyType(e.target.value as SurveyType)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Boundary Survey">Boundary Survey (Re-establishing property lines)</option>
                  <option value="Topographic Survey">Topographic Survey (Elevations & contours)</option>
                  <option value="Cadastral Survey">Cadastral Survey (State C of O & beacons)</option>
                  <option value="Subdivision / Partition">Subdivision / Partitioning</option>
                  <option value="As-Built Survey">As-Built Survey (Post-construction)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Terrain Type</label>
                  <select
                    value={terrainType}
                    onChange={(e) => setTerrainType(e.target.value as TerrainType)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Flat Urban / Dry Land">Flat Urban / Dry</option>
                    <option value="Hilly / Elevated Terrain">Hilly / Elevated</option>
                    <option value="Swampy / Wetland">Swampy / Wetland</option>
                    <option value="Dense Forest / Heavy Brush">Dense Forest</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Urgency Level</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Standard (5-7 Days)">Standard (5-7 Days)</option>
                    <option value="Express (48 Hours)">Express (48 Hours)</option>
                    <option value="Emergency (24 Hours)">Emergency (24 Hours)</option>
                  </select>
                </div>
              </div>

              {/* Itemized Cost Calculator Breakdown (As requested in prompt) */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2 flex justify-between">
                  <span>Itemized Cost Estimate</span>
                  <span className="text-emerald-400 font-mono">USD ($)</span>
                </div>

                <div className="space-y-1.5 text-slate-400">
                  <div className="flex justify-between">
                    <span>Base Fieldwork ({surveyType}):</span>
                    <span className="text-slate-200">${costBreakdown.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GNSS RTK & LiDAR Equipment Fee:</span>
                    <span className="text-slate-200">${costBreakdown.equipmentFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State Beacon Stones ({Math.ceil(landSizeSqm/500)} units):</span>
                    <span className="text-slate-200">${costBreakdown.beaconStonesFee}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-extrabold text-base text-emerald-400">
                  <span>Estimated Total:</span>
                  <span>${costBreakdown.total}.00</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Confirm & Dispatch Survey Team (${costBreakdown.total})</span>
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
