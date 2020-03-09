const jose = require('jose')
const yargs = require('yargs')
const fs = require('fs')
const {
    JWE,   // JSON Web Encryption (JWE)
    JWS    // JSON Web Signature (JWS)
} = jose
const argv = yargs.argv

function unescape (unprocessed) {
    if (unprocessed[0] === '{') {
        const unescaped = unprocessed.replace(/\\/g, '')
        processed = JSON.parse(unescaped)
    } else {
        processed = unprocessed
    }
    return processed
}

if (argv.help || Object.keys(argv).length == 2) {
    console.log(
        'Command line tool for JWS-signing and subsequently JWE-encrypting a JSON\n' +
        '--help: display this message\n' +
        '--json \'{"example":"example"}\': set JSON object to encrypt\n' +
        '--jsonFile object.json: set filepath to JSON object to encrypt\n' +
        '--sign private.key: set filepath to PRIVATE key to sign JSON with\n' +
        '--encrypt public.key: set filepath to PUBLIC key to encrypt JSON with\n' +
        '--out outfile: set filepath to write output to. if not set, output will be printed.'
    )
} else {
    const signKeyUnprocessed = fs.readFileSync(argv.sign, 'utf8')
    var signKey = unescape(signKeyUnprocessed)

    const encryptKeyUnprocessed = fs.readFileSync(argv.encrypt, 'utf8')
    var encryptKey = unescape(encryptKeyUnprocessed)

    var jsonString
    if (argv.jsonFile) {
        jsonString = fs.readFileSync(argv.jsonFile, 'utf8')
    } else {
        jsonString = argv.json
    }
    
    const json = JSON.parse(jsonString)
    
    const signed = JWS.sign(json, signKey)
    const encrypted = JWE.encrypt(signed, encryptKey)
    if (argv.out) {
        fs.writeFileSync(argv.out, encrypted)
    } else {
        console.log(encrypted)
    }
}

