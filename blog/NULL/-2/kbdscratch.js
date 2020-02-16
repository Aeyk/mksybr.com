
var Canvas = Canvas || {};

// nil -> (Option<CanvasDOM>, Option<CanvasRenderingContext2D>)
Canvas.init = function() { 
    Canvas._canvas = document.querySelector("canvas");
    Canvas._ctx    = Canvas._canvas.getContext('2d');
    if(Canvas._ctx) {
	return [Canvas._canvas, Canvas._ctx]
    } else {
	console.log("TODO: You must use a <canvas> supported browser.");
    }
    return [nil, nil];
}

// EventListener ->
// sets up four touch event listeners
function touchEventInit(el) {
    el.addEventListener("touchstart" , handleTouchStart , false);
    el.addEventListener("touchend"   , handleTouchEnd   , false);
    el.addEventListener("touchcancel", handleTouchCancel, false);
    el.addEventListener("touchmove"  , handleTouchMove  , false);      
}

function startup() {
    const [canvas, ctx] = Canvas.init();
    touchEventInit(canvas);
}

var ongoingTouches = [];

document.addEventListener("DOMContentLoaded", startup);


// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
// TODO FINISH COPYING THIS ^
function handleTouchStart(event) {
    event.preventDefault();      
}
function handleTouchEnd(event) {}
function handleTouchCancel(event) {}
function handleTouchMove(event){}

function drawRectOnMouse() {
    
}
