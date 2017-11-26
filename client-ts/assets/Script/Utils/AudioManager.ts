class AudioManager {
  static instance: AudioManager = null;

  static getPath(path:string):string {
    return cc.url.raw(`resources/${path}`);
  }

  music = null;
  sound = null;

  constructor() {
    if(!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }

    return AudioManager.instance;
  }

  playMusic = (path:string, loop:boolean) => {
    return this.music = cc.audioEngine.play(AudioManager.getPath(path), loop, 10);
  };

  playSound = (path:string, loop:boolean) => {
    return this.sound= cc.audioEngine.play(AudioManager.getPath(path), loop, 10);
  }

  stopMusic = () => {
    cc.audioEngine.stop(this.music);
    this.music = null;
  }

  stopSound = () => {
    cc.audioEngine.stop(this.sound);
    this.sound = null;
  }
}

export default AudioManager;