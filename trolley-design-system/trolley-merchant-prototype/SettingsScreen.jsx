// DAC7 Marketplace Tax Settings + Trust & Security settings screens
const { useState: useStateS } = React;

const SettingsShell = ({active, onSel, children}) => {
  const groups = [
    {t:'Merchant', items:[{id:'general',l:'General'},{id:'members',l:'Team members'},{id:'billing',l:'Billing'}]},
    {t:'Payouts',  items:[{id:'methods',l:'Payout methods'},{id:'fx',l:'FX & currency'}]},
    {t:'Compliance',items:[{id:'dac7',l:'DAC7 / Marketplace tax'},{id:'1099',l:'1099 tax forms'},{id:'trust',l:'Trust & security'}]},
    {t:'Developer', items:[{id:'api',l:'API keys'},{id:'webhooks',l:'Webhooks'}]},
  ];
  return <div style={{padding:'24px 32px',display:'flex',flexDirection:'column',gap:20}}>
    <h2 style={{fontSize:24,fontWeight:700,margin:0}}>Settings</h2>
    <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:28,alignItems:'start'}}>
      <div style={{background:'#fff',borderRadius:8,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)',padding:8}}>
        {groups.map(g => <div key={g.t} style={{marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:'rgba(12,23,32,.5)',textTransform:'uppercase',letterSpacing:'.06em',padding:'8px 10px 4px'}}>{g.t}</div>
          {g.items.map(it => <div key={it.id} onClick={()=>onSel(it.id)} style={{padding:'8px 10px',borderRadius:6,cursor:'pointer',fontSize:13,fontWeight:active===it.id?600:500,color:active===it.id?'#0C1720':'rgba(12,23,32,.7)',background:active===it.id?'rgba(0,146,255,.08)':'transparent',borderLeft:active===it.id?'2px solid #0092FF':'2px solid transparent',paddingLeft:active===it.id?12:12}}>{it.l}</div>)}
        </div>)}
      </div>
      <div>{children}</div>
    </div>
  </div>;
};

window.SettingsScreen = function SettingsScreen() {
  const [active, setActive] = useStateS(() => localStorage.getItem('trolley_settings') || 'dac7');
  const sel = id => { setActive(id); localStorage.setItem('trolley_settings', id); };
  return <SettingsShell active={active} onSel={sel}>
    {active==='dac7' && <DAC7Settings/>}
    {active==='trust' && <TrustSettings/>}
    {!['dac7','trust'].includes(active) && <div style={{background:'#fff',borderRadius:8,padding:40,textAlign:'center',color:'rgba(12,23,32,.5)',fontSize:14,boxShadow:'0 1px 3px rgba(12,23,32,.04)'}}>Section not built in this UI kit — see Figma.</div>}
  </SettingsShell>;
};

// ═════════════════ DAC7 ═════════════════
function DAC7Settings(){
  const [enabled, setEnabled] = useStateS(true);
  const [countries, setCountries] = useStateS({EU:true, GB:true, NZ:false, AU:false, CA:false});
  const toggle = k => setCountries({...countries, [k]:!countries[k]});

  const DAC_COUNTRIES = [
    {id:'EU',name:'European Union',flag:'🇪🇺',note:'27 member states. DAC7 reporting threshold: €2,000 / year.'},
    {id:'GB',name:'United Kingdom',flag:'🇬🇧',note:'OECD MRDP aligned. Threshold: £1,735 / year.'},
    {id:'NZ',name:'New Zealand',flag:'🇳🇿',note:'NZ Digital Platform rules. Threshold: NZD 2,000 / year.'},
    {id:'AU',name:'Australia',flag:'🇦🇺',note:'Sharing economy reporting regime. No threshold.'},
    {id:'CA',name:'Canada',flag:'🇨🇦',note:'Digital platform operators reporting. Threshold: CAD 2,800 / year.'},
  ];

  return <div style={{display:'flex',flexDirection:'column',gap:20}}>
    <div>
      <h3 style={{fontSize:20,fontWeight:700,margin:0}}>DAC7 / Marketplace tax</h3>
      <p style={{color:'rgba(12,23,32,.6)',fontSize:13,marginTop:6,lineHeight:1.5,maxWidth:680}}>Collect tax information from your sellers and automatically report to tax authorities across eligible countries. Trolley handles form validation, TIN checks, and year-end filings.</p>
    </div>

    {/* Master toggle card */}
    <div style={{background:'#fff',borderRadius:8,padding:20,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)',display:'flex',alignItems:'center',gap:16}}>
      <div style={{width:40,height:40,borderRadius:8,background:enabled?'rgba(0,146,255,.1)':'rgba(12,23,32,.05)',color:enabled?'#0092FF':'rgba(12,23,32,.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v6c0 5.55 3.84 10.74 10 12 6.16-1.26 10-6.45 10-12V7l-10-5z"/></svg>
      </div>
      <div style={{flex:1}}>
        <div style={{fontWeight:600,fontSize:15}}>Enable marketplace tax reporting</div>
        <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:2}}>Required if you operate a marketplace with sellers in any covered country.</div>
      </div>
      <Toggle on={enabled} onChange={setEnabled}/>
    </div>

    {enabled && <>
      <div style={{background:'#fff',borderRadius:8,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)',overflow:'hidden'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(12,23,32,.05)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:600,fontSize:15}}>Reporting jurisdictions</div>
            <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:2}}>Enable each country where you have reportable sellers.</div>
          </div>
          <Badge tone="info">{Object.values(countries).filter(Boolean).length} ENABLED</Badge>
        </div>
        {DAC_COUNTRIES.map((c,i) => <div key={c.id} style={{padding:'14px 20px',display:'flex',alignItems:'center',gap:14,borderTop:i?'1px solid rgba(12,23,32,.05)':'none'}}>
          <span style={{fontSize:24}}>{c.flag}</span>
          <div style={{flex:1}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontWeight:600,fontSize:14}}>{c.name}</span>
              {countries[c.id] && <Badge tone="live" dot>ACTIVE</Badge>}
            </div>
            <div style={{fontSize:12,color:'rgba(12,23,32,.55)',marginTop:2}}>{c.note}</div>
          </div>
          <Toggle on={countries[c.id]} onChange={()=>toggle(c.id)}/>
        </div>)}
      </div>

      {/* Threshold + reporting year */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div style={{background:'#fff',borderRadius:8,padding:20,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)'}}>
          <div style={{fontWeight:600,fontSize:14}}>Collection behavior</div>
          <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:4,marginBottom:14}}>When should sellers be asked for tax information?</div>
          {[
            {id:'first',l:'On first payout',s:'Block until completed'},
            {id:'threshold',l:'When seller nears threshold',s:'Soft prompt, then block'},
            {id:'signup',l:'At sign-up',s:'Collect upfront from all sellers'},
          ].map((o,i) => <label key={o.id} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'10px 0',borderTop:i?'1px solid rgba(12,23,32,.05)':'none',cursor:'pointer'}}>
            <input type="radio" name="trigger" defaultChecked={o.id==='threshold'} style={{accentColor:'#0092FF',marginTop:3}}/>
            <div>
              <div style={{fontSize:13,fontWeight:600}}>{o.l}</div>
              <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:1}}>{o.s}</div>
            </div>
          </label>)}
        </div>
        <div style={{background:'#fff',borderRadius:8,padding:20,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)'}}>
          <div style={{fontWeight:600,fontSize:14}}>Reporting schedule</div>
          <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:4,marginBottom:14}}>When does Trolley submit reports to authorities?</div>
          <div style={{padding:14,background:'rgba(12,23,32,.03)',borderRadius:6,marginBottom:10}}>
            <div style={{fontSize:11,color:'rgba(12,23,32,.6)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.05em'}}>Next filing</div>
            <div style={{fontWeight:700,fontSize:22,marginTop:4}}>Jan 31, 2027</div>
            <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:2}}>For tax year 2026 · 1,248 reportable sellers</div>
          </div>
          <Button variant="secondary" size="sm">Download draft report</Button>
        </div>
      </div>

      <div style={{background:'rgba(0,146,255,.04)',border:'1px solid rgba(0,146,255,.15)',borderRadius:8,padding:16,display:'flex',gap:12}}>
        <div style={{width:28,height:28,borderRadius:999,background:'#0092FF',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontWeight:700,fontSize:14}}>i</div>
        <div>
          <div style={{fontWeight:600,fontSize:13,color:'#0076CC'}}>1,248 sellers need tax info</div>
          <div style={{fontSize:12,color:'rgba(12,23,32,.7)',marginTop:3}}>Sellers without a valid W-9, W-8BEN, or DAC7 form won't receive payouts after the grace period ends Oct 15.</div>
          <div style={{marginTop:10,display:'flex',gap:8}}>
            <Button variant="primary" size="sm">Send reminder email</Button>
            <Button variant="secondary" size="sm">View affected sellers</Button>
          </div>
        </div>
      </div>
    </>}
  </div>;
}

// ═════════════════ TRUST ═════════════════
function TrustSettings(){
  const [tfa, setTfa] = useStateS(true);
  const [tin, setTin] = useStateS(true);
  const [idv, setIdv] = useStateS(false);
  const [phoneV, setPhoneV] = useStateS(true);
  const [score, setScore] = useStateS(50);

  return <div style={{display:'flex',flexDirection:'column',gap:20}}>
    <div>
      <h3 style={{fontSize:20,fontWeight:700,margin:0}}>Trust & security</h3>
      <p style={{color:'rgba(12,23,32,.6)',fontSize:13,marginTop:6,lineHeight:1.5,maxWidth:680}}>Configure identity verification and risk controls for your recipients. Higher security reduces fraud; lower friction improves conversion — tune to your business.</p>
    </div>

    {/* Risk posture slider */}
    <div style={{background:'#fff',borderRadius:8,padding:20,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <div>
          <div style={{fontWeight:600,fontSize:15}}>Risk posture</div>
          <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:2}}>Adjust the balance between friction and protection.</div>
        </div>
        <Badge tone={score<35?'live':score<70?'sand':'err'} dot>
          {score<35?'LENIENT':score<70?'BALANCED':'STRICT'}
        </Badge>
      </div>
      <input type="range" min="0" max="100" value={score} onChange={e=>setScore(+e.target.value)} style={{width:'100%',accentColor:'#0092FF'}}/>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'rgba(12,23,32,.5)',marginTop:4}}>
        <span>Less friction</span><span>More protection</span>
      </div>
    </div>

    {/* Verifications list */}
    <div style={{background:'#fff',borderRadius:8,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)',overflow:'hidden'}}>
      <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(12,23,32,.05)'}}>
        <div style={{fontWeight:600,fontSize:15}}>Recipient verifications</div>
        <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:2}}>Which checks must recipients pass before they can receive payouts.</div>
      </div>
      {[
        {k:'tfa',l:'Two-factor authentication',s:'Recipients must set up an authenticator app.',on:tfa,set:setTfa,status:'95% adopted'},
        {k:'tin',l:'TIN verification',s:'Validate tax IDs against IRS / government records in real time.',on:tin,set:setTin,status:'Auto-retries on failure'},
        {k:'idv',l:'ID document verification',s:'Government-issued photo ID check via Persona. Adds ~2min to onboarding.',on:idv,set:setIdv,status:'Recommended for payouts > $10k'},
        {k:'phone',l:'Phone verification',s:'SMS OTP at sign-up and before changing payout method.',on:phoneV,set:setPhoneV,status:'SMS delivery rate 99.1%'},
      ].map((v,i) => <div key={v.k} style={{padding:'16px 20px',display:'flex',alignItems:'flex-start',gap:14,borderTop:i?'1px solid rgba(12,23,32,.05)':'none'}}>
        <div style={{flex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontWeight:600,fontSize:14}}>{v.l}</span>
            {v.on && <Badge tone="live" dot>ON</Badge>}
          </div>
          <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:3,maxWidth:500}}>{v.s}</div>
          {v.on && <div style={{fontSize:11,color:'rgba(12,23,32,.45)',marginTop:5,fontFamily:'Roboto Mono, monospace'}}>{v.status}</div>}
        </div>
        <Toggle on={v.on} onChange={v.set}/>
      </div>)}
    </div>

    {/* Risk score explainer */}
    <div style={{background:'#fff',borderRadius:8,padding:20,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <div>
          <div style={{fontWeight:600,fontSize:15}}>Auto-hold rules</div>
          <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:2}}>Payments matching these signals are held for manual review.</div>
        </div>
        <Button variant="secondary" size="sm">+ Add rule</Button>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {[
          {l:'First payout over $5,000',hit:'12 this month'},
          {l:'New bank account added < 24h ago',hit:'4 this month'},
          {l:'Recipient IP & country mismatch',hit:'2 this month'},
          {l:'Velocity: > 3 payouts in 1 hour',hit:'0 this month'},
        ].map((r,i) => <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',background:'rgba(12,23,32,.02)',borderRadius:6,fontSize:13}}>
          <div style={{width:6,height:6,borderRadius:999,background:'#57AD91'}}/>
          <div style={{flex:1,fontWeight:500}}>{r.l}</div>
          <div style={{fontSize:11,color:'rgba(12,23,32,.5)',fontFamily:'Roboto Mono, monospace'}}>{r.hit}</div>
          <button style={{border:'none',background:'transparent',color:'rgba(12,23,32,.4)',cursor:'pointer',fontSize:14}}>⋯</button>
        </div>)}
      </div>
    </div>

    {/* Audit log preview */}
    <div style={{background:'#fff',borderRadius:8,padding:20,boxShadow:'0 1px 3px rgba(12,23,32,.04),0 1px 2px rgba(12,23,32,.12)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:15}}>Recent security events</div>
        <a href="#" style={{color:'#0092FF',fontSize:12,fontWeight:600,textDecoration:'none'}}>View full audit log →</a>
      </div>
      {[
        {t:'2FA enforced for all team members',u:'Olivia Park',a:'2m ago'},
        {t:'New IP login from London, UK',u:'Marcus O\'Neil',a:'1h ago'},
        {t:'API key rotated (prod_live_••c3)',u:'System',a:'3h ago'},
        {t:'Recipient risk score updated',u:'System',a:'4h ago'},
      ].map((e,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderTop:i?'1px solid rgba(12,23,32,.05)':'none',fontSize:13}}>
        <div style={{flex:1}}>{e.t}</div>
        <div style={{color:'rgba(12,23,32,.5)',fontSize:12}}>{e.u}</div>
        <div style={{color:'rgba(12,23,32,.4)',fontSize:11,width:64,textAlign:'right'}}>{e.a}</div>
      </div>)}
    </div>
  </div>;
}

function Toggle({on, onChange}){
  return <button onClick={()=>onChange(!on)} style={{width:40,height:22,borderRadius:999,background:on?'#0092FF':'rgba(12,23,32,.15)',border:'none',position:'relative',cursor:'pointer',transition:'all 150ms',flexShrink:0}}>
    <span style={{position:'absolute',top:2,left:on?20:2,width:18,height:18,borderRadius:999,background:'#fff',boxShadow:'0 1px 3px rgba(0,0,0,.2)',transition:'all 150ms'}}/>
  </button>;
}
