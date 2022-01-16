// import NewsSourceInterface from '../SourceInterface.js'

class AcousticGuitar {
  constructor() {
    this.name = 'acousticGuitar'
    this.address = 'http://acousticguitar.com'
    this.articles = []
  }
  getArticles ( html ) {
    return this.articles
  }
}

const i = new AcousticGuitar()