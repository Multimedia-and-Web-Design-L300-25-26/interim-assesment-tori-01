import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [step, setStep] = useState('email'); // 'email' | 'password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // After login, redirect to where they were going (or home)
  const from = location.state?.from?.pathname || '/';

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setStep('password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[480px] bg-white pt-10 pb-12 px-8 sm:px-12 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative mt-8">

        {/* Coinbase Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity" aria-label="Coinbase homepage">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Coinbase</span>
            </div>
          </Link>
        </div>

        <h1 className="text-[28px] font-bold text-[#0a0b0d] mb-8 text-center leading-tight">
          Sign in to Coinbase
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {step === 'email' ? (
          <form className="space-y-5" onSubmit={handleEmailSubmit}>
            <div className="space-y-1">
              <label htmlFor="signin-email" className="block text-sm font-semibold text-gray-900">
                Email
              </label>
              <Input
                id="signin-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-white border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:border-blue-600 text-[16px]"
                autoComplete="email"
                required
              />
            </div>

            <Button
              type="submit"
              fullWidth
              className="h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-[100px] text-[16px] font-semibold transition-colors duration-200 mt-2"
            >
              Continue
            </Button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Show the email with edit option */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-sm text-gray-700 font-medium truncate">{email}</span>
              <button
                type="button"
                onClick={() => { setStep('email'); setError(''); setPassword(''); }}
                className="text-blue-600 text-sm font-semibold hover:underline ml-3 flex-shrink-0"
              >
                Edit
              </button>
            </div>

            <div className="space-y-1">
              <label htmlFor="signin-password" className="block text-sm font-semibold text-gray-900">
                Password
              </label>
              <Input
                id="signin-password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-white border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:border-blue-600 text-[16px]"
                autoComplete="current-password"
                autoFocus
                required
              />
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading}
              className="h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-[100px] text-[16px] font-semibold transition-colors duration-200"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        )}

        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <div className="px-4 text-[13px] text-gray-500 font-semibold tracking-wide bg-white">OR</div>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" fullWidth className="h-14 border-gray-300 hover:bg-gray-50 text-gray-900 rounded-[100px] text-[16px] font-semibold flex items-center justify-center gap-3">
            Sign in with Passkey
          </Button>
          <Button variant="outline" fullWidth className="h-14 border-gray-300 hover:bg-gray-50 text-gray-900 rounded-[100px] text-[16px] font-semibold flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </Button>
        </div>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-900 font-medium">Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full max-w-[480px] mt-6 text-center text-[13px] text-gray-500">
        <p>Not your device? Use a private window. See our{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          {' '}for more info.
        </p>
      </div>
    </div>
  );
}
