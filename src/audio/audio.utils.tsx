import { useCallback } from "react";

// export class AudioHandler {
//   private static createAudio(src: string): HTMLAudioElement {
//     const audio = new Audio(src);
//     audio.loop = true;
//     return audio;
//   }

//   static playSong(song: HTMLAudioElement, previousSong?: HTMLAudioElement) {
//     if (previousSong) {
//       previousSong.pause();
//       previousSong.currentTime = 0;
//     }
//     song.play();
//   }
// }

export const AUDIO_PATHS = {
  krampus: require("../assets/music/krampus.mp3"),
  angels: require("../assets/music/angelswehaveheardonhigh.mp3"),
  finale: require("../assets/music/deckthehalls.mp3"),
  silentNight: require("../assets/music/silentnight.mp3"),
  lastChristmas: require("../assets/music/lastchristmas.mp3"),
  jbr: require("../assets/music/jinglebellrock.mp3"),
  circus: require("../assets/music/circus.mp3"),
  chipmunk: require("../assets/music/chipmunksong.mp3"),
  jazz: require("../assets/music/jazz.mp3"),
  rockin: require("../assets/music/rockinaroundthechristmastree.mp3"),
  santaBaby: require("../assets/music/santababy.mp3"),
  whiteChristmas: require("../assets/music/whitechristmas.mp3"),
};
