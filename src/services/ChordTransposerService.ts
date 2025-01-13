export default class ChordTransposer {
    
    protected chromaticScale: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    private majorScaleIntervals: number[] = [2, 2, 1, 2, 2, 2, 1];
    private chordQualities: string[] = ['Major', 'Minor', 'Minor', 'Major', 'Major', 'Minor', 'Diminished'];

    protected chordName: string;

    constructor(chordName: string) {
        this.chordName = chordName.charAt(0).toUpperCase() + chordName.slice(1);
    }

    private getChordRootIndex(): number {
        const root: number = this.chromaticScale.indexOf(this.chordName);

        if (root === -1) {
        throw new Error(`Invalid root note: ${this.chordName}`);
        }

        return root;
    }


    private generateMajorScale(): string[] {
        const scale: string[] = [];
        let currentIndex = this.getChordRootIndex();

        for (let interval of this.majorScaleIntervals) {
            scale.push(this.chromaticScale[currentIndex % this.chromaticScale.length]);
            currentIndex += interval;
        }

        return scale;
    }

    public getFamilyChords(): string[] {
        const scale = this.generateMajorScale();
        const familyChords = scale.map((note, index) => {
            const quality = this.chordQualities[index];
            return quality === 'Diminished' ? `${note}dim` : `${note}${quality === 'Minor' ? 'm' : ''}`;
        });

        return familyChords;
    }

}