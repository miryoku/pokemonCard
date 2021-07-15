//AppeleAsync("https://api.pokemontcg.io/v2/sets", AfficheSet)
AppeleAsync("https://api.pokemontcg.io/v2/cards?q=set.id:base1", AfficheContenairSet)
//AppeleAsync("https://api.pokemontcg.io/v2/cards/xy7-54", AfficheDetailCard)
//AppeleAsync("https://api.pokemontcg.io/v2/cards?q=name:charizard*", AfficheContenairSet)

//AppeleAsync("https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[4 to 6]", AfficheContenairSet)



let search = document.getElementById("search");
let clock;
search.addEventListener("input", () => {
	const time = 3000
	clearTimeout(clock)
	if (search.value.length != 0) {
		clock = setTimeout(function () { AppeleAsync("https://api.pokemontcg.io/v2/cards?q=name:" + search.value + "*", AfficheSearche) }, time)
	} else {
		clock = setTimeout(function () {AppeleAsync("https://api.pokemontcg.io/v2/sets", AfficheSet) }, time)
	 }
})

function AfficheSearche(data) {
	document.getElementById('container').innerHTML = ""
	var container = document.getElementById("container");
	var row = document.createElement("div");
	row.className = "row";
	data.data.forEach(element => {
		let id = element.id;
		let name = element.name;
		let img = element.images.small;
		let p = [];
		p.push("Rarete : " + element.rarity);
		p.push("set : " + element.set.name)
		let f = function (e) { AppeleAsync("https://api.pokemontcg.io/v2/cards/" + e.srcElement.id, AfficheDetailCard) };
		cardStyle(row, img, name, p, id, f)
	})
	container.appendChild(row);
}


function AfficheSet(data) {
	document.getElementById('container').innerHTML = ""
	var container = document.getElementById("container");
	var row = document.createElement("div");
	row.className = "row";
	BarNav("home")
	data.data.forEach(element => {
		let name = element.name;
		let img = element.images.logo;
		let p = [];
		p.push("Release : " + element.releaseDate)
		p.push("Nombre de carte : " + element.printedTotal)
		let id = element.id;
		let f = function (e) { AppeleAsync("https://api.pokemontcg.io/v2/cards?q=set.id:" + e.srcElement.id, AfficheContenairSet) };
		cardStyle(row, img, name, p, id, f);
	});
	container.appendChild(row);
}

function AfficheContenairSet(data) {
	console.log(data)
	document.getElementById('container').innerHTML = ""
	var container = document.getElementById("container");
	var row = document.createElement("div");
	row.className = "row";
	BarNav("https://api.pokemontcg.io/v2/sets", AfficheSet, "home", data.data[0].set.id)
	data.data.forEach(element => {
		let name = element.name;
		let img = element.images.small;
		let p = [];
		p.push("Rarete : " + element.rarity);
		p.push("Type : " + element.supertype);
		let id = element.id
		let f = function (e) { AppeleAsync("https://api.pokemontcg.io/v2/cards/" + e.srcElement.id, AfficheDetailCard) };
		cardStyle(row, img, name, p, id, f);
	});
	container.appendChild(row);
}

function AfficheDetailCard(data) {

	document.getElementById('container').innerHTML = ""
	var container = document.getElementById("container");
	const element = data.data;
	//console.log(data)


	BarNav("https://api.pokemontcg.io/v2/sets", AfficheSet, "home", "https://api.pokemontcg.io/v2/cards?q=set.id:" + element.set.id, AfficheContenairSet, element.set.id, element.name)

	var div = remplirNewElement('div', 'card', false);
	var div2 = remplirNewElement('div', 'row g-0', false);
	var div3 = remplirNewElement('div', 'col-4', false);
	var div4 = remplirNewElement('div', 'col-8', false);
	var img = remplirNewElement('img', "card-img-top", false);
	img = newElementImg(img, element.name, element.images.large)
	var divBody = remplirNewElement('div', "card-body", false);
	var h5 = remplirNewElement('h5', "card-title", false);
	h5 = newElementText(h5, element.name)
	var pRarete = remplirNewElement("p", "card-text", false);
	pRarete = newElementText(pRarete, element.rarity);
	var pSuperType = remplirNewElement(pSuperType, "card-text", false);
	pSuperType = newElementText(pSuperType, "type : " + element.supertype);
	var pFlavorText = remplirNewElement("p", "card-text", false);
	pFlavorText = newElementText(pFlavorText, "Description : " + element.flavorText)
	var pArtist = remplirNewElement("p", "card-text", false);
	pArtist = newElementText(pArtist, "Artist: " + element.artist)
	var pNationalPokedexNumbers = remplirNewElement("p", "card-text", false);
	pNationalPokedexNumbers = newElementText(pNationalPokedexNumbers, "Number Pokedex: " + element.nationalPokedexNumbers[0])
	var aTcgplayer = remplirNewElement("a", "btn btn-primary", false);
	aTcgplayer = newElementText(aTcgplayer, "Site de vente")
	aTcgplayer = newElementHref(aTcgplayer, element.tcgplayer.url, "_blank");
	div.appendChild(div2);
	div2.appendChild(div3);
	div3.appendChild(img)
	div2.appendChild(div4);
	div4.appendChild(divBody);
	divBody.appendChild(h5);
	divBody.appendChild(pRarete);
	divBody.appendChild(pSuperType);
	divBody.appendChild(pFlavorText);
	divBody.appendChild(pArtist);
	divBody.appendChild(pNationalPokedexNumbers);
	divBody.appendChild(aTcgplayer);
	container.appendChild(div);
}

function cardStyle(row, imgs, name, paras, aId, src) {
	var divCol = document.createElement('div');
	divCol.className = 'col';
	var div = document.createElement('div');
	div.className = 'card';
	div.style.width = '18rem';
	var img = document.createElement('img');
	img.className = 'card-img-top';
	img.alt = name
	img.src = imgs
	var divBody = document.createElement('div');
	divBody.className = "card-body";
	var h5 = document.createElement('h5');
	h5.className = "card-title";
	h5.textContent = name
	let array = [];
	paras.forEach(item => {
		var p = document.createElement("p");
		p.className = "card-text";
		p.textContent = item
		array.push(p)
	})
	var a = document.createElement("button");
	a.className = "btn btn-primary"
	a.id = aId
	a.textContent = "Plus d'information"
	a.onclick = src;
	row.appendChild(divCol);
	divCol.appendChild(div);
	div.appendChild(img);
	div.appendChild(divBody);
	divBody.appendChild(h5);
	array.forEach(item => divBody.appendChild(item))
	divBody.appendChild(a)
}

function remplirNewElement(element, nomIdOrClass, idOrClass = true) {
	var newElement = document.createElement(element);

	if (nomIdOrClass !== null) {
		if (idOrClass) {
			newElement.id = nomIdOrClass;
		} else {
			newElement.className = nomIdOrClass;
		}
	}
	return newElement;
}

function newElementHref(newElement, href, target = null) {
	newElement.href = href;
	newElement.target = target;
	return newElement;
}

function newElementText(newElement, text) {
	newElement.textContent = text;
	return newElement;
}

function newElementImg(newElement, alt, src) {
	newElement.alt = alt;
	newElement.src = src;
	return newElement;
}

function newElementButton(newElement, addresse, functionUse) {

	newElement.onclick = function () { AppeleAsync(addresse, functionUse) };
	return newElement;
}

function BarNav(...nav) {
	let button = [];
	for (let i = 0; i < nav.length; i++) {
		if (i === (nav.length) - 1) {
			var a = remplirNewElement("li", "breadcrumb-item active", false);
			a = newElementText(a, nav[i]);
			button.push(a)
		}
		else {
			var a = remplirNewElement("button", "btn btn-link", false);
			a = newElementButton(a, nav[i], nav[i + 1]);
			a = newElementText(a, nav[i + 2]);
			button.push(a)
			i = i + 2;
		}
	}
	var container = document.getElementById("container");
	var nav = remplirNewElement("nav", null);
	var ol = remplirNewElement("ol", "breadcrumb", false);
	nav.appendChild(ol);
	for (let i = 0; i < button.length; i++) {
		if ((button.length) - 1 == i) {
			ol.appendChild(button[i]);
		} else {
			var li = remplirNewElement("li", "breadcrumb-item", false);
			ol.appendChild(li);
			li.appendChild(button[i]);
		}
	}
	container.appendChild(nav);
}

function AppeleAsync(ressource, callback, data) {
	var xhr = new XMLHttpRequest();
	Async(xhr, callback)
	xhr.open("GET", ressource, true);
	xhr.responseType = "json"
	xhr.send(data);
}

function Async(xhr, callback) {

	xhr.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.response);
			var res = this.response;

			if (res) {
				callback(res)
			}
			else {
				console.log(res.msg);

			}
		}
		else if (this.response) {
			console.log("une erreur est survenue ...");

		}
	};
}

