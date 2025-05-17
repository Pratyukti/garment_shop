import{r as a,W as m,j as e,v as c,w as h,ad as T,ae as b,Y as M,Z as W,_ as z,$,F as x,I as U,z as V,J as X,K as ee,M as F,O as n,Q as te,af as ae}from"./index-B24U4oXx.js";import{A as se}from"./Alert-LLh5tdbr.js";function ce(){const[ne,R]=a.useState(""),[re,A]=a.useState({}),[d,v]=a.useState(""),[u,S]=a.useState(""),[p,w]=a.useState(""),[g,y]=a.useState(""),[i,C]=a.useState(""),[j,_]=a.useState(""),[I,k]=a.useState([]),[E,l]=a.useState(""),[D,f]=a.useState(!1),[L,Q]=a.useState([]),[q,O]=a.useState([]),[ie,P]=a.useState(!0),[r,B]=a.useState([]),[H,N]=a.useState(!1);a.useEffect(()=>{m.get("api/barcode/code/").then(t=>{k(t.data.barcodes||[])}).catch(t=>{console.error("Error fetching stock entries:",t)}),m.get("api/user/categories/").then(t=>{Q(t.data),P(!1)}).catch(t=>{console.error("Error fetching categories:",t),P(!1)})},[]),a.useEffect(()=>{i&&m.get(`api/user/subcategories/${i}`).then(t=>O(t.data)).catch(t=>console.error("Error fetching items:",t))},[i]);const J=(t,s)=>{t.target.checked?B([...r,s]):B(r.filter(o=>o.id!==s.id))},K=()=>{if(r.length===0){l("No items selected for preview.");return}l(""),N(!0)},Y=()=>{if(!d||!j||!u||!p||!i){l("Please fill in all fields.");return}const t={item_name:j,quantity:d?parseInt(d,10):null,item_price:g?parseFloat(g):null,item_size:u,shop_name:p,category_name:i};m.post("api/barcode/code/",t).then(s=>{k([...I,s.data]),Z()}).catch(s=>console.error("Error adding stock entry:",s))},Z=()=>{R(""),A({}),v(""),S(""),w(""),y(""),C(""),_(""),l(""),f(!1)},G=()=>{if(r.length===0){l("Please select items to print.");return}const t=`
      <html>
        <head>
          <title>Barcode Print</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .barcode { margin: 10px 0; }
            .barcode img { width: 200px; height: auto; }
            .item-name { font-weight: bold; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Barcode Preview</h1>
          ${r.map(o=>`
              <div class="barcode">
                <div class="item-name">${o.item_name}</div>
                <img src="data:image/png;base64,${o.barcode_image_base64}" alt="Barcode">
              </div>
            `).join("")}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          <\/script>
        </body>
      </html>
    `,s=window.open("","_blank","width=800,height=600");s.document.open(),s.document.write(t),s.document.close()};return e.jsxs("div",{children:[e.jsxs(c,{sx:{padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(h,{onClick:()=>f(!0),variant:"contained",color:"secondary",sx:{marginRight:"10px"},children:"Add Barcode"}),e.jsxs(c,{children:[e.jsx(h,{onClick:K,variant:"contained",color:"primary",sx:{marginRight:"10px"},children:"Preview"}),e.jsx(h,{onClick:G,variant:"contained",color:"secondary",children:"Print"})]}),E&&e.jsx(se,{severity:"error",sx:{marginTop:"10px"},children:E})]}),e.jsx(T,{open:D,onClose:()=>f(!1),children:e.jsxs(c,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:700,bgcolor:"#f9dff5",border:"2px solid #000",boxShadow:24,p:4},children:[e.jsx(b,{variant:"h6",children:"Enter Stock Details"}),e.jsxs(M,{fullWidth:!0,margin:"normal",children:[e.jsx(W,{children:"Category"}),e.jsx(z,{value:i,onChange:t=>C(t.target.value),children:L.map(t=>e.jsx($,{value:t.category_name,children:t.category_name},t.id))})]}),e.jsxs(M,{fullWidth:!0,margin:"normal",children:[e.jsx(W,{children:"Item Name"}),e.jsx(z,{value:j,onChange:t=>_(t.target.value),children:q.map(t=>e.jsx($,{value:t.name,children:t.name},t.id))})]}),e.jsx(x,{label:"Quantity",type:"number",value:d,onChange:t=>v(t.target.value),margin:"normal",fullWidth:!0}),e.jsx(x,{label:"Item Price",value:g,onChange:t=>y(t.target.value),margin:"normal",fullWidth:!0}),e.jsx(x,{label:"Item Size",value:u,onChange:t=>S(t.target.value),margin:"normal",fullWidth:!0}),e.jsx(x,{label:"Shop Name",value:p,onChange:t=>w(t.target.value),margin:"normal",fullWidth:!0}),e.jsx(h,{onClick:Y,variant:"contained",color:"secondary",sx:{mt:2},children:"Save"})]})}),e.jsx(T,{open:H,onClose:()=>N(!1),children:e.jsxs(c,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:600,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},children:[e.jsx(b,{variant:"h6",sx:{marginBottom:"20px"},children:"Barcode Preview"}),r.map((t,s)=>e.jsxs(c,{sx:{display:"flex",alignItems:"center",marginBottom:"10px"},children:[e.jsx("img",{src:`data:image/png;base64,${t.barcode_image_base64}`,alt:"Barcode",style:{width:"200px",marginRight:"10px"}}),e.jsx(b,{children:t.item_name})]},s))]})}),e.jsx(U,{component:V,sx:{marginTop:"20px"},children:e.jsxs(X,{children:[e.jsx(ee,{children:e.jsxs(F,{children:[e.jsx(n,{children:"Select"}),e.jsx(n,{children:"SL. No"}),e.jsx(n,{children:"Barcode"}),e.jsx(n,{children:"Item Name"}),e.jsx(n,{children:"Item Size"}),e.jsx(n,{children:"Shop Name"}),e.jsx(n,{children:"Category Name"})]})}),e.jsx(te,{children:I.map((t,s)=>e.jsxs(F,{children:[e.jsx(n,{children:e.jsx(ae,{onChange:o=>J(o,t),checked:r.includes(t)})}),e.jsx(n,{children:s+1}),e.jsx(n,{children:t.serial_number}),e.jsx(n,{children:t.item_name}),e.jsx(n,{children:t.item_size}),e.jsx(n,{children:t.shop_name}),e.jsx(n,{children:t.category_name})]},t.id))})]})})]})}export{ce as default};
