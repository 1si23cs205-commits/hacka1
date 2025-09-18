import React, { useState, useEffect } from 'react';
import { Leaf, Upload, MapPin, MessageCircle, User, Home, AlertTriangle, Camera, Sun, CloudRain, Thermometer, Droplets, Languages, Award, Settings, Phone, MessageSquare, LogIn, LogOut, Bell, TrendingUp, Users, BookOpen, Wifi, WifiOff, Menu, X } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notifications, setNotifications] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const screens = {
    home: 'Home',
    detect: 'Disease Detection',
    dashboard: 'Dashboard',
    alerts: 'Early Warnings',
    guidance: 'AI Guidance',
    community: 'Community',
    profile: 'Profile'
  };

  const handleLogin = (credentials: any) => {
    // Simulate login
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    if (!isAuthenticated) {
      if (currentScreen === 'login') {
        return <LoginScreen onLogin={handleLogin} onBack={() => setCurrentScreen('home')} />;
      }
      return <HeroScreen onNavigate={setCurrentScreen} />;
    }

    switch(currentScreen) {
      case 'dashboard': return <FarmerDashboard onNavigate={setCurrentScreen} />;
      case 'detect': return <DiseaseDetectionScreen />;
      case 'alerts': return <EarlyWarningDashboard />;
      case 'guidance': return <GuidanceScreen />;
      case 'community': return <CommunityScreen />;
      case 'profile': return <FarmerProfile />;
      default: return <FarmerDashboard onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6EF] text-[#2E2E2E]">
      {/* Navigation Header */}
      {isAuthenticated && (
        <nav className="bg-white/80 backdrop-blur-md border-b border-[#A9CBB7]/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Leaf className="w-8 h-8 text-[#3E8E55]" />
                <h1 className="text-xl font-bold text-[#3E8E55]">CropGuardian AI</h1>
                {!isOnline && (
                  <div className="flex items-center space-x-1 bg-[#F5C84C]/20 px-2 py-1 rounded-full">
                    <WifiOff className="w-4 h-4 text-[#7B5E3B]" />
                    <span className="text-xs text-[#7B5E3B]">Offline</span>
                  </div>
                )}
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {Object.entries(screens).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentScreen(key)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      currentScreen === key 
                        ? 'bg-[#3E8E55] text-white' 
                        : 'text-[#2E2E2E] hover:bg-[#A9CBB7]/20'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 text-[#7B5E3B] hover:text-[#3E8E55] transition-colors">
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-[#7B5E3B] hover:text-[#3E8E55] transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-[#7B5E3B] hover:text-[#3E8E55] transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-[#A9CBB7]/20 py-4">
                <div className="space-y-2">
                  {Object.entries(screens).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setCurrentScreen(key);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentScreen === key 
                          ? 'bg-[#3E8E55] text-white' 
                          : 'text-[#2E2E2E] hover:bg-[#A9CBB7]/20'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-[#7B5E3B] hover:text-[#3E8E55] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}
      
      {/* Screen Content */}
      {renderScreen()}
    </div>
  );
}

function HeroScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Leaf className="w-10 h-10 text-[#3E8E55]" />
          <h1 className="text-2xl font-bold text-[#3E8E55]">CropGuardian AI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Languages className="w-6 h-6 text-[#7B5E3B] cursor-pointer hover:text-[#3E8E55] transition-colors" />
          <button 
            onClick={() => onNavigate('login')}
            className="bg-[#3E8E55] text-white px-6 py-2 rounded-full hover:bg-[#2E7A45] transition-all duration-200 flex items-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-[#2E2E2E] mb-6 leading-tight">
              Protect Your Crops with
              <span className="text-[#3E8E55]"> AI-Powered</span>
              <br />
              Early Disease Detection
            </h2>
            <p className="text-xl text-[#7B5E3B] mb-8 max-w-2xl mx-auto leading-relaxed">
              Take a photo of your crop leaves and get instant disease diagnosis with 95%+ accuracy, 
              severity analysis, and personalized treatment recommendations in your local language.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => onNavigate('login')}
              className="bg-[#3E8E55] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#2E7A45] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
            >
              <Camera className="w-6 h-6" />
              <span>Start Disease Detection</span>
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="border-2 border-[#7B5E3B] text-[#7B5E3B] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#7B5E3B] hover:text-white transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <AlertTriangle className="w-6 h-6" />
              <span>View Early Warnings</span>
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Upload className="w-8 h-8 text-[#4CA6F5]" />}
              title="95%+ Accuracy"
              description="Advanced CNN models trained on 87,000+ plant disease images for precise detection"
            />
            <FeatureCard
              icon={<Wifi className="w-8 h-8 text-[#F5C84C]" />}
              title="Works Offline"
              description="PWA technology ensures disease detection works even without internet connectivity"
            />
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8 text-[#A9CBB7]" />}
              title="12+ Languages"
              description="Get advice in Tamil, Telugu, Hindi, Kannada, and other regional languages"
            />
          </div>
        </div>
      </main>

      {/* Footer Stats */}
      <footer className="px-6 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <StatCard number="100,000+" label="Farmers Helped" />
          <StatCard number="5M+" label="Crops Scanned" />
          <StatCard number="₹1,200Cr+" label="Losses Prevented" />
        </div>
      </footer>
    </div>
  );
}

function LoginScreen({ onLogin, onBack }: { onLogin: (credentials: any) => void; onBack: () => void }) {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    language: 'English'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Leaf className="w-10 h-10 text-[#3E8E55]" />
            <h1 className="text-2xl font-bold text-[#3E8E55]">CropGuardian AI</h1>
          </div>
          <h2 className="text-3xl font-bold text-[#2E2E2E] mb-2">Welcome Back</h2>
          <p className="text-[#7B5E3B]">Login to access your crop health dashboard</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#A9CBB7]/20 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#7B5E3B] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98765 43210"
                className="w-full p-4 border border-[#A9CBB7]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E8E55] bg-white/80 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#7B5E3B] mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                className="w-full p-4 border border-[#A9CBB7]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E8E55] bg-white/80 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#7B5E3B] mb-2">
                Preferred Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
                className="w-full p-4 border border-[#A9CBB7]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E8E55] bg-white/80 transition-all duration-200"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3E8E55] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#2E7A45] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#7B5E3B]">
              New farmer? 
              <button className="text-[#3E8E55] font-medium hover:underline ml-1">
                Create Account
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={onBack}
            className="text-[#7B5E3B] hover:text-[#3E8E55] transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function FarmerDashboard({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const dashboardStats = {
    totalScans: 156,
    diseasesDetected: 23,
    healthyCrops: 89,
    alertsActive: 3
  };

  const recentScans = [
    { crop: 'Tomato', disease: 'Late Blight', severity: 65, date: '2 hours ago', status: 'treated' },
    { crop: 'Cotton', disease: 'Leaf Spot', severity: 45, date: '1 day ago', status: 'monitoring' },
    { crop: 'Wheat', disease: 'Healthy', severity: 0, date: '2 days ago', status: 'healthy' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#3E8E55]/10 to-[#A9CBB7]/10 rounded-2xl p-6 border border-[#A9CBB7]/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2">Welcome back, Ravi!</h2>
            <p className="text-[#7B5E3B]">Your crops are looking healthy today. 3 new alerts require attention.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#3E8E55]">28°C</p>
              <p className="text-sm text-[#7B5E3B]">Perfect for growth</p>
            </div>
            <Sun className="w-12 h-12 text-[#F5C84C]" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardStatCard
          icon={<Camera className="w-6 h-6 text-[#4CA6F5]" />}
          title="Total Scans"
          value={dashboardStats.totalScans.toString()}
          change="+12 this week"
          positive={true}
        />
        <DashboardStatCard
          icon={<AlertTriangle className="w-6 h-6 text-[#F5C84C]" />}
          title="Diseases Found"
          value={dashboardStats.diseasesDetected.toString()}
          change="-5 from last week"
          positive={true}
        />
        <DashboardStatCard
          icon={<Leaf className="w-6 h-6 text-[#3E8E55]" />}
          title="Healthy Crops"
          value={`${dashboardStats.healthyCrops}%`}
          change="+3% improvement"
          positive={true}
        />
        <DashboardStatCard
          icon={<Bell className="w-6 h-6 text-red-500" />}
          title="Active Alerts"
          value={dashboardStats.alertsActive.toString()}
          change="2 critical"
          positive={false}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#2E2E2E]">Recent Disease Scans</h3>
              <button 
                onClick={() => onNavigate('detect')}
                className="bg-[#3E8E55] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2E7A45] transition-colors flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>New Scan</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {recentScans.map((scan, index) => (
                <RecentScanCard key={index} scan={scan} />
              ))}
            </div>
          </div>

          {/* Crop Health Trends */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#2E2E2E]">Crop Health Trends</h3>
              <div className="flex space-x-2">
                {['week', 'month', 'season'].map(period => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-[#3E8E55] text-white'
                        : 'text-[#7B5E3B] hover:bg-[#A9CBB7]/20'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-48 bg-gradient-to-r from-[#3E8E55]/20 via-[#A9CBB7]/20 to-[#4CA6F5]/20 rounded-xl flex items-center justify-center">
              <div className="text-center text-[#7B5E3B]">
                <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                <p className="font-medium">Health Trend Chart</p>
                <p className="text-sm">89% average crop health this {selectedPeriod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <QuickActionButton
                icon={<Camera className="w-5 h-5" />}
                label="Scan New Crop"
                onClick={() => onNavigate('detect')}
                color="bg-[#3E8E55]"
              />
              <QuickActionButton
                icon={<AlertTriangle className="w-5 h-5" />}
                label="View Alerts"
                onClick={() => onNavigate('alerts')}
                color="bg-[#F5C84C]"
              />
              <QuickActionButton
                icon={<MessageCircle className="w-5 h-5" />}
                label="Ask AI Assistant"
                onClick={() => onNavigate('guidance')}
                color="bg-[#4CA6F5]"
              />
              <QuickActionButton
                icon={<Users className="w-5 h-5" />}
                label="Community Forum"
                onClick={() => onNavigate('community')}
                color="bg-[#A9CBB7]"
              />
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Today's Weather</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sun className="w-8 h-8 text-[#F5C84C]" />
                  <div>
                    <p className="font-semibold text-[#2E2E2E]">28°C</p>
                    <p className="text-sm text-[#7B5E3B]">Sunny</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#7B5E3B]">Humidity</p>
                  <p className="font-medium text-[#2E2E2E]">65%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[#F9F6EF] p-3 rounded-xl">
                  <Droplets className="w-5 h-5 text-[#4CA6F5] mx-auto mb-1" />
                  <p className="text-xs text-[#7B5E3B]">Rain</p>
                  <p className="font-medium text-[#2E2E2E]">20%</p>
                </div>
                <div className="bg-[#F9F6EF] p-3 rounded-xl">
                  <Thermometer className="w-5 h-5 text-[#F5C84C] mx-auto mb-1" />
                  <p className="text-xs text-[#7B5E3B]">Soil</p>
                  <p className="font-medium text-[#2E2E2E]">24°C</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips of the Day */}
          <div className="bg-gradient-to-br from-[#3E8E55]/10 to-[#A9CBB7]/10 rounded-2xl p-6 border border-[#A9CBB7]/20">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">💡 Today's Tip</h3>
            <p className="text-sm text-[#7B5E3B] leading-relaxed">
              With high humidity expected, apply preventive fungicide spray to tomato crops. 
              Early morning application is most effective.
            </p>
            <button className="mt-3 text-[#3E8E55] text-sm font-medium hover:underline">
              Learn more →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiseaseDetectionScreen() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [confidence, setConfidence] = useState(0);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setConfidence(0);
    
    // Simulate progressive confidence building
    const confidenceInterval = setInterval(() => {
      setConfidence(prev => {
        if (prev >= 94) {
          clearInterval(confidenceInterval);
          return 94;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(confidenceInterval);
      setResult({
        disease: "Late Blight (Phytophthora infestans)",
        crop: "Tomato",
        severity: 65,
        confidence: 94,
        description: "Fungal infection causing brown spots with white fuzzy growth on leaf undersides",
        treatment: [
          "Remove and destroy affected leaves immediately",
          "Apply copper-based fungicide (Bordeaux mixture)",
          "Improve air circulation between plants",
          "Reduce watering frequency and avoid overhead irrigation",
          "Apply organic neem oil spray as preventive measure"
        ],
        prevention: "Apply preventive fungicide spray every 2 weeks during humid conditions. Ensure proper plant spacing and avoid watering leaves directly.",
        organicSolutions: [
          "Baking soda spray (1 tsp per liter water)",
          "Milk spray (1:10 ratio with water)",
          "Compost tea application"
        ],
        costEstimate: "₹150-300 per acre for organic treatment",
        timeline: "7-14 days for visible improvement"
      });
      setAnalyzing(false);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">AI Disease Detection</h2>
        <p className="text-[#7B5E3B] text-lg">Upload a clear photo of crop leaves for instant AI analysis with 95%+ accuracy</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#2E2E2E]">Upload Crop Image</h3>
            
            {!uploadedImage ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#3E8E55] rounded-xl cursor-pointer bg-[#3E8E55]/5 hover:bg-[#3E8E55]/10 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Camera className="w-12 h-12 text-[#3E8E55] mb-4" />
                  <p className="text-lg font-medium text-[#3E8E55]">Click to upload image</p>
                  <p className="text-sm text-[#7B5E3B] mt-2">PNG, JPG up to 10MB</p>
                  <p className="text-xs text-[#7B5E3B] mt-1">Trained on 87,000+ plant images</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            ) : (
              <div className="relative">
                <img src={uploadedImage} alt="Uploaded crop" className="w-full h-64 object-cover rounded-xl" />
                <button 
                  onClick={() => {
                    setUploadedImage(null);
                    setResult(null);
                    setConfidence(0);
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Tips */}
          <div className="bg-[#F5C84C]/10 border border-[#F5C84C]/30 rounded-xl p-4">
            <h4 className="font-semibold text-[#7B5E3B] mb-3 flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Photo Guidelines for Best Results</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-[#7B5E3B]">
              <div>
                <p className="font-medium mb-1">✓ Good Photos:</p>
                <ul className="space-y-1">
                  <li>• Natural daylight</li>
                  <li>• Clear focus on leaves</li>
                  <li>• Multiple affected areas</li>
                  <li>• Close-up details</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">✗ Avoid:</p>
                <ul className="space-y-1">
                  <li>• Blurry or dark images</li>
                  <li>• Too much background</li>
                  <li>• Artificial lighting</li>
                  <li>• Water droplets on leaves</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Offline Capability */}
          <div className="bg-[#4CA6F5]/10 border border-[#4CA6F5]/30 rounded-xl p-4">
            <h4 className="font-semibold text-[#7B5E3B] mb-2 flex items-center space-x-2">
              <Wifi className="w-5 h-5" />
              <span>Works Offline</span>
            </h4>
            <p className="text-sm text-[#7B5E3B]">
              This AI model works without internet connection. Results sync automatically when online.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {analyzing && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-8 h-8 border-4 border-[#3E8E55] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-medium text-[#3E8E55]">Analyzing your crop...</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-[#7B5E3B] mb-2">AI Confidence Level</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-[#3E8E55] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-lg font-semibold text-[#2E2E2E]">{Math.round(confidence)}%</p>
                </div>
                
                <div className="text-center text-sm text-[#7B5E3B] space-y-1">
                  <p>🔍 Scanning leaf patterns...</p>
                  <p>🧠 Comparing with disease database...</p>
                  <p>📊 Calculating severity level...</p>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Disease Result */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2E2E2E]">Detection Result</h3>
                  <span className="bg-[#3E8E55] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {result.confidence}% Confidence
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-medium text-[#2E2E2E]">
                      <span className="text-[#7B5E3B]">Crop:</span> {result.crop}
                    </p>
                    <p className="text-lg font-medium text-red-600">
                      <span className="text-[#7B5E3B]">Disease:</span> {result.disease}
                    </p>
                    <p className="text-sm text-[#7B5E3B] mt-2">{result.description}</p>
                  </div>

                  {/* Severity Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#7B5E3B]">Severity Level</span>
                      <span className="font-medium text-[#2E2E2E]">{result.severity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          result.severity < 30 ? 'bg-[#3E8E55]' : 
                          result.severity < 70 ? 'bg-[#F5C84C]' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.severity}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#7B5E3B] mt-1">
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment Recommendations */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
                <h3 className="text-xl font-semibold text-[#2E2E2E] mb-4">Treatment Plan</h3>
                <div className="space-y-3">
                  {result.treatment.map((step: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="bg-[#3E8E55] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-[#2E2E2E]">{step}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#3E8E55]/10 rounded-xl">
                    <h4 className="font-semibold text-[#3E8E55] mb-2">🌱 Organic Solutions</h4>
                    <ul className="text-[#2E2E2E] text-sm space-y-1">
                      {result.organicSolutions.map((solution: string, index: number) => (
                        <li key={index}>• {solution}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-[#F5C84C]/10 rounded-xl">
                    <h4 className="font-semibold text-[#7B5E3B] mb-2">💰 Cost & Timeline</h4>
                    <p className="text-[#2E2E2E] text-sm mb-1">{result.costEstimate}</p>
                    <p className="text-[#2E2E2E] text-sm">Recovery: {result.timeline}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-[#4CA6F5]/10 rounded-xl">
                  <h4 className="font-semibold text-[#4CA6F5] mb-2">🛡️ Prevention</h4>
                  <p className="text-[#2E2E2E] text-sm">{result.prevention}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-3 gap-4">
                <button className="bg-[#3E8E55] text-white py-3 rounded-xl font-medium hover:bg-[#2E7A45] transition-colors flex items-center justify-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Ask AI More</span>
                </button>
                <button className="border-2 border-[#7B5E3B] text-[#7B5E3B] py-3 rounded-xl font-medium hover:bg-[#7B5E3B] hover:text-white transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Expert</span>
                </button>
                <button className="border-2 border-[#4CA6F5] text-[#4CA6F5] py-3 rounded-xl font-medium hover:bg-[#4CA6F5] hover:text-white transition-colors flex items-center justify-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Save Report</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EarlyWarningDashboard() {
  const alerts = [
    { type: 'high', disease: 'Late Blight', crop: 'Potato', region: 'North Karnataka', risk: 85, affected: '2,500 farms' },
    { type: 'medium', disease: 'Leaf Spot', crop: 'Cotton', region: 'Central Maharashtra', risk: 65, affected: '1,200 farms' },
    { type: 'low', disease: 'Powdery Mildew', crop: 'Grapes', region: 'Western Ghats', risk: 35, affected: '800 farms' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">Early Warning System</h2>
        <p className="text-[#7B5E3B] text-lg">AI-powered predictions using satellite data, weather patterns, and community reports</p>
      </div>

      {/* Weather Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <WeatherCard icon={<Sun />} label="Temperature" value="28°C" status="optimal" />
        <WeatherCard icon={<CloudRain />} label="Humidity" value="75%" status="high" />
        <WeatherCard icon={<Droplets />} label="Rainfall" value="15mm" status="moderate" />
        <WeatherCard icon={<Thermometer />} label="Soil Temp" value="24°C" status="good" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Disease Risk Map */}
        <div className="lg:col-span-2">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <h3 className="text-xl font-semibold text-[#2E2E2E] mb-4">Disease Risk Heatmap</h3>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-[#3E8E55]/20 via-[#F5C84C]/30 to-red-500/40 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Simulated Map Points */}
                <div className="absolute top-16 left-20 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-32 right-24 w-3 h-3 bg-[#F5C84C] rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 left-32 w-3 h-3 bg-[#3E8E55] rounded-full animate-pulse"></div>
                <div className="absolute bottom-16 right-16 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                
                <div className="text-center text-[#2E2E2E]/60">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">Interactive Disease Risk Map</p>
                  <p className="text-sm">Real-time outbreak tracking across regions</p>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#3E8E55] rounded-full"></div>
                  <span className="text-sm text-[#7B5E3B]">Low Risk (0-30%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#F5C84C] rounded-full"></div>
                  <span className="text-sm text-[#7B5E3B]">Medium Risk (31-70%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-[#7B5E3B]">High Risk (71-100%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        <div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <h3 className="text-xl font-semibold text-[#2E2E2E] mb-4">Active Alerts</h3>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <EnhancedAlertCard key={index} alert={alert} />
              ))}
            </div>
            
            <button className="w-full mt-4 bg-[#3E8E55] text-white py-3 rounded-xl font-medium hover:bg-[#2E7A45] transition-colors">
              View All Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Prevention Tips */}
      <div className="bg-gradient-to-r from-[#3E8E55]/10 to-[#A9CBB7]/10 rounded-2xl p-6 border border-[#A9CBB7]/20">
        <h3 className="text-xl font-semibold text-[#2E2E2E] mb-4">🌱 This Week's Prevention Tips</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/60 p-4 rounded-xl">
            <h4 className="font-medium text-[#3E8E55] mb-2">High Humidity Alert</h4>
            <p className="text-sm text-[#2E2E2E]">Apply preventive fungicide spray. Increase plant spacing for better airflow.</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl">
            <h4 className="font-medium text-[#F5C84C] mb-2">Monsoon Preparation</h4>
            <p className="text-sm text-[#2E2E2E]">Ensure proper drainage. Check for waterlogged areas in your fields.</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl">
            <h4 className="font-medium text-[#4CA6F5] mb-2">Weekly Inspection</h4>
            <p className="text-sm text-[#2E2E2E]">Examine crops every 3 days. Early detection saves 70% of potential losses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidanceScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I\'m your AI crop health assistant. I can help you with disease identification, treatment recommendations, and sustainable farming practices. How can I help you today?', time: '10:00 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Marathi', 'Bengali', 'Gujarati', 'Punjabi', 'Odia', 'Malayalam', 'Assamese'];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = { type: 'user', message: inputMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setChatMessages([...chatMessages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = { 
        type: 'bot', 
        message: 'Based on your query about leaf spots, this appears to be a fungal infection. Here\'s what I recommend:\n\n1. Remove affected leaves immediately\n2. Apply organic neem oil spray (mix 2ml per liter water)\n3. Improve air circulation around plants\n4. Avoid overhead watering\n\nCost: ₹50-100 per acre for organic treatment. Would you like specific product recommendations available in your area?',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">AI Guidance & Recommendations</h2>
        <p className="text-[#7B5E3B] text-lg">Get personalized advice in your preferred language with cost-effective solutions</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Language Selection & Quick Actions */}
        <div className="space-y-6">
          {/* Language Selector */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4 flex items-center space-x-2">
              <Languages className="w-5 h-5 text-[#3E8E55]" />
              <span>Select Language</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-[#3E8E55] text-white'
                      : 'bg-[#A9CBB7]/20 text-[#2E2E2E] hover:bg-[#A9CBB7]/30'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Quick Help</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-[#F5C84C]/10 border border-[#F5C84C]/30 rounded-xl text-left hover:bg-[#F5C84C]/20 transition-colors">
                <p className="font-medium text-[#7B5E3B]">Disease Database</p>
                <p className="text-xs text-[#2E2E2E]">Browse 50+ common diseases</p>
              </button>
              <button className="w-full p-3 bg-[#4CA6F5]/10 border border-[#4CA6F5]/30 rounded-xl text-left hover:bg-[#4CA6F5]/20 transition-colors">
                <p className="font-medium text-[#7B5E3B]">Organic Solutions</p>
                <p className="text-xs text-[#2E2E2E]">Low-cost sustainable treatments</p>
              </button>
              <button className="w-full p-3 bg-[#A9CBB7]/10 border border-[#A9CBB7]/30 rounded-xl text-left hover:bg-[#A9CBB7]/20 transition-colors">
                <p className="font-medium text-[#7B5E3B]">Expert Connect</p>
                <p className="text-xs text-[#2E2E2E]">Talk to agricultural experts</p>
              </button>
              <button className="w-full p-3 bg-[#3E8E55]/10 border border-[#3E8E55]/30 rounded-xl text-left hover:bg-[#3E8E55]/20 transition-colors">
                <p className="font-medium text-[#7B5E3B]">Offline Resources</p>
                <p className="text-xs text-[#2E2E2E]">Download guides for offline use</p>
              </button>
            </div>
          </div>
        </div>

        {/* AI Chatbot */}
        <div className="lg:col-span-2">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#A9CBB7]/20 shadow-lg h-[600px] flex flex-col">
            <div className="p-6 border-b border-[#A9CBB7]/20">
              <h3 className="text-lg font-semibold text-[#2E2E2E] flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-[#3E8E55]" />
                <span>AI Assistant ({selectedLanguage})</span>
              </h3>
              <p className="text-sm text-[#7B5E3B] mt-1">Ask about crop diseases, organic treatments, or sustainable farming practices</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-[#3E8E55] text-white ml-4' 
                      : 'bg-[#F9F6EF] border border-[#A9CBB7]/20 mr-4'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.message}</p>
                    <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-white/70' : 'text-[#7B5E3B]'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-[#A9CBB7]/20">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about your crop concerns..."
                  className="flex-1 p-3 border border-[#A9CBB7]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E8E55] bg-white/80"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#3E8E55] text-white px-6 py-3 rounded-xl hover:bg-[#2E7A45] transition-colors"
                >
                  Send
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {['Leaf spots on tomato', 'Organic pest control', 'Yellow leaves problem', 'Soil health tips'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setInputMessage(suggestion)}
                    className="text-xs bg-[#A9CBB7]/20 text-[#7B5E3B] px-3 py-1 rounded-full hover:bg-[#A9CBB7]/30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('forum');

  const forumPosts = [
    {
      id: 1,
      author: 'Rajesh Kumar',
      location: 'Karnataka',
      title: 'Late blight in tomatoes - need urgent help',
      content: 'My tomato plants are showing brown spots with white fuzzy growth. Applied neem oil but not seeing improvement...',
      replies: 12,
      likes: 8,
      time: '2 hours ago',
      solved: false
    },
    {
      id: 2,
      author: 'Priya Sharma',
      location: 'Maharashtra',
      title: 'Organic solution for cotton bollworm worked!',
      content: 'Used the community-recommended pheromone traps and neem cake. Reduced pest damage by 80%!',
      replies: 24,
      likes: 45,
      time: '1 day ago',
      solved: true
    }
  ];

  const experts = [
    {
      name: 'Dr. Suresh Patel',
      specialization: 'Plant Pathology',
      experience: '15 years',
      rating: 4.9,
      consultations: 1200,
      available: true
    },
    {
      name: 'Dr. Meera Singh',
      specialization: 'Organic Farming',
      experience: '12 years',
      rating: 4.8,
      consultations: 950,
      available: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">Community & Expert Support</h2>
        <p className="text-[#7B5E3B] text-lg">Connect with fellow farmers and agricultural experts for knowledge sharing</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-[#A9CBB7]/10 p-1 rounded-xl">
        {[
          { key: 'forum', label: 'Farmer Forum', icon: <Users className="w-4 h-4" /> },
          { key: 'experts', label: 'Expert Consultation', icon: <User className="w-4 h-4" /> },
          { key: 'knowledge', label: 'Knowledge Base', icon: <BookOpen className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-[#3E8E55] shadow-sm'
                : 'text-[#7B5E3B] hover:text-[#3E8E55]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
        {activeTab === 'forum' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-[#2E2E2E]">Community Forum</h3>
              <button className="bg-[#3E8E55] text-white px-4 py-2 rounded-lg hover:bg-[#2E7A45] transition-colors">
                New Post
              </button>
            </div>
            
            <div className="space-y-4">
              {forumPosts.map(post => (
                <ForumPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experts' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#2E2E2E]">Agricultural Experts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {experts.map((expert, index) => (
                <ExpertCard key={index} expert={expert} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#2E2E2E]">Knowledge Base</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <KnowledgeCard
                title="Disease Prevention Guide"
                description="Complete guide to preventing common crop diseases"
                downloads="2.5k"
                category="Prevention"
              />
              <KnowledgeCard
                title="Organic Pest Control"
                description="Natural methods for controlling pests without chemicals"
                downloads="1.8k"
                category="Organic"
              />
              <KnowledgeCard
                title="Soil Health Management"
                description="Maintaining and improving soil fertility naturally"
                downloads="3.2k"
                category="Soil Care"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FarmerProfile() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">Farmer Profile</h2>
        <p className="text-[#7B5E3B] text-lg">Manage your farming information and track sustainability goals</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-[#3E8E55] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            RS
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#2E2E2E]">Ravi Sharma</h3>
            <p className="text-[#7B5E3B]">Experienced Farmer • Karnataka</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-[#3E8E55]/10 text-[#3E8E55] px-3 py-1 rounded-full text-sm font-medium">
                Premium Member
              </span>
              <span className="bg-[#F5C84C]/10 text-[#7B5E3B] px-3 py-1 rounded-full text-sm">
                5 Years Experience
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-[#A9CBB7]/10 p-1 rounded-xl">
        {[
          { key: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
          { key: 'crops', label: 'My Crops', icon: <Leaf className="w-4 h-4" /> },
          { key: 'badges', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
          { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-[#3E8E55] shadow-sm'
                : 'text-[#7B5E3B] hover:text-[#3E8E55]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#A9CBB7]/20 shadow-lg">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#7B5E3B] mb-2">Full Name</label>
                <input type="text" value="Ravi Sharma" className="w-full p-3 border border-[#A9CBB7]/30 rounded-xl bg-white/80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B5E3B] mb-2">Phone Number</label>
                <input type="tel" value="+91 98765 43210" className="w-full p-3 border border-[#A9CBB7]/30 rounded-xl bg-white/80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B5E3B] mb-2">Location</label>
                <input type="text" value="Bangalore, Karnataka" className="w-full p-3 border border-[#A9CBB7]/30 rounded-xl bg-white/80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B5E3B] mb-2">Farm Size</label>
                <input type="text" value="25 Acres" className="w-full p-3 border border-[#A9CBB7]/30 rounded-xl bg-white/80" />
              </div>
            </div>
            <button className="bg-[#3E8E55] text-white px-6 py-3 rounded-xl hover:bg-[#2E7A45] transition-colors">
              Update Profile
            </button>
          </div>
        )}

        {activeTab === 'crops' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Current Crops</h3>
              <button className="bg-[#3E8E55] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2E7A45] transition-colors">
                Add Crop
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <CropCard name="Tomatoes" area="10 acres" status="Healthy" health={92} />
              <CropCard name="Cotton" area="8 acres" status="Monitor" health={75} />
              <CropCard name="Sugarcane" area="7 acres" status="Excellent" health={96} />
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#2E2E2E]">Sustainability Achievements</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <AchievementBadge
                icon="🌱"
                title="Early Adopter"
                description="First 100 farmers to use AI detection"
                earned={true}
              />
              <AchievementBadge
                icon="💧"
                title="Water Saver"
                description="Reduced water usage by 30%"
                earned={true}
              />
              <AchievementBadge
                icon="🏆"
                title="Disease Fighter"
                description="Prevented 5 major outbreaks"
                earned={true}
              />
              <AchievementBadge
                icon="🌍"
                title="Carbon Neutral"
                description="Offset 1 ton of carbon emissions"
                earned={false}
              />
              <AchievementBadge
                icon="📚"
                title="Knowledge Seeker"
                description="Completed 10 training modules"
                earned={false}
              />
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F9F6EF] rounded-xl">
                <div>
                  <h4 className="font-medium text-[#2E2E2E]">SMS Alerts</h4>
                  <p className="text-sm text-[#7B5E3B]">Receive disease warnings via SMS</p>
                </div>
                <div className="w-12 h-6 bg-[#3E8E55] rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-[#F9F6EF] rounded-xl">
                <div>
                  <h4 className="font-medium text-[#2E2E2E]">WhatsApp Notifications</h4>
                  <p className="text-sm text-[#7B5E3B]">Get updates on WhatsApp</p>
                </div>
                <div className="w-12 h-6 bg-[#3E8E55] rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F9F6EF] rounded-xl">
                <div>
                  <h4 className="font-medium text-[#2E2E2E]">Weather Alerts</h4>
                  <p className="text-sm text-[#7B5E3B]">Daily weather updates for your location</p>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#A9CBB7]/20 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3">{title}</h3>
      <p className="text-[#7B5E3B] leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-[#3E8E55] mb-2">{number}</p>
      <p className="text-[#7B5E3B] font-medium">{label}</p>
    </div>
  );
}

function DashboardStatCard({ icon, title, value, change, positive }: { icon: React.ReactNode; title: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-[#A9CBB7]/20 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[#4CA6F5]">{icon}</div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          positive ? 'text-[#3E8E55] bg-[#3E8E55]/10' : 'text-red-500 bg-red-50'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-[#2E2E2E] mb-1">{value}</p>
      <p className="text-sm text-[#7B5E3B]">{title}</p>
    </div>
  );
}

function RecentScanCard({ scan }: { scan: any }) {
  const statusColors = {
    healthy: 'text-[#3E8E55] bg-[#3E8E55]/10',
    monitoring: 'text-[#F5C84C] bg-[#F5C84C]/10',
    treated: 'text-[#4CA6F5] bg-[#4CA6F5]/10'
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#F9F6EF] rounded-xl">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-[#3E8E55]/10 rounded-xl flex items-center justify-center">
          <Leaf className="w-6 h-6 text-[#3E8E55]" />
        </div>
        <div>
          <h4 className="font-medium text-[#2E2E2E]">{scan.crop}</h4>
          <p className="text-sm text-[#7B5E3B]">{scan.disease}</p>
          <p className="text-xs text-[#7B5E3B]">{scan.date}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[scan.status as keyof typeof statusColors]}`}>
          {scan.status}
        </span>
        {scan.severity > 0 && (
          <p className="text-sm text-[#7B5E3B] mt-1">{scan.severity}% severity</p>
        )}
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label, onClick, color }: { icon: React.ReactNode; label: string; onClick: () => void; color: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 p-3 ${color} text-white rounded-xl hover:opacity-90 transition-opacity`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function WeatherCard({ icon, label, value, status }: { icon: React.ReactNode; label: string; value: string; status: string }) {
  const statusColors = {
    optimal: 'text-[#3E8E55] bg-[#3E8E55]/10',
    good: 'text-[#3E8E55] bg-[#3E8E55]/10',
    high: 'text-[#F5C84C] bg-[#F5C84C]/10',
    moderate: 'text-[#4CA6F5] bg-[#4CA6F5]/10'
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-[#A9CBB7]/20 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[#4CA6F5]">{icon}</div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
      </div>
      <p className="text-2xl font-bold text-[#2E2E2E] mb-1">{value}</p>
      <p className="text-sm text-[#7B5E3B]">{label}</p>
    </div>
  );
}

function EnhancedAlertCard({ alert }: { alert: any }) {
  const typeColors = {
    high: 'border-red-500 bg-red-50',
    medium: 'border-[#F5C84C] bg-[#F5C84C]/10',
    low: 'border-[#3E8E55] bg-[#3E8E55]/10'
  };

  return (
    <div className={`p-4 rounded-xl border-l-4 ${typeColors[alert.type as keyof typeof typeColors]}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-[#2E2E2E] text-sm">{alert.disease}</h4>
        <span className="text-xs font-bold text-[#7B5E3B]">{alert.risk}% Risk</span>
      </div>
      <p className="text-xs text-[#7B5E3B] mb-1">{alert.crop} • {alert.region}</p>
      <p className="text-xs text-[#7B5E3B] mb-2">{alert.affected} affected</p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${
            alert.type === 'high' ? 'bg-red-500' : 
            alert.type === 'medium' ? 'bg-[#F5C84C]' : 'bg-[#3E8E55]'
          }`}
          style={{ width: `${alert.risk}%` }}
        ></div>
      </div>
    </div>
  );
}

function ForumPostCard({ post }: { post: any }) {
  return (
    <div className="bg-[#F9F6EF] p-4 rounded-xl border border-[#A9CBB7]/20">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-[#2E2E2E] mb-1">{post.title}</h4>
          <p className="text-sm text-[#7B5E3B]">by {post.author} • {post.location} • {post.time}</p>
        </div>
        {post.solved && (
          <span className="bg-[#3E8E55] text-white text-xs px-2 py-1 rounded-full">Solved</span>
        )}
      </div>
      <p className="text-sm text-[#2E2E2E] mb-3">{post.content}</p>
      <div className="flex items-center space-x-4 text-sm text-[#7B5E3B]">
        <span>👍 {post.likes}</span>
        <span>💬 {post.replies} replies</span>
      </div>
    </div>
  );
}

function ExpertCard({ expert }: { expert: any }) {
  return (
    <div className="bg-[#F9F6EF] p-4 rounded-xl border border-[#A9CBB7]/20">
      <div className="flex items-center space-x-4 mb-3">
        <div className="w-12 h-12 bg-[#3E8E55] rounded-full flex items-center justify-center text-white font-bold">
          {expert.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <h4 className="font-semibold text-[#2E2E2E]">{expert.name}</h4>
          <p className="text-sm text-[#7B5E3B]">{expert.specialization}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm text-[#7B5E3B] mb-4">
        <p>Experience: {expert.experience}</p>
        <p>Rating: ⭐ {expert.rating} ({expert.consultations} consultations)</p>
      </div>
      <button 
        className={`w-full py-2 rounded-lg font-medium transition-colors ${
          expert.available 
            ? 'bg-[#3E8E55] text-white hover:bg-[#2E7A45]'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!expert.available}
      >
        {expert.available ? 'Book Consultation' : 'Currently Unavailable'}
      </button>
    </div>
  );
}

function KnowledgeCard({ title, description, downloads, category }: { title: string; description: string; downloads: string; category: string }) {
  return (
    <div className="bg-[#F9F6EF] p-4 rounded-xl border border-[#A9CBB7]/20">
      <div className="mb-3">
        <span className="bg-[#3E8E55]/10 text-[#3E8E55] text-xs px-2 py-1 rounded-full">{category}</span>
      </div>
      <h4 className="font-semibold text-[#2E2E2E] mb-2">{title}</h4>
      <p className="text-sm text-[#7B5E3B] mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#7B5E3B]">📥 {downloads} downloads</span>
        <button className="bg-[#3E8E55] text-white text-sm px-3 py-1 rounded-lg hover:bg-[#2E7A45] transition-colors">
          Download
        </button>
      </div>
    </div>
  );
}

function CropCard({ name, area, status, health }: { name: string; area: string; status: string; health: number }) {
  return (
    <div className="bg-[#F9F6EF] p-4 rounded-xl border border-[#A9CBB7]/20">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-[#2E2E2E]">{name}</h4>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          health >= 90 ? 'text-[#3E8E55] bg-[#3E8E55]/10' :
          health >= 80 ? 'text-[#F5C84C] bg-[#F5C84C]/10' :
          'text-red-500 bg-red-50'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-[#7B5E3B] mb-2">{area}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#7B5E3B]">Health</span>
        <span className="text-sm font-medium text-[#2E2E2E]">{health}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className={`h-2 rounded-full ${
            health >= 90 ? 'bg-[#3E8E55]' :
            health >= 80 ? 'bg-[#F5C84C]' :
            'bg-red-500'
          }`}
          style={{ width: `${health}%` }}
        ></div>
      </div>
    </div>
  );
}

function AchievementBadge({ icon, title, description, earned }: { icon: string; title: string; description: string; earned: boolean }) {
  return (
    <div className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
      earned 
        ? 'border-[#3E8E55] bg-[#3E8E55]/10 shadow-sm' 
        : 'border-gray-300 bg-gray-50 opacity-60'
    }`}>
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-semibold text-[#2E2E2E] mb-2">{title}</h4>
      <p className="text-xs text-[#7B5E3B]">{description}</p>
      {earned && (
        <div className="mt-3">
          <span className="bg-[#3E8E55] text-white text-xs px-3 py-1 rounded-full font-medium">Earned</span>
        </div>
      )}
    </div>
  );
}

export default App;