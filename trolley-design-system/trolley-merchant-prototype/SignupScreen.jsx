// Sign-up flow — multi-step, matches Figma (dark purple left panel + light form right)
const { useState: useStateSu } = React;

window.SignupScreen = function SignupScreen() {
  const [step, setStep] = useStateSu(0);
  const [form, setForm] = useStateSu({email:'', pwd:'', company:'', country:'US', phone:'', role:'marketplace', volume:'10k-100k'});

  const STEPS = ['Account','Company','Use case','Verify'];

  return <div style={{position:'absolute',inset:0,display:'flex',background:'#fff'}}>
    {/* Left — brand panel */}
    <div style={{flex:'0 0 46%',background:'#441645',color:'#fff',padding:'48px 56px',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column'}}>
      {/* decorative stripes */}
      <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(135deg, transparent 0 120px, rgba(255,255,255,.015) 120px 121px)',pointerEvents:'none'}}/>
      <div style={{position:'relative',zIndex:1,display:'flex',alignItems:'center',gap:10,fontWeight:800,fontSize:22}}>
        <div style={{width:34,height:34,borderRadius:8,background:'#0092FF',display:'flex',alignItems:'center',justifyContent:'center',fontStyle:'italic'}}>t</div>
        trolley
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',zIndex:1}}>
        <div style={{fontSize:32,fontWeight:700,lineHeight:1.15,letterSpacing:'-.01em',maxWidth:420}}>Pay anyone, anywhere — in minutes, not days.</div>
        <div style={{fontSize:14,color:'rgba(255,255,255,.6)',marginTop:18,maxWidth:400,lineHeight:1.5}}>Send payments to 210+ countries, automate tax compliance, and reconcile everything in one dashboard.</div>
        {/* illustrative card stack */}
        <div style={{marginTop:40,position:'relative',height:240}}>
          <div style={{position:'absolute',left:0,top:20,width:220,background:'#fff',borderRadius:10,padding:16,boxShadow:'-12px 12px 32px rgba(0,0,0,.15)',color:'#0C1720'}}>
            <div style={{fontSize:11,fontWeight:700,marginBottom:10}}>Add a payout method</div>
            <div style={{display:'flex',gap:6}}>
              {['Bank','PayPal','Check'].map(m=><div key={m} style={{flex:1,padding:'8px 0',border:'1px solid rgba(12,23,32,.1)',borderRadius:5,fontSize:10,fontWeight:600,textAlign:'center',color:m==='Bank'?'#0092FF':'rgba(12,23,32,.6)',background:m==='Bank'?'rgba(0,146,255,.05)':'#fff'}}>{m}</div>)}
            </div>
            <div style={{marginTop:10,padding:8,border:'1px solid rgba(12,23,32,.1)',borderRadius:5,fontSize:10,color:'rgba(12,23,32,.6)'}}>Account number ••••4820</div>
            <div style={{marginTop:8,padding:'8px 10px',background:'#0092FF',color:'#fff',borderRadius:5,fontSize:10,fontWeight:600,textAlign:'center'}}>Save method</div>
          </div>
          <div style={{position:'absolute',left:180,top:0,width:180,background:'#fff',borderRadius:10,padding:14,boxShadow:'-12px 12px 32px rgba(0,0,0,.2)',color:'#0C1720'}}>
            <div style={{fontSize:10,fontWeight:700,marginBottom:8}}>Payee information</div>
            {['Name','Email','Country','Tax ID'].map(f=><div key={f} style={{marginBottom:6}}>
              <div style={{fontSize:8,color:'rgba(12,23,32,.5)',fontWeight:600,marginBottom:2}}>{f}</div>
              <div style={{height:18,borderRadius:3,background:'rgba(12,23,32,.05)'}}/>
            </div>)}
          </div>
        </div>
      </div>
      <div style={{position:'relative',zIndex:1,fontSize:11,color:'rgba(255,255,255,.4)'}}>SOC 2 Type II · PCI-DSS · ISO 27001</div>
    </div>

    {/* Right — form */}
    <div style={{flex:1,overflow:'auto',padding:'48px 56px',display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:13,color:'rgba(12,23,32,.6)'}}>Step {step+1} of {STEPS.length}</div>
        <div style={{fontSize:13}}>Already have an account? <a href="#" style={{color:'#0092FF',fontWeight:600,textDecoration:'none'}}>Sign in</a></div>
      </div>

      <div style={{display:'flex',gap:6,margin:'18px 0 32px'}}>
        {STEPS.map((s,i)=><div key={s} style={{flex:1,height:3,borderRadius:999,background:i<=step?'#0092FF':'rgba(12,23,32,.08)'}}/>)}
      </div>

      <h1 style={{fontSize:32,fontWeight:700,margin:0,letterSpacing:'-.01em'}}>
        {step===0 && 'Create your account'}
        {step===1 && 'Tell us about your company'}
        {step===2 && 'How will you use Trolley?'}
        {step===3 && 'Verify your phone'}
      </h1>
      <p style={{color:'rgba(12,23,32,.6)',marginTop:8,fontSize:14,maxWidth:440,lineHeight:1.5}}>
        {step===0 && "Start with your work email. You can invite teammates later."}
        {step===1 && "We use this to set up your merchant account and tax defaults."}
        {step===2 && "We'll tailor the dashboard and suggest the right integrations."}
        {step===3 && "For your security, we send a 6-digit code to your phone."}
      </p>

      <div style={{marginTop:28,maxWidth:440,display:'flex',flexDirection:'column',gap:14,flex:1}}>
        {step===0 && <>
          <Field label="Work email"><Input v={form.email} on={v=>setForm({...form,email:v})} ph="you@company.com"/></Field>
          <Field label="Password" hint="12+ characters, mix of letters & numbers">
            <Input type="password" v={form.pwd} on={v=>setForm({...form,pwd:v})} ph="••••••••••••"/>
          </Field>
          <label style={{display:'flex',gap:8,alignItems:'flex-start',fontSize:12,color:'rgba(12,23,32,.7)',marginTop:4}}>
            <input type="checkbox" defaultChecked style={{accentColor:'#0092FF',marginTop:2}}/>
            <span>I agree to the <a href="#" style={{color:'#0092FF'}}>Terms</a> and <a href="#" style={{color:'#0092FF'}}>Privacy Policy</a>.</span>
          </label>
        </>}
        {step===1 && <>
          <Field label="Company name"><Input v={form.company} on={v=>setForm({...form,company:v})} ph="Acme Inc."/></Field>
          <Field label="Country of registration">
            <select value={form.country} onChange={e=>setForm({...form,country:e.target.value})} style={inputS}>
              <option value="US">🇺🇸 United States</option>
              <option value="GB">🇬🇧 United Kingdom</option>
              <option value="DE">🇩🇪 Germany</option>
              <option value="CA">🇨🇦 Canada</option>
              <option value="AU">🇦🇺 Australia</option>
            </select>
          </Field>
          <Field label="Phone number">
            <div style={{display:'flex',gap:8}}>
              <div style={{...inputS,width:80,flex:'0 0 80px',textAlign:'center'}}>+1</div>
              <Input v={form.phone} on={v=>setForm({...form,phone:v})} ph="(555) 000 0000"/>
            </div>
          </Field>
        </>}
        {step===2 && <>
          <Field label="What best describes your business?">
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {id:'marketplace',l:'Online marketplace',s:'Etsy, Airbnb-style platform with sellers/hosts'},
                {id:'adnetwork',l:'Ad network / creator platform',s:'Pay publishers, creators, or affiliates'},
                {id:'royalties',l:'Royalties & licensing',s:'Music, film, IP royalty distribution'},
                {id:'other',l:'Something else',s:"We'll ask follow-up questions"},
              ].map(o => <label key={o.id} style={{display:'flex',gap:12,padding:14,border:'1px solid '+(form.role===o.id?'#0092FF':'rgba(12,23,32,.12)'),borderRadius:8,cursor:'pointer',background:form.role===o.id?'rgba(0,146,255,.04)':'#fff'}}>
                <input type="radio" checked={form.role===o.id} onChange={()=>setForm({...form,role:o.id})} style={{accentColor:'#0092FF',marginTop:2}}/>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>{o.l}</div>
                  <div style={{fontSize:12,color:'rgba(12,23,32,.6)',marginTop:2}}>{o.s}</div>
                </div>
              </label>)}
            </div>
          </Field>
          <Field label="Estimated monthly payout volume">
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {['<10k','10k-100k','100k-1M','1M-10M','>10M'].map(v=><button key={v} onClick={()=>setForm({...form,volume:v})} style={{fontFamily:'inherit',padding:'8px 14px',borderRadius:8,border:'1px solid '+(form.volume===v?'#0092FF':'rgba(12,23,32,.12)'),background:form.volume===v?'rgba(0,146,255,.05)':'#fff',color:form.volume===v?'#0092FF':'rgba(12,23,32,.7)',fontSize:13,fontWeight:600,cursor:'pointer'}}>${v}</button>)}
            </div>
          </Field>
        </>}
        {step===3 && <div style={{textAlign:'center',padding:'16px 0'}}>
          <div style={{fontSize:13,color:'rgba(12,23,32,.6)',marginBottom:20}}>Code sent to <b style={{color:'#0C1720'}}>+1 (555) {form.phone || '000 0000'}</b></div>
          <div style={{display:'flex',gap:10,justifyContent:'center',marginBottom:20}}>
            {[4,3,1,9,2,8].map((d,i)=><div key={i} style={{width:52,height:60,border:'1.5px solid '+(i<3?'#0092FF':'rgba(12,23,32,.15)'),borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,boxShadow:i<3?'0 0 0 3px rgba(0,146,255,.12)':'inset 0 2px 1px rgba(0,0,0,.04)'}}>{i<3?d:''}</div>)}
          </div>
          <a href="#" style={{fontSize:12,color:'#0092FF',textDecoration:'none',fontWeight:600}}>Resend code</a>
        </div>}
      </div>

      <div style={{display:'flex',gap:8,marginTop:24,maxWidth:440}}>
        {step>0 && <Button variant="secondary" onClick={()=>setStep(s=>s-1)}>Back</Button>}
        <div style={{flex:1}}/>
        <Button variant="primary" onClick={()=>setStep(s=>Math.min(s+1,3))}>
          {step===3?'Finish sign-up':'Continue'}
        </Button>
      </div>
    </div>
  </div>;
};

const inputS = {width:'100%',border:'1px solid rgba(12,23,32,.16)',borderRadius:8,padding:'10px 14px',fontFamily:'inherit',fontSize:14,boxShadow:'inset 0 2px 1px rgba(0,0,0,.04)',outline:'none',background:'#fff',color:'#0C1720'};

function Field({label, hint, children}){
  return <div>
    <div style={{fontSize:12,fontWeight:600,color:'rgba(12,23,32,.7)',marginBottom:6}}>{label}</div>
    {children}
    {hint && <div style={{fontSize:11,color:'rgba(12,23,32,.5)',marginTop:4}}>{hint}</div>}
  </div>;
}
function Input({v,on,ph,type='text'}){
  return <input type={type} value={v} placeholder={ph} onChange={e=>on(e.target.value)} style={inputS}/>;
}
