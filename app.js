// ===== APP STATE =====
let currentDiff = 'medium';
let currentSubject = '';
let currentTopic = '';
let currentGenKey = '';
let questions = [];
let qIdx = 0;
let score = 0;
const TOTAL = 10;
const STORE_KEY = 'flashmaths_v2';

// ===== LOCAL STORAGE =====
function getData() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null; } catch { return null; }
}
function load() {
    return getData() || { stats: { solved: 0, correct: 0 }, topics: {} };
}
function save(d) { localStorage.setItem(STORE_KEY, JSON.stringify(d)); }

function recordAnswer(correct, topicKey) {
    if (!topicKey) return;
    const d = load();
    d.stats.solved++;
    if (correct) d.stats.correct++;
    if (!d.topics[topicKey]) d.topics[topicKey] = { attempts: 0, mistakes: 0 };
    d.topics[topicKey].attempts++;
    if (!correct) d.topics[topicKey].mistakes++;
    save(d);
}

function refreshStats() {
    const d = load();
    const acc = d.stats.solved > 0 ? Math.round((d.stats.correct / d.stats.solved) * 100) : 0;
    
    animateValue(document.getElementById('stat-total-solved'), parseInt(document.getElementById('stat-total-solved').innerText) || 0, d.stats.solved, 600);
    animateValue(document.getElementById('stat-accuracy'), parseInt(document.getElementById('stat-accuracy').innerText) || 0, acc, 600, '%');

    const struggles = [];
    for (const key in d.topics) {
        const t = d.topics[key];
        if (t.attempts >= 3) {
            const ratio = t.mistakes / t.attempts;
            if (ratio > 0.3) struggles.push({ key, ratio });
        }
    }
    struggles.sort((a, b) => b.ratio - a.ratio);

    const ul = document.getElementById('struggle-list');
    ul.innerHTML = '';
    if (struggles.length === 0) {
        ul.innerHTML = '<li class="empty-hint">Complete quizzes to unlock insights.</li>';
    } else {
        struggles.slice(0, 4).forEach((s, i) => {
            const li = document.createElement('li');
            li.className = 'struggle-item pop-in';
            li.style.animationDelay = `${i * 0.1}s`;
            const pct = Math.round((1 - s.ratio) * 100);
            li.innerHTML = `<span>${s.key}</span><span class="acc-tag">${pct}%</span>`;
            ul.appendChild(li);
        });
    }
}

function animateValue(obj, start, end, duration, suffix = '') {
    if (start === end) { obj.innerHTML = end + suffix; return; }
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        obj.innerHTML = Math.floor(ease * (end - start) + start) + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// ===== DIFFICULTY INDICATOR =====
function positionIndicator() {
    const bar = document.querySelector('.diff-bar');
    const active = bar.querySelector('.diff-btn.active');
    const indicator = document.getElementById('diff-indicator');
    if (!active || !bar || !indicator) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = active.getBoundingClientRect();
    indicator.style.left = (btnRect.left - barRect.left) + 'px';
    indicator.style.width = btnRect.width + 'px';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    refreshStats();

    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDiff = btn.dataset.diff;
            positionIndicator();
        });
    });
    requestAnimationFrame(() => setTimeout(positionIndicator, 50));
    window.addEventListener('resize', positionIndicator);

    document.getElementById('btn-smart-session').addEventListener('click', startSmartSession);
    document.getElementById('btn-back-dash').addEventListener('click', () => { go('view-dashboard'); refreshStats(); });
    document.getElementById('btn-end-quiz').addEventListener('click', () => { go('view-dashboard'); refreshStats(); });
    document.getElementById('btn-home').addEventListener('click', () => { go('view-dashboard'); refreshStats(); });
    document.getElementById('btn-retry').addEventListener('click', () => {
        if(currentGenKey === 'smart') startSmartSession();
        else startQuiz(currentTopic, currentGenKey);
    });
    document.getElementById('next-btn').addEventListener('click', nextQ);
});

function go(id) {
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
        v.style.animation = 'none';
        v.offsetHeight;
        v.style.animation = '';
    });
    document.getElementById(id).classList.add('active');
}

// ===== RENDER DASHBOARD =====
function renderCategories() {
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';
    let i = 0;
    for (const subj in curriculum) {
        const c = curriculum[subj];
        const card = document.createElement('div');
        card.className = `cat-card pop-in theme-${(i % 4) + 1}`;
        card.style.animationDelay = `${i * 0.1}s`;
        card.onclick = () => selectCategory(subj);
        card.innerHTML = `
            <div class="icon-wrap">${c.icon}</div>
            <h3>${subj}</h3>
            <p>${Object.keys(c.topics).length} topics</p>
        `;
        grid.appendChild(card);
        i++;
    }
}

function selectCategory(subj) {
    currentSubject = subj;
    document.getElementById('current-category-title').textContent = subj;
    const list = document.getElementById('topic-list');
    list.innerHTML = '';
    const topics = curriculum[subj].topics;
    let i = 0;
    for (const name in topics) {
        const key = topics[name];
        const div = document.createElement('div');
        div.className = 'topic-item pop-in';
        div.style.animationDelay = `${i * 0.05}s`;
        div.onclick = () => startQuiz(name, key);
        div.innerHTML = `
            <span class="topic-name">${name}</span>
            <span class="topic-go">Start <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
        `;
        list.appendChild(div);
        i++;
    }
    go('view-topics');
}

// ===== QUIZ GENERATION =====
function startQuiz(topic, genKey) {
    currentTopic = topic;
    currentGenKey = genKey;
    qIdx = 0; score = 0; questions = [];
    
    const gen = generators[genKey] || genericGenerator;
    for (let i = 0; i < TOTAL; i++) {
        const qObj = gen(currentDiff);
        qObj.topicKey = topic;
        questions.push(qObj);
    }
    document.getElementById('quiz-topic-pill').textContent = topic;
    go('view-quiz');
    showQ();
}

function startSmartSession() {
    currentTopic = 'Smart Session';
    currentGenKey = 'smart';
    qIdx = 0; score = 0; questions = [];
    
    const allTopics = [];
    for (const subj in curriculum) {
        for (const tName in curriculum[subj].topics) {
            allTopics.push({ name: tName, key: curriculum[subj].topics[tName] });
        }
    }

    const d = load();
    for (let i = 0; i < TOTAL; i++) {
        let chosen;
        if (i < 4) {
            chosen = allTopics[Math.floor(Math.random() * allTopics.length)];
        } else {
            let tw = 0;
            const weights = allTopics.map(t => {
                let w = 1;
                const stats = d.topics[t.name];
                if (stats && stats.attempts > 0) {
                    const ratio = stats.mistakes / stats.attempts;
                    if (ratio > 0.3) w += ratio * 5; 
                }
                tw += w;
                return w;
            });
            let r = Math.random() * tw;
            let sum = 0;
            for (let j = 0; j < allTopics.length; j++) {
                sum += weights[j];
                if (r <= sum) { chosen = allTopics[j]; break; }
            }
        }
        const gen = generators[chosen.key] || genericGenerator;
        const qObj = gen(currentDiff);
        qObj.topicKey = chosen.name;
        questions.push(qObj);
    }
    document.getElementById('quiz-topic-pill').textContent = currentTopic;
    go('view-quiz');
    showQ();
}

function renderMath(str, el, isTextMixed = false) {
    el.innerHTML = '';
    if (typeof str !== 'string') str = str.toString();

    // If string has no formatting dollars, route appropriately
    if (!str.includes('$')) {
        if (isTextMixed) {
            el.textContent = str;
        } else {
            try { katex.render(str, el, { displayMode: false, throwOnError: false }); }
            catch { el.textContent = str; }
        }
        return;
    }

    // Safely split by '$', ignoring escaped '\$' signs
    const parts = [];
    let current = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '$' && (i === 0 || str[i-1] !== '\\')) {
            parts.push(current);
            current = '';
        } else {
            current += str[i];
        }
    }
    parts.push(current);

    parts.forEach((p, i) => {
        if (i % 2 === 1) { // It's math
            const span = document.createElement('span');
            span.className = 'math-inline';
            try { katex.render(p, span, { displayMode: false, throwOnError: false }); }
            catch { span.textContent = p; }
            el.appendChild(span);
        } else { // It's text
            if (p) {
                // Return escaped dollars to normal textual dollars
                const textNode = document.createTextNode(p.replace(/\\\$/g, '$'));
                el.appendChild(textNode); 
            }
        }
    });
}

function cleanForMatch(str) {
    let s = str.toString().toLowerCase();
    s = s.replace(/\\text\{([^}]+)\}/g, '$1');   // Extract \text{}
    s = s.replace(/\\mathrm\{([^}]+)\}/g, '$1'); // Extract \mathrm{}
    s = s.replace(/^[a-z]\s*=\s*/i, '');         // Strip 'x ='
    s = s.replace(/[\$\s\,]/g, '');              // Strip whitespace, $, ,
    s = s.replace(/\\/g, '');                    // Strip \ (makes \pi -> pi)
    s = s.replace(/(cm\^3|cm\^2|m\^3|m\^2|g\/cm\^3|km\/h|mph|km|cm|min|hrs|hr|m|l|circ|c)$/i, ''); // Strip trailing units
    return s.trim();
}

function showQ() {
    const nb = document.getElementById('next-btn');
    nb.style.display = 'none';
    const q = questions[qIdx];

    document.getElementById('progress-bar').style.width = ((qIdx / TOTAL) * 100) + '%';
    document.getElementById('q-counter').textContent = `${qIdx + 1} / ${TOTAL}`;

    const diagEl = document.getElementById('q-diagram');
    if (q.diagram) {
        diagEl.innerHTML = q.diagram;
        diagEl.classList.add('active');
    } else {
        diagEl.innerHTML = '';
        diagEl.classList.remove('active');
    }

    const qEl = document.getElementById('q-text');
    renderMath(q.q, qEl, true);

    const container = document.getElementById('opts-container');
    container.innerHTML = '';

    const isComplex = /frac|pi|\^|\\/.test(q.ans);
    const forceMCQ = isComplex || Math.random() > 0.35; 

    if (!forceMCQ) {
        const typeWrap = document.createElement('div');
        typeWrap.className = 'typing-area pop-in';
        typeWrap.innerHTML = `
            <p class="typing-hint">Type your answer below (no units needed):</p>
            <input type="text" id="type-ans" class="type-input" placeholder="e.g. 5 or x+2" autocomplete="off" />
            <button class="primary-btn pop-in" style="animation-delay: 0.1s" id="btn-submit-type">Submit</button>
        `;
        container.appendChild(typeWrap);

        const inp = document.getElementById('type-ans');
        const btn = document.getElementById('btn-submit-type');

        const submitTyping = () => {
            const val = inp.value;
            if(!val.trim()) return;
            inp.disabled = true; btn.disabled = true;
            
            const isCorrect = cleanForMatch(val) === cleanForMatch(q.ans);
            recordAnswer(isCorrect, q.topicKey);

            if(isCorrect) {
                inp.classList.add('correct-input');
                score++;
            } else {
                inp.classList.add('wrong-input', 'shake');
                const corr = document.createElement('div');
                corr.className = 'type-correction pop-in';
                renderMath(`\\text{Correct: } ${q.ans}`, corr, false);
                typeWrap.appendChild(corr);
            }
            nb.style.display = 'block';
            nb.classList.add('pop-in');
            nb.textContent = qIdx === TOTAL - 1 ? 'See Results' : 'Next Question';
        };

        btn.onclick = submitTyping;
        inp.addEventListener('keypress', (e) => { if(e.key === 'Enter') submitTyping(); });
        setTimeout(() => inp.focus(), 100);

    } else {
        const grid = document.createElement('div');
        grid.className = 'opts';
        q.opt.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn pop-in';
            btn.style.animationDelay = `${i * 0.08}s`;
            renderMath(opt, btn, false);
            btn.dataset.val = opt;
            btn.addEventListener('click', () => pickOption(opt, q.ans.toString(), btn, q.topicKey));
            grid.appendChild(btn);
        });
        container.appendChild(grid);
    }
}

function pickOption(sel, correct, btn, topicKey) {
    const all = document.querySelectorAll('.opt-btn');
    all.forEach(b => b.style.pointerEvents = 'none');

    const ok = sel === correct;
    recordAnswer(ok, topicKey);

    if (ok) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong', 'shake');
        all.forEach(b => { if (b.dataset.val === correct) b.classList.add('correct'); });
    }

    const nb = document.getElementById('next-btn');
    nb.style.display = 'block';
    nb.classList.add('pop-in');
    nb.textContent = qIdx === TOTAL - 1 ? 'See Results' : 'Next Question';
}

function nextQ() {
    qIdx++;
    if (qIdx >= TOTAL) showResults();
    else showQ();
}

function showResults() {
    document.getElementById('result-topic').textContent = currentTopic;
    document.getElementById('result-diff').textContent = currentDiff;
    
    const scoreNum = document.getElementById('big-score-num');
    scoreNum.textContent = '0';
    animateValue(scoreNum, 0, score, 1000);

    const bar = document.getElementById('result-bar-fill');
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = ((score / TOTAL) * 100) + '%'; }, 100);

    const fb = document.getElementById('result-feedback');
    if (score === TOTAL) {
        fb.textContent = 'Perfect. Flawless execution.';
        fb.style.color = 'var(--success)';
        fireConfetti();
    } else if (score >= 7) {
        fb.textContent = 'Great work. Almost there.';
        fb.style.color = '#3b82f6';
    } else if (score >= 4) {
        fb.textContent = 'Solid effort. Keep at it.';
        fb.style.color = 'var(--text-primary)';
    } else {
        fb.textContent = 'Every mistake is a lesson. Try again.';
        fb.style.color = 'var(--text-tertiary)';
    }
    go('view-results');
}

function fireConfetti() {
    const end = Date.now() + 2500;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    const rr = (a, b) => Math.random() * (b - a) + a;
    (function frame() {
        if (Date.now() > end) return;
        confetti({ ...defaults, particleCount: 35, origin: { x: rr(0.1, 0.4), y: rr(0, 0.3) }, colors: ['#6366f1', '#ec4899', '#10b981', '#f59e0b'] });
        confetti({ ...defaults, particleCount: 35, origin: { x: rr(0.6, 0.9), y: rr(0, 0.3) }, colors: ['#6366f1', '#ec4899', '#10b981', '#f59e0b'] });
        requestAnimationFrame(frame);
    })();
}