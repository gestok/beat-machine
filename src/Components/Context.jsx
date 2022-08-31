import { createContext, useEffect, useState } from "react";
import Kick from "../Assets/Kick.wav";
import Snare from "../Assets/Snare.wav";
import Hihat from "../Assets/Closed-Hi-Hat.wav";
import OpenHihat from "../Assets/Open-Hi-Hat.wav";
import Tom from "../Assets/Floor-Tom.wav";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const sampleRate = 44100; // May or may not use this globally as a knob

  const [power, setPower] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [volume, setVolume] = useState(80);
  const [bpm, setBpm] = useState(120);
  const [step, setStep] = useState(16);

  // Calculates each step delay
  const calculateBPM = () => {
    const delay = Math.round((sampleRate * 60) / (bpm * step) / step);
    return delay;
  };
  const [stepDelay, setStepDelay] = useState(calculateBPM());
  const [currentPad, setCurrentPad] = useState(-1); // -1 because we do not want any pads :active before play()

  const [tracks, setTracks] = useState(4);
  const [trackRow, setTrackRow] = useState([
    { id: "Kick", url: Kick },
    { id: "Snare", url: Snare },
    { id: "Closed HiHat", url: Hihat },
    { id: "Open HiHat", url: OpenHihat },
    { id: "Tom", url: Tom },
    { id: "Track", url: "" },
    { id: "Track", url: "" },
    { id: "Track", url: "" },
  ]);

  // Used to store the state of each pad per each track
  const [sequencer, setSequencer] = useState([
    Array(32).fill(0),
    Array(32).fill(0),
    Array(32).fill(0),
    Array(32).fill(0),
    Array(32).fill(0),
    Array(32).fill(0),
    Array(32).fill(0),
    Array(32).fill(0),
  ]);

  // If track size, bpm or step are changed, stop playing and recalculate step delay.
  useEffect(() => {
    setPlaying(false);
    setStepDelay(calculateBPM());
  }, [tracks, step, bpm]);

  // Recalculate currentPad loop if step has changed.
  useEffect(() => {
    if (!playing) {
      setCurrentPad(-1);
      return;
    }
    const lights = setInterval(() => {
      setCurrentPad(currentPad === 31 ? 0 : currentPad + 1);
    }, stepDelay);
    return () => clearInterval(lights);
  }, [playing, currentPad]);

  return (
    <Context.Provider
      value={{
        power,
        setPower,
        volume,
        setVolume,
        bpm,
        setBpm,
        step,
        setStep,
        stepDelay,
        currentPad,
        tracks,
        setTracks,
        playing,
        setPlaying,
        trackRow,
        setTrackRow,
        sequencer,
        setSequencer,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
