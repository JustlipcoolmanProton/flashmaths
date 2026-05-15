const genGeometry = {
    Pythagoras(diff) {
        const triples=[[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25]];
        const t=randItem(triples);
        const sc=diff==='easy'?1:diff==='medium'?rand(1,2):rand(2,3);
        const a=t[0]*sc, b=t[1]*sc, c=t[2]*sc;
        const styles = [];

        styles.push(() => ({q:`Find the hypotenuse.`,diagram:triSVG(a,b,c,'c'),ans:`${c}\\text{ cm}`,opt:genOpts(`${c}\\text{ cm}`,()=>`${c+rand(-4,4)||1}\\text{ cm}`)}));
        styles.push(() => ({q:`Find the missing side.`,diagram:triSVG(a,b,c,'b'),ans:`${b}\\text{ cm}`,opt:genOpts(`${b}\\text{ cm}`,()=>`${b+rand(-4,4)||1}\\text{ cm}`)}));
        styles.push(() => ({q:`A triangle has sides $${a}$, $${b}$, $${c}$. Which is the hypotenuse?`,ans:`${c}`,opt:shuffle([`${a}`,`${b}`,`${c}`,`${a+b}`])}));

        if (diff === 'easy' || diff === 'medium') {
            styles.push(() => ({q:`A $${c}$ m ladder leans against a wall, $${a}$ m from the base. How high up does it reach?`,diagram:triSVG(a,b,c,'b'),ans:`${b}\\text{ m}`,opt:genOpts(`${b}\\text{ m}`,()=>`${b+rand(-4,4)||1}\\text{ m}`)}));
            styles.push(() => ({q:`A ship sails $${a}$ km east then $${b}$ km north. Distance from start?`,diagram:triSVG(a,b,c,'c'),ans:`${c}\\text{ km}`,opt:genOpts(`${c}\\text{ km}`,()=>`${c+rand(-3,3)||1}\\text{ km}`)}));
            styles.push(() => ({q:`A triangle has sides $${a}$, $${b}$, $${c}$. Which is the shortest side?`,ans:`${a}`,opt:shuffle([`${a}`,`${b}`,`${c}`,`${Math.abs(c-b)}`])}));
        }

        if (diff === 'medium' || diff === 'hard') {
            styles.push(() => { const yes=rand(0,1); const sides=yes?[a,b,c]:[a,b,c+rand(1,3)]; return {q:`Triangle sides: $${sides[0]}, ${sides[1]}, ${sides[2]}$. Is it right-angled?`,ans:yes?'\\text{Yes}':'\\text{No}',opt:shuffle(['\\text{Yes}','\\text{No}','\\text{Not enough info}','\\text{Maybe}'])}; });
            styles.push(() => {
                const dx = a, dy = b;
                const x1 = rand(-5, 5), y1 = rand(-5, 5);
                const x2 = x1 + dx, y2 = y1 + dy;
                return {q:`Distance between points $(${x1}, ${y1})$ and $(${x2}, ${y2})$?`, ans:`${c}`, opt:genOpts(`${c}`,()=>`${c+rand(-3,3)||1}`)};
            });
            styles.push(() => ({q:`Right triangle with legs $${a}$ cm and $${b}$ cm. Find its perimeter.`,ans:`${a+b+c}\\text{ cm}`,opt:genOpts(`${a+b+c}\\text{ cm}`,()=>`${a+b+c+rand(-5,5)||2}\\text{ cm}`)}));
        }

        if (diff === 'hard') {
             styles.push(() => {
                 const dims = randItem([[2,3,6,7], [1,4,8,9], [4,4,7,9], [3,4,12,13]]);
                 const l=dims[0]*sc, w=dims[1]*sc, h=dims[2]*sc, diag=dims[3]*sc;
                 return {q:`A box is $${l} \\times ${w} \\times ${h}$ m. Longest internal diagonal?`,ans:`${diag}\\text{ m}`,opt:genOpts(`${diag}\\text{ m}`,()=>`${diag+rand(-3,3)||1}\\text{ m}`)};
             });
        }
        return pick(styles)();
    },
    AreaVolume(diff) {
        const styles = [];
        if (diff === 'easy') {
            styles.push(() => { const w=rand(4,12),h=rand(3,9); return {q:`Find the area.`,diagram:rectSVG(w,h),ans:`${w*h}\\text{ cm}^2`,opt:genOpts(`${w*h}\\text{ cm}^2`,()=>`${w*h+rand(-10,10)||2}\\text{ cm}^2`)}; });
            styles.push(() => { const w=rand(4,12),h=rand(3,9),p=2*(w+h); return {q:`Find the perimeter.`,diagram:rectSVG(w,h),ans:`${p}\\text{ cm}`,opt:genOpts(`${p}\\text{ cm}`,()=>`${p+rand(-8,8)||2}\\text{ cm}`)}; });
            styles.push(() => { const w=rand(5,15),h=rand(4,10); return {q:`A garden is $${w}$ m by $${h}$ m. Find its area.`,diagram:rectSVG(w,h),ans:`${w*h}\\text{ m}^2`,opt:genOpts(`${w*h}\\text{ m}^2`,()=>`${w*h+rand(-12,12)||3}\\text{ m}^2`)}; });
            styles.push(() => { const w=rand(5,15),h=rand(4,10),p=2*(w+h); return {q:`How much fencing for a $${w}$ m by $${h}$ m field?`,diagram:rectSVG(w,h),ans:`${p}\\text{ m}`,opt:genOpts(`${p}\\text{ m}`,()=>`${p+rand(-10,10)||3}\\text{ m}`)}; });
            styles.push(() => { const base=rand(5,12),h=rand(4,10); return {q:`Parallelogram: base $${base}$ cm, perp. height $${h}$ cm. Area?`,ans:`${base*h}\\text{ cm}^2`,opt:genOpts(`${base*h}\\text{ cm}^2`,()=>`${base*h+rand(-10,10)||2}\\text{ cm}^2`)}; });
            styles.push(() => { const sides=rand(5,8),len=rand(3,9); const names={5:'pentagon',6:'hexagon',7:'heptagon',8:'octagon'}; return {q:`Regular ${names[sides]} with side $${len}$ cm. Perimeter?`,ans:`${sides*len}\\text{ cm}`,opt:genOpts(`${sides*len}\\text{ cm}`,()=>`${sides*len+rand(-6,6)||2}\\text{ cm}`)}; });
        } else if (diff === 'medium') {
            styles.push(() => { const b=rand(4,12),h=rand(4,10); return {q:`Find the area.`,diagram:triShapeSVG(b,h),ans:`${(b*h)/2}\\text{ cm}^2`,opt:genOpts(`${(b*h)/2}\\text{ cm}^2`,()=>`${(b*h)/2+rand(-10,10)||3}\\text{ cm}^2`)}; });
            styles.push(() => { const w1=rand(4,8),h1=rand(3,6),w2=rand(5,10),h2=rand(2,5); const a1=w1*h1,a2=w2*h2; const ans=a1>a2?`\\text{A} (${a1})`:a1<a2?`\\text{B} (${a2})`:'\\text{Same}'; return {q:`Rect A: $${w1} \\times ${h1}$. Rect B: $${w2} \\times ${h2}$. Which has more area?`,ans,opt:shuffle([`\\text{A} (${a1})`,`\\text{B} (${a2})`,'\\text{Same}',`${a1+a2}`])}; });
            styles.push(() => { const a=rand(4,10),b=rand(6,14),h=rand(3,8),area=(a+b)*h/2; return {q:`Trapezium: parallel sides $${a}$ cm and $${b}$ cm, height $${h}$ cm. Area?`,ans:`${area}\\text{ cm}^2`,opt:genOpts(`${area}\\text{ cm}^2`,()=>`${area+rand(-15,15)||4}\\text{ cm}^2`)}; });
            styles.push(() => { const r=rand(3,9); const ans=(Math.PI*r*r).toFixed(1); return {q:`Area of a circle, radius $${r}$ cm (to 1 d.p.)?`,ans:`${ans}\\text{ cm}^2`,opt:genOpts(`${ans}\\text{ cm}^2`,()=>(Math.PI*r*r+rand(-10,10)||1.5).toFixed(1)+'\\text{ cm}^2')}; });
            styles.push(() => { const d=rand(4,12); const ans=(Math.PI*d).toFixed(1); return {q:`Circumference of a circle, diameter $${d}$ cm (to 1 d.p.)?`,ans:`${ans}\\text{ cm}`,opt:genOpts(`${ans}\\text{ cm}`,()=>(Math.PI*d+rand(-5,5)||2).toFixed(1)+'\\text{ cm}')}; });
            styles.push(() => { const W=rand(6,10),H=rand(4,6),w=rand(2,3),h=rand(1,2); const a=(W*H)-(w*h); return {q:`A wall $${W} \\times ${H}$ m has a window $${w} \\times ${h}$ m. Area to paint?`,ans:`${a}\\text{ m}^2`,opt:genOpts(`${a}\\text{ m}^2`,()=>`${a+rand(-8,8)||3}\\text{ m}^2`)}; });
        } else {
            styles.push(() => { const s=rand(3,8),v=s*s*s; return {q:`Find the volume.`,diagram:cubeSVG(s),ans:`${v}\\text{ cm}^3`,opt:genOpts(`${v}\\text{ cm}^3`,()=>`${v+rand(-20,20)||5}\\text{ cm}^3`)}; });
            styles.push(() => { const s=rand(3,7),sa=6*s*s; return {q:`Surface area of a cube, side $${s}$ cm?`,diagram:cubeSVG(s),ans:`${sa}\\text{ cm}^2`,opt:genOpts(`${sa}\\text{ cm}^2`,()=>`${sa+rand(-30,30)||6}\\text{ cm}^2`)}; });
            styles.push(() => { const l=rand(3,8),w=rand(2,6),h=rand(2,5),v=l*w*h; return {q:`Cuboid: $${l} \\times ${w} \\times ${h}$ cm. Volume?`,ans:`${v}\\text{ cm}^3`,opt:genOpts(`${v}\\text{ cm}^3`,()=>`${v+rand(-25,25)||5}\\text{ cm}^3`)}; });
            styles.push(() => { const l=rand(40,80),w=rand(30,50),h=rand(30,50); const v_cm3=l*w*h; const liters=v_cm3/1000; return {q:`Fish tank $${l} \\times ${w} \\times ${h}$ cm. Capacity in Litres?`,ans:`${liters}\\text{ L}`,opt:genOpts(`${liters}\\text{ L}`,()=>`${liters+rand(-10,10)||2}\\text{ L}`)}; });
            styles.push(() => { const r=rand(2,6),h=rand(5,12); const v=r*r*h; return {q:`Cylinder: radius $${r}$ cm, height $${h}$ cm. Volume?`,ans:`${v}\\pi\\text{ cm}^3`,opt:genOpts(`${v}\\pi\\text{ cm}^3`,()=>`${v+rand(-15,15)||5}\\pi\\text{ cm}^3`)}; });
            styles.push(() => { const b=rand(3,8),h=rand(4,8),l=rand(5,12); const v=(b*h/2)*l; return {q:`Triangular prism: base $${b}$ cm, height $${h}$ cm, length $${l}$ cm. Volume?`,ans:`${v}\\text{ cm}^3`,opt:genOpts(`${v}\\text{ cm}^3`,()=>`${v+rand(-15,15)||4}\\text{ cm}^3`)}; });
            styles.push(() => { const r=rand(3,6); const v=Math.round((4/3)*Math.PI*Math.pow(r,3)); return {q:`Sphere: radius $${r}$ cm. Volume (to nearest whole)?`,ans:`${v}\\text{ cm}^3`,opt:genOpts(`${v}\\text{ cm}^3`,()=>`${v+rand(-50,50)||20}\\text{ cm}^3`)}; });
            styles.push(() => { const w=rand(4,8),l=rand(5,10),c=rand(15,30); const total=(w*l)*c; return {q:`Room $${w} \\times ${l}$ m. Carpet costs $\\$${c}$ /m$^2$. Total cost?`,ans:`\\$${total}`,opt:genOpts(`\\$${total}`,()=>`\\$${total+rand(-50,50)||20}`)}; });
        }
        return pick(styles)();
    }
};