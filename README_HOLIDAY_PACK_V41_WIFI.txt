QRCodeBarn Holiday Pack v4.1 WiFi Upgrade

Adds one-tap WiFi QR support.

Updated:
- holiday-cottage-qr-welcome-pack.html
- assets/holiday-pack.js
- assets/style.css

New WiFi fields:
- Network name / SSID
- Password
- Security: WPA/WPA2/WPA3, WEP, Open
- Hidden network checkbox

The WiFi QR now encodes:
WIFI:T:WPA;S:<ssid>;P:<password>;H:false;;

After upload test:
https://www.qrcodebarn.com/holiday-cottage-qr-welcome-pack.html?v=41

On a phone, scan the WiFi QR from the preview/download. It should offer to join the WiFi network rather than showing plain text.
