import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Upload, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  FileUp, 
  X, 
  AlertCircle, 
  Search, 
  Ruler, 
  Compass, 
  Download, 
  Eye, 
  Layers, 
  Trash2,
  FileSpreadsheet,
  BadgeCheck,
  Check
} from 'lucide-react';
import { LandParcel, DocumentItem, LandStatus, NavigationTab } from '../types';

interface LandRegistrationPortalProps {
  landParcels: LandParcel[];
  onAddParcel: (parcel: LandParcel) => void;
  onUpdateParcelStatus: (id: string, status: LandStatus) => void;
  onSelectParcelForCertificate: (parcel: LandParcel) => void;
  onNavigateToMap: () => void;
}

const NIGERIAN_STATES = [
  'Lagos State', 'Federal Capital Territory', 'Rivers State', 'Oyo State', 
  'Ogun State', 'Delta State', 'Kaduna State', 'Kano State', 'Enugu State', 'Edo State'
];

const LGAS_BY_STATE: Record<string, string[]> = {
  'Lagos State': ['Epe', 'Ibeju-Lekki', 'Ikeja', 'Eti-Osa', 'Alimosho', 'Lagos Island'],
  'Federal Capital Territory': ['Abuja Municipal (AMAC)', 'Bwari', 'Gwagwalada', 'Kuje'],
  'Rivers State': ['Port Harcourt City', 'Obio-Akpor', 'Eleme', 'Oyigbo'],
  'Oyo State': ['Ibadan North', 'Ibadan South-West', 'Oyo West'],
  'Ogun State': ['Abeokuta South', 'Ifo', 'Ado-Odo/Ota'],
  'Delta State': ['Warri South', 'Uvwie', 'Asaba (Oshimili South)']
};

export const LandRegistrationPortal: React.FC<LandRegistrationPortalProps> = ({
  landParcels,
  onAddParcel,
  onUpdateParcelStatus,
  onSelectParcelForCertificate,
  onNavigateToMap
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'new_wizard'>('list');
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Wizard State
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: '',
    alias: '',
    landSizeSqm: 1200,
    state: 'Lagos State',
    lga: 'Epe',
    address: '',
    zoning: 'Residential' as LandParcel['zoning'],
    lat: 6.5818,
    lng: 3.9821,
    beaconsText: 'BC/2026/LA-901, BC/2026/LA-902, BC/2026/LA-903, BC/2026/LA-904',
    ownerName: 'Engr. Donald Nwajiaku',
    notes: ''
  });

  // Wizard Files
  const [uploadedDocs, setUploadedDocs] = useState<DocumentItem[]>([
    {
      id: 'd-sample-1',
      name: 'Site_Perimeter_Survey_Plan.pdf',
      type: 'survey_plan',
      sizeFormatted: '2.4 MB',
      uploadDate: '2026-07-30',
      status: 'Uploaded'
    }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSimulatedFileUpload = (type: DocumentItem['type'], fileName: string) => {
    setIsUploading(true);
    setUploadProgress(20);
    
    setTimeout(() => setUploadProgress(65), 300);
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        name: fileName || `${type.toUpperCase()}_Document.pdf`,
        type,
        sizeFormatted: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Uploaded'
      };
      setUploadedDocs(prev => [...prev, newDoc]);
    }, 700);
  };

  const handleRemoveDoc = (id: string) => {
    setUploadedDocs(prev => prev.filter(d => d.id !== id));
  };

  const handleSubmitWizard = (e: React.FormEvent) => {
    e.preventDefault();
    const beaconsArray = formData.beaconsText
      .split(',')
      .map(b => b.trim())
      .filter(Boolean);

    const newParcel: LandParcel = {
      id: `PARCEL-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title || 'Untitled Land Parcel',
      alias: formData.alias || formData.title,
      landSizeSqm: Number(formData.landSizeSqm),
      acreage: Number((formData.landSizeSqm / 4046.86).toFixed(3)),
      state: formData.state,
      lga: formData.lga,
      address: formData.address || `${formData.lga}, ${formData.state}`,
      zoning: formData.zoning,
      coordinates: { lat: Number(formData.lat), lng: Number(formData.lng) },
      beacons: beaconsArray.length ? beaconsArray : ['BC/2026/TEMP-01', 'BC/2026/TEMP-02'],
      status: 'Pending Review',
      registrationDate: new Date().toISOString().split('T')[0],
      estimatedValueUSD: Math.round(formData.landSizeSqm * 45),
      ownerName: formData.ownerName || 'Engr. Donald Nwajiaku',
      applicationProgressPercent: 20,
      notes: formData.notes,
      documents: uploadedDocs
    };

    onAddParcel(newParcel);
    setActiveTab('list');
    setSelectedParcel(newParcel);
    setWizardStep(1);
  };

  const filteredParcels = landParcels.filter(p => {
    if (statusFilter === 'All') return true;
    return p.status === statusFilter;
  });

  // Timeline steps for C of O status tracking
  const getTimelineSteps = (status: LandStatus) => {
    const steps = [
      { name: 'Application & Docs Filed', statusKey: 'Draft', percent: 20 },
      { name: 'Beacon & Cadastral Inspection', statusKey: 'Beacon Verification', percent: 40 },
      { name: 'Surveyor General Audit', statusKey: 'Surveyor Assigned', percent: 60 },
      { name: 'Ministry Legal Approval', statusKey: 'Ministry Review', percent: 80 },
      { name: 'Certificate of Occupancy Issued', statusKey: 'Approved', percent: 100 }
    ];

    const currentIdx = steps.findIndex(s => s.statusKey === status);
    return steps.map((step, idx) => ({
      ...step,
      isCompleted: currentIdx >= idx || status === 'Approved',
      isCurrent: currentIdx === idx && status !== 'Approved'
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ministry Land Registry Gateway</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Certificate of Occupancy (C of O) Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Register land plots, upload survey deeds, verify beacon points, and track ministry title approval status.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'list' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Applications ({landParcels.length})
          </button>
          <button
            onClick={() => setActiveTab('new_wizard')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'new_wizard' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            <span>New C of O Registration</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Applications List & Tracker */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {/* Status Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Approved', 'Ministry Review', 'Beacon Verification', 'Surveyor Assigned', 'Pending Review'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  statusFilter === st 
                    ? 'bg-slate-100 text-slate-900 font-bold shadow' 
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Applications Cards List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredParcels.map((parcel) => {
                const isSelected = selectedParcel?.id === parcel.id;
                const isApproved = parcel.status === 'Approved';

                return (
                  <div
                    key={parcel.id}
                    onClick={() => setSelectedParcel(parcel)}
                    className={`
                      bg-slate-900 border rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-xl space-y-4
                      ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-slate-900/90' : 'border-slate-800 hover:border-slate-700'}
                    `}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-emerald-400">{parcel.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            isApproved 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}>
                            {parcel.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mt-1">{parcel.title}</h3>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-semibold text-slate-300">{parcel.state}, {parcel.lga}</div>
                        <div className="text-xs text-slate-400">{parcel.landSizeSqm.toLocaleString()} SQM ({parcel.acreage} Acres)</div>
                      </div>
                    </div>

                    {/* Beacon & Document Counts */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">BEACON STONES</span>
                        <strong className="text-white font-mono text-xs">{parcel.beacons.length} Verified Points</strong>
                      </div>

                      <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">DOCUMENTS ATTACHED</span>
                        <strong className="text-slate-200 text-xs">{parcel.documents.length} Files Uploaded</strong>
                      </div>

                      <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                        <span className="text-slate-400 block text-[10px]">REGISTRATION DATE</span>
                        <strong className="text-slate-300 text-xs">{parcel.registrationDate}</strong>
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-slate-400">Owner: <strong className="text-white">{parcel.ownerName}</strong></span>

                      <div className="flex items-center gap-2">
                        {isApproved && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectParcelForCertificate(parcel);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View C of O Title</span>
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedParcel(parcel);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Status Tracker</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Parcel Detail & Live Pipeline Tracker */}
            <div className="space-y-6">
              {selectedParcel ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 sticky top-20">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-400">{selectedParcel.id}</span>
                      <h3 className="text-lg font-bold text-white mt-0.5">{selectedParcel.title}</h3>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                      {selectedParcel.status}
                    </span>
                  </div>

                  {/* Visual Timeline Pipeline Tracker (As requested in prompt) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>C of O Ministry Review Timeline</span>
                    </h4>

                    <div className="space-y-3 relative pl-4 border-l-2 border-slate-800 ml-2">
                      {getTimelineSteps(selectedParcel.status).map((step, idx) => (
                        <div key={idx} className="relative group">
                          <div className={`
                            absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full border-2 
                            ${step.isCompleted ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-950 border-slate-700'}
                          `} />
                          <div className="text-xs">
                            <p className={`font-semibold ${step.isCompleted ? 'text-white' : 'text-slate-500'}`}>
                              {step.name}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {step.isCompleted ? 'Verified & signed off' : 'Awaiting ministry clearance'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Registered Beacon Stones */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span>Verified GPS Beacons</span>
                      <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {selectedParcel.beacons.map((b, i) => (
                        <span key={i} className="text-[11px] font-mono bg-slate-900 text-emerald-300 p-1.5 rounded border border-slate-800 text-center">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Attached Documents List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span>Attached Deeds & Files</span>
                      <FileUp className="w-3.5 h-3.5 text-sky-400" />
                    </h4>
                    <div className="space-y-1.5">
                      {selectedParcel.documents.map((doc) => (
                        <div key={doc.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="text-slate-200 truncate">{doc.name}</span>
                          </div>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded shrink-0">
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2">
                    {selectedParcel.status === 'Approved' ? (
                      <button
                        onClick={() => onSelectParcelForCertificate(selectedParcel)}
                        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                      >
                        <BadgeCheck className="w-4 h-4" />
                        <span>Open C of O Certificate Document</span>
                      </button>
                    ) : (
                      <button
                        onClick={onNavigateToMap}
                        className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-2"
                      >
                        <Compass className="w-4 h-4 text-emerald-400" />
                        <span>Dispatch Surveyor for Beacon Audit</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
                  <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-white">Select a land parcel</p>
                  <p className="text-xs text-slate-400">Click any registration on the left to view timeline status, beacon points, and deeds.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: Multi-Step Registration Wizard */}
      {activeTab === 'new_wizard' && (
        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
          
          {/* Step Progress Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 font-mono">STEP {wizardStep} OF 4</span>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  {wizardStep === 1 && 'Land Identity & Zoning Details'}
                  {wizardStep === 2 && 'GPS Coordinates & Beacon Plotting'}
                  {wizardStep === 3 && 'Document Upload Hub (Deeds & Survey)'}
                  {wizardStep === 4 && 'Ministry Fee Review & Application Submission'}
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                Draft Auto-Saved
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { step: 1, name: '1. Land Info' },
                { step: 2, name: '2. GPS Beacons' },
                { step: 3, name: '3. Upload Docs' },
                { step: 4, name: '4. Submit C of O' }
              ].map((s) => (
                <div 
                  key={s.step} 
                  className={`h-2 rounded-full transition-all ${
                    wizardStep >= s.step ? 'bg-emerald-500' : 'bg-slate-800'
                  }`} 
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmitWizard} className="space-y-6">
            
            {/* STEP 1: Land Details */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Land Parcel Title / Estate Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Victoria Crest Sector B"
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Land Size in Square Meters (SQM) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={formData.landSizeSqm}
                      onChange={(e) => setFormData({ ...formData, landSizeSqm: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-emerald-400 mt-1">
                      Equivalent to: <strong>{(formData.landSizeSqm / 4046.86).toFixed(3)} Acres</strong> ({(formData.landSizeSqm / 10000).toFixed(3)} Hectares)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">State / Region *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => {
                        const newSt = e.target.value;
                        const defaultLga = LGAS_BY_STATE[newSt]?.[0] || 'Central';
                        setFormData({ ...formData, state: newSt, lga: defaultLga });
                      }}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Local Government Area (LGA) *</label>
                    <select
                      value={formData.lga}
                      onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {(LGAS_BY_STATE[formData.state] || ['Central District']).map((lga) => (
                        <option key={lga} value={lga}>{lga}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Zoning Classification</label>
                    <select
                      value={formData.zoning}
                      onChange={(e) => setFormData({ ...formData, zoning: e.target.value as LandParcel['zoning'] })}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Agricultural">Agricultural</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Mixed Use">Mixed Use</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Physical Street Address / Landmark</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Opposite Eleko Beach Junction, Epe Expressway"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Coordinates & Beacons */}
            {wizardStep === 2 && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-950/30 border border-emerald-800/50 rounded-xl flex items-start gap-3">
                  <Compass className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-200 leading-relaxed">
                    Enter the central GPS coordinates or perimeter beacon numbers provided by your licensed surveyor. These coordinates will be validated against state cadastral maps to prevent double-allocation.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Center Latitude (Decimal Degrees)</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={(e) => setFormData({ ...formData, lat: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Center Longitude (Decimal Degrees)</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.lng}
                      onChange={(e) => setFormData({ ...formData, lng: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Beacon Stone Serial Numbers (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.beaconsText}
                    onChange={(e) => setFormData({ ...formData, beaconsText: e.target.value })}
                    placeholder="e.g. BC/2026/LA-01, BC/2026/LA-02, BC/2026/LA-03"
                    className="w-full bg-slate-950 border border-slate-700 text-emerald-300 font-mono rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Each boundary vertex stone must carry an official state survey serial.</p>
                </div>
              </div>
            )}

            {/* STEP 3: Document Upload Hub */}
            {wizardStep === 3 && (
              <div className="space-y-5">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p className="font-semibold text-white">Required C of O Document Check:</p>
                  <p className="text-slate-400">Upload PDF or JPG scans of your Title Deed, Survey Plan, and Passport Photograph. Scans will be scanned automatically for ministry validation.</p>
                </div>

                {/* Simulated File Dropzone */}
                <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-950/50 transition-colors">
                  <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-xs font-semibold text-white">Drag & drop survey documents here</p>
                  <p className="text-[11px] text-slate-400 mt-1">Supports PDF, JPG, PNG up to 15MB</p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => handleSimulatedFileUpload('survey_plan', 'Perimeter_Survey_Approved.pdf')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                    >
                      + Add Approved Survey Plan
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulatedFileUpload('deed_of_assignment', 'Stamped_Deed_Assignment.pdf')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                    >
                      + Add Deed of Assignment
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulatedFileUpload('passport_photo', 'Landowner_Passport.jpg')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                    >
                      + Add Passport Photo
                    </button>
                  </div>

                  {isUploading && (
                    <div className="mt-4 max-w-xs mx-auto space-y-1">
                      <div className="flex justify-between text-[11px] text-emerald-400 font-semibold">
                        <span>Uploading document...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Uploaded Files Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300">Attached Application Documents ({uploadedDocs.length})</h4>
                  <div className="space-y-2">
                    {uploadedDocs.map((doc) => (
                      <div key={doc.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-emerald-400" />
                          <div>
                            <p className="font-semibold text-white">{doc.name}</p>
                            <p className="text-[10px] text-slate-400">{doc.sizeFormatted} • {doc.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc(doc.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Review & Submit */}
            {wizardStep === 4 && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                    Application Summary & Statutory Filing Fees
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Land Title:</span>
                      <strong className="text-white">{formData.title}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Location:</span>
                      <strong className="text-white">{formData.lga}, {formData.state}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Total Land Area:</span>
                      <strong className="text-emerald-400">{formData.landSizeSqm} SQM</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Documents Attached:</span>
                      <strong className="text-white">{uploadedDocs.length} Verified Scans</strong>
                    </div>
                  </div>

                  {/* Statutory Fees Breakdown */}
                  <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Ministry Title Verification Fee:</span>
                      <span>$150.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>State Cadastral Digital Mapping Fee:</span>
                      <span>$75.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Beacon Coordinates Inspection Fee:</span>
                      <span>$25.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-emerald-400 pt-2 border-t border-slate-800">
                      <span>Total Application Fee:</span>
                      <span>$250.00</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>By submitting, I certify that the coordinates and title deeds uploaded represent legitimate ownership without existing encumbrance or court injunction.</span>
                </div>
              </div>
            )}

            {/* Nav Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {wizardStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep(prev => prev - 1)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>
              ) : <div />}

              {wizardStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep(prev => prev + 1)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <span>Continue to Step {wizardStep + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-xl flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Submit C of O Application</span>
                </button>
              )}
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
