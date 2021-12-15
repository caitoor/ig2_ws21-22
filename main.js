const stage = $("#container");
const hoverlabel = $("#mouseover-label");
const clicklabel = $("#click-label");

const stageHeight = stage.innerHeight();
const stageWidth = stage.innerWidth();

let data;
let cumulatedByContinent;
let groupedByContinent;

$(function () {
    console.log(positionData.length, " countries total before merge");
    prepareData();
    console.log(data.length, " countries total after merge");
    init();
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
    console.log("The world has " + Object.keys(groupedByContinent).length + " continents.");
    // console.log("Europe has " + groupedByContinent["Europe"].length + " countries.");
}

function init() {
    const continentCount = Object.keys(groupedByContinent).length;
    const maxCountriesPerContinent = gmynd.dataMax(cumulatedByContinent, "count");
    const diagramHeight = stageHeight / maxCountriesPerContinent;
    const diagramWidth = stageWidth / ((continentCount * 2) - 1);
    const maxPopulation = gmynd.dataMax(data, "population");
    let continentIndex = 0;
    for (const prop in groupedByContinent) {
        const continentCountries = groupedByContinent[prop];
        console.log(prop, ":", continentCountries.length);
        continentCountries.forEach((country, index) => {
            const mapArea = gmynd.map(country.population, 1, maxPopulation, 10, 100);
            const mapRadius = gmynd.circleRadius(mapArea);
            const computedProperties = {
                diagramWidth: diagramWidth,
                diagramHeight: diagramHeight,
                diagramY: stageHeight - (index * diagramHeight) - diagramHeight,
                diagramX: continentIndex * diagramWidth * 2,
                mapSize: mapRadius * 2,
                mapX: gmynd.map(country.longitude, -180, 180, 0, stageWidth) - mapRadius,
                mapY: gmynd.map(country.latitude, -90, 90, stageHeight, 0) - mapRadius,
            }
            let countryBox = $("<div></div>");
            countryBox.addClass("country");
            countryBox.data(country);
            countryBox.data(computedProperties);
            countryBox.css({
                left: computedProperties.mapX,
                top: computedProperties.mapY,
                width: computedProperties.mapSize,
                height: computedProperties.mapSize,
                "border-radius": "50%"
            });
            countryBox.mouseover(function () {
                countryBox.addClass("highlight");
                hoverlabel.text(countryBox.data().countryName);
            });

            countryBox.mouseout(function () {
                countryBox.removeClass("highlight");
                hoverlabel.text("");
                // countryCircle.addClass("no-highlight-anymore");
            });

            countryBox.click(function () {
                $(".clicked").removeClass("clicked");

                countryBox.addClass("clicked");
                clicklabel.text(countryBox.data().countryName);
            });

            stage.append(countryBox);
        });
        continentIndex++;
    }
}

function drawMap() {
    $(".country").each(function () {
        let countryData = $(this).data();
        $(this).animate({
            width: countryData.mapSize,
            height: countryData.mapSize,
            left: countryData.mapX,
            top: countryData.mapY,
            "border-radius": "50%"
        }, 1000);
    });
}

function stackedDiagram() {
    $(".country").each(function () {
        let countryData = $(this).data();
        $(this).animate({
            width: countryData.diagramWidth,
            height: countryData.diagramHeight,
            left: countryData.diagramX,
            top: countryData.diagramY,
            "border-radius": "0%"
        }, 1000);
    });
}