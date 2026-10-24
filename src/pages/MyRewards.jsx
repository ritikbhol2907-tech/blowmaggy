import { Star, Gift, Truck, Gift as GiftIcon } from 'lucide-react';

export default function MyRewards() {
  const points = 2450;
  const nextTier = 5000;
  const progress = (points / nextTier) * 100;

  const rewards = [
    { id: 1, title: '₹500 Off Coupon', cost: 1000, type: 'discount', used: false },
    { id: 2, title: 'Free Shipping Pass', cost: 500, type: 'shipping', used: false },
    { id: 3, title: 'Gift Box (Premium)', cost: 2000, type: 'gift', used: false },
    { id: 4, title: 'Exclusive 20% Off', cost: 3000, type: 'discount', used: false },
    { id: 5, title: 'Free express Delivery', cost: 800, type: 'shipping', used: false },
    { id: 6, title: 'Birthday Gift Voucher', cost: 1500, type: 'gift', used: true },
  ];

  const tierBenefits = {
    Standard: ['Earn 1 point per ₹100 spent', 'Birthday discount'],
    Gold: ['Earn 1.5 points per ₹100 spent', 'Free shipping on all orders', 'Early access to sales'],
    Platinum: ['Earn 2 points per ₹100 spent', 'Priority customer support', 'Exclusive events'],
  };

  return (
    <div className="min-h-screen bg-onyx-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-white text-2xl mb-8">Rewards & Points</h1>

        {/* Points Card */}
        <div className="gold-gradient rounded-2xl p-6 md:p-8 mb-8 text-onyx-950">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-onyx-900/70 text-sm font-medium">Available Points</p>
              <p className="text-4xl font-display font-black">{points}</p>
              <p className="text-onyx-900/60 text-sm mt-1">≈ ₹{points} value</p>
            </div>
            <div className="w-full md:w-64">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Gold Tier Progress</span>
                <span className="font-bold">{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-onyx-900/20 rounded-full h-2.5">
                <div className="bg-onyx-950 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-onyx-900/60 mt-1">{nextTier - points} points to Platinum</p>
            </div>
          </div>

          {/* Tier badges */}
          <div className="flex gap-3 mt-6">
            <div className="bg-onyx-900/10 rounded-xl px-3 py-2 flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="text-sm font-bold">Gold Member</span>
            </div>
            <div className="bg-onyx-900/10 rounded-xl px-3 py-2">
              <span className="text-sm">₹2,450 saved</span>
            </div>
          </div>
        </div>

        {/* Tier Info */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { name: 'Standard', desc: '0-999 pts', color: 'border-gray-600', bg: 'bg-gray-500/5' },
            { name: 'Gold', desc: '1000-4999 pts', color: 'border-gold-500', bg: 'bg-gold-500/10' },
            { name: 'Platinum', desc: '5000+ pts', color: 'border-purple-500', bg: 'bg-purple-500/10' },
          ].map(tier => (
            <div key={tier.name} className={`bg-onyx-900 border ${tier.color} rounded-xl p-4 text-center ${tier.name === 'Gold' ? 'border-gold-500/50 ring-1 ring-gold-500/20' : ''}`}>
              <p className="font-bold text-white text-sm">{tier.name}</p>
              <p className="text-xs text-gray-500">{tier.desc}</p>
            </div>
          ))}
        </div>

        {/* Redeem Rewards */}
        <h3 className="font-display font-bold text-white text-lg mb-4">Redeem Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {rewards.map(reward => (
            <div key={reward.id} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-4 flex items-center gap-4 hover:border-gold-500/20 transition-all">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                reward.type === 'discount' ? 'bg-gold-500/10' :
                reward.type === 'shipping' ? 'bg-blue-500/10' : 'bg-purple-500/10'
              }`}>
                {reward.type === 'discount' ? '🏷️' : reward.type === 'shipping' ? '🚚' : '🎁'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-white truncate">{reward.title}</p>
                <p className="text-xs text-gold-400">{reward.cost} points</p>
              </div>
              {reward.used ? (
                <span className="tag bg-gray-500/10 text-gray-500">Used</span>
              ) : (
                <button className="px-3 py-1.5 bg-gold-500/10 text-gold-400 rounded-lg text-xs font-semibold hover:bg-gold-500/20 transition-colors">
                  Redeem
                </button>
              )}
            </div>
          ))}
        </div>

        {/* How to Earn */}
        <h3 className="font-display font-bold text-white text-lg mb-4">How to Earn Points</h3>
        <div className="space-y-3">
          {[
            { action: 'Make a Purchase', points: '1 point per ₹100 spent', icon: '🛒' },
            { action: 'Write a Review', points: '50 points per review', icon: '✍️' },
            { action: 'Refer a Friend', points: '200 points per referral', icon: '👥' },
            { action: 'Birthday Bonus', points: '500 points on birthday', icon: '🎂' },
          ].map((method, i) => (
            <div key={i} className="bg-onyx-900 border border-onyx-800/50 rounded-xl p-4 flex items-center gap-4">
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">{method.action}</p>
                <p className="text-xs text-gray-500">{method.points}</p>
              </div>
              <span className="tag bg-gold-500/10 text-gold-400">+{method.points.match(/\d+/)?.[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
