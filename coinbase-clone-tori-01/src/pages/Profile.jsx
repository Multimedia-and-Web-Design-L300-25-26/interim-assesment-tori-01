import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  // Generate initials avatar from name
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account details and preferences.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Avatar Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">{initials}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>

              {/* Role badge */}
              <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 capitalize">
                {user?.role || 'user'}
              </span>

              <div className="mt-6 w-full border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Member since</p>
                <p className="text-sm font-semibold text-gray-700">{memberSince}</p>
              </div>

              <button
                onClick={handleLogout}
                id="logout-btn"
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </div>
          </div>

          {/* Right: Profile Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Info Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Information
              </h3>
              <div className="space-y-4">
                <InfoRow label="Full Name" value={user?.name} />
                <InfoRow label="Email Address" value={user?.email} />
                <InfoRow label="Account Type" value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'} />
                <InfoRow label="User ID" value={user?.id} mono />
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <QuickActionCard
                  icon="💰"
                  title="Explore Crypto"
                  description="Browse all available assets"
                  to="/explore"
                />
                <QuickActionCard
                  icon="📊"
                  title="View Prices"
                  description="See live market prices"
                  to="/prices"
                />
                <QuickActionCard
                  icon="📚"
                  title="Learn"
                  description="Explore beginner guides"
                  to="/learn"
                />
                <QuickActionCard
                  icon="🏠"
                  title="Home"
                  description="Back to the homepage"
                  to="/"
                />
              </div>
            </div>

            {/* Security Info Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Your account is secure</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Your session is protected with a JWT token. Always sign out when using a shared device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-50 last:border-0">
      <span className="text-sm font-semibold text-gray-500 sm:w-40 mb-1 sm:mb-0">{label}</span>
      <span className={`text-sm text-gray-900 ${mono ? 'font-mono text-xs bg-gray-50 px-2 py-1 rounded' : 'font-medium'}`}>
        {value || '—'}
      </span>
    </div>
  );
}

function QuickActionCard({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </Link>
  );
}
