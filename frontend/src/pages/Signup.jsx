import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { User, Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // ✅ ICI : On ne remet pas "/api" car il est déjà dans axios.js
      // Et on utilise "/users/signup" pour correspondre au backend
      await api.post('/users/signup', formData); 
      
      alert("✨ Compte créé ! Prêt à prédire les tendances ?");
      navigate('/login');
    } catch (err) {
      console.log("Erreur détaillée:", err.response);
      alert("❌ " + (err.response?.data?.message || "Erreur d'inscription"));
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fcfcfd] overflow-hidden">
      
      {/* BACKGROUND : Mix Orange Rosé & Bleu Jaunâtre */}
      <div className="absolute -top-[15%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-[#FF6B6B]/15 to-[#FF8E53]/15 blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-[15%] -right-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-tr from-[#4FACFE]/15 to-[#EEF2AD]/20 blur-[100px] pointer-events-none"></div>

      {/* Grille technique */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm19 19h1v1h-1v-1z' fill='%23FF6B6B' fill-opacity='1'/%3E%3C/svg%3E")` }}></div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/70 backdrop-blur-3xl p-10 rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(255,107,107,0.1)] border-2 border-[#FF6B6B]/10">
          
          <div className="text-center mb-8">
            {/* Badge de sécurité en Bleu Jaunâtre */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#4FACFE]/10 to-[#EEF2AD]/20 text-[#4FACFE] text-xs font-bold uppercase tracking-widest mb-4 border border-[#4FACFE]/20">
              <ShieldCheck size={14} />
              Accès Chiffré
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Rejoindre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]">AI Predictor</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium">L'algorithme qui devance demain.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF6B6B] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Nom complet" 
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-[#FF6B6B]/30 focus:ring-4 focus:ring-[#FF6B6B]/5 transition-all font-medium text-gray-800 placeholder:text-gray-300" 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF6B6B] transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email professionnel" 
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-[#FF6B6B]/30 focus:ring-4 focus:ring-[#FF6B6B]/5 transition-all font-medium text-gray-800 placeholder:text-gray-300" 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF6B6B] transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Créer un mot de passe" 
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-[#FF6B6B]/30 focus:ring-4 focus:ring-[#FF6B6B]/5 transition-all font-medium text-gray-800 placeholder:text-gray-300" 
                onChange={e => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>

            <button className="w-full group bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white py-4 rounded-2xl font-extrabold hover:shadow-2xl hover:shadow-orange-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 mt-4 text-lg">
              Lancer l'expérience
              <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-50">
            <p className="text-gray-400 font-medium text-sm italic">
              Déjà membre de l'élite ?
            </p>
            <Link to="/login" className="inline-flex items-center gap-2 mt-2 text-[#4FACFE] font-bold hover:text-[#FF6B6B] transition-all">
              Se reconnecter <Sparkles size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}