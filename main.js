var express = require("express");
let fetch = require("node-fetch");
let fs = require("fs");
let path = require("path");

var app = express();

function getQueryOrDefault(param, defaultParam) {
  if (!param) {
    return defaultParam;
  }

  return param;
}

//E.g. material-design-icons/src/action/123/materialicons/24px.svg
function getSVGFile(name) {
  name = name + "/materialicons/24px.svg";
  let filePath = path.join(__dirname, "material-design-icons/src", name);
  let content = fs.readFileSync(filePath, "utf8");

  return content;
}

//https://raw.githubusercontent.com/google/material-design-icons/master/src/alert/warning/materialicons/24px.svg
function fetchWebResource(name) {
  name = name + "/materialicons/24px.svg";
  let url = `https://raw.githubusercontent.com/google/material-design-icons/master/src/${name}`;

  let content = fetch(url).then((res) => res.text());

  return content;
}

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

app.get("/sbs/status-banner.svg", (req, res) => {
  let hue = getQueryOrDefault(req.query.hue, 60);

  let background = getQueryOrDefault(
    req.query.background,
    HSVtoRGB(hue / 360, 0.5, 1.0),
  );
  let foreground = getQueryOrDefault(
    req.query.foreground,
    HSVtoRGB(hue / 360, 0.5, 0.5),
  );
  let title = getQueryOrDefault(req.query.title, "Warning");
  let description = getQueryOrDefault(
    req.query.description,
    "Repo is not actively maintained. Use with caution.",
  );
  let filename = getQueryOrDefault(req.query.icon, "alert/warning");

  let content = fetchWebResource(filename).then((content) => {
    content = content.replace(/svg xmlns/, `svg fill="${foreground}" xmlns`);

    let template = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1700" height="280">
<g transform="">
  <rect fill="${background}" x="0" y="0" width="1700" height="500"/>
  <rect fill="${foreground}" x="300" y="30" width="30" height="220"/>
  <text fill="${foreground}" x="390" y="115" font-size="70px" font-weight="bold" font-family="sans serif">${title}</text>
  <text fill="${foreground}" x="390" y="210" font-size="35px" font-style="italic">${description}</text>
  <g transform="translate(20 20) scale(10)">${content}</g></g></svg>
 `;

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(template);
  });
});

app.use("/sbs/", express.static("public"));

app.use("/status-banner-server/", express.static("static"));

app.listen(8084);
console.log("Listening on port 8084...");
