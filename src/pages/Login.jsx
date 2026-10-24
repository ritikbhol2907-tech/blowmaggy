import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';

export default function Login() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = loginWithEmail(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-onyx-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-gold-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </button>

        {/* Login Card */}
        <div className="bg-onyx-900 border border-onyx-800 rounded-3xl p-8 shadow-gold">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-onyx-950 font-heading font-black text-2xl">B</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-1">Sign in to your Blowmaggy account</p>
          </div>

          {/* Google Login */}
          <button onClick={loginWithGoogle} className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-onyx-800 hover:bg-onyx-700 border border-onyx-700 rounded-xl text-white font-medium transition-all mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-onyx-700" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">or sign in with email</span>
            <div className="flex-1 h-px bg-onyx-700" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark w-full pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-dark w-full pl-10"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" className="btn-primary w-full text-base">
              Sign In
            </button>
          </form>

          {/* Demo Accounts */}
          <button onClick={() => setShowDemo(!showDemo)} className="w-full mt-6 text-center text-sm text-gold-400 hover:text-gold-300 transition-colors">
            {showDemo ? 'Hide Demo Accounts' : 'Try Demo Accounts'}
          </button>

          {showDemo && (
            <div className="mt-4 space-y-3 animate-scale-in">
              {/* Customer Demo */}
              <button
                onClick={() => { loginWithEmail('priya@blowmaggy.com', 'user123'); navigate('/'); }}
                className="w-full p-4 bg-onyx-800/50 border border-onyx-700/50 rounded-xl hover:border-gold-500/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center text-onyx-950 font-bold text-sm">
                    👩
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-white group-hover:text-gold-400 transition-colors">Customer Demo</p>
                    <p className="text-xs text-gray-500">priya@blowmaggy.com / user123</p>
                  </div>
                  <span className="tag bg-gold-500/20 text-gold-400">Customer</span>
                </div>
              </button>

              {/* Manager Demo */}
              <button
                onClick={() => { loginWithEmail('manager@blowmaggy.com', 'manager123'); navigate('/admin'); }}
                className="w-full p-4 bg-onyx-800/50 border border-onyx-700/50 rounded-xl hover:border-red-500/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                    🎩
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-white group-hover:text-gold-400 transition-colors">Manager Demo</p>
                    <p className="text-xs text-gray-500">manager@blowmaggy.com / manager123</p>
                  </div>
                  <span className="tag bg-red-500/20 text-red-400">Manager</span>
                </div>
              </button>

              {/* Employee Demo */}
              <button
                onClick={() => { loginWithEmail('employee@blowmaggy.com', 'employee123'); navigate('/employee'); }}
                className="w-full p-4 bg-onyx-800/50 border border-onyx-700/50 rounded-xl hover:border-blue-500/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    👤
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-white group-hover:text-gold-400 transition-colors">Employee Demo</p>
                    <p className="text-xs text-gray-500">employee@blowmaggy.com / employee123</p>
                  </div>
                  <span className="tag bg-blue-500/20 text-blue-400">Employee</span>
                </div>
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">By signing in, you agree to our Terms of Service & Privacy Policy</p>
      </div>
    </div>
  );
}
