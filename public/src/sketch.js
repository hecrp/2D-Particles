import { params, colorPalettes, LAYERS, GOLDEN_RATIO } from './config.js';
import { setupGUI } from './gui.js';
import { initParticles, updateAndDrawParticles } from './particleSystem.js';
import { updateAndDrawFireworks, createFirework, findClosestPoint } from './fireworks.js';
import { lerpColorPalette } from './utils.js';

let points = [];
let fireworks = [];
let t = 0;
export let zoom = 1; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    frameRate(60);
    
    points = initParticles();
    setupGUI();
}

function draw() {
    blendMode(BLEND);
    background(params.backgroundColor);
    
    push();
    translate(width/2, height/2);
    scale(zoom);
    translate(-width/2, -height/2);
    
    t += params.colorSpeed;
    const selectedPalette = colorPalettes[params.colorPalette];
    const [color1, color2] = lerpColorPalette(t, selectedPalette);

    if (params.useGradient) {
        setGradient(color1, color2);
    }

    updateAndDrawParticles(points, t, color1, color2, zoom, mouseX, mouseY);
    updateAndDrawFireworks(fireworks);

    pop();
}

function mousePressed() {
    const mx = (mouseX - width/2)/zoom + width/2;
    const my = (mouseY - height/2)/zoom + height/2;
    const closestPoint = findClosestPoint(mx, my, points);
    createFirework(mx, my, fireworks, closestPoint);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    const zoomChange = -event.delta * params.zoomSpeed / 1000;
    zoom = constrain(zoom + zoomChange, params.minZoom, params.maxZoom);
    return false;
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.windowResized = windowResized;
window.mouseWheel = mouseWheel;