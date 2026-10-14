/**
 * The parts of the YouTube IFrame Player API (https://www.youtube.com/iframe_api) the app
 * uses – typed by hand instead of pulling in a full type package for five methods.
 */
export interface YTPlayer {
  mute(): void;
  unMute(): void;
  playVideo(): void;
  /** Seconds since the start of the video. */
  getCurrentTime(): number;
  destroy(): void;
}

export interface YTPlayerEvent {
  target: YTPlayer;
}

export interface YTStateChangeEvent extends YTPlayerEvent {
  /** One of `YT.PlayerState`. */
  data: number;
}

export interface YTNamespace {
  Player: new (
    elementId: string,
    options: {
      events?: {
        onReady?: (event: YTPlayerEvent) => void;
        onStateChange?: (event: YTStateChangeEvent) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { UNSTARTED: -1; ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 };
}
