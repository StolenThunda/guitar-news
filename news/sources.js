const cheerio = require( "cheerio" )
let $ = cheerio

/**
 * NewsSource is a class to contain the common functionality of the source scraping process
 * @param {*} defaults Object of init vars
 * @returns NewsSource 
 */
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
  /**
   *  Generate a string from array of searchTags
   * @returns String of css selectors
   */
  getTags = () => {
    return this.searchTags.join( ', ' )
  }

  /**
   *  Uses an html fragment to search for tags and attributes to build the article object
   * @param {HTMLBaseElement} html The html from the source url
   * @returns {Array} instance collection of articles
   */
  getArticles = ( html ) => {
    $ = cheerio.load( html )
    const articles = []
    const titleAttribute = this.title
    const urlAttribute = this.url
    const sourceID = this.sourceID
    const name = this.proper
    const tags = $( this.getTags() )

    tags?.each( function () {
      // is the title information contained in the text property
      var title = this.isText ? $(this).text() : $( this ).attr( titleAttribute )
      // some 'titles' require removal of undesirable chars
      if ( this.trim ) title.replace( /\n|\r/g, '' ).trim()
      articles.push( {
        title: title,
        url: $( this ).attr( urlAttribute ),
        sourceID,
        name
      } )
    } )

    // remove duplicates
    const jsonObjec = articles.map( JSON.stringify ) // turn array of objects into string
    // console.log( jsonObjec )
    const uniSet = new Set( jsonObjec ) // creates unique set
    
    this.articles = Array.from(uniSet).map(JSON.parse ) // creates an array from set
    return this.articles
  }
}

module.exports = () => {
/**
 * loads source configurations 
 * @returns {Array} NewsSource objects
 */
  const cfgs = require('./configs.json')
  return cfgs.map( ( cfg ) => new NewsSource( cfg ) )
}