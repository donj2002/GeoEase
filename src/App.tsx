import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  UserRole, 
  LandParcel, 
  Surveyor, 
  SurveyRequest, 
  WeatherInfo, 
  NotificationItem, 
  LandStatus 
} from './types';
import { 
  INITIAL_LAND_PARCELS, 
  INITIAL_SURVEYORS, 
  INITIAL_WEATHER, 
  INITIAL_NOTIFICATIONS 
} from './data/initialData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { LandRegistrationPortal } from './components/LandRegistrationPortal';
import { SurveyorDispatchMap } from './components/SurveyorDispatchMap';
import { SubscriptionPage } from './components/SubscriptionPage';
import { WeatherGeoTools } from './components/WeatherGeoTools';
import { CertificateModal } from './components/CertificateModal';
import { RequestSurveyorModal } from './components/RequestSurveyorModal';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('landowner');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data State (With localStorage sync)
  const [landParcels, setLandParcels] = useState<LandParcel[]>(() => {
    const saved = localStorage.getItem('geoease_land_parcels');
    return saved ? JSON.parse(saved) : INITIAL_LAND_PARCELS;
  });

  const [surveyors, setSurveyors] = useState<Surveyor[]>(INITIAL_SURVEYORS);
  const [weather, setWeather] = useState<WeatherInfo>(INITIAL_WEATHER);
  
  const [activeRequests, setActiveRequests] = useState<SurveyRequest[]>(() => {
    const saved = localStorage.getItem('geoease_survey_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'DISPATCH-881',
        parcelTitle: 'Epe Ocean-View Sector A',
        surveyType: 'Boundary Survey',
        coordinates: { lat: 6.5818, lng: 3.9821 },
        landSizeSqm: 1800,
        terrainType: 'Flat Urban / Dry Land',
        urgency: 'Express (48 Hours)',
        estimatedCostUSD: 240,
        status: 'In Progress',
        assignedSurveyorId: 'SURV-001',
        assignedSurveyorName: 'Surv. Adebayo Ogunlesi',
        createdAt: '2026-07-29',
        targetDate: 'Tomorrow'
      }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [currentPlanId, setCurrentPlanId] = useState<string>('plan_freemium');

  // Modal Controls
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedParcelForCertificate, setSelectedParcelForCertificate] = useState<LandParcel | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('geoease_land_parcels', JSON.stringify(landParcels));
  }, [landParcels]);

  useEffect(() => {
    localStorage.setItem('geoease_survey_requests', JSON.stringify(activeRequests));
  }, [activeRequests]);

  // Handlers
  const handleAddParcel = (newParcel: LandParcel) => {
    setLandParcels(prev => [newParcel, ...prev]);
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Land C of O Application Filed',
      message: `Parcel "${newParcel.title}" in ${newParcel.lga} submitted for ministry review.`,
      timestamp: 'Just now',
      type: 'info',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleUpdateParcelStatus = (id: string, status: LandStatus) => {
    setLandParcels(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status,
          applicationProgressPercent: status === 'Approved' ? 100 : status === 'Ministry Review' ? 80 : 50
        };
      }
      return p;
    }));
  };

  const handleRequestSurveyor = (req: SurveyRequest) => {
    setActiveRequests(prev => [req, ...prev]);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Survey Field Team Dispatched',
      message: `Field request for ${req.parcelTitle} assigned to ${req.assignedSurveyorName || 'Licensed Surveyor'}.`,
      timestamp: 'Just now',
      type: 'dispatch',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const pendingReviewCount = landParcels.filter(p => p.status !== 'Approved').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        userRole={userRole}
        onRoleChange={setUserRole}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        activeLandCount={landParcels.length}
        pendingReviewCount={pendingReviewCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Header */}
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenRegisterModal={() => setCurrentTab('land_portal')}
          onOpenSurveyorModal={() => setIsRequestModalOpen(true)}
          onNavigate={setCurrentTab}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* View Switcher Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardHome
              landParcels={landParcels}
              weather={weather}
              surveyors={surveyors}
              activeRequests={activeRequests}
              onNavigate={setCurrentTab}
              onOpenRegisterModal={() => setCurrentTab('land_portal')}
              onOpenSurveyorModal={() => setIsRequestModalOpen(true)}
              onSelectParcelForCertificate={setSelectedParcelForCertificate}
              searchQuery={searchQuery}
            />
          )}

          {currentTab === 'land_portal' && (
            <LandRegistrationPortal
              landParcels={landParcels}
              onAddParcel={handleAddParcel}
              onUpdateParcelStatus={handleUpdateParcelStatus}
              onSelectParcelForCertificate={setSelectedParcelForCertificate}
              onNavigateToMap={() => setCurrentTab('surveyor_map')}
            />
          )}

          {currentTab === 'surveyor_map' && (
            <SurveyorDispatchMap
              surveyors={surveyors}
              landParcels={landParcels}
              activeRequests={activeRequests}
              onRequestSurveyor={handleRequestSurveyor}
            />
          )}

          {currentTab === 'subscription' && (
            <SubscriptionPage
              currentPlanId={currentPlanId}
              onSubscribe={setCurrentPlanId}
            />
          )}

          {currentTab === 'weather_geo' && (
            <WeatherGeoTools
              weather={weather}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 px-6 py-6 text-center text-xs text-slate-400 space-y-1">
          <p>© 2026 GeoEase PropTech & GeoTech Cadastral Engine. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">
            Automated Land Certificate of Occupancy (C of O) Portal • GNSS RTK 3D Positioning • Ministry Cadastral Registry
          </p>
        </footer>

      </div>

      {/* Global Modals */}
      <CertificateModal
        parcel={selectedParcelForCertificate}
        onClose={() => setSelectedParcelForCertificate(null)}
      />

      <RequestSurveyorModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        surveyors={surveyors}
        landParcels={landParcels}
        onRequestSubmitted={handleRequestSurveyor}
      />

    </div>
  );
}
