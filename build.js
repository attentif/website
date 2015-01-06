var metalsmith = require('metalsmith')(__dirname),
    collections = require('metalsmith-collections'),
    ignore = require('metalsmith-ignore'),
    jade = require('metalsmith-jade'),
    markdown = require('metalsmith-markdown'),
    stylus = require('metalsmith-stylus'),
    watch = process.argv[2] === 'watch' ? require('metalsmith-watch') : null;

metalsmith
    .source('./source')
    .destination('./build')
    .clean(false) // to keep .git, CNAME etc.
    .use(collections({
      sections: {
        pattern: 'content/sections/*.*',
        sortBy: 'sectionOrder'
      }
    }))
    .use(markdown())
    .use(jade({useMetadata: true}))
    .use(stylus({nib: true}))
    .use(ignore('content/sections/*'));

if (watch) {
  metalsmith.use(watch());
}

metalsmith.build(function (err) {
  if (err) { return console.error(err); }
  console.log('OK');
});
