var metalsmith = require('metalsmith')(__dirname),
    collections = require('metalsmith-collections'),
    ignore = require('metalsmith-ignore'),
    markdown = require('metalsmith-markdown-remarkable'),
    nib = require('nib'),
    pug = require('metalsmith-pug'),
    stylus = require('metalsmith-stylus'),
    watch = process.argv[2] === 'watch' ? require('metalsmith-watch') : null;

metalsmith
    .source('./src')
    .destination('./build')
    .clean(false) // to keep .git, CNAME etc.
    .use(collections({
      sections: {
        pattern: 'content/*.*',
        sortBy: 'filename'
      }
    }))
    .use(markdown('full', {
      html: true,
      linkify: true,
      typographer: true
    }))
    .use(pug({useMetadata: true}))
    .use(stylus({use: [nib()]}))
    .use(ignore('content/*'));

if (watch) {
  metalsmith.use(watch());
}

metalsmith.build(function (err) {
  if (err) { return console.error(err); }
  console.log('OK');
});
