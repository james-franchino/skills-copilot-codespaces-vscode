// Create web server
// 1. Create a web server
// 2. Load the comments data
// 3. Load the comments.html file
// 4. Replace the comments placeholder with the comments data
// 5. Send the comments data back to the client

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
  // 2. Load the comments data
  fs.readFile('./comments.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    // 3. Load the comments.html file
    fs.readFile('./comments.html', 'utf-8', (err, html) => {
      if (err) {
        console.log(err);
        return;
      }

      // 4. Replace the comments placeholder with the comments data
      const comments = JSON.parse(data);
      let commentHtml = '';
      comments.forEach(comment => {
        commentHtml += `<li>${comment.name}: ${comment.comment}</li>`;
      });
      html = html.replace('<!-- comments -->', commentHtml);

      // 5. Send the comments data back to the client
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(html);
      res.end();
    });
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});