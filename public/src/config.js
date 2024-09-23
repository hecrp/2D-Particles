export const LAYERS = 3; // or whatever number you're using
export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

export const params = {
    lifespan: 400,
    speed: 0.5,
    maxSize: 5,
    layerDepth: 0.5,
    mouseEffectIntensity: 1.0,
    noiseIntensity: 1.0,
    noiseFunction: 'perlin',
    particleShape: 'circle',
    morphSpeed: 0.05,
    backgroundColor: [10, 10, 30],
    colorSpeed: 0.02, // Adjusted default speed
    particleCount: 100,
    fireworkSize: 3,
    fireworkLifespan: 60,
    fireworkColorSpeed: 0.1,
    fireworkEffect: 'explosion',
    fireworkTrajectory: 'random',
    fireworkSpeed: 1.0,
    explosionRadius: 5,
    fountainHeight: 200,
    spiralTurns: 2,
    sparkleCount: 50,
    zoomSpeed: 0.1,
    minZoom: 0.1,
    maxZoom: 5,

    // New color parameters
    colorPalette: 'default',
    colorBlendMode: 'blend', // Change 'normal' to 'blend'
    colorOpacity: 1,
    useGradient: false,
    gradientSpeed: 0.002, // Adjusted default speed

    mouseEffectMode: 'attract', // 'attract' o 'swirl'
    swirlStrength: 0.05,
    swirlRadius: 200,
    vortexComplexity: 3,
    waveAmplitude: 10,
    waveFrequency: 0.1,
    waveSpeed: 0.05,
    
    // Parámetros para el efecto del mouse
    mouseEffectIntensity: 1.0,
    
    // Parámetros para Atracción y Repulsión
    attractRepelRadius: 100,
    
    // Parámetros para Remolino y Vórtice
    swirlStrength: 0.05,
    swirlRadius: 200,
    vortexComplexity: 3,
    
    // Parámetros para Onda
    waveAmplitude: 10,
    waveFrequency: 0.1,
    waveSpeed: 0.05,
    
    // New parameter for vortex rotation speed
    vortexRotationSpeed: 1.0,
    
    // New wave parameters
    waveType: 'sine',
    wavePropagation: 'circular',
    waveDecay: 0.5,
};

export const colorPalettes = {
    default: [
        [255, 0, 0],    // Red
        [255, 165, 0],  // Orange
        [255, 255, 0],  // Yellow
        [0, 255, 0],    // Green
        [0, 0, 255],    // Blue
        [128, 0, 128],  // Purple
        [255, 0, 255]   // Magenta
    ],
    nature: [
        [34, 139, 34],   // Forest Green
        [0, 128, 0],     // Green
        [154, 205, 50],  // Yellow Green
        [85, 107, 47],   // Dark Olive Green
        [107, 142, 35],  // Olive Drab
        [124, 252, 0],   // Lawn Green
        [173, 255, 47]   // Green Yellow
    ],
    space: [
        [25, 25, 112],   // Midnight Blue
        [65, 105, 225],  // Royal Blue
        [138, 43, 226],  // Blue Violet
        [75, 0, 130],    // Indigo
        [106, 90, 205],  // Slate Blue
        [123, 104, 238], // Medium Slate Blue
        [147, 112, 219]  // Medium Purple
    ],
    psychedelic: [
        [255, 0, 255],   // Magenta
        [255, 20, 147],  // Deep Pink
        [255, 105, 180], // Hot Pink
        [255, 192, 203], // Pink
        [255, 0, 0],     // Red
        [255, 127, 0],   // Orange Red
        [255, 215, 0]    // Gold
    ],
    // New palettes
    pastel: [
        [255, 209, 220], // Pastel Pink
        [255, 231, 186], // Pastel Yellow
        [207, 255, 221], // Pastel Green
        [186, 225, 255], // Pastel Blue
        [255, 186, 255], // Pastel Purple
        [255, 214, 186]  // Pastel Orange
    ],
    neon: [
        [255, 0, 102],   // Neon Pink
        [0, 255, 255],   // Neon Cyan
        [255, 255, 0],   // Neon Yellow
        [0, 255, 0],     // Neon Green
        [255, 0, 255],   // Neon Purple
        [255, 128, 0]    // Neon Orange
    ],
    monochrome: [
        [0, 0, 0],       // Black
        [50, 50, 50],    // Dark Gray
        [100, 100, 100], // Gray
        [150, 150, 150], // Light Gray
        [200, 200, 200], // Very Light Gray
        [255, 255, 255]  // White
    ],
    autumn: [
        [153, 0, 0],     // Dark Red
        [204, 102, 0],   // Burnt Orange
        [255, 153, 51],  // Orange
        [204, 153, 0],   // Golden Yellow
        [153, 102, 0],   // Brown
        [102, 51, 0]     // Dark Brown
    ],
    ocean: [
        [0, 105, 148],   // Deep Blue
        [0, 145, 179],   // Medium Blue
        [0, 180, 204],   // Light Blue
        [0, 204, 187],   // Turquoise
        [64, 224, 208],  // Aqua
        [127, 255, 212]  // Aquamarine
    ],
    sunset: [
        [255, 102, 0],   // Orange
        [255, 153, 0],   // Golden Orange
        [255, 204, 0],   // Golden Yellow
        [255, 0, 102],   // Pink
        [204, 0, 102],   // Deep Pink
        [102, 0, 102]    // Purple
    ]
};