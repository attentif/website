var metalsmith = require('metalsmith')(__dirname),
    collections = require('metalsmith-collections'),
    ignore = require('metalsmith-ignore'),
    jade = require('metalsmith-jade'),
    markdown = require('metalsmith-markdown-remarkable'),
    stylus = require('metalsmith-stylus'),
    watch = process.argv[2] === 'watch' ? require('metalsmith-watch') : null;

metalsmith
    .source('./source')
    .destination('./build')
    .clean(false) // to keep .git, CNAME etc.
    .use(collections({
      sections: {
        pattern: 'content/*.*',
        sortBy: 'name'
      }
    }))
    .use(markdown('full', {
      html: true,
      linkify: true,
      typographer: true
    }))
    .use(jade({useMetadata: true}))
    .use(stylus({nib: true}))
    .use(ignore('content/*'));

if (watch) {
  metalsmith.use(watch());
}

metalsmith.build(function (err) {
  if (err) { return console.error(err); }
  console.log('OK');
});
