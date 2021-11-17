const data = [5, 7, 3, 8, 1, 7, 3, 6, 9, 5, 6, 8, 4, 23, 6, 7];
const stage = $("#container");
const stageHeight = stage.innerHeight();
const stageWidth = stage.innerWidth();
const barWidth = stageWidth / ((data.length * 2) - 1);
const dataMax = Math.max(...data);
console.log(dataMax);

barDiagram();
//stackedDiagram();

function barDiagram() {
    for (let i = 0; i < data.length; i++) {
        let heightCoefficient = stageHeight / dataMax;
        let barHeight = data[i] * heightCoefficient;
        let xPos = i * 2 * barWidth;
        const myBar = $('<div class="bar"></div>');
        const yPos = stageHeight - barHeight;
        myBar.css({
            width: barWidth,
            height: barHeight,
            left: xPos,
            top: yPos
        });
        stage.append(myBar);
    }
}

function rain() {
    console.log("zeichne gestapeltes Diagramm");
    const circleHeight = 20;
    const verticalOffset = 5;
    const verticalDistance = circleHeight + verticalOffset;
    for (let i = 0; i < data.length; i++) {
        // i = beim wievielten Wert im Array bin ich gerade?
        for (let j = 0; j < data[i]; j++) {
            //j = wievielter Kreis im aktuellen Balken?    
            let xPos = (i * 2 * barWidth) - (j * 10);
            const myCircle = $('<div class="circle"></div>');
            let yPos = circleHeight + (j * verticalDistance);
            myCircle.css({
                width: 20,
                height: circleHeight,
                left: xPos,
                top: yPos
            });
            stage.append(myCircle);
        }
    }
}

function stackedDiagram() {
    console.log("zeichne gestapeltes Diagramm");
    const radiusCountX = ((data.length * 2) + (data.length - 1));
    const radiusCountY = ((dataMax * 2) + (dataMax - 1));
    // const radiusCount = Math.max(radiusCountX, radiusCountY);
    const radiusCount = radiusCountX > radiusCountY ? radiusCountX : radiusCountY;
    const radius = stageWidth / radiusCount;
    const gap = radius;
    for (let i = 0; i < data.length; i++) {
        // i = beim wievielten Wert im Array bin ich gerade?
        for (let j = 0; j < data[i]; j++) {
            //j = wievielter Kreis im aktuellen Balken?    
            let xPos = i * 3 * radius;
            const myCircle = $('<div class="circle"></div>');
            let yPos = radius * 3 * j;
            myCircle.css({
                width: radius * 2,
                height: radius * 2,
                left: xPos,
                top: yPos
            });
            stage.append(myCircle);
        }
    }
}

const myCountry = {
    longitude: 90,
    latitude: -45,
    population: 30000000,
    countryName: "China"
}