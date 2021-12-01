const stage = $("#container");
const stageHeight = stage.innerHeight();
const stageWidth = stage.innerWidth();
let data = [];
let maxPopulation = 1;

$(function () {
    console.log(positionData.length, " countries total before merge");
    prepareData();
    console.log(data.length, " countries total after merge");
    drawMap();
});

function prepareData() {
    // merge populationData with positionData
    positionData.forEach((country) => {
        // console.log(country.alpha3Code);
        populationData.forEach((popData) => {
            if (country.alpha3Code === popData.countryCode) {
                // console.log("it's a match!");
                let newCountry = country;
                newCountry.population = popData.population;
                data.push(newCountry);
            }
        });
    });

    maxPopulation = getMax(data, "population");
    console.log("maxPopulation: ", maxPopulation);
}

function getMax(givenData, key) {
    let myMax = givenData[0][key];
    givenData.forEach(element => {
        if (element[key] > myMax) { // element["population"] === element.population
            myMax = element[key];
        }
    });
    console.log("maximum", key, ": ", myMax);
    return myMax;
}

function drawMap() {
    for (let i = 0; i < data.length; i++) {
        let longitude = gmynd.map(data[i].longitude, -180, 180, 0, stageWidth);
        let latitude = gmynd.map(data[i].latitude, -90, 90, stageHeight, 0);
        const countryArea = gmynd.map(data[i].population, 1, maxPopulation, 4, 50);
        // const countryRadius = Math.sqrt(countryArea / Math.PI);
        const countryRadius = gmynd.circleRadius(countryArea);
        let countryCircle = $("<div></div>");
        countryCircle.addClass("circle");
        countryCircle.css({
            width: countryRadius * 2,
            height: countryRadius * 2,
            left: longitude-countryRadius,
            top: latitude-countryRadius
        });
        stage.append(countryCircle);
    }
}

/* function myCoolFunction(param) {

}

(param) => {

} */