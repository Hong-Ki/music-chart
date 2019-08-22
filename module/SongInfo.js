const defaultInfo = {
  rank: -1,
  title: '',
  artist: '',
};

const stringReplace = (text, replaceTexts = []) => {
  let result = text;
  let start = 0;
  let end = result.length;
  /* get Start point */
  for (let i = 0; i < result.length; i++) {
    if (!replaceTexts.includes(result.charAt(i))) {
      start = i;
      break;
    }
  }
  /* get End point */
  for (let i = result.length - 1; i >= 0; i--) {
    if (!replaceTexts.includes(result.charAt(i))) {
      end = i;
      break;
    }
  }

  return result.substr(start, end);
};

class SongInfo {
  constructor(rank, title, artist, replaceKeys = []) {
    this.rank = rank || defaultInfo.rank;
    this.title = title || defaultInfo.title;
    this.artist = artist || defaultInfo.artist;
    for (let key of replaceKeys) {
      this[key] = stringReplace(this[key], [' ', '\n']) || this[key];
    }
    this.rank = Number(rank);
  }

  toString() {
    return `rank : ${this.rank}, title : ${this.title}, artist: ${this.artist}`;
  }

  get() {
    return {
      rank: this.rank,
      title: this.title,
      artist: this.artist,
    };
  }
}

module.exports = SongInfo;
