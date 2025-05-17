import{ag as g,j as t,r as f,z as v,ae as o,v as s,S as d,G as r,F as a,w as j}from"./index-B24U4oXx.js";import{d as y,I as u}from"./dayjs.min-HcrgTdcY.js";import{C as N}from"./Container-Dltl4W0f.js";import{S as C,P}from"./Send-D7bgHD-e.js";const S=g(t.jsx("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"Cancel");function B(){const[e,c]=f.useState({billNumber:"",salesDateTime:y().format("YYYY-MM-DD HH:mm:ss"),partyName:"",partyMobileNumber:"",partyAddress:"",partyGSTNumber:"",barcodeNumber:"",itemName:"",unit:"",unitPrice:"",tax:"",discount:"",totalPrice:"",narration:""}),n=i=>{const{name:l,value:b}=i.target;c({...e,[l]:b})},m=i=>{i.preventDefault(),console.log(e)},x=()=>{alert("Notification sent!")},h=()=>{const i=window.open("","","height=600,width=800"),l=`
      <html>
      <head>
        <title>Bulk Sale Return Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; padding: 0; color: blue; background-color: #f9f9f9; }
          .invoice-container { width: 100%; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; background-color: #fff; }
          .header { text-align: center; padding: 20px 0; background-color: #4caf50; color: white; }
          .header h1 { margin: 0; font-size: 24px; }
          .section { margin-bottom: 20px; }
          .section h2 { margin-bottom: 10px; font-size: 18px; color: #4caf50; }
          .section p { margin: 5px 0; font-size: 14px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table th, .table td { border: 1px solid #ddd; padding: 10px; font-size: 14px; }
          .table th { background-color: #f2f2f2; text-align: left; }
          .footer { text-align: center; padding: 20px 0; background-color: #4caf50; color: white; font-size: 14px; }
          .footer p { margin: 0; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h1>Bulk Sale Return Invoice</h1>
            <p>Bill Number: ${e.billNumber}</p>
            <p>Sales Date & Time: ${e.salesDateTime}</p>
          </div>
  
          <div class="section">
            <h2>Customer Information</h2>
            <p><strong>Party Name:</strong> ${e.partyName}</p>
            <p><strong>Mobile Number:</strong> ${e.partyMobileNumber}</p>
            <p><strong>Address:</strong> ${e.partyAddress}</p>
            <p><strong>GST Number:</strong> ${e.partyGSTNumber}</p>
          </div>
  
          <div class="section">
            <h2>Item Information</h2>
            <table class="table">
              <tr>
                <th>Barcode Number</th>
                <td>${e.barcodeNumber}</td>
              </tr>
              <tr>
                <th>Item Name</th>
                <td>${e.itemName}</td>
              </tr>
              <tr>
                <th>Unit</th>
                <td>${e.unit}</td>
              </tr>
              <tr>
                <th>Unit Price</th>
                <td>${e.unitPrice}</td>
              </tr>
              <tr>
                <th>Tax (%)</th>
                <td>${e.tax}</td>
              </tr>
              <tr>
                <th>Discount (%)</th>
                <td>${e.discount}</td>
              </tr>
              <tr>
                <th>Total Price</th>
                <td>${e.totalPrice}</td>
              </tr>
            </table>
          </div>
  
          <div class="section">
            <h2>Narration</h2>
            <p>${e.narration}</p>
          </div>
  
          <div class="footer">
            <p>Thank you visit again!</p>
          </div>
        </div>
      </body>
      </html>
    `;i.document.open(),i.document.write(l),i.document.close(),i.print()},p=()=>{alert("Sale cancelled and inventory updated!")};return t.jsx(N,{maxWidth:"md",sx:{backgroundColor:"#f9dff5",position:"relative",padding:"2rem"},children:t.jsxs(v,{sx:{p:3,backgroundColor:"#f9dff5"},elevation:0,children:[t.jsx(o,{variant:"h5",gutterBottom:!0,align:"center",color:"secondary",children:"Bulk Sale Return"}),t.jsxs(o,{variant:"body2",color:"textSecondary",align:"center",children:["Sales Date & Time: ",e.salesDateTime]}),t.jsxs(s,{sx:{position:"absolute",top:16,right:16,display:"flex",gap:1},children:[t.jsx(d,{onClick:x,sx:{color:"#370140"},children:t.jsx(C,{})}),t.jsx(d,{onClick:h,sx:{color:"#370140"},children:t.jsx(P,{})}),t.jsx(d,{onClick:p,sx:{color:"#370140"},children:t.jsx(S,{})})]}),t.jsx(s,{component:"form",onSubmit:m,sx:{mt:2},children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,md:61,children:t.jsx(a,{fullWidth:!0,label:"Bill Number",name:"billNumber",value:e.billNumber,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(o,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Customer Information"})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(a,{fullWidth:!0,label:"Party Name",name:"partyName",value:e.partyName,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(a,{fullWidth:!0,label:"Mobile Number",name:"partyMobileNumber",value:e.partyMobileNumber,onChange:n,type:"tel",variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(a,{fullWidth:!0,multiline:!0,rows:3,label:"Address",name:"partyAddress",value:e.partyAddress,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(a,{fullWidth:!0,label:"GST Number",name:"partyGSTNumber",value:e.partyGSTNumber,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(o,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Item Information"})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(a,{fullWidth:!0,label:"Barcode Number",name:"barcodeNumber",value:e.barcodeNumber,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(a,{fullWidth:!0,label:"Item Name",name:"itemName",value:e.itemName,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(o,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Pricing and Tax"})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsx(a,{fullWidth:!0,label:"Unit",name:"unit",value:e.unit,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsx(a,{fullWidth:!0,label:"Unit Price",name:"unitPrice",type:"number",value:e.unitPrice,onChange:n,InputProps:{startAdornment:t.jsx(u,{position:"start",children:"₹"})},variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsx(a,{fullWidth:!0,label:"Tax (%)",name:"tax",type:"number",value:e.tax,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsx(a,{fullWidth:!0,label:"Discount (%)",name:"discount",type:"number",value:e.discount,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsx(a,{fullWidth:!0,label:"Total Price",name:"totalPrice",value:e.totalPrice,InputProps:{readOnly:!0,startAdornment:t.jsx(u,{position:"start",children:"₹"})},variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(a,{fullWidth:!0,multiline:!0,rows:3,label:"Narration",name:"narration",value:e.narration,onChange:n,variant:"outlined"})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(s,{sx:{mt:3},children:t.jsx(j,{fullWidth:!0,type:"submit",variant:"contained",color:"secondary",children:"Submit"})})})]})})]})})}export{B as default};
