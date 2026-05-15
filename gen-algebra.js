const genAlgebra = {
    Equations(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => { const a=rand(2,5),x=rand(2,10),b=a*x; return {q:`Solve $${a}x = ${b}$`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-4,4)||1}`)}; });
            styles.push(() => { const x=rand(1,10),b=rand(2,8),c=x+b; return {q:`Solve $x + ${b} = ${c}$`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-3,3)||1}`)}; });
            styles.push(() => { const x=rand(2,12),b=rand(3,9),c=x-b; return {q:`Solve $x - ${b} = ${c}$`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-4,4)||1}`)}; });
            styles.push(() => { const n=rand(2,10),m=rand(2,5),r=n*m; return {q:`I think of a number, multiply by $${m}$ and get $${r}$. What is it?`,ans:`${n}`,opt:genOpts(n,()=>n+rand(-4,4)||1)}; });
        } else if (diff === 'medium') {
            styles.push(() => { const a=rand(2,6),x=rand(2,10),b=rand(2,10),c=a*x+b; return {q:`Solve $${a}x + ${b} = ${c}$`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-5,5)||2}`)}; });
            styles.push(() => { const a=rand(2,5),x=rand(2,8),b=rand(3,12),c=a*x-b; return {q:`Solve $${a}x - ${b} = ${c}$`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-4,4)||1}`)}; });
            styles.push(() => { const x=rand(2,10),a=rand(2,5),b=rand(2,8),c=(x/a)+b; return {q:`Solve \\frac{x}{${a}} + ${b} = ${c}`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-4,4)*a||a}`)}; });
            styles.push(() => { const n=rand(3,12),m=rand(2,5),add=rand(2,8),r=n*m+add; return {q:`Think of a number, multiply by $${m}$, add $${add}$, get $${r}$. What is the number?`,ans:`${n}`,opt:genOpts(n,()=>n+rand(-4,4)||1)}; });
        } else {
            styles.push(() => { const a=rand(3,7),a2=rand(1,a-1),x=rand(2,8),b=rand(2,10),c=(a*x+b)-(a2*x); return {q:`Solve $${a}x + ${b} = ${a2===1?'':a2}x + ${c}$`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-5,5)||2}`)}; });
            styles.push(() => { const x=rand(2,6),a=rand(2,4),b=rand(1,5),r=a*(x+b); return {q:`Solve $${a}(x + ${b}) = ${r}$`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-4,4)||1}`)}; });
            styles.push(() => { const x=rand(2,8),a=rand(2,5),b=rand(2,8),c=rand(2,4),d=(a*x+b)/c; return {q:`Solve \\frac{${a}x + ${b}}{${c}} = ${d}`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-3,3)||1}`)}; });
            styles.push(() => { const x=rand(3,9),a=rand(2,10),b=x*x+a; return {q:`Solve $x^2 + ${a} = ${b}$ for $x > 0$`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-3,3)||1}`)}; });
        }
        return pick(styles)();
    },
    SimultaneousEq(diff) {
        const styles = [];
        const mkSys = () => {
            const x=rand(1,diff==='easy'?5:8),y=rand(1,diff==='easy'?5:8);
            let a,b,d,e;
            if(diff==='easy'){a=1;b=1;d=rand(2,3);e=1;} else if(diff==='medium'){a=rand(1,3);b=rand(1,3);d=rand(2,4);e=rand(1,3);} else{a=rand(2,5);b=rand(2,5);d=rand(2,5);e=rand(2,5);}
            if(a*e===b*d)e++;
            return {x,y,a,b,d,e,c1:a*x+b*y,c2:d*x+e*y};
        };
        styles.push(() => { const s=mkSys(); return {q:`$${s.a===1?'':s.a}x + ${s.b===1?'':s.b}y = ${s.c1}$ and $${s.d===1?'':s.d}x + ${s.e===1?'':s.e}y = ${s.c2}$. Find $x$.`,ans:`x = ${s.x}`,opt:genOpts(`x = ${s.x}`,()=>`x = ${s.x+rand(-4,4)||1}`)}; });
        styles.push(() => { const s=mkSys(); return {q:`$${s.a===1?'':s.a}x + ${s.b===1?'':s.b}y = ${s.c1}$ and $${s.d===1?'':s.d}x + ${s.e===1?'':s.e}y = ${s.c2}$. Find $y$.`,ans:`y = ${s.y}`,opt:genOpts(`y = ${s.y}`,()=>`y = ${s.y+rand(-4,4)||1}`)}; });
        if (diff === 'hard') {
            styles.push(() => { const x=rand(2,6),y=rand(2,6),a=rand(2,4),b=rand(2,4),c1=a*x+b*y,m=rand(2,3),c=y-m*x; return {q:`$${a}x + ${b}y = ${c1}$ and $y = ${m}x ${c>=0?'+':'-'} ${Math.abs(c)}$. Find $x$.`,ans:`x = ${x}`,opt:genOpts(`x = ${x}`,()=>`x = ${x+rand(-3,3)||1}`)}; });
        }
        styles.push(() => { const a=rand(2,5),c=rand(3,7),na=rand(1,4),nc=rand(1,4),tot=a*na+c*nc; const na2=rand(1,4),nc2=rand(1,4),tot2=a*na2+c*nc2; if(na*nc2===nc*na2)nc2++; return {q:`$${na}$ adult and $${nc}$ child tickets cost $\\$${tot}$. $${na2}$ adult and $${nc2}$ child cost $\\$${a*na2+c*nc2}$. Adult price?`,ans:`\\$${a}`,opt:genOpts(`\\$${a}`,()=>`\\$${a+rand(-3,3)||1}`)}; });
        return pick(styles)();
    },
    Expanding(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => { const a=rand(2,6),b=rand(2,8); return {q:`Expand $${a}(x + ${b})$`,ans:`${a}x + ${a*b}`,opt:genOpts(`${a}x + ${a*b}`,()=>`${a}x + ${a*b+rand(-10,10)||2}`)}; });
            styles.push(() => { const a=rand(2,5),b=rand(2,7); return {q:`Expand $${a}(x - ${b})$`,ans:`${a}x - ${a*b}`,opt:genOpts(`${a}x - ${a*b}`,()=>`${a}x - ${a*b+rand(-8,8)||2}`)}; });
            styles.push(() => { const a=rand(2,6),b=rand(2,8); return {q:`Factorise $${a}x + ${a*b}$`,ans:`${a}(x + ${b})`,opt:genOpts(`${a}(x + ${b})`,()=>`${a}(x + ${b+rand(-3,3)||1})`)}; });
        } else if (diff === 'medium') {
            styles.push(() => { const a=rand(2,6),c=rand(2,6); return {q:`Expand $(x + ${a})(x + ${c})$`,ans:`x^2 + ${a+c}x + ${a*c}`,opt:genOpts(`x^2 + ${a+c}x + ${a*c}`,()=>`x^2 + ${a+c+rand(-3,3)||1}x + ${a*c+rand(-6,6)||2}`)}; });
            styles.push(() => { const a=rand(2,5),c=rand(2,5); return {q:`Expand $(x + ${a})(x - ${c})$`,ans:`x^2 ${a-c>=0?'+':'-'} ${Math.abs(a-c)}x - ${a*c}`,opt:genOpts(`x^2 ${a-c>=0?'+':'-'} ${Math.abs(a-c)}x - ${a*c}`,()=>`x^2 ${a-c>=0?'+':'-'} ${Math.abs(a-c)+rand(-2,2)||1}x - ${a*c+rand(-5,5)||2}`)}; });
            styles.push(() => { const a=rand(2,6),c=rand(2,6); return {q:`Factorise $x^2 + ${a+c}x + ${a*c}$`,ans:`(x + ${a})(x + ${c})`,opt:genOpts(`(x + ${a})(x + ${c})`,()=>`(x + ${a+rand(-2,2)||1})(x + ${c+rand(-2,2)||1})`)}; });
        } else {
            styles.push(() => { const a=rand(2,6),b=rand(2,8),c=rand(2,4),d=rand(2,5); const mid=a*d-b*c; const ms=mid===0?'':(mid>0?`+ ${mid}x`:`- ${Math.abs(mid)}x`); const ans=`${c*d}x^2 ${ms} - ${a*b}`.replace(/\s+/g,' ').trim(); return {q:`Expand $(${c}x + ${a})(${d}x - ${b})$`,ans,opt:genOpts(ans,()=>{const m2=mid+rand(-4,4)||2;const s2=m2>0?`+ ${m2}x`:`- ${Math.abs(m2)}x`;return `${c*d}x^2 ${s2} - ${a*b+rand(-5,5)||3}`.replace(/\s+/g,' ').trim();})}; });
            styles.push(() => { const a=rand(2,6); return {q:`Expand $(x + ${a})^2$`,ans:`x^2 + ${2*a}x + ${a*a}`,opt:genOpts(`x^2 + ${2*a}x + ${a*a}`,()=>`x^2 + ${2*a+rand(-2,2)||1}x + ${a*a+rand(-5,5)||2}`)}; });
            styles.push(() => { const a=rand(2,6); return {q:`Factorise $x^2 - ${a*a}$`,ans:`(x - ${a})(x + ${a})`,opt:genOpts(`(x - ${a})(x + ${a})`,()=>`(x - ${a+rand(-2,2)||1})(x + ${a+rand(-2,2)||1})`)}; });
        }
        return pick(styles)();
    },
    Substitution(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => { const x=rand(2,6),y=rand(2,5),a=rand(2,5),b=rand(2,4),ans=a*x+b*y; return {q:`If $x = ${x}$ and $y = ${y}$, find $${a}x + ${b}y$`,ans:''+ans,opt:genOpts(ans,()=>ans+rand(-10,10)||2)}; });
            styles.push(() => { const n=rand(2,8),cost=rand(2,5),fee=rand(3,10),ans=cost*n+fee; return {q:`Cost $C = ${cost}n + ${fee}$. Find $C$ when $n = ${n}$`,ans:''+ans,opt:genOpts(ans,()=>ans+rand(-10,10)||2)}; });
        } else if (diff === 'medium') {
            styles.push(() => { const x=rand(2,5),y=rand(-5,-2),a=rand(2,5),b=rand(2,4),ans=a*x+b*y; return {q:`If $x = ${x}$ and $y = ${y}$, find $${a}x + ${b}y$`,ans:''+ans,opt:genOpts(ans,()=>ans+rand(-10,10)||2)}; });
            styles.push(() => { const t=rand(1,5),ans=5*t*t+3; return {q:`If $h = 5t^2 + 3$, find $h$ when $t = ${t}$`,ans:''+ans,opt:genOpts(ans,()=>ans+rand(-15,15)||3)}; });
            styles.push(() => { const u=rand(2,8),a=rand(2,5),t=rand(3,10),v=u+a*t; return {q:`Velocity $v = u + at$. Find $v$ when $u = ${u}, a = ${a}, t = ${t}$`,ans:''+v,opt:genOpts(v,()=>v+rand(-10,10)||2)}; });
        } else {
            styles.push(() => { const x=rand(-5,-2),a=rand(2,5),b=rand(2,4),y=rand(-5,-2),ans=a*(x*x)+b*y; return {q:`If $x = ${x}$ and $y = ${y}$, find $${a}x^2 + ${b}y$`,ans:''+ans,opt:genOpts(ans,()=>ans+rand(-15,15)||2)}; });
            styles.push(() => { const r=rand(2,6),ans=Math.round(Math.PI*r*r*100)/100; return {q:`Area $A = \\pi r^2$. Find $A$ when $r = ${r}$ (to 2 d.p.)`,ans:''+ans,opt:genOpts(ans,()=>(ans+rand(-10,10)||3).toFixed(2))}; });
            styles.push(() => { const m=rand(2,10),v=rand(2,6),e=0.5*m*v*v; return {q:`Kinetic Energy $E = \\frac{1}{2}mv^2$. Find $E$ when $m = ${m}$ and $v = ${v}$`,ans:''+e,opt:genOpts(e,()=>e+rand(-10,10)||4)}; });
        }
        return pick(styles)();
    },
    Sequences(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => { const d=rand(2,5),s=rand(2,10),t=[s,s+d,s+2*d,s+3*d],nx=s+4*d; return {q:`Next term: $${t.join(', ')}, \\dots$`,ans:''+nx,opt:genOpts(nx,()=>nx+rand(-5,5)||1)}; });
            styles.push(() => { const r=rand(2,4),s=rand(1,3),t=[s,s*r,s*r*r,s*r*r*r],nx=s*r*r*r*r; return {q:`Next term: $${t.join(', ')}, \\dots$`,ans:''+nx,opt:genOpts(nx,()=>nx+rand(-20,20)||5)}; });
        } else if (diff === 'medium') {
            styles.push(() => { const d=rand(3,8),s=rand(2,10),t=[s,s+d,s+2*d,s+3*d],c0=s-d; const nth=c0===0?`${d}n`:`${d}n ${c0>0?'+':'-'} ${Math.abs(c0)}`; return {q:`Nth term of: $${t.join(', ')}, \\dots$`,ans:nth,opt:genOpts(nth,()=>`${d+rand(-2,2)||1}n ${c0>=0?'+':'-'} ${Math.abs(c0)+rand(-3,3)||2}`)}; });
            styles.push(() => { const d=rand(3,7),s=rand(2,8),target=s+d*rand(8,15); const pos=((target-s)/d)+1; return {q:`Sequence: $${d}n + ${s-d}$. What position is $${target}$?`,ans:''+pos,opt:genOpts(pos,()=>pos+rand(-3,3)||1)}; });
        } else {
            styles.push(() => { const d=rand(-6,-2),s=rand(20,40),t=[s,s+d,s+2*d,s+3*d],c0=s-d; const nth=`${d}n ${c0>=0?'+':'-'} ${Math.abs(c0)}`; return {q:`Nth term of: $${t.join(', ')}, \\dots$`,ans:nth,opt:genOpts(nth,()=>`${d+rand(-2,2)||1}n ${c0>=0?'+':'-'} ${Math.abs(c0)+rand(-4,4)||2}`)}; });
            styles.push(() => { const d=rand(3,7),s=rand(2,10),target=s+d*5+1; const inSeq=(target-s)%d===0; return {q:`Is $${target}$ in the sequence $${d}n ${s-d>=0?'+':'-'} ${Math.abs(s-d)}$?`,ans:inSeq?'\\text{Yes}':'\\text{No}',opt:shuffle(['\\text{Yes}','\\text{No}','\\text{Maybe}','\\text{Cannot tell}'])}; });
            styles.push(() => { const a=rand(1,2), b=rand(-3,3), c=rand(-5,5); const t=[a+b+c, a*4+b*2+c, a*9+b*3+c, a*16+b*4+c]; const nth=`${a===1?'':a}n^2 ${b===0?'':(b>0?'+ '+b+'n':'- '+Math.abs(b)+'n')} ${c===0?'':(c>0?'+ '+c:'- '+Math.abs(c))}`.replace(/\s+/g,' ').trim(); return {q:`Nth term of quadratic sequence: $${t.join(', ')}, \\dots$`, ans:nth, opt:genOpts(nth,()=>`${a===1?'':a}n^2 ${b===0?'':(b>0?'+ '+(b+1)+'n':'- '+Math.abs(b-1)+'n')} ${c===0?'':(c>0?'+ '+(c+2):'- '+Math.abs(c-2))}`.replace(/\s+/g,' ').trim())}; });
        }
        return pick(styles)();
    }
};