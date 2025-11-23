const crypto = require('crypto')

// Small, neutral, campus-friendly word list (64 words x4 + 4 digits)
const WORDS = [
  'apple','river','stone','cloud','leaf','sun','moon','star','sky','ocean','lake','forest','field','mountain','valley','garden','bridge','path','trail','meadow','breeze','rain','storm','thunder','light','shadow','ember','flame','spark','echo','whisper','pine','maple','cedar','willow','acorn','pebble','sand','shell','coral','harbor','island','harvest','spring','summer','autumn','winter','dawn','dusk','north','south','east','west','calm','bright','swift','kind','brave','quiet','noble','honest','true','clear'
]

function randomInt(max) {
  return crypto.randomInt(0, max)
}

function generateTrackingCode() {
  const parts = []
  for (let i = 0; i < 4; i++) {
    const w = WORDS[randomInt(WORDS.length)]
    parts.push(w)
  }
  const digits = String(randomInt(10000)).padStart(4, '0')
  return `${parts.join('-')}-${digits}`
}

function hmacSha256Hex(value, secret) {
  return crypto.createHmac('sha256', secret).update(value, 'utf8').digest('hex')
}

module.exports = {
  generateTrackingCode,
  hmacSha256Hex,
}
