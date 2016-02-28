import fs from "fs"
import Immutable from "Immutable"

const logo = fs.readFileSync("./logo", "utf8");
const ThoughtsLength = 39;

String.prototype.padRight = function(l,c) {return this+Array(l-this.length+1).join(c||" ")}

const empty = (new String).padRight(ThoughtsLength, " ");

console.clear = () => {
	var lines = process.stdout.getWindowSize()[1];
	for (var i = 0; i < lines; i++) {
		console.log('\r\n');
	}
}

const format = str => {
	var chunks = [];

	for (var i = 0, charsLength = str.length; i < charsLength; i += ThoughtsLength) {
    	chunks.push(str.substring(i, i + ThoughtsLength));
	}

	return chunks;
}

const generateLine = () => (new String).padRight(ThoughtsLength, "-");

const generateThoughts = text => {
	if(text.length > ThoughtsLength * 2) throw new Error("Text too long");
	
	if(text.length <= ThoughtsLength) {
		// 1 line length

		return [ 
			text.padRight(ThoughtsLength, " ")
		]
	} else {
		// 2 line length
		text = text.padRight(ThoughtsLength * 2, " ")
		
		return format(text);
	}
}
	
const thoughtsReplace = (logo, thoughts) => {
	const line = generateLine();
	
	if(thoughts.length === 1) {
		// 1 line
		return logo
				.replace("__line1__", line)
				.replace("__thoughts1__", "| " + thoughts[0] + " |")
				.replace("__thoughts2__", "  " + line)
				.replace("__line2__", empty);

	} else if(thoughts.length === 2) {
		// 2 lines

		return logo
				.replace("__line1__", line)
				.replace("__line2__", line)
				.replace("__thoughts1__", "/ " + thoughts[0] + " \\")
				.replace("__thoughts2__", "\\ " + thoughts[1] + " /");
	}
}


console.clear();

const input = Immutable.fromJS(process.argv.slice(2, process.argv.length)).join(" ");
const ouput = thoughtsReplace(logo, generateThoughts(input));

console.log(ouput);