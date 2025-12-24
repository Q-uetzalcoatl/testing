import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { CheckCircle, Trash2 } from 'lucide-react';

export default function AdminPanel({ db, appId, quizzes }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, 'artifacts', appId, 'public', 'data', 'class_results');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResults(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [db, appId]);

  const handleDelete = async (docId) => {
    if(!window.confirm("Are you sure you want to remove this student's record?")) return;
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'class_results', docId));
    } catch (err) {
      alert("Error removing student.");
    }
  };

  const handleReleaseAll = async () => {
    if(!window.confirm("Release scores for ALL students?")) return;
    const updates = results.map(r => {
        const ref = doc(db, 'artifacts', appId, 'public', 'data', 'class_results', r.id);
        return setDoc(ref, { released: true }, { merge: true });
    });
    await Promise.all(updates);
    alert("Scores Released!");
  };

  const getRowColor = (r) => {
      if (r.violations >= 5 || r.status === 'cheated') return 'bg-red-50 hover:bg-red-100 border-l-4 border-red-500';
      if (r.violations >= 3) return 'bg-yellow-50 hover:bg-yellow-100 border-l-4 border-yellow-400';
      return 'bg-white hover:bg-emerald-50 border-l-4 border-transparent';
  };

  return (
    <div className="w-full max-w-6xl mt-8">
       <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900">Instructor Dashboard</h2>
            <p className="text-emerald-600">Manage student submissions and monitor integrity.</p>
          </div>
          <button 
            onClick={handleReleaseAll}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          >
             <CheckCircle className="w-5 h-5" /> Release All Scores
          </button>
       </div>

       {loading ? (
         <div className="text-center py-12 text-emerald-500 font-bold">Loading Class Data...</div>
       ) : results.length === 0 ? (
         <div className="text-center py-12 bg-white rounded-xl text-gray-400 italic border border-dashed border-gray-300">
             No student submissions yet.
         </div>
       ) : (
         <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-800 text-white text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">Student Name</th>
                    <th className="p-4 font-semibold">Quiz Title</th>
                    <th className="p-4 font-semibold text-center">Score</th>
                    <th className="p-4 font-semibold text-center">Violations</th>
                    <th className="p-4 font-semibold text-center">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {results.map((r) => (
                    <tr key={r.id} className={`transition-colors ${getRowColor(r)}`}>
                      <td className="p-4 font-bold text-emerald-900">{r.studentName}</td>
                      <td className="p-4 text-emerald-700 text-sm">{r.quizTitle}</td>
                      <td className="p-4 text-center font-mono font-bold text-lg">{r.score}/{r.total}</td>
                      <td className="p-4 text-center">
                        {r.violations > 0 ? (
                            <span className={`px-2 py-1 rounded text-xs font-bold ${r.violations >=5 ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                {r.violations}/5 {r.violations >= 3 && '⚠️'}
                            </span>
                        ) : <span className="text-emerald-300">-</span>}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                            ${r.released ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}
                        `}>
                            {r.released ? 'Released' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                           onClick={() => handleDelete(r.id)}
                           className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                           title="Delete Student Record"
                        >
                           <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>
       )}
    </div>
  );
                         }
