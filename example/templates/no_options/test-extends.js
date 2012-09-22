jade.templates = jade.templates || {};
jade.templates['test-extends'] = (function(){
  return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html');
buf.push(attrs({ terse: true, 'lang':("en") }, {"lang":true}));
buf.push('><head></head><body><div');
buf.push(attrs({ terse: true, 'id':('container') }, {}));
buf.push('></div><p>Hi</p></body></html>');
}
return buf.join("");
};
})();