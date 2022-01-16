const port = 6969
const express = require( 'express' )
const axios = require( 'axios' )
const cheerio = require( 'cheerio' )
const newssources = require( 'news' )
const app = express()

const articles = []

newssources.forEach( source => {
  app.get( '/news', ( req, res ) => {
    axios.get( source.address )
      .then( ( response ) => {
        const html = response.data
        const $ = cheerio.load( html )
        console.log( `Loading (${source.name}) Data from ${source.address}` )
        const article_tags = $( 'div.cb-article-meta  a, .cb-post-title a' )
        // console.log( article_tags )
        article_tags?.each( function () {
          const title = $( this ).text()
          // console.log( title.includes( 'Acoustic' ), title )
          // if ( title.includes( 'Acoustic' ) ) {
            const url = $( this ).attr( 'href' )
            articles.push( {
              title, url, source: source.name
            } )
          // }

        } )
        res.json( articles )
      } )
      .catch( ( err ) => console.error( err ) )
  } )
})

  app.get( '/', ( req, res ) => {
    res.json( "Welcome to GuitarHaven" )
  } )

  app.get( '/news', ( req, res ) => {
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
  } )

  app.listen( port, () => console.log( 'listening on port ' + port ) )