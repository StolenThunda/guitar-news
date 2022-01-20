require( 'dotenv/config' )
const express = require( 'express' )
const consign = require( 'consign' )

const allPromises = []
const port = process.env.PORT || 5000
const app = express()
app.listen( port, () => console.log( `listening on port ${port}\n` ) )

process.once( 'SIGUSR2', function () {
  process.kill( process.pid, 'SIGUSR2' );
} );

process.on( 'SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill( process.pid, 'SIGINT' );
} );

console.log( '\n****** Loading New Sources ******\n' )
consign()
  .include( 'news' )
  .into( app )
console.log( '\n****** Finished Loading Sources ******\n' )

console.log( 'app', app.news )
// app.news.AllArticles = [] 


async function main () {
  NewsCompilation.sources.forEach( source => {
    allPromises.push(
      NewsCompilation.lib.gatherWebData( source )
        .then( articles => articles )
        .catch( err => console.error( err ) )
    )

  } )


  await Promise.all( allPromises )
    .then( result => {
      result.forEach( res => {
        NewsCompilation.AllArticles = [].concat( NewsCompilation.AllArticles, res )
      } )
    } )
    .catch( e => console.log( e ) )
  console.log( `\n... Finished Loading ${NewsCompilation.AllArticles.length} articles` )


  console.log( `${NewsCompilation.AllArticles.length} articles loaded from ${NewsCompilation.sources.length} source(s)` )
}

const NewsCompilation = app.news
// console.log( NewsCompilation )

//#region routes
// const routes = [
//   { path: '/', name: 'index', desc: 'Index page' },
//   { path: '/news', name: 'news', desc: 'All News' },
//   { path: '/news/:sourceID', name: 'newsBySource', desc: 'News, by source' },
  
// ]
// const getRoute = ( name ) => { return routes.find( ( item ) => { return name === item.name } ) }

app.get( '/', ( _req, res ) => {
  // res.json( "Welcome to GuitarHaven" )
  res.sendFile( `${__dirname}/src/index.html` );
} )

app.get( '/news', ( _req, res ) => {
  res.json( NewsCompilation?.AllArticles )
} )

app.get( '/news/:sourceID', ( req, res ) => {
  if ( !NewsCompilation?.AllArticles ) res.json( NewsCompilation )
  const allArticles = NewsCompilation.AllArticles
  // res.json(allArticles)
  const s_ID = req.params.sourceID
  const specificArticles = allArticles.filter( src => {

    // console.log( `id: ${src} , param: ${s_ID} ` )
    const match = ( src.sourceID.localeCompare( s_ID, "en", { sensitivity: 'base' } ) == 0 )
    return match
  } )
  res.json( specificArticles )
} )

app.get( '/sources', ( _req, res ) => {
  const srcs = NewsCompilation.sources.map( ( {
    proper: name,
    address,
    sourceID
  } ) => ( { name, sourceID, address } )
  )
  res.json( srcs )
} )

app.get( '/sourceIDs', ( _req, res ) => {
  const ids = NewsCompilation.sources.map( ( { sourceID } ) => sourceID )
  console.log( 'trimmed: ', ids[0] )
  res.json( ids )
} )

app.get( '/sourcesWithDetail', ( _req, res ) => {
  res.json( NewsCompilation.sources )
} )

app.get( '/sourcesWithDetail/:sourceID', ( req, res ) => {
  const s_ID = req.params.sourceID
  const sourceDetail = NewsCompilation.sources.filter( src => {
    return ( src.sourceID.localeCompare( s_ID, "en", { sensitivity: 'base' } ) == 0 )
  } )
  res.json( sourceDetail )
} )

app.get( '/_all', ( _req, res ) => {
  res.json( NewsCompilation )
} )
//#endregion routes




main()