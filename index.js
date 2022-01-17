const port = 80
import axios from 'axios'
import cheerio from 'cheerio'
import express from 'express'
import News from './news/index.js'
const app = express()
const NewsSources = Object.values(News)
// console.log('SRCS: ', NewsSources)
var articles = []

async function gatherWebData ( source ) {
  return await axios.get( source.address )
  .then( ( response ) => {
    console.log( `Loading (${source.name}) Data from ${source.address}` )
    const html = response.data
    const $ = cheerio.load( html )
    const src_articles = source.getArticles( $ )
    console.log( 'gather articles: ', src_articles.length )
    return src_articles
  } )
}

//#region routes
app.get( '/', ( _req, res ) => {
  res.json( "Welcome to GuitarHaven" )
} )

app.get( '/news', ( _req, res ) => {
  console.log( 'News: ', res )
  res.json( articles )
} )

app.get( '/news/:sourceId', async ( req, res ) => {
  const sourceId = req.params.sourceId
  const specificArticles = NewsSources.filter( src => src.name === sourceId )
  res.json(specificArticles)
} )
//#endregion routes

for ( const source of NewsSources ) {
    const articles_from_source = await gatherWebData(source)
    articles = [].concat(articles, articles_from_source)
    console.log( "Total articles added: ", articles.length )
}

console.log( '... Finished Loading articles' )
app.listen( port, () => console.log( 'listening on port ' + port ) )


//#region 
  //   axios.get( "http://acousticguitar.com/" )
  //     .then( ( response ) => {
  //       const html = response.data
  //       const $ = cheerio.load( html )

  //       const article_tags = $( 'div.cb-article-meta  a, .cb-post-title a' )
  //       // console.log( article_tags)
  //         article_tags?.each( function () {
  //           const title = $( this ).text()
  //           // console.log( title.includes( 'Acoustic' ), title )
  //           if ( title.includes( 'Acoustic' ) ) {
  //              const url = $( this ).attr( 'href' )
  //           articles.push( {
  //             title, url
  //           } )
  //           }

  //       } )
  //       res.json( articles)
  //     } )
  //     .catch((err) => console.error(err))

//#endregion

