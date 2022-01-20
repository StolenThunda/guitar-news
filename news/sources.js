const cheerio = require( "cheerio" )
let $ = cheerio
const NewsSource = class {
  constructor( defaults = {} ) {
    this.sourceID = defaults?.sourceID || 'shortNameForSite'
    this.address = defaults?.address || 'siteURL'
    this.proper = defaults?.proper || 'Proper Name Of Site'
    this.searchTags = defaults?.searchTags || ['a']
    this.title = defaults?.title || 'None'
    this.url = defaults?.url || 'href'
    this.isText = defaults?.isText || false
    this.trim = defaults?.trim || false
    this.articles = []

    return this
  }

  getTags = () => {
    return this.searchTags.join( ', ' )
  }

  getArticles = ( html ) => {
    $ = cheerio.load( html )
    const articles = []
    const titleAttribute = this.title
    const urlAttribute = this.url
    const sourceID = this.sourceID
    const name = this.proper
    const tags = $( this.getTags() )

    tags?.each( function () {
      var title = this.isText ? $(this).text() : $( this ).attr( titleAttribute )
      if ( this.trim ) title.replace( /\n|\r/g, '' ).trim()
      articles.push( {
        title: title,
        url: $( this ).attr( urlAttribute ),
        sourceID,
        name
      } )
    } )
    // console.log(this.name, articles[0])
    this.articles = articles
    return this.articles
  }
}

module.exports = () => {

  const cfgs = [
    {
      sourceID: 'guitar_com',
      proper: 'Guitar.com',
      address: 'http://guitar.com',
      searchTags: ['[rel=bookmark]'],
      title: 'title',
    },
    {
      sourceID: 'guitarPlayer',
      address: 'http://guitarPlayer.com',
      proper: 'Guitar Player',
      searchTags: ['.article-link'],
      title: 'aria-label'
    },
    {
      sourceID: 'acousticGuitar',
      proper: 'Acoustic Guitar',
      address: 'http://acousticguitar.com',
      searchTags: ['div.cb-article-meta  a, .cb-post-title a'],
      trim: true,
      isText: true,
    },
    {
      sourceID: 'guitarGirlMag',
      address: 'http://guitarGirlMag.com',
      proper: 'Guitar Girl Magazine',
      searchTags: ['.entry-title a'],
      title: 'title'
    },{
      sourceID : 'guitarWorld',
      address : 'http://guitarworld.com',
      proper: 'Guitar World',
      searchTags: ['.article-link'],
      trim: true,
      isText: true,
    }
  ]
  return cfgs.map( ( cfg ) => new NewsSource( cfg ) )
}