let animateStop = false;

export default function setup() {
  const Container = document.querySelector('#framework-wrap');
  const CoordDom = Container.querySelector('.coord-refer');

  // 缩放比例
  let Scale = 1;
  const originWidth = Number(CoordDom.dataset.width);
  getPageScale();

  // 计算svg缩放比例
  function getPageScale() {
    Scale = CoordDom.clientWidth / originWidth;
    console.debug('Scale', Scale);
  }
  /** 设置水波大小和位置
   const circleWraps = Array.from(Container.querySelectorAll('.circle-wrap'));
   function setRipplePosition() {
  circleWraps.forEach(el => {
    el.style.top = `${Math.round(Number(el.dataset.top) * Scale)}px`;
    el.style.left = `${Math.round(Number(el.dataset.left) * Scale)}px`;
    const size = Math.round(Number(el.dataset.s) * Scale);
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
  });
}
   setRipplePosition();

   // 鼠标移入移出
   const WaveStates = new Array(circleWraps.length).fill(1).map(function () {
  return {
    isHover:  false,
    isFinish:  true,
    startTime:  0,
  }
});
   circleWraps.forEach((el, _ind) => {
  el.onmouseover = function () {
    WaveStates[_ind].isHover = true;
  }
  el.onmouseleave = function () {
    WaveStates[_ind].isHover = false;
  }
});
   **/

  // === 动画相关设置 ===
  const SendBallInterval = 1000; // 发球间隔
  let WaveDuration = 1; // 动画持续时长
  const WaveInterval = 200; // 两次动画的间隔
  let nowMilSecond = 0;
  let stopAnimate = false;
  listenVisible((pageHide) => {
    console.debug('pageHide: ', pageHide);
    stopAnimate = pageHide;
    if (!pageHide) {
      addBallInterval();
      clearFinishedBall();
    }
  });

  // 所有的运动轨迹
  const PathData = getPathData();
  const PathDataKeys = Object.keys(PathData);
  const PathMap = PathDataKeys.reduce((acc, k) => {
    acc[k] = [];
    return acc;
  }, {});

  let lastCallTime = 0;
  !animateStop && window.requestAnimationFrame(animate);
  addBallInterval();


  let startTime = 0;
  let animateCount = 0;
  function animate() {
    !startTime && (startTime = Date.now());
    animateCount++;

    // 球
    PathDataKeys.forEach(k => {
      PathMap[k].forEach(ball => ball.run());
    });

    // 水波
    /**
     nowMilSecond = Date.now();
     WaveStates.forEach((wave, index) => {
    const { startTime } = wave;
    const waveEle = circleWraps[index];
    wave.isFinish = startTime ? (nowMilSecond - startTime) / 1000 > WaveDuration : true;
    if (wave.isHover) {
      if (!startTime) {
        waveEle.classList.add('active')
        wave.startTime = nowMilSecond;
      } else if (wave.isFinish) {
        waveEle.classList.contains('active')
          ? waveEle.classList.remove('active')
          : setTimeout(function () {
            waveEle.classList.add('active');
            wave.startTime = Date.now();
          }, WaveInterval);
      }
    } else if (wave.isFinish) {
      // 移除动画
      waveEle.classList.remove('active')
      wave.startTime = 0;
    }
  }); **/
    !animateStop && window.requestAnimationFrame(animate);
  }

  function addBallInterval() {
    const now = Date.now();
    const interval = now - lastCallTime;
    if (interval < SendBallInterval) {
      console.debug('添加间隔太小: ', interval);
    }
    const isCall = !lastCallTime || (interval > SendBallInterval);
    if (!animateStop && isCall) {
      PathDataKeys.forEach(k => PathMap[k].push(createBall(PathData[k])));
      lastCallTime = now;
    }
    !stopAnimate && setTimeout(addBallInterval, SendBallInterval);
  }

  function createBall(pathWay, color) {
    let ball = document.createElement('div');
    ball.className = 'ball';
    CoordDom.appendChild(ball);
    let index = 0;
    let _finished = false;
    const len = pathWay.length;
    return {
      finished() {
        return _finished;
      },
      run() {
        if (_finished) return;

        if (index < len) {
          // 隐藏
          if (pathWay[index][0] < 0) {
            ball.style.opacity = '0';
          } else {
            ball.style.left = `${Math.round(pathWay[index][0] * Scale)}px`;
            ball.style.top = `${Math.round(pathWay[index][1] * Scale)}px`;
            ball.style.opacity = '1';
          }
          // 调整运动速度
          index += 3;
          return true;
        }
        CoordDom.removeChild(ball);
        ball = null;
        _finished = true;
        return false;
      },
    };
  }
  // 定时清理到达终点的小球
  let timeId = null;
  function clearFinishedBall() {
    calcFPS();
    /*** ***/
    PathDataKeys.forEach(k => {
      PathMap[k] = PathMap[k].filter(ball => !ball.finished());
    });
    console.debug('清理小球，剩余数量');

    clearTimeout(timeId);
    if (!stopAnimate) {
      timeId = setTimeout(clearFinishedBall, 10000);
    }
  }
  timeId = setTimeout(clearFinishedBall, 10000);
  // 测试 setTimeout 对屏幕刷新频率的影响
  function calcFPS() {
    const duration = (Date.now() - startTime) / 1000;
    console.debug('\n🔥 fps: ', animateCount / duration );
    startTime = 0;
    animateCount = 0;
  }
}

document.addEventListener('keydown', e => {
  if (e.code === 'KeyS') {
    animateStop = !animateStop;
  }
});

// ===== 运动轨迹数据 ============
function getPathData() {
  const PathRed = [
    [141, 310],
    ...getCoord(310, 302, 141, 'y'),
    [141, 302],
    [142, 302],
    [143, 301],
    [144, 300],
    [145, 299],
    [146, 298],
    [147, 297],
    [148, 296],
    ...getCoord(148, 157, 296, 'x'),
    [157, 296],
    [158, 296],
    [159, 296],
    [160, 295],
    [161, 294],
    [162, 293],
    [163, 292],
    [164, 291],
    ...getCoord(291, 285, 164, 'y'),
    [164, 285],
    ...getCoord(-1, 40),
    [164, 244],
    ...getCoord(244, 239, 164, 'y'),
    [164, 239],
    [164, 238],
    [165, 237],
    [166, 236],
    [167, 235],
    [167, 234],
    ...getCoord(167, 356, 234, 'x'),
    [356, 234],
    [357, 233],
    [358, 232],
    [359, 231],
    [360, 230],
    [361, 229],
    [362, 228],
    [363, 227],
    ...getCoord(227, 202, 363, 'y'),
    [363, 202],
    ...getCoord(-1, 20),
    ...getCoord(380, 403, 190, 'x'),
    ...getCoord(-1, 20),
    ...getCoord(403, 382, 180, 'x'),
    ...getCoord(-1, 20),

    ...getCoord(167, 137, 363, 'y'),
    ...getCoord(-1, 40),
    ...getCoord(103, 73, 363, 'y'),
    ...getCoord(-1, 50),
    [346, 53],
    ...getCoord(346, 323, 53, 'x'),
    [323, 53],
    [322, 53],
    [321, 54],
    [320, 55],
    [319, 56],
    [318, 57],
    [317, 58],
    [316, 59],
    [315, 59],
    ...getCoord(59, 88, 315, 'y'),
    [315, 88],
    [314, 89],
    [313, 90],
    [312, 91],
    [311, 92],
    [310, 93],
    [309, 94],
    ...getCoord(309, 286, 94, 'x'),
    [286, 94],
    ...getCoord(-1, 40),
    ...getCoord(251, 239, 94, 'x'),
    [239, 94],
    [238, 94],
    [237, 93],
    [236, 92],
    [235, 91],
    [234, 90],
    [233, 89],
    [232, 88],
    [232, 87],
    [232, 86],
  ];
  const PathBlueRight = [
    [739, 689],
    ...getCoord(689, 684, 739, 'y'),
    [739, 684],
    [738, 684],
    [737, 683],
    [736, 682],
    [735, 681],
    [734, 680],
    [733, 679],
    [732, 678],
    ...getCoord(732, 698, 678, 'x'),
    [698, 678],
    [697, 678],
    [696, 677],
    [695, 676],
    [694, 675],
    [693, 674],
    [692, 673],
    [691, 672],
    [690, 671],
    ...getCoord(671, 663, 690, 'y'),
    [690, 663],
    ...getCoord(-1, 45),
    [708, 647],
    ...getCoord(708, 840, 647, 'x'),
    [840, 647],
    [841, 647],
    [842, 646],
    [843, 645],
    [844, 644],
    [845, 643],
    [846, 642],
    [847, 641],
    [848, 640],
    [849, 639],
    [850, 638],
    [851, 638],
    ...getCoord(638, 276, 851, 'y'),
    [851, 276],
    [850, 275],
    [849, 274],
    [849, 273],
    [847, 272],
    [846, 271],
    [845, 270],
    [844, 269],
    [843, 268],
    [842, 267],
    [841, 266],
    ...getCoord(841, 205, 266, 'x'),
    [205, 266],
    ...getCoord(-1, 50),
    [174, 287],
    [174, 288],
    [174, 289],
    [174, 290],
    [175, 291],
    [176, 292],
    [177, 293],
    [178, 294],
    [179, 295],
    [180, 296],
    ...getCoord(180, 189, 296, 'x'),
    [189, 296],
    [190, 296],
    [191, 297],
    [192, 298],
    [193, 299],
    [194, 300],
    [195, 301],
    [196, 302],
    [197, 302],
    [197, 303],
    [197, 304],
    [197, 305],
  ];
  const PathYellow = [
    [272, 541],
    ...getCoord(272, 275, 541, 'x'),
    [275, 541],
    [275, 540],
    [275, 539],
    [276, 538],
    [277, 537],
    [277, 536],
    [278, 535],
    ...getCoord(535, 475, 278, 'y'),
    [278, 475],
    [279, 474],
    [280, 473],
    [281, 472],
    [282, 471],
    [284, 470],
    [285, 469],
    ...getCoord(285, 295, 469, 'x'),
    [295, 469],
    ...getCoord(-1, 45),
    [319, 448],
    ...getCoord(448, 434, 319, 'y'),
    [319, 434],
    [320, 434],
    [321, 433],
    [322, 432],
    [323, 431],
    [324, 430],
    [325, 429],
    [326, 428],
    ...getCoord(326, 351, 428, 'x'),
    [351, 428],
  ];
  const PathGreen = [
    [51, 530],
    ...getCoord(530, 496, 51, 'y'),
    [51, 496],
    [51, 496],
    [52, 495],
    [53, 495],
    [54, 494],
    [55, 493],
    [56, 492],
    [57, 491],
    [58, 490],
    [59, 489],
    ...getCoord(59, 135, 489, 'x'),
    [135, 489],
    [136, 488],
    [137, 486],
    [138, 485],
    [139, 484],
    [141, 483],
    [141, 482],
    ...getCoord(482, 462, 141, 'y'),
    ...getCoord(-1, 30),
    ...getCoord(432, 406, 141, 'y'),
    ...getCoord(-1, 40),
    ...getCoord(371, 338, 141, 'y'),
    ...getCoord(-1, 45),
    ...getCoord(159, 180, 322, 'x'),
    ...getCoord(-1, 40),
    ...getCoord(214, 422, 322, 'x'),
    [422, 322],
    [422, 323],
    [423, 324],
    [424, 325],
    [425, 326],
    [426, 327],
    [427, 328],
    [428, 329],
    ...getCoord(329, 422, 428, 'y'),
    [428, 413],
    ...getCoord(-1, 5),
    ...getCoord(442, 462, 422, 'x'),
    ...getCoord(-1, 45),
    ...getCoord(462, 444, 434, 'x'),
    ...getCoord(-1, 5),
    ...getCoord(442, 456, 428, 'y'),
  ];
  const PathBlueLeft = [
    [127, 689],
    ...getCoord(689, 684, 127, 'y'),
    [127, 684],
    [127, 683],
    [127, 682],
    [127, 681],
    [126, 680],
    [126, 679],
    [125, 678],
    ...getCoord(125, 111, 678, 'x'),
    [111, 678],
    [110, 677],
    [109, 675],
    [108, 674],
    [107, 673],
    [106, 672],
    [105, 670],
    [104, 663],
    ...getCoord(-1, 40),
    [104, 630],
    ...getCoord(630, 593, 104, 'y'),
    [104, 593],
    [103, 592],
    [102, 591],
    [101, 590],
    [100, 589],
    [99, 588],
    ...getCoord(99, 9, 588, 'x'),
    [9, 588],
    [8, 587],
    [7, 586],
    [6, 585],
    [5, 583],
    [4, 582],
    [3, 581],
    [2, 580],
    [1, 579],
    [0, 578],
    ...getCoord(578, 279, 0, 'y'),
    [0, 279],
    [0, 278],
    [0, 277],
    [0, 276],
    [1, 275],
    [2, 274],
    [3, 273],
    [4, 272],
    [5, 271],
    [6, 270],
    [7, 269],
    [8, 268],
    [9, 267],
    ...getCoord(9, 131, 267, 'x'),
    [131, 267],
    ...getCoord(-1, 60),
    [174, 285],
    ...getCoord(285, 290, 174, 'y'),
    [174, 290],
    [175, 290],
    [176, 291],
    [177, 292],
    [178, 293],
    [179, 294],
    [180, 295],
    [181, 296],
    [182, 296],
    ...getCoord(182, 190, 296, 'x'),
    [190, 296],
    [191, 296],
    [192, 297],
    [193, 298],
    [194, 299],
    [195, 300],
    [196, 301],
    [197, 302],
    [197, 303],
    [197, 304],
    [197, 305],
    [197, 306],
  ];
  // return { PathBlueLeft, PathBlueRight };
  return { PathRed, PathBlueLeft, PathBlueRight, PathGreen, PathYellow };
}

function getCoord(start, end, otherVal, type) {
  // 填充空值, 隐藏小球
  if (start < 0) {
    return new Array(end).fill([-1, -1]);
  }
  if (type === 'x') {
    if (end > start) {
      return new Array(end - start - 1).fill(1).map((_, ind) => [start + ind + 1, otherVal]);
    }
    return new Array(start - end - 1).fill(1).map((_, ind) => [start - ind - 1, otherVal]);
  }
  if (end > start) {
    return new Array(end - start - 1).fill(1).map((_, ind) => [otherVal, start + ind + 1]);
  }
  return new Array(start - end - 1).fill(1).map((_, ind) => [otherVal, start - ind - 1]);
}


function listenVisible(cb) {
  let hidden, visibilityEventName;
  // Opera 12.10 and Firefox 18 and later support
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityEventName = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityEventName = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityEventName = 'webkitvisibilitychange';
  }

  const onVisibilityChange = (e) => cb(document[hidden], e);

  // 如果浏览器不支持 addEventListener 或 Page Visibility API 给出警告
  if (typeof document.addEventListener !== 'function' || typeof document[hidden] === 'undefined') {
    throw new Error('The browser not support Visibility API.');
  }
  document.addEventListener(visibilityEventName, onVisibilityChange, false);
  return () => document.removeEventListener(visibilityEventName, onVisibilityChange, false);
}
