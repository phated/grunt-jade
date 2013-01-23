jade.templates = jade.templates || {};
jade.templates['locals'] = (function(){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
if ( typeof title !== 'undefined')
{
buf.push('<h1>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h1>');
}
else
{
buf.push('<h2>No locals :(</h2>');
}
}
return buf.join("");
};
})();