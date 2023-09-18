window.onload = function(){
	load();
}

var serviceuri = [{nume: "Sunrise Motors", 
	adresa: "123 Chestnut Street", telefon: "3227930090"},
	{nume: "Express Auto Repair", adresa: "456 Broadway", 
	telefon: "2643560437"}, {nume: "Best Choice Automotive",
	adresa: "1010 Las Vegas Boulevard", telefon: "4477781523"}];

var comenzi;
var nr_comenzi;
var recenzii;

var cul = ["red", "green", "blue", "orange", "magenta"];

function load(){
	var ftd = document.getElementsByTagName("footer");
	ftd = ftd[0];
	console.log(ftd);
	ftd.style.backgroundColor = cul[Math.floor(Math.random() * 5)];
	if(localStorage.getItem("scomenzi") != null){
		comenzi = localStorage.getItem("scomenzi");
		comenzi = JSON.parse(comenzi);
	}
	else
		comenzi = new Array(10);
	if(localStorage.getItem("snrcomenzi") != null){
		nr_comenzi = localStorage.getItem("snrcomenzi");
		nr_comenzi = JSON.parse(nr_comenzi);
		for(let i = 1; i <= 3; i++){
			var t = "service" + i;
			var x = document.getElementsByClassName(t);
			x = x[0];
			let poz = x.innerHTML.search("</p>");
			let a1 = x.innerHTML.slice(0, poz);
			let a2 = x.innerHTML.slice(poz);
			x.style.fontSize = "20px";
			x.innerHTML = a1 + "<br>Number of orders at this service:"
				+ nr_comenzi[i] + a2;
		}
	}
	else{
		nr_comenzi = new Array(10);
		for(let i = 0; i <= 3; i++){
			nr_comenzi[i] = 0;
		}
	};
	/*if(localStorage.getItem("srecenzii") != null){
		recenzii = localStorage.getItem("srecenzii");
		recenzii = JSON.parse(recenzii);
		for(const x of recenzii){
			var aux = document.getElementById("SectRecenzii");
			var taux = document.createElement("div");
			taux.className = "recenzie";
			var t = document.createElement("h2");
			t.innerHTML = x.nume;
			taux.appendChild(t);
			console.log(x);
			var tt = document.createElement("p");
			tt.innerHTML = x.review;
			taux.appendChild(tt);
			aux.appendChild(taux);

		}
	}
	else{
		recenzii = new Array();
	};*/
	
	var comanda = document.getElementById("order-form");
	comanda.addEventListener('submit', function(event){
		event.preventDefault();
		var service;
		if(document.getElementById("service1").checked)
			service = 0;
		else if(document.getElementById("service2").checked)
			service = 1;
		else
			service = 2;
		var nume = document.getElementById("name").value;
		var telefon = document.getElementById("telephone").value;
		var email = document.getElementById("email").value;
		var adresa = document.getElementById("address").value;
		var descriere = document.getElementById("description").value;
		comenzi.push([serviceuri[service], nume, telefon, email, 
			adresa, descriere]);
		console.log(comenzi[comenzi.length - 1]);
		nr_comenzi[service]++;
		localStorage.setItem("scomenzi", JSON.stringify(comenzi));
		localStorage.setItem("snrcomenzi", JSON.stringify(nr_comenzi));
		comanda.reset();
	});
	/*var crecenzie = document.getElementById("recenzie-form");
	crecenzie.addEventListener('submit', function(event){
		event.preventDefault();
		var nume = document.getElementById("name").value;
		var recenz  = document.getElementById("review").value;
		recenzii.push({nume: nume, review: recenz});
		console.log("@");
		localStorage.setItem("srecenzii", JSON.stringify(recenzii));
		crecenzie.reset();
	})*/
	act_timp();
}
var timp;

function act_timp(){
	var t = document.getElementsByTagName("footer");
	t = t[0];
	var aux = document.createElement("p");
	timp = new Date();
	aux_timp(t);
}

function aux_timp(t){
	timp.setSeconds(timp.getSeconds() + 1);
	var aux;
	if(t.firstElementChild != null){
		aux = t.firstElementChild;
		t.removeChild(t.firstElementChild);
	}
	else{
		aux = document.createElement("p");

	}
	var time = timp.getHours() + ":" + timp.getMinutes() + ":" + 
		timp.getSeconds();
	aux.innerHTML = time;
	aux.style.fontColor = "#F9ECD8";
	t.appendChild(aux);
	setTimeout(function(){aux_timp(t)}, 1000);
}