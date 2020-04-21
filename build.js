const metalsmith = require('metalsmith')(__dirname),
    collections = require('metalsmith-collections'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdownit'),
    nib = require('nib'),
    stylus = require('metalsmith-stylus'),
    watch = process.argv[2] === 'watch' ? require('metalsmith-watch') : null;

metalsmith
    .source('./src')
    .destination('./build')
    .clean(false) // to keep .git, CNAME etc.
    .use(collections({
      sections: {
        pattern: 'posts/*.*',
        sortBy: 'filename'
      }
    }))
    .use(markdown({
      html: true,
      linkify: true,
      typographer: true
    }))
    .use(layouts({
      default: 'default.pug',
      pattern: '**/*.html'
    }))
    .use(stylus({use: [nib()]}));

if (watch) {
  metalsmith.use(watch());
}

metalsmith.build(function (err) {
  if (err) { return console.error(err); }
  console.log('OK');
});
