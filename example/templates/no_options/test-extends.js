jade.templates = jade.templates || {};
jade.templates['test-extends'] = (function(){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="en"><head></head><body><div id="container"></div><p>Hi</p></body></html>');
}
return buf.join("");
};
})();