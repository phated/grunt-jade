# grunt-jade [![build status](https://secure.travis-ci.org/phated/grunt-jade.png)](http://travis-ci.org/phated/grunt-jade)

Compile jade templates with grunt.

## Notices

This plugin requires Grunt `~0.4.0`

If you are looking for the version of this that works in Grunt `~0.3.0`, use version `0.3.9`

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-jade`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-jade');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
To your [grunt.js gruntfile][getting_started], add:

```javascript
jade: {
  no_options: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path'
  }
}
```

For AMD compilation, add:
(`dependencies` is what you want the runtime to be named)

```javascript
jade: {
  amd: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path',
    wrapper: {
      amd: true,
      dependencies: 'jade'
    }
  }
}
```

For node-style (Modules/1.0) compilation, add:
(`dependencies` is what you want the runtime to be named)

```javascript
jade: {
  node: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path',
    wrapper: {
      node: true,
      dependencies: 'runtime'
    }
  }
}
```

For debug compilation, add:

```javascript
jade: {
  debug: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path',
    options: {
      compileDebug: true
    }
  }
}
```

For HTML compilation (instead of JS), add:

```javascript
jade: {
  html: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path',
    options: {
      client: false
    }
  }
}
```

For unwrapped functions, add:

```javascript
jade: {
  unwrapped: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path/',
    wrapper: {
      wrap: false
    }
  }
}
```

To keep directory structure, use basePath:

```javascript
jade: {
  base_path: {
    files: {
      'dest/path/': ['path/to/src/*.jade'],
    },
    options: {
      basePath: 'path/to/'
    }
  }
}
```

For no runtime file, add:

```javascript
jade: {
  no_runtime: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path/',
    options: {
      runtime: false,
    }
  }
}
```

For locals, add:

```javascript
jade: {
  locals: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path/',
    options: {
      client: false,
      locals: {
        title: 'Welcome to my website!'
      }
    }
  }
}
```

Or alternatively, use a function:

```javascript
jade: {
  locals: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path/',
    options: {
      client: false,
      locals: function() {
          return {compiledAt: new Date()};
      }
    }
  }
}
```
This is useful when you are also using the watch task, since the function will
be called on each reload.

For custom extension, add:

```javascript
jade: {
  custom_extension: {
    src: ['path/to/src/*.jade'],
    dest: 'dest/path/',
    options: {
      extension: '.xml',
    }
  }
}
```

## Defaults

```javascript
options: {
  client: true,
  runtime: true,
  compileDebug: false,
  locals: {},
  extension: null,
  basePath: null
}

wrapper: {
  wrap: true,
  amd: false,
  dependencies: ''
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Blaine Bublitz
Licensed under the MIT license.
