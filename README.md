# sensitivejs
CLT for JWS-signing and subsequently JWE-encrypting a JSON

## Installation
```
git clone https://github.com/cubsphere/sensitivejs
cd sensitivejs
npm install
```

## Running
```
node sensitivejs.js [OPTION]...
```

Available options:

`--help`: display a helpful message

`--json '{"example":"example"}'`: set JSON object to encrypt

`--jsonFile object.json`: set filepath to JSON object to encrypt

`--sign private.key`: set filepath to PRIVATE key to sign JSON with

`--encrypt public.key`: set filepath to PUBLIC key to encrypt JSON with

`--out outfile`: set filepath to write output to. if not set, output will be printed
