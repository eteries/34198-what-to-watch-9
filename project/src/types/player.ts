import { MutableRefObject } from 'react';

export type Player = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  getCurrentProgress: () => number;
  getTimeLeft: () => number | null;
  getIsLoading: () => boolean;
  getIsPlaying: () => boolean;
}
