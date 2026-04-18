import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Sparkles, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/login', { email, password });
      login(data.user, data.token);
      navigate('/feed'); 
    } catch (err) {
      alert("⚠️ Échec de la connexion.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fcfcfd] overflow-hidden">
      
      {/* 1. BACKGROUND DYNAMIQUE : Tes nouvelles couleurs */}
      {/* Blob Orange Rosé */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8E53]/20 blur-[120px] pointer-events-none animate-pulse"></div>
      
      {/* Blob Bleu Jaunâtre (Cyan avec une pointe de vert/jaune) */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#4FACFE]/20 to-[#EEF2AD]/30 blur-[120px] pointer-events-none"></div>

      {/* Grille technique subtile */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0z' fill='%23FF6B6B' fill-opacity='1'/%3E%3C/svg%3E")` }}></div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* LA CARTE : Bordure avec dégradé Orange-Rose */}
        <div className="bg-white/70 backdrop-blur-3xl p-10 rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(255,107,107,0.15)] border-2 border-[#FF6B6B]/10">
          
          <div className="text-center mb-10">
            {/* Logo avec ton nouveau dégradé */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white mb-4 shadow-xl shadow-orange-500/20">
              <Sparkles size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]">Predictor</span>
            </h1>
            <p className="text-gray-400 font-medium mt-1 uppercase text-xs tracking-[0.2em]">Intelligence Data Driven</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input avec focus Bleu Jaunâtre */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4FACFE] transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email professionnel" 
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-[#4FACFE]/50 focus:ring-4 focus:ring-[#4FACFE]/10 transition-all font-medium text-gray-800 placeholder:text-gray-300" 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4FACFE] transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Mot de passe" 
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-[#4FACFE]/50 focus:ring-4 focus:ring-[#4FACFE]/10 transition-all font-medium text-gray-800 placeholder:text-gray-300" 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>

            {/* Bouton principal Orange Rosé */}
            <button className="w-full group bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white py-4 rounded-2xl font-bold hover:shadow-orange-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] text-lg">
              Se connecter
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-50 pt-8">
            <Link to="/signup" className="text-sm font-bold text-gray-400 hover:text-[#FF6B6B] transition-colors">
              Nouveau ici ? <span className="text-[#FF6B6B]">Créer un compte</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}