const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const wss = WSServer.getWss();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.ws('/', (ws, req) => {
  console.log('CONNECTION STARTED');
  ws.on('message', (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case 'connection':
        connectHandler(ws, msg);
        break;
      case 'draw':
        broadcastConnection(ws, msg);
    }
  });
});

app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, 'files', `${req.query.id}.jpg`)
    );
    const data = `data:image/png;base64,` + file.toString('base64');
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json('error');
  }
});

app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, '');
    fs.writeFileSync(
      path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
      data,
      'base64'
    );
    return res.status(200).json({ message: 'Загружено' });
  } catch (error) {
    console.log(error);
    return res.status(500).json('error');
  }
});
app.listen(PORT, () => console.log(`server start on PORT ${PORT}`));

const connectHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  wss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
