var express = require('express');
var app = express();
var pug = require("pug");
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/assets"));
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './build/pages');

//require('css/materialize.css');
//window.jQuery = require('jquery');
//window.$ = require('jquery');
//require('js/materialize.js');
//require('materialize-css/js/init.js');

app.get("/", function(req, res) { //diese funktion nennt sich callback

    var data = { signIn: null };
    res.render('index', { data: data });
    // var compileFunction = pug.compileFile('./pages/index.pug');
    // var html = compileFunction(data);
    // res.send(html); //der ganze backend scheiß

});

app.get("/signin", function(req, res) {
    var data = { signIn: 0 };
    res.render('index', { data: data });
});

// app.get("/register", function(req, res){
// 	var data = {signIn: 1};
// 	res.render(__dirname+'/pages/index', {data:data});
//
// 	var compileFunction = pug.compileFile('./pages/index.pug');
// 	var data = {name: "Ina Asra Shofa"};
// 	var html = compileFunction(data);
// 	res.send(html); //backend&co
//
// });

app.get("/findcompany", function(req, res) {
    /*var data = {
		message:'Hello world',
		lists : [ "Company Name", "Company Field", "Company Age", "Foundet", "Area"],
		urls : './FindCompanyPage.pug'
	}

    p #{data.message}
        each list in data.lists
            p  #{list}
            p
              input(type ='text')
              if (list=="Company Name")
	res.render(__dirname+'/pages/FindCompany', {data:data});*/
    // var html = pug.renderFile('./pages/FindCompany.pug');
    // res.send(html);
    res.render('FindCompany', {});

});

app.post('/search', function(req, res) {

    var company_name = req.body.name;
    var company_age = req.body.age;

    res.redirect('http://www.google.com/search?q=' + company_name + '+' + company_age);
});

/*var html = pug.renderFile('./template/FindCompanyPage.pug');
res.send(html);*/

app.get("/findpeople", function(req, res) {
    res.render(__dirname + '/pages/FindPeople.pug')
});

app.get("/findrandom", function(req, res) {
    res.render(__dirname + '/pages/FindRandom', {});
});

/*als beispiel für res.send '<strong style="color: red">Hello World!</strong>'*/

app.get("/contactus", function(req, res) {
    var html = pug.renderFile('./pages/contactus.pug')
    res.send(html)
});

app.get("/faqs", function(req, res) {
    var html = pug.renderFile('./pages/faqs.pug')
    res.send(html)
});

app.get("/profile", function(req, res) {
    var html = pug.renderFile('./pages/profile.pug');
    res.send(html);
});


app.get("/impressum", function(req, res) {
    var html = pug.renderFile('./pages/impressum.pug');
    res.send(html);
});

app.get("/register", function(req, res) {
    var html = pug.renderFile('./pages/register.pug');
    res.send(html);
});

app.get("/calendar", function(req, res) {
    var html = pug.renderFile('./pages/calendar.pug');
    res.send(html);
});

app.listen(3000, function() {
    console.log('Your app listening on port 3000!');
});

// comment, yo