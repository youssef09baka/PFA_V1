import { useState, useEffect } from 'react';
import api from '../api/axios';
import { TrendingUp, BarChart3, Clock, Share2, Filter, Zap } from 'lucide-react';

export default function Feed() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const { data } = await api.get('/trends');
        setTrends(data);
      } catch (err) {
        console.error("Erreur feed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-8">
      {/* Header du Feed */}
      <div className="max-w-7xl mx-auto mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Flux de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]">Tendances</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Analyses prédictives en temps réel.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-50 rounded-2xl font-bold text-gray-600 hover:border-[#FF6B6B]/20 transition-all shadow-sm">
          <Filter size={18} /> Filtrer
        </button>
      </div>

      {/* Grille des tendances */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-20 text-gray-300 font-bold animate-pulse text-xl">
            Analyse des données en cours...
          </div>
        ) : (
          trends.map((trend) => (
            <div key={trend._id} className="group relative bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border-2 border-transparent hover:border-[#FF6B6B]/20 transition-all duration-500 hover:-translate-y-2">
              
              {/* MODIFICATION ICI : Conteneur Titre + Badge avec flexbox */}
              <div className="flex justify-between items-start mb-6 gap-2">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 text-[#FF6B6B] shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  {/* On limite la largeur du texte pour laisser la place au badge */}
                  <div className="max-w-[150px] sm:max-w-[180px]">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#FF6B6B] transition-colors leading-tight break-words">
                      {trend.title}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mt-1">
                      {trend.category}
                    </span>
                  </div>
                </div>

                {/* Badge de score IA fixe à droite */}
                <div className="px-3 py-1 rounded-full bg-[#EEF2AD]/30 text-[#4FACFE] text-[10px] font-black uppercase tracking-tighter border border-[#EEF2AD] shrink-0 whitespace-nowrap">
                  Score IA: {trend.score || '98'}%
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {trend.description || "Analyse prédictive basée sur l'évolution des recherches et de l'engagement social sur les dernières 24h."}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="flex items-center gap-1.5 text-xs font-bold">
                    <Clock size={14} /> 2h ago
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#4FACFE]">
                    <Zap size={14} fill="currentColor" /> High Potential
                  </span>
                </div>
                <button className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#FF6B6B] hover:text-white transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}