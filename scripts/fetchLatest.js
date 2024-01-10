import axios from "axios";
import {writeFileSync, mkdirSync} from "fs";
import {resolve} from "path";

const freeKey = "qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc";
const skins = ["dark", "default", "document", "tinymce-5", "tinymce-5-dark", "writer"];
const uis = ["oxide", "oxide-dark", "tinymce-5", "tinymce-5-dark"];
const pluginList =  "a11ychecker advcode advtable advanced-templates advanced-typography ai casechange checklist introduction-to-tiny-comments editimage introduction-to-mediaembed export footnotes formatpainter inline-css linkchecker mentions mergetags moxiemanager pageembed permanentpen introduction-to-powerpaste rtc-introduction introduction-to-tiny-spellchecker autocorrect tableofcontents tinydrive-introduction accordion advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link lists media nonbreaking pagebreak preview quickbars save searchreplace table template visualblocks visualchars wordcount";
const base = `https://cdn.tiny.cloud/1/${freeKey}/tinymce/6`

let headers = {
	Referer: "http://tiny.cloud"
}

async function fetchAux(path) {
	const wpath = resolve(`..${path}`)
	let {data: d} = await axios.get(`${base}${path}`, {headers})
	writeFileSync(wpath, d);
}

async function main() {
	try {
		let {data: mainScript} = await axios.get(`${base}/tinymce.min.js`, {headers})
		// writeFileSync(resolve("../models/dom/model.min.js"), (await axios.get(`${base}/models/dom/model.min.js`, {headers})).data)
		writeFileSync(resolve("../tinymce.min.js"), mainScript);
		await fetchAux("/tinymce.d.ts");
		await fetchAux("/models/dom/model.min.js");
		await fetchAux("/icons/default/icons.min.js");
		for(let t of skins) {
			await fetchAux(`/skins/content/${t}/content.min.css`)
		}
		for(let u of uis) {
			for(let c of [
				"content.inline.min.css",
				"content.min.css",
				"skin.min.css",
				"skin.shadowdom.min.css"
			]) {
				await fetchAux(`/skins/ui/${u}/${c}`)
			}
		}
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