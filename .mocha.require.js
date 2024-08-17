require('ts-node').register({
    project: 'tsconfig.mocha.json'
});

const noop = function () {};

require.extensions['.css'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.hbs'] = noop;
