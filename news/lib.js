const axios = require( "axios" )
const cheerio = require( "cheerio" )

/**
 *  Uses source's address to get html to scrape. Then scrapes for data using source instance 'getArticles' function
 * @param {NewSource} source Object representing specific news source
 * @returns {Array} articles
 */
 const gatherWebData = function ( source ) {
  try {
    return axios.get( source.address )
      .then( ( response ) => {
        console.log( `Loading (${source.proper}) Data from ${source.address}` )
        const html = response.data
        try {
          const src_articles = source.getArticles( html )
          console.log( 'gather articles: ', src_articles.length )
          return src_articles
        } catch ( e ) { console.log( e ) }
      } )
  } catch ( e ) { console.log( e ) }
}

module.exports = {gatherWebData}