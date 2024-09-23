import { params, colorPalettes, LAYERS } from './config.js';
import { spiralTrajectory, heartTrajectory, drawParticleShape } from './utils.js';

export function updateAndDrawFireworks(fireworks) {
    for (let i = fireworks.length - 1; i >= 0; i--) {
        updateAndDrawFirework(fireworks[i], i, fireworks);
    }
}

function updateAndDrawFirework(firework, index, fireworks) {
    let trajectory;
    switch (params.fireworkEffect) {
        case 'explosion':
            trajectory = p5.Vector.random2D().mult(params.explosionRadius / 10 * params.fireworkSpeed);
            break;
        case 'fountain':
            if (!firework.noiseDirection) {
                const noiseValue = noise(firework.pos.x * 0.01, firework.pos.y * 0.01, frameCount * 0.01);
                const angle = noiseValue * TWO_PI * ((1 + Math.sqrt(5)) / 2);
                firework.noiseDirection = p5.Vector.fromAngle(angle);
            }
            trajectory = firework.noiseDirection.copy().mult(params.speed * params.fireworkSpeed);
            break;
        case 'spiral':
            trajectory = spiralTrajectory(firework.maxLife - firework.life, firework.maxLife).mult(params.fireworkSpeed);
            break;
        case 'sparkle':
            trajectory = p5.Vector.random2D().mult(random(0.5, 2) * params.fireworkSpeed);
            break;
    }

    firework.pos.add(trajectory);
    if (params.fireworkEffect !== 'fountain') {
        firework.vel.add(firework.acc);
    }
    firework.life--;

    const alpha = map(firework.life, firework.maxLife, 0, 255, 0);
    const size = map(firework.life, firework.maxLife, 0, params.fireworkSize, 0.5);
    
    const colorT = (firework.maxLife - firework.life) * params.fireworkColorSpeed;
    const selectedPalette = colorPalettes[params.colorPalette];
    const colorIndex = Math.floor(colorT % selectedPalette.length);
    const nextColorIndex = (colorIndex + 1) % selectedPalette.length;
    const lerpAmount = colorT % 1;
    const fluctuatingColor = lerpColor(
        color(selectedPalette[colorIndex]),
        color(selectedPalette[nextColorIndex]),
        lerpAmount
    );
    
    fill(red(firework.color), green(firework.color), blue(firework.color), alpha);
    drawParticleShape(firework.pos.x, firework.pos.y, size, fluctuatingColor);

    if (firework.life <= 0) {
        fireworks.splice(index, 1);
    }
}

export function createFirework(x, y, fireworks, closestPoint) {
    const selectedPalette = colorPalettes[params.colorPalette];
    const fireworkColor = closestPoint ? closestPoint.col : color(random(selectedPalette));
    const particleCount = params.fireworkEffect === 'sparkle' ? params.sparkleCount : params.particleCount;
    
    for (let i = 0; i < particleCount; i++) {
        const angle = random(TWO_PI);
        const r = random(1, 5);
        fireworks.push({
            pos: createVector(x, y),
            vel: createVector(cos(angle) * r, sin(angle) * r).mult(params.fireworkSpeed),
            acc: createVector(0, 0.05).mult(params.fireworkSpeed),
            life: random(params.fireworkLifespan * 0.5, params.fireworkLifespan),
            maxLife: params.fireworkLifespan,
            color: fireworkColor
        });
    }
}

export function findClosestPoint(x, y, points) {
    let closestPoint = null;
    let closestDistance = Infinity;

    for (let layer = 0; layer < LAYERS; layer++) {
        if (!Array.isArray(points[layer])) continue; // Saltar si la capa no es un array

        for (let point of points[layer]) {
            const d = dist(x, y, point.pos.x, point.pos.y);
            if (d < closestDistance) {
                closestDistance = d;
                closestPoint = point;
            }
        }
    }

    return closestPoint;
}