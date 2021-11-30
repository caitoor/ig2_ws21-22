const stage = $("#container");
const stageHeight = stage.innerHeight();
const stageWidth = stage.innerWidth();
let data = [];

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
}

function drawMap() {
    for (let i = 0; i < data.length; i++) {
        let longitude = gmynd.map(data[i].longitude, -180, 180, 0, stageWidth);
        let latitude = gmynd.map(data[i].latitude, -90, 90, stageHeight, 0);
        const countrySize = gmynd.map(data[i].population, 1, 1300000000, 2, 20);
        let countryCircle = $("<div></div>");
        countryCircle.addClass("circle");
        countryCircle.css({
            width: countrySize,
            height: countrySize,
            left: longitude-countrySize/2,
            top: latitude-countrySize/2
        });
        stage.append(countryCircle);
    }
}

/* function myCoolFunction(param) {

}

(param) => {

} */