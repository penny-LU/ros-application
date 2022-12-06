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
  console.log(`?????�端已�??�???��????��??�?${host}:${port}`)
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
  socket.on('error', function (err) { // �???��?��??
    console.log('客�?�端??�常?????��??' + err.message)
  })
  socket.on('end', function () { // �???��?��??
    console.log('???�?个客??�端??��??�????')
  })
  // socket.on('data', chunk => {
  // //   const msg = chunk.toString()
  // //   console.log(msg)

  // //   // ???�???��??
  // //  socket.write(Buffer.from('�?好�??' + msg))
  // })
})

sock.on('close', function () { // ?????��?��?��?��?�触???�?�????�???��????��??�?个�??件�??�?被触???�???��?��????????�???��?��??
  console.log('?????��?��?��??')
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
    const msg = req.body.string // msg�O�e�ݶǵ���ݪ��U�����O
    const client = req.body.client // msg�O�e�ݶǵ���ݪ�device �T��
    socketList.forEach(function (clients) {
      const eclient = `${clients.remoteAddress}\u00A0${clients.remotePort}`
      if (eclient === client) {
        // �i�H�q?�ݤf???���O??��?
        clients.write(`${msg}\u00A0${client}`)
      } else {
        res.status(400).send('�L���]��')
      }
    })
  } catch (err) {
    res.send({ error: 'receive error' })
    console.log('exception: ' + err)
  }
})

app.post('/custom', async (req, res) => {
  const msg = req.body.string // msg�O�e�ݶǵ���ݪ�
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
