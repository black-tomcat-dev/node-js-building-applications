var cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
console.log("test1" , process.env.TIMES);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
console.log('test2', process.env.TIMES);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (request, response) => response.send(cool()))
  .get('/times', function(request, response){
    var result = '';
    var times = process.env.TIMES || 5;
    
    for (var i=0; i < times; i++)
      result += i + ' ';
      response.send(result);
    
  }).listen(PORT, () => console.log(`Listening on ${ PORT }`))
