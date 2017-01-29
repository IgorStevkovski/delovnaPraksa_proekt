var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Log = require('log'),
	log = new Log('debug')

var port = process.env.PORT || 3000;
//http.listen(port);

app.use(express.static(__dirname + "/public"));

app.get('/',function(req, res){
	res.redirect('index.html');
});

io.on('connection', function(socket){

	//serverot prima stream(sliki) od socket klientot i preprakja na drugite socket klienti
	socket.on('stream', function(image){
		socket.broadcast.emit('stream', image);
	});

	//serverot prima slika/screenshot od socket klientot i preprakja na drugite socket klienti
	//Ova ne treba, raboti i so gornoto samo posto SERVEROT PRIMA PODATOCI OD EDEN KLIENT I PRAKA
	//NA SITE DRUGI, TIE AKO NE SE UKLUCENI NISTO, SVE OK, A I DA GI PRIMAAT PODATOCITE
	//AKO NE GI PRIKAZUVAAT NEGDE PAK SVE OK, BITNO ON PRATIL U SLUCAJOV NA SITE
	socket.on('screenshot', function(image){
		socket.broadcast.emit('screenshot', image)
	});
});

http.listen(port, function(){
	log.info('Serverot slusa na porta %s', port);
});
