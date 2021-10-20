const data = [5, 7, 3, 8, 1, 7, 3, 6];

const stage = $("#container");
const stageHeight = stage.innerHeight();
const stageWidth = stage.innerWidth();

const barWidth = stageWidth / ((data.length * 2) - 1);

/* 
let dataMax = data[0];
for (let i = 1; i < data.length; i++) {
    if (data[i] > dataMax) {
        dataMax = data[i];
    }
}
*/

// einzeiliger kommentar

const dataMax = Math.max(...data); //gibt's auch als Math.min
console.log(dataMax);

for (let i = 0; i < data.length; i++) {
    let heightCoefficient = stageHeight / dataMax;
    let barHeight = data[i] * heightCoefficient;
    let xPos = i * 2 * barWidth;
    const myBar = $('<div class="bar"></div>');
    const yPos = stageHeight - barHeight;
    myBar.css({
        width: barWidth,
        height: 0,
        left: xPos,
        top: yPos
    });
    stage.append(myBar); //vgl. prepend
    myBar.animate({
        height: barHeight
    }, 1000);
}