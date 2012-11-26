module.exports = {
  old_node: {
    src: ['test/fixtures/**/*.jade'],
    dest: 'tmp/jade-node/',
    options: {
      wrap: 'node'
    }
  },
  old_amd: {
    src: ['test/fixtures/**/*.jade'],
    dest: 'tmp/jade-amd/',
    wrapper: {
      amd: true,
      dependencies: 'runtime'
    }
  },
  old_debug: {
    src: ['test/fixtures/**/*.jade'],
    dest: 'tmp/jade-debug/',
    options: {
      compileDebug: true
    }
  },
  old_html: {
    src: ['test/fixtures/**/*.jade'],
    dest: 'tmp/jade-html/',
    options: {
      client: false
    }
  },
  old_no_wrap: {
    src: ['test/fixtures/**/*.jade'],
    dest: 'tmp/jade-no_wrap/',
    wrapper: {
      wrap: false
    }
  },
  old_no_runtime: {
    src: ['test/fixtures/**/*.jade'],
    dest: 'tmp/jade-no_runtime/',
    options: {
      runtime: false
    }
  },
  old_custom_extension: {
    src: ['test/fixtures/**/*.jade'],
    dest: 'tmp/jade-custom_extension/',
    options: {
      client: false,
      extension: '.xml'
    }
  },
  example_amd_debug: {
    files: {
      'example/output/amd_debug/': ['example/templates/*.jade']
    },
    options: {
      compileDebug: true,
      wrap: {
        amd: true,
        dependencies: 'jade'
      }
    }
  },
  example_no_amd: {
    files: {
      'example/output/no_amd/': ['example/templates/*.jade']
    },
    options: {
      compileDebug: true,
      wrap: 'global'
    }
  },
  example_amd: {
    files: {
      'example/output/amd/': ['example/templates/*.jade']
    },
    options: {
      wrap: {
        amd: true,
        dependencies: 'jade'
      }
    }
  },
  example_html: {
    files: {
      'example/output/html/': ['example/templates/*.jade']
    },
    options: {
      client: false
    }
  },
  example_no_runtime: {
    files: {
      'example/output/no_runtime/': ['example/templates/*.jade']
    },
    options: {
      runtime: false
    }
  },
  example_no_options: {
    files: {
      'example/output/no_options/': ['example/templates/*.jade']
    }
  },
  example_no_wrap: {
    files: {
      'example/output/no_wrap_no_amd/': ['example/templates/*.jade']
    },
    options: {
      wrap: 'none'
    }
  },
  example_node: {
    files: {
      'example/output/node/': ['example/templates/*.jade']
    },
    options: {
      wrap: 'node'
    }
  },
  example_custom_extension: {
    files: {
      'example/output/custom_extension/': ['example/templates/*.jade']
    },
    options: {
      client: false,
      extension: '.xml'
    }
  }
};