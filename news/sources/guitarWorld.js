function GuitarWorldSource() {
    this.name = 'guitarWorld'
  this.address = 'http://guitarworld.com'
  this.proper = 'Guitar World'
    this.articles = []
  this.getArticles = ( $ ) => {
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
const GuitarWorld =  new GuitarWorldSource()
export default GuitarWorld