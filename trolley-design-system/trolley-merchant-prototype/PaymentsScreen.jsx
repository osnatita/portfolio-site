// Send Payment multi-step flow + Payments table with detail drawer
const { useState: useStateP } = React;

window.PaymentsScreen = function PaymentsScreen() {
  const [tab, setTab] = useStateP('payments');
  const [filter, setFilter] = useStateP('all');
  const [sendOpen, setSendOpen] = useStateP(false);
  const [detail, setDetail] = useStateP(null);

  const rows = [
    {id:'P-9821',r:'Jordan Kilpatrick',e:'jordan@acme.io',amt:'$1,240.00',c:'USD',flag:'🇺🇸',method:'Bank Transfer',st:'paid',d:'Apr 21, 2026',batch:'B-108'},
    {id:'P-9820',r:'Alicia Müller',e:'a.mueller@de.co',amt:'€820.00',c:'EUR',flag:'🇩🇪',method:'PayPal',st:'paid',d:'Apr 21, 2026',batch:'B-108'},
    {id:'P-9819',r:'Kenji Tanaka',e:'kenji@tokyo.jp',amt:'¥128,400',c:'JPY',flag:'🇯🇵',method:'Bank Transfer',st:'pending',d:'Apr 20, 2026',batch:'B-108'},
    {id:'P-9818',r:'Priya Shah',e:'priya@mumbai.in',amt:'$512.00',c:'USD',flag:'🇮🇳',method:'Bank Transfer',st:'paid',d:'Apr 20, 2026',batch:'B-107'},
    {id:'P-9817',r:'Marcus O\'Neil',e:'marcus@dub.ie',amt:'£240.00',c:'GBP',flag:'🇮🇪',method:'PayPal',st:'failed',d:'Apr 19, 2026',batch:'B-107'},
    {id:'P-9816',r:'Yuki Sato',e:'yuki@osaka.jp',amt:'¥94,100',c:'JPY',flag:'🇯🇵',method:'Bank Transfer',st:'paid',d:'Apr 19, 2026',batch:'B-107'},
    {id:'P-9815',r:'Ana Gómez',e:'ana@es.co',amt:'€380.00',c:'EUR',flag:'🇪🇸',method:'Check',st:'paid',d:'Apr 18, 2026',batch:'B-106'},
    {id:'P-9814',r:'Tomás Rivera',e:'t.rivera@mx.co',amt:'$1,800.00',c:'USD',flag:'🇲🇽',method:'Bank Transfer',st:'scheduled',d:'Apr 24, 2026',batch:'B-109'},
  ];
  const tone = s => s==='paid'?'live':s==='pending'?'sand':s==='scheduled'?'info':'err';
  const visible = rows.filter(r => filter==='all' || r.st===filter);

  return <div style={{padding:'24px 32px',display:'flex',flexDirection:'column',gap:18}}>
    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
      <div>
        <div style={{fontSize:11,fontWeight:600,color:'rgba(12,23,32,.5)',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:4}}>Money Movement</div>
        <h2 style={{fontSize:24,fontWeight:700,margin:0,color:'rgba(12,23,32,.85)'}}>Showing {visible.length} payments</h2>
      </div>
      <div style={{display:'flex',gap:8}}>
        <Button variant="secondary" size="sm">Filter</Button>
        <Button variant="secondary" size="sm">Export</Button>
        <Button variant="primary" onClick={()=>setSendOpen(true)}>+ Create Payment</Button>
      </div>
    </div>

    <div style={{display:'flex',gap:4,borderBottom:'1px solid rgba(12,23,32,.1)'}}>
      {[{id:'payments',l:'Show by Payments'},{id:'batches',l:'Show by Batches'},{id:'offline',l:'Offline Payments'}].map(t=>
        <div key={t.id} onClick={()=>setTab(t.id)} style={{padding:'10px 16px',fontSize:13,fontWeight:600,cursor:'pointer',color:tab===t.id?'#0092FF':'rgba(12,23,32,.6)',borderBottom:tab===t.id?'2px solid #0092FF':'2px solid transparent',marginBottom:-1}}>{t.l}</div>)}
    </div>

    <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
      {['all','paid','pending','failed','scheduled'].map(f =>
        <button key={f} onClick={()=>setFilter(f)} style={{fontFamily:'inherit',padding:'5px 10px',borderRadius:999,border:'1px solid '+(filter===f?'#0092FF':'rgba(12,23,32,.12)'),background:filter===f?'rgba(0,146,255,.08)':'#fff',color:filter===f?'#0092FF':'rgba(12,23,32,.7)',fontSize:12,fontWeight:600,cursor:'pointer',textTransform:'capitalize'}}>{f==='all'?'All payments':f}</button>)}
      <div style={{flex:1}}/>
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'5px 10px',borderRadius:8,border:'1px solid rgba(12,23,32,.12)',background:'#fff',fontSize:12,color:'rgba(12,23,32,.6)'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        Search payments
      </div>
    </div>

    <div style={{background:'#fff',borderRadius:8,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.16)',overflow:'hidden'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
        <thead>
          <tr style={{boxShadow:'inset 0 -1px 0 rgba(25,24,25,.1)'}}>
            {['', 'Payment ID','Recipient','Amount','Method','Status','Batch','Date'].map((h,i) => <th key={i} style={{textAlign:'left',padding:'10px 14px',fontSize:11,fontWeight:600,color:'rgba(12,23,32,.6)',textTransform:'uppercase',letterSpacing:'.05em'}}>{i===0?<input type="checkbox" style={{accentColor:'#0092FF'}}/>:h}</th>)}
          </tr>
        </thead>
        <tbody>
          {visible.map(r => <tr key={r.id} onClick={()=>setDetail(r)} style={{borderTop:'1px solid rgba(12,23,32,.05)',cursor:'pointer',background:detail?.id===r.id?'rgba(0,146,255,.04)':'transparent'}}
            onMouseEnter={e=>{if(detail?.id!==r.id)e.currentTarget.style.background='rgba(12,23,32,.02)'}}
            onMouseLeave={e=>{if(detail?.id!==r.id)e.currentTarget.style.background='transparent'}}>
            <td style={{padding:'12px 14px'}} onClick={e=>e.stopPropagation()}><input type="checkbox" style={{accentColor:'#0092FF'}}/></td>
            <td style={{padding:'12px 14px',fontFamily:'Roboto Mono, monospace',fontSize:12,color:'#0092FF'}}>{r.id}</td>
            <td style={{padding:'12px 14px'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:16}}>{r.flag}</span>
                <div>
                  <div style={{fontWeight:600}}>{r.r}</div>
                  <div style={{fontSize:11,color:'rgba(12,23,32,.5)'}}>{r.e}</div>
                </div>
              </div>
            </td>
            <td style={{padding:'12px 14px',fontWeight:700,fontVariantNumeric:'tabular-nums'}}>{r.amt} <span style={{color:'rgba(12,23,32,.4)',fontWeight:500,fontSize:11}}>{r.c}</span></td>
            <td style={{padding:'12px 14px',color:'rgba(12,23,32,.7)'}}>{r.method}</td>
            <td style={{padding:'12px 14px'}}><Badge tone={tone(r.st)} dot>{r.st}</Badge></td>
            <td style={{padding:'12px 14px',fontFamily:'Roboto Mono, monospace',fontSize:11,color:'rgba(12,23,32,.5)'}}>{r.batch}</td>
            <td style={{padding:'12px 14px',color:'rgba(12,23,32,.6)'}}>{r.d}</td>
          </tr>)}
        </tbody>
      </table>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderTop:'1px solid rgba(12,23,32,.05)',fontSize:12,color:'rgba(12,23,32,.6)'}}>
        <span>Showing 1 to {visible.length} of 502 entries.</span>
        <div style={{display:'flex',gap:4}}>
          {['‹','1','2','3','…','51','›'].map((p,i) => <button key={i} style={{minWidth:28,height:28,padding:'0 8px',borderRadius:6,border:'1px solid rgba(12,23,32,.12)',background:p==='1'?'#0092FF':'#fff',color:p==='1'?'#fff':'rgba(12,23,32,.7)',fontFamily:'inherit',fontWeight:600,fontSize:12,cursor:'pointer'}}>{p}</button>)}
        </div>
      </div>
    </div>

    {sendOpen && <SendPaymentFlow onClose={()=>setSendOpen(false)}/>}
    {detail && <PaymentDetail row={detail} onClose={()=>setDetail(null)}/>}
  </div>;
};

function PaymentDetail({row, onClose}){
  return <div style={{position:'fixed',inset:0,background:'rgba(12,23,32,.4)',zIndex:90,display:'flex',justifyContent:'flex-end'}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{width:480,background:'#fff',height:'100vh',boxShadow:'-8px 0 24px rgba(0,0,0,.15)',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'20px 24px',borderBottom:'1px solid rgba(12,23,32,.08)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:'Roboto Mono, monospace',fontSize:12,color:'rgba(12,23,32,.5)'}}>{row.id}</div>
          <div style={{fontWeight:700,fontSize:18,marginTop:2}}>{row.amt} <span style={{color:'rgba(12,23,32,.4)',fontWeight:500,fontSize:13}}>{row.c}</span></div>
        </div>
        <button onClick={onClose} style={{border:'none',background:'transparent',fontSize:22,cursor:'pointer',color:'rgba(12,23,32,.5)',padding:4}}>×</button>
      </div>
      <div style={{padding:24,flex:1,overflow:'auto'}}>
        <Badge tone={row.st==='paid'?'live':row.st==='pending'?'sand':row.st==='scheduled'?'info':'err'} dot>{row.st}</Badge>
        <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:14}}>
          {[['Recipient',row.r],['Email',row.e],['Country',row.flag+' '+row.c],['Method',row.method],['Batch',row.batch],['Date',row.d],['Processor fee','$2.50'],['Reference','Invoice #2409-18']].map(([k,v])=>
            <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',borderBottom:'1px solid rgba(12,23,32,.05)',paddingBottom:8}}>
              <span style={{fontSize:12,color:'rgba(12,23,32,.6)',fontWeight:600}}>{k}</span>
              <span style={{fontSize:13,fontWeight:500,color:'#0C1720',textAlign:'right'}}>{v}</span>
            </div>
          )}
        </div>
        <div style={{marginTop:24,padding:16,background:'rgba(0,146,255,.05)',borderRadius:8,border:'1px solid rgba(0,146,255,.15)'}}>
          <div style={{fontWeight:600,fontSize:13,marginBottom:6,color:'#0076CC'}}>Timeline</div>
          {['Created','Funded','Processing','Completed'].map((s,i)=>
            <div key={s} style={{display:'flex',gap:10,fontSize:12,padding:'4px 0'}}>
              <span style={{width:14,height:14,borderRadius:999,background:i<3?'#57AD91':'rgba(12,23,32,.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:9,flexShrink:0,marginTop:2}}>{i<3?'✓':''}</span>
              <span style={{color:'rgba(12,23,32,.8)'}}>{s}</span>
              <span style={{color:'rgba(12,23,32,.4)',marginLeft:'auto'}}>Apr 2{i}, 10:{40+i}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{padding:16,borderTop:'1px solid rgba(12,23,32,.08)',display:'flex',gap:8}}>
        <Button variant="secondary">Download receipt</Button>
        <div style={{flex:1}}/>
        {row.st==='failed'&&<Button variant="primary">Retry payment</Button>}
      </div>
    </div>
  </div>;
}

function SendPaymentFlow({onClose}){
  const [step, setStep] = useStateP(0);
  const [form, setForm] = useStateP({recipient:null, amount:'500.00', currency:'USD', method:'bank', memo:'Q1 royalty payout'});
  const recipients = [
    {n:'Jordan Kilpatrick',e:'jordan@acme.io',c:'🇺🇸',m:'Bank Transfer'},
    {n:'Alicia Müller',e:'a.mueller@de.co',c:'🇩🇪',m:'PayPal'},
    {n:'Kenji Tanaka',e:'kenji@tokyo.jp',c:'🇯🇵',m:'Bank Transfer'},
    {n:'Priya Shah',e:'priya@mumbai.in',c:'🇮🇳',m:'Bank Transfer'},
  ];
  const steps = ['Recipient','Amount','Method','Review','Confirm'];
  const next = () => setStep(s => Math.min(s+1, 4));
  const back = () => setStep(s => Math.max(s-1, 0));

  return <div style={{position:'fixed',inset:0,background:'rgba(12,23,32,.5)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{width:620,maxWidth:'94vw',background:'#fff',borderRadius:12,boxShadow:'0 20px 60px rgba(0,0,0,.3)',display:'flex',flexDirection:'column',maxHeight:'90vh'}}>
      <div style={{padding:'20px 28px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontWeight:700,fontSize:18}}>Send a payment</div>
        <button onClick={onClose} style={{border:'none',background:'transparent',fontSize:24,cursor:'pointer',color:'rgba(12,23,32,.5)'}}>×</button>
      </div>
      {/* stepper */}
      <div style={{padding:'16px 28px',display:'flex',alignItems:'center',gap:4,fontSize:11}}>
        {steps.map((s,i)=><React.Fragment key={s}>
          <div style={{display:'flex',alignItems:'center',gap:6,color:i<=step?'#0092FF':'rgba(12,23,32,.4)'}}>
            <span style={{width:20,height:20,borderRadius:999,background:i<step?'#57AD91':i===step?'#0092FF':'rgba(12,23,32,.1)',color:i<=step?'#fff':'rgba(12,23,32,.6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:10}}>{i<step?'✓':i+1}</span>
            <span style={{fontWeight:600}}>{s}</span>
          </div>
          {i<steps.length-1 && <div style={{flex:1,height:1,background:i<step?'#57AD91':'rgba(12,23,32,.1)'}}/>}
        </React.Fragment>)}
      </div>

      <div style={{padding:'8px 28px 24px',flex:1,overflow:'auto',minHeight:280}}>
        {step===0 && <div>
          <div style={{fontSize:12,fontWeight:600,color:'rgba(12,23,32,.6)',marginBottom:8}}>Select a recipient</div>
          <div style={{padding:'8px 12px',border:'1px solid rgba(12,23,32,.12)',borderRadius:8,display:'flex',alignItems:'center',gap:8,marginBottom:12,boxShadow:'inset 0 2px 1px rgba(0,0,0,.04)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(12,23,32,.4)"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <input placeholder="Search recipients…" style={{border:'none',outline:'none',flex:1,fontFamily:'inherit',fontSize:14}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {recipients.map((r,i)=><div key={i} onClick={()=>{setForm({...form,recipient:r});next();}} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,cursor:'pointer',border:'1px solid '+(form.recipient?.e===r.e?'#0092FF':'transparent'),background:form.recipient?.e===r.e?'rgba(0,146,255,.05)':'transparent'}}
              onMouseEnter={e=>{if(form.recipient?.e!==r.e)e.currentTarget.style.background='rgba(12,23,32,.03)'}}
              onMouseLeave={e=>{if(form.recipient?.e!==r.e)e.currentTarget.style.background='transparent'}}>
              <span style={{fontSize:20}}>{r.c}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:14}}>{r.n}</div>
                <div style={{fontSize:11,color:'rgba(12,23,32,.55)'}}>{r.e} · {r.m}</div>
              </div>
              <span style={{color:'rgba(12,23,32,.3)'}}>›</span>
            </div>)}
          </div>
        </div>}
        {step===1 && <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:'rgba(12,23,32,.6)',marginBottom:6}}>Amount</div>
            <div style={{display:'flex',gap:8}}>
              <div style={{flex:1,display:'flex',alignItems:'center',border:'1px solid rgba(12,23,32,.16)',borderRadius:8,padding:'0 14px',boxShadow:'inset 0 2px 1px rgba(0,0,0,.04)'}}>
                <span style={{color:'rgba(12,23,32,.5)',fontSize:20,fontWeight:600,marginRight:6}}>$</span>
                <input value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} style={{border:'none',outline:'none',flex:1,fontFamily:'inherit',fontSize:28,fontWeight:700,padding:'12px 0',letterSpacing:'-.01em'}}/>
              </div>
              <select value={form.currency} onChange={e=>setForm({...form,currency:e.target.value})} style={{border:'1px solid rgba(12,23,32,.16)',borderRadius:8,padding:'0 14px',fontFamily:'inherit',fontSize:14,fontWeight:600,background:'#fff',cursor:'pointer'}}>
                {['USD','EUR','GBP','JPY','CAD'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:'rgba(12,23,32,.6)',marginBottom:6}}>Memo <span style={{color:'rgba(12,23,32,.4)',fontWeight:400}}>— seen by recipient</span></div>
            <input value={form.memo} onChange={e=>setForm({...form,memo:e.target.value})} style={{width:'100%',border:'1px solid rgba(12,23,32,.16)',borderRadius:8,padding:'10px 14px',fontFamily:'inherit',fontSize:14,boxShadow:'inset 0 2px 1px rgba(0,0,0,.04)',outline:'none'}}/>
          </div>
          <div style={{padding:12,background:'rgba(12,23,32,.03)',borderRadius:8,fontSize:12,color:'rgba(12,23,32,.7)',display:'flex',justifyContent:'space-between'}}>
            <span>Processing fee</span><span style={{fontVariantNumeric:'tabular-nums',fontWeight:600}}>$2.50</span>
          </div>
        </div>}
        {step===2 && <div>
          <div style={{fontSize:12,fontWeight:600,color:'rgba(12,23,32,.6)',marginBottom:8}}>Payout method</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              {id:'bank',l:'Bank Transfer',s:'Arrives in 1-2 business days',fee:'$2.50'},
              {id:'paypal',l:'PayPal',s:'Arrives same day',fee:'$3.00'},
              {id:'check',l:'Check',s:'Arrives in 5-7 business days',fee:'$1.50'},
            ].map(m => <label key={m.id} style={{display:'flex',alignItems:'center',gap:12,padding:14,border:'1px solid '+(form.method===m.id?'#0092FF':'rgba(12,23,32,.12)'),borderRadius:8,cursor:'pointer',background:form.method===m.id?'rgba(0,146,255,.04)':'#fff'}}>
              <input type="radio" name="method" checked={form.method===m.id} onChange={()=>setForm({...form,method:m.id})} style={{accentColor:'#0092FF'}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:14}}>{m.l}</div>
                <div style={{fontSize:12,color:'rgba(12,23,32,.6)'}}>{m.s}</div>
              </div>
              <div style={{fontSize:12,fontWeight:600,color:'rgba(12,23,32,.7)'}}>{m.fee}</div>
            </label>)}
          </div>
        </div>}
        {step===3 && <div>
          <div style={{fontSize:12,fontWeight:600,color:'rgba(12,23,32,.5)',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:10}}>Review payment</div>
          <div style={{background:'rgba(12,23,32,.03)',borderRadius:10,padding:18,display:'flex',flexDirection:'column',gap:10}}>
            {[['Recipient', form.recipient?.n],['Email',form.recipient?.e],['Amount',`$${form.amount} ${form.currency}`],['Method',{bank:'Bank Transfer',paypal:'PayPal',check:'Check'}[form.method]],['Memo',form.memo],['Processing fee','$2.50'],['Total debit',`$${(parseFloat(form.amount)+2.5).toFixed(2)}`]].map(([k,v],i)=>
              <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:13,paddingBottom:8,borderBottom:i<6?'1px solid rgba(12,23,32,.05)':'none'}}>
                <span style={{color:'rgba(12,23,32,.6)'}}>{k}</span>
                <span style={{fontWeight:i===6?700:600,color:'#0C1720'}}>{v}</span>
              </div>
            )}
          </div>
          <div style={{marginTop:14,padding:12,border:'1px solid rgba(255,186,8,.35)',background:'rgba(255,186,8,.08)',borderRadius:8,fontSize:12,color:'#8A6200',display:'flex',gap:8,alignItems:'flex-start'}}>
            <span style={{fontSize:14}}>⚠</span>
            <div>This payment requires 2FA approval. A 6-digit code will be sent to your authenticator.</div>
          </div>
        </div>}
        {step===4 && <div style={{textAlign:'center',padding:'32px 0'}}>
          <div style={{width:64,height:64,borderRadius:999,background:'rgba(87,173,145,.15)',color:'#35B58B',fontSize:32,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>✓</div>
          <div style={{fontWeight:700,fontSize:20}}>Payment sent</div>
          <div style={{fontSize:13,color:'rgba(12,23,32,.6)',marginTop:6}}>${form.amount} {form.currency} on its way to {form.recipient?.n}.</div>
          <div style={{marginTop:14,fontFamily:'Roboto Mono, monospace',fontSize:11,color:'rgba(12,23,32,.5)'}}>P-9822 · {form.recipient?.e}</div>
        </div>}
      </div>

      <div style={{padding:'16px 28px',borderTop:'1px solid rgba(12,23,32,.08)',display:'flex',gap:8,alignItems:'center'}}>
        {step>0 && step<4 && <Button variant="secondary" onClick={back}>Back</Button>}
        <div style={{flex:1}}/>
        {step===4 ? <Button variant="primary" onClick={onClose}>Done</Button>
          : step===3 ? <Button variant="primary" onClick={next}>Confirm & send</Button>
          : step>0 ? <Button variant="primary" onClick={next}>Continue</Button>
          : null}
      </div>
    </div>
  </div>;
}
