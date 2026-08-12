import { useState } from 'react';
import { PenSquare, Send } from 'lucide-react';
import { NeonButton } from './NeonButton';

export function RelationshipPrompt() {
  const [entry, setEntry] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-white/5 pb-4">
        <PenSquare size={18} className="text-coral" />
        <h3 className="font-serif text-xl text-white tracking-widest">Shared Diary</h3>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-300 italic">
          "What was the first song that made you think of us?"
        </p>

        <div className="relative">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Type your memory here..."
            className="w-full bg-surface-2/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-muted/40 focus:outline-none focus:border-coral transition-colors resize-none min-h-[120px]"
          />
          <div className="absolute bottom-3 right-3">
            <NeonButton variant="secondary" className="!px-3 !py-2 !rounded-lg text-xs gap-1">
              Save <Send size={12} />
            </NeonButton>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-muted">Previous Entries</div>
          
          <div className="bg-surface-2/30 rounded-xl p-4 space-y-2 border border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-coral font-medium">P1</span>
              <span className="text-muted/60">Oct 24</span>
            </div>
            <p className="text-sm text-gray-300">
              Definitely that late night drive playing Beach House. The whole city felt empty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
