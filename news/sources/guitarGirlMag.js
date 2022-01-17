function GuitarGirlMagSource() {
    this.name = 'guitarGirlMag'
    this.address = 'http://guitarGirlMag.com'
    this.articles = []
  this.getArticles = ( $ ) => {
    const articles = []
    const name = this.name
    const tags = $( '.entry-title a' )
    tags?.each( function () {
      const title = $( this ).attr('title').replace( /\n|\r/g, '' ).trim()
      const url = $( this ).attr( 'href' )
        articles.push( {
          title, url,
          source: name
        } )
        
    } )
    // console.log(this.name, articles[0])
      this.articles = articles
      return this.articles
    }
}
const GuitarGirlMag =  new GuitarGirlMagSource()
export default GuitarGirlMag