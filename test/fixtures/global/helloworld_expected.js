jade.templates = jade.templates || {};
jade.templates['helloworld'] = (function(){
  return function (locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1>Hello, tester!</h1>');
}
return buf.join("");
};
})();