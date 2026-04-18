import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CheckCircle2, Rocket, Gamepad2, GraduationCap, Briefcase, Heart } from 'lucide-react';

const categories = [
  { id: 'gaming', name: 'Gaming', icon: <Gamepad2 /> },
  { id: 'education', name: 'Éducation', icon: <GraduationCap /> },
  { id: 'tech', name: 'Technologie', icon: <Rocket /> },
  { id: 'business', name: 'Business', icon: <Briefcase /> },
  { id: 'health', name: 'Santé', icon: <Heart /> },
];

export default function Preferences() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleCategory = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSave = async () => {
    try {
      // ✅ Connexion à ta route PUT protégée
      await api.put('/users/preferences', { preferences: selected });
      navigate('/dashboard'); // Direction le Dashboard après validation
    } catch (err) {
      alert("Erreur lors de la sauvegarde des préférences");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full text-center mb-12">
        <h2 className="text-4xl font-black text-gray-900 mb-4">Personnalisez votre <span className="text-[#FF6B6B]">Intelligence</span></h2>
        <p className="text-gray-400 font-medium">Choisissez les domaines que vous souhaitez que l'IA surveille pour vous.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => toggleCategory(cat.id)}
            className={`relative p-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-4 group ${
              selected.includes(cat.id) 
              ? 'border-[#FF6B6B] bg-white shadow-xl shadow-orange-100' 
              : 'border-transparent bg-white/50 hover:bg-white hover:border-gray-100 shadow-sm'
            }`}
          >
            <div className={`p-4 rounded-2xl transition-colors ${selected.includes(cat.id) ? 'bg-[#FF6B6B] text-white' : 'bg-gray-50 text-gray-400 group-hover:text-[#FF6B6B]'}`}>
              {cat.icon}
            </div>
            <span className={`font-bold ${selected.includes(cat.id) ? 'text-gray-900' : 'text-gray-400'}`}>{cat.name}</span>
            {selected.includes(cat.id) && <CheckCircle2 className="absolute top-4 right-4 text-[#FF6B6B]" size={20} />}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={selected.length === 0}
        className="mt-12 px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-[#FF6B6B] transition-all disabled:opacity-30 disabled:hover:bg-gray-900"
      >
        Lancer mon Dashboard
      </button>
    </div>
  );
}