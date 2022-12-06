const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
// const config = require('./config/config')
const net = require('net')

const port = 8082
const host = '192.168.6.27'

const socketList = []
console.log('server start at: ' + host + ':' + port)
console.log('wait for connection...')
const sock = net.createServer()

sock.on('listening', () => {
  console.log(`?????¡ç«¯å·²ç??å¼???¯ï????°å??ï¼?${host}:${port}`)
})
sock.listen(port, host)
const requestIp = require('request-ip')

function socketConnection (client) {
  const clientIp = requestIp.getClientIp(client)
  return clientIp
}
sock.on('connection', socket => {
  // Put this new client in the list
  const ip = socketConnection(socket)
  console.log(ip)
  socket.setEncoding('utf8')
  console.log('Connection' + socket.remoteAddress + ':' + socket.remotePort)
  // socket.write('123')
  // const name = socket.remoteAddress + ':' + socket.remotePort
  socketList.push(socket)
  console.log(socketList[0].remoteAddress, socketList[0].remotePort)
  socket.on('error', function (err) { // è¿???¥æ?­å??
    console.log('å®¢æ?·ç«¯??°å¸¸?????ºï??' + err.message)
  })
  socket.on('end', function () { // è¿???¥æ?­å??
    console.log('???ä¸?ä¸ªå®¢??·ç«¯??­å??è¿????')
  })
  // socket.on('data', chunk => {
  // //   const msg = chunk.toString()
  // //   console.log(msg)

  // //   // ???åº???°æ??
  // //  socket.write(Buffer.from('ä½?å¥½ï??' + msg))
  // })
})

sock.on('close', function () { // ?????¡å?¨å?³é?­æ?¶è§¦???ï¼?å¦????å­???¨è????¥ï??è¿?ä¸ªä??ä»¶ä??ä¼?è¢«è§¦???ï¼???´å?°æ????????è¿???¥å?³é??
  console.log('?????¡å?¨å?³é??')
})

sock.on('error', function (err) {
  console.log(err.message)
})

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.get('/download', async (req, res) => {
  try {
    const list = socketList.map(function (sock) {
      return {
        sockAddress: sock.remoteAddress.toString(),
        sockPort: sock.remotePort.toString()
      }
    })
    res.send(list)
  } catch (err) {
    res.send({ error: 'receive error: ' + err })
  }
})

app.post('/download', async (req, res) => {
  console.log('=========')
  try {
    const msg = req.body.string // msg¬O«eºÝ¶Çµ¹«áºÝªº¤U¸ü«ü¥O
    const client = req.body.client // msg¬O«eºÝ¶Çµ¹«áºÝªºdevice °T®§
    socketList.forEach(function (clients) {
      const eclient = `${clients.remoteAddress}\u00A0${clients.remotePort}`
      if (eclient === client) {
        // ¥i¥H³q?ºÝ¤f???¤À¬O??ªº?
        clients.write(`${msg}\u00A0${client}`)
      } else {
        res.status(400).send('µL¦¹³]³Æ')
      }
    })
  } catch (err) {
    res.send({ error: 'receive error' })
    console.log('exception: ' + err)
  }
})

app.post('/custom', async (req, res) => {
  const msg = req.body.string // msg¬O«eºÝ¶Çµ¹«áºÝªº
  console.log('DATA_custom : ' + msg)
  try {
    socketList[0].write(msg)
    res.end()
  } catch (err) {
    res.send({ error: 'receive error' })
  }
})

require('./routes')(app)

// { force: true }
sequelize.sync()
  .then(() => {
    app.listen(8081, () => {
      console.log(`Server started on port ${8081}`)
    })
  })
