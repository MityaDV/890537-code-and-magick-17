'use strict';

(function () {

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

    var textIndent = CLOUD_X + (GAP * 2);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.font = 'bold 16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', textIndent, FONT_GAP);
    ctx.fillText('Список результатов:', textIndent, FONT_GAP + GAP + TEXT_HEIGHT);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      var heightBar = (maxBarHeight * times[i]) / maxTime;
      var playerResult = barStart - ((heightBar * -1) + (GAP + TEXT_HEIGHT));
      var columnIndentX = CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * i);
      var nameUserIndentY = (CLOUD_Y * 2) + FONT_GAP + GAP + TEXT_HEIGHT;

      ctx.fillText(Math.round(times[i]), columnIndentX, playerResult);

      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else if (i === 1) {
        ctx.fillStyle = 'rgba(0, 0, 255, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255,' + (i + 1) / 10 + ')';
      }

      ctx.fillRect(columnIndentX, barStart, BAR_WIDTH, heightBar);

      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(players[i], columnIndentX, nameUserIndentY);
    }
  };

})();
