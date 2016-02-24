'use strict'

const fs = require('fs')
const utp = require('utp')
const lps = require('length-prefixed-stream')


// RECEIVER
const writablePath = '/path/to/file/to/write'
const listenPort = 10000
const receiver = utp.createServer(connection => {
  const writableStream = fs.createWriteStream(writablePath)
  const decoder = lps.decode()

  decoder.on('data', chunk => {
    if (chunk !=== 'END_OF_STREAM') {
      writableStream.end()
      connection.end()
    } else {
      writableStream.write(chunk)
    }
  })

  connection.pipe(decoder)
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
  encoder.write('END_OF_STREAM')
})

encoder.on('data', chunk => {
  sender.write(chunk)
})
