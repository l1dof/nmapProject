const express = require('express');
const mongoose = require('mongoose');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost/nmap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

const requestSchema = new mongoose.Schema({
  options: {
    type: String,
    required: false,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Request = mongoose.model('Request', requestSchema);

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  const options = req.body.options;
  const ipAddress = req.body.ip;

  const command = `nmap ${ipAddress} ${options}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      res.status(500).send('Internal server error');
      return;
    }

    const newRequest = new Request({
      options: options,
      ipAddress: ipAddress,
      output: stdout,
    });

    newRequest
      .save()
      .then(() => {
        console.log('Request saved to the database');
        res.send(`Command output:\n${stdout}`);
      })
      .catch((error) => {
        console.error('Error saving request:', error);
        res.status(500).send('Internal server error');
      });
  });
});

app.get('/api/requests', (req, res) => {
  Request.find()
    .sort({ createdAt: -1 })
    .exec()
    .then((requests) => {
      res.json(requests);
    })
    .catch((error) => {
      console.error('Failed to fetch requests:', error);
      res.status(500).json({ error: 'Failed to fetch requests' });
    });
});

app.get('/api/requests/last', (req, res) => {
  Request.findOne()
    .sort({ createdAt: -1 })
    .exec((error, request) => {
      if (error) {
        console.error('Failed to fetch last request:', error);
        res.status(500).json({ error: 'Failed to fetch last request' });
      } else {
        res.json(request);
      }
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
