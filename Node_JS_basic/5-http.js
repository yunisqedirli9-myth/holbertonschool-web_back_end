const http = require('http');
const countStudents = require('./3-read_file_async');

const PORT = 1245;
const DATABASE = process.argv[2];

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    try {
      const oldLog = console.log;
      const output = [];
      console.log = (msg) => output.push(msg);

      await countStudents(DATABASE);

      console.log = oldLog;
      res.end(output.join('\n'));
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(PORT);

module.exports = app;
