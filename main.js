const stage = $("#container");
const hoverlabel = $("#mouseover-label");
const clicklabel = $("#click-label");

const stageHeight = stage.innerHeight();
const stageWidth = stage.innerWidth();

let data;
let cumulatedByContinent;
let groupedByContinent;

let maxPopulation = 1;

$(function () {
    console.log(positionData.length, " countries total before merge");
    prepareData();
    console.log(data.length, " countries total after merge");
    // drawMap();
    stackedDiagram();
});

function prepareData() {
    data = gmynd.mergeData(positionData, populationData, "alpha3Code", "countryCode");
    data = gmynd.mergeData(data, continentData, "alpha3Code", "code_3");
    data = gmynd.deleteProps(data, ["code_2", "country", "country_code", "iso_3166_2"]);
    let calculations = [
        {
            value: "population",
            method: "Sum",
            title: "populationTotal"
        },
        {
            value: "population",
            method: "Median",
        },
        {
            value: "population",
            method: "Average",
        }
    ];
    cumulatedByContinent = gmynd.cumulateData(data, "continent", calculations);
    groupedByContinent = gmynd.groupData(data, "continent");
    //console.log(Object.keys(groupedByContinent));
    console.log("The world has " + Object.keys(groupedByContinent).length + " continents.");
    console.log("Europe has " + groupedByContinent["Europe"].length + " countries.");

    maxPopulation = gmynd.dataMax(data, "population");
    console.log("maxPopulation: ", maxPopulation);
}

function stackedDiagram() {
    const continentCount = Object.keys(groupedByContinent).length;
    let continentIndex = 0;
    for (const prop in groupedByContinent) {
        const continentCountries = groupedByContinent[prop];
        console.log(prop, ":", continentCountries.length);
        continentCountries.forEach((country, index) => {
            const width = stageWidth / ((continentCount * 2) - 1);
            const height = 5;
            const diagramY = index * height;
            const diagramX = continentIndex * width * 2;

            let countryBox = $("<div></div>");
            countryBox.css({
                position: "absolute",
                width: width,
                height: height,
                left: diagramX,
                top: stageHeight - diagramY,
                "background-color": "white"
            });
            stage.append(countryBox);
        });
        continentIndex++;
    }
}

function drawMap() {
    for (let i = 0; i < data.length; i++) {
        let longitude = gmynd.map(data[i].longitude, -180, 180, 0, stageWidth);
        let latitude = gmynd.map(data[i].latitude, -90, 90, stageHeight, 0);
        const countryArea = gmynd.map(data[i].population, 1, maxPopulation, 10, 100);
        // const countryRadius = Math.sqrt(countryArea / Math.PI);
        const countryRadius = gmynd.circleRadius(countryArea);
        let countryCircle = $("<div></div>");
        countryCircle.addClass("circle");
        countryCircle.css({
            width: countryRadius * 2,
            height: countryRadius * 2,
            left: longitude - countryRadius,
            top: latitude - countryRadius
        });

        countryCircle.data(data[i]);

        countryCircle.mouseover(function () {
            countryCircle.addClass("highlight");
            hoverlabel.text(countryCircle.data().countryName);
        });

        countryCircle.mouseout(function () {
            countryCircle.removeClass("highlight");
            hoverlabel.text("");
            // countryCircle.addClass("no-highlight-anymore");
        });

        countryCircle.click(function () {
            $(".clicked").removeClass("clicked");

            countryCircle.addClass("clicked");
            clicklabel.text(countryCircle.data().countryName);
        });

        stage.append(countryCircle);
    }
}