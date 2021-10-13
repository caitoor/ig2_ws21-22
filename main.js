const stage = $("#container");
const stageHeight = stage.innerHeight();

const data = [5, 7, 3, 8, 3, 6, 7];

const barWidth = 20;

for (let i = 0; i < data.length; i++) {
    let barHeight = data[i] * 20;
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