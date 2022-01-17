function GuitarPlayerSource() {
    this.name = 'guitarPlayer'
    this.address = 'http://guitarPlayer.com'
    this.articles = []
  this.getArticles = ( $ ) => {
    const articles = []
    const name = this.name
    const tags = $( '.article-link' )
    tags?.each( function () {
      const title = $( this ).attr('aria-label').replace( /\n|\r/g, '' ).trim()
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
const GuitarPlayer =  new GuitarPlayerSource()
export default GuitarPlayer