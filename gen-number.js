const genNumber = {
    Negatives(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => { const a=rand(2,12),b=rand(2,12),ans=-a-b; return {q:`Calculate: $-${a} + (-${b})$`,ans:ans.toString(),opt:genOpts(ans,()=>ans+rand(-6,6)||2)}; });
            styles.push(() => { const a=rand(2,12),b=rand(2,12),ans=-a+b; return {q:`Calculate: $-${a} + ${b}$`,ans:ans.toString(),opt:genOpts(ans,()=>ans+rand(-5,5)||1)}; });
            styles.push(() => { const a=rand(5,20),b=rand(10,30),ans=a-b; return {q:`Temperature is $${a}^\\circ$C, drops by $${b}^\\circ$C. New temp?`,ans:`${ans}^\\circ\\text{C}`,opt:genOpts(`${ans}^\\circ\\text{C}`,()=>`${ans+rand(-4,4)||2}^\\circ\\text{C}`)}; });
        } else if (diff === 'medium') {
            styles.push(() => { const a=rand(2,12),b=rand(2,12),ans=a*b; return {q:`Calculate: $-${a} \\times -${b}$`,ans:ans.toString(),opt:genOpts(ans,()=>ans*-1+rand(-2,2))}; });
            styles.push(() => { const a=rand(2,12),b=rand(2,12),ans=-a*b; return {q:`Calculate: $${a} \\times -${b}$`,ans:ans.toString(),opt:genOpts(ans,()=>ans*-1+rand(-2,2))}; });
            styles.push(() => { const a=rand(2,6),b=rand(2,4),c=rand(2,8),ans=(-a*b)-c; return {q:`Calculate: $(-${a} \\times ${b}) - ${c}$`,ans:ans.toString(),opt:genOpts(ans,()=>ans+rand(-10,10)||3)}; });
        } else {
            styles.push(() => { const a=rand(2,6),b=rand(2,5),c=rand(2,5),ans=(-a*-b)-c; return {q:`Calculate: $(-${a} \\times -${b}) - ${c}$`,ans:ans.toString(),opt:genOpts(ans,()=>ans+rand(-8,8)||2)}; });
            styles.push(() => { const bank=rand(-100,-20),pay=rand(30,80),ans=bank+pay; return {q:`Bank balance: $\\$${bank}$. Deposit $\\$${pay}$. New balance?`,ans:`\\$${ans}`,opt:genOpts(`\\$${ans}`,()=>`\\$${ans+rand(-15,15)||5}`)}; });
            styles.push(() => { const a=rand(4,12),b=rand(2,6),c=rand(2,5),ans=(-a+b)/-c; return {q:`Calculate: $\\frac{-${a} + ${b}}{-${c}}$ (as decimal if needed)`,ans:''+(Math.round(ans*100)/100),opt:genOpts(Math.round(ans*100)/100,()=>Math.round((ans+rand(-2,2)||1)*100)/100)}; });
            styles.push(() => { const a=rand(2,5),b=rand(3,6),c=rand(2,4),ans=Math.pow(-a,c)+b; return {q:`Calculate: $(-${a})^{${c}} + ${b}$`,ans:ans.toString(),opt:genOpts(ans,()=>ans+rand(-5,5)||2)}; });
        }
        return pick(styles)();
    },
    StandardForm(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => { const n=rand(2,9),p=rand(3,6),val=n*Math.pow(10,p),ans=`${n} \\times 10^{${p}}`; return {q:`Write $${val}$ in standard form.`,ans,opt:genOpts(ans,()=>`${n+rand(-1,2)||1} \\times 10^{${p+rand(-2,2)||1}}`)}; });
            styles.push(() => { const n=rand(2,9),p=rand(3,6),val=n*Math.pow(10,p),ans=val.toString(); return {q:`Write as ordinary number: $${n} \\times 10^{${p}}$`,ans,opt:genOpts(ans,()=>(val*(Math.pow(10,rand(-1,1)||1))).toString())}; });
        } else if (diff === 'medium') {
            styles.push(() => { const n=rand(2,9),p=rand(3,5),val=n/Math.pow(10,p),ans=`${n} \\times 10^{-${p}}`; return {q:`Write $${val.toFixed(p)}$ in standard form.`,ans,opt:genOpts(ans,()=>`${n+rand(-1,2)||2} \\times 10^{-${p+rand(-2,2)||1}}`)}; });
            styles.push(() => { const n=rand(2,9),p=rand(3,5),val=n/Math.pow(10,p),ans=val.toFixed(p); return {q:`Write as ordinary number: $${n} \\times 10^{-${p}}$`,ans,opt:genOpts(ans,()=>val.toFixed(p+rand(-1,1)||1))}; });
            styles.push(() => { const a=rand(2,5), p=rand(3,6), b=rand(2,5); const ans=`${a+b} \\times 10^{${p}}`; return {q:`Calculate: $(${a} \\times 10^{${p}}) + (${b} \\times 10^{${p}})$`,ans,opt:genOpts(ans,()=>`${a+b+rand(-1,2)||1} \\times 10^{${p+rand(-1,1)||1}}`)}; });
        } else {
            styles.push(() => { const a=rand(2,9),b=rand(2,9); let pa=rand(2,5),pb=rand(2,5); let co=a*b,fp=pa+pb; if(co>=10){co/=10;fp++;} const ans=`${co} \\times 10^{${fp}}`; return {q:`Calculate: $(${a} \\times 10^{${pa}}) \\times (${b} \\times 10^{${pb}})$`,ans,opt:genOpts(ans,()=>`${co+rand(-1,2)||1.2} \\times 10^{${fp+rand(-2,2)}}`)}; });
            styles.push(() => { const a=randItem([4,6,8,9]),b=rand(2,a-1); let pa=rand(4,8),pb=rand(2,pa-2); let co=Math.round((a/b)*100)/100,fp=pa-pb; if(co<1){co*=10;fp--;} const ans=`${co} \\times 10^{${fp}}`; return {q:`Calculate: $(${a} \\times 10^{${pa}}) \\div (${b} \\times 10^{${pb}})$`,ans,opt:genOpts(ans,()=>`${co+rand(-1,2)||1.5} \\times 10^{${fp+rand(-1,1)||1}}`)}; });
        }
        return pick(styles)();
    },
    Probability(diff) {
        const styles = [];
        const cols = [{c:'red',hex:'rgba(248,113,113,0.5)'}, {c:'blue',hex:'rgba(56,189,248,0.5)'}, {c:'green',hex:'rgba(52,211,153,0.5)'}];
        if (diff === 'easy') {
            styles.push(() => { const t=randItem([6,8,10,12]),f=rand(1,t-1),c=randItem(cols); const d=pieSVG(f,t,c.hex,'rgba(100,116,139,0.2)',c.c,'other'); const ans=`\\frac{${f}}{${t}}`; return {q:`$P(\\text{${c.c}}) = ?$`,diagram:d,ans,opt:genOpts(ans,()=>`\\frac{${rand(1,t-1)}}{${t}}`)}; });
            styles.push(() => { const c=randItem(['heads','tails']),ans=`\\frac{1}{2}`; return {q:`A fair coin is flipped. $P(\\text{${c}})$?`,ans,opt:shuffle([ans,`\\frac{1}{3}`,`\\frac{1}{4}`,`1`])}; });
            styles.push(() => { const n=randItem([2,3,4,5]),ans=`\\frac{1}{6}`; return {q:`A fair 6-sided die is rolled. $P(\\text{rolling a } ${n})$?`,ans,opt:shuffle([ans,`\\frac{${n}}{6}`,`\\frac{1}{2}`,`\\frac{2}{6}`])}; });
        } else if (diff === 'medium') {
            styles.push(() => { const t=randItem([8,10,12,20]),f=rand(2,t-2),nf=t-f,c=randItem(cols); const d=pieSVG(f,t,c.hex,'rgba(100,116,139,0.2)',c.c,'other'); const ans=`\\frac{${nf}}{${t}}`; return {q:`$P(\\text{not } ${c.c}) = ?$`,diagram:d,ans,opt:genOpts(ans,()=>`\\frac{${rand(1,t-1)}}{${t}}`)}; });
            styles.push(() => { const ans=`\\frac{3}{6}`; return {q:`Fair 6-sided die. $P(\\text{even number})$?`,ans,opt:shuffle([ans,`\\frac{1}{6}`,`\\frac{2}{6}`,`\\frac{4}{6}`])}; });
            styles.push(() => { const p=rand(1,9)/10,ans=Math.round((1-p)*10)/10; return {q:`$P(\\text{rain}) = ${p}$. $P(\\text{no rain}) = ?$`,ans:''+ans,opt:genOpts(ans,()=>Math.round((ans+rand(-2,2)||0.1)*10)/10)}; });
        } else {
            styles.push(() => { const t1=randItem([4,5,6]),t2=randItem([4,5,6]),f1=rand(1,t1-1),f2=rand(1,t2-1); const num=f1*f2,den=t1*t2; const ans=`\\frac{${num}}{${den}}`; return {q:`$P(A) = \\frac{${f1}}{${t1}}, P(B) = \\frac{${f2}}{${t2}}$. $P(A \\text{ and } B)$ if independent?`,ans,opt:genOpts(ans,()=>`\\frac{${rand(1,den-1)}}{${den}}`)}; });
            styles.push(() => { const r=rand(3,6),b=rand(3,6),t=r+b,ans=`\\frac{${r*b}}{${t*t}}`; return {q:`Bag: $${r}$ red, $${b}$ blue. Pick 1, replace, pick 1. $P(\\text{red then blue})$?`,ans,opt:genOpts(ans,()=>`\\frac{${r*b+rand(-2,2)||1}}{${t*t}}`)}; });
            styles.push(() => { const r=rand(3,6),b=rand(3,6),t=r+b,ans=`\\frac{${r*(r-1)}}{${t*(t-1)}}`; return {q:`Bag: $${r}$ red, $${b}$ blue. Pick 2 without replacement. $P(\\text{both red})$?`,ans,opt:genOpts(ans,()=>`\\frac{${r*r}}{${t*t}}`)}; });
        }
        return pick(styles)();
    },
    FDP(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => {
                const p = rand(1, 19) * 5;
                return { q: `Write $${p}\\%$ as a decimal.`, ans: (p / 100).toString(), opt: genOpts(p / 100, () => (p + rand(-15, 15)) / 100) };
            });
            styles.push(() => {
                const d = rand(1, 9) / 10;
                return { q: `Write $${d}$ as a percentage.`, ans: `${d * 100}\\%`, opt: genOpts(`${d * 100}\\%`, () => `${d * 100 + rand(-30, 30)}\\%`) };
            });
            styles.push(() => {
                const p = rand(1, 10) * 10, amt = rand(1, 10) * 20, ans = (p / 100) * amt;
                return { q: `Find $${p}\\%$ of $\\$${amt}$.`, ans: `\\$${ans}`, opt: genOpts(`\\$${ans}`, () => `\\$${ans + rand(-10, 10)}`) };
            });
        } else if (diff === 'medium') {
            styles.push(() => {
                const f = randItem([[1, 4, '0.25'], [3, 4, '0.75'], [1, 5, '0.2'], [2, 5, '0.4'], [1, 8, '0.125']]);
                return { q: `Write $\\frac{${f[0]}}{${f[1]}}$ as a decimal.`, ans: f[2], opt: genOpts(f[2], () => (parseFloat(f[2]) + rand(-3, 3) * 0.05).toFixed(3).replace(/\.?0+$/, '')) };
            });
            styles.push(() => {
                const a = rand(1, 5), b = rand(2, 6), c = rand(1, 5), d = rand(2, 6);
                const num = a * d + c * b, den = b * d;
                return { q: `Calculate: $\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`, ans: `\\frac{${num}}{${den}}`, opt: genOpts(`\\frac{${num}}{${den}}`, () => `\\frac{${num + rand(-5, 5)}}{${den + rand(-2, 2)}}`) };
            });
        } else {
            styles.push(() => {
                const p = rand(5, 40), amt = rand(100, 500), ans = amt * (1 + p / 100);
                return { q: `Increase $\\$${amt}$ by $${p}\\%$.`, ans: `\\$${ans.toFixed(0)}`, opt: genOpts(`\\$${ans.toFixed(0)}`, () => `\\$${(ans + rand(-50, 50)).toFixed(0)}`) };
            });
            styles.push(() => {
                const a = rand(1, 4), b = rand(2, 5), c = rand(1, 4), d = rand(2, 5);
                const num = a * c, den = b * d;
                return { q: `Calculate: $\\frac{${a}}{${b}} \\times \\frac{${c}}{${d}}$`, ans: `\\frac{${num}}{${den}}`, opt: genOpts(`\\frac{${num}}{${den}}`, () => `\\frac{${num + rand(-1, 1)}}{${den + rand(-5, 5)}}`) };
            });
        }
        return pick(styles)();
    },
    Statistics(diff) {
        const styles = [];
        const mkData = (n, min, max) => Array.from({ length: n }, () => rand(min, max));

        styles.push(() => {
            const data = mkData(5, 2, 12).sort((a,b)=>a-b);
            const mean = Math.round(data.reduce((a, b) => a + b) / data.length * 10) / 10;
            return { q: `Find the mean of: $${data.join(', ')}$`, ans: mean.toString(), opt: genOpts(mean, () => (mean + rand(-2, 2) || 1).toFixed(1)) };
        });

        styles.push(() => {
            const data = mkData(5, 2, 15).sort((a,b)=>a-b);
            const range = Math.max(...data) - Math.min(...data);
            return { q: `Find the range of: $${data.join(', ')}$`, ans: range.toString(), opt: genOpts(range, () => range + rand(-3, 3) || 1) };
        });

        if (diff === 'medium' || diff === 'hard') {
            styles.push(() => {
                const data = mkData(5, 2, 15).sort((a,b)=>a-b);
                const median = data[2];
                return { q: `Find the median of: $${data.join(', ')}$`, ans: median.toString(), opt: genOpts(median, () => median + rand(-3, 3) || 1) };
            });
            styles.push(() => {
                const mode = rand(2, 10), other = [rand(2, 10), rand(2, 10)];
                const data = shuffle([mode, mode, mode, other[0], other[1]]);
                return { q: `Find the mode of: $${data.join(', ')}$`, ans: mode.toString(), opt: genOpts(mode, () => mode + rand(-2, 2) || 1) };
            });
        }

        if (diff === 'hard') {
            styles.push(() => {
                const data = mkData(4, 5, 15);
                const currentMean = data.reduce((a,b)=>a+b) / 4;
                const targetMean = Math.ceil(currentMean) + 1;
                const needed = (targetMean * 5) - data.reduce((a,b)=>a+b);
                return { q: `Four numbers have a mean of $${currentMean}$. What fifth number is needed to make the mean $${targetMean}$?`, ans: needed.toString(), opt: genOpts(needed, () => needed + rand(-5, 5) || 2) };
            });
        }
        return pick(styles)();
    },
    IndicesSurds(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => {
                const a = rand(2, 10), b = rand(2, 5), c = rand(2, 5);
                const ans = `${a}^{${b + c}}`;
                return { q: `Simplify: $${a}^{${b}} \\times ${a}^{${c}}$`, ans, opt: genOpts(ans, () => `${a}^{${b + c + rand(-3, 3)}}`) };
            });
            styles.push(() => {
                const a = rand(2, 9);
                return { q: `Value of $${a}^0$?`, ans: `1`, opt: shuffle(['1', '0', `${a}`, `${-a}`]) };
            });
        } else if (diff === 'medium') {
            styles.push(() => {
                const a = rand(2, 6), b = rand(2, 3);
                const val = Math.pow(a, b);
                const ans = `\\frac{1}{${val}}`;
                return { q: `Calculate $${a}^{-${b}}$`, ans, opt: genOpts(ans, () => randItem([`\\frac{1}{${val + rand(-5, 5)}}`, `${val}`, `-${val}`, `\\frac{1}{${a * b}}`])) };
            });
            styles.push(() => {
                const s = randItem([8, 12, 18, 20, 24, 27, 28, 32, 40, 44, 45, 48, 50]);
                let a = 1, b = s;
                for (let i = 2; i * i <= s; i++) { if (s % (i * i) === 0) { a = i; b = s / (i * i); } }
                const ans = `${a > 1 ? a : ''}\\sqrt{${b}}`;
                return { q: `Simplify $\\sqrt{${s}}$`, ans, opt: genOpts(ans, () => `${rand(1, 4)}\\sqrt{${randItem([2, 3, 5, 6, 7])}}`) };
            });
        } else {
            styles.push(() => {
                const a = randItem([4, 9, 16, 25]), b = randItem(['1/2', '3/2']);
                const res = b === '1/2' ? Math.sqrt(a) : Math.pow(Math.sqrt(a), 3);
                return { q: `Calculate $${a}^{${b}}$`, ans: res.toString(), opt: genOpts(res, () => res + rand(-10, 10)) };
            });
            styles.push(() => {
                const a = rand(2, 5), b = rand(2, 5);
                const s = a * a * b;
                const ans = `${a}\\sqrt{${b}}`;
                return { q: `Write $\\sqrt{${s}}$ in the form $a\\sqrt{b}$.`, ans, opt: genOpts(ans, () => `${a + rand(-1, 2)}\\sqrt{${b + rand(-1, 1)}}`) };
            });
        }
        return pick(styles)();
    },
    SDT(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => { const t=rand(2,6),s=rand(20,60),d=s*t; return {q:`Travel $${d}$ mi in $${t}$ hrs. Speed?`,ans:`${s}\\text{ mph}`,opt:genOpts(`${s}\\text{ mph}`,()=>`${s+rand(-15,15)||5}\\text{ mph}`)}; });
            styles.push(() => { const s=rand(30,70),t=rand(2,5),d=s*t; return {q:`Speed $${s}$ km/h for $${t}$ hrs. Distance?`,ans:`${d}\\text{ km}`,opt:genOpts(`${d}\\text{ km}`,()=>`${d+rand(-20,20)||10}\\text{ km}`)}; });
            styles.push(() => { const a=rand(2,5),b=rand(2,5),tot=rand(4,10)*(a+b); const share=(tot/(a+b))*a; return {q:`Share $\\$${tot}$ in the ratio $${a}:${b}$. Smaller share?`,ans:`\\$${Math.min(share, tot-share)}`,opt:genOpts(`\\$${Math.min(share, tot-share)}`,()=>`\\$${Math.min(share, tot-share)+rand(-10,10)||5}`)}; });
        } else if (diff === 'medium') {
            styles.push(() => { const sp=randItem([40,60,80]),tm=randItem([30,45,90]),d=sp*(tm/60); return {q:`Cyclist: $${d}$ km at $${sp}$ km/h. Time in minutes?`,ans:`${tm}\\text{ min}`,opt:genOpts(`${tm}\\text{ min}`,()=>`${tm+rand(-20,20)||10}\\text{ min}`)}; });
            styles.push(() => { const m=rand(20,80),v=rand(2,10),d=m/v; return {q:`Mass $${m}$ g, Volume $${v}$ cm$^3$. Density?`,ans:`${d}\\text{ g/cm}^3`,opt:genOpts(`${d}\\text{ g/cm}^3`,()=>`${d+rand(-5,5)||1}\\text{ g/cm}^3`)}; });
            styles.push(() => { const p=rand(1000,5000),r=rand(2,5),t=2; const ans=Math.round(p*Math.pow(1+r/100,t)); return {q:`Invest $\\$${p}$ at $${r}\\%$ compound interest for $${t}$ years. Total?`,ans:`\\$${ans}`,opt:genOpts(`\\$${ans}`,()=>`\\$${ans+rand(-100,100)||50}`)}; });
        } else {
            styles.push(() => { const d1=rand(20,50),t1=rand(1,2),d2=rand(40,80),t2=rand(1,3),avgSp=Math.round((d1+d2)/(t1+t2)); return {q:`Journey 1: $${d1}$ mi in $${t1}$ hr. Journey 2: $${d2}$ mi in $${t2}$ hr. Avg speed?`,ans:`${avgSp}\\text{ mph}`,opt:genOpts(`${avgSp}\\text{ mph}`,()=>`${avgSp+rand(-10,10)||2}\\text{ mph}`)}; });
            styles.push(() => { const sp=randItem([5,10,15,20]),tm_s=randItem([30,45,60,120]),d=sp*tm_s; return {q:`Runner: $${sp}$ m/s for $${tm_s}$ seconds. Distance?`,ans:`${d}\\text{ m}`,opt:genOpts(`${d}\\text{ m}`,()=>`${d+rand(-50,50)||20}\\text{ m}`)}; });
            styles.push(() => { const x1=rand(2,6),y1=rand(10,30)*x1,k=y1*x1,x2=rand(2,6); const y2=Math.round((k/x2)*100)/100; return {q:`$y$ is inversely proportional to $x$. When $x = ${x1}, y = ${y1}$. Find $y$ when $x = ${x2}$.`,ans:''+y2,opt:genOpts(y2,()=>Math.round((y2+rand(-5,5)||2)*100)/100)}; });
        }
        return pick(styles)();
    }
};