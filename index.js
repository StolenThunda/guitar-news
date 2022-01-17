import 'dotenv/config'
import express from 'express'
import News from './news/index.js'
import path from "path"

const __dirname = path.resolve();
const port = process.env.PORT || 5000
const app = express()
const NewsSources = News.NewsSources

// console.log('SRCS: ', NewsSources)
var articles = []

//#region routes
app.get( '/', ( _req, res ) => {
  // res.json( "Welcome to GuitarHaven" )
  res.sendFile(__dirname + '/index.html');
} )

app.get( '/sources', ( _req, res ) => {
  const srcs = NewsSources.map( ( { proper, address, sourceID } ) => { return { name: proper,sourceID,  address } })
  console.log( 'trimmed: ', srcs[0] )
  res.json( srcs)
} )

app.get( '/sourceIDs', ( _req, res ) => {
  const ids = NewsSources.map( ( {sourceID } ) => sourceID)
  console.log( 'trimmed: ', ids[0] )
  res.json( ids)
} )

app.get( '/news', ( _req, res ) => {
  console.log( 'News: ', res )
  res.json( articles )
} )

app.get( '/news/:sourceID', async ( req, res ) => {
  const sourceID = req.params.sourceID
  const specificArticles = NewsSources.filter( src => src.sourceID.toLowerCase() === sourceID.toLowerCase() )
  res.json(specificArticles)
} )
//#endregion routes

for ( const source of News.NewsSources ) {
    const articles_from_source = await News.gatherWebData(source)
    articles = [].concat(articles, articles_from_source)
    console.log( "Total articles added: ", articles.length )
}

console.log( '... Finished Loading articles' )
app.listen( port, () => console.log( 'listening on port ' + port ) )
