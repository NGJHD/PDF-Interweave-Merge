# PDF Interweave Merge
Merges 2x PDF outputs from single sided ADF scans. For example, if your document has 6 pages and you do a 1 sided ADF scan, your 1.pdf will essentially be:

1.pdf
Page 1 of Document
Page 3 of Document
Page 5 of Document

Then you flip over the document and scan again, you will get

2.pdf
Page 6 of Document
Page 4 of Document
Page 2 of Document

This short script will reverse the order of 2.pdf and merge them into a single pdf. Before you use, you will have to install pdf-lib

npm install pdf-lib

To use it, call 

node merge.js 1.pdf 2.pdf

...or use a BAT file