// Main Generators File
// Combines the generators from gen-algebra.js, gen-geometry.js, and gen-number.js

const generators = {
    ...genAlgebra,
    ...genGeometry,
    ...genNumber
};

const genericGenerator = (d) => generators.Equations(d);

// --- CURRICULUM MAP ---
const ICONS = {
    algebra: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,
    geometry: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 22 22 22"/></svg>`,
    number: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 17l6-6-6-6"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    rates: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
};

const curriculum = {
    "Algebra": {
        icon: ICONS.algebra,
        topics: {
            "Solving Equations": "Equations",
            "Simultaneous Equations": "SimultaneousEq",
            "Expanding & Factorising": "Expanding",
            "Substitution": "Substitution",
            "Sequences & Nth Term": "Sequences"
        }
    },
    "Geometry & Trig": {
        icon: ICONS.geometry,
        topics: {
            "Pythagoras": "Pythagoras",
            "Trigonometry": "Trigonometry",
            "Angles": "Angles",
            "Area & Perimeter": "AreaVolume",
            "Volume & Surface Area": "AreaVolume"
        }
    },
    "Number & Probability": {
        icon: ICONS.number,
        topics: {
            "Negative Numbers": "Negatives",
            "Fractions, Decimals & %": "FDP",
            "Statistics": "Statistics",
            "Indices & Surds": "IndicesSurds",
            "Standard Form": "StandardForm",
            "Probability": "Probability"
        }
    },
    "Rates": {
        icon: ICONS.rates,
        topics: { "Speed, Distance & Time": "SDT" }
    }
};
