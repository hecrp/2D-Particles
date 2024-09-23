import { params } from './config.js';

export function lerpColorPalette(t, colorPalette) {
    const colorIndex = Math.floor(t % colorPalette.length);
    const nextColorIndex = (colorIndex + 1) % colorPalette.length;
    const lerpAmount = t % 1;

    const color1 = lerpColor(
        color(colorPalette[colorIndex]),
        color(colorPalette[nextColorIndex]),
        lerpAmount
    );
    const color2 = lerpColor(
        color(colorPalette[(colorIndex + 3) % colorPalette.length]),
        color(colorPalette[(nextColorIndex + 3) % colorPalette.length]),
        lerpAmount
    );

    return [color1, color2];
}

export function getNoise(x, y, z) {
    switch (params.noiseFunction) {
        case 'simplex':
            return simplexNoise(x, y, z);
        case 'worley':
            return worleyNoise(x, y, z);
        default:
            return noise(x, y, z);
    }
}

export function simplexNoise(x, y, z) {
    // Implementación simplificada de ruido Simplex
    return (noise(x, y, z) * 2 - 1);
}

export function worleyNoise(x, y, z) {
    // Implementación simplificada de ruido de Worley
    return (noise(x * 2, y * 2, z * 2) * noise(x * 4, y * 4, z * 4));
}

export function spiralTrajectory(t, maxLife) {
    const angle = t * TWO_PI * params.spiralTurns;
    const radius = (maxLife - t) / maxLife * params.explosionRadius;
    return createVector(cos(angle) * radius, sin(angle) * radius);
}

export function heartTrajectory(t, maxLife) {
    const angle = t * TWO_PI;
    const x = 16 * pow(sin(angle), 3);
    const y = 13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle);
    return createVector(x, -y).mult(0.2 * params.explosionRadius / 5);
}

export function drawParticleShape(x, y, size, fillColor) {
    const c = applyColorSettings(fillColor);
    fill(c);
    
    switch (params.particleShape) {
        case 'circle':
            ellipse(x, y, size, size);
            break;
        case 'square':
            rectMode(CENTER);
            rect(x, y, size, size);
            break;
        case 'triangle':
            triangle(x, y - size/2, x - size/2, y + size/2, x + size/2, y + size/2);
            break;
        case 'star':
            drawStar(x, y, size/2, size/4, 5);
            break;
        case 'flower':
            drawFlower(x, y, size/2, 6);
            break;
        case 'morph':
            drawMorphShape(x, y, size);
            break;
    }
}

function drawStar(x, y, radius1, radius2, npoints) {
    const angle = TWO_PI / npoints;
    const halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function drawFlower(x, y, radius, nPetals) {
    for (let i = 0; i < nPetals; i++) {
        const angle = TWO_PI / nPetals * i;
        const px = x + cos(angle) * radius;
        const py = y + sin(angle) * radius;
        ellipse(px, py, radius, radius/2);
    }
    ellipse(x, y, radius/2, radius/2);
}

function drawMorphShape(x, y, size) {
    const morphProgress = (sin(frameCount * params.morphSpeed) + 1) / 2;
    const sides = map(morphProgress, 0, 1, 4, 6);
    
    push();
    translate(x, y);
    beginShape();
    for (let i = 0; i < sides; i++) {
        const angle = map(i, 0, sides, 0, TWO_PI);
        const sx = cos(angle) * size / 2;
        const sy = sin(angle) * size / 2;
        vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
}

export function applyColorSettings(c) {
    switch (params.colorBlendMode.toUpperCase()) {
        case 'BLEND':
            blendMode(BLEND);
            break;
        case 'MULTIPLY':
            blendMode(MULTIPLY);
            break;
        case 'SCREEN':
            blendMode(SCREEN);
            break;
        case 'OVERLAY':
            blendMode(OVERLAY);
            break;
        default:
            blendMode(BLEND);
    }
    return color(red(c), green(c), blue(c), alpha(c) * params.colorOpacity);
}