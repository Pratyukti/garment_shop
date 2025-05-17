import{r as p,j as e,z as k,ae as x,v as I,S as C,G as d,F as l,w as N,ak as Z,ad as X,al as q,I as V,J as ee,K as te,M as D,O as s,Q as ne,Y as A,Z as S,_ as T,$ as u,W as z}from"./index-B24U4oXx.js";import{d as ae,I as R}from"./dayjs.min-HcrgTdcY.js";import{C as re}from"./Container-Dltl4W0f.js";import{S as ie,P as oe}from"./Send-D7bgHD-e.js";function ue(){const[r,B]=p.useState({fullName:"",number:"",address:"",tax:"",discount:"",totalPrice:"",paymentMethod1:"Cash",paymentMethod2:"UPI",narration:""}),[c,P]=p.useState([{barcode:"",itemName:"",unit:"",unitPrice:"",item_size:""}]),[b,_]=p.useState(!1);p.useState(null);const U=ae().format("YYYY-MM-DD HH:mm:ss"),[E,$]=p.useState(!1),[f,M]=p.useState([]),i=p.useRef([]),m=t=>{const{name:a,value:n}=t.target;B({...r,[a]:n},calculateTotalPrice)};p.useEffect(()=>{const t=async a=>{if(a)try{console.log("Fetching data for barcode:",a);const n=await z.get(`api/barcode/get-barcode-details/${a}/`);console.log("API Response:",n.data);const g=n.data;if(g&&g.item_details){const{item_name:w,item_price:F,item_size:v}=g.item_details;P(j=>{const h=[...j];return h[0]={...h[0],itemName:w,unitPrice:F,item_size:v},h})}else console.error("Item details not found in the response")}catch(n){console.error("Error fetching data:",n)}};c[0].barcode&&t(c[0].barcode)},[c[0].barcode]);const Y=t=>{t.preventDefault(),console.log("Form Data:",r),console.log("Items:",c)},G=()=>{alert("Notification sent!")},o=(t,a)=>{if(t.key==="Enter"){t.preventDefault();const n=a+1;n<i.current.length&&i.current[n].focus()}},y=(t,a)=>{const n=[...c];n[t][a.target.name]=a.target.value,P(n)},O=()=>{if(c.length>0){const t=c[c.length-1];t.barcode&&t.itemName&&t.unit&&t.unitPrice?(M(a=>[...a,t]),P([{barcode:"",itemName:"",unit:"",unitPrice:"",item_size:""}])):alert("Please fill out all fields before adding.")}else alert("No items to add.")},H=()=>{const t=window.open("","","height=600,width=800"),a=new Date().toLocaleString(),n=parseFloat(r.unitPrice)||0,g=parseFloat(r.tax)||0,w=parseFloat(r.discount)||0,v=(parseFloat(r.unit)||0)*n,j=v*g/100,h=v+j,K=b?h*w/100:0,J=h-K,Q=`
    <html>
    <head>
      <title>Retail Sale Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; padding: 0; color: blue; background-color: #f9f9f9; }
        hr { border: none; border-bottom: 2px solid blue; margin: 20px 0; }/
        .invoice-container { width: 100%; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; background-color: #fff; }
        .header { text-align: center; padding: 20px 0; background-color: #4caf50; color: blue; }
        .header h1 { margin: 0; font-size: 24px; }
        .section { margin-bottom: 20px; }
        .section h2 { margin-bottom: 10px; font-size: 18px; color: #4caf50; }
        .section p { margin: 5px 0; font-size: 14px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 10px; font-size: 14px; }
        .table th { background-color: #f2f2f2; text-align: left; }
        .footer { text-align: center; padding: 20px 0; background-color: #4caf50; color: blue; font-size: 14px; }
        .footer p { margin: 0;}
        .flex-container { display: flex; justify-content: space-between; align-items: center; }
        .left-info { text-align: left; }
        .right-info { text-align: right; }
        .right-info p { margin: 0; }
        .pricing-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .pricing-row span {
          padding: 0 10px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <h1>NAARI FASHIONS</h1>
          <h2>MARKET BUILDING UNIT-II</h2>
          <hr>
          <h2>GSTIN:21AXKPR9141G1ZD</h2>
          <br><br>
          <h4>Retail Invoice</h4>
        </div>


        <div class="section">
          <div class="flex-container">
            <div class="left-info">
              <p><strong>Full Name:</strong> ${r.fullName}</p>
              <p><strong>Number:</strong> ${r.number}</p>
            </div>
            <div class="right-info">
              <p><strong>Date:</strong> ${a}</p>
              <p><strong>Invoice Number:</strong> ${r.invoiceNumber||"N/A"}</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Item Information</h2>
          <table class="table">
            <tr>
              <th>Sl#</th>
              <th>Particulars</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>1</td>
              <td>${r.itemName}</td>
              <td>${r.unit}</td>
              <td>₹${h.toFixed(2)}</td> <!-- Updated to show total after tax -->
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Pricing and Tax</h2>
          <div class="pricing-row">
            <span>Total</span>
            <span>${r.unit}</span>
            <span>₹ ${h.toFixed(2)}</span>
          </div>
          <!--<div class="pricing-row">
            <span>Tax:</span>
            <span>${g}%</span>
            <span>+₹${j.toFixed(2)}</span>
          </div>-->
          ${b?`
            <div class="pricing-row">
              <span>Discount:</span>
              <span>${r.discount}%</span>
              <span>-₹${K.toFixed(2)}</span>
            </div>`:""}
          <div class="pricing-row">
            <span><strong>Net Payable:</strong></span>
            <span><strong>₹${J.toFixed(2)}</strong></span>
          </div>
        </div>

        <div class="section">
          <h2>Payment and Narration</h2>
          <p><strong>Payment Method1:</strong> ${r.paymentMethod1} ₹ ${r.paymentAmount1||0}</p>
          <p><strong>Payment Method2:</strong> ${r.paymentMethod2} ₹ ${r.paymentAmount2||0}</p>
          <p><strong>Narration:</strong> ${r.narration}</p>
        </div>
        <div class="section">
        <h6>Terms & Condition</h6>
        <hr>
        <ul>
        <li>No cash return</li>
        <li>No Exchange without Bill</li>
        <li>Exchange within 7 days</li>
        <li>No Exchange on Satureday and Sunday</li>
        <li>Exchange within 12 p.m to 4 p.m only</li>
        <li>No Colour Guarantee on any item</li>
        </ul>
        </div>

        <div class="footer">
          <p>Thank you visit again!</p>
        </div>
      </div>
    </body>
    </html>
  `;t.document.open(),t.document.write(Q),t.document.close(),t.print()},L=async()=>{if($(!0),!Array.isArray(c)||c.length===0){console.error("Items array is empty or undefined.");return}const t=f.map(a=>({item_name:a.itemName||"",unit:a.unit||"",unit_price:a.unitPrice||0}));console.log("Submitting the following data:"),console.log(JSON.stringify(t,null,2)),console.log("Submitting the following data:"),console.log(JSON.stringify(t,null,2));try{const a=await z.post("api/retailsale/item-preview/",{items:t});M(a.data.data)}catch(a){console.error("Error fetching data:",a)}},W=()=>$(!1);return e.jsx(re,{maxWidth:"lg",sx:{backgroundColor:"#f9dff5",position:"relative"},children:e.jsxs(k,{sx:{p:3,backgroundColor:"#f9dff5"},elevation:0,children:[e.jsx(x,{variant:"h5",gutterBottom:!0,align:"center",color:"secondary",children:"Retail Sale"}),e.jsxs(x,{variant:"body2",color:"textSecondary",align:"center",children:["Sales Date & Time: ",U]}),e.jsxs(I,{sx:{position:"absolute",top:16,right:16,display:"flex",gap:1},children:[e.jsx(C,{onClick:G,sx:{color:"#370140"},children:e.jsx(ie,{})}),e.jsx(C,{onClick:H,sx:{color:"#370140"},children:e.jsx(oe,{})})]}),e.jsxs(I,{component:"form",onSubmit:Y,sx:{mt:2},children:[e.jsxs(d,{container:!0,spacing:2,children:[e.jsxs(d,{item:!0,xs:12,md:3,children:[c.map((t,a)=>e.jsxs(d,{container:!0,spacing:2,style:{marginTop:"0.7px"},children:[e.jsxs(x,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:["Item Information ",a+1]}),e.jsx(l,{fullWidth:!0,label:"Barcode",name:"barcode",value:t.barcode,onChange:n=>y(a,n),margin:"normal",variant:"outlined",inputRef:n=>i.current[0]=n,onKeyDown:n=>o(n,0)}),e.jsx(l,{fullWidth:!0,label:"Item Name",name:"itemName",value:t.itemName,onChange:n=>y(a,n),margin:"normal",variant:"outlined",inputRef:n=>i.current[1]=n,onKeyDown:n=>o(n,1)}),e.jsx(l,{fullWidth:!0,label:"Unit",name:"unit",value:t.unit,onChange:n=>y(a,n),margin:"normal",variant:"outlined",inputRef:n=>i.current[2]=n,onKeyDown:n=>o(n,2)}),e.jsx(l,{fullWidth:!0,label:"Unit Price",name:"unitPrice",value:t.unitPrice,onChange:n=>y(a,n),margin:"normal",variant:"outlined",inputRef:n=>i.current[3]=n,onKeyDown:n=>o(n,3)}),e.jsx(l,{fullWidth:!0,label:"Item Size",name:"itemSize",value:t.item_size,onChange:n=>y(a,n),margin:"normal",variant:"outlined",inputRef:n=>i.current[4]=n,onKeyDown:n=>o(n,4)}),a!==c.length-1&&e.jsx("hr",{style:{margin:"10px 0"}})]},a)),e.jsxs(d,{children:[e.jsx(N,{variant:"contained",color:"secondary",onClick:O,style:{marginTop:"20px",borderRadius:"50%",height:"60px",width:"60px",padding:0},children:e.jsx(Z,{style:{fontSize:"32px",fontWeight:"bold"}})}),e.jsx(N,{variant:"outlined",color:"secondary",onClick:L,style:{marginTop:"20px",marginLeft:"20px"},children:"Preview"})]})]}),e.jsx(X,{open:E,onClose:W,children:e.jsxs(I,{sx:{bgcolor:"background.paper",borderRadius:2,boxShadow:24,p:4,position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"600px",overflowY:"auto",maxHeight:"400px"},children:[e.jsxs(x,{variant:"h6",component:"h2",gutterBottom:!0,style:{color:"secondary"},children:["Preview Items",e.jsx(C,{onClick:W,style:{float:"right"},children:e.jsx(q,{})})]}),Array.isArray(f)&&f.length===0?e.jsx(x,{variant:"body1",children:"No items added yet."}):e.jsx(V,{component:k,children:e.jsxs(ee,{children:[e.jsx(te,{children:e.jsxs(D,{children:[e.jsx(s,{style:{color:"secondary"},children:"Sl.No"}),e.jsx(s,{style:{color:"secondary"},children:"Barcode"}),e.jsx(s,{style:{color:"secondary"},children:"Item Name"}),e.jsx(s,{style:{color:"secondary"},children:"Unit"}),e.jsx(s,{style:{color:"secondary"},children:"Unit Price"}),e.jsx(s,{style:{color:"secondary"},children:"Total Item Price"})]})}),e.jsxs(ne,{children:[f.map((t,a)=>e.jsxs(D,{children:[e.jsx(s,{style:{textAlign:"center",color:"secondary"},children:a+1}),e.jsx(s,{style:{textAlign:"center"},children:t.barcode}),e.jsx(s,{style:{textAlign:"center"},children:t.itemName}),e.jsx(s,{style:{textAlign:"center"},children:t.unit}),e.jsx(s,{style:{textAlign:"center"},children:t.unitPrice}),e.jsx(s,{style:{textAlign:"center"},children:Number(t.unit)*Number(t.unitPrice)})," "]},a)),e.jsxs(D,{children:[e.jsx(s,{colSpan:5,align:"right",children:e.jsx("strong",{children:"Grand Total:"})}),e.jsx(s,{style:{textAlign:"center"},children:f.reduce((t,a)=>t+Number(a.unit)*Number(a.unitPrice),0)})]})]})]})})]})}),e.jsxs(d,{item:!0,xs:12,md:3,children:[e.jsx(x,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Customer Information"}),e.jsx(l,{fullWidth:!0,label:"Full Name",name:"fullName",value:r.fullName,onChange:m,margin:"normal",variant:"outlined",inputRef:t=>i.current[5]=t,onKeyDown:t=>o(t,5)}),e.jsx(l,{fullWidth:!0,label:"Number",name:"number",value:r.number,onChange:m,margin:"normal",type:"tel",variant:"outlined",inputRef:t=>i.current[6]=t,onKeyDown:t=>o(t,6)}),e.jsx(l,{fullWidth:!0,multiline:!0,rows:4,label:"Address",name:"address",value:r.address,onChange:m,margin:"normal",variant:"outlined",inputRef:t=>i.current[7]=t,onKeyDown:t=>o(t,7)})]}),e.jsxs(d,{item:!0,xs:12,md:3,children:[e.jsx(x,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Pricing and Tax"}),e.jsx(l,{fullWidth:!0,label:"Tax (%)",name:"tax",value:r.tax,onChange:m,margin:"normal",variant:"outlined",inputRef:t=>i.current[8]=t,onKeyDown:t=>o(t,8)}),e.jsxs(A,{fullWidth:!0,margin:"normal",variant:"outlined",children:[e.jsx(S,{children:"Discount Applicable"}),e.jsxs(T,{name:"isDiscountApplicable",value:b?"Yes":"No",onChange:t=>_(t.target.value==="Yes"),label:"Discount Applicable",children:[e.jsx(u,{value:"No",children:"No"}),e.jsx(u,{value:"Yes",children:"Yes"})]})]}),b&&e.jsx(l,{fullWidth:!0,label:"Discount (%)",name:"discount",value:r.discount,onChange:m,margin:"normal",type:"number",variant:"outlined",inputRef:t=>i.current[9]=t,onKeyDown:t=>o(t,9)}),e.jsx(l,{fullWidth:!0,label:"Total Price",name:"totalPrice",value:r.totalPrice,margin:"normal",InputProps:{readOnly:!0,startAdornment:e.jsx(R,{position:"start",children:"₹"})},variant:"outlined",inputRef:t=>i.current[10]=t,onKeyDown:t=>o(t,10)})]}),e.jsxs(d,{item:!0,xs:12,md:3,children:[e.jsx(x,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Payment and Narration"}),e.jsxs(d,{container:!0,spacing:2,children:[e.jsx(d,{item:!0,xs:6,children:e.jsxs(A,{fullWidth:!0,margin:"normal",variant:"outlined",children:[e.jsx(S,{children:"Payment Method 1"}),e.jsxs(T,{name:"paymentMethod1",value:r.paymentMethod1,onChange:m,label:"Payment Method 1",children:[e.jsx(u,{value:"Cash",children:"Cash"}),e.jsx(u,{value:"Credit Card",children:"Credit Card"}),e.jsx(u,{value:"Debit Card",children:"Debit Card"}),e.jsx(u,{value:"UPI",children:"UPI"})]})]})}),e.jsx(d,{item:!0,xs:6,children:e.jsx(l,{fullWidth:!0,label:"Payment Amount 1",name:"amount1",value:r.amount1,margin:"normal",InputProps:{startAdornment:e.jsx(R,{position:"start",children:"₹"})},variant:"outlined",inputRef:t=>i.current[11]=t,onKeyDown:t=>o(t,11)})}),e.jsx(d,{item:!0,xs:6,children:e.jsxs(A,{fullWidth:!0,margin:"normal",variant:"outlined",children:[e.jsx(S,{children:"Payment Method 2"}),e.jsxs(T,{name:"paymentMethod2",value:r.paymentMethod2,onChange:m,label:"Payment Method 2",children:[e.jsx(u,{value:"Cash",children:"Cash"}),e.jsx(u,{value:"Credit Card",children:"Credit Card"}),e.jsx(u,{value:"Debit Card",children:"Debit Card"}),e.jsx(u,{value:"UPI",children:"UPI"})]})]})}),e.jsx(d,{item:!0,xs:6,children:e.jsx(l,{fullWidth:!0,label:"Payment Amount 2",name:"amount2",value:r.amount2,margin:"normal",InputProps:{startAdornment:e.jsx(R,{position:"start",children:"₹"})},variant:"outlined",inputRef:t=>i.current[12]=t,onKeyDown:t=>o(t,12)})})]}),e.jsx(l,{fullWidth:!0,multiline:!0,rows:4,label:"Narration",name:"narration",value:r.narration,onChange:m,margin:"normal",variant:"outlined",inputRef:t=>i.current[13]=t,onKeyDown:t=>o(t,13)})]})]}),e.jsx(N,{type:"submit",variant:"contained",color:"secondary",fullWidth:!0,sx:{mt:2},children:"Submit"})]})]})})}export{ue as default};
