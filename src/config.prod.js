const path = require('path');
module.exports = {
  now: {
    token: 'rXxXWOyUJdpYiIf7mIwed7S9',
    url: 'https://api.vercel.com/v12/now',
    templateDir: path.join(__dirname, 'template', 'umi'),
    templateDirNext: path.join(__dirname, 'template', 'next'),
    whiteList: ['gen-landing-page'],
  },
};
