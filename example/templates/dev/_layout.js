define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var __jade = [{ lineno: 1, filename: "templates/src/_layout.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('<!DOCTYPE html>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<html');
buf.push(attrs({ terse: true, 'lang':("en") }, {"lang":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('<head>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</head>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<body>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('<div');
buf.push(attrs({ terse: true, 'id':('container') }, {}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
buf.push('');
__jade.shift();
__jade.shift();
__jade.shift();
buf.push('</body>');
__jade.shift();
__jade.shift();
buf.push('</html>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
};
});