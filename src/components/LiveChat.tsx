import { useState, FormEvent } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'agent'}[]>([
    { text: "Hello! How can we help you today?", sender: 'agent' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Mock auto-reply
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Thank you for reaching out. One of our specialists will be with you shortly.", sender: 'agent' }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-skin-text text-white flex items-center justify-center hover:bg-black transition-all z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[350px] bg-white border border-skin-text/10 z-50 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right shadow-2xl shadow-black/5 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-skin-bg border-b border-skin-text/10 p-4 flex justify-between items-center">
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-skin-text">Client Support</h4>
            <p className="text-[10px] font-sans text-skin-text/60 mt-1">Typically replies in a few minutes</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-skin-text/60 hover:text-skin-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-[300px] bg-skin-bg/50 p-4 overflow-y-auto flex flex-col gap-4 font-sans">
          {messages.map((msg, idx) => (
            <div key={idx} className={`max-w-[85%] p-4 text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-skin-text text-white self-end' : 'bg-white text-skin-text border border-skin-text/10 self-start'}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-skin-text/10 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-skin-bg border border-skin-text/10 rounded-sm px-4 py-2 text-xs font-sans focus:outline-none focus:border-skin-text transition-colors"
          />
          <button type="submit" className="px-4 py-2 bg-skin-text text-white font-sans text-[10px] uppercase tracking-widest font-bold shrink-0 hover:opacity-80 transition-opacity">
            Send
          </button>
        </form>

      </div>
    </>
  );
}
