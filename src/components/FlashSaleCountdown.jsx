import { useState, useEffect } from 'react';
import { Zap, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FlashSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => n.toString().padStart(2, '0');

  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-red-900/40 via-rose-900/30 to-orange-900/40 border-y border-red-700/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              <div>
                <h3 className="font-display font-bold text-white">⚡ Flash Sale Live!</h3>
                <p className="text-sm text-gray-400">Up to 60% off — ends soon</p>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400 mr-1" />
              <div className="flex gap-1">
                {[
                  { label: 'hrs', value: pad(timeLeft.hours) },
                  { label: 'min', value: pad(timeLeft.minutes) },
                  { label: 'sec', value: pad(timeLeft.seconds) },
                ].map((unit, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="bg-onyx-900 border border-red-700/30 rounded-lg px-2 py-1 text-center min-w-[40px]">
                      <span className="text-lg font-display font-bold text-red-400">{unit.value}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase">{unit.label}</span>
                    {i < 2 && <span className="text-red-400 font-bold text-lg">:</span>}
                  </div>
                ))}
              </div>
            </div>

            <Link to="/shop?dept=fashion" className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 rounded-xl text-white text-sm font-bold transition-all flex-shrink-0">
              Shop Flash Sale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
