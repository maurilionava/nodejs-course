const { log } = require('console')
const url = require('url')

const parsedUrl = new url.URL('https://www.udemy.com/course/nodejs-do-zero-a-maestria-com-diversos-projetos/learn/lecture/28301926#overview')

console.log(parsedUrl)
console.log(parsedUrl.origin)
console.log(parsedUrl.protocol)
console.log(parsedUrl.hash)
console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)