function generateQR(){
  const input=document.getElementById('qr-input');
  const box=document.getElementById('qr-output');
  if(!input||!box)return;
  const value=input.value.trim();
  if(!value){box.innerHTML='<p class="muted">Enter a link or text to generate your QR code.</p>';return;}
  const encoded=encodeURIComponent(value);
  box.innerHTML='<img alt="Generated QR code" width="220" height="220" src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data='+encoded+'"><p class="small muted">Right click or long press to save your QR code.</p>';
}
