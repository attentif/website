var Metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    ignore = require('metalsmith-ignore'),
    jade = require('metalsmith-jade'),
    markdown = require('metalsmith-markdown'),
    stylus = require('metalsmith-stylus');

new Metalsmith(__dirname)
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
    .use(ignore('content/sections/*'))
    .build(onComplete);

function onComplete(err) {
  if (err) { return console.error(err); }
  console.log('OK');
}
