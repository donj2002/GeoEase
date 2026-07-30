import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Zap, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  CreditCard, 
  Lock, 
  HelpCircle,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import { SubscriptionPlan } from '../types';
import { SUBSCRIPTION_PLANS } from '../data/initialData';

interface SubscriptionPageProps {
  currentPlanId: string;
  onSubscribe: (planId: string) => void;
}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({
  currentPlanId,
  onSubscribe
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<SubscriptionPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'web3'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleConfirmSubscribe = (planId: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubscribe(planId);
      setIsSuccessMessage(true);
      setTimeout(() => {
        setIsSuccessMessage(false);
        setSelectedPlanForModal(null);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="text-center space-y-4 py-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Flexible PropTech & GeoTech Subscriptions</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Select the Right Plan for Your Land & Cadastral Operations
        </h1>

        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Whether you are an individual land owner applying for a Certificate of Occupancy, a licensed field survey firm managing agents, or a state land ministry.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="inline-flex items-center gap-3 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shadow-lg mt-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              billingCycle === 'annual'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[10px]">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = currentPlanId === plan.id;
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`
                relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl
                ${plan.isPopular 
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 border-2 border-emerald-500/80 shadow-emerald-950/40 ring-4 ring-emerald-500/10 scale-105 z-10' 
                  : 'bg-slate-900 border border-slate-800'
                }
              `}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-[11px] px-3.5 py-1 rounded-full shadow-lg border border-emerald-300">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">{plan.userCategory}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed min-h-[36px]">{plan.subtitle}</p>
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-slate-800/80">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">${price}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  {billingCycle === 'annual' && price > 0 && (
                    <div className="text-[11px] text-emerald-400 mt-1 font-medium">Billed annually (${price * 12}/yr)</div>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Plan Inclusions:</span>
                  <ul className="space-y-2 text-xs">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        {feat.included ? (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        )}
                        <span className={feat.included ? 'text-slate-200' : 'text-slate-600 line-through'}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={() => setSelectedPlanForModal(plan)}
                  disabled={isCurrent}
                  className={`
                    w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2
                    ${isCurrent
                      ? 'bg-slate-800 text-slate-400 cursor-default border border-slate-700'
                      : plan.isPopular
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-950/50'
                      : 'bg-slate-100 hover:bg-white text-slate-950'
                    }
                  `}
                >
                  <span>{isCurrent ? 'Current Plan' : plan.ctaText}</span>
                  {!isCurrent && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white">Full PropTech Feature Matrix</h2>
          <p className="text-xs text-slate-400">Detailed side-by-side comparison of GeoEase capabilities</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Feature Capability</th>
                <th className="py-3 px-4 text-center">Freemium</th>
                <th className="py-3 px-4 text-center text-emerald-400">Surveyor Pro</th>
                <th className="py-3 px-4 text-center">Enterprise Gov</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Land Plot C of O Registrations</td>
                <td className="py-3.5 px-4 text-center">Up to 2 Plots</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">Unlimited</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">On-Demand Surveyor Dispatch</td>
                <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">GNSS RTK Coordinate File Export (DXF/SHP)</td>
                <td className="py-3.5 px-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Smart Contract Land Tokenization</td>
                <td className="py-3.5 px-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="py-3.5 px-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Checkout Drawer / Modal */}
      {selectedPlanForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 font-mono">SECURE CHECKOUT</span>
                <h3 className="text-xl font-bold text-white mt-0.5">Subscribe to {selectedPlanForModal.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedPlanForModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccessMessage ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Subscription Activated!</h4>
                <p className="text-xs text-slate-300">Your account has been upgraded to {selectedPlanForModal.name}. All features unlocked.</p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Plan Summary */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400 block">{selectedPlanForModal.userCategory}</span>
                    <strong className="text-white text-sm">{selectedPlanForModal.name}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-emerald-400">
                      ${billingCycle === 'annual' ? selectedPlanForModal.priceAnnual : selectedPlanForModal.priceMonthly}
                    </span>
                    <span className="text-[10px] text-slate-400 block">per month</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center font-medium ${paymentMethod === 'card' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-3 rounded-xl border text-center font-medium ${paymentMethod === 'transfer' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      Bank Transfer
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('web3')}
                      className={`p-3 rounded-xl border text-center font-medium ${paymentMethod === 'web3' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      Web3 Wallet
                    </button>
                  </div>
                </div>

                {/* Credit Card Input Placeholders */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8892"
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="08 / 28"
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">CVC / CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleConfirmSubscribe(selectedPlanForModal.id)}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-slate-950" />
                  <span>{isSubmitting ? 'Processing Payment...' : `Confirm & Activate ${selectedPlanForModal.name}`}</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
