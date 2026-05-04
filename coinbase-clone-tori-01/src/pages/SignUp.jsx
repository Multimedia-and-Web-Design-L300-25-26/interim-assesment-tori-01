import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const accountTypes = [
  {
    id: 'personal',
    title: 'Personal',
    description: 'Trade crypto as an individual.',
    iconUrl: 'https://static-assets.coinbase.com/ui-infra/illustration/v1/pictogram/svg/light/delegate-3.svg',
  },
  {
    id: 'business',
    title: 'Business',
    description: 'For small businesses and startups.',
    iconUrl: 'https://static-assets.coinbase.com/ui-infra/illustration/v1/pictogram/svg/light/holdingCoin-3.svg',
  },
  {
    id: 'institutional',
    title: 'Institutional',
    description: 'Recommended for larger institutions.',
    iconUrl: 'https://static-assets.coinbase.com/ui-infra/illustration/v1/pictogram/svg/light/advancedTradingDesktop-4.svg',
  },
  {
    id: 'developer',
    title: 'Developer',
    description: 'Build onchain using developer tooling.',
    iconUrl: 'https://static-assets.coinbase.com/ui-infra/illustration/v1/pictogram/svg/light/developerPlatformNavigation-2.svg',
  },
];

export default function SignUp() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState('type'); // 'type' | 'form'
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setStep('form');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register(name.trim(), email.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="w-full max-w-2xl mb-10 flex justify-start">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity" aria-label="Coinbase homepage">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">₿</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Coinbase</span>
          </div>
        </Link>
      </div>

      {step === 'type' ? (
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-[28px] font-semibold text-[#0a0b0d] mb-4 text-center leading-tight">
            What kind of account are you creating?
          </h1>

          {/* Demo note */}
          <div
            id="signup-demo-note-type"
            className="mb-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700 font-medium text-center">
              Demo app – do not use your real password.
            </p>
          </div>
          <div className="space-y-4">
            {accountTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type)}
                className="w-full flex items-center p-5 bg-white border border-[#e2e8f0] rounded-xl hover:border-blue-600 hover:shadow-sm hover:bg-gray-50 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex-shrink-0 mr-6">
                  <img src={type.iconUrl} alt={`${type.title} icon`} className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-[17px] font-semibold text-[#0a0b0d] mb-1">{type.title}</h2>
                  <p className="text-[15px] text-[#5c6975]">{type.description}</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => { setStep('type'); setError(''); }}
            className="flex items-center gap-1 text-blue-600 text-sm font-semibold mb-6 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-3 mb-4">
            <img src={selectedType.iconUrl} alt={selectedType.title} className="w-10 h-10" />
            <div>
              <h1 className="text-[24px] font-bold text-[#0a0b0d]">Create your {selectedType.title} account</h1>
              <p className="text-[14px] text-gray-500">{selectedType.description}</p>
            </div>
          </div>

          {/* Demo note */}
          <div
            id="signup-demo-note-form"
            className="mb-5 flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700 font-medium">
              Demo app – do not use your real password.
            </p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
              <Input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border-gray-300 text-[15px]"
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-semibold text-gray-900 mb-1">Email Address</label>
              <Input
                id="signup-email"
                name="email"
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border-gray-300 text-[15px]"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-semibold text-gray-900 mb-1">Password</label>
              <Input
                id="signup-password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border-gray-300 text-[15px]"
                autoComplete="new-password"
                required
              />
            </div>

            <div>
              <label htmlFor="signup-confirm" className="block text-sm font-semibold text-gray-900 mb-1">Confirm Password</label>
              <Input
                id="signup-confirm"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border-gray-300 text-[15px]"
                autoComplete="new-password"
                required
              />
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading}
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-[100px] text-[16px] font-semibold mt-2"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      )}
    </div>
  );
}
