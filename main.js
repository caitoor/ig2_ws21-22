const data = [5, 7, 3, 8, 1, 7, 3, 6, 9, 5];
const stage = $("#container");
const stageHeight = stage.innerHeight();
const stageWidth = stage.innerWidth();
const barWidth = stageWidth / ((data.length * 2) - 1);
const dataMax = Math.max(...data);
console.log(dataMax);

//barDiagram();
stackedDiagram();

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

function stackedDiagram() {
    console.log("zeichne gestapeltes Diagramm");
    const circleHeight = 20;
    const verticalOffset = 5;
    const verticalDistance = circleHeight +verticalOffset;
    for (let i = 0; i < data.length; i++) {
        // i = beim wievielten Wert im Array bin ich gerade?
        for (let j = 0; j < data[i]; j++) {
            //j = wievielter Kreis im aktuellen Balken?    
            let xPos = i * 2 * barWidth;
            const myCircle = $('<div class="circle"></div>');
            let yPos = stageHeight - circleHeight - (j * verticalDistance);
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