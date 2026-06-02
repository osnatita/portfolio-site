// Trolley UI Kit — atomic components
const { useState } = React;

// ───────── Button ─────────
window.Button = function Button({ variant='primary', size='md', children, ...props }) {
  const base = { fontFamily:'inherit', fontWeight:600, borderRadius:8, border:'1px solid transparent', cursor:'pointer', lineHeight:1, transition:'all 150ms ease-out', display:'inline-flex', alignItems:'center', gap:6, whiteSpace:'nowrap' };
  const sizes = { sm:{padding:'6px 10px',fontSize:12}, md:{padding:'9px 14px',fontSize:14}, lg:{padding:'12px 20px',fontSize:15} };
  const variants = {
    primary: { background:'#0092FF', color:'#fff', boxShadow:'0 1px 2px rgba(0,146,255,.2)' },
    secondary: { background:'#fff', color:'#0C1720', borderColor:'rgba(12,23,32,.16)' },
    ghost: { background:'transparent', color:'#0092FF' },
    danger: { background:'#F76666', color:'#fff' },
    dark: { background:'#0C1720', color:'#fff' },
  };
  return <button style={{...base, ...sizes[size], ...variants[variant]}} {...props}>{children}</button>;
};

// ───────── Badge ─────────
window.Badge = function Badge({ tone='neutral', children, dot=false }) {
  const tones = {
    live:   { background:'rgba(87,173,145,.18)', color:'#2E8B6E' },
    sand:   { background:'rgba(255,186,8,.20)',  color:'#8A6200' },
    new:    { background:'#0092FF', color:'#fff' },
    err:    { background:'rgba(247,102,102,.18)', color:'#C33' },
    neutral:{ background:'rgba(12,23,32,.08)',    color:'rgba(12,23,32,.7)' },
    info:   { background:'rgba(0,146,255,.12)', color:'#0076CC' },
  };
  return <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'3px 8px',borderRadius:999,fontWeight:600,fontSize:11,letterSpacing:'.02em',textTransform:'uppercase',...tones[tone]}}>
    {dot && <span style={{width:6,height:6,borderRadius:999,background:'currentColor'}}/>}
    {children}
  </span>;
};

// ───────── Sparkline ─────────
window.Sparkline = function Sparkline({ data, color='#0092FF', width=120, height=32 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const rng = max - min || 1;
  const pts = data.map((v,i) => [i/(data.length-1)*width, height - ((v-min)/rng)*height]).map(p => p.join(',')).join(' ');
  return <svg width={width} height={height} style={{display:'block'}}>
    <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
};

// ───────── Tile ─────────
window.Tile = function Tile({ title, value, meta, trend, spark, icon, children }) {
  return <div style={{background:'#fff',borderRadius:16,padding:20,boxShadow:'0 1px 3px rgba(0,0,0,.04),0 1px 2px rgba(0,0,0,.08)',display:'flex',flexDirection:'column',gap:12,minHeight:128}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{fontWeight:600,fontSize:13,color:'rgba(12,23,32,.6)'}}>{title}</div>
      {icon}
    </div>
    {value && <div style={{fontWeight:700,fontSize:32,letterSpacing:'-.01em',lineHeight:1,color:'#0C1720'}}>{value}</div>}
    {(meta || trend || spark) && <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
      <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12}}>
        {meta && <span style={{color:'rgba(12,23,32,.6)'}}>{meta}</span>}
        {trend && <Badge tone={trend.startsWith('↑')?'live':'err'}>{trend}</Badge>}
      </div>
      {spark}
    </div>}
    {children}
  </div>;
};
