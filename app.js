require( 'dotenv/config' )
const express = require( 'express' ) // server
const consign = require( 'consign' ) // Autoload your scripts! https://www.npmjs.com/package/consign


const allPromises = []

const app = express()
// app.listen( port, () => global.console.log( `listening on port ${port}\n` ) )

process.once( 'SIGUSR2', function () {
  process.kill( process.pid, 'SIGUSR2' );
} );

process.on( 'SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill( process.pid, 'SIGINT' );
} );

global.console.log( '\n****** Loading New Sources ******\n' );
consign()
  .include( 'news' )
  .into( app )
global.console.log( '\n****** Finished Loading Sources ******\n' );

// global.console.log( 'app', app.news )

/**
 * Gathers all data from news sources
 */
async function loadSources (strSearch) {
  // gather all web request promises 
  NewsCompilation.sources.forEach( source => {
    source.s
    allPromises.push(
      NewsCompilation.lib.gatherWebData( source )
        .then( articles => articles )
        .catch( err => console.error( err ) )
    )

  } )

  // Resolve all promises and retrieve the results
  await Promise.all( allPromises )
    .then( result => {
      result.forEach( res => {
        NewsCompilation.AllArticles = [].concat( NewsCompilation.AllArticles, res )
      } )
    } )
    .then( () => {
      // log results
      global.console.log( `\n... Finished Loading ${NewsCompilation.AllArticles.length} articles` );
      global.console.log( `${NewsCompilation.AllArticles.length} articles loaded from ${NewsCompilation.sources.length} source(s)` );
      global.console.log( `Listening on port: http://localhost:${process.env.PORT || 5000}` );
    } )
    .catch( e => global.console.log( e ) )


}

const NewsCompilation = app.news
/**
 * Index page
 */
app.get( '/', ( _req, res ) => {
  // res.json( "Welcome to GuitarHaven" )
  res.sendFile( `${__dirname}/src/index.html` );
} )

/**
 *  list all articles
 */
app.get( '/news', ( _req, res ) => {
  res.json( NewsCompilation?.AllArticles )
} )

/**
 * list all articles from {sourceID}
 * @param {String} sourceID
 */
app.get( '/news/:sourceID', ( req, res ) => {
  if ( !NewsCompilation?.AllArticles ) res.json( NewsCompilation )
  const allArticles = NewsCompilation.AllArticles
  // res.json(allArticles)
  const s_ID = req.params.sourceID
  const specificArticles = allArticles.filter( src => {

    // global.console.log( `id: ${src} , param: ${s_ID} ` )
    const match = ( src.sourceID.localeCompare( s_ID, "en", { sensitivity: 'base' } ) == 0 )
    return match
  } )
  res.json( specificArticles )
} )

/**
 * list all new sources with limited properties
 */
app.get( '/sources', ( _req, res ) => {
  const srcs = NewsCompilation.sources.map( ( {
    proper: name,
    address,
    sourceID
  } ) => ( { name, sourceID, address } )
  )
  res.json( srcs )
} )

/**
 * Get all source IDs
 */
app.get( '/sourceIDs', ( _req, res ) => {
  const ids = NewsCompilation.sources.map( ( { sourceID } ) => sourceID )
  res.json( ids )
} )

/**
 * Get all sources with articles and more meta data
 */
app.get( '/sourcesWithDetail', ( _req, res ) => {
  res.json( NewsCompilation.sources )
} )

/**
 * Get one source with articles and trimmed metadata by {sourceID}
 * @param {String} sourceID
 */
app.get( '/sourcesWithDetail/:sourceID', ( req, res ) => {
  const s_ID = req.params.sourceID
  const sourceDetail = NewsCompilation.sources.filter( src => {
    return ( src.sourceID.localeCompare( s_ID, "en", { sensitivity: 'base' } ) == 0 )
  } )

  // trim some meta data
  const trimmedSources = sourceDetail.map( ( {
    proper: name,
    address,
    sourceID,
    articles,
    searchTags, url, title
  } ) => ( {
    sourceID,
    name,
    address,
    searchTags, url, title,
    articles
  } ) )
  res.json( trimmedSources )
} )

/**
 *  Internal method for debugging to view current state of NewsCompilation object
 */
app.get( '/_all', ( _req, res ) => {
  res.json( NewsCompilation )
} )

app.get( '/api', ( req, res ) => {
  const routes = []
  app._router.stack.forEach( ( r ) => {
    const objRoute = {}
    if ( r?.route?.path ) {
      objRoute['path'] = r.route.path
      if ( r?.keys.length ) objRoute['params'] = r.keys
      routes.push( objRoute )
    }
  } )
  res.json( routes )
  // res.json(app._router.stack)
} )
//#endregion routes

loadSources()
module.exports = app;