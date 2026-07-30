import React, { useState } from 'react';
import { 
  CloudSun, 
  Satellite, 
  Wind, 
  Droplets, 
  Compass, 
  Ruler, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Layers,
  ArrowUpRight,
  Sun
} from 'lucide-react';
import { WeatherInfo } from '../types';

interface WeatherGeoToolsProps {
  weather: WeatherInfo;
}

export const WeatherGeoTools: React.FC<WeatherGeoToolsProps> = ({ weather }) => {
  const [coordDD, setCoordDD] = useState({ lat: 6.5818, lng: 3.9821 });
  const [convertedDMS, setConvertedDMS] = useState({
    latDMS: `6° 34' 54.48" N`,
    lngDMS: `3° 58' 55.56" E`
  });

  const handleConvertCoordinates = () => {
    const convert = (val: number, isLat: boolean) => {
      const dir = val >= 0 ? (isLat ? 'N' : 'E') : (isLat ? 'S' : 'W');
      const absVal = Math.abs(val);
      const deg = Math.floor(absVal);
      const minFloat = (absVal - deg) * 60;
      const min = Math.floor(minFloat);
      const sec = ((minFloat - min) * 60).toFixed(2);
      return `${deg}° ${min}' ${sec}" ${dir}`;
    };

    setConvertedDMS({
      latDMS: convert(coordDD.lat, true),
      lngDMS: convert(coordDD.lng, false)
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold mb-2">
            <Satellite className="w-3.5 h-3.5" />
            <span>Real-Time GNSS Satellite Telemetry & Weather</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Weather & Geo-Coordinate Telemetry</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analyze atmospheric conditions for aerial drone survey safety, RTK satellite signal strength, and beacon coordinate conversion.
          </p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0 text-right">
          <span className="text-[10px] text-slate-400 block font-mono">RTK FIX STATUS</span>
          <strong className="text-emerald-400 text-sm font-bold flex items-center justify-end gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D Multi-Band Sub-Meter</span>
          </strong>
        </div>
      </div>

      {/* Main Grid: Weather Metrics + Coordinate Converter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weather & Drone Flight Conditions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-sky-400" />
              <h3 className="text-base font-bold text-white">Atmospheric Survey Conditions</h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Optimal Flight Window
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">SURFACE TEMPERATURE</span>
              <strong className="text-xl font-bold text-white">{weather.tempC}°C</strong>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">WIND GUSTS (DRONE LIMIT)</span>
              <strong className="text-xl font-bold text-emerald-400">{weather.windSpeedKmh} km/h</strong>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ATMOSPHERIC PRESSURE</span>
              <strong className="text-sm font-bold text-white">{weather.pressureHpa} hPa</strong>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">HORIZON VISIBILITY</span>
              <strong className="text-sm font-bold text-sky-400">{weather.visibilityKm} km</strong>
            </div>
          </div>

          {/* Drone Safety Card */}
          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-white">LiDAR Drone Surveying Authorized</p>
                <p className="text-emerald-300/80 text-[11px]">Low thermal turbulence • Solar Noon: {weather.solarNoon}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coordinate Unit Converter */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Cadastral Coordinate Converter</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">DD ➔ DMS</span>
          </div>

          <p className="text-xs text-slate-400">
            Convert Decimal Degrees (DD) coordinates to Degrees Minutes Seconds (DMS) for state ministry deed verification.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Latitude (Decimal)</label>
              <input
                type="number"
                step="any"
                value={coordDD.lat}
                onChange={(e) => setCoordDD({ ...coordDD, lat: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 text-white font-mono rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Longitude (Decimal)</label>
              <input
                type="number"
                step="any"
                value={coordDD.lng}
                onChange={(e) => setCoordDD({ ...coordDD, lng: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 text-white font-mono rounded-xl p-2.5"
              />
            </div>

            <button
              onClick={handleConvertCoordinates}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
            >
              Convert Coordinates
            </button>

            {/* Output Card */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Official Ministry DMS Format</span>
              <div className="font-mono text-sm font-bold text-white">LAT: {convertedDMS.latDMS}</div>
              <div className="font-mono text-sm font-bold text-white">LNG: {convertedDMS.lngDMS}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
