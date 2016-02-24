'use strict'

const fs = require('fs')
const utp = require('utp-native')
const lps = require('length-prefixed-stream')

let stats = {}
stats.nDecoderOnData = 0

// RECEIVER
const writablePath = '/path/to/file/to/write'
const listenPort = 10000
const receiver = utp.createServer(connection => {
  const writableStream = fs.createWriteStream(writablePath)
  const decoder = lps.decode()

  decoder.on('data', chunk => {
    console.log(`${stats.nDecoderOnData++}: Receiving data from Decoder`)
    if (chunk.toString() === 'END_OF_STREAM') {
      // console.log('CLOSING')
      writableStream.end()
      decoder.end()
      connection.destroy()
    } else {
      writableStream.write(chunk)
    }
  })

  connection.on('data', chunk => {
    // console.log('Receiving data from Socket')
    decoder.write(chunk)
  })

  connection.on('close', () => {
    console.log('Transfer complete')
  })

  // connection.pipe(decoder)
})

receiver.listen(listenPort, () => console.log(`Server able to receive files on port ${listenPort}`))


// SENDER
const readablePath = '/path/to/file/to/read'
const readableStream = fs.createReadStream(readablePath)
const encoder = lps.encode()
const sender = utp.connect(listenPort)

readableStream.on('data', chunk => {
  encoder.write(chunk)
})

readableStream.on('end', () => {
  console.log('SENDING END_OF_STREAM')
  encoder.write('END_OF_STREAM')
})

encoder.on('data', chunk => {
  sender.write(chunk)
})
