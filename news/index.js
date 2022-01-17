import * as NewsCompilation from "./sources/index.js";
import axios from 'axios'
import cheerio from 'cheerio'

let News = NewsCompilation.default

News.NewsSources = Object.values( News )
News.gatherWebData = async ( source ) => {
  return await axios.get( source.address )
  .then( ( response ) => {
    console.log( `Loading (${source.proper}) Data from ${source.address}` )
    const html = response.data
    const $ = cheerio.load( html )
    const src_articles = source.getArticles( $ )
    console.log( 'gather articles: ', src_articles.length )
    return src_articles
  } )
}
// console.log('News',News)
export default News