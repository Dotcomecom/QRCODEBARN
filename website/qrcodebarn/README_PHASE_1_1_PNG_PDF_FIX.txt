QRCodeBarn Holiday Pack Phase 1.1 PNG/PDF Export Fix

Upload assets/holiday-pack-v6.js to /assets/ on the server, replacing the existing file.

Fixes:
- PNG and PDF downloads failing while SVG worked.
- Replaced SVG foreignObject HTML text blocks with pure SVG text/tspan blocks.
- Keeps removed 'Scan with phone'.
- Keeps larger logo and larger QR layouts.
- Keeps handle-only drag fix.

After upload, hard refresh and test SVG, PNG and PDF downloads.
Console marker: Holiday Pack Phase 1.1 PNG/PDF pure SVG fix loaded
