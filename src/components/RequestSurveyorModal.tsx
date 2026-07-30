import React, { useState } from 'react';
import { Compass, X, CheckCircle2, Calculator, MapPin, Send } from 'lucide-react';
import { Surveyor, SurveyRequest, SurveyType, LandParcel } from '../types';

interface RequestSurveyorModalProps {
  isOpen: boolean;
  onClose: () => void;
  surveyors: Surveyor[];
  landParcels: LandParcel[];
  onRequestSubmitted: (req: SurveyRequest) => void;
}

export const RequestSurveyorModal: React.FC<RequestSurveyorModalProps> = ({
  isOpen,
  onClose,
  surveyors,
  landParcels,
  onRequestSubmitted
}) => {
  if (!isOpen) return null;

  const [parcelTitle, setParcelTitle] = useState('Epe Coastal Plot 4B');
  const [surveyType, setSurveyType] = useState<SurveyType>('Boundary Survey');
  const [selectedSurveyorId, setSelectedSurveyorId] = useState(surveyors[0]?.id || '');
  const [clientNotes, setClientNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const surveyor = surveyors.find(s => s.id === selectedSurveyorId) || surveyors[0];

    const newReq: SurveyRequest = {
      id: `DISPATCH-${Date.now()}`,
      parcelTitle,
      surveyType,
      coordinates: { lat: 6.5818, lng: 3.9821 },
      landSizeSqm: 1800,
      terrainType: 'Flat Urban / Dry Land',
      urgency: 'Standard (5-7 Days)',
      estimatedCostUSD: 240,
      status: 'In Progress',
      assignedSurveyorId: surveyor.id,
      assignedSurveyorName: surveyor.name,
      createdAt: new Date().toISOString().split('T')[0],
      targetDate: 'In 3 Days',
      clientNotes
    };

    onRequestSubmitted(newReq);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Request Field Surveyor Dispatch</h3>
              <p className="text-xs text-slate-400">On-demand licensed survey team</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Surveyor Dispatched!</h4>
            <p className="text-xs text-slate-300">Field survey team has been assigned and notified.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Land Plot / Title</label>
              <input
                type="text"
                required
                value={parcelTitle}
                onChange={(e) => setParcelTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Survey Type Needed</label>
              <select
                value={surveyType}
                onChange={(e) => setSurveyType(e.target.value as SurveyType)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs"
              >
                <option value="Boundary Survey">Boundary Survey</option>
                <option value="Topographic Survey">Topographic Survey</option>
                <option value="Cadastral Survey">Cadastral Survey</option>
                <option value="Subdivision / Partition">Subdivision / Partition</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Select Field Surveyor</label>
              <select
                value={selectedSurveyorId}
                onChange={(e) => setSelectedSurveyorId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs"
              >
                {surveyors.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.badge}) - ${s.baseRateUSD}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Field Instructions / Beacon Notes</label>
              <textarea
                rows={2}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Specify entry instructions, landmark notes, or beacon numbers..."
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>Confirm & Request Field Dispatch</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
