// Trolley Sidebar + Header
const { useState: useStateSh } = React;

const NAV_ITEMS = [
  { id:'dashboard', label:'Dashboard', icon:'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { id:'payments',  label:'Payments',  icon:'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z' },
  { id:'recipients',label:'Recipients',icon:'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { id:'balances',  label:'Balances',  icon:'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' },
  { id:'invoices',  label:'Invoices',  icon:'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
  { id:'reports',   label:'Reports',   icon:'M3 3v18h18v-2H5V3H3zm4 14h2v-7H7v7zm4 0h2V7h-2v10zm4 0h2v-5h-2v5z' },
  { id:'tickets',   label:'Tickets',   icon:'M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z' },
  { id:'settings',  label:'Settings',  icon:'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94 0 .31.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' },
];

window.Sidebar = function Sidebar({ active, onNav }) {
  return <div style={{width:70,background:'#441645',display:'flex',flexDirection:'column',alignItems:'center',padding:'16px 0',gap:4,flexShrink:0,height:'100vh'}}>
    <div style={{width:40,height:40,borderRadius:10,background:'#0092FF',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12,fontWeight:800,color:'#fff',fontSize:20,fontStyle:'italic'}}>t</div>
    {NAV_ITEMS.map(item => {
      const isActive = item.id === active;
      return <button key={item.id} onClick={()=>onNav(item.id)} title={item.label}
        style={{width:46,height:46,borderRadius:8,border:'none',cursor:'pointer',
          background: isActive ? '#612569' : 'transparent',
          color: isActive ? '#fff' : 'rgba(255,255,255,.6)',
          display:'flex',alignItems:'center',justifyContent:'center',transition:'all 150ms'}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={item.icon}/></svg>
      </button>;
    })}
    <div style={{flex:1}}/>
    <div style={{width:32,height:32,borderRadius:999,background:'#0092FF',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13}}>OP</div>
  </div>;
};

window.Header = function Header({ title, breadcrumb }) {
  return <div style={{height:64,background:'#fff',borderBottom:'1px solid rgba(12,23,32,.08)',display:'flex',alignItems:'center',padding:'0 32px',gap:16,flexShrink:0}}>
    <div style={{flex:1,display:'flex',alignItems:'center',gap:10}}>
      {breadcrumb && <span style={{fontSize:13,color:'rgba(12,23,32,.4)'}}>{breadcrumb} /</span>}
      <h1 style={{fontWeight:700,fontSize:20,margin:0,color:'#0C1720'}}>{title}</h1>
    </div>
    <div style={{display:'flex',alignItems:'center',gap:14}}>
      <button style={{width:36,height:36,borderRadius:999,border:'1px solid rgba(12,23,32,.1)',background:'#fff',cursor:'pointer',position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0C1720"><path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 1 0-3 0v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
        <span style={{position:'absolute',top:6,right:8,width:7,height:7,borderRadius:999,background:'#0092FF',border:'1.5px solid #fff'}}/>
      </button>
      <button style={{display:'flex',alignItems:'center',gap:10,padding:'5px 12px 5px 5px',borderRadius:999,border:'1px solid rgba(12,23,32,.1)',background:'#fff',cursor:'pointer',fontFamily:'inherit'}}>
        <span style={{width:26,height:26,borderRadius:999,background:'#1DB954',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12}}>S</span>
        <span style={{fontWeight:600,fontSize:13,color:'#0C1720'}}>Spotify</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(12,23,32,.4)"><path d="M7 10l5 5 5-5z"/></svg>
      </button>
      <div style={{width:36,height:36,borderRadius:999,background:'#E6F4FF',color:'#0092FF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13}}>OP</div>
    </div>
  </div>;
};
