"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

$(document).ready(function () {
  $('body').AddClassAnimation();
  var $burger = $('.js-header-burger');
  var $nav = $('.js-header-toggle nav');
  $burger.on('click', function () {
    $(this).toggleClass('open');
    $('.header').toggleClass('open');
    $nav.toggleClass('open');
    $('body').toggleClass('fixed-position');
  });
  $('.header__menu-item a').click(function () {
    $('a.active').removeClass('active');
    $(this).addClass('active');
    $('.js-header-burger').removeClass('open');
    $('.header').removeClass('open');
    $('.js-header-toggle nav').removeClass('open');
    $('.header__burger-letter').removeClass('open');
    $('.header__nav').removeClass('open');
    $('body').removeClass('fixed-position');
  });
  $('.js-to-item').on('click', function () {
    scrollToItem($(this));
  });
  $('.js-next').click(function (e) {
    var selected = $('.js-list-item.js-current-panel');
    var anchors = $('.js-list-item');
    var pos = anchors.index(selected);
    var next = anchors.get(pos + 1);
    var header = $('.js-header').outerHeight() + 50;
    target = $(next);
    $(selected).removeClass('js-current-panel');
    $(next).addClass('js-current-panel');

    if (target.offset()) {
      $('html, body').animate({
        scrollTop: target.offset().top + header + 'px'
      }, 600);
    }

    e.preventDefault();
  });
  $(window).scroll(function () {
    var height = $(window).scrollTop();

    if (height > 1) {
      $('.js-header').addClass('is-scroll');
    } else {
      $('.js-header').removeClass('is-scroll');
    }

    var $sections = $('section');
    $sections.each(function (i, el) {
      var top = $(el).offset().top - 100;
      var bottom = top + $(el).height();
      var scroll = $(window).scrollTop();
      var id = $(el).attr('id');

      if (scroll > top && scroll < bottom) {
        $('a.active').removeClass('active');
        $('a[href="#' + id + '"]').addClass('active');
      }
    });
  });
}); //Scroll animation

(function ($) {
  var addClassAnimation = {
    elementAnim: '.js-animate',
    classAnim: 'is-animated'
  };

  addClassAnimation.add = function () {
    var element = this.elementAnim;
    var addClass = this.classAnim;
    $(element).each(function () {
      var $this = $(this);
      var offsetEl = $this.offset();

      if (offsetEl.top <= $(document).scrollTop() + $(window).height() / 1.3) {
        $this.addClass(addClass);
      }
    });
  };

  $.fn.AddClassAnimation = function (options) {
    if (options && _typeof(options) === 'object') {
      $.extend(addClassAnimation, options);
    }

    var $this = $(this);
    addClassAnimation.add($this);
    $(window).on('scroll', function () {
      addClassAnimation.add($this);
    });
    return this;
  };
})(jQuery); //Scroll animation END
// scroll to element


function scrollToItem(elem) {
  var el = $(elem).attr('href').slice(1),
      elToScroll = $("#".concat(el)),
      navHeight = $('.js-header').outerHeight() + 20,
      time = 600,
      gap = 20,
      offsetTop = elToScroll.offset().top,
      totalScroll = offsetTop - navHeight - gap;
  $('body,html').animate({
    scrollTop: totalScroll
  }, time);
  return false;
}

moveElem();

function moveElem() {
  var blockfrom = $('.js-remove--from').html();
  $('.js-remove--to').html(blockfrom);
  return false;
}

var msg = document.querySelector('.msg');
var gsapMsg = gsap.to('.msg', 0.25, {
  autoAlpha: 1,
  y: -40,
  ease: Expo.inOut,
  paused: true
});
var arrInput = document.querySelectorAll('.aInput');

function send(event, php) {
  // event.preventDefault ? event.preventDefault() : event.returnValue = false;
  for (var i = 0, count = arrInput.length; i < count; i++) {
    arrInput[i].classList.remove('inputerror');
  }

  event.target.querySelector('button').disabled = true;
  showMsg('Wait. Sending...', '#b1b1b1');
  var req = new XMLHttpRequest();
  req.open('POST', php, true);

  req.onload = function () {
    event.target.querySelector('button').disabled = false;

    if (req.status >= 200 && req.status < 400) {
      var json = JSON.parse(this.response);

      if (json.result === 'success') {
        showMsg('Message send', '#36AE46', '1000');
        setTimeout(function () {
          document.getElementsByClassName('msg')[0].style.opacity = '0';
        }, 2000);
        event.target.reset();
      } else if (json.result === 'email') {
        showMsg('Error. Need email', '#DC352F');
        setTimeout(function () {
          document.getElementsByClassName('msg')[0].style.opacity = '0';
        }, 2000);
        document.querySelector('#email').classList.add('inputerror');
      }
    } else {
      showMsg('Server error. number: ' + req.status, '#DC352F');
      setTimeout(function () {
        document.getElementsByClassName('msg')[0].style.opacity = '0';
      }, 2000);
    }
  };

  req.onerror = function () {
    showMsg('Error sending request', '#DC352F');
  };

  req.send(new FormData(event.target));
}

function showMsg(message, color) {
  msg.innerText = message;
  msg.style.background = color;
  gsapMsg.restart();
}

function inputFile(e) {
  var el = e.target.parentNode.querySelector('.count');
  if (e.target.value !== '') el.innerHTML = 'Selected files: ' + e.target.files.length;else el.innerHTML = 'Select file';
}

for (var i = 0, count = arrInput.length; i < count; i++) {
  arrInput[i].addEventListener('focus', function () {
    this.nextElementSibling.classList.add('active');
  });
  arrInput[i].addEventListener('blur', function () {
    if (this.value === false) {
      this.nextElementSibling.classList.remove('active');
    }
  });
}

window.onload = function () {
  var loadPage = gsap.timeline();
  loadPage.to('#form', 0.7, {
    autoAlpha: 1,
    y: 0,
    ease: Expo.inOut
  });
}; //sphere


if (document.getElementById('canvasOne')) {
  var windowLoadHandler = function windowLoadHandler() {
    canvasApp();
  };

  var canvasSupport = function canvasSupport() {
    return Modernizr.canvas;
  };

  var canvasApp = function canvasApp() {
    if (!canvasSupport()) {
      return;
    }

    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");
    var displayWidth;
    var displayHeight;
    var timer;
    var wait;
    var count;
    var numToAddEachFrame;
    var particleList;
    var recycleBin;
    var particleAlpha;
    var r, g, b;
    var fLen;
    var m;
    var projCenterX;
    var projCenterY;
    var zMax;
    var turnAngle;
    var turnSpeed;
    var sphereCenterX, sphereCenterY, sphereCenterZ;
    var particleRad;
    var zeroAlphaDepth;
    var randAccelX, randAccelY, randAccelZ;
    var gravity;
    var rgbString; //we are defining a lot of variables used in the screen update functions globally so that they don't have to be redefined every frame.

    var p;
    var outsideTest;
    var nextParticle;
    var sinAngle;
    var cosAngle;
    var rotX, rotZ;
    var depthAlphaFactor;
    var i;
    var theta, phi;
    var x0, y0, z0;
    init();

    function init() {
      wait = 1;
      count = wait - 1;
      numToAddEachFrame = 8; //particle color

      r = 34;
      g = 128;
      b = 252;
      rgbString = "rgba(" + r + "," + g + "," + b + ","; //partial string for color which will be completed by appending alpha value.

      particleAlpha = 1; //maximum alpha

      displayWidth = theCanvas.width;
      displayHeight = theCanvas.height;
      fLen = 320; //represents the distance from the viewer to z=0 depth.
      //projection center coordinates sets location of origin

      projCenterX = displayWidth / 2;
      projCenterY = displayHeight / 2; //we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).

      zMax = fLen - 2;
      particleList = {};
      recycleBin = {}; //random acceleration factors - causes some random motion

      randAccelX = 0.1;
      randAccelY = 0.1;
      randAccelZ = 0.1;
      gravity = -0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.

      particleRad = 2.5;
      sphereCenterX = 0;
      sphereCenterY = 0;
      sphereCenterZ = -2 - sphereRad; //alpha values will lessen as particles move further back, causing depth-based darkening:

      zeroAlphaDepth = -750;
      turnSpeed = 2 * Math.PI / 1200; //the sphere will rotate at this speed (one complete rotation every 1600 frames).

      turnAngle = 0; //initial angle

      timer = setInterval(onTimer, 10 / 24);
    }

    function onTimer() {
      //if enough time has elapsed, we will add new particles.
      count++;

      if (count >= wait) {
        count = 0;

        for (i = 0; i < numToAddEachFrame; i++) {
          theta = Math.random() * 2 * Math.PI;
          phi = Math.acos(Math.random() * 2 - 1);
          x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
          y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
          z0 = sphereRad * Math.cos(phi); //We use the addParticle function to add a new particle. The parameters set the position and velocity components.
          //Note that the velocity parameters will cause the particle to initially fly outwards away from the sphere center (after
          //it becomes unstuck).

          var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0); //we set some "envelope" parameters which will control the evolving alpha of the particles.

          p.attack = 50;
          p.hold = 50;
          p.decay = 100;
          p.initValue = 0;
          p.holdValue = particleAlpha;
          p.lastValue = 0; //the particle will be stuck in one place until this time has elapsed:

          p.stuckTime = 90 + Math.random() * 20;
          p.accelX = 0;
          p.accelY = gravity;
          p.accelZ = 0;
        }
      } //update viewing angle


      turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
      sinAngle = Math.sin(turnAngle);
      cosAngle = Math.cos(turnAngle); //background fill

      context.fillStyle = "#fff";
      context.fillRect(0, 0, displayWidth, displayHeight); //update and draw particles

      p = particleList.first;

      while (p != null) {
        //before list is altered record next particle
        nextParticle = p.next; //update age

        p.age++; //if the particle is past its "stuck" time, it will begin to move.

        if (p.age > p.stuckTime) {
          p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
          p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
          p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);
          p.x += p.velX;
          p.y += p.velY;
          p.z += p.velZ;
        }
        /*
        We are doing two things here to calculate display coordinates.
        The whole display is being rotated around a vertical axis, so we first calculate rotated coordinates for
        x and z (but the y coordinate will not change).
        Then, we take the new coordinates (rotX, y, rotZ), and project these onto the 2D view plane.
        */


        rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
        rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
        m = radius_sp * fLen / (fLen - rotZ);
        p.projX = rotX * m + projCenterX;
        p.projY = p.y * m + projCenterY; //update alpha according to envelope parameters.

        if (p.age < p.attack + p.hold + p.decay) {
          if (p.age < p.attack) {
            p.alpha = (p.holdValue - p.initValue) / p.attack * p.age + p.initValue;
          } else if (p.age < p.attack + p.hold) {
            p.alpha = p.holdValue;
          } else if (p.age < p.attack + p.hold + p.decay) {
            p.alpha = (p.lastValue - p.holdValue) / p.decay * (p.age - p.attack - p.hold) + p.holdValue;
          }
        } else {
          p.dead = true;
        } //see if the particle is still within the viewable range.


        if (p.projX > displayWidth || p.projX < 0 || p.projY < 0 || p.projY > displayHeight || rotZ > zMax) {
          outsideTest = true;
        } else {
          outsideTest = false;
        }

        if (outsideTest || p.dead) {
          recycle(p);
        } else {
          //depth-dependent darkening
          depthAlphaFactor = 1 - rotZ / zeroAlphaDepth;
          depthAlphaFactor = depthAlphaFactor > 1 ? 1 : depthAlphaFactor < 0 ? 0 : depthAlphaFactor;
          context.fillStyle = rgbString + depthAlphaFactor * p.alpha + ")"; //draw

          context.beginPath();
          context.arc(p.projX, p.projY, m * particleRad, 0, 2 * Math.PI, false);
          context.closePath();
          context.fill();
        }

        p = nextParticle;
      }
    }

    function addParticle(x0, y0, z0, vx0, vy0, vz0) {
      var newParticle;
      var color; //check recycle bin for available drop:

      if (recycleBin.first != null) {
        newParticle = recycleBin.first; //remove from bin

        if (newParticle.next != null) {
          recycleBin.first = newParticle.next;
          newParticle.next.prev = null;
        } else {
          recycleBin.first = null;
        }
      } //if the recycle bin is empty, create a new particle (a new ampty object):
      else {
          newParticle = {};
        } //add to beginning of particle list


      if (particleList.first == null) {
        particleList.first = newParticle;
        newParticle.prev = null;
        newParticle.next = null;
      } else {
        newParticle.next = particleList.first;
        particleList.first.prev = newParticle;
        particleList.first = newParticle;
        newParticle.prev = null;
      } //initialize


      newParticle.x = x0;
      newParticle.y = y0;
      newParticle.z = z0;
      newParticle.velX = vx0;
      newParticle.velY = vy0;
      newParticle.velZ = vz0;
      newParticle.age = 0;
      newParticle.dead = false;

      if (Math.random() < 0.5) {
        newParticle.right = true;
      } else {
        newParticle.right = false;
      }

      return newParticle;
    }

    function recycle(p) {
      //remove from particleList
      if (particleList.first == p) {
        if (p.next != null) {
          p.next.prev = null;
          particleList.first = p.next;
        } else {
          particleList.first = null;
        }
      } else {
        if (p.next == null) {
          p.prev.next = null;
        } else {
          p.prev.next = p.next;
          p.next.prev = p.prev;
        }
      } //add to recycle bin


      if (recycleBin.first == null) {
        recycleBin.first = p;
        p.prev = null;
        p.next = null;
      } else {
        p.next = recycleBin.first;
        recycleBin.first.prev = p;
        recycleBin.first = p;
        p.prev = null;
      }
    }
  };

  window.addEventListener("load", windowLoadHandler, false);
  var sphereRad = 430;
  var radius_sp = 1;
} // sphere new


if (document.getElementById('scene')) {
  var createDots = function createDots() {
    // Empty the array of dots
    dots.length = 0; // Create a new dot based on the amount needed

    for (var _i = 0; _i < DOTS_AMOUNT; _i++) {
      var theta = Math.random() * 2 * Math.PI; // Random value between [0, 2PI]

      var phi = Math.acos(Math.random() * 2 - 1); // Random value between [-1, 1]
      // Calculate the [x, y, z] coordinates of the dot along the globe

      var x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
      var y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
      var z = GLOBE_RADIUS * Math.cos(phi) + GLOBE_CENTER_Z;
      dots.push(new Dot(x, y, z));
    }
  };
  /* ====================== */

  /* ======== RENDER ====== */

  /* ====================== */


  var render = function render(a) {
    // Clear the scene
    ctx.clearRect(0, 0, width, height); // Increase the globe rotation

    rotation = a * 0.0004;
    var sineRotation = Math.sin(rotation); // Sine of the rotation

    var cosineRotation = Math.cos(rotation); // Cosine of the rotation
    // Loop through the dots array and draw every dot

    for (var i = 0; i < dots.length; i++) {
      dots[i].draw(sineRotation, cosineRotation);
    }

    window.requestAnimationFrame(render);
  }; // Function called after the user resized its screen


  var afterResize = function afterResize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    if (window.devicePixelRatio > 1) {
      canvas.width = canvas.clientWidth * 2;
      canvas.height = canvas.clientHeight * 2;
      ctx.scale(2, 2);
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    GLOBE_RADIUS = width * 0.7;
    GLOBE_CENTER_Z = -GLOBE_RADIUS;
    PROJECTION_CENTER_X = width / 2;
    PROJECTION_CENTER_Y = height / 2;
    FIELD_OF_VIEW = width * 0.8;
    createDots(); // Reset all dots
  }; // Variable used to store a timeout when user resized its screen


  // Function called right after user resized its screen
  var onResize = function onResize() {
    // Clear the timeout variable
    resizeTimeout = window.clearTimeout(resizeTimeout); // Store a new timeout to avoid calling afterResize for every resize event

    resizeTimeout = window.setTimeout(afterResize, 500);
  };

  // Get the canvas element from the DOM
  var canvas = document.querySelector('#scene');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight; // Store the 2D context

  var ctx = canvas.getContext('2d');

  if (window.devicePixelRatio > 1) {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
  }
  /* ====================== */

  /* ====== VARIABLES ===== */

  /* ====================== */


  var width = canvas.clientWidth; // Width of the canvas

  var height = canvas.clientHeight; // Height of the canvas

  var rotation = 0; // Rotation of the globe

  var dots = []; // Every dots in an array

  /* ====================== */

  /* ====== CONSTANTS ===== */

  /* ====================== */

  /* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */

  var DOTS_AMOUNT = 1000; // Amount of dots on the screen

  var DOT_RADIUS = 2; // Radius of the dots

  var GLOBE_RADIUS = width * 0.7; // Radius of the globe

  var GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center

  var PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML

  var PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML

  var FIELD_OF_VIEW = width * 0.8;

  var Dot = /*#__PURE__*/function () {
    function Dot(x, y, z) {
      _classCallCheck(this, Dot);

      this.x = x;
      this.y = y;
      this.z = z;
      this.xProject = 0;
      this.yProject = 0;
      this.sizeProjection = 0;
    } // Do some math to project the 3D position into the 2D canvas


    _createClass(Dot, [{
      key: "project",
      value: function project(sin, cos) {
        var rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
        var rotZ = -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
        this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
        this.xProject = rotX * this.sizeProjection + PROJECTION_CENTER_X;
        this.yProject = this.y * this.sizeProjection + PROJECTION_CENTER_Y;
      } // Draw the dot on the canvas

    }, {
      key: "draw",
      value: function draw(sin, cos) {
        this.project(sin, cos); // ctx.fillRect(this.xProject - DOT_RADIUS, this.yProject - DOT_RADIUS, DOT_RADIUS * 2 * this.sizeProjection, DOT_RADIUS * 2 * this.sizeProjection);

        ctx.beginPath();
        ctx.arc(this.xProject, this.yProject, DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "#FFD449";
        ctx.fill();
      }
    }]);

    return Dot;
  }();

  var resizeTimeout;
  window.addEventListener('resize', onResize); // Populate the dots array with random dots

  createDots(); // Render the scene

  window.requestAnimationFrame(render);
} // lines


if (document.getElementById('lines')) {
  var svgEl = document.querySelector('.animated-lines');

  var randomRange = function randomRange(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
  };

  var numberOfLines = 20,
      lineDataArr = [];

  var createPathString = function createPathString() {
    var completedPath = '',
        comma = ',',
        ampl = 50; // pixel range from 0, aka how deeply they bend

    for (var i = 0; i < numberOfLines; i++) {
      var path = lineDataArr[i];
      var current = {
        x: ampl * Math.sin(path.counter / path.sin),
        y: ampl * Math.cos(path.counter / path.cos)
      };
      var newPathSection = 'M' + // starting point
      path.startX + comma + path.startY + // quadratic control point
      ' Q' + path.pointX + comma + (current.y * 1.5).toFixed(3) + // 1.5 to amp up the bend a little
      // center point intersection
      ' ' + (current.x / 10 + path.centerX).toFixed(3) + comma + (current.y / 5 + path.centerY).toFixed(3) + // end point with quadratic reflection (T) (so the bottom right mirrors the top left)
      ' T' + path.endX + comma + path.endY;
      path.counter++;
      completedPath += newPathSection;
    }

    ;
    return completedPath;
  };

  var createLines = function createLines() {
    var newPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
        // higher is slower
    minSpeed = 85,
        maxSpeed = 150; // create an arr which contains objects for all lines
    // createPathString() will use this array

    for (var i = 0; i < numberOfLines; i++) {
      var lineDataObj = {
        counter: randomRange(1, 500),
        // a broad counter range ensures lines start at different cycles (will look more random)
        startX: randomRange(-5, -40),
        startY: randomRange(-5, -30),
        endX: randomRange(200, 220),
        // viewbox = 200
        endY: randomRange(120, 140),
        // viewbox = 120
        sin: randomRange(minSpeed, maxSpeed),
        cos: randomRange(minSpeed, maxSpeed),
        pointX: randomRange(30, 55),
        centerX: randomRange(90, 120),
        centerY: randomRange(60, 70)
      };
      lineDataArr.push(lineDataObj);
    }

    var animLoop = function animLoop() {
      newPathEl.setAttribute('d', createPathString());
      requestAnimationFrame(animLoop);
    }; // once the path elements are created, start the animation loop


    svgEl.appendChild(newPathEl);
    animLoop();
  };

  createLines();
}