import { params } from './config.js';

export function setupGUI() {
    const gui = new dat.GUI();
    const particleFolder = gui.addFolder('Particle Settings');
    particleFolder.add(params, 'lifespan', 100, 1000);
    particleFolder.add(params, 'speed', 0.1, 2);
    particleFolder.add(params, 'maxSize', 1, 10);
    particleFolder.add(params, 'layerDepth', 0.1, 1);
    particleFolder.add(params, 'mouseEffectIntensity', 0, 4);
    particleFolder.add(params, 'noiseIntensity', 0, 2);
    particleFolder.add(params, 'noiseFunction', ['perlin', 'simplex', 'worley']);
    particleFolder.add(params, 'particleShape', ['circle', 'square', 'triangle', 'star', 'flower', 'morph']);
    particleFolder.add(params, 'morphSpeed', 0.01, 0.1);

    const colorFolder = gui.addFolder('Color Settings');
    colorFolder.addColor(params, 'backgroundColor');
    colorFolder.add(params, 'colorSpeed', 0.01, 0.5); // Adjusted range
    colorFolder.add(params, 'colorPalette', [
        'default', 'nature', 'space', 'psychedelic',
        'pastel', 'neon', 'monochrome', 'autumn', 'ocean', 'sunset'
    ]);
    colorFolder.add(params, 'colorBlendMode', ['blend', 'multiply', 'screen', 'overlay']);
    colorFolder.add(params, 'colorOpacity', 0, 1);
    colorFolder.add(params, 'useGradient');
    colorFolder.add(params, 'gradientSpeed', 0.0001, 0.02); // Adjusted range

    const fireworkFolder = gui.addFolder('Firework Settings');
    fireworkFolder.add(params, 'particleCount', 50, 200).step(1);
    fireworkFolder.add(params, 'fireworkSize', 0.3, 3);
    fireworkFolder.add(params, 'fireworkLifespan', 30, 200);
    fireworkFolder.add(params, 'fireworkColorSpeed', 0.01, 1.0);
    fireworkFolder.add(params, 'fireworkEffect', ['explosion', 'fountain', 'spiral', 'sparkle']);
    fireworkFolder.add(params, 'fireworkTrajectory', ['random', 'spiral', 'heart']);
    fireworkFolder.add(params, 'fireworkSpeed', 0.01, 2.0);
    fireworkFolder.add(params, 'explosionRadius', 1, 20);
    fireworkFolder.add(params, 'fountainHeight', 50, 400);
    fireworkFolder.add(params, 'spiralTurns', 1, 5);
    fireworkFolder.add(params, 'sparkleCount', 10, 100).step(1);

    const zoomFolder = gui.addFolder('Zoom Settings');
    zoomFolder.add(params, 'zoomSpeed', 0.01, 0.5);
    zoomFolder.add(params, 'minZoom', 0.1, 1);
    zoomFolder.add(params, 'maxZoom', 1, 10);

    const mouseFolder = gui.addFolder('Mouse Effect');
    mouseFolder.add(params, 'mouseEffectMode', ['attract', 'repel', 'swirl', 'vortex', 'wave']);
    mouseFolder.add(params, 'mouseEffectIntensity', 0, 10);
    
    const attractRepelFolder = mouseFolder.addFolder('Attract/Repel');
    attractRepelFolder.add(params, 'attractRepelRadius', 10, 300);
    
    const swirlVortexFolder = mouseFolder.addFolder('Swirl/Vortex');
    swirlVortexFolder.add(params, 'swirlStrength', 0, 0.5);
    swirlVortexFolder.add(params, 'swirlRadius', 10, 500);
    swirlVortexFolder.add(params, 'vortexComplexity', 1, 10).step(1);
    swirlVortexFolder.add(params, 'vortexRotationSpeed', 0, 5);
    
    const waveFolder = mouseFolder.addFolder('Wave');
    waveFolder.add(params, 'waveType', ['sine', 'square', 'triangle', 'sawtooth']);
    waveFolder.add(params, 'waveAmplitude', 0, 50);
    waveFolder.add(params, 'waveFrequency', 0.01, 0.5);
    waveFolder.add(params, 'waveSpeed', 0.01, 0.2);
    waveFolder.add(params, 'wavePropagation', ['circular', 'linear']);
    waveFolder.add(params, 'waveDecay', 0, 1);
    
    mouseFolder.open();
    
    particleFolder.open();
    colorFolder.open();
    fireworkFolder.open();
    zoomFolder.open();
}