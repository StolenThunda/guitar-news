const axios = require( "axios" )
const cheerio = require( "cheerio" )
 const gatherWebData = function ( source ) {
  try {
    return axios.get( source.address )
      .then( ( response ) => {
        console.log( `Loading (${source.proper}) Data from ${source.address}` )

        const html = response.data
        // const $ = cheerio.load( html )
        try {

          const src_articles = source.getArticles( html )
          console.log( 'gather articles: ', src_articles.length )
          return src_articles
        } catch ( e ) { console.log( e ) }
      } )
  } catch ( e ) { console.log( e ) }
}

module.exports = {gatherWebData}