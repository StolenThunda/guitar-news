// import NewsSourceInterface from '../SourceInterface.js'
// import NewsSourceInterface from '../SourceInterface.js'
function AcousticGuitarSource() {
  this.name = 'acousticGuitar'
  this.proper = 'Acoustic Guitar'
    this.address = 'http://acousticguitar.com'
    // this.articles = []
  this.getArticles = ( $ ) => {
    const articles = []
    const name = this.name
      const tags = $( 'div.cb-article-meta  a, .cb-post-title a' )
      tags?.each( function () {
        const title = $( this ).text()
        // console.log( title.includes( 'Acoustic' ), title )
        // if ( title.includes( 'Acoustic' ) ) {
        const url = $( this ).attr( 'href' )
        articles.push( {
          title, url, sourceID: name, proper: this.proper
        } )
        
      } )
      this.articles = articles
      return this.articles
    }
}
const AcousticGuitar =  new AcousticGuitarSource()
export default AcousticGuitar