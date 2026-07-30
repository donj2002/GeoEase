import React from 'react';
import { ShieldCheck, Download, Printer, X, BadgeCheck, Compass, FileText, Stamp } from 'lucide-react';
import { LandParcel } from '../types';

interface CertificateModalProps {
  parcel: LandParcel | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ parcel, onClose }) => {
  if (!parcel) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-fadeIn my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Certificate of Occupancy (C of O)</h3>
              <p className="text-xs text-slate-400">Official Ministry Cadastral Land Title Document</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print Title</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print Content Frame */}
        <div className="bg-amber-50/95 text-slate-900 p-8 sm:p-12 rounded-2xl border-4 border-amber-900/40 shadow-inner space-y-8 relative overflow-hidden font-serif">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-900/60" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-900/60" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-900/60" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-900/60" />

          {/* Certificate Title Header */}
          <div className="text-center space-y-2 border-b-2 border-amber-900/30 pb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-900/10 border-2 border-amber-900/40 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-amber-900" />
            </div>
            <p className="text-xs font-sans tracking-widest font-bold uppercase text-amber-900">
              FEDERAL REPUBLIC LAND REGISTRATION AUTHORITY
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-950 uppercase">
              Certificate of Occupancy
            </h1>
            <p className="text-xs font-mono font-bold text-amber-800">
              REGISTRATION NO: {parcel.cOfONumber || 'CofO/2026/LG/994102'}
            </p>
          </div>

          {/* Legal Recital */}
          <div className="text-xs sm:text-sm text-amber-950 leading-relaxed text-justify space-y-4">
            <p>
              THIS IS TO CERTIFY that <strong className="uppercase underline font-sans">{parcel.ownerName}</strong> of <span className="font-semibold">{parcel.address}</span> is hereby granted statutory Right of Occupancy in and over all that parcel of land situate in <strong>{parcel.lga}</strong>, <strong>{parcel.state}</strong> containing an approximate area of <strong>{parcel.landSizeSqm.toLocaleString()} SQM ({parcel.acreage} Acres)</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4 bg-amber-100/60 p-4 rounded-xl border border-amber-900/20 font-sans text-xs">
              <div>
                <span className="text-amber-900/80 block text-[10px]">PARCEL ALIAS:</span>
                <strong className="text-amber-950">{parcel.title}</strong>
              </div>
              <div>
                <span className="text-amber-900/80 block text-[10px]">ZONING CLASSIFICATION:</span>
                <strong className="text-amber-950">{parcel.zoning}</strong>
              </div>
              <div>
                <span className="text-amber-900/80 block text-[10px]">SURVEY BEACON SERIALS:</span>
                <strong className="text-amber-950 font-mono">{parcel.beacons.join(', ')}</strong>
              </div>
              <div>
                <span className="text-amber-900/80 block text-[10px]">DATE OF ISSUANCE:</span>
                <strong className="text-amber-950">{parcel.registrationDate}</strong>
              </div>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-8 border-t-2 border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans text-xs">
            <div className="text-center space-y-1">
              <div className="w-32 h-10 border-b border-amber-900/60 mx-auto flex items-end justify-center pb-1 text-amber-900 font-serif italic text-sm">
                Surv. Adebayo O.
              </div>
              <p className="font-bold text-amber-950">Surveyor General</p>
              <p className="text-[10px] text-amber-800">State Cadastral Bureau</p>
            </div>

            {/* Official Stamp */}
            <div className="w-20 h-20 rounded-full border-4 border-emerald-800 text-emerald-900 flex flex-col items-center justify-center p-1 text-[9px] font-bold text-center leading-tight rotate-12 shadow-sm">
              <BadgeCheck className="w-6 h-6 text-emerald-800" />
              <span>OFFICIAL SEAL</span>
              <span>VERIFIED 2026</span>
            </div>

            <div className="text-center space-y-1">
              <div className="w-32 h-10 border-b border-amber-900/60 mx-auto flex items-end justify-center pb-1 text-amber-900 font-serif italic text-sm">
                Hon. Director of Lands
              </div>
              <p className="font-bold text-amber-950">Ministry Executive Secretary</p>
              <p className="text-[10px] text-amber-800">Land Title Registry</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
