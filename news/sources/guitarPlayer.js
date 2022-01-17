import NewSource from '../NewSource.js'

class GuitarPlayerSource extends NewSource {
  constructor( defaults ) {
    super( defaults )
  }
  
  getArticles ( $ ) {
  const articles = []
    const sourceID = this.sourceID
    const name = this.proper
    const tags = $( '.article-link' )
    tags?.each( function () {
      const title = $( this ).attr( 'aria-label' ).replace( /\n|\r/g, '' ).trim()
      const url = $( this ).attr( 'href' )
      articles.push( {
        title, url,
          sourceID, name
        } )

      } )
    // console.log(this.name, articles[0])
    this.articles = articles
    return this.articles
  }

}
const GuitarPlayer = new GuitarPlayerSource( {
  sourceID: 'guitarPlayer',
  address: 'http://guitarPlayer.com',
  proper: 'Guitar Player'
} )
export default GuitarPlayer