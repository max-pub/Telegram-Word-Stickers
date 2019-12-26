const sharp = require("sharp")
const FS = require('fs');
const base = FS.readFileSync('base.svg', 'utf8');
const words = JSON.parse(FS.readFileSync('words.json','utf8'));

let icons = [];
for (let word of words) {
	let SVG = base.replace('TEXT', word[0]).replace('COLOR', word[1]);
	let filename = word[0].replace('?', '').replace('!', '').replace("'","").replace(" ","");
	icons.push(`<img src='dist/${filename}.png'/>`);
	sharp(Buffer.from(SVG))
		.png()
		.toFile('../dist/' + filename + ".png")
		.then(function (info) {
			console.log(info)
		})
		.catch(function (err) {
			console.log(err)
		})
}
FS.writeFileSync('../index.html',`<link rel="stylesheet" type="text/css" href="../base.css">\n`+'<main>\n'+icons.join('\n')+'</main>\n');
// https://www.w3schools.com/colors/colors_names.asp