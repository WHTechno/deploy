interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function StatsCard({ title, value, icon, trend, trendValue }: StatsCardProps) {
  const trendColors = {
    up: 'text-green-300',
    down: 'text-red-300',
    neutral: 'text-blue-300',
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1 drop-shadow">{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center mt-2 ${trendColors[trend]}`}>
              <span className="text-sm">
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className="text-4xl opacity-80 drop-shadow-lg">{icon}</div>
      </div>
    </div>
  );
}