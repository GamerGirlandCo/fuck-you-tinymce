import axios from "axios";
import {writeFileSync, mkdirSync} from "fs";
import {resolve} from "path";

const freeKey = "qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
const dirWhitelist = ["scripts", ".vscode"];
const pluginList = 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss';

async function main() {
	try {
		let headers = {
			Referer: "http://tiny.cloud"
		}
		let base = `https://cdn.tiny.cloud/1/${freeKey}/tinymce/6`
		let {data: mainScript} = await axios.get(`${base}/tinymce.min.js`, {headers})
		writeFileSync(resolve("../tinymce.min.js"), mainScript);
		let {data: ts} = await axios.get(`${base}/tinymce.min.js`, {headers})
		writeFileSync(resolve("../tinymce.d.ts"), ts);
		for(let p of pluginList.split(" ")) {
			let {data} = await axios.get(`${base}/plugins/${p}/plugin.min.js`, {headers});
			mkdirSync(resolve(`../plugins/${p}`), {recursive: true})
			writeFileSync(resolve(`../plugins/${p}/plugin.min.js`), data)
		}
	} finally {
		process.exit()
	}
}
main()