const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'fcamara'
});

app.use(function (req, res, next) {

    // Website que você deseja permitir conectar
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Solicitar métodos que você deseja permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Solicitar cabeçalhos que você deseja permitir
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Passa para o proximo estagio
    next();
});

// endereço para receber os dados
app.get('/get', (req, res) => {
      connection.query("Select nm_autor, nm_titulo, ds_publicacao from publicacao ORDER BY dt_publicacao DESC;", function (error, results, fields){
              if(error) res.send('error');
              else res.json(results);
      });
});

// endereço para enviar dados
app.post('/post', (req, res) => {
  var dt = new Date();
  var datetime = dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
  let query = "INSERT INTO publicacao (nm_autor, nm_titulo, ds_publicacao, dt_publicacao) VALUES ('" + req.body['nm_autor'] + "','" + req.body['nm_titulo'] + "','" + req.body['ds_publicacao'] + "','" + datetime + "');";
  connection.query(query, function (error, results, fields){
          if(error) res.send('error');
          else res.send('true');
  });
});

// endereço para receber buscas
app.post('/search', (req, res) => {
  let query = "SELECT nm_autor, nm_titulo, ds_publicacao FROM publicacao WHERE nm_autor LIKE '%" + req.body['nm_autor'] + "%' ORDER BY dt_publicacao DESC;";
  connection.query(query, function (error, results, fields){
          if(error) res.send('error');
          else res.json(results);
  });
});

// página default
app.get('/', (req, res) => {
  var dt = new Date();
  var year = dt.getFullYear();
  var month = dt.getMonth();
  var day  = dt.getDate();
  res.send('<h1>Service On</h1><h2>' + year + ' ' + month + ' ' + day + '</h2>');
});

// Ação após o servidor ligar
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('To shutdown the server: ctrl + c')
});
