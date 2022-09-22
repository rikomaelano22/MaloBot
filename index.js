"use strict";
const { default: makeWASocket, useSingleFileAuthState, downloadContentFromMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor } = require('./lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid } = require("./lib/myfunc");

// Apinya
const fs = require ("fs");
const util = require('util')
const chalk = require('chalk');
const hikki = require("hikki-me");
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const java_script = require("javascript-obfuscator");
const speed = require("performance-now");

// Database
let setting = JSON.parse(fs.readFileSync('./config.json'));
let mess = JSON.parse(fs.readFileSync('./temp/mess.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/respon_list.json'));
let db_menfes = JSON.parse(fs.readFileSync('./database/menfess.json'));
let pendaftar = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));

// Response
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('./lib/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('./lib/setdone');
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/respon-list');
const { ngazap } = require('./storage/virus/bug_bot_wa')

const Exif = require("./lib/exif")
const exif = new Exif()
moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store, welcome) => {
try {
let { ownerNumber, botName, ownerName } = setting
let { allmenu } = require('./help')

const { type, quotedMsg, mentioned, now, fromMe } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
const toJSON = j => JSON.stringify(j, null,'\t')
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = ownerNumber == sender ? true : ["6285789004732@s.whatsapp.net","6283834558105@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;

const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const participants = isGroup ? await groupMetadata.participants : ''
const isUser = pendaftar.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isDeveloper = ["6283834558105@s.whatsapp.net"].includes(sender) ? true : false

const isUrl = (url) => {return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
function jsonformat(string) {return JSON.stringify(string, null, 2)}
function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res } else { let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res}}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: msg })}
const textImg = (teks) => {return conn.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: msg })}
const sendMess = (hehe, teks) => {conn.sendMessage(hehe, { text, teks })}
const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync(setting.pathimg)}}}

const doc = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "" } : {}) 
},
"message": {
"documentMessage": {
"url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc",
"mimetype": "application/octet-stream",
"fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=",
"fileLength": "64455",
"pageCount": 1,
"mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=",
"fileName": `NeoBot•MD${ngazap(prefix)}`,
"fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="
}}}

const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

function toRupiah(angka) {
var balancenyeini = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) balancenyeini += angkarev.substr(i, 3) + '.';
return '' + balancenyeini.split('', balancenyeini.length - 1).reverse().join('');
}

async function downloadAndSaveMediaMessage (type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
fs.writeFileSync(path_file, buffer)
return path_file } 
else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file}
}

// Anti Link
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy')
reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
conn.groupParticipantsUpdate(from, [sender], "remove")
}
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

const cekUser = (satu, dua) => { 
let x1 = false
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return db_menfes[x1].id } 
if (satu == "status"){ return db_menfes[x1].status } 
if (satu == "teman"){ return db_menfes[x1].teman } 
if (satu == "gender"){ return db_menfes[x1].gender }
}
if (x1 == false) { return null } 
}

const cekTeman = (satu, dua) => { 
let x2 = false
Object.keys(pendaftar).forEach((i) => {
if (pendaftar[i].id == dua){x2 = i}})
if (x2 !== false) {
if (satu == "id"){ return pendaftar[x2].id } 
if (satu == "nama"){ return pendaftar[x2].nama }
if (satu == "gender"){ return pendaftar[x2].gender } 
}
if (x2 == false) { return null } 
}

const setUser = (satu, dua, tiga) => { 
let x1 = false
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "±id"){ db_menfes[x1].id = tiga
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_menfes))} 
if (satu == "±status"){ db_menfes[x1].status = tiga
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_menfes))} 
if (satu == "±teman"){ db_menfes[x1].teman = tiga
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_menfes))} 
if (satu == "±gender"){ db_menfes[x1].gender = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_menfes))} 
} 
if (x1 == false) { return null }}

let teman = []
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].teman == false){
if (db_menfes[i].id !== sender){
teman.push(db_menfes[i].id)
}}})

const pasangan = teman[Math.floor(Math.random() * (teman.length))]


//Auto Block Nomor Luar Negeri
if (sender.startsWith('212')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('91')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('92')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('90')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('54')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('55')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('40')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('94')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('60')) {
return conn.updateBlockStatus(sender, 'block')
}

// Console Logs
if (isCmd && !fromMe) {console.log("[" + chalk.green(" CMD ") + "]" + chalk.yellow("=") + "[ " + chalk.green(`${pushname}`) + " ]" + chalk.yellow("=") + "[ " + chalk.green(`${prefix+command}`) + " ]" + chalk.yellow("=") + "[ " + chalk.green(`${jam}`) + " ]"  )}

let teks_menu =`*${ucapanWaktu} ${pushname}*

━━━「 *DATA SERVER* 」━━━
⫹ Library : *Ricmalo-BOT*.
⫹ Waktu : ${tanggal}
⫹ Jam : ${jam}
⫹ Creator : ${ownerName}
⫹ Bot Name : ${botName}
━━━━━━━━━━━━━━━━━━━
━━━「 *DATA USER* 」━━━
⫹ Nama : ${pushname}
⫹ No Hp : ${sender.split("@")[0]}
━━━━━━━━━━━━━━━━━━━
  _---------[ *LIST-MENU* ]---------_
${allmenu(prefix)}

_*Runtime Bot :*_
${runtime(process.uptime())}
`

// INI CASE NYA
switch(command) {
case 'semua_menu':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let button_menu = [
{ buttonId: `${prefix}owner`, buttonText: { displayText: "Owner bot" }, type: 1 },
{ buttonId: `${prefix}ping`, buttonText: { displayText: "Speed test" }, type: 1 },
{ buttonId: `${prefix}rules`, buttonText: { displayText: "Syarat & ketentuan" }, type: 1 }
]
const ini_message_Menu = {
image: await reSize(setting.pathimg, 300, 200),
caption: teks_menu,
footer: setting.footer,
buttons: button_menu,
headerType: 4
}
const sendMsg = await conn.sendMessage(from, ini_message_Menu, { quoted: fkontak })
break
case 'listgc': {
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
let teks = `     「 List Group Chat 」\n\nTotal List Group Bot : ${anu.length}`
for (let i of anu) {
 let metadata = await conn.groupMetadata(i)
 if (metadata.owner === "undefined") {
var loldd = false
 } else {
var loldd = metadata.owner
 }
 teks += `\n\nName : ${metadata.subject ? metadata.subject : "undefined"}\nOwner : ${loldd ? '@' + loldd.split("@")[0] : "undefined"}\nID : ${metadata.id ? metadata.id : "undefined"}\nDibuat : ${metadata.creation ? moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss') : "undefined"}\nMember : ${metadata.participants.length ? metadata.participants.length : "undefined"}`
}
reply(teks)
}
break
case 'listpc': {
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
let teks = `     「 List Personal Chat 」\n\nTotal Chat Pribadi : ${anu.length}`
for (let i of anu) {
 teks += `\n\nProfile : @${i.id.split('@')[0]}\nChat : ${i.unreadCount}\nLastchat : ${moment(i.conversationTimestamp * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}`
}
reply(teks)
}
break
case 'source_code':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let text_source =`━━━[ *SOURCE-CODE* ]━━━
• _Pengembang : Riko Maelano_
• _Whatsapp : 0896-1487-9811_
• _Youtube : Ricmalo_
• _Script Bot : Cek Di YouTube_
━━━━━━━━━━━━━━━━━━━`
reply(text_source)
break
case 'hit_global':{
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
var res = await fetchJson(`https://api.countapi.xyz/hit/Lexxy/visits`)
reply(`*HIT GLOBAL ${res.value}*`)
}
break
case 'cariteman':
case 'cari_teman':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let ini_orangnya = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let text_cari = await pickRandom(ini_orangnya)
reply('Mencari teman 🔍')
let nomor_temannya = text_cari.id
let nama_temannya = text_cari.nama
let gender_temannya = text_cari.gender
conn.sendMessage(from, { text: `━━━「 *DATA-INFO* 」━━━\n*ID* : Wa.me/${nomor_temannya.split("@")[0]}\n*Nama* : ${nama_temannya}\n*Gender* : ${gender_temannya}\n━━━━━━━━━━━━━━━━━━━`, footer: 'data pengguna bot.', buttons: [{buttonId: `${prefix}cari_teman`, buttonText: {displayText: 'next'}, type: 1}], headerType: 1 })
break
case 'nama_lu':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(pushname)
break
case 'nomor_hp_lu':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(sender.split("@")[0])
break
case 'cekuser':{
reply(`${pendaftar.length}`)
}
break
case 'menu':{
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
var ini_list_grup = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
var ini_list_chat = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
var res_hit_nya = await fetchJson(`https://api.countapi.xyz/hit/Lexxy/visits`)
const sections = [
{title: "━━━「 DATA_BOT 」━━━", rows: [
{title: "𝙎𝙤𝙪𝙧𝙘𝙚 𝘾𝙤𝙙𝙚", rowId: prefix+"source_code", description: "pembuat script bot"},
{title: "𝙍𝙪𝙡𝙚𝙨 𝘽𝙤𝙩", rowId: prefix+"rules", description: "syarat & ketentuan"},
{title: "𝙎𝙚𝙢𝙪𝙖 𝙈𝙚𝙣𝙪", rowId: prefix+"semua_menu", description: "all command"},
{title: "𝘾𝙖𝙧𝙞 𝙏𝙚𝙢𝙖𝙣", rowId: prefix+"cari_teman", description: "searching my friend"}
]},
{title: "━━━「 INFO_SERVER 」━━━", rows: [
{title: "𝐑𝐮𝐧𝐭𝐢𝐦𝐞 𝐒𝐞𝐫𝐯𝐞𝐫", rowId: prefix+"runtime", description: `aktif : ${runtime(process.uptime())}`},
{title: "𝐇𝐢𝐭 𝐆𝐥𝐨𝐛𝐚𝐥", rowId: prefix+"hit_global", description: `user hit : ${res_hit_nya.value}`},
{title: "𝐓𝐨𝐭𝐚𝐥 𝐂𝐡𝐚𝐭", rowId: prefix+"listgc", description: `group : ${ini_list_grup.length}`},
{title: "𝐓𝐨𝐭𝐚𝐥 𝐂𝐡𝐚𝐭", rowId: prefix+"listpc", description: `pribadi : ${ini_list_chat.length}`},
{title: "𝐓𝐨𝐭𝐚𝐥 𝐏𝐞𝐧𝐠𝐠𝐮𝐧𝐚", rowId: prefix+"cekuser", description: `user bot : ${pendaftar.length}`}
]},
{title: "━━━「 LIST_MENU 」━━━", rows: [
{title: "𝙊𝙏𝙃𝙀𝙍𝙎 𝙈𝙀𝙉𝙐", rowId: prefix+"menu_1", description: "Menampilkan Menu Others"},
{title: "𝙏𝙊𝙊𝙇𝙎 𝙈𝙀𝙉𝙐", rowId: prefix+"menu_2", description: "Menampilkan Menu Tools"},
{title: "𝙎𝙏𝙊𝙍𝙀 𝙈𝙀𝙉𝙐", rowId: prefix+"menu_3", description: "Menampilkan Menu Store"},
{title: "𝙏𝙊𝙋𝙐𝙋 𝙈𝙀𝙉𝙐", rowId: prefix+"menu_4", description: "Menampilkan Menu Topup"},
{title: "𝙂𝙍𝙊𝙐𝙋 𝙈𝙀𝙉𝙐", rowId: prefix+"menu_5", description: "Menampilkan Menu Group"},
{title: "𝙊𝙒𝙉𝙀𝙍 𝙈𝙀𝙉𝙐", rowId: prefix+"menu_6", description: "Menampilkan Menu Owner"},
{title: "𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙈𝙀𝙉𝙐", rowId: prefix+"menu_7", description: "Menampilkan Menu Download"},
{title: "𝙎𝙀𝙏 𝙋𝙍𝙊𝙎𝙀𝙎/𝘿𝙊𝙉𝙀", rowId: prefix+"menu_8", description: "Menampilkan Menu proses/done"}
]}]
const listMessage = {
text: `━━━━━━━━━━━━━━
*_• Library : Ricmalo-BOT_*.
*_• Waktu : ${tanggal}_*
*_• Jam : ${jam}_*
*_• Creator : ${ownerName}_*
*_• Author : Ricmalo_*
━━━━━━━━━━━━━━━`,
footer: setting.footer,
title: `${ucapanWaktu} ${pushname}\nSilahkan Pilih List Menu Bot.`,
buttonText: "klik disini",
mentions: ownerNumber, sections}
conn.sendMessage(from, listMessage, { quoted: fkontak })
}
break
case 'menu_1':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(`━━━[ _*OTHERS MENU*_ ]━━━
• ${prefix}ping
• ${prefix}simi
• ${prefix}rules
• ${prefix}listpc
• ${prefix}listgc
• ${prefix}daftar
• ${prefix}owner
• ${prefix}menfes
• ${prefix}runtime
• ${prefix}family100
━━━━━━━━━━━━━━━`)
break
case 'menu_2':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(`━━━[ _*TOOLS MENU*_ ]━━━
• ${prefix}tts
• ${prefix}isgd
• ${prefix}cuttly
• ${prefix}tinyurl
• ${prefix}nulis
• ${prefix}toimg
• ${prefix}obfus
• ${prefix}ssweb
• ${prefix}kalkulator
━━━━━━━━━━━━━━━`)
break
case 'menu_3':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(`━━━[ _*STORE MENU*_ ]━━━
• ${prefix}list
• ${prefix}addlist
• ${prefix}dellist
• ${prefix}done
• ${prefix}proses
• ${prefix}kali
• ${prefix}bagi
• ${prefix}kurang
• ${prefix}tambah
━━━━━━━━━━━━━━━`)
break
case 'menu_4':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(`━━━[ _*TOPUP GAMES*_ ]━━━
• ${prefix}topupff 
• ${prefix}topupml
━━━━━━━━━━━━━━━`)
break
case 'menu_5':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(`━━━[ _*GROUP MENU*_ ]━━━
• ${prefix}add
• ${prefix}kick
• ${prefix}open
• ${prefix}close
• ${prefix}group
• ${prefix}tagall
• ${prefix}delete
• ${prefix}revoke
• ${prefix}antilink
• ${prefix}hidetag
• ${prefix}demote
• ${prefix}setdesc
• ${prefix}linkgrup
• ${prefix}promote
• ${prefix}setppgrup
• ${prefix}setnamegc
━━━━━━━━━━━━━━━`)
break
case 'menu_6':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(`━━━[ _*OWNER MENU*_ ]━━━
• ${prefix}bc
• ${prefix}leave
• ${prefix}creategc
• ${prefix}sendsesi
• ${prefix}setppbot
• ${prefix}broadcast
• ${prefix}bugpc *628xxx*
• ${prefix}buggc *_only grup_*
• ${prefix}inibug *_only grup_*
• ${prefix}sendbug *628xxx*
━━━━━━━━━━━━━━━`)
break
case 'menu_7':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(`━━━[ _*DOWNLOADER*_ ]━━━
• ${prefix}play
• ${prefix}tiktok
• ${prefix}ytmp3
• ${prefix}ytmp4
• ${prefix}gitclone
• ${prefix}mediafire
━━━━━━━━━━━━━━━`)
break
case 'menu_8':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(`━━━━━━━━━━━━━━━
_*SET PROSES/DONE*_
• ${prefix}setdone
• ${prefix}changedone
• ${prefix}delsetdone
• ${prefix}setproses
• ${prefix}delsetproses
• ${prefix}changeproses
━━━━━━━━━━━━━━━`)
break
case 'rules':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let text_rules =`━━━「 *RULES-BOT* 」━━━

1. Jangan Spam/Mengeksploitasi Bot
Sanksi: *❎ WARN/SOFT BLOCK*

2. Dilarang Tlpn/Vc Bot
Sanksi: *❎ SOFT BLOCK*

3. Dilarang Culik Bot Ke Grup Kecuali Atas Izin Owner.
Sanksi: *PERMANENT BLOCK*

Jika sudah dipahami rules-nya, silakan ketik *#menu* untuk memulai!
Segala kebijakan dan ketentuan *${botName}* di pegang oleh owner dan segala perubahan kebijakan, sewaktu waktu owner berhak mencabut, atau memblokir user(*﹏*)

© Created by ${ownerName}`
reply(text_rules)
break
case 'owner':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let [x2] = ownerNumber
reply("https://wa.me/" + x2.split("@")[0])
break
case 'tes':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply('on')
break
case 'tiktok':{
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`contoh :\n${prefix+command} https://vt.tiktok.com/ZSdbFNn96/?k=1`)
var url = q
var fatihh = await fetchJson(`https://hadi-api.herokuapp.com/api/tiktok?url=${url}`)
if (fatihh.msg) return reply('Link URL tidak valid')
reply(mess.wait)
var fatih = fatihh.result
conn.sendMessage(from, { video: { url: fatih.video.nowm }, caption: 'done!! no watermak' }, { quoted: msg })
conn.sendMessage(from, { audio: { url: fatih.audio_only.original }, mimetype: 'audio/mpeg', fileName: `${fatih.title}.mp3` }, { quoted: msg })
}
break
case 'ytmp4':
case 'ini_videonya':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Kirim perintah ${prefix+command} https://youtu.be/PdJnRZRbveE`)
var datah = await fetchJson(`https://hadi-api.herokuapp.com/api/yt2/video?url=${q}`)
var data = datah.result
var txtt = `*YOUTUBE DOWNLOADER*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.resolution}\n*≻ Size :* ${data.size}\n*≻ Type : ${data.ext}*\n*≻ Url Source :* ${q.split(" ")[0]}\n\n_Sedang Mengirim Media..._`
var teks = `Done!`
conn.sendMessage(from, { image: { url: data.thumb }, caption: txtt }, { quoted: msg })
conn.sendMessage(from, { video: { url: data.download_video }, caption: teks }, { quoted: msg })
break
case 'ytmp3':
case 'ini_musiknya':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Kirim perintah ${prefix+command} https://youtu.be/PdJnRZRbveE`)
var datah = await fetchJson(`https://hadi-api.herokuapp.com/api/yt2/audio?url=${q}`)
var data = datah.result
var txtt = `*YOUTUBE DOWNLOADER*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.resolution}\n*≻ Size :* ${data.size}\n*≻ Type :* ${data.ext}\n*≻ Url Source :* ${q.split(" ")[0]}\n\n_Sedang Mengirim Media..._`
var teks = `Done!`
conn.sendMessage(from, { image: { url: data.thumb }, caption: txtt }, { quoted: msg })
conn.sendMessage(from, { audio: { url: data.download_audio}, mimetype: 'audio/mpeg', fileName: `${data.title}.mp3` }, { quoted:msg })
break
case 'nulis':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Yang Mau Di Tulis Apaan?\n\nContoh :\n${prefix+command} Hello`)
reply(mess.wait)
var tulisan = q
var splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
var fixHeight = splitText.split('\n').slice(0, 31).join('\n')
spawn('convert', ['./storage/nulis/buku/buku_sebelum.jpg','-font','./storage/nulis/font/Indie-Flower.ttf','-size','960x1280','-pointsize','23','-interline-spacing','2','-annotate','+128+129',fixHeight,'./storage/nulis/buku/buku_sesudah.jpg'])
.on('error', () => reply('error'))
.on('exit', () => {
conn.sendMessage(from, { image: fs.readFileSync('./storage/nulis/buku/buku_sesudah.jpg')}, {quoted: msg, caption: `Jangan Malas Kak...`})
})
break
case 'play':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Contoh :\n${prefix+command} preset angel baby`)
let play_nyaa = await fetchJson(`https://api-yogipw.herokuapp.com/api/yt/search?query=${q}`)
let play_link = pickRandom(play_nyaa.result)
let text_play =`*YOUTUBE PLAY*\nTitle : ${play_link.title}\nTimestamp : ${play_link.timestamp}\nDi Upload : ${play_link.ago}\nAuthor : ${play_link.author.name}`
let button_play = [
{ buttonId: `${prefix}ini_musiknya ${play_link.url}`, buttonText: { displayText: "Musik" }, type: 1 },
{ buttonId: `${prefix}ini_videonya ${play_link.url}`, buttonText: { displayText: "Video" }, type: 1 }
]
const ini_message_Play = {
image: await getBuffer(play_link.thumbnail),
caption: text_play,
footer: 'pilih media di bawah ini.',
buttons: button_play,
headerType: 4
}
const sendPlay = await conn.sendMessage(from, ini_message_Play, { quoted: msg })
break
case 'mediafire':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Contoh :\n${prefix+command} https://www.mediafire.com/file/4jzmc4boquizy0n/HAPUS_CONFIG_FF_MAX.7z/file`)
let { mediafireDl } = require('./lib/mediafire')
let link_nya = q
const result_mediafire = await mediafireDl(link_nya)
let text_mediafire = `*MEDIAFIRE DOWNLOAD*	
Judul : ${result_mediafire[0].nama}
Type : ${result_mediafire[0].mime}
Size : ${result_mediafire[0].size}
Link : ${result_mediafire[0].link}
			
_Sedang Mengirim file._`
reply(text_mediafire)
conn.sendMessage(from, { document : { url : result_mediafire[0].link}, fileName : result_mediafire[0].nama, mimetype: result_mediafire[0].mime }, { quoted : msg }) 
break
case 'gitclone':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply('Linknya Mana?')
reply(mess.wait)
let res_git = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let [, user, repo] = q.match(res_git) || []
repo = repo.replace(/.git$/, '')
let ini_url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(ini_url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
conn.sendMessage(from, { document: { url: ini_url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: msg })
break
case 'simi':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`*Contoh* : ${prefix+command} halo`)
fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
.then(balas_simi => {reply(balas_simi.success)})
break
case 'tes':
case 'runtime':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let respon_nya = `Runtime : ${runtime(process.uptime())}`
reply(respon_nya)
break
case 'ping':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let ini_timestamp = speed()
let ini_latensi = speed() - ini_timestamp
let text_ping = `Kecepatan Respon ${ini_latensi.toFixed(4)} _Second_`
reply(text_ping)
break
case 'obfus':
case 'obfuscator':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Kode Js Nya?`)
let ini_kode_jsnya = q
let result_obfus = java_script.obfuscate(`${ini_kode_jsnya}`,
{compact: false, controlFlowFlattening: true, controlFlowFlatteningThreshold: 1, numbersToExpressions: true, simplify: true, stringArrayShuffle: true, splitStrings: true, stringArrayThreshold: 1 });
reply(result_obfus.getObfuscatedCode())
break
case 'family100': {
  var winScore = 4999
  if ('family100'+m.chat in _family100) {
   m.reply('Masih Ada Sesi Kuis Yang Belum Di Selesaikan')
   throw false
  }
  var anuy = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')
  var result = anuy[Math.floor(Math.random() * anuy.length)]
  var caption = `
📑 Soal : ${result.soal}
🤝 Terdapat *${result.jawaban.length}* jawaban${result.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
🎁 +${winScore} XP tiap jawaban benar
  `.trim()
  _family100['family100'+m.chat] = {
  id: 'family100'+m.chat,
  pesan: await ichi.sendText(m.chat, caption, m),
  ...random,
  terjawab: Array.from(result.jawaban, () => false),
  hadiah: winScore,
  }
  }
break
case 'tambah':
case 'tambah_kan':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* tanda *angka*\n\n_Contoh_\n\n${prefix+command} 2 + 2`)
var nilai_one = Number(q.split(" ")[0])
var nilai_two = Number(q.split(" ")[1])
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
case 'kurang_kan':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* tanda *angka*\n\n_Contoh_\n\n${prefix+command} 2 + 2`)
var nilai_one = Number(q.split(" ")[0])
var nilai_two = Number(q.split(" ")[1])
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
case 'kali_kan':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* tanda *angka*\n\n_Contoh_\n\n${prefix+command} 2 + 2`)
var nilai_one = Number(q.split(" ")[0])
var nilai_two = Number(q.split(" ")[1])
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
case 'bagi_kan':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* tanda *angka*\n\n_Contoh_\n\n${prefix+command} 2 + 2`)
var nilai_one = Number(q.split(" ")[0])
var nilai_two = Number(q.split(" ")[1])
reply(`${nilai_one / nilai_two}`)
break
case 'ssweb':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Format Invalid Atau Url Yang Kamu Ketik Tidak Di Temukan !!\n\nContoh :\n${prefix+command} google.com`)
var web = `https://hadi-api.herokuapp.com/api/ssweb?url=${q}&device=desktop&full=on`
conn.sendMessage(from, { image: { url: web }, caption: 'Done!!' }, { quoted:msg })
break
case 'toimg':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isQuotedSticker) return reply(`Reply stikernya!`)
var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
var rand1 = 'temp/'+getRandom('.webp')
var rand2 = 'temp/'+getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
reply(mess.wait)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
fs.unlinkSync(`./${rand1}`)
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Sticker Convert To Image!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: fkontak })
fs.unlinkSync(`./${rand2}`)
})
} else {
reply(mess.wait)
webp2mp4File(`./${rand1}`).then(async(data) => {
fs.unlinkSync(`./${rand1}`)
conn.sendMessage(from, {caption: `*Sticker Convert To Video!*`, video: await getBuffer(data.data) }, { quoted: fkontak })
})
}
break
case 'sticker': case 'stiker': case 's':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (isImage || isQuotedImage) {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) { buffer = Buffer.concat([buffer, chunk]) }
reply(mess.wait)
var rand1 = 'temp/sticker/'+getRandom('.jpg')
var rand2 = 'temp/sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)})}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(`${rand2}`)
} else if (isVideo || isQuotedVideo) {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) { buffer = Buffer.concat([buffer, chunk])}
var rand1 = 'temp/sticker/'+getRandom('.mp4')
var rand2 = 'temp/sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)})}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(`${rand2}`)
} else {
reply(`Kirim gambar/vidio dengan caption ${prefix+command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
}
break
case 'broadcast': case 'bc':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} teks`)
let data_orang = await store.chats.all()
let data_teks = `${q}\n© broadcast ${botName}`
for (let i of data_orang) { 
conn.sendMessage(i.id, { text: data_teks })
await sleep(1000)
}
reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
break
case 'creategc':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*Example :*\n${prefix+command} namagroup`)
var nama_nya = q
let cret = await conn.groupCreate(nama_nya, [])
let response = await conn.groupInviteCode(cret.id)
var teks_creategc = `  「 *Create Group* 」

_*▸ Name : ${cret.subject}*_
_*▸ Owner : @${cret.owner.split("@")[0]}*_
_*▸ Time : ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB*_

*Link Create Group* :
https://chat.whatsapp.com/${response}
`
reply(teks_creategc)
break
case 'linkgrup': case 'linkgc':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'setpp': case 'setppbot':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (isImage || isQuotedImage) {
var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
if (args[1] == '\'panjang\'') {
var { img } = await generateProfilePicture(media)
await conn.query({ tag: 'iq', attrs: { to: botNumber, type:'set', xmlns: 'w:profile:picture' },
content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }] })
fs.unlinkSync(media)
reply(`Sukses`)
} else {
var data = await conn.updateProfilePicture(botNumber, { url: media })
fs.unlinkSync(media)
reply(`Sukses`)
}
} else {
reply(`Kirim/balas gambar dengan caption ${prefix+command} untuk mengubah foto profil bot`)
}
break
case 'setnamegc':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *text*\n\n_Contoh_\n\n${prefix+command} Support ${ownerName}`)
await conn.groupUpdateSubject(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setdesc':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *text*\n\n_Contoh_\n\n${prefix+command} New Description by ${ownerName}`)
await conn.groupUpdateDescription(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setppgrup': case 'setppgc':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isImage || isQuotedImage) {
var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
if (args[1] == '\'panjang\'') {
var { img } = await generateProfilePicture(media)
await conn.query({ tag: 'iq', attrs: { to: from, type:'set', xmlns: 'w:profile:picture' },
content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }] })
fs.unlinkSync(media)
reply(`Sukses`)
} else {
var data = await conn.updateProfilePicture(from, { url: media })
fs.unlinkSync(media)
reply(`Sukses`)
}
} else {
reply(`Kirim/balas gambar dengan caption ${prefix+command} untuk mengubah foto profil bot`)
}
break
case 'open':
case 'buka_grup':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
break
case 'close':
case 'tutup_grup':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
break
case 'grup': case 'group':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isAntiLink) return reply(`antilink sudah aktif`)
if (!args[0]) return conn.sendMessage(from, { text: "[ *GROUP SETTING* ]\n\npilih buka atau tutup", footer: `Group : ${groupName}`, buttons: [{buttonId: `${prefix+command} y`, buttonText: {displayText: 'Open ✅'}, type: 1}, {buttonId: `${prefix+command} n`, buttonText: {displayText: 'Close ❌'}, type: 1}],headerType: 1 })
if (args[0] == "y") {
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
}
if (args[0] == "n") {
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
}
break
case 'delete':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isQuotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'add':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (groupMembers.length == 257) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
var mems = []
groupMembers.map( i => mems.push(i.id) )
var number;
if (args.length > 1) {
number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
var cek = await conn.onWhatsApp(number)
if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
conn.groupParticipantsUpdate(from, [number], "add")
.then( res => reply(jsonformat(res)))
.catch((err) => reply(jsonformat(err)))
} else if (isQuotedMsg) {
number = quotedMsg.sender
var cek = await conn.onWhatsApp(number)
if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
conn.groupParticipantsUpdate(from, [number], "add")
.then( res => reply(jsonformat(res)))
.catch((err) => reply(jsonformat(err)))
} else {
reply(`Kirim perintah ${prefix+command} nomer atau balas pesan orang yang ingin dimasukkan`)
}
break
case 'kick':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
.then( res => reply(jsonformat(res)))
.catch((err) => reply(jsonformat(err)))
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
.then( res => reply(jsonformat(res)))
.catch((err) => reply(jsonformat(err)))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'promote':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
}
break
case 'demote':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
}
break
case 'leave':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!isGroup) return reply(mess.OnlyGrup)
conn.groupLeave(from)
reply('bye')
break
case 'revoke':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'hidetag':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'mysesi':
case 'sendsesi':
case 'session':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isOwner) return reply(mess.OnlyOwner)
let ini_nama_sessionya = 'session'
var anumu = await fs.readFileSync(`./${ini_nama_sessionya}.json`)
conn.sendMessage(from, { document: anumu, mimetype: 'document/application', fileName: 'session.json'}, {quoted: msg } )
reply(`*Note :*\n_Session Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk User Bot Ataupun Pengguna Bot._`)
reply(`_Sedang Mengirim Document_\n_Nama Session : ${setting.sessionName}.json_\n_Mohon Tunggu Sebentar..._`)
break
case 'antilink':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isAntiLink) return reply(`antilink sudah aktif`)
if (!args[0]) return conn.sendMessage(from, { text: "[ *ANTILINK* ]\n\npilih on atau off", footer: 'setting antilink.', buttons: [{buttonId: `${prefix+command} on`, buttonText: {displayText: 'on'}, type: 1}, {buttonId: `${prefix+command} off`, buttonText: {displayText: 'off'}, type: 1}],headerType: 1 })
if (args[0] == "on") {
if (isAntiLink) return reply(`antilink sudah aktif`)
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfull Activate Antilink In This Group')}
if (args[0] == "off") {
if (!isAntiLink) return reply(`antilink telah mati`)
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfull Disabling Antilink In This Group')
}
break
case 'cekitem': case 'list':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hi @${sender.split("@")[0]}`,
buttonText: 'Click Here!',
footer: `*List From ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
break
case 'additem': case 'addlist':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]                
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
if (isImage || isQuotedImage) {
let media = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
reply(`Berhasil menambah List menu *${args1}*`)
if (fs.existsSync(media)) fs.unlinkSync(media)
})
} else {
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
}
break
case 'delitem':
case 'dellist':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} hello`)
if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'p': case 'proses':
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!isQuotedMsg) return ('Reply Pesanannya!')
let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`
const getTextP = getTextSetProses(from, set_proses);
if (getTextP !== undefined) {
mentions(getTextP.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true)
} else {
mentions(proses, [quotedMsg.sender], true)
}
break
case 'd': case 'done':
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!isQuotedMsg) return ('Reply Pesanannya!')
let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya🙏`
const getTextD = getTextSetDone(from, set_done);
if (getTextD !== undefined) {
mentions(getTextD.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true);
} else {
mentions(sukses, [quotedMsg.sender], true)
}
break
case 'setproses': case 'setp':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *teks_p*\n\n_Contoh_\n\n${prefix+command} pesanan @pesan, tag orang @nama`)
if (isSetProses(from, set_proses)) return reply(`Set proses already active`)
addSetProses(q, from, set_proses)
reply(`Successfully set proses!`)
break
case 'changeproses': case 'changep':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *teks_p*\n\n_Contoh_\n\n${prefix+command} pesanan @pesan, tag orang @nama`)
if (isSetProses(from, set_proses)) {
changeSetProses(q, from, set_proses)
reply(`Sukses change set proses teks!`)
} else {
addSetProses(q, from, set_proses)
reply(`Sukses change set proses teks!`)
}
break
case 'delsetproses': case 'delsetp':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetProses(from, set_proses)) return reply(`Belum ada set proses di sini..`)
removeSetProses(from, set_proses)
reply(`Sukses delete set proses`)
break
case 'setdone': case 'setd':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *teks_done*\n\n_Contoh_\n\n${prefix+command} pesanan @pesan, tag orang @nama\n\nList Opts : tanggal/jam`)
if (isSetDone(from, set_done)) return reply(`Set done already active`)
addSetDone(q, from, set_done)
reply(`Successfully set done!`)
break
case 'changedone': case 'changed':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *teks_done*\n\n_Contoh_\n\n${prefix+command} pesanan @pesan, tag orang @nama\n\nList Opts : tanggal/jam`)
if (isSetDone(from, set_done)) {
changeSetDone(q, from, set_done)
reply(`Sukses change set done teks!`)
} else {
addSetDone(q, from, set_done)
reply(`Sukses change set done teks!`)
}
break
case 'delsetdone': case 'delsetd':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetDone(from, set_done)) return reply(`Belum ada set done di sini..`)
removeSetDone(from, set_done)
reply(`Sukses delete set done`)
break
case 'kal': case 'kalkulator':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* tanda *angka*\n\n_Contoh_\n\n${prefix+command} 2 2`)
const sections = [
{ title: "PILIH OBJECT", rows: [ 
{title: "Tambah", rowId: `${prefix}tambah_kan ${q.split(" ")[0]} ${q.split(" ")[1]}`, description: "di tambah (+)"},
{title: "Kurang", rowId: `${prefix}kurang_kan ${q.split(" ")[0]} ${q.split(" ")[1]}`, description: "di kurang (-)"},
{title: "Kali", rowId: `${prefix}kali_kan ${q.split(" ")[0]} ${q.split(" ")[1]}`, description: "di kali (×)"},
{title: "Bagi", rowId: `${prefix}bagi_kan ${q.split(" ")[0]} ${q.split(" ")[1]}`, description: "di bagi (÷)"}
]}]
const listMessage = {
text: `Hallo ${pushname} ${ucapanWaktu}`,
footer: "® kalkulator ( + - ÷ × )",
title: "[ *Hitung Otomatis* ]",
buttonText: "pilih_disini",
mentions: ownerNumber, sections}
conn.sendMessage(from, listMessage)
break
case 'topupff':{
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`*_Format Topup Diamond FF_*\n\n_Example_\n${prefix+command} idff\n\n_Contoh_\n${prefix+command} 239814337\n\n*Note :*\nkesalahan input id tujuan bukan tanggung jawab admin!.`)
const sections = [
{ title: "Pilih Nominal Topup", rows: [ 
{title: "5 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&5`, description: "Rp1.261"},
{title: "12 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&12`, description: "Rp2.523"},
{title: "70 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&70`, description: "Rp12.614"},
{title: "140 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&140`, description: "Rp25.227"},
{title: "355 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&355`, description: "Rp63.068"},
{title: "355 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&720`, description: "Rp126.136"}
]}]
const listMessage = {
text: `\n*Silahkan Pilih Nominal Topup Diamond Yang Tersedia.*

*_Note: Pembayaran Disini Hanya Menggunakan Server, Owner Tidak Mendapatkan Hasil Apapun Disini Karena Diproses Langsung Dari Server Otomatis Dunia Games!._*

*_Jika Sudah Melakukan Pemilihan Nominal, Anda Akan Dikirimkan Qris Pembayaran Dan Anda Harus Membayar Melalu Aplikasi E-wallet Yang Mendukung Qris, Pastikan Nominal Yang Anda Transfer Harus Sama Dengan Nominal Yang Diminta!._*

*_Jika Anda Sudah Melakukan Pembayaran, Silahkan Tunggu 1-2 Menit Dan Diamond Otomatis Masuk Ke Akun Free Fire Anda!._*\n`,
footer: "web api : duniagames.co.id",
title: "━━━「 *TOPUP FREE FIRE* 」━━━",
buttonText: "KLIK DISINI",
mentions: ownerNumber, sections}
conn.sendMessage(from, listMessage, { quoted: fkontak })
}
break
case 'cek_data_ff':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!q) return reply(`*_Format Topup Diamond FF_*\n\n_Example_\n${prefix+command} idff&nominal\n\n_Contoh_\n${prefix+command} 239814337&70\n\n*_Nominal Tersedia_*\n_5-12-70-140-355-720_\n\n*Note :*\nkesalahan input id&nominal bot otomatis blokir user permanen.`)
let ini_idnya = q.split("&")[0]
let ini_jumlahnya = q.split("&")[1]
const makeSession = await hikki.game.topupFreeFire(ini_idnya, ini_jumlahnya) // support nominal 5 12 70 140 355 720
let data_id = makeSession.data.gameId
let data_name = makeSession.data.userNameGame
let data_jumlah = ini_jumlahnya
let data_harga = makeSession.data.totalPrice
let data_nya = `
*KONFIRMASI TRANKSAKSI*
ID Game : ${data_id}
Username : *${makeSession.data.userNameGame}*
Jumlah : *${ini_jumlahnya}* diamond 💎
Code Item : *free_fire${ini_jumlahnya}*
Payment : *QRIS*
Harga : *Rp${toRupiah(makeSession.data.totalPrice)}*

*Tranksaksi ID :* ${makeSession.data.transactionId}`
const buttonMessageee = {
text: data_nya,
footer: 'Jika data semua benar klik button ✅\nDan jika ada yang salah klik button ❌',
buttons: [
{ buttonId: `${prefix}batal_kan ${makeSession.data.transactionId}`, buttonText: {displayText: 'Salah ❌'}, type: 1},
{ buttonId: `${prefix}lanjut_kan ${ini_idnya}&${ini_jumlahnya}&${data_harga}`, buttonText: {displayText: 'Benar ✅'}, type: 1}
],
headerType: 1}
conn.sendMessage(from, buttonMessageee)
break
case 'batal_kan':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let id_tranksaksi = q.split(" ")[0]
let text_batalkan = `Baik kak 😊 Tranksaksi ID : ${id_tranksaksi}, Telah Kami Batalkan.`
reply(text_batalkan)
break
case 'lanjut_kan':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
async function topupFreeFire() {
const makeSession = await hikki.game.topupFreeFire(q.split("&")[0], q.split("&")[1])
return await hikki.game.payDiamond(makeSession, '085789004732')
}
topupFreeFire().then(res => {
let text_bayar_ff =`*Scan QR Di Atas*\n\n*ID Game : ${q.split("&")[0]}*\n*Jumlah : ${q.split("&")[1]} Diamond 💎*\n*Total Harga : Rp${toRupiah(q.split("&")[2])}*\n\n_Jika sudah transfer, tunggu 3-10 menit diamond otomatis masuk_\n\n*_Note : QRIS berlaku 5 menit_*`
conn.sendMessage(from, { image: { url: res.qrCode }, caption: text_bayar_ff }, { quoted:msg })
})
break
case 'topupml':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply('Fitur akan segera rilis')
break
case 'tts':{
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
var tts = await getBuffer(`https://hadi-api.herokuapp.com/api/tts?language=id&text=${q}`)
if (!q) return reply(`Contoh :\n${prefix+command} hallo`)
reply(mess.wait)
conn.sendMessage(from, {audio: tts, mimetype:'audio/mpeg', ptt:true }, {quoted:msg})
}
break
case 'id':{
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
reply(from)
}
break
//BUG KHUSUS WAR
case 'inibug': {
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!isGroup) return reply(mess.OnlyGrup)
let teks = `══✪〘 *BANG INI BUG ? ☺️* 〙✪══
 ➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
for (let mem of participants) {
teks += `⭔ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: doc })
}
break
case 'buggc':{
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!isGroup) return reply(mess.OnlyGrup)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(from, {text: "Xd"}, {quoted: doc})
await sleep(7000)
reply('sukses bro.')
}
break
case 'bugpc':
case 'sendbug':{
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (isGroup) return reply('Khusus Chat Pribadi')
if (!isDeveloper) return reply('Khusus Developer Bot.')
if (!q) return reply(`Contoh:\n${prefix+command} 628xxx`)
let ini_nomor_hpnya = q
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(20)
conn.sendMessage(`${ini_nomor_hpnya}@s.whatsapp.net`, {text: "Xd"}, {quoted: doc})
await sleep(7000)
reply(`Sukses kirim bugfc ke nomor : ${ini_nomor_hpnya}`)
}
break
case 'daftar':
if (cekTeman("id", sender)) return reply('kamu sudah terdaftar di database bot silahkan ketik #menu untuk melihat list menu bot')
if (!args[0]) return conn.sendMessage(from, { text: "━━━「 *VERIFICATION* 」━━━\n\nSilahkan Pilih Gender Anda", footer: 'klik button di bawah.', buttons: [{buttonId: `${prefix+command} aku_pria`, buttonText: {displayText: 'pria️'}, type: 1},{buttonId: `${prefix+command} aku_wanita`, buttonText: {displayText: 'wanita'}, type: 1}],headerType: 1 }, {quoted:fkontak})
if (args[0] == "aku_pria") {
pendaftar.push({id: sender, nama: pushname, gender: "Pria"})
fs.writeFileSync('./database/pengguna.json', JSON.stringify(pendaftar, null, 2))
reply(`━━━「 *YOUR-INFO* 」━━━\n• *Status* : Sukses\n• *ID* : ${sender.split("@")[0]}\n• *User* : Free\n• *Gender* : Pria\n• *Nama* : ${pushname}\n• *Teman* : false\n• *Total User* : ${pendaftar.length}\n\n*Note* : Silahkan gunakan fitur ${prefix}menu untuk melihat apa saya fungsi bot ini.`)
}
if (args[0] == "aku_wanita") {
pendaftar.push({id: sender, nama: pushname, gender: "Wanita"})
fs.writeFileSync('./database/pengguna.json', JSON.stringify(pendaftar, null, 2))
reply(`━━━「 *YOUR-INFO* 」━━━\n• *Status* : Sukses\n• *ID* : ${sender.split("@")[0]}\n• *User* : Free\n• *Gender* : Wanita\n• *Nama* : ${pushname}\n• *Teman* : false\n• *Total User* : ${pendaftar.length}\n\n*Note* : Silahkan gunakan fitur ${prefix}menu untuk melihat apa saya fungsi bot ini.`)
}
break
case 'menfes':
case 'menfess':
if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
if (isGroup) return reply("Gunakan bot ini di pesan pribadi:3")
if (!q) return reply(`Format Fitur Menfes / Kirim pesan rahasia ke seseorang Lewat bot\n\n_Example_\n${prefix+command} nomor_wa|nama_pengirim|isi_pesan\n\n_Contoh_\n${prefix+command} 6285789004732|Lexxy|Hai`)
let nomor_teman = q.split("|")[0]
let nama_pengirim = q.split("|")[1]
let pesan_teman = q.split("|")[2]
let nomor_pengirimnya = sender.split("@")[0]
conn.sendMessage(`${nomor_teman}@s.whatsapp.net`, { text: `━━━「 *MENFES* 」━━━\n\nHallo Kak Ini Ada Pesan Rahasia.\n\nIsi Pesan : ${pesan_teman}\n\nPengirim : ${nama_pengirim}`, footer: 'klik button untuk membalas pesan', buttons: [{buttonId: `${prefix}balas_menfes ${nomor_pengirimnya}@s.whatsapp.net|${nomor_teman}@s.whatsapp.net`, buttonText: {displayText: 'balas✍️'}, type: 1}],headerType: 1 }, {quoted:fkontak})
reply('Sukses mengirimkan pesan ke dia.')
break
case 'balas_menfes':
//if (!cekTeman("id", sender)) return reply(mess.OnlyVerify)
let pengirim_men = q.split("|")[0]
let penerima_men = q.split("|")[1]
db_menfes.push({id: penerima_men, teman: pengirim_men })
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_menfes))
reply('Silahkan Masukan pesan yang ingin di balas ke dia.')
break
case "tinyurl":{
if (!q) return reply(`*Contoh :*\n${prefix+command} http://google.com`)
let tinyurl = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/tinyurl?url=${q}`)
conn.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${tinyurl.result}`, quoted: msg })
}
break
case "isgd":{
if (!q) return reply(`*Contoh :*\n${prefix+command} http://google.com`)
let isgd = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/isgd?url=${q}`)
conn.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${isgd.result.link}`, quoted: msg })
}
break
case "cuttly":{
if (!q) return reply(`*Contoh :*\n${prefix+command} http://google.com`)
let cuttly = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/cuttly?url=${q}`)
conn.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${cuttly.result.link}`, quoted: msg })
}
break
//BATAS
default:
if (!isGroup && !isCmd) {
if (cekUser("id", sender) == null) return
if (cekUser("teman", sender) == false) return
const reactionMessage = { react: { text: "✉", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (m.messages[0].type == "conversation" || m.messages[0].type == "extendedTextMessage") {
try{ var text1 = m.messages[0].message.extendedTextMessage.text } catch (err) { var text1 = m.messages[0].message.conversation }
conn.sendMessage(cekUser("teman", sender), {text: text1 }, {quoted:{ key: {fromMe: false, participant: `${botNumber}`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: {"conversation": "━━━「 *MENFES* 」━━━"}} })
let menfes_kosong = "[]"
db_menfes.splice(menfes_kosong)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_menfes))
}}
}} catch (err) {
console.log(color('[ERROR]', 'red'), err)}}
