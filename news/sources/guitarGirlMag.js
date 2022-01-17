import NewSource from '../NewSource.js'
class GuitarGirlMagSource extends NewSource{
  constructor(defaults) {
    super(defaults)
  }
   getArticles( $ ) {
      const articles = []
      const name = this.name
      const tags = $( '.entry-title a' )
      tags?.each( function () {
        const title = $( this ).attr( 'title' ).replace( /\n|\r/g, '' ).trim()
        const url = $( this ).attr( 'href' )
        articles.push( {
          title, url,
          sourceID: name,
          proper: this.proper
        } )

      } )
      // console.log(this.name, articles[0])
      this.articles = articles
      return this.articles
    }
}
const GuitarGirlMag = new GuitarGirlMagSource( {
    sourceID : 'guitarGirlMag',
    address : 'http://guitarGirlMag.com',
    proper : 'Guitar Girl Magazine'
})
export default GuitarGirlMag