var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 100;
var GAP = 10;
var FONT_GAP = 30;
var TEXT_HEIGHT = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var barStart = (CLOUD_Y * 2) + BAR_WIDTH;
var maxBarHeight = (CLOUD_HEIGHT - (FONT_GAP * 2) - (TEXT_HEIGHT * 3) - (GAP * 3)) * -1;
var playerResult = barStart - ((maxBarHeight * -1) + (GAP + TEXT_HEIGHT));

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, GAP * 2, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, GAP, 'rgba(255, 255, 255, 1)');

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.font = 'bold 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + (GAP * 2), FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + (GAP * 2), FONT_GAP + GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * i), playerResult);

    if (i === 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else if (i === 1) {
      ctx.fillStyle = 'rgba(0, 0, 255, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, 0.7)';
    }

    ctx.fillRect(CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * i), barStart, BAR_WIDTH, (maxBarHeight * times[i]) / maxTime);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(players[i], CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * i), (CLOUD_Y * 2) + FONT_GAP + GAP + TEXT_HEIGHT);
  };


  // Катя

  // var playerIndex = 1;
  // var playerName = 'Катя';

  // ctx.fillText('2735', CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), playerResult);

  // ctx.fillStyle = 'rgba(0, 0, 255, 1)';
  // ctx.fillRect(CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), barStart, BAR_WIDTH, barHeight);

  // ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  // ctx.fillText(playerName, CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), (CLOUD_Y * 2) + FONT_GAP + GAP + TEXT_HEIGHT);

  // // Женя

  //  var playerIndex = 2;
  //  var playerName = 'Женя';

  // ctx.fillText('2745', CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), playerResult);

  // ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
  // ctx.fillRect(CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), barStart, BAR_WIDTH, barHeight);

  // ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  // ctx.fillText(playerName, CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), (CLOUD_Y * 2) + FONT_GAP + GAP + TEXT_HEIGHT);

  // // Полина

  //  var playerIndex = 3;
  //  var playerName = 'Полина';

  // ctx.fillText('2755', CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), playerResult);

  // ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  // ctx.fillRect(CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), barStart, BAR_WIDTH, barHeight);

  // ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  // ctx.fillText(playerName, CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * playerIndex), (CLOUD_Y * 2) + FONT_GAP + GAP + TEXT_HEIGHT);
};
