'use strict'

const utp = require('utp-native')
const lps = require('length-prefixed-stream')
const fs = require('fs')

class FileTransfer {

  constructor (path) {
    this.path = path
    this._readableStream = fs.createReadStream(path)
  }

  _sendTo (udtpSocket) {

  }

  status () {

  }

  pause () {

  }

  resume () {

  }

}

class Socket {

  constructor (utpSocket) {
    this._utpSocket = utpSocket
    this._endOfStream = lps.encode()
    this._endOfStream.write('END_OF_STREAM')
    this.isEndOfStream = false
  }

  sendFile (path) {

  }

  onFile (cb) {
    this._onFile = cb
  }



  // on (e, cb) {
  //   if (e === 'data') {
  //     this._utpSocket.on(e, data => {
  //       if (data === 'END_OF_STREAM') this.isEndOfStream = true
  //     })
  //   } else {
  //     this._utpSocket.on(e, cb)
  //   }
  // }

  // end (force) {
  //   if (force) return this._utpSocket.end()
  //   setTimeout(() => {
  //     if (this.isEndOfStream) {
  //       this.isEndOfStream = false
  //       this._utpSocket.end()
  //     }
  //   })
  // }

}

class Server {

  constructor (cb) {
    this._server = utp.createServer(socket => cb(new Socket(socket)))
  }

  listen (port, cb) {
    this.server.listen(port, cb)
  }

  on (e, cb) {
    this._server.on(e, cb)
  }

  close () {
    this._server.close()
  }

}

module.exports.createServer = function (cb) {
  return new Server(cb)
}
