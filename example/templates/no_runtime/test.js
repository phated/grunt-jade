jade.templates = jade.templates || {};
jade.templates['test'] = (function(){
  return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1>test</h1>');
}
return buf.join("");
};
})();