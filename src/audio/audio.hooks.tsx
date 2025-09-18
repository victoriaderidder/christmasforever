import { useCallback, useRef, useState } from "react";
import { AudioProps } from "../audio/audio.types";
import { useAudioContext } from "./audio.context";

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

  const { playingSongs, setPlayingSongs } = useAudioContext();

  const playSong = useCallback(
    async (song: HTMLAudioElement, previousSong?: HTMLAudioElement) => {
      try {
        if (previousSong) {
          previousSong.pause();
          previousSong.currentTime = 0;
          setPlayingSongs((current) =>
            current.filter((s) => s !== previousSong)
          );
        }

        await song.play();
        song.loop = true;

        setPlayingSongs((current) => {
          console.log("Current playing songs:", current);
          console.log("Adding song:", song.src);
          return [...current, song];
        });

        console.log("Updated playing songs:", playingSongs);
      } catch (error) {
        console.error("Error playing song:", error);
      }
    },
    []
  );

  const asyncPlaySong = async (
    song: HTMLAudioElement,
    previousSong?: HTMLAudioElement
  ) => {
    if (previousSong) {
      previousSong.pause();
      previousSong.currentTime = 0;
      setPlayingSongs((current) => current.filter((s) => s !== previousSong));
    }
    song.play();
    song.loop = true;
    setPlayingSongs([...playingSongs, song]);
  };

  const stopAllAudio = async () => {
    console.log(playingSongs, "STOP THAT!");
    try {
      await Promise.all(
        playingSongs.map(async (audio) => {
          try {
            console.log("Stopping ", audio.src);
            audio.pause();
            audio.currentTime = 0;
            setPlayingSongs([]);
          } catch (err) {
            console.error("Failed to stop audio ", audio.src, err);
          }
        })
      );
    } catch (error) {
      console.error("Error in stopAllAudio: ", error);
    }
  };

  return { audioRefs, playSong, stopAllAudio };
};
