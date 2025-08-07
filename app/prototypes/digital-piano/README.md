# Digital Piano Prototype

A beautiful, interactive digital piano built with React, TypeScript, and the Web Audio API. This prototype demonstrates real-time audio synthesis, responsive design, and both mouse and keyboard interactions.

## ✨ Features

- **🎹 Interactive Piano Keys**: Click or tap the piano keys to play notes
- **⌨️ Keyboard Support**: Use your computer keyboard as piano keys (A, W, S, E, D, F, T, G, Y, H, U, J)
- **🎵 Real-time Audio**: Built with Web Audio API for low-latency sound synthesis
- **📱 Mobile Responsive**: Touch-friendly design that works on all devices
- **🎨 Beautiful UI**: Realistic piano key design with smooth animations
- **🎪 Visual Feedback**: Keys visually respond when pressed
- **🔊 Sound Envelope**: Natural attack, decay, and release for realistic sound

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- A modern web browser with Web Audio API support

### Setup Instructions

1. **Navigate to the project directory**:
   ```bash
   cd app/prototypes/digital-piano
   ```

2. **Start the development server** (from the project root):
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3001/prototypes/digital-piano
   ```

## 🎮 How to Use

### Mouse/Touch Controls
- Click or tap any piano key to play the corresponding note
- Keys will visually depress and return to show interaction

### Keyboard Controls
The following keys on your computer keyboard correspond to piano notes:

| Keyboard Key | Piano Note |
|--------------|------------|
| A            | C          |
| W            | C#         |
| S            | D          |
| E            | D#         |
| D            | E          |
| F            | F          |
| T            | F#         |
| G            | G          |
| Y            | G#         |
| H            | A          |
| U            | A#         |
| J            | B          |

## 🔧 Technical Details

### Technologies Used
- **React 18** with TypeScript
- **Web Audio API** for sound synthesis
- **CSS Modules** for styling
- **Next.js** framework

### Architecture
- **Real-time Audio Synthesis**: Uses OscillatorNode for generating pure sine wave tones
- **Audio Context Management**: Properly handles browser audio policies and initialization
- **State Management**: React hooks for managing pressed keys and active oscillators
- **Event Handling**: Both keyboard and mouse/touch events with proper cleanup
- **Responsive Design**: Mobile-first CSS with breakpoints for different screen sizes

### Audio Features
- **Frequency Accurate**: Uses standard musical frequencies (A4 = 440Hz)
- **Attack-Decay-Sustain Envelope**: Natural sounding note progression
- **No Audio Overlap**: Prevents multiple instances of the same note playing simultaneously
- **Smooth Release**: Notes fade out naturally when released

## 🎨 Design Highlights

- **Realistic Piano Appearance**: White and black keys with proper proportions
- **3D Visual Effects**: Gradient backgrounds and shadows for depth
- **Smooth Animations**: CSS transitions for key presses and hover effects
- **Modern Color Scheme**: Beautiful gradient background with professional typography
- **Mobile Optimized**: Touch-friendly sizing and responsive layout

## 🛠 Customization Options

You can easily customize this prototype by:

1. **Changing the waveform**: Modify the `oscillator.type` in the `playNote` function
2. **Adjusting frequencies**: Update the `notes` array with different frequencies
3. **Modifying the envelope**: Change the gain ramping in `playNote` and `stopNote`
4. **Adding more octaves**: Extend the `notes` array with additional octaves
5. **Styling changes**: Update the CSS modules for different visual themes

## 🎯 Educational Value

This prototype is perfect for learning:
- Web Audio API fundamentals
- React state management with audio
- Event handling and cleanup
- Responsive design principles
- TypeScript interfaces and types
- CSS modules and modern styling

## 🔍 Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 13.4+)
- **Mobile browsers**: Touch events supported

## 📝 Notes

- The audio context initializes on first user interaction (browser requirement)
- Best experienced with headphones or quality speakers
- Some mobile browsers may have slight audio latency

## 🎉 Potential Enhancements

Ideas for extending this prototype:
- Add multiple octaves
- Implement sustain pedal functionality
- Add different instrument sounds
- Include chord recognition
- Add recording/playback features
- Implement MIDI keyboard support 