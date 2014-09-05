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
    files: {
      'dest/path/': ['path/to/src/*.jade']
    }
  }
}
```

For AMD compilation, add:
(`dependencies` is what you want the runtime to be named)

```javascript
jade: {
  amd: {
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
    options: {
      wrap: 'amd'
    }
  }
}
```

For node-style (Modules/1.0) compilation, add:
(`dependencies` is what you want the runtime to be named)

```javascript
jade: {
  node: {
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
    options: {
      wrap: 'node'
    }
  }
}
```

For pretty-indentation whitespace, add

```javascript
jade: {
  pretty: {
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
    options: {
      pretty: true
    }
  }
}
```

For debug compilation, add:

```javascript
jade: {
  debug: {
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
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
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
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
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
    options: {
      wrap: false // or 'none'
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
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
    options: {
      runtime: false
    }
  }
}
```

For locals, add:

```javascript
jade: {
  locals: {
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
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
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
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
    files: {
      'dest/path/': ['path/to/src/*.jade']
    },
    options: {
      extension: '.xml',
    }
  }
}
```

## Defaults

__Options Defaults__

```javascript
options: {
  client: true,
  runtime: true,
  pretty: false,
  compileDebug: false,
  extension: null,
  wrap: null,
  locals: null,
  basePath: null
}
```

__Wrap Defaults__

```javascript
wrap: {
  wrap: true,
  amd: false,
  node: false,
  dependencies: null
}
```

__Wrap Shorthand__

Strings can be passed to `options.wrap` as a quick config

```javascript
wrap: 'amd'
// Shorthand for:
// wrap: {
//   wrap: true,
//   amd: true,
//   node: false,
//   dependencies: 'runtime'
// }

wrap: 'global'
// Shorthand for: default wrapper
// wrap: {
//   wrap: true,
//   amd: false,
//   node: false,
//   dependencies: null
// }

wrap: 'node'
// Shorthand for:
// wrap: {
//   wrap: true,
//   amd: false,
//   node: true,
//   dependencies: './runtime'
// }

wrap: 'none'
// Shorthand for:
// wrap: {
//   wrap: false,
//   amd: false,
//   node: false,
//   dependencies: null
// }
```

Booleans can be passed to `options.wrap` as a quick config, too

```javascript
wrap: true
// Shorthand for: 'global' or default wrapper
// wrap: {
//   wrap: true,
//   amd: false,
//   node: false,
//   dependencies: null
// }

wrap: false
// Shorthand for: 'none'
// wrap: {
//   wrap: false,
//   amd: false,
//   node: false,
//   dependencies: null
// }
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Blaine Bublitz
Licensed under the MIT license.
