import React, { useState } from 'react';
import useStore from '@/stores/chordTransposerStore';

export default function Home() {
  const { chord, chords, getFamilyChords, setChord } = useStore();
  const [inputValue, setInputValue] = useState('');

  React.useEffect(() => {
    if (chord) {
      getFamilyChords();
    }
  }, [chord, getFamilyChords]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTranspose = () => {
    setChord(inputValue);
  };

  const indexToRoman = (index: number): string => {
    const romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
    return romanNumerals[index % romanNumerals.length];
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      {/* Card Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        {/* Title */}
        <h1 className="text-black text-xl font-bold mb-4 text-center">
          Family Chords Transposer
        </h1>

        {/* Input Field */}
        <div className="mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTranspose();
            }}
          >
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter chord e.g., G"
                className="w-full p-3 text-black border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                id="transposeButton"
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
              >
                Transpose
              </button>
            </div>
          </form>
        </div>
        
        {/* Result Box */}
        <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
          <label className="block text-gray-700 font-semibold mb-2">
            Family Chords:
          </label>
          <div className="grid grid-cols-7">
            {chords.length > 0 ? (
              chords.map((chord, index) => (
                <div
                  key={index}
                  className="text-md text-center font-bold text-black bg-white"
                >
                  <div className="border border-gray-500 p-3">{chord}</div>
                  <div className="border border-gray-500 p-3">{indexToRoman(index)}</div>
                </div>
              ))
            ) : (
              <div className="col-span-7 text-gray-600">
              Your result will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
