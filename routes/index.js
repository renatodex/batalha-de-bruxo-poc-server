
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
    title: 'Batalha dos Bruxos POC Server',
    version: "2.2" 
  });
};