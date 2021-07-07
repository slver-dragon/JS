let inputCity = document.querySelector(".city");
let city = "";
/*new File(fileParts,'./data/city.list.json')
/*let cityTable = */

/*let city = document.querySelector(".city").nodeValue;
/*
let result = await fetch(link);*/

/*inputCity.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();
      city = inputCity.value;
    }
});*/
let file = `http://api.openweathermap.org/data/2.5/forecast?id=629634&appid=451b5d3fb4eee014ceab03b872899c57`;
/*let link = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=451b5d3fb4eee014ceab03b872899c57`;*/
let response = await fetch(link);
let commits = response.json();
console.log(commits);

