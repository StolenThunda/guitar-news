import NewSource from "../NewSource.js";
class AcousticGuitarSource extends NewSource {
  constructor( defaults ) {
    super( defaults )
  }
  getArticles( $ )  {
      const articles = []
      const sourceID = this.sourceID
      const name = this.proper
      const tags = $( 'div.cb-article-meta  a, .cb-post-title a' )
      tags?.each( function () {
        const title = $( this ).text()
        // console.log( title.includes( 'Acoustic' ), title )
        // if ( title.includes( 'Acoustic' ) ) {
        const url = $( this ).attr( 'href' )
        articles.push( {
          title, url, sourceID, name
        } )

      } )
      this.articles = articles
      return this.articles
    }
  
}


const AcousticGuitar = new AcousticGuitarSource( {
  sourceID: 'acousticGuitar',
  proper: 'Acoustic Guitar',
  address: 'http://acousticguitar.com'
})
export default AcousticGuitar