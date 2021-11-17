const stage = $("#container");
const stageHeight = stage.innerHeight();
const stageWidth = stage.innerWidth();

$(function () {
    console.log(data.length, " countries total");
    drawMap();
});

function drawMap() {
    const countrySize = 5;
    for (let i = 0; i < data.length; i++) {
        let longitude = gmynd.map( data[i].longitude, -180, 180, 0, stageWidth);
        let latitude = gmynd.map(data[i].latitude, -90, 90, stageHeight, 0);
        
        //  data[i]["longitude"]
        let countryCircle = $("<div></div>");
        countryCircle.addClass("circle");
        countryCircle.css({
            width: countrySize,
            height: countrySize,
            left: longitude,
            top: latitude
        });
        stage.append(countryCircle);
    }
}