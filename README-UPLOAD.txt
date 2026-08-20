QRCodeBarn Robust Function Fix Pack

Upload/overwrite these two files in public_html:

- qr-code-for-business-card.html
- qr-code-with-logo.html

Fixes included:

1. Business card QR no longer relies on the fragile local JavaScript QR library.
2. It generates a vCard QR through a reliable image endpoint.
3. The "appears here" text is removed after generation.
4. The logo page has a visible upload field.
5. The logo page displays the uploaded logo in the centre of the QR preview.
6. The false "shorten URL/details" error path has been removed.

After upload, test in a private/incognito browser:

https://www.qrcodebarn.com/qr-code-for-business-card.html
https://www.qrcodebarn.com/qr-code-with-logo.html
