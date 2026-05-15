const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const randItem = arr => arr[rand(0, arr.length - 1)];
const shuffle = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};
const pick = arr => arr[rand(0, arr.length - 1)];

function genOpts(correct, wrongFn) {
    const s = new Set([correct.toString()]);
    let i = 0;
    while (s.size < 4 && i < 100) { const w = wrongFn().toString(); if (w !== correct.toString()) s.add(w); i++; }
    let f = 1; while (s.size < 4) { s.add('N/A (' + f + ')'); f++; }
    return shuffle(Array.from(s));
}

function triSVG(a, b, c, unknown) {
    const la = unknown === 'a' ? '?' : a + ' cm';
    const lb = unknown === 'b' ? '?' : b + ' cm';
    const lc = unknown === 'c' ? '?' : c + ' cm';
    const col = '#a78bfa';
    return `<svg viewBox="0 0 260 220" width="260" height="220" xmlns="http://www.w3.org/2000/svg">
        <polygon points="30,190 230,190 30,30" fill="rgba(139,92,246,0.06)" stroke="${col}" stroke-width="2.5"/>
        <polyline points="55,190 55,165 30,165" fill="none" stroke="#64748b" stroke-width="1.5"/>
        <text x="130" y="212" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="Inter,sans-serif" font-weight="600">${la}</text>
        <text x="14" y="115" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="Inter,sans-serif" font-weight="600" transform="rotate(-90 14 115)">${lb}</text>
        <text x="148" y="100" fill="${unknown==='c'?col:'#94a3b8'}" font-size="14" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" transform="rotate(-38 148 100)">${lc}</text>
    </svg>`;
}

function trigSVG(labels) {
    // labels: { opp, adj, hyp, angle, unknown }
    const col = '#38bdf8';
    const findLabel = (key) => labels.unknown === key ? '?' : (labels[key] || '');
    const lOpp = findLabel('opp');
    const lAdj = findLabel('adj');
    const lHyp = findLabel('hyp');
    const lAngle = findLabel('angle') + (labels.unknown === 'angle' ? '' : '°');

    return `<svg viewBox="0 0 260 220" width="260" height="220" xmlns="http://www.w3.org/2000/svg">
        <polygon points="40,180 220,180 40,40" fill="rgba(56,189,248,0.06)" stroke="${col}" stroke-width="2.5"/>
        <polyline points="60,180 60,160 40,160" fill="none" stroke="#64748b" stroke-width="1.5"/>
        <path d="M 180,180 A 40,40 0 0 0 188.5,151" fill="none" stroke="${labels.unknown==='angle'?col:'#94a3b8'}" stroke-width="2"/>
        <text x="155" y="172" fill="${labels.unknown==='angle'?col:'#94a3b8'}" font-size="14" font-family="Inter" font-weight="700">${lAngle}</text>
        <text x="130" y="198" fill="${labels.unknown==='adj'?col:'#94a3b8'}" font-size="14" text-anchor="middle" font-family="Inter" font-weight="600">${lAdj}</text>
        <text x="24" y="110" fill="${labels.unknown==='opp'?col:'#94a3b8'}" font-size="14" text-anchor="middle" font-family="Inter" font-weight="600" transform="rotate(-90 24 110)">${lOpp}</text>
        <text x="140" y="100" fill="${labels.unknown==='hyp'?col:'#94a3b8'}" font-size="14" text-anchor="middle" font-family="Inter" font-weight="600" transform="rotate(-38 140 100)">${lHyp}</text>
    </svg>`;
}

function rectSVG(w, h) {
    return `<svg viewBox="0 0 240 180" width="240" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="20" width="180" height="120" rx="2" fill="rgba(139,92,246,0.08)" stroke="#a78bfa" stroke-width="2"/>
        <text x="120" y="158" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="Inter">${w} cm</text>
        <text x="8" y="85" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="Inter" transform="rotate(-90 8 85)">${h} cm</text>
    </svg>`;
}

function triShapeSVG(b, h) {
    return `<svg viewBox="0 0 240 200" width="240" height="200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="120,15 20,165 220,165" fill="rgba(56,189,248,0.08)" stroke="#38bdf8" stroke-width="2"/>
        <line x1="120" y1="15" x2="120" y2="165" stroke="#64748b" stroke-width="1" stroke-dasharray="6 3"/>
        <text x="120" y="185" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="Inter">${b} cm</text>
        <text x="135" y="95" fill="#94a3b8" font-size="13" font-family="Inter">${h} cm</text>
    </svg>`;
}

function cubeSVG(s) {
    return `<svg viewBox="0 0 220 220" width="220" height="220" xmlns="http://www.w3.org/2000/svg">
        <polygon points="60,60 160,60 160,160 60,160" fill="rgba(52,211,153,0.06)" stroke="#34d399" stroke-width="2"/>
        <polygon points="60,60 90,30 190,30 160,60" fill="rgba(52,211,153,0.04)" stroke="#34d399" stroke-width="2"/>
        <polygon points="160,60 190,30 190,130 160,160" fill="rgba(52,211,153,0.03)" stroke="#34d399" stroke-width="2"/>
        <text x="110" y="180" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="Inter">${s} cm</text>
    </svg>`;
}

function pieSVG(fav, total, c1, c2, l1, l2) {
    const ang = (fav/total)*360, rad=Math.PI/180, r=70, cx=120, cy=100;
    const x1=cx+r*Math.sin(ang*rad), y1=cy-r*Math.cos(ang*rad);
    const la = ang>180?1:0;
    return `<svg viewBox="0 0 240 210" width="240" height="210" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${c2}" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        <path d="M${cx},${cy} L${cx},${cy-r} A${r},${r} 0 ${la},1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${c1}"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
        <text x="${cx}" y="${cy+r+25}" fill="#94a3b8" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">${fav} ${l1} / ${total-fav} ${l2}</text>
    </svg>`;
}

function anglesSVG(type, params) {
    const col = '#8b5cf6';
    const bg = 'rgba(139,92,246,0.1)';
    if (type === 'triangle') {
        const { a1, a2, unknown } = params;
        const a3 = 180 - a1 - a2;
        return `<svg viewBox="0 0 240 180" width="240" height="180" xmlns="http://www.w3.org/2000/svg">
            <polygon points="40,150 200,150 100,40" fill="${bg}" stroke="${col}" stroke-width="2"/>
            <text x="60" y="142" fill="#94a3b8" font-size="12" font-family="Inter">${unknown === 'a1' ? '?' : a1 + '°'}</text>
            <text x="165" y="142" fill="#94a3b8" font-size="12" font-family="Inter">${unknown === 'a2' ? '?' : a2 + '°'}</text>
            <text x="95" y="65" fill="#94a3b8" font-size="12" font-family="Inter">${unknown === 'a3' ? '?' : a3 + '°'}</text>
        </svg>`;
    }
    if (type === 'line') {
        const { a1, unknown } = params;
        const a2 = 180 - a1;
        return `<svg viewBox="0 0 240 120" width="240" height="120" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="90" x2="220" y2="90" stroke="${col}" stroke-width="2"/>
            <line x1="120" y1="90" x2="170" y2="30" stroke="${col}" stroke-width="2"/>
            <text x="80" y="82" fill="#94a3b8" font-size="14" font-family="Inter">${unknown === 'a1' ? '?' : a1 + '°'}</text>
            <text x="145" y="82" fill="#94a3b8" font-size="14" font-family="Inter">${unknown === 'a2' ? '?' : a2 + '°'}</text>
        </svg>`;
    }
    if (type === 'parallel') {
        const { a1, unknown, relation } = params;
        // relation: 'alternate', 'corresponding'
        let y2 = relation === 'corresponding' ? 100 : 40;
        let x2 = relation === 'corresponding' ? 140 : 100;
        return `<svg viewBox="0 0 240 160" width="240" height="160" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="40" x2="220" y2="40" stroke="${col}" stroke-width="2"/>
            <line x1="20" y1="100" x2="220" y2="100" stroke="${col}" stroke-width="2"/>
            <line x1="140" y1="20" x2="80" y2="140" stroke="${col}" stroke-width="2" stroke-dasharray="none"/>
            <!-- Arrows for parallel -->
            <path d="M 120,35 L 130,40 L 120,45" fill="none" stroke="${col}" stroke-width="2"/>
            <path d="M 120,95 L 130,100 L 120,105" fill="none" stroke="${col}" stroke-width="2"/>

            <text x="110" y="35" fill="#94a3b8" font-size="12" font-family="Inter">${unknown === 'a1' ? '?' : a1 + '°'}</text>
            <text x="${x2}" y="${y2}" fill="#94a3b8" font-size="12" font-family="Inter">?</text>
        </svg>`;
    }
    return '';
}
