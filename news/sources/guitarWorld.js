import NewSource from '../NewSource.js'
class GuitarWorldSource extends NewSource {
  constructor( defaults ) {
    super( defaults )
  }
    getArticles( $ ) {
      const articles = []
      const name = this.name
      const tags = $( '.article-link' )
      tags?.each( function () {
        const title = $( this ).text().replace( /\n|\r/g, '' ).trim()
        const url = $( this ).attr( 'href' )
        articles.push( {
          title, url,
          sourceID: name, proper: this.proper
        } )

      } )
      // console.log(this.name, articles[0])
      this.articles = articles
      return this.articles
    }
  
} 
const GuitarWorld = new GuitarWorldSource( {
  sourceID : 'guitarWorld',
  address : 'http://guitarworld.com',
  proper : 'Guitar World'
})
export default GuitarWorld