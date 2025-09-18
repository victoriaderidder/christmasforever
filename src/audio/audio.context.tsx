import React, { createContext, useContext, useState } from "react";

interface AudioContextType {
  playingSongs: HTMLAudioElement[];
  setPlayingSongs: React.Dispatch<React.SetStateAction<HTMLAudioElement[]>>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playingSongs, setPlayingSongs] = useState<HTMLAudioElement[]>([]);

  return (
    <AudioContext.Provider value={{ playingSongs, setPlayingSongs }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext not found");
  }
  return context;
};
