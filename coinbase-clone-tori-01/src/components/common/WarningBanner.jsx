import { useState } from 'react';

export default function WarningBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      id="student-project-banner"
      role="alert"
      style={{
        background: 'linear-gradient(90deg, #1e3a5f 0%, #1a4f8a 50%, #1e3a5f 100%)',
        borderBottom: '1px solid rgba(99,179,237,0.3)',
      }}
      className="w-full px-4 py-2.5 flex items-center justify-center gap-3 relative z-50"
    >
      {/* Icon */}
      <svg
        className="w-4 h-4 text-yellow-400 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>

      {/* Message */}
      <p className="text-xs sm:text-sm text-blue-100 text-center leading-snug">
        <span className="font-semibold text-yellow-300">⚠ Student Project</span>
        {' — '}
        This is an academic demo app and is{' '}
        <span className="font-semibold text-white">not affiliated with, endorsed by, or connected to Coinbase</span>.
        No real transactions are processed.
      </p>

      {/* Dismiss button */}
      <button
        id="dismiss-warning-banner"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss warning banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
