const path = require('path');
module.exports = {
  now: {
    token: "InE2KN15VsTbJePUvZS2Mran",
    url: 'https://api.vercel.com/v12/now',
    templateDir: path.join(__dirname, 'template'),
    whiteList: ['gen-landing-page'],
  },
}
