const getPath = cc.url.raw;
class AudioManager {
  static instance: AudioManager = null;

  static playMusic = (path, loop) => {
    path = getPath(`resources/${path}`);
  };

  static playSound = () => {
  };

  static playVoice = () => {
  };

  static stopSound = () => {
  };

  static stopMusic = () => {
  };

  static stopAllSounds = () => {

  }
}