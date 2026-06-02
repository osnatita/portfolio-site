// Trolley dashboard screens
const { useState: useStateSc } = React;

window.DashboardScreen = function DashboardScreen() {
  return <div style={{padding:32,display:'flex',flexDirection:'column',gap:24}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div>
        <div style={{fontSize:12,fontWeight:600,color:'rgba(12,23,32,.6)',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:6}}>Overview</div>
        <h2 style={{fontSize:28,fontWeight:700,margin:0,color:'#0C1720',letterSpacing:'-.01em'}}>Good morning, Olivia</h2>
      </div>
      <div style={{display:'flex',gap:8}}>
        <Button variant="secondary">Export CSV</Button>
        <Button variant="primary">+ Send Payment</Button>
      </div>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
      <Tile title="Payment Sent (Value)" value="$89,421" meta="This month" trend="↑ 82.5%"
        spark={<Sparkline data={[3,5,4,8,6,9,12,10,14,17,15,21]}/>} />
      <Tile title="Average Payment" value="$342.10" meta="Last month" trend="↑ 5.1%"
        spark={<Sparkline data={[10,11,9,10,11,10,12,11,12,13,12,14]} color="#57AD91"/>} />
      <Tile title="New Recipients" value="128" meta="This month" trend="↑ 12.4%"
        spark={<Sparkline data={[2,3,3,5,4,6,5,7,9,8,10,12]} color="#0092FF"/>} />
      <Tile title="Failed Payments" value="3" meta="This month" trend="↓ 40.0%"
        spark={<Sparkline data={[8,7,9,6,5,4,6,5,3,4,2,3]} color="#F76666"/>} />
    </div>

    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
      <div style={{background:'#fff',borderRadius:16,padding:24,boxShadow:'0 1px 3px rgba(0,0,0,.04),0 1px 2px rgba(0,0,0,.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <h3 style={{fontWeight:600,fontSize:16,margin:0,color:'#0C1720'}}>Account Balances</h3>
          <span style={{fontSize:12,color:'rgba(12,23,32,.6)'}}>Across 4 currencies</span>
        </div>
        {[
          {cc:'USD',name:'US Dollar',amt:'$124,531.00',pct:'52%',col:'#0092FF'},
          {cc:'EUR',name:'Euro',amt:'€48,210.40',pct:'24%',col:'#57AD91'},
          {cc:'GBP',name:'British Pound',amt:'£31,002.88',pct:'14%',col:'#FFBA08'},
          {cc:'CAD',name:'Canadian Dollar',amt:'C$22,104.00',pct:'10%',col:'#F76666'},
        ].map(r => <div key={r.cc} style={{display:'flex',alignItems:'center',gap:16,padding:'12px 0',borderTop:'1px solid rgba(12,23,32,.05)'}}>
          <div style={{width:32,height:32,borderRadius:999,background:r.col,color:'#fff',fontWeight:700,fontSize:11,display:'flex',alignItems:'center',justifyContent:'center'}}>{r.cc}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:14,color:'#0C1720'}}>{r.name}</div>
            <div style={{fontSize:12,color:'rgba(12,23,32,.6)'}}>{r.pct} of total balance</div>
          </div>
          <div style={{fontWeight:700,fontSize:16,fontVariantNumeric:'tabular-nums'}}>{r.amt}</div>
        </div>)}
      </div>

      <div style={{background:'#fff',borderRadius:16,padding:24,boxShadow:'0 1px 3px rgba(0,0,0,.04),0 1px 2px rgba(0,0,0,.08)'}}>
        <h3 style={{fontWeight:600,fontSize:16,margin:'0 0 4px',color:'#0C1720'}}>Notification Feed</h3>
        <div style={{fontSize:11,color:'rgba(12,23,32,.5)',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:14,fontWeight:600}}>Last 24 hours</div>
        {[
          {t:'Recipient Disabled',d:'Jordan K. flagged for review.',a:'2m'},
          {t:'New Ticket Message',d:'Re: Payment #P-9821 failed',a:'18m'},
          {t:'Batch Completed',d:'82 payments · $24,110 sent',a:'1h'},
          {t:'New Recipient',d:'Alicia Müller · Germany',a:'3h'},
        ].map((n,i) => <div key={i} style={{display:'flex',gap:10,padding:'10px 0',borderTop:i?'1px solid rgba(12,23,32,.05)':'none'}}>
          <div style={{width:6,height:6,borderRadius:999,background:'#0092FF',marginTop:6,flexShrink:0}}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:13}}>{n.t}</div>
            <div style={{fontSize:12,color:'rgba(12,23,32,.6)'}}>{n.d}</div>
          </div>
          <div style={{fontSize:11,color:'rgba(12,23,32,.4)'}}>{n.a}</div>
        </div>)}
      </div>
    </div>
  </div>;
};

window.PaymentsScreen = function PaymentsScreen() {
  const rows = [
    {id:'P-9821',r:'Jordan Kilpatrick',e:'jordan@acme.io',amt:'$1,240.00',c:'USD',st:'paid',d:'Apr 21'},
    {id:'P-9820',r:'Alicia Müller',e:'a.mueller@de.co',amt:'€820.00',c:'EUR',st:'paid',d:'Apr 21'},
    {id:'P-9819',r:'Kenji Tanaka',e:'kenji@tokyo.jp',amt:'¥128,400',c:'JPY',st:'pending',d:'Apr 20'},
    {id:'P-9818',r:'Priya Shah',e:'priya@mumbai.in',amt:'$512.00',c:'USD',st:'paid',d:'Apr 20'},
    {id:'P-9817',r:'Marcus O\'Neil',e:'marcus@dub.ie',amt:'£240.00',c:'GBP',st:'failed',d:'Apr 19'},
    {id:'P-9816',r:'Yuki Sato',e:'yuki@osaka.jp',amt:'¥94,100',c:'JPY',st:'paid',d:'Apr 19'},
    {id:'P-9815',r:'Ana Gómez',e:'ana@es.co',amt:'€380.00',c:'EUR',st:'paid',d:'Apr 18'},
  ];
  const tone = s => s==='paid'?'live':s==='pending'?'sand':'err';
  return <div style={{padding:32,display:'flex',flexDirection:'column',gap:20}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <h2 style={{fontSize:24,fontWeight:700,margin:0}}>Payments</h2>
      <div style={{display:'flex',gap:8}}>
        <Button variant="secondary">Filter</Button>
        <Button variant="secondary">Export CSV</Button>
        <Button variant="primary">+ Send Payment</Button>
      </div>
    </div>
    <div style={{display:'flex',gap:0,borderBottom:'1px solid rgba(12,23,32,.1)'}}>
      {['All payments','Paid','Pending','Failed','Scheduled'].map((t,i)=>
        <div key={t} style={{padding:'10px 16px',fontSize:13,fontWeight:600,cursor:'pointer',color:i===0?'#0092FF':'rgba(12,23,32,.6)',borderBottom:i===0?'2px solid #0092FF':'2px solid transparent',marginBottom:-1}}>{t}</div>)}
    </div>
    <div style={{background:'#fff',borderRadius:16,boxShadow:'0 1px 3px rgba(0,0,0,.04),0 1px 2px rgba(0,0,0,.08)',overflow:'hidden'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
        <thead>
          <tr style={{background:'rgba(12,23,32,.02)'}}>
            {['Payment ID','Recipient','Amount','Currency','Status','Date'].map(h => <th key={h} style={{textAlign:'left',padding:'12px 16px',fontSize:11,fontWeight:600,color:'rgba(12,23,32,.6)',textTransform:'uppercase',letterSpacing:'.05em'}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => <tr key={r.id} style={{borderTop:'1px solid rgba(12,23,32,.05)'}}>
            <td style={{padding:'14px 16px',fontFamily:'Roboto Mono, monospace',fontSize:12,color:'#0092FF'}}>{r.id}</td>
            <td style={{padding:'14px 16px'}}>
              <div style={{fontWeight:600}}>{r.r}</div>
              <div style={{fontSize:11,color:'rgba(12,23,32,.5)'}}>{r.e}</div>
            </td>
            <td style={{padding:'14px 16px',fontWeight:600,fontVariantNumeric:'tabular-nums'}}>{r.amt}</td>
            <td style={{padding:'14px 16px',color:'rgba(12,23,32,.6)'}}>{r.c}</td>
            <td style={{padding:'14px 16px'}}><Badge tone={tone(r.st)} dot>{r.st}</Badge></td>
            <td style={{padding:'14px 16px',color:'rgba(12,23,32,.6)'}}>{r.d}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </div>;
};

window.RecipientsScreen = function RecipientsScreen() {
  const rows = [
    {n:'Jordan Kilpatrick',e:'jordan@acme.io',c:'US',m:'Bank Transfer',st:'active',p:true},
    {n:'Alicia Müller',e:'a.mueller@de.co',c:'DE',m:'PayPal',st:'active',p:true},
    {n:'Kenji Tanaka',e:'kenji@tokyo.jp',c:'JP',m:'Bank Transfer',st:'active',p:false},
    {n:'Priya Shah',e:'priya@mumbai.in',c:'IN',m:'Bank Transfer',st:'pending',p:false},
    {n:'Marcus O\'Neil',e:'marcus@dub.ie',c:'IE',m:'PayPal',st:'disabled',p:false},
  ];
  return <div style={{padding:32,display:'flex',flexDirection:'column',gap:20}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <h2 style={{fontSize:24,fontWeight:700,margin:0}}>Recipients</h2>
      <div style={{display:'flex',gap:8}}>
        <Button variant="secondary">Import</Button>
        <Button variant="primary">+ Add Recipient</Button>
      </div>
    </div>
    <div style={{background:'#fff',borderRadius:16,boxShadow:'0 1px 3px rgba(0,0,0,.04),0 1px 2px rgba(0,0,0,.08)',overflow:'hidden'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
        <thead>
          <tr style={{background:'rgba(12,23,32,.02)'}}>
            {['Name','Country','Payout Method','Status','Primary'].map(h => <th key={h} style={{textAlign:'left',padding:'12px 16px',fontSize:11,fontWeight:600,color:'rgba(12,23,32,.6)',textTransform:'uppercase',letterSpacing:'.05em'}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i) => <tr key={i} style={{borderTop:'1px solid rgba(12,23,32,.05)'}}>
            <td style={{padding:'14px 16px'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:30,height:30,borderRadius:999,background:'rgba(0,146,255,.15)',color:'#0092FF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11}}>{r.n.split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
                <div>
                  <div style={{fontWeight:600}}>{r.n}</div>
                  <div style={{fontSize:11,color:'rgba(12,23,32,.5)'}}>{r.e}</div>
                </div>
              </div>
            </td>
            <td style={{padding:'14px 16px',fontWeight:600}}>{r.c}</td>
            <td style={{padding:'14px 16px',color:'rgba(12,23,32,.7)'}}>{r.m}</td>
            <td style={{padding:'14px 16px'}}><Badge tone={r.st==='active'?'live':r.st==='pending'?'sand':'neutral'} dot>{r.st}</Badge></td>
            <td style={{padding:'14px 16px'}}>{r.p && <Badge tone="info">PRIMARY</Badge>}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </div>;
};
