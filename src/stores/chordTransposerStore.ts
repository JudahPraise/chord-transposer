import { create } from 'zustand';
import ChordTransposer from '@/services/ChordTransposerService';

const useStore = create<{
    chord: string;
    chords: string[];
    getFamilyChords: () => void;
    setChord: (chord: string) => void;
}>((set) => ({
    chord: '',
    chords: [],
    getFamilyChords: () => set((state) => {
        const chordTransposer = new ChordTransposer(state.chord);
        const familyChords = chordTransposer.getFamilyChords();
        return { chords: familyChords };
    }),
    setChord: (chord: string) => set({ chord }),
}));

export default useStore;