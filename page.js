"use client";
import { useState, useRef, useEffect } from 'react';

export default function GolfAcademyChatbot() {
  const [input, setInput] = useState('');
  const [currentMenu, setCurrentMenu] = useState('service');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [notes, setNotes] = useState([]);

  const addNote = (text) => {
    if (!text.trim()) return;
    setNotes(prev => [...prev, text]);
    setInput('');
  };

  const getPrice = () => {
    if (selectedService === 'Standard') {
      return selectedDuration === 60 ? "$90" : "$50";
    } else {
      return selectedDuration === 60 ? "$70" : "$40";
    }
  };

  const getDateLabel = () => selectedDate === 'mon' ? "Monday, Jan 12th" : "Tuesday, Jan 13th";

  const suggestedNotes = [
    "I am dealing with a slice",
    "I'm new to golf and need help",
    "Focus on putting",
    "Want to increase swing speed"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[850px] relative border-4 border-white">
        
        {/* Header */}
        <div className="bg-emerald-900 p-6 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">⛳</div>
              <div>
                <h1 className="text-2xl font-black tracking-tight leading-none uppercase italic">Elite Academy</h1>
                <p className="text-emerald-400 text-[10px] font-bold tracking-widest mt-1">PRO BOOKING SYSTEM</p>
              </div>
            </div>
            {selectedService && (
              <div className="text-right bg-emerald-800/50 px-4 py-2 rounded-2xl border border-emerald-700 animate-in fade-in slide-in-from-right-4">
                <span className="text-[10px] uppercase font-black text-emerald-400 block mb-0.5 tracking-widest">Selection</span>
                <span className="text-xs font-bold text-white uppercase tracking-tighter">
                  {selectedService} {selectedDuration ? `• ${selectedDuration}m` : ''}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Suggestion #2: INTERACTIVE NOTEBOARD AREA */}
        <div className={`flex-1 p-8 overflow-y-auto bg-[#e5e7eb] shadow-inner ${currentMenu !== 'notes' ? 'hidden' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-emerald-900 font-black italic uppercase tracking-tighter text-xl">📌 Lesson Briefing Board</h2>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hover to interact</span>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {notes.map((note, idx) => (
              <div 
                key={idx} 
                className="group bg-yellow-200 p-5 shadow-xl rotate-1 transform hover:rotate-0 hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-l-8 border-yellow-400 min-h-[130px] flex items-center justify-center text-center text-gray-800 font-bold text-sm relative"
              >
                {note}
                <button 
                  onClick={() => setNotes(notes.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/5 hover:bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="col-span-2 flex flex-col items-center justify-center py-24 border-4 border-dashed border-gray-300 rounded-[40px] text-gray-400">
                <span className="text-5xl mb-4 grayscale opacity-50">📋</span>
                <p className="font-bold uppercase tracking-widest text-xs">Your coach's board is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* Booking Action Area */}
        <div className="p-8 bg-white border-t-4 border-gray-50 shrink-0">
          <div className="flex flex-col gap-4">
            
            {/* STEP: SERVICE */}
            {currentMenu === 'service' && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-emerald-900 font-black uppercase tracking-tighter mb-4 italic text-lg">Step 1: Choose Your Session</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => { setSelectedService('Standard'); setCurrentMenu('main'); }} className="group w-full p-6 border-4 border-emerald-900 text-emerald-900 rounded-[32px] font-black hover:bg-emerald-900 hover:text-white flex justify-between items-center transition-all shadow-lg active:scale-95">
                    <div className="flex items-center gap-6">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🏌️‍♂️</div>
                      <div>
                        <span className="block text-2xl uppercase tracking-tighter leading-none">Standard Lesson</span>
                        <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Irons & Driver Mastery</span>
                      </div>
                    </div>
                    <span className="text-3xl opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all">❯</span>
                  </button>
                  <button onClick={() => { setSelectedService('Short Game'); setCurrentMenu('main'); }} className="group w-full p-6 border-4 border-emerald-900 text-emerald-900 rounded-[32px] font-black hover:bg-emerald-900 hover:text-white flex justify-between items-center transition-all shadow-lg active:scale-95">
                    <div className="flex items-center gap-6">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">⛳</div>
                      <div>
                        <span className="block text-2xl uppercase tracking-tighter leading-none">Short Game</span>
                        <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Wedges & Putting Skills</span>
                      </div>
                    </div>
                    <span className="text-3xl opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all">❯</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP: DURATION */}
            {currentMenu === 'main' && (
              <div className="animate-in fade-in">
                <button onClick={() => setCurrentMenu('service')} className="text-emerald-700 font-black mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest">← Back to Session Type</button>
                <h3 className="text-emerald-900 font-black uppercase tracking-tighter mb-4 italic text-lg">Step 2: Duration</h3>
                <div className="flex flex-col gap-3">
                  <button onClick={() => { setSelectedDuration(30); setCurrentMenu('date'); }} className="group w-full p-5 border-2 border-emerald-900 text-emerald-900 rounded-2xl font-black hover:bg-emerald-50 flex justify-between items-center transition-all active:scale-95">
                    <span className="text-lg uppercase italic">30 Minute Session</span>
                    <span className="font-black text-emerald-600 text-xl">{selectedService === 'Standard' ? "$50" : "$40"}</span>
                  </button>
                  <button onClick={() => { setSelectedDuration(60); setCurrentMenu('date'); }} className="group w-full p-5 border-2 border-emerald-900 text-emerald-900 rounded-2xl font-black hover:bg-emerald-50 flex justify-between items-center transition-all active:scale-95">
                    <span className="text-lg uppercase italic">60 Minute Session</span>
                    <span className="font-black text-emerald-600 text-xl">{selectedService === 'Standard' ? "$90" : "$70"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP: DATE & TIME (Logic remained same as last version for flow) */}
            {currentMenu === 'date' && (
              <div className="animate-in fade-in">
                <button onClick={() => setCurrentMenu('main')} className="text-emerald-700 font-black mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest">← Back</button>
                <h3 className="text-emerald-900 font-black uppercase tracking-tighter mb-4 italic text-lg text-left">Step 3: Select Date</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'mon', text: "Monday, Jan 12th", avail: [30, 60] },
                    { id: 'tue', text: "Tuesday, Jan 13th", avail: [30] } 
                  ].map((date) => {
                    const isAvail = date.avail.includes(selectedDuration);
                    return (
                      <button 
                        key={date.id} disabled={!isAvail}
                        onClick={() => { setSelectedDate(date.id); setCurrentMenu('time'); }} 
                        className={`relative w-full p-5 border-2 rounded-2xl font-black text-left flex justify-between items-center overflow-hidden transition-all ${
                          isAvail ? 'border-emerald-900 text-emerald-900 hover:bg-emerald-50 active:scale-95' : 'border-gray-200 text-gray-300'
                        }`}
                      >
                        <span className="text-lg uppercase">{date.text} {!isAvail && "(Booked)"}</span>
                        {!isAvail && <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top right, transparent calc(50% - 1.5px), #e5e7eb 50%, transparent calc(50% + 1.5px))' }}></div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentMenu === 'time' && (
              <div className="animate-in fade-in">
                <button onClick={() => setCurrentMenu('date')} className="text-emerald-700 font-black mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest">← Back</button>
                <h3 className="text-emerald-900 font-black uppercase tracking-tighter mb-4 italic text-lg">Step 4: Pick a Slot</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"].map((time) => (
                    <button key={time} onClick={() => { setSelectedTime(time); setCurrentMenu('notes'); }} className="p-5 border-2 border-emerald-900 rounded-2xl font-black text-center text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all active:scale-95 uppercase tracking-tighter">
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP: NOTES & Suggestion #3: DYNAMIC PAY BUTTON */}
            {currentMenu === 'notes' && (
              <div className="flex flex-col space-y-4 animate-in fade-in slide-up duration-300">
                <button onClick={() => setCurrentMenu('time')} className="text-emerald-700 font-black flex items-center gap-1 text-[10px] uppercase tracking-widest">← Back</button>
                <div className="flex flex-wrap gap-2">
                  {suggestedNotes.map(s => (
                    <button key={s} onClick={() => addNote(s)} className="text-[9px] bg-emerald-900 text-white px-3 py-2 rounded-full font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-sm">+ {s}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text" value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addNote(input)}
                    placeholder="Describe your session goals..."
                    className="flex-1 px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-[24px] focus:outline-none focus:border-emerald-900 font-bold"
                  />
                  <button onClick={() => addNote(input)} className="px-10 py-5 bg-black text-white rounded-[24px] font-black uppercase tracking-tighter active:scale-95">Add</button>
                </div>

                {/* Policy Check */}
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3">
                  <input type="checkbox" id="pol" className="mt-1 w-5 h-5 accent-red-600 cursor-pointer" checked={policyAccepted} onChange={(e) => setPolicyAccepted(e.target.checked)} />
                  <label htmlFor="pol" className="text-[10px] text-red-900 font-bold leading-tight cursor-pointer uppercase tracking-tighter">
                    I agree to the <span className="underline italic">Cancellation Policy</span>: 24h notice required for refunds.
                  </label>
                </div>
                
                {/* DYNAMIC PAYMENT BUTTON */}
                <button 
                  disabled={!policyAccepted}
                  onClick={() => setShowSuccess(true)} 
                  className={`w-full p-6 rounded-[24px] font-black shadow-2xl transition-all flex items-center justify-center gap-4 group ${
                    policyAccepted ? 'bg-emerald-600 text-white active:scale-95' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                   <span className="text-2xl uppercase tracking-tighter">
                     {policyAccepted ? 'Confirm & Book Session' : 'Accept Terms to Book'}
                   </span>
                   {policyAccepted && (
                     <span className="bg-emerald-900/40 px-4 py-2 rounded-xl text-lg font-black group-hover:scale-110 transition-transform tracking-tight">
                       {getPrice()}
                     </span>
                   )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SUCCESS POP-UP */}
        {showSuccess && (
          <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-500">
            <div className="bg-white w-full max-w-md rounded-[50px] p-10 shadow-2xl flex flex-col items-center animate-in zoom-in-95 border-8 border-emerald-50">
              <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner animate-bounce">⛳</div>
              <h2 className="text-4xl font-black text-emerald-950 mb-1 tracking-tighter uppercase italic">You're In!</h2>
              
              <div className="w-full bg-emerald-50/50 rounded-[32px] p-8 my-6 text-left border border-emerald-100 space-y-4">
                <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                  <span className="text-gray-400 text-[9px] uppercase font-black tracking-widest">Service</span> 
                  <span className="font-black text-emerald-900 uppercase italic tracking-tighter">{selectedService} Mastery</span>
                </div>
                <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                  <span className="text-gray-400 text-[9px] uppercase font-black tracking-widest">Schedule</span> 
                  <span className="font-black text-emerald-900 uppercase italic tracking-tighter">{getDateLabel()} @ {selectedTime}</span>
                </div>
                <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                  <span className="text-gray-400 text-[9px] uppercase font-black tracking-widest">Total Paid</span> 
                  <span className="font-black text-emerald-600 text-2xl tracking-tighter">{getPrice()}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[9px] uppercase font-black tracking-widest block mb-3">Coach's Brief</span>
                  <div className="flex flex-wrap gap-2">
                    {notes.map((n, i) => (
                      <span key={i} className="text-[8px] bg-white px-2 py-1 rounded border border-emerald-100 font-black text-emerald-800 uppercase italic">"{n}"</span>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => window.location.reload()} className="w-full py-6 bg-black text-white rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-gray-900 shadow-xl transition-all active:scale-95">Done • Return to Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}