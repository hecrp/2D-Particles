import { params, LAYERS, GOLDEN_RATIO, colorPalettes } from './config.js';
import { getNoise, drawParticleShape } from './utils.js';

export function initParticles() {
    const points = new Array(LAYERS);
    const particlesPerLayer = Math.floor(1000 / LAYERS);
    const selectedPalette = colorPalettes[params.colorPalette];

    for (let layer = 0; layer < LAYERS; layer++) {
        points[layer] = new Array(particlesPerLayer);
        for (let i = 0; i < particlesPerLayer; i++) {
            points[layer][i] = {
                pos: createVector(random(width), random(height)),
                life: random(params.lifespan),
                alpha: 0,
                layer: layer,
                col: color(random(selectedPalette))
            };
        }
    }
    return points;
}

export function updateAndDrawParticles(points, t, color1, color2, zoom, mouseX, mouseY) {
    // valores comunes
    const noiseScale = 0.02;
    const timeScale = t * 0.001;
    const adjustedMouseX = (mouseX - width/2)/zoom + width/2;
    const adjustedMouseY = (mouseY - height/2)/zoom + height/2;

    for (let layer = 0; layer < LAYERS; layer++) {
        const layerPoints = points[layer];
        if (!Array.isArray(layerPoints)) continue; // Saltar si la capa no es un array

        const layerDepth = layer * params.layerDepth;
        const layerAlpha = map(layer, 0, LAYERS - 1, 50, 255);
        const layerFactor = (layer + 1) / LAYERS;

        for (let i = layerPoints.length - 1; i >= 0; i--) {
            const point = layerPoints[i];
            updateAndDrawPoint(point, i, layer, color1, color2, t, zoom, layerPoints, layerAlpha, noiseScale, timeScale, layerDepth, layerFactor, adjustedMouseX, adjustedMouseY);
        }
    }
}

function updateAndDrawPoint(point, index, layer, color1, color2, t, zoom, layerPoints, layerAlpha, noiseScale, timeScale, layerDepth, layerFactor, mouseX, mouseY) {
    const p = point.pos;
    let alpha = point.alpha;
    
    let mouseEffect = createVector(0, 0);
    const distToMouse = dist(p.x, p.y, mouseX, mouseY);
    const angleToMouse = atan2(p.y - mouseY, p.x - mouseX);
    
    switch (params.mouseEffectMode) {
        case 'attract':
            if (distToMouse < params.attractRepelRadius) {
                mouseEffect = createVector(mouseX - p.x, mouseY - p.y)
                    .setMag(map(distToMouse, 0, params.attractRepelRadius, params.mouseEffectIntensity, 0));
            }
            break;
        case 'repel':
            if (distToMouse < params.attractRepelRadius) {
                mouseEffect = createVector(p.x - mouseX, p.y - mouseY)
                    .setMag(map(distToMouse, 0, params.attractRepelRadius, params.mouseEffectIntensity, 0));
            }
            break;
        case 'swirl':
            if (distToMouse < params.swirlRadius) {
                const swirlForce = map(distToMouse, 0, params.swirlRadius, params.swirlStrength, 0);
                mouseEffect = createVector(cos(angleToMouse + HALF_PI), sin(angleToMouse + HALF_PI))
                    .mult(swirlForce * params.mouseEffectIntensity);
            }
            break;
        case 'vortex':
            if (distToMouse < params.swirlRadius) {
                const vortexForce = map(distToMouse, 0, params.swirlRadius, params.swirlStrength, 0);
                const timeOffset = t * params.vortexRotationSpeed;
                const spiralAngle = angleToMouse + (distToMouse / params.swirlRadius) * TWO_PI * params.vortexComplexity;
                const spiralX = cos(spiralAngle + timeOffset) * distToMouse / params.swirlRadius;
                const spiralY = sin(spiralAngle + timeOffset) * distToMouse / params.swirlRadius;
                
                const attractionForce = map(distToMouse, 0, params.swirlRadius, 0.1, 0);
                const vortexIntensity = params.mouseEffectIntensity * 2; // Duplicamos la intensidad para el vórtice
                mouseEffect.x = (spiralX - (p.x - mouseX) * attractionForce) * vortexForce * vortexIntensity;
                mouseEffect.y = (spiralY - (p.y - mouseY) * attractionForce) * vortexForce * vortexIntensity;
                
                const suctionForce = map(distToMouse, 0, params.swirlRadius, 0.05, 0) * vortexIntensity;
                mouseEffect.add(p5.Vector.sub(createVector(mouseX, mouseY), p).setMag(suctionForce));
            }
            break;
        case 'wave':
            let waveDistance;
            if (params.wavePropagation === 'circular') {
                waveDistance = distToMouse;
            } else {
                waveDistance = abs(p.x - mouseX);
            }
            const wavePhase = (waveDistance - t * params.waveSpeed) * params.waveFrequency;
            let waveForce;
            switch (params.waveType) {
                case 'sine':
                    waveForce = sin(wavePhase);
                    break;
                case 'square':
                    waveForce = sin(wavePhase) > 0 ? 1 : -1;
                    break;
                case 'triangle':
                    waveForce = asin(sin(wavePhase)) * 2 / PI;
                    break;
                case 'sawtooth':
                    waveForce = (wavePhase % TWO_PI) / TWO_PI * 2 - 1;
                    break;
            }
            waveForce *= params.waveAmplitude * exp(-waveDistance * params.waveDecay);
            if (params.wavePropagation === 'circular') {
                mouseEffect = p5.Vector.fromAngle(angleToMouse).mult(waveForce);
            } else {
                mouseEffect = createVector(0, waveForce);
            }
            mouseEffect.mult(params.mouseEffectIntensity);
            break;
    }

    const noiseValue = getNoise(p.x * noiseScale, p.y * noiseScale, t * timeScale);
    const angle = noiseValue * TWO_PI * GOLDEN_RATIO;
    const noiseDirection = createVector(cos(angle), sin(angle))
        .setMag(params.speed * layerFactor * params.noiseIntensity);

    p.add(noiseDirection).add(mouseEffect);

    p.x = (p.x + width) % width;
    p.y = (p.y + height) % height;

    const d = dist(p.x, p.y, width / 2, height / 2);
    const size = map(d, 0, width / 2, params.maxSize, 0.5) * layerFactor;
    const col = lerpColor(color1, color2, d / (width / 2));
    
    for (let j = 0; j < 3; j++) {
        const trailAlpha = map(j, 0, 3, alpha, 0) * (layerAlpha / 255);
        const trailSize = map(j, 0, 3, size, size * 0.5);
        const trailCol = color(red(col), green(col), blue(col), trailAlpha);
        drawParticleShape(p.x - noiseDirection.x * j * 2, p.y - noiseDirection.y * j * 2, trailSize, trailCol);
    }

    col.setAlpha(alpha * (layerAlpha / 255));
    drawParticleShape(p.x, p.y, size, col);

    if (point.life > params.lifespan * 0.8) {
        alpha = map(point.life, params.lifespan, params.lifespan * 0.8, 0, 255);
    } else if (point.life < params.lifespan * 0.2) {
        alpha = map(point.life, params.lifespan * 0.2, 0, 255, 0);
    } else {
        alpha = 255;
    }

    point.alpha = alpha;
    point.col = col;

    point.life--;
    if (point.life <= 0) {
        layerPoints[index] = { 
            pos: createVector(random(width), random(height)), 
            life: params.lifespan, 
            alpha: 0,
            layer: layer,
            col: color(random(colorPalettes[params.colorPalette]))
        };
    }
}

let particleTexture;

function preload() {
    particleTexture = loadImage('particle.png');
}

function setup() {
    imageMode(CENTER);
}

function drawParticle(x, y, size, color) {
    tint(color);
    image(particleTexture, x, y, size, size);
}