import { useRef } from "react";
import { AudioProps } from "../audio/audio.types";

export const useAudio = (audioSources: Record<keyof AudioProps, string>) => {
  const audioRefs = {
    krampus: useRef(new Audio(audioSources.krampus)),
    angels: useRef(new Audio(audioSources.angels)),
    finale: useRef(new Audio(audioSources.finale)),
    silentNight: useRef(new Audio(audioSources.silentNight)),
    lastChristmas: useRef(new Audio(audioSources.lastChristmas)),
    jbr: useRef(new Audio(audioSources.jbr)),
    circus: useRef(new Audio(audioSources.circus)),
    chipmunk: useRef(new Audio(audioSources.chipmunk)),
    jazz: useRef(new Audio(audioSources.jazz)),
    rockin: useRef(new Audio(audioSources.rockin)),
    santaBaby: useRef(new Audio(audioSources.santaBaby)),
    whiteChristmas: useRef(new Audio(audioSources.whiteChristmas)),
  };

  const playSong = (
    song: HTMLAudioElement,
    previousSong?: HTMLAudioElement
  ) => {
    if (previousSong) {
      previousSong.pause();
      previousSong.currentTime = 0;
    }
    song.play();
    song.loop = true;
  };

  return { audioRefs, playSong };
};
