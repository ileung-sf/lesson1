'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

interface Note {
  note: string;
  frequency: number;
  isSharp: boolean;
}

// Piano notes with their frequencies (4th octave)
const notes: Note[] = [
  { note: 'C', frequency: 261.63, isSharp: false },
  { note: 'C#', frequency: 277.18, isSharp: true },
  { note: 'D', frequency: 293.66, isSharp: false },
  { note: 'D#', frequency: 311.13, isSharp: true },
  { note: 'E', frequency: 329.63, isSharp: false },
  { note: 'F', frequency: 349.23, isSharp: false },
  { note: 'F#', frequency: 369.99, isSharp: true },
  { note: 'G', frequency: 392.00, isSharp: false },
  { note: 'G#', frequency: 415.30, isSharp: true },
  { note: 'A', frequency: 440.00, isSharp: false },
  { note: 'A#', frequency: 466.16, isSharp: true },
  { note: 'B', frequency: 493.88, isSharp: false },
];

// Keyboard mappings
const keyMap: { [key: string]: string } = {
  'a': 'C',
  'w': 'C#',
  's': 'D',
  'e': 'D#',
  'd': 'E',
  'f': 'F',
  't': 'F#',
  'g': 'G',
  'y': 'G#',
  'h': 'A',
  'u': 'A#',
  'j': 'B',
};

export default function DigitalPiano() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [activeOscillators, setActiveOscillators] = useState<Map<string, OscillatorNode>>(new Map());

  // Initialize Audio Context
  useEffect(() => {
    const initAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      }
    };

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [audioContext]);

  // Play a note
  const playNote = useCallback((frequency: number, noteName: string) => {
    if (!audioContext || pressedKeys.has(noteName)) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';

    // Envelope (attack, decay, sustain)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);

    setPressedKeys(prev => new Set(prev).add(noteName));
    setActiveOscillators(prev => new Map(prev).set(noteName, oscillator));
  }, [audioContext, pressedKeys]);

  // Stop a note
  const stopNote = useCallback((noteName: string) => {
    const oscillator = activeOscillators.get(noteName);
    if (oscillator && audioContext) {
      const gainNode = oscillator.context.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Release envelope
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      
      oscillator.stop(audioContext.currentTime + 0.3);
    }

    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(noteName);
      return newSet;
    });

    setActiveOscillators(prev => {
      const newMap = new Map(prev);
      newMap.delete(noteName);
      return newMap;
    });
  }, [activeOscillators, audioContext]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const noteName = keyMap[key];
      if (noteName && !event.repeat) {
        const note = notes.find(n => n.note === noteName);
        if (note) {
          playNote(note.frequency, noteName);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const noteName = keyMap[key];
      if (noteName) {
        stopNote(noteName);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playNote, stopNote]);

  // Mouse event handlers
  const handleMouseDown = (note: Note) => {
    playNote(note.frequency, note.note);
  };

  const handleMouseUp = (note: Note) => {
    stopNote(note.note);
  };

  const handleMouseLeave = (note: Note) => {
    stopNote(note.note);
  };

  return (
    <div className={styles.container}>
      <div className={styles.piano}>
        <div className={styles.keys}>
          {notes.map((note) => (
            <button
              key={note.note}
              className={`${styles.key} ${
                note.isSharp ? styles.sharpKey : styles.naturalKey
              } ${pressedKeys.has(note.note) ? styles.pressed : ''}`}
              onMouseDown={() => handleMouseDown(note)}
              onMouseUp={() => handleMouseUp(note)}
              onMouseLeave={() => handleMouseLeave(note)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleMouseDown(note);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleMouseUp(note);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 