(() => {
  // src/compiler/nanoid.js
  var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  var nanoid = (size = 21) => {
    let id = "";
    let i = size;
    while (i--) {
      id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
  };
  var nanoid_default = nanoid;

  // src/parser/parseBrackets.js
  var ParseError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "i.js \u2764\uFE0F  brackets parse ERROR";
    }
  };
  function closeBracket({ open, close, pos, nodes }, endPos, text) {
    return {
      nodeType: "bracket",
      open,
      close,
      nodes,
      pos: Object.assign({}, pos, { end: endPos }),
      content: text.substring(pos.start, endPos + 1),
      innerContent: text.substring(pos.start + 1, endPos)
    };
  }
  function toLibQuote(quoteOpts) {
    const quotes = /* @__PURE__ */ new Map();
    quoteOpts.forEach(([start, end = start]) => quotes.set(start, end));
    return { quotes };
  }
  function toLib(pairs) {
    const opens = {};
    const closes = {};
    pairs.forEach(([open, close]) => {
      closes[open] = close;
      opens[close] = open;
    });
    return { opens, closes };
  }
  function addText(p) {
    const { text, parent, start, end, opt } = p;
    if (start === end && !opt.includeEmpty)
      return;
    const escapers = opt.pairs.reduce((p2, c) => p2.concat(c.split("")), []).map((v) => `${opt.escape}${v}`);
    const delEscape = (text2) => escapers.reduce((p2, c) => p2.split(c).join(c[1]), text2);
    const depth = parent.pos.depth + 1;
    parent.nodes.push({
      nodeType: "text",
      pos: { start, end, depth },
      content: delEscape(text.substring(start, end))
    });
  }
  var safePop = (arr) => {
    const item = arr.pop();
    if (item === void 0)
      throw new ParseError(`LogicError :)`);
    return item;
  };
  function parseBrackets_default(text, options) {
    const defaultOptions = {
      pairs: ["()", "{}", "[]"],
      nestMax: 100,
      escape: "\\",
      skip: false,
      includeEmpty: false,
      quotes: [`"`, `'`, "`"]
    };
    const opt = Object.assign(defaultOptions, options || {});
    const { pairs, nestMax, escape, skip } = opt;
    const { opens, closes } = toLib(pairs);
    const { quotes } = toLibQuote(opt.quotes);
    const ns = [{ nodeType: "root", nodes: [], pos: { start: 0, end: 0, depth: -1 }, content: text }];
    let p = 0;
    let insideQuote = null;
    let quoteStart = 0;
    for (let i = 0; i < text.length; i++) {
      const parent2 = safePop(ns);
      const c = text[i];
      const atEscape = i > 0 && text[i - 1] === escape;
      if (skip && ["{", "}", "(", ")", "[", "]"].includes(c) && parent2.nodeType === "root") {
        ns.push(parent2);
      } else if (skip && ["{", "(", "["].includes(parent2.open) && (c === "<" || c === ">")) {
        ns.push(parent2);
      } else if (atEscape) {
        ns.push(parent2);
      } else if (insideQuote !== null) {
        if (insideQuote === c)
          insideQuote = null;
        ns.push(parent2);
      } else if (quotes.has(c)) {
        insideQuote = quotes.get(c);
        quoteStart = i;
        ns.push(parent2);
      } else if (closes[c] !== void 0) {
        if (ns.length >= nestMax)
          throw new ParseError(`over nest max limit. options: { nestMax: '${opt.nestMax}' }`);
        addText({ text, parent: parent2, start: p, end: i, opt });
        ns.push(parent2);
        ns.push({
          nodeType: "bracket-open",
          pos: { start: i, depth: parent2.pos.depth + 1 },
          open: c,
          close: closes[c],
          nodes: []
        });
        p = i + 1;
      } else if (opens[c] !== void 0) {
        if (parent2.nodeType === "root" || opens[c] !== parent2.open)
          throw new ParseError(`404 pair '${opens[c]}' :${i}`);
        const parent22 = safePop(ns);
        addText({ text, parent: parent2, start: p, end: i, opt });
        const closedNode = closeBracket(parent2, i, text);
        parent22.nodes.push(closedNode);
        ns.push(parent22);
        p = i + 1;
      } else {
        ns.push(parent2);
      }
    }
    if (insideQuote !== null) {
      throw new ParseError(`unclosed quote ${insideQuote} near "...${text.substring(p - 20, p + 30)}..."`);
    }
    const parent = safePop(ns);
    if (parent.nodeType !== "root")
      throw new ParseError(`404 pair '${parent.open}' :${parent.pos.start}`);
    addText({ text, parent, start: p, end: text.length, opt });
    return parent.nodes;
  }

  // src/parser/split.js
  function splitArgs(str) {
    return [...str].reduce((p, c) => {
      if (!p.quote) {
        if (c === "=") {
          if (p.a[p.a.length - 1].length)
            p.a.push("=");
          else
            p.a[p.a.length - 1] = "=";
        } else if (c === " ") {
          if (p.a[p.a.length - 1] !== "=" && p.a[p.a.length - 1].length)
            p.a.push("");
        } else {
          if (['"', "'", "`"].includes(c))
            p.quote = c;
          p.a[p.a.length - 1] += c;
        }
      } else {
        if (c === p.quote)
          p.quote = void 0;
        p.a[p.a.length - 1] += c;
      }
      return p;
    }, { a: [""] }).a;
  }
  function splitByChar(str, char = "|", skipEmpty = false) {
    const splitted = [...str].reduce((p, c) => {
      if (!p.quote) {
        if (c === char) {
          p.a.push("");
        } else {
          if (['"', "'", "`"].includes(c))
            p.quote = c;
          p.a[p.a.length - 1] += c;
        }
      } else {
        if (c === p.quote)
          p.quote = void 0;
        p.a[p.a.length - 1] += c;
      }
      return p;
    }, { a: [""] }).a;
    return skipEmpty ? splitted.filter((i) => i) : splitted;
  }
  function splitByLast(str, delimiter = "|") {
    var lastIndex = str.lastIndexOf(delimiter);
    return [str.substr(0, lastIndex), str.substr(lastIndex + 1)];
  }

  // src/parser/parseAttributes.js
  function isText(text) {
    if (['"', "'"].includes(text[0]) && text[0] === text[text.length - 1]) {
      var i = 1;
      while (i < text.length - 1) {
        if (text[i] === text[0] && text[i - 1] !== "\\")
          return false;
        i++;
      }
      return true;
    }
    return false;
  }
  function mergeAttributes(items) {
    items.filter((i) => i.opts && i.opts.length).forEach((item) => {
      item.opts2 = {};
      const loop = item.opts.find((x) => x.type === "loop");
      if (loop) {
        const key = loop.key;
        item.opts2.key = new Function(`return ${key}`)();
        const a = loop.value.split(" as ");
        if (!a[1])
          throw `Alias for the loop not defined`;
        const b = a[1].split(",");
        item.opts2.loop_fn = a[0].trim();
        item.opts2.loop_alias = b[0].trim();
        if (b[1])
          item.opts2.loop_key_alias = b[1].trim();
      }
      const text = item.opts.find((x) => x.type === "text");
      if (text) {
        if (isText(text.value)) {
          item.opts2.text = text.value.substring(1, text.value.length - 1);
        } else {
          item.opts2.textFn = text.value;
        }
      }
      const html = item.opts.find((x) => x.type === "html");
      if (html) {
        if (isText(html.value)) {
          item.opts2.html = html.value.substring(1, html.value.length - 1);
        } else {
          item.opts2.htmlFn = html.value;
        }
      }
      ["if", "style", "attrs", "enterStyles", "updateStyles", "exitStyles", "enterAttrs", "updateAttrs", "exitAttrs"].forEach((x) => {
        const block = item.opts.find((y) => y.type === x);
        if (block)
          item.opts2[x] = block.value;
      });
      const eventCallbacks = item.opts.filter((x) => x.type === "eventCallback");
      eventCallbacks.forEach((event) => {
        if (!item.opts2.events)
          item.opts2.events = {};
        const name = event.key.substr(1);
        if (item.opts2.events[name])
          throw `ui.js compile error: Duplicate event name "${name}"`;
        if (event.value[0] === "(")
          console.warn(`"${event.key}(" is deprecated. Use "${event.key}{" inside "${item.content.length > 40 ? item.content.substring(0, 40) + "..." : item.content}" declaration`);
        event.value = event.value[0] === "(" ? event.value.substring(1, event.value.length - 1).trim() : event.value.trim();
        if (event.value[0] === "{") {
          event.value = event.value.substring(0, event.value.length - 1) + ";this.render()}";
        } else {
          event.value = "(" + event.value + ")==this.render()";
        }
        item.opts2.events[name] = event.value;
      });
      const eventBinds = item.opts.filter((x) => x.type === "eventBind" || x.type === "eventBindSelfNamed");
      eventBinds.forEach((event) => {
        if (!item.opts2.events)
          item.opts2.events = {};
        const name = event.key.substr(1);
        if (item.opts2.events[name])
          throw `ui.js compile error: Duplicate event name "${name}"`;
        item.opts2.events[name] = new Function(`return (...args) => this.${event.value}(...args)`)();
      });
      const eventCallFunctions = item.opts.filter((x) => x.type === "eventCallFunction");
      eventCallFunctions.forEach((event) => {
        if (!item.opts2.events)
          item.opts2.events = {};
        const name = event.key.substr(1);
        if (item.opts2.events[name])
          throw `ui.js compile error: Duplicate event name "${name}"`;
        item.opts2.events[name] = `${event.value}${event.args}`;
      });
    });
    items.filter((i) => i.opts && i.opts.length).forEach((item) => {
      if (!item.opts2)
        item.opts2 = {};
      if (!item.opts2.attrs2) {
        item.opts2.attrs2 = {};
        item.opts2.attrsB = {};
        item.opts2.attrsR = {};
      }
      const booleanAttributes = item.opts.filter((x) => x.type === "booleanAttribute");
      booleanAttributes.forEach((attr) => {
        if (item.opts2.attrs2[attr.key]) {
          console.warn(`ui.js compile warning: direct attibute "${attr.key}" override attrs({...${attr.key}...}) declaration in tag ""!`);
        }
        item.opts2.attrs2[attr.key] = attr.key;
        item.opts2.attrsB[attr.key] = true;
      });
      const stringAttributes = item.opts.filter((x) => x.type === "stringAttribute");
      stringAttributes.forEach((attr) => {
        if (item.opts2.attrs2[attr.key]) {
          console.warn(`ui.js compile warning: direct attibute "${attr.key}" override attrs({...${attr.key}...}) declaration in tag ""!`);
        }
        item.opts2.attrs2[attr.key] = attr.value;
      });
      const jsAttributes = item.opts.filter((x) => x.type === "jsAttribute");
      jsAttributes.forEach((attr) => {
        if (attr.key[0] === "%") {
          var key = attr.key.substr(1);
          item.opts2.attrsR[key] = attr.value;
        } else {
          var key = attr.key;
        }
        if (item.opts2.attrs2[key]) {
          console.warn(`ui.js compile warning: direct attibute "${key}" override attrs({...${key}...}) declaration in tag ""!`);
        }
        item.opts2.attrs2[key] = attr.value.endsWith("%") ? attr.value : attr;
      });
    });
    items.forEach((item) => {
      if (item.opts2) {
        if (item.opts2.attrs2 && !Object.keys(item.opts2.attrs2).length) {
          delete item.opts2.attrs2;
          delete item.opts2.attrsB;
        }
      }
      if (item.opts2 && item.opts2.events && !Object.keys(item.opts2.events).length)
        delete item.opts2.events;
    });
    return items;
  }
  function propsBlock({ AAA, item, tag, a }, block = "enter", type = "enterStyles") {
    if (a === block && AAA.length) {
      const c = AAA.shift().content;
      if (c[0] === "(") {
        if (item.opts.find((x) => x.type === block)) {
          throw `ui.js template parse error: duplicate ${block}() inside "<${tag}>" declaration`;
        }
        item.opts.push({ type, value: c.slice(1, -1) });
      } else {
        if (c[0] === "{") {
          if (block === "if")
            throw `ui.js template parse error: expected "if(..." but "if${c[0]}..." found inside "<${tag}>"`;
          if (item.opts.find((x) => x.type === block)) {
            throw `ui.js template parse error: duplicate ${block}() inside "<${tag}>" declaration`;
          }
          item.opts.push({ type, value: c.slice(1, -1) });
        } else {
          throw `ui.js template parse error: expected "${block}{..." but "${block}${c[0]}..." found inside "<${tag}>"`;
        }
      }
      return true;
    }
    return false;
  }
  function parseAttributes(items) {
    items.filter((i) => i.nodeType === "bracket" && i.innerContent[0] !== "/").forEach((item) => {
      item.opts = [];
      const AAA = parseBrackets_default(item.innerContent).map((d) => ({
        nodeType: d.nodeType,
        content: d.content.trim()
      }));
      var tag = "";
      do {
        const A = AAA.shift();
        if (A.nodeType === "bracket") {
          if (item.opts.length) {
            const last = item.opts[item.opts.length - 1];
            if (last.type === "jsAttribute") {
              last.value += A.content;
            } else
              throw `ui.js template parse error: unxpected brackets "${A.content}" at the end of <${tag}> attributes`;
          } else
            throw `ui.js template parse error: unxpected brackets "${A.content}" at the end of <${tag}> attributes`;
        } else if (A.nodeType === "text") {
          const bbb = splitArgs(A.content);
          if (!tag)
            tag = bbb.shift();
          do {
            const a = bbb.shift();
            if (bbb[0] && bbb[0][0] === "=") {
              const b = bbb.shift().substr(1);
              if (a[0] === "@") {
                if (['"', "'", "`"].includes(b[0])) {
                  throw `ui.js template parse error: quotes around ${b} is prohibited`;
                }
                if (AAA.length && AAA[0].nodeType === "bracket" && !bbb.length) {
                  const c = AAA.shift();
                  item.opts.push({ type: "eventCallFunction", key: a, value: b, args: c.content });
                } else {
                  item.opts.push({ type: "eventBind", key: a, value: b.endsWith("/") ? b.substring(0, b.length - 1) : b });
                }
              } else if (b.startsWith('"') && b.endsWith('"') || b.startsWith("`") && b.endsWith("`") || b.startsWith("'") && b.endsWith("'")) {
                item.opts.push({ type: "stringAttribute", key: a, value: b.slice(1, -1) });
              } else {
                if (b.length) {
                  item.opts.push({ type: "jsAttribute", key: a, value: b.endsWith("/") ? b.substring(0, b.length - 1) : b });
                } else {
                  if (!AAA.length) {
                    throw `ui.js template parse error: unxpected end of attribute "...${a}=" inside "<${tag}>" declaration`;
                  }
                  const c = AAA.shift().content;
                  if (c[0] === "{") {
                    item.opts.push({ type: "eueAttribute", key: a, value: c });
                  } else if (c[0] === "[") {
                    item.opts.push({ type: "transitionAttribute", key: a, value: c });
                  } else {
                    item.opts.push({ type: "jsAttribute", key: a, value: c.substring(1, c.length - 1) });
                  }
                }
              }
            } else {
              if (a === "loop" && AAA.length) {
                const c = AAA.shift().content;
                if (c[0] === "(") {
                  if (item.opts.find((x) => x.type === "loop")) {
                    throw `ui.js template parse error: duplicate loop${c} inside "<${tag}>" declaration`;
                  }
                  const [value, key] = splitByLast(c.slice(1, -1));
                  if (key) {
                    item.opts.push({ type: "loop", key, value });
                  } else {
                    throw `ui.js template parse error: non-keyed loop not supported yet. "loop${c}" inside "<${tag}>"`;
                  }
                } else {
                  throw `ui.js template parse error: expected "loop(..." but "loop${c[0]}..." found inside "<${tag}>" `;
                }
              } else if (propsBlock({ AAA, item, tag, a }, "if", "if"))
                true;
              else if (propsBlock({ AAA, item, tag, a }, "style", "style"))
                true;
              else if (propsBlock({ AAA, item, tag, a }, "attrs", "attrs"))
                true;
              else if (propsBlock({ AAA, item, tag, a }, "enter", "enterStyles"))
                true;
              else if (propsBlock({ AAA, item, tag, a }, "update", "updateStyles"))
                true;
              else if (propsBlock({ AAA, item, tag, a }, "exit", "exitStyles"))
                true;
              else if (propsBlock({ AAA, item, tag, a }, "#enter", "enterAttrs"))
                true;
              else if (propsBlock({ AAA, item, tag, a }, "#update", "updateAttrs"))
                true;
              else if (propsBlock({ AAA, item, tag, a }, "#exit", "exitAttrs"))
                true;
              else if (a === "text" && AAA.length) {
                const c = AAA.shift().content;
                if (c[0] === "(") {
                  if (item.opts.find((x) => x.type === "text")) {
                    throw `ui.js template parse error: duplicate text{c} inside "<${tag}>" declaration`;
                  }
                  item.opts.push({ type: "text", value: c.slice(1, -1) });
                } else {
                  throw `ui.js template parse error: expected "text(..." but "text{c[0]}..." found inside "<${tag}>"`;
                }
              } else if (a === "html" && AAA.length) {
                const c = AAA.shift().content;
                if (c[0] === "(") {
                  if (item.opts.find((x) => x.type === "html")) {
                    throw `ui.js template parse error: duplicate html{c} inside "<${tag}>" declaration`;
                  }
                  item.opts.push({ type: "html", value: c.slice(1, -1) });
                } else {
                  throw `ui.js template parse error: expected "html(..." but "html{c[0]}..." found inside "<${tag}>"`;
                }
              } else {
                if (a) {
                  if (a[0] === "@") {
                    if (!bbb.length && AAA[0] && AAA[0].nodeType === "bracket") {
                      const c = AAA.shift();
                      item.opts.push({ type: "eventCallback", key: a, value: c.content });
                    } else {
                      if (a.endsWith("/"))
                        item.opts.push({ type: "eventBindSelfNamed", key: a.trim().slice(0, -1), value: a.trim().slice(1, -1) });
                      else
                        item.opts.push({ type: "eventBindSelfNamed", key: a.trim(), value: a.trim().slice(1) });
                    }
                  } else {
                    if (a === "=") {
                      throw `ui.js template parse error: unxpected end of attribute "${a}" inside "<${tag}>" declaration`;
                    }
                    if (a !== "/") {
                      item.opts.push({ type: "booleanAttribute", key: a.endsWith("/") ? a.slice(0, -1) : a });
                    } else {
                    }
                  }
                } else {
                }
              }
            }
          } while (bbb.length);
        }
      } while (AAA.length);
    });
    return mergeAttributes(items);
  }

  // src/parser/selfClosingTags.js
  var selfClosingTags_default = {
    "!DOCTYPE": true,
    "!doctype": true,
    // void
    area: true,
    base: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    meta: true,
    menuitem: true,
    param: true,
    source: true,
    track: true,
    wbr: true,
    // svg
    circle: true,
    ellipse: true,
    line: true,
    path: true,
    polygon: true,
    polyline: true,
    rect: true,
    stop: true,
    use: true
  };

  // src/parser/CompileError.js
  var CompileError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "ui.js \u2764\uFE0F  syntax ERROR";
    }
  };

  // src/parser/toTree.js
  function renameAlias(tag, aliases = []) {
    if (!aliases.length)
      return tag;
    if (tag[0] == "@") {
      if (tag.length === 1)
        throw `empty alias tag <@>`;
      const alias = aliases.find((i) => i.alias === tag);
      if (alias) {
        tag = alias.name;
      } else {
        throw `alias <${tag}> not defined`;
      }
    }
    return tag;
  }
  function tagName(name, aliases) {
    const alias = aliases.find((i) => i.name === name);
    return alias ? alias.alias : name;
  }
  function toTree(items, aliases) {
    const tags2 = [{ children: [] }];
    tags2.last = () => tags2[tags2.length - 1];
    items.forEach((item) => {
      if (item.nodeType === "text") {
        var parent = tags2[tags2.length - 1];
        if (parent.text)
          throw `children and text() attribute at the same time`;
        parent.children.push({ tag: "#text", content: item.content });
      } else {
        var selfClosing = item.content.match(new RegExp("^<(@?[a-z][-a-z0-9]*)(\\s.*)?\\/>$", "s"));
        if (selfClosing) {
          var parent = tags2[tags2.length - 1];
          if (parent.text)
            throw `children and text() attribute at the same time`;
          parent.children.push(Object.assign({ tag: renameAlias(selfClosing[1], aliases) }, item.opts2));
        } else {
          var openTag = item.content.match(new RegExp("^<(@?[a-z][-a-z0-9]*)(\\s.*)?>$", "s"));
          if (openTag) {
            if (selfClosingTags_default[openTag[1]]) {
              const parent2 = tags2[tags2.length - 1];
              if (parent2.text)
                throw `children and text() attribute at the same time`;
              parent2.children.push(Object.assign({ tag: renameAlias(openTag[1], aliases) }, item.opts2));
            } else {
              tags2.push(Object.assign({
                tag: renameAlias(openTag[1], aliases),
                children: []
              }, item.opts2));
            }
          } else {
            var closeTag = item.content.match(new RegExp("^<\\/(@?[a-z][-a-z0-9]*)(\\s.*)?>$", "s"));
            if (closeTag) {
              if (selfClosingTags_default[closeTag[1]])
                throw `can't close self-closing tag "</${closeTag[1]}>"`;
              let parent2 = tags2[tags2.length - 2];
              let node = tags2.pop();
              if (node.children.length === 1 && node.children[0].tag === "#text") {
                node.text = node.children[0].content;
                delete node.children;
              } else if (!node.children.length)
                delete node.children;
              if (!parent2) {
                if (!node.children || node.children[0].tag !== closeTag[1])
                  throw `missing the opening tag for </${closeTag[1]}>`;
                throw `closed twice tag <${node.children[0].tag}>`;
              } else {
                if (parent2.text)
                  throw `children and text() attribute at the same time`;
                const opening = tagName(node.tag, aliases);
                const closing = tagName(closeTag[1], aliases);
                if (opening !== closing)
                  throw `the opening and closing tags are not the same <${opening}>...</${closing}>`;
                parent2.children.push(node);
              }
            }
          }
        }
      }
    });
    if (tags2.length > 1) {
      const x = tags2.find((t) => t.tag);
      throw `Unclosed tag <${tagName(x.tag, aliases)}>`;
    }
    return tags2[0].children;
  }
  var toTree_default = toTree;

  // src/eue/TinyAnimate.js
  var exports = {};
  exports.animate = function(from, to, duration, update, easing, done, element) {
    if (typeof from !== "number" || typeof to !== "number" || typeof duration !== "number" || typeof update !== "function")
      return;
    if (typeof easing === "string" && easings[easing])
      easing = easings[easing];
    if (typeof easing !== "function")
      easing = easings.linear;
    if (typeof done !== "function")
      done = function() {
      };
    var rAF = window.requestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1e3 / 60);
    };
    var canceled = false;
    var change = to - from;
    function loop(timestamp) {
      if (canceled)
        return;
      var time = (timestamp || +/* @__PURE__ */ new Date()) - start;
      if (time >= 0) {
        update(easing(time, from, change, duration));
      }
      if (time >= 0 && time >= duration) {
        update(to);
        done(element, to);
      } else {
        rAF(loop);
      }
    }
    update(from);
    if (change) {
      var start = window.performance && window.performance.now ? window.performance.now() : +/* @__PURE__ */ new Date();
      rAF(loop);
    }
    return {
      update: function(_from, _to, _easing) {
        start = window.performance && window.performance.now ? window.performance.now() : +/* @__PURE__ */ new Date();
        from = _from;
        to = _to;
        change = to - from;
        if (typeof _easing === "string" && easings[_easing])
          easing = easings[_easing];
      },
      cancel: function() {
        canceled = true;
      },
      last: to
    };
  };
  exports.animateCSS = function(element, property, unit, from, to, duration, easing, done) {
    var update = function(value) {
      element.style[property] = value + unit;
    };
    return exports.animate(from, to, duration, update, easing, done);
  };
  exports.cancel = function(animation) {
    if (!animation)
      return;
    animation.cancel();
  };
  var easings = exports.easings = {};
  easings.linear = function(t, b, c, d) {
    return c * t / d + b;
  };
  easings.easeInQuad = function(t, b, c, d) {
    return c * (t /= d) * t + b;
  };
  easings.easeOutQuad = function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  };
  easings.easeInOutQuad = function(t, b, c, d) {
    if ((t /= d / 2) < 1)
      return c / 2 * t * t + b;
    return -c / 2 * (--t * (t - 2) - 1) + b;
  };
  easings.easeInCubic = function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  };
  easings.easeOutCubic = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  };
  easings.easeInOutCubic = function(t, b, c, d) {
    if ((t /= d / 2) < 1)
      return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  };
  easings.easeInQuart = function(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  };
  easings.easeOutQuart = function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  };
  easings.easeInOutQuart = function(t, b, c, d) {
    if ((t /= d / 2) < 1)
      return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  };
  easings.easeInQuint = function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  };
  easings.easeOutQuint = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  };
  easings.easeInOutQuint = function(t, b, c, d) {
    if ((t /= d / 2) < 1)
      return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  };
  easings.easeInSine = function(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  };
  easings.easeOutSine = function(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  };
  easings.easeInOutSine = function(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  };
  easings.easeInExpo = function(t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  };
  easings.easeOutExpo = function(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  };
  easings.easeInOutExpo = function(t, b, c, d) {
    if (t == 0)
      return b;
    if (t == d)
      return b + c;
    if ((t /= d / 2) < 1)
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  };
  easings.easeInCirc = function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  };
  easings.easeOutCirc = function(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  };
  easings.easeInOutCirc = function(t, b, c, d) {
    if ((t /= d / 2) < 1)
      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  };
  easings.easeInElastic = function(t, b, c, d) {
    var p = 0;
    var a = c;
    if (t == 0)
      return b;
    if ((t /= d) == 1)
      return b + c;
    if (!p)
      p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  };
  easings.easeOutElastic = function(t, b, c, d) {
    var p = 0;
    var a = c;
    if (t == 0)
      return b;
    if ((t /= d) == 1)
      return b + c;
    if (!p)
      p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  };
  easings.easeInOutElastic = function(t, b, c, d) {
    var p = 0;
    var a = c;
    if (t == 0)
      return b;
    if ((t /= d / 2) == 2)
      return b + c;
    if (!p)
      p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1)
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
  };
  easings.easeInBack = function(t, b, c, d, s) {
    if (s == void 0)
      s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  };
  easings.easeOutBack = function(t, b, c, d, s) {
    if (s == void 0)
      s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  };
  easings.easeInOutBack = function(t, b, c, d, s) {
    if (s == void 0)
      s = 1.70158;
    if ((t /= d / 2) < 1)
      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  };
  easings.easeInBounce = function(t, b, c, d) {
    return c - easings.easeOutBounce(d - t, 0, c, d) + b;
  };
  easings.easeOutBounce = function(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  };
  easings.easeInOutBounce = function(t, b, c, d) {
    if (t < d / 2)
      return easings.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
    return easings.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
  };
  var TinyAnimate_default = exports;

  // src/tags.js
  var tags = {};
  var tags_default = tags;

  // src/eue/utils.js
  var defaultAnimationOpts = {
    duration: 500
  };
  function splice(arr, a, b) {
    var tmp = arr[a];
    if (a < b) {
      for (; a < b; a++)
        arr[a] = arr[a + 1];
    } else {
      for (; a > b; a--)
        arr[a] = arr[a - 1];
    }
    arr[b] = tmp;
  }
  function createElement(tag, parent) {
    if (typeof tags_default[tag.tag] == "function") {
      var element = new tags_default[tag.tag](parent, tag);
    } else if (tag.svg) {
      var element = document.createElementNS("http://www.w3.org/2000/svg", tag.tag);
    } else {
      var element = document.createElement(tag.tag);
    }
    Object.assign(element, { _attrs: {}, _styles: {}, _attrsV: {}, _styleV: {}, _colors: {}, _events: {} });
    return element;
  }
  function insertElement(container, element, prevElement) {
    if (!element._BASE_ELEMENT) {
      if (prevElement) {
        prevElement.after(element);
      } else {
        container.prepend(element);
      }
      ;
    } else {
      if (prevElement) {
        container._childNodes.splice(
          container._childNodes.findIndex((x) => x === prevElement) + 1,
          0,
          element
        );
      } else {
        container._childNodes.unshift(element);
      }
      ;
    }
  }
  function prependElement(container, element) {
    if (!element._BASE_ELEMENT) {
      container.prepend(element);
    } else {
      container._childNodes.unshift(element);
    }
  }
  function animateAttr(element, key, v) {
    var _a;
    var from = void 0;
    var ease = "linear";
    var fn = void 0;
    var done = void 0;
    var _default = void 0;
    if (typeof v === "object") {
      var duration = v.duration || defaultAnimationOpts.duration;
      var to = v.to;
      if (v.ease)
        ease = v.ease;
      if (v.fn)
        fn = v.fn;
      if (v.done)
        done = v.done;
      if (v.from !== void 0)
        from = v.from;
      if (v.default !== void 0)
        _default = v.default;
    } else {
      var duration = defaultAnimationOpts.duration;
      var to = v;
    }
    if (from === void 0) {
      var _from = element.__rendererName ? element.state[key] : element.getAttribute(key);
      from = _from === void 0 || _from === null ? _default ? _default : 0 : Number(_from);
    }
    TinyAnimate_default.cancel(element._attrs[key]);
    if (fn) {
      from = ((_a = element._attrs[key]) == null ? void 0 : _a.last) || 0;
      element._attrs[key] = TinyAnimate_default.animate(from, to, duration, (x) => {
        element.setAttribute(key, fn(x));
      }, ease, done, element);
    } else {
      element._attrs[key] = TinyAnimate_default.animate(from, to, duration, (x) => {
        element.setAttribute(key, x);
      }, ease, done, element);
    }
  }
  function animateColor(element, key, v) {
    var ease = "linear";
    var delay = 0;
    if (typeof v === "object") {
      var duration = v.duration || defaultAnimationOpts.duration;
      var to = v.to;
      if (v.ease)
        ease = v.ease;
      if (v.delay)
        delay = v.delay;
    } else {
      var duration = defaultAnimationOpts.duration;
      var to = v;
    }
    element._colors[key] = key + " " + duration + "ms " + ease + " " + delay + "ms";
    clearTimeout(element._styles[key]);
    element._styles[key] = setTimeout(() => {
      delete element._colors[key];
      var transition2 = Object.values(element._colors).join(",");
      if (element._transition != transition2) {
        element._transition = transition2;
        if (element._transition)
          element.style.setProperty("transition", element._transition);
        else
          element.style.removeProperty("transition");
      }
    }, duration + delay);
    var transition = Object.values(element._colors).join(",");
    if (element._transition != transition) {
      element._transition = transition;
      if (element._transition)
        element.style.setProperty("transition", element._transition);
      else
        element.style.removeProperty("transition");
    }
    ;
    if (!element.style.getPropertyValue(key)) {
      element.style.setProperty(key, "#000000");
    }
    element.style.setProperty(key, getComputedStyle(element)[key]);
    setTimeout(() => {
      element.style.setProperty(key, to);
    }, 0);
  }
  function animateCSS(element, key, v) {
    if (["color", "background", "fill", "stroke", "background-color", "border-color"].includes(key)) {
      animateColor(element, key, v);
      return;
    }
    var ease = "linear";
    var done = void 0;
    var from = void 0;
    var threshold = 0;
    var unit = "";
    var fn = void 0;
    var _default = void 0;
    if (typeof v === "object") {
      if (typeof v.duration == "function")
        v.duration = v.duration();
      if (v.duration === 0 && v.to) {
        TinyAnimate_default.cancel(element._styles[key]);
        element.style.setProperty(key, v.to);
        return;
      }
      var duration = v.duration || defaultAnimationOpts.duration;
      var to = v.to;
      if (v.from !== void 0)
        from = v.from;
      if (v.default !== void 0)
        _default = v.default;
      if (v.ease)
        ease = v.ease;
      if (v.done)
        done = v.done;
      if (v.threshold !== void 0)
        threshold = v.threshold;
      if (v.fn)
        fn = v.fn;
    } else {
      var duration = defaultAnimationOpts.duration;
      var to = v;
    }
    var isCSSVar = key.startsWith("--");
    var val = isCSSVar ? element.style.getPropertyValue(key) : element.style[key];
    if (!val && _default)
      val = _default;
    if (typeof to === "string") {
      if (!["px", "%", "deg", "vw", "vh", "em"].some((suffix) => {
        if (to.endsWith(suffix)) {
          if (from !== void 0) {
            if (from.endsWith(suffix))
              from = Number(from.substring(0, from.length - suffix.length));
          } else {
            from = Number(val.substring(0, val.length - suffix.length));
          }
          to = Number(to.substring(0, to.length - suffix.length));
          unit = suffix;
          return true;
        }
      }))
        to = Number(to);
    } else {
      if (from === void 0)
        from = Number(val);
    }
    if (threshold && Math.abs(from - to) < threshold) {
      TinyAnimate_default.cancel(element._styles[key]);
      element.style.setProperty(key, v.to);
      return;
    }
    TinyAnimate_default.cancel(element._styles[key]);
    if (fn) {
      element._styles[key] = TinyAnimate_default.animate(from, to, duration, (x) => {
        element.style.setProperty(key, fn(x + unit));
      }, ease, done, element);
    } else {
      element._styles[key] = TinyAnimate_default.animate(from, to, duration, (x) => {
        element.style.setProperty(key, x + unit);
      }, ease, done, element);
    }
  }

  // src/eue/isBooleanAttr.js
  function isBooleanAttr(tag, key) {
    if (tag === "input") {
      if (["checked", "autofocus", "readonly", "required", "disabled", "multiple"].includes(key))
        return true;
    }
    if (tag === "option") {
      if (["selected"].includes(key))
        return true;
    }
    if (tag === "button") {
      if (["disabled", "multiple"].includes(key))
        return true;
    }
    if (tag === "select") {
      if (["disabled"].includes(key))
        return true;
    }
    return false;
  }

  // src/eue/EXIT.js
  function Exit_Attrs_Logic(element, tag, state, key, value) {
    if (typeof value !== "object") {
      element.setAttribute(key, value);
      return defaultAnimationOpts.duration;
    }
    animateAttr(element, key, value);
    return value.duration ? value.duration : defaultAnimationOpts.duration;
  }
  function Exit_Styles_Logic(element, tag, state, key, value) {
    animateCSS(element, key, value);
    return value.duration ? value.duration : defaultAnimationOpts.duration;
  }
  function Exit_Loop_Element(element, tag, state, key, __i__, container) {
    var maxStyle = 0, maxAttrs = 0;
    if (tag.exitAttrs) {
      var exitAttrs = tag.exitAttrs(state);
      if (typeof exitAttrs === "object") {
        maxAttrs = Object.entries(exitAttrs).reduce(
          (prev, item) => Math.max(Exit_Attrs_Logic(element, tag, state, item[0], item[1]), prev),
          0
        );
      }
    }
    if (tag.exitStyles) {
      var exitStyles = tag.exitStyles(state);
      if (typeof exitStyles === "object") {
        maxStyle = Object.entries(exitStyles).reduce(
          (prev, item) => Math.max(Exit_Styles_Logic(element, tag, state, item[0], item[1]), prev),
          0
        );
      }
    }
    element.isExit = true;
    if (maxStyle > 0 || maxAttrs > 0) {
      const timeout = setTimeout(() => container.Done.then(() => {
        removeElement(element);
        __i__.exit.delete(key);
      }), maxStyle > maxAttrs ? maxStyle : maxAttrs);
      __i__.exit.set(key, {
        element,
        timeout
      });
      return;
    }
    clearTimeout(__i__.exit[key]);
    removeElement(element);
  }
  function Exit_Single(element, tag, state, container, index) {
    var maxStyle = 0, maxAttrs = 0;
    if (tag.exitAttrs) {
      var exitAttrs = tag.exitAttrs(state);
      if (typeof exitAttrs === "object") {
        maxAttrs = Object.entries(exitAttrs).reduce(
          (prev, item) => Math.max(Exit_Attrs_Logic(element, tag, state, item[0], item[1]), prev),
          0
        );
      }
    }
    if (tag.exitStyles) {
      var exitStyles = tag.exitStyles(state);
      if (typeof exitStyles === "object") {
        maxStyle = Object.entries(exitStyles).reduce(
          (prev, item) => Math.max(Exit_Styles_Logic(element, tag, state, item[0], item[1]), prev),
          0
        );
      }
    }
    element.isExit = true;
    if (maxStyle > 0 || maxAttrs > 0) {
      const timeout = setTimeout(() => container.Done.then(() => {
        container.__i__[index] = false;
        removeElement(element);
      }), maxStyle > maxAttrs ? maxStyle : maxAttrs);
      container.__i__[index] = {
        exit: timeout
      };
      return false;
    }
    clearTimeout(container.__i__[index]);
    container.__i__[index] = false;
    removeElement(element);
    return true;
  }
  async function removeElement(element) {
    if (element.nodeName === "#text") {
      console.log("TEXT");
      return;
    }
    if (element.__i__)
      for (const obj of Object.values(element.__i__)) {
        clearTimeout(obj.exit);
      }
    for (const obj of Object.values(element._attrs)) {
      if (obj == null ? void 0 : obj.cancel)
        obj.cancel();
    }
    for (const obj of Object.values(element._styles)) {
      if (obj == null ? void 0 : obj.cancel)
        obj.cancel();
    }
    const childNodes = element.__rendererName ? element.document._childNodes : element.children;
    while (childNodes.length) {
      const child = childNodes[childNodes.length - 1];
      await removeElement(child);
    }
    await element.remove();
  }

  // src/eue/UPDATE.js
  function Update_Keyed_Loop(tag, container, prevElement, _state, __i__, index, data) {
    var keys = __i__.keys;
    var elements = __i__.elements;
    var exit = __i__.exit;
    var old_length = elements.length;
    var new_length = data.length;
    var max_length = old_length > new_length ? old_length : new_length;
    var shift = 0;
    var x = 0;
    var removeIndex = 0;
    do {
      if (x < new_length) {
        var new_key = tag.key(data[x], x);
        if (x >= old_length) {
          old_length++;
          max_length = old_length > new_length ? old_length : new_length;
          var ___exit = exit.get(new_key);
          if (___exit) {
            clearTimeout(___exit.timeout);
            var element = ___exit.element;
            delete element.isExit;
            tag.svg || (element.className = "");
            exit.delete(new_key);
          } else {
            var element = createElement(tag, container);
          }
          _state[tag.loop_alias] = data[x];
          if (tag.loop_key_alias)
            _state[tag.loop_key_alias] = x;
          Enter_Light(element, tag, _state, GLOBALS_default, ___exit);
          if (x === 0) {
            if (exit.size) {
              for (let entry of exit) {
                entry[1].element.before(element);
                break;
              }
            } else {
              if (prevElement) {
                prevElement.after(element);
              } else {
                prependElement(container, element);
              }
            }
          } else
            elements[x - 1].after(element);
          elements.splice(x, 0, element);
          element.key = new_key;
          keys[new_key] = true;
          x++;
          continue;
        } else {
          var old_key = elements[x].key;
          if (new_key === old_key) {
            _state[tag.loop_alias] = data[x];
            if (tag.loop_key_alias)
              _state[tag.loop_key_alias] = x;
            tag.Update_Tag(elements[x], tag, _state, GLOBALS_default);
            x++;
            continue;
          } else {
            if (keys[new_key]) {
              var offs_old = void 0;
              var offs_new = void 0;
              let tmp = void 0;
              var _found = void 0;
              for (var y = x + 1; y < max_length; y++) {
                if (!offs_old && y < old_length && elements[y].key === new_key)
                  offs_old = y + 1;
                if (!offs_new && y < new_length && tag.key(data[y], y) === old_key)
                  offs_new = y + 1;
                if (offs_old && offs_new) {
                  var a_x = elements[x];
                  if (offs_old >= offs_new) {
                    tmp = elements[offs_old - 1];
                    container.insertBefore(tmp, a_x);
                    _state[tag.loop_alias] = data[x];
                    if (tag.loop_key_alias)
                      _state[tag.loop_key_alias] = x;
                    tag.Update_Tag(tmp, tag, _state, GLOBALS_default);
                    if (offs_old === offs_new) {
                      if (y - x > 1) {
                        if (offs_old >= elements.length) {
                          elements[y - 1].after(a_x);
                        } else {
                          container.insertBefore(a_x, elements[offs_old]);
                        }
                      }
                      elements[x] = elements[y];
                      elements[y] = a_x;
                    } else {
                      splice(elements, offs_old - 1, x);
                      shift++;
                    }
                    x++;
                  } else {
                    tmp = true;
                    var ind = offs_new - 1 + shift;
                    if (ind >= elements.length) {
                      elements[elements.length - 2].after(a_x);
                    } else {
                      if (!elements[ind])
                        throw 9999999999;
                      container.insertBefore(a_x, elements[ind]);
                    }
                    splice(elements, x, (ind > old_length ? old_length : ind) - 1);
                    _state[tag.loop_alias] = data[x];
                    if (tag.loop_key_alias)
                      _state[tag.loop_key_alias] = x;
                    tag.Update_Tag(a_x, tag, _state, GLOBALS_default);
                  }
                  break;
                }
              }
              if (tmp)
                continue;
            } else {
              old_length++;
              max_length = old_length > new_length ? old_length : new_length;
              var ___exit = exit.get(new_key);
              if (___exit) {
                clearTimeout(___exit.timeout);
                element = ___exit.element;
                delete element.isExit;
                tag.svg || (element.className = "");
                exit.delete(new_key);
              } else {
                var element = createElement(tag, container);
              }
              _state[tag.loop_alias] = data[x];
              if (tag.loop_key_alias)
                _state[tag.loop_key_alias] = x;
              Enter_Light(element, tag, _state, GLOBALS_default, ___exit);
              if (x === 0) {
                if (prevElement) {
                  prevElement.after(element);
                } else {
                  prependElement(container, element);
                }
              } else {
                elements[x - 1].after(element);
              }
              elements.splice(x, 0, element);
              element.key = new_key;
              keys[new_key] = true;
              x++;
              continue;
            }
          }
        }
      }
      delete keys[elements[x].key];
      if (tag.loop_key_alias) {
        _state[tag.loop_key_alias] = x + removeIndex;
        removeIndex++;
      }
      Exit_Loop_Element(elements[x], tag, _state, elements[x].key, __i__, container);
      elements.splice(x, 1);
      old_length--;
      max_length = old_length > new_length ? old_length : new_length;
    } while (x < max_length);
    __i__.length = elements.length;
    return exit.size + __i__.length;
  }
  function getFns() {
    return {
      ret_element: function(element, tag, state, GLOBALS2) {
        return element;
      },
      children: function(element, tag, state, GLOBALS2) {
        GLOBALS2.UPDATE_Chidldren(element, tag.children, state);
      },
      fn_text: function(element, tag, state, GLOBALS2) {
        var text = tag.text(state);
        if (!element) {
          console.log("NOT element.__lastText", element);
          console.trace();
          return;
        }
        if (element.__lastText !== text) {
          element.textContent = element.__lastText = text;
        }
      },
      fn_html: function(element, tag, state, GLOBALS2) {
        var html = tag.html(state);
        if (element.__lastHTML !== html) {
          element.innerHTML = element.__lastHTML = html;
        }
      },
      updateProps: function(element, tag, state, GLOBALS2) {
        tag.updateProps(element, tag, state, GLOBALS2);
      }
    };
  }
  function Update_Tag(tag) {
    var fns = [];
    var FF = getFns();
    if (tag.tag === "#text") {
      fns.push(FF.ret_element);
      return fns;
    }
    if (tag.children)
      fns.push(FF.children);
    else {
      if (tag.html) {
        if (typeof tag.html === "function") {
          fns.push(FF.fn_html);
        }
      } else if (tag.text) {
        if (typeof tag.text === "function") {
          fns.push(FF.fn_text);
        }
      }
    }
    if (tag.updateProps) {
      fns = [...fns, ...tag.updateProps];
    }
    fns.push(FF.ret_element);
    return fns;
  }
  function U_SINGLE(container, tag, state, index, childIndex, __i__) {
    tag.Update_Tag(
      container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex],
      tag,
      state,
      GLOBALS_default
    );
    return childIndex + 1;
  }
  function U_LOOP(container, tag, state, index, childIndex, __i__) {
    let data = tag.loop(state);
    if (!__i__ || __i__.length === 0) {
      if (!__i__ || __i__.exit.size === 0) {
        if (!data.length) {
          return childIndex;
        } else {
          if (index === 0) {
            tag.enter(tag, container, void 0, state, index, data, GLOBALS_default);
            return childIndex + container.__i__[index].length;
          } else {
            tag.enter(tag, container, childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex - 1] : container.childNodes[childIndex - 1], state, index, data, GLOBALS_default);
            return childIndex + container.__i__[index].length;
          }
        }
      } else {
        if (!data.length) {
          return childIndex + __i__.exit.size;
        } else {
          const count = Update_Keyed_Loop(tag, container, index === 0 || childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex], state, __i__, index, data);
          return childIndex + count;
        }
      }
    } else {
      if (!data.length) {
        const count = Update_Keyed_Loop(tag, container, index === 0 || childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex], state, __i__, index, data);
        return childIndex + count;
      } else {
        const count = Update_Keyed_Loop(tag, container, index === 0 || childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex - 1] : container.childNodes[childIndex - 1], state, __i__, index, data);
        return childIndex + count;
      }
    }
  }
  function U_IF_SINGLE(container, tag, state, index, childIndex, __i__) {
    if (__i__ === false) {
      if (!tag.if(state)) {
        return childIndex;
      } else {
        let element = createElement(tag, container);
        if (tag.children) {
          Enter_Children(element, tag.children, state);
        } else {
          if (tag.text) {
            var text = typeof tag.text === "function" ? tag.text(state) : tag.text;
            if (element.__lastText !== text) {
              element.textContent = element.__lastText = text;
            }
          } else if (tag.html) {
            var html = typeof tag.html === "function" ? tag.html(state) : tag.html;
            if (element.__lastHTML !== html) {
              element.innerHTML = element.__lastHTML = html;
            }
          }
        }
        if (tag.enterProps)
          tag.enterProps(element, tag, state, GLOBALS_default);
        if (childIndex === 0) {
          prependElement(container, element);
        } else {
          if (container.__rendererName)
            container._childNodes[childIndex - 1].after(element);
          else {
            container.childNodes[childIndex - 1].after(element);
          }
        }
        container.__i__[index] = { exit: false };
        return childIndex + 1;
      }
    } else {
      if (tag.if(state)) {
        if (__i__.exit) {
          clearTimeout(__i__.exit);
          if (tag.enterProps)
            tag.enterProps(
              container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex],
              tag,
              state,
              GLOBALS_default
            );
          container.__i__[index] = { exit: false };
          return childIndex + 1;
        } else {
          tag.Update_Tag(
            container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex],
            tag,
            state,
            GLOBALS_default
          );
          return childIndex + 1;
        }
      } else {
        if (__i__.exit) {
          return childIndex + 1;
        } else {
          let _childNodes = container.__rendererName ? container._childNodes : container.childNodes;
          let isExitNow = Exit_Single(_childNodes[childIndex], tag, state, container, index);
          if (isExitNow) {
            return childIndex;
          } else {
            return childIndex + 1;
          }
        }
      }
    }
  }
  function U_IF_LOOP(container, tag, state, index, childIndex, __i__) {
    if (__i__ === false || __i__.length === 0) {
      if (tag.if(state)) {
        let data = tag.loop(state);
        if (!data.length) {
          return childIndex;
        } else {
          if (index === 0) {
            tag.enter(tag, container, void 0, state, index, data, GLOBALS_default);
            return childIndex + container.__i__[index].length;
          } else {
            tag.enter(tag, container, childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex - 1] : container.childNodes[childIndex - 1], state, index, data, GLOBALS_default);
            return childIndex + container.__i__[index].length;
          }
        }
      } else {
        return childIndex;
      }
    } else {
      if (tag.if(state)) {
        let data = tag.loop(state);
        const count = Update_Keyed_Loop(tag, container, index === 0 && childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex] : container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex], state, __i__, index, data);
        return childIndex + count;
      } else {
        if (__i__.length === 0) {
          return childIndex + __i__.exit.size;
        } else {
          const count = Update_Keyed_Loop(tag, container, index === 0 && childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex], state, __i__, index, []);
          return childIndex + count;
        }
      }
    }
  }
  function UPDATE_Chidldren(container, component, state) {
    if (container.isExit) {
      return;
    }
    var Finish = void 0;
    container.Done = new Promise((resolve) => Finish = resolve);
    var childIndex = 0;
    component.every((tag, index) => {
      if (!container.__i__) {
        console.groupCollapsed("Not initialized element!!! " + tag.tag);
        console.dir(container);
        console.log("component", component);
        console.log("tag", tag);
        console.trace();
        console.groupEnd();
        return false;
      }
      const __i__ = container.__i__[index];
      if (tag.tag === "#text") {
        childIndex++;
        return true;
      }
      if (tag.hasOwnProperty("if")) {
        if (tag.loop) {
          childIndex = U_IF_LOOP(container, tag, state, index, childIndex, __i__);
        } else {
          childIndex = U_IF_SINGLE(container, tag, state, index, childIndex, __i__);
        }
      } else {
        if (tag.loop) {
          childIndex = U_LOOP(container, tag, state, index, childIndex, __i__);
        } else {
          childIndex = U_SINGLE(container, tag, state, index, childIndex, __i__);
        }
      }
      return true;
    });
    Finish();
  }

  // src/eue/updateProps.js
  function updateAttribute(tag, element, key, value) {
    var _a, _b;
    if (tag.tag === "input" && key === "value") {
      if (element._attrsV[key] !== value) {
        element._attrsV[key] = value;
        if (element.value != value)
          element.value = value;
      }
    } else if (key === "class") {
      if (typeof value === "object" && value !== null) {
        throw "Cannot do transition on class attribute";
      }
      var val = value || void 0;
      if (element._attrsV[key] !== val) {
        element._attrsV[key] = val;
        if (val) {
          if (tag.svg)
            element.setAttribute(key, val);
          else
            element.className = val;
        } else
          element.removeAttribute(key);
      }
    } else if (key === "style") {
      if (typeof value === "object" && value !== null) {
        throw "Cannot do transition on style attribute";
      }
      var val = value || void 0;
      if (element._attrsV[key] !== val) {
        element._attrsV[key] = val;
        if (val)
          element.setAttribute(key, val);
        else
          element.removeAttribute(key);
      }
    } else {
      if (typeof value === "object" || element._attrsV[key] !== value || Array.isArray(value)) {
        if (isBooleanAttr(tag.tag, key)) {
          element._attrsV[key] = value;
          if (tag.tag === "input" && tag.attrs2.type === "radio" && key === "checked" && !tag.attrsB[key]) {
            if (tag.attrs2.value) {
              if (tag.attrs2.value == value) {
                element.setAttribute(key, "");
                element[key] = key;
              } else {
                element.removeAttribute(key);
                element[key] = "";
              }
            } else {
              if (value) {
                element.setAttribute(key, "");
                element[key] = key;
              } else {
                element.removeAttribute(key);
                element[key] = "";
              }
            }
          } else {
            value ? element.setAttribute(key, "") || (element[key] = key) : element.removeAttribute(key) || (element[key] = "");
          }
        } else if (tag.tag === "textarea" && key === "value") {
          element.value = value;
        } else {
          if ((!tag.attrs3 || !tag.attrs3[key]) && typeof value === "object") {
            if (!(value == null ? void 0 : value.skip)) {
              if (element._attrsV[key] !== value.to) {
                element._attrsV[key] = value.to;
                if (value == null ? void 0 : value.disabled) {
                  ((_a = element._attrs[key]) == null ? void 0 : _a.cancel) && element._attrs[key].cancel();
                  element.setAttribute(key, value.to);
                } else
                  animateAttr(element, key, value);
              }
            }
          } else {
            if (element._attrsV[key] !== value) {
              element._attrsV[key] = value;
              ((_b = element._attrs[key]) == null ? void 0 : _b.cancel) && element._attrs[key].cancel();
              element.setAttribute(key, value);
            }
          }
        }
      }
    }
  }
  function getFns2() {
    return {
      updateAttrs: function(element, tag, state, GLOBALS2) {
        Object.entries(tag.updateAttrs(state)).forEach(([key, value]) => {
          GLOBALS2.updateAttribute(tag, element, key, value);
        });
      },
      attrs3: function(element, tag, state, GLOBALS2) {
        Object.entries(tag.attrs3).forEach(([key, value]) => {
          GLOBALS2.updateAttribute(tag, element, key, typeof value === "function" ? value(state) : value);
        });
      },
      updateStyles: function(element, tag, state, GLOBALS2) {
        Object.entries(tag.updateStyles(state)).forEach(([key, value]) => {
          var _a;
          if (typeof value === "object") {
            if (element._styleV[key] !== value.to) {
              if (!(value == null ? void 0 : value.skip)) {
                element._styleV[key] = value.to;
                if (value == null ? void 0 : value.disabled) {
                  ((_a = element._styles[key]) == null ? void 0 : _a.cancel) && element._styles[key].cancel();
                  element.style.setProperty(key, value.to);
                } else
                  GLOBALS2.animateCSS(element, key, value);
              }
            }
          } else {
            if (element._styleV[key] !== value) {
              element._styleV[key] = value;
              element.style.setProperty(key, value);
            }
          }
        });
      },
      style: function(element, tag, state, GLOBALS2) {
        Object.entries(tag.style(state)).forEach(([key, value]) => {
          if (element._styleV[key] !== value) {
            element._styleV[key] = value;
            element.style.setProperty(key, value);
          }
        });
      },
      events: function(element, tag, state, GLOBALS2) {
        element.__datum = { ...state };
        return;
      }
    };
  }
  function updateProps(tag) {
    const fns = [];
    const FF = getFns2();
    if (tag.updateAttrs)
      fns.push(FF.updateAttrs);
    if (tag.attrs3)
      fns.push(FF.attrs3);
    if (tag.style)
      fns.push(FF.style);
    if (tag.updateStyles)
      fns.push(FF.updateStyles);
    if (tag.events)
      fns.push(FF.events);
    return fns;
  }

  // src/eue/chainFunc.js
  var chainFunc_default = (...funcs) => {
    return funcs.filter((func) => typeof func === "function").reduce((accumulator, func) => {
      if (accumulator === null)
        return func;
      return function chainedFunction(...args) {
        accumulator.apply(this, args);
        func.apply(this, args);
      };
    }, null);
  };

  // src/GLOBALS.js
  var GLOBALS = {
    createElement,
    insertElement,
    prependElement,
    Enter_Children,
    UPDATE_Chidldren,
    Update_Tag,
    animateAttr,
    animateCSS,
    enterProps,
    enterAttribute,
    updateProps,
    updateAttribute
  };
  var GLOBALS_default = GLOBALS;

  // src/eue/enterProps.js
  function enterAttribute(tag, element, key, value) {
    var _a;
    if (key === "class") {
      var val = value || void 0;
      element._attrsV[key] = val;
      if (val) {
        if (tag.svg)
          element.setAttribute(key, val);
        else
          element.className = val;
      }
      ;
    } else if (key === "style") {
      var val = value || void 0;
      element._attrsV[key] = val;
      if (val)
        element.setAttribute(key, val);
    } else {
      if (key === "id") {
        element._attrsV[key] = value;
        element.id = value;
        element.setAttribute(key, value);
      } else if (isBooleanAttr(tag.tag, key)) {
        if (tag.tag === "input" && tag.attrs2.type === "radio" && key === "checked" && !tag.attrsB[key]) {
          if (tag.attrs2.value) {
            if (tag.attrs2.value == value) {
              element.setAttribute(key, "");
              element._attrsV[key] = value && true;
            }
          } else if (value) {
            element.setAttribute(key, "");
            element._attrsV[key] = value && true;
          }
        } else {
          element._attrsV[key] = value && true;
          value && element.setAttribute(key, "");
        }
      } else if (tag.tag === "textarea" && key === "value") {
        element._attrsV[key] = value;
        element.innerHTML = value;
      } else {
        ((_a = element._attrs[key]) == null ? void 0 : _a.cancel) && element._attrs[key].cancel();
        element._attrsV[key] = value;
        element.setAttribute(key, value);
      }
    }
  }
  function getFns3() {
    return {
      enterAttrs: function(element, tag, state, GLOBALS2) {
        Object.entries(tag.enterAttrs(state)).forEach(([key, value]) => {
          var _a;
          if (Array.isArray(value))
            throw "not implemented";
          else {
            if (typeof value === "object") {
              element._attrsV[key] = value;
              GLOBALS2.animateAttr(element, key, value);
            } else {
              ((_a = element._attrs[key]) == null ? void 0 : _a.cancel) && element._attrs[key].cancel();
              GLOBALS2.enterAttribute(tag, element, key, value);
            }
          }
        });
      },
      attrs: function(element, tag, state, GLOBALS2) {
        var attrs = tag.attrs ? tag.attrs(state) : {};
        if (tag.attrs2) {
          Object.entries(tag.attrs2).forEach(([key, value]) => {
            attrs[key] = typeof value === "function" ? value(state) : value;
          });
        }
        Object.entries(attrs).forEach(([key, value]) => {
          GLOBALS2.enterAttribute(tag, element, key, value);
        });
      },
      enterStyles: function(element, tag, state, GLOBALS2) {
        Object.entries(tag.enterStyles(state)).forEach(([key, value]) => {
          var _a;
          if (Array.isArray(value))
            throw "not implemented";
          else {
            if (typeof value === "object") {
              element._styleV[key] = value.to;
              GLOBALS2.animateCSS(element, key, value);
            } else {
              element._styleV[key] = value;
              ((_a = element._styles[key]) == null ? void 0 : _a.cancel) && element._styles[key].cancel();
              element.style.setProperty(key, value);
            }
          }
        });
      },
      style: function(element, tag, state, GLOBALS2) {
        Object.entries(tag.style(state)).forEach(([key, value]) => {
          element._styleV[key] = value;
          element.style.setProperty(key, value);
        });
      },
      events: function(element, tag, state, GLOBALS2) {
        element.__datum = { ...state };
        Object.entries(tag.events).forEach(([name, value]) => {
          element._events[name] = (event) => value(event, element.__datum, element);
          element.addEventListener(name, element._events[name]);
        });
      }
    };
  }
  function enterProps(tag) {
    const fns = [];
    const FF = getFns3();
    if (tag.enterAttrs)
      fns.push(FF.enterAttrs);
    if (tag.attrs || tag.attrs2)
      fns.push(FF.attrs);
    if (tag.style)
      fns.push(FF.style);
    if (tag.enterStyles)
      fns.push(FF.enterStyles);
    if (tag.events)
      fns.push(FF.events);
    return fns;
  }

  // src/eue/ENTER.js
  function Enter_Keyed_Loop(_tag) {
    return (tag, container, _prevElement, state, index, data, GLOBALS2) => {
      var keys = {};
      var exit = /* @__PURE__ */ new Map();
      var elements = [];
      var prevElement = _prevElement;
      data.forEach((loopState, i) => {
        var element = GLOBALS2.createElement(tag, container);
        element.key = tag.key(loopState, i);
        keys[element.key] = true;
        elements.push(element);
        state[tag.loop_alias] = loopState;
        if (tag.loop_key_alias)
          state[tag.loop_key_alias] = i;
        tag.enterProps && tag.enterProps(element, tag, state, GLOBALS2);
        if (tag.children) {
          GLOBALS2.Enter_Children(element, tag.children, state);
        } else {
          if (tag.text) {
            if (typeof tag.text === "function") {
              element.textContent = element.__lastText = tag.text(state);
            } else {
              element.textContent = element.__lastText = tag.text;
            }
          }
          if (tag.html) {
            if (typeof tag.html === "function") {
              element.innerHTML = element.__lastHTML = tag.html(state);
            } else {
              element.innerHTML = element.__lastHTML = tag.html;
            }
          }
        }
        if (i === 0 && !prevElement) {
          GLOBALS2.prependElement(container, element);
        } else {
          prevElement.after(element);
        }
        prevElement = element;
      });
      container.__i__[index] = {
        length: data.length,
        exit,
        elements,
        keys
      };
      return prevElement;
    };
  }
  function Enter_Children_Light(container, component, state, GLOBALS2) {
    container.__i__ = {};
    component.forEach((tag, index) => {
      if (tag.if) {
        if (!tag.if(state)) {
          container.__i__[index] = false;
          return;
        }
      }
      if (tag.loop) {
        let data = tag.loop(state);
        if (!data.length) {
          container.__i__[index] = false;
          return;
        } else {
          throw 123;
          const childNodes = container.__rendererName ? container._childNodes : container.children;
          Enter_Light(childNodes[index], tag, state, GLOBALS2, true);
          return;
        }
      } else {
        const childNodes = container.__rendererName ? container._childNodes : container.children;
        Enter_Light(childNodes[index], tag, state, GLOBALS2, true);
        return;
      }
    });
  }
  function Enter_Light(element, tag, state, GLOBALS2, isExit) {
    if (tag.enterProps)
      tag.enterProps(element, tag, state, GLOBALS2);
    if (tag.children) {
      if (!isExit)
        Enter_Children(element, tag.children, state);
      else
        Enter_Children_Light(element, tag.children, state, GLOBALS2);
    } else {
      if (tag.text) {
        if (typeof tag.text === "function") {
          element.textContent = element.__lastText = tag.text(state);
        } else {
          element.textContent = element.__lastText = tag.text;
        }
      }
      if (tag.html) {
        if (typeof tag.html === "function") {
          element.innerHTML = element.__lastHTML = tag.html(state);
        } else {
          element.innerHTML = element.__lastHTML = tag.html;
        }
      }
    }
    return element;
  }
  function Enter_Text(tag, container, prevElement, state, index) {
    tag.element = document.createTextNode(tag.content);
    if (prevElement) {
      prevElement.after(tag.element);
    } else {
      container.prepend(tag.element);
    }
    container.__i__[index] = { exit: false };
    return tag.element;
  }
  function Enter_Single(_tag) {
    return (tag, container, prevElement, state, index, ____, GLOBALS2) => {
      var element = GLOBALS2.createElement(tag, container);
      tag.enterProps && tag.enterProps(element, tag, state, GLOBALS2);
      if (tag.text) {
        if (typeof tag.text === "function") {
          element.textContent = element.__lastText = tag.text(state);
        } else {
          element.textContent = element.__lastText = tag.text;
        }
      }
      if (tag.html) {
        if (typeof tag.html === "function") {
          element.innerHTML = element.__lastHTML = tag.html(state);
        } else {
          element.innerHTML = element.__lastHTML = tag.html;
        }
      }
      GLOBALS2.insertElement(container, element, prevElement);
      container.__i__[index] = { exit: false };
      return element;
    };
  }
  function Enter_Single_with_Children(_tag) {
    return (tag, container, prevElement, state, index, ____, GLOBALS2) => {
      var element = GLOBALS2.createElement(tag, container);
      tag.enterProps && tag.enterProps(element, tag, state, GLOBALS2);
      GLOBALS2.insertElement(container, element, prevElement);
      GLOBALS2.Enter_Children(element, tag.children, state);
      container.__i__[index] = { exit: false };
      return element;
    };
  }
  function Enter_Children(container, component, state) {
    container.__i__ = {};
    var prevElement;
    component.forEach((tag, index) => {
      if (tag.if) {
        if (!tag.if(state)) {
          container.__i__[index] = false;
          return;
        }
      }
      if (tag.loop) {
        let data = tag.loop(state);
        if (!data.length) {
          container.__i__[index] = false;
          return;
        } else {
          prevElement = tag.enter(tag, container, prevElement, state, index, data, GLOBALS_default);
          return;
        }
      } else {
        prevElement = tag.enter(tag, container, prevElement, state, index, void 0, GLOBALS_default);
        return;
      }
    });
  }

  // src/eue/buildEnterProps.js
  function buildEnterProps(tag) {
    if (tag.tag === "#text") {
      tag.enter = Enter_Text;
      return;
    }
    tag.enterProps = enterProps(tag);
    tag.updateProps = updateProps(tag);
    tag.Update_Tag = Update_Tag(tag);
    if (tag.loop) {
      tag.enter = Enter_Keyed_Loop(tag);
    } else {
      tag.enter = tag.children ? Enter_Single_with_Children(tag) : Enter_Single(tag);
    }
  }

  // src/compiler/AsyncFunction.js
  var AsyncFunction = Object.getPrototypeOf(async function() {
  }).constructor;
  var AsyncFunction_default = AsyncFunction;

  // src/parser/applyContext.js
  var SVG = [
    "svg",
    "g",
    "path",
    "polygon",
    "rect",
    "circle",
    "line",
    "clipPath",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "filter",
    "font",
    "glyph",
    "image",
    "text",
    "textPath",
    "animate",
    "animateMotion",
    "animateTransform"
  ];
  var makeFn = (item, fn) => new Function(`return ({ ${item.context.join(",")} }) => ${item[fn]}`)();
  var makeFn2 = (item, fn) => new Function(`return ({ ${item.context.join(",")} }) => ({${item[fn]}})`)();
  var makeFn3 = (item, value, value2) => new Function(`return (event, { ${item.context.join(",")} }, element) => {setTimeout(()=>this.render(),0);${value} = event.target.${value2}} `)();
  var makeFn4 = (item, props) => new Function(`return async (event, { ${item.context.join(",")} }, element) => ${props}`)();
  var makeFn5 = (item, props) => new Function(`return ({ ${item.context.join(",")} }) => ${props.value + (props.args || "")}`)();
  function applyContext(tree, context, proto) {
    tree.forEach((item, index) => {
      if (SVG.includes(item.tag))
        item.svg = true;
      item.context = [...context];
      if (item.loop_alias) {
        item.loop = makeFn(item, "loop_fn");
        item.context.push(item.loop_alias);
        if (item.loop_key_alias)
          item.context.push(item.loop_key_alias);
      }
      if (item.textFn) {
        item.text = makeFn(item, "textFn");
        delete item.textFn;
      }
      if (item.htmlFn) {
        item.html = makeFn(item, "htmlFn");
        delete item.htmlFn;
      }
      if (item.if) {
        item.if = makeFn(item, "if");
      }
      ["style", "attrs", "enterStyles", "updateStyles", "exitStyles", "enterAttrs", "updateAttrs", "exitAttrs"].forEach((block) => {
        if (item[block])
          item[block] = makeFn2(item, block);
      });
      if (item.events) {
        Object.entries(item.events).forEach(([name, props]) => {
          if (typeof props === "string") {
            item.events[name] = makeFn4(item, props);
          }
        });
      }
      if (item.attrsR && Object.keys(item.attrsR).length) {
        Object.entries(item.attrsR).forEach(([key, value]) => {
          if (!item.events)
            item.events = {};
          if (item.events["input"]) {
            throw "@input and reactive attr at the same time";
          } else {
            if (item.tag === "input") {
              if (key === "value") {
                item.events["input"] = makeFn3(item, value, "value");
              } else if (key === "checked") {
                if (item.attrs2.type === "checkbox") {
                  item.events["input"] = makeFn3(item, value, "checked");
                } else if (item.attrs2.type === "radio") {
                  item.events["input"] = makeFn3(item, value, "value");
                }
              }
            } else if (item.tag === "textarea" && key === "value") {
              item.events["input"] = makeFn3(item, value, "value");
            }
          }
        });
      }
      if (item.attrs2) {
        if (Object.keys(item.attrs2).length)
          item.attrs3 = {};
        Object.entries(item.attrs2).forEach(([name, props]) => {
          if (typeof props === "object" && props.type === "jsAttribute") {
            item.attrs3[name] = item.attrs2[name] = makeFn5(item, props);
          }
        });
        if (!Object.keys(item.attrs3).length)
          delete item.attrs3;
      }
      buildEnterProps(item);
      if (item.children)
        applyContext(item.children, item.context, proto);
    });
    return tree;
  }

  // src/parser/parseTemplate.js
  function stripEmpty(nodes) {
    return nodes.filter((n) => {
      if (n.nodeType === "bracket") {
        const inner = n.innerContent.split(" ").join("");
        if (["", "/", "@", "@/", "/@"].includes(inner))
          throw `Empty tag <${inner}>`;
      }
      if (n.nodeType === "text" && !n.content.trim().length)
        return false;
      return true;
    });
  }
  function tokenize(template = "") {
    return stripEmpty(
      parseBrackets_default(template, { skip: true, pairs: ["<>", "{}", "()", "[]"] })
    );
  }
  function parseTemplate(template, aliases = [], proto = false) {
    return applyContext(
      toTree_default(
        parseAttributes(
          tokenize(template)
        ),
        aliases
      ),
      ["state"],
      proto
    );
  }

  // src/parser/parseComponent.js
  var uniqueBlocks = "static|template|state|class|style|walt";
  function splitNewLines(text) {
    return text.split(/\r\n|\n|\r/);
  }
  function testUniqueBlock(str, blocks) {
    const i = str.match(new RegExp(`^\\s*<!(${blocks})>\\s*$`, "i"));
    return i ? i[1] : null;
  }
  function testBlock(str, block) {
    const i = str.match(new RegExp(`^\\s*<!${block}\\s+([^>]*)>\\s*$`, "i"));
    return i ? i[1] : null;
  }
  async function parseBlocks(source) {
    const lines = splitNewLines(source);
    const blocks = {};
    var block = void 0;
    var templateLine = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim().length)
        continue;
      const test = testUniqueBlock(line, uniqueBlocks);
      if (!test) {
        if (["css", "import", "tag", "renderer"].some((_block) => {
          const testUB = testBlock(line, _block);
          if (testUB) {
            block = _block;
            if (!blocks[block])
              blocks[block] = [];
            blocks[_block].push(block === "tag" ? { value: testUB, line: i } : testUB);
            return true;
          }
        }))
          continue;
      }
      if (!block && !test) {
        block = "template";
        templateLine = i;
        blocks.template = "";
        blocks.template += "\n" + line;
        continue;
      }
      if (!test) {
        if (["css", "import", "tag", "renderer"].includes(block)) {
          if (!blocks.template) {
            block = "template";
            templateLine = i;
            blocks.template = "";
          } else {
            if (line.trim().startsWith("//")) {
              continue;
            } else {
              throw `unexpected "${line.trim()}" at line ${i}. Template started at line ${templateLine}`;
            }
          }
        }
        blocks[block] += "\n" + line;
        continue;
      } else {
        block = test;
        if (!blocks[test])
          blocks[test] = "";
        else
          throw `duplicate <!${test}> block at line ${i}`;
        continue;
      }
    }
    return blocks;
  }
  function stripQuotes(str) {
    return ['"', "'", "`"].includes(str[0]) && str[0] == str[str.length - 1] ? str.substring(1, str.length - 1).trim() : str.trim();
  }
  function parseTagDirective(tag) {
    const result = {};
    const args = splitByChar(tag.value, " ", true).map(stripQuotes);
    if (args.length > 2)
      throw `excess arguments <!tag ${tag.value}> at line ${tag.line}`;
    if (args.some((a) => !a))
      throw `empty argument <!tag ${tag.value}> at line ${tag.line}`;
    if (args.length === 1) {
      if (args[0][0] === "@")
        throw `alias is present but path is not <!tag ${tag.value}> at line ${tag.line}`;
      result.alias = "@" + args[0].split("\\").pop().split("/").pop();
      result.path = args[0];
    } else {
      if (args[0][0] !== "@")
        throw `missing alias identifier "@" <!tag ${tag.value}> at line ${tag.line}`;
      result.alias = args[0];
      result.path = args[1];
    }
    return result;
  }
  function parseCSSDirective(tag) {
    const splitted = splitByChar(tag, " ", true);
    if (splitted.length > 1)
      throw `excess parameters <!import ${tag}>`;
    return stripQuotes(tag);
  }
  function parseRendererDirective(tag) {
    const splitted = splitByChar(tag, " ", true);
    if (splitted.length > 2)
      throw `excess parameters <!renderer ${tag}>`;
    if (splitted.length == 2 && splitted[1] !== "html")
      throw `unknown second parameter <!renderer ${tag}>`;
    return stripQuotes(tag);
  }
  function validateName(name) {
    try {
      Function("var " + name);
    } catch (e) {
      return false;
    }
    return true;
  }
  function parseImportDirective(tag) {
    const splitted = splitByChar(tag, " ", true);
    if (splitted.length < 3)
      throw `not enough parameters <!import ${tag}>`;
    if (splitted.length === 3) {
      if (splitted[1].toLowerCase() !== "from")
        throw `wrong parameters <!import ${tag}>`;
      if (splitted[0].startsWith("{") && splitted[0].endsWith("}")) {
        const vars = splitted[0].substring(1, splitted[0].length - 1);
        if (!vars.length)
          throw `wrong parameters <!import ${tag}>`;
        const vars2 = vars.split(",").map((v) => v.trim());
        if (!vars2.every(validateName))
          throw `invalid variable name <!import ${tag}>`;
        return {
          type: "object",
          import: splitted[0],
          path: stripQuotes(splitted[2])
        };
      } else {
        if (!validateName(splitted[0]))
          throw `invalid variable name <!import ${tag}>`;
        return {
          type: "var",
          import: splitted[0],
          path: stripQuotes(splitted[2])
        };
      }
    } else {
      try {
        var brackets = parseBrackets_default(tag, { pairs: ["{}"] });
      } catch (e) {
        throw `invalid variable name <!import ${tag}>`;
      }
      if (brackets.length > 2) {
        throw `wrong parameters <!import ${tag}>`;
      } else if (brackets.length === 1) {
        if (brackets[0].nodeType === "bracket")
          throw `wrong parameters <!import ${tag}>`;
        if (splitted[0] === "*" && splitted[1].toLowerCase() === "as" && splitted[3].toLowerCase() === "from" && splitted.length === 5) {
          if (!validateName(splitted[2]))
            throw `invalid variable name <!import ${tag}>`;
          return {
            type: "*",
            import: splitted[2],
            path: stripQuotes(splitted[4])
          };
        } else
          throw `wrong parameters <!import ${tag}>`;
      } else {
        const splitted2 = splitByChar(brackets[1].content, " ", true);
        if (splitted2.length !== 2 || splitted2[0].toLowerCase() !== "from")
          throw `wrong parameters <!import ${tag}>`;
        if (!brackets[0].innerContent.trim().length)
          throw `wrong parameters <!import ${tag}>`;
        const vars2 = brackets[0].innerContent.split(",").map((v) => v.trim());
        if (!vars2.every(validateName))
          throw `invalid variable name <!import ${tag}>`;
        return {
          type: "object",
          import: "{" + vars2.join(",") + "}",
          path: stripQuotes(splitted2[1])
        };
      }
    }
  }
  async function parseComponent(source) {
    const blocks = await parseBlocks(source);
    if (blocks.tag)
      blocks.tag = blocks.tag.map(parseTagDirective);
    if (blocks.css)
      blocks.css = blocks.css.map(parseCSSDirective);
    if (blocks.import)
      blocks.import = blocks.import.map(parseImportDirective);
    if (blocks.renderer)
      blocks.renderer = blocks.renderer.map(parseRendererDirective);
    return blocks;
  }

  // src/runtime/toProto.js
  function _toProto(item) {
    [
      "Update_Tag",
      "enterProps",
      "updateProps"
    ].forEach((x) => {
      if (Array.isArray(item[x])) {
        if (item[x].length) {
          item[x] = chainFunc_default(...item[x]);
        } else
          delete item[x];
      }
    });
    return item;
  }
  function toProto(items) {
    items.forEach((item, i) => {
      items[i] = _toProto(item);
      if (item.children)
        toProto(item.children);
    });
  }

  // src/eue/Spring.js
  var Spring = class {
    constructor({
      stiffness = 300,
      damping = 70,
      mass = 10,
      delta = 0.01,
      target,
      current,
      callback,
      done
    } = {}) {
      this.stiffness = stiffness;
      this.damping = damping;
      this.delta = delta;
      this.mass = mass;
      this.callback = callback;
      this.done = done;
      this.target = target || 0;
      this.current = current || 0;
      this.running = false;
      this.velocity = 0;
      this.acceleration = 0;
      this.step();
    }
    set(value, fastForward = false) {
      this.target = value;
      if (fastForward)
        this.current = value;
      else if (!this.running)
        this.step();
    }
    stop() {
      cancelAnimationFrame(this.rafId);
      if (this.done)
        this.done(this.current);
    }
    start() {
      this.step();
    }
    step() {
      if (!this.isAtTarget()) {
        let delta = this.lastFrameTime ? Math.min(Math.max((Date.now() - this.lastFrameTime) / 1e3, 1 / 120), 1 / 30) : 1 / 60;
        this.running = true;
        this.advance(delta);
        this.lastFrameTime = Date.now();
        this.rafId = requestAnimationFrame(() => this.step());
      } else {
        this.current = this.target;
        this.running = false;
        if (this.done)
          this.done(this.current);
      }
      if (this.callback)
        this.callback(this.current);
    }
    advance(delta) {
      const stiffness = -this.stiffness * (this.current - this.target);
      const damper = -this.damping * this.velocity;
      this.acceleration = (stiffness + damper) / this.mass;
      this.velocity += this.acceleration * delta;
      this.current += this.velocity * delta;
    }
    isAtTarget() {
      return Math.abs(this.target - this.current) < this.delta && Math.abs(this.velocity) <= this.delta;
    }
  };

  // plugins/walt/walt.js
  var Walt = function(exports2) {
    "use strict";
    var immutable = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend() {
      var target = {};
      for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
    const identity = (id2) => id2;
    function map(visitors) {
      function mapper(input) {
        if (!Array.isArray(input)) {
          throw new Error("Transform must be used on an Array. Received " + JSON.stringify(input));
        }
        const visitor = (() => {
          const [node2] = input;
          if (node2.Type in visitors && typeof visitors[node2.Type] === "function") {
            return visitors[node2.Type];
          }
          return identity;
        })();
        if (visitor.length === 2) {
          return visitor(input, mapper);
        }
        const [node, ...rest] = visitor(input);
        const params = node.params.filter(Boolean).map((child) => mapper([child, ...rest]));
        return immutable(node, { params });
      }
      return mapper;
    }
    function mapNode$2(visitor) {
      const nodeMapper = (node) => {
        if (node == null) {
          return node;
        }
        const mappingFunction = (() => {
          if ("*" in visitor && typeof visitor["*"] === "function") {
            return visitor["*"];
          }
          if (node.Type in visitor && typeof visitor[node.Type] === "function") {
            return visitor[node.Type];
          }
          return identity;
        })();
        if (mappingFunction.length === 2) {
          return mappingFunction(node, nodeMapper);
        }
        const mappedNode = mappingFunction(node);
        const params = mappedNode.params.map(nodeMapper);
        return immutable(mappedNode, { params });
      };
      return nodeMapper;
    }
    var mapNode_1$1 = {
      map,
      mapNode: mapNode$2
    };
    var mapNode = mapNode_1$1;
    var mapNode_1 = mapNode.map;
    var mapNode_2 = mapNode.mapNode;
    var walkNode$2 = function(visitor) {
      const walkNode2 = (node) => {
        if (node == null) {
          return node;
        }
        const { params } = node;
        const mappingFunction = (() => {
          if ("*" in visitor && typeof visitor["*"] === "function") {
            return visitor["*"];
          }
          if (node.Type in visitor && typeof visitor[node.Type] === "function") {
            return visitor[node.Type];
          }
          return () => node;
        })();
        if (mappingFunction.length === 2) {
          mappingFunction(node, walkNode2);
          return node;
        }
        mappingFunction(node);
        params.forEach(walkNode2);
        return node;
      };
      return walkNode2;
    };
    var walkNode = walkNode$2;
    var invariant = function(condition, format, a, b, c, d, e, f) {
      if (format === void 0) {
        throw new Error("invariant requires an error message argument");
      }
      if (!condition) {
        var error;
        if (format === void 0) {
          error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
          error.name = "Invariant Violation";
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    var invariant_1 = invariant;
    var commonjsGlobal = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    function unwrapExports(x) {
      return x && x.__esModule ? x["default"] : x;
    }
    function createCommonjsModule(fn, module) {
      return module = { exports: {} }, fn(module, module.exports), module.exports;
    }
    var waltSyntax = createCommonjsModule(function(module, exports3) {
      (function(global2, factory2) {
        factory2(exports3);
      })(commonjsGlobal, function(exports4) {
        const tokens = {
          whitespace: /[ \t]+/,
          comment: [{ match: /\/\/.*?$/ }, { match: /\/\*[^]*?\*\//, lineBreaks: true }],
          number: [{ match: /0[xX][0-9a-fA-F]+/ }, { match: /0[oO][0-9]+/ }, { match: /0[bB][01]+/ }, { match: /(?:[0-9]+(?:\.[0-9]+)?e-?[0-9]+)/ }, { match: /[0-9]+\.[0-9]+|[0-9]+/ }],
          char: [{ match: /'(?:\\['\\bfnrtv0]|[^'\\\n])'/, value: (x) => x.slice(1, -1) }],
          string: [{ match: /"(?:\\["\\rn]|[^"\\\n])*?"/, value: (x) => x.slice(1, -1) }, { match: /'(?:\\['\\bfnrtv0]|[^'\\\n])*?'/, value: (x) => x.slice(1, -1) }, { match: /`(?:\\['\\bfnrtv0]|[^'\\])*?`/, value: (x) => x.slice(1, -1) }],
          identifier: {
            match: /[A-Za-z_$][A-Za-z0-9_$]*/,
            keywords: { keyword: [
              // EcmaScript
              "break",
              "if",
              "else",
              "import",
              "as",
              "from",
              "export",
              "return",
              "switch",
              "case",
              "default",
              "const",
              "let",
              "for",
              "continue",
              "do",
              "while",
              "throw",
              "function",
              // s-expression
              "global",
              "module",
              "type",
              "lambda"
            ], type: ["i32", "i64", "f32", "f64", "bool"] }
          },
          punctuator: ["+", "++", "-", "--", ">>", ">>>", "<<", "=", "==", "+=", "-=", "=>", "<=", ">=", "!=", "%", "*", "/", "^", "&", "~", "|", "!", "**", ":", "(", ")", ".", "{", "}", ",", "[", "]", ";", ">", "<", "?", "||", "&&", "{", "}", "..."],
          newline: { match: /(?:\r\n|\r|\n)/, lineBreaks: true }
        };
        const Program = "Program";
        const Keyword = "Keyword";
        const Export = "Export";
        const Import = "Import";
        const Statement = "Statement";
        const IfThenElse = "IfThenElse";
        const Select = "Select";
        const Else = "Else";
        const UnaryExpression = "UnaryExpression";
        const BinaryExpression = "BinaryExpression";
        const TernaryExpression = "TernaryExpression";
        const NumberLiteral = "NumberLiteral";
        const StringLiteral = "StringLiteral";
        const CharacterLiteral = "CharacterLiteral";
        const Punctuator = "Punctuator";
        const Identifier = "Identifier";
        const ArraySubscript = "ArraySubscript";
        const Constant = "Constant";
        const Type = "Type";
        const ArrayType = "ArrayType";
        const DeclType = "DeclType";
        const GenericType = "GenericType";
        const UserType = "UserType";
        const FunctionType = "FunctionType";
        const Declaration = "Declaration";
        const StaticDeclaration = "StaticDeclaration";
        const StaticValueList = "StaticValueList";
        const ImmutableDeclaration = "ImmutableDeclaration";
        const FunctionDeclaration = "FunctionDeclaration";
        const ArrayDeclaration = "ArrayDeclaration";
        const IndirectFunctionCall = "IndirectFunctionCall";
        const FunctionCall = "FunctionCall";
        const Loop = "Loop";
        const MemoryAssignment = "MemoryAssignment";
        const Assignment = "Assignment";
        const AssignmentExpression = "AssignmentExpression";
        const Param = "Param";
        const Typedef = "Typedef";
        const Struct2 = "Struct";
        const UnionType = "UnionType";
        const ReturnStatement = "ReturnStatement";
        const Sequence = "Sequence";
        const ObjectLiteral = "ObjectLiteral";
        const Pair = "Pair";
        const TypeCast = "TypeCast";
        const Break = "Break";
        const Comment = "Comment";
        const Sizeof = "Sizeof";
        const Spread = "Spread";
        const Closure = "Closure";
        const Noop = "Noop";
        const ClosureType = "ClosureType";
        const Block = "Block";
        const ObjectField = "ObjectField";
        const FunctionIndex = "FunctionIndex";
        const FunctionIdentifier = "FunctionIdentifier";
        const FunctionPointer = "FunctionPointer";
        const FunctionArguments = "FunctionArguments";
        const FunctionResult = "FunctionResult";
        const FunctionLocals = "FunctionLocals";
        const NativeMethod = "NativeMethod";
        const Unreachable = "Unreachable";
        const Access = "Access";
        const i322 = "i32";
        const f322 = "f32";
        const i642 = "i64";
        const f642 = "f64";
        const Memory = "Memory";
        const Table = "Table";
        const bool = "bool";
        exports4.Program = Program;
        exports4.Keyword = Keyword;
        exports4.Export = Export;
        exports4.Import = Import;
        exports4.Statement = Statement;
        exports4.IfThenElse = IfThenElse;
        exports4.Select = Select;
        exports4.Else = Else;
        exports4.UnaryExpression = UnaryExpression;
        exports4.BinaryExpression = BinaryExpression;
        exports4.TernaryExpression = TernaryExpression;
        exports4.NumberLiteral = NumberLiteral;
        exports4.StringLiteral = StringLiteral;
        exports4.CharacterLiteral = CharacterLiteral;
        exports4.Punctuator = Punctuator;
        exports4.Identifier = Identifier;
        exports4.ArraySubscript = ArraySubscript;
        exports4.Constant = Constant;
        exports4.Type = Type;
        exports4.ArrayType = ArrayType;
        exports4.DeclType = DeclType;
        exports4.GenericType = GenericType;
        exports4.UserType = UserType;
        exports4.FunctionType = FunctionType;
        exports4.Declaration = Declaration;
        exports4.StaticDeclaration = StaticDeclaration;
        exports4.StaticValueList = StaticValueList;
        exports4.ImmutableDeclaration = ImmutableDeclaration;
        exports4.FunctionDeclaration = FunctionDeclaration;
        exports4.ArrayDeclaration = ArrayDeclaration;
        exports4.IndirectFunctionCall = IndirectFunctionCall;
        exports4.FunctionCall = FunctionCall;
        exports4.Loop = Loop;
        exports4.MemoryAssignment = MemoryAssignment;
        exports4.Assignment = Assignment;
        exports4.AssignmentExpression = AssignmentExpression;
        exports4.Param = Param;
        exports4.Typedef = Typedef;
        exports4.Struct = Struct2;
        exports4.UnionType = UnionType;
        exports4.ReturnStatement = ReturnStatement;
        exports4.Sequence = Sequence;
        exports4.ObjectLiteral = ObjectLiteral;
        exports4.Pair = Pair;
        exports4.TypeCast = TypeCast;
        exports4.Break = Break;
        exports4.Comment = Comment;
        exports4.Sizeof = Sizeof;
        exports4.Spread = Spread;
        exports4.Closure = Closure;
        exports4.Noop = Noop;
        exports4.ClosureType = ClosureType;
        exports4.Block = Block;
        exports4.ObjectField = ObjectField;
        exports4.FunctionIndex = FunctionIndex;
        exports4.FunctionIdentifier = FunctionIdentifier;
        exports4.FunctionPointer = FunctionPointer;
        exports4.FunctionArguments = FunctionArguments;
        exports4.FunctionResult = FunctionResult;
        exports4.FunctionLocals = FunctionLocals;
        exports4.NativeMethod = NativeMethod;
        exports4.Unreachable = Unreachable;
        exports4.Access = Access;
        exports4.i32 = i322;
        exports4.f32 = f322;
        exports4.i64 = i642;
        exports4.f64 = f642;
        exports4.Memory = Memory;
        exports4.Table = Table;
        exports4.bool = bool;
        exports4.builtinTypes = {
          i32: i322,
          f32: f322,
          i64: i642,
          f64: f642,
          Memory,
          Table,
          bool
        };
        exports4.statements = {
          // Main Program
          Program,
          // Syntax Nodes
          Export,
          Import,
          IfThenElse,
          Else,
          Declaration,
          ImmutableDeclaration,
          FunctionDeclaration,
          ArrayDeclaration,
          Loop,
          MemoryAssignment,
          Assignment,
          Typedef,
          Struct: Struct2,
          UnionType,
          ReturnStatement,
          Sequence,
          ObjectLiteral,
          Pair,
          Break,
          Comment,
          Sizeof,
          Spread,
          Noop,
          Block,
          Unreachable
        };
        exports4.default = {
          // Main Program
          Program,
          // Syntax Nodes
          Keyword,
          Export,
          Import,
          Statement,
          IfThenElse,
          Select,
          Else,
          UnaryExpression,
          BinaryExpression,
          TernaryExpression,
          NumberLiteral,
          StringLiteral,
          CharacterLiteral,
          Punctuator,
          Identifier,
          ArraySubscript,
          Constant,
          Type,
          ArrayType,
          DeclType,
          GenericType,
          UserType,
          FunctionType,
          Declaration,
          ImmutableDeclaration,
          FunctionDeclaration,
          ArrayDeclaration,
          StaticDeclaration,
          StaticValueList,
          IndirectFunctionCall,
          FunctionCall,
          Loop,
          MemoryAssignment,
          Assignment,
          AssignmentExpression,
          Param,
          Typedef,
          Struct: Struct2,
          UnionType,
          ReturnStatement,
          Sequence,
          ObjectLiteral,
          Pair,
          TypeCast,
          Break,
          Comment,
          Sizeof,
          Spread,
          Closure,
          Access,
          Noop,
          // Semantic Nodes
          ClosureType,
          Block,
          ObjectField,
          FunctionIndex,
          FunctionIdentifier,
          FunctionPointer,
          FunctionArguments,
          FunctionResult,
          FunctionLocals,
          // Natives
          NativeMethod,
          Unreachable
        };
        exports4.tokens = tokens;
        Object.defineProperty(exports4, "__esModule", { value: true });
      });
    });
    var Syntax = unwrapExports(waltSyntax);
    var waltSyntax_1 = waltSyntax.tokens;
    var waltSyntax_2 = waltSyntax.semantics;
    var waltSyntax_3 = waltSyntax.builtinTypes;
    var waltSyntax_4 = waltSyntax.statements;
    var waltSyntax_5 = waltSyntax.i32;
    var waltSyntax_6 = waltSyntax.f32;
    var waltSyntax_7 = waltSyntax.i64;
    var waltSyntax_8 = waltSyntax.f64;
    var moo = createCommonjsModule(function(module) {
      (function(root, factory2) {
        if (false) {
          (void 0)([], factory2);
        } else if (module.exports) {
          module.exports = factory2();
        } else {
          root.moo = factory2();
        }
      })(commonjsGlobal, function() {
        var hasOwnProperty2 = Object.prototype.hasOwnProperty;
        var assign = typeof Object.assign === "function" ? Object.assign : (
          // https://tc39.github.io/ecma262/#sec-object.assign
          function(target, sources) {
            if (target == null) {
              throw new TypeError("Target cannot be null or undefined");
            }
            target = Object(target);
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              if (source == null)
                continue;
              for (var key in source) {
                if (hasOwnProperty2.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          }
        );
        var hasSticky = typeof new RegExp().sticky === "boolean";
        function isRegExp(o) {
          return o && o.constructor === RegExp;
        }
        function isObject(o) {
          return o && typeof o === "object" && o.constructor !== RegExp && !Array.isArray(o);
        }
        function reEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        function reGroups(s) {
          var re = new RegExp("|" + s);
          return re.exec("").length - 1;
        }
        function reCapture(s) {
          return "(" + s + ")";
        }
        function reUnion(regexps) {
          var source = regexps.map(function(s) {
            return "(?:" + s + ")";
          }).join("|");
          return "(?:" + source + ")";
        }
        function regexpOrLiteral(obj) {
          if (typeof obj === "string") {
            return "(?:" + reEscape(obj) + ")";
          } else if (isRegExp(obj)) {
            if (obj.ignoreCase) {
              throw new Error("RegExp /i flag not allowed");
            }
            if (obj.global) {
              throw new Error("RegExp /g flag is implied");
            }
            if (obj.sticky) {
              throw new Error("RegExp /y flag is implied");
            }
            if (obj.multiline) {
              throw new Error("RegExp /m flag is implied");
            }
            return obj.source;
          } else {
            throw new Error("not a pattern: " + obj);
          }
        }
        function objectToRules(object) {
          var keys = Object.getOwnPropertyNames(object);
          var result = [];
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var thing = object[key];
            var rules = Array.isArray(thing) ? thing : [thing];
            var match = [];
            rules.forEach(function(rule) {
              if (isObject(rule)) {
                if (match.length)
                  result.push(ruleOptions(key, match));
                result.push(ruleOptions(key, rule));
                match = [];
              } else {
                match.push(rule);
              }
            });
            if (match.length)
              result.push(ruleOptions(key, match));
          }
          return result;
        }
        function arrayToRules(array) {
          var result = [];
          for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            if (!obj.name) {
              throw new Error("Rule has no name: " + JSON.stringify(obj));
            }
            result.push(ruleOptions(obj.name, obj));
          }
          return result;
        }
        function ruleOptions(name, obj) {
          if (typeof obj !== "object" || Array.isArray(obj) || isRegExp(obj)) {
            obj = { match: obj };
          }
          var options = assign({
            tokenType: name,
            lineBreaks: !!obj.error,
            pop: false,
            next: null,
            push: null,
            error: false,
            value: null,
            getType: null
          }, obj);
          var match = options.match;
          options.match = Array.isArray(match) ? match : match ? [match] : [];
          options.match.sort(function(a, b) {
            return isRegExp(a) && isRegExp(b) ? 0 : isRegExp(b) ? -1 : isRegExp(a) ? 1 : b.length - a.length;
          });
          if (options.keywords) {
            options.getType = keywordTransform(options.keywords);
          }
          return options;
        }
        function compileRules(rules, hasStates) {
          rules = Array.isArray(rules) ? arrayToRules(rules) : objectToRules(rules);
          var errorRule = null;
          var groups = [];
          var parts = [];
          for (var i = 0; i < rules.length; i++) {
            var options = rules[i];
            if (options.error) {
              if (errorRule) {
                throw new Error("Multiple error rules not allowed: (for token '" + options.tokenType + "')");
              }
              errorRule = options;
            }
            if (options.match.length === 0) {
              continue;
            }
            groups.push(options);
            var pat = reUnion(options.match.map(regexpOrLiteral));
            var regexp = new RegExp(pat);
            if (regexp.test("")) {
              throw new Error("RegExp matches empty string: " + regexp);
            }
            var groupCount = reGroups(pat);
            if (groupCount > 0) {
              throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: \u2026 ) instead");
            }
            if (!hasStates && (options.pop || options.push || options.next)) {
              throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.tokenType + "')");
            }
            if (!options.lineBreaks && regexp.test("\n")) {
              throw new Error("Rule should declare lineBreaks: " + regexp);
            }
            parts.push(reCapture(pat));
          }
          var suffix = hasSticky ? "" : "|(?:)";
          var flags = hasSticky ? "ym" : "gm";
          var combined = new RegExp(reUnion(parts) + suffix, flags);
          return { regexp: combined, groups, error: errorRule };
        }
        function compile4(rules) {
          var result = compileRules(rules);
          return new Lexer({ start: result }, "start");
        }
        function compileStates(states, start) {
          var keys = Object.getOwnPropertyNames(states);
          if (!start)
            start = keys[0];
          var map2 = /* @__PURE__ */ Object.create(null);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            map2[key] = compileRules(states[key], true);
          }
          for (var i = 0; i < keys.length; i++) {
            var groups = map2[keys[i]].groups;
            for (var j = 0; j < groups.length; j++) {
              var g = groups[j];
              var state = g && (g.push || g.next);
              if (state && !map2[state]) {
                throw new Error("Missing state '" + state + "' (in token '" + g.tokenType + "' of state '" + keys[i] + "')");
              }
              if (g && g.pop && +g.pop !== 1) {
                throw new Error("pop must be 1 (in token '" + g.tokenType + "' of state '" + keys[i] + "')");
              }
            }
          }
          return new Lexer(map2, start);
        }
        function keywordTransform(map2) {
          var reverseMap = /* @__PURE__ */ Object.create(null);
          var byLength = /* @__PURE__ */ Object.create(null);
          var types = Object.getOwnPropertyNames(map2);
          for (var i = 0; i < types.length; i++) {
            var tokenType = types[i];
            var item = map2[tokenType];
            var keywordList = Array.isArray(item) ? item : [item];
            keywordList.forEach(function(keyword) {
              (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword);
              if (typeof keyword !== "string") {
                throw new Error("keyword must be string (in keyword '" + tokenType + "')");
              }
              reverseMap[keyword] = tokenType;
            });
          }
          function str(x) {
            return JSON.stringify(x);
          }
          var source = "";
          source += "(function(value) {\n";
          source += "switch (value.length) {\n";
          for (var length in byLength) {
            var keywords = byLength[length];
            source += "case " + length + ":\n";
            source += "switch (value) {\n";
            keywords.forEach(function(keyword) {
              var tokenType2 = reverseMap[keyword];
              source += "case " + str(keyword) + ": return " + str(tokenType2) + "\n";
            });
            source += "}\n";
          }
          source += "}\n";
          source += "})";
          return (0, eval)(source);
        }
        var Lexer = function(states, state) {
          this.startState = state;
          this.states = states;
          this.buffer = "";
          this.stack = [];
          this.reset();
        };
        Lexer.prototype.reset = function(data, info) {
          this.buffer = data || "";
          this.index = 0;
          this.line = info ? info.line : 1;
          this.col = info ? info.col : 1;
          this.setState(info ? info.state : this.startState);
          return this;
        };
        Lexer.prototype.save = function() {
          return {
            line: this.line,
            col: this.col,
            state: this.state
          };
        };
        Lexer.prototype.setState = function(state) {
          if (!state || this.state === state)
            return;
          this.state = state;
          var info = this.states[state];
          this.groups = info.groups;
          this.error = info.error || { lineBreaks: true, shouldThrow: true };
          this.re = info.regexp;
        };
        Lexer.prototype.popState = function() {
          this.setState(this.stack.pop());
        };
        Lexer.prototype.pushState = function(state) {
          this.stack.push(this.state);
          this.setState(state);
        };
        Lexer.prototype._eat = hasSticky ? function(re) {
          return re.exec(this.buffer);
        } : function(re) {
          var match = re.exec(this.buffer);
          if (match[0].length === 0) {
            return null;
          }
          return match;
        };
        Lexer.prototype._getGroup = function(match) {
          if (match === null) {
            return -1;
          }
          var groupCount = this.groups.length;
          for (var i = 0; i < groupCount; i++) {
            if (match[i + 1] !== void 0) {
              return i;
            }
          }
          throw new Error("oops");
        };
        function tokenToString() {
          return this.value;
        }
        Lexer.prototype.next = function() {
          var re = this.re;
          var buffer = this.buffer;
          var index2 = re.lastIndex = this.index;
          if (index2 === buffer.length) {
            return;
          }
          var match = this._eat(re);
          var i = this._getGroup(match);
          var group, text;
          if (i === -1) {
            group = this.error;
            text = buffer.slice(index2);
          } else {
            text = match[0];
            group = this.groups[i];
          }
          var lineBreaks = 0;
          if (group.lineBreaks) {
            var matchNL = /\n/g;
            var nl = 1;
            if (text === "\n") {
              lineBreaks = 1;
            } else {
              while (matchNL.exec(text)) {
                lineBreaks++;
                nl = matchNL.lastIndex;
              }
            }
          }
          var token = {
            type: group.getType && group.getType(text) || group.tokenType,
            value: group.value ? group.value(text) : text,
            text,
            toString: tokenToString,
            offset: index2,
            lineBreaks,
            line: this.line,
            col: this.col
            // nb. adding more props to token object will make V8 sad!
          };
          var size = text.length;
          this.index += size;
          this.line += lineBreaks;
          if (lineBreaks !== 0) {
            this.col = size - nl + 1;
          } else {
            this.col += size;
          }
          if (group.shouldThrow) {
            throw new Error(this.formatError(token, "invalid syntax"));
          }
          if (group.pop)
            this.popState();
          else if (group.push)
            this.pushState(group.push);
          else if (group.next)
            this.setState(group.next);
          return token;
        };
        if (typeof Symbol !== "undefined" && Symbol.iterator) {
          var LexerIterator = function(lexer) {
            this.lexer = lexer;
          };
          LexerIterator.prototype.next = function() {
            var token = this.lexer.next();
            return { value: token, done: !token };
          };
          LexerIterator.prototype[Symbol.iterator] = function() {
            return this;
          };
          Lexer.prototype[Symbol.iterator] = function() {
            return new LexerIterator(this);
          };
        }
        Lexer.prototype.formatError = function(token, message) {
          var value = token.value;
          var index2 = token.offset;
          var eol = token.lineBreaks ? value.indexOf("\n") : value.length;
          var start = Math.max(0, index2 - token.col + 1);
          var firstLine = this.buffer.substring(start, index2 + eol);
          message += " at line " + token.line + " col " + token.col + ":\n\n";
          message += "  " + firstLine + "\n";
          message += "  " + Array(token.col).join(" ") + "^";
          return message;
        };
        Lexer.prototype.clone = function() {
          return new Lexer(this.states, this.state);
        };
        Lexer.prototype.has = function(tokenType) {
          for (var s in this.states) {
            var groups = this.states[s].groups;
            for (var i = 0; i < groups.length; i++) {
              var group = groups[i];
              if (group.tokenType === tokenType)
                return true;
              if (group.keywords && hasOwnProperty2.call(group.keywords, tokenType)) {
                return true;
              }
            }
          }
          return false;
        };
        return {
          compile: compile4,
          states: compileStates,
          error: Object.freeze({ error: true })
        };
      });
    });
    var slice = Array.prototype.slice;
    var toArray = function(a) {
      return slice.call(a);
    };
    var tail = function(a) {
      return slice.call(a, 1);
    };
    var createFn = function(fn, args, totalArity) {
      var remainingArity = totalArity - args.length;
      switch (remainingArity) {
        case 0:
          return function() {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 1:
          return function(a) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 2:
          return function(a, b) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 3:
          return function(a, b, c) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 4:
          return function(a, b, c, d) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 5:
          return function(a, b, c, d, e) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 6:
          return function(a, b, c, d, e, f) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 7:
          return function(a, b, c, d, e, f, g) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 8:
          return function(a, b, c, d, e, f, g, h) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 9:
          return function(a, b, c, d, e, f, g, h, i) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        case 10:
          return function(a, b, c, d, e, f, g, h, i, j) {
            return processInvocation(fn, concatArgs(args, arguments), totalArity);
          };
        default:
          return createEvalFn(fn, args, remainingArity);
      }
    };
    var concatArgs = function(args1, args2) {
      return args1.concat(toArray(args2));
    };
    var createEvalFn = function(fn, args, arity) {
      var argList = makeArgList(arity);
      var fnStr = "false||function(" + argList + "){ return processInvocation(fn, concatArgs(args, arguments)); }";
      return (0, eval)(fnStr);
    };
    var makeArgList = function(len) {
      var a = [];
      for (var i = 0; i < len; i += 1)
        a.push("a" + i.toString());
      return a.join(",");
    };
    var trimArrLength = function(arr, length) {
      if (arr.length > length)
        return arr.slice(0, length);
      else
        return arr;
    };
    var processInvocation = function(fn, argsArr, totalArity) {
      argsArr = trimArrLength(argsArr, totalArity);
      if (argsArr.length === totalArity)
        return fn.apply(null, argsArr);
      return createFn(fn, argsArr, totalArity);
    };
    var curry = function(fn) {
      return createFn(fn, [], fn.length);
    };
    curry.to = curry(function(arity, fn) {
      return createFn(fn, [], arity);
    });
    curry.adaptTo = curry(function(num, fn) {
      return curry.to(num, function(context) {
        var args = tail(arguments).concat(context);
        return fn.apply(this, args);
      });
    });
    curry.adapt = function(fn) {
      return curry.adaptTo(fn.length, fn);
    };
    var curry_1 = curry;
    function id(x) {
      return x[0];
    }
    function grammar() {
      const lexer = this.lexer;
      const Syntax2 = this.Syntax;
      const {
        extendNode: extendNode2,
        drop: drop2,
        nth: nth2,
        nuller: nuller2,
        nonEmpty: nonEmpty2,
        add: add2,
        flatten: flatten2,
        compose: compose2
      } = this.helpers;
      const {
        node,
        binary,
        constant,
        identifier,
        statement,
        unary: unary2,
        ternary,
        subscript,
        access,
        fun,
        declaration,
        call,
        struct,
        result,
        string,
        char,
        typedef,
        voidFun,
        type,
        arrayType,
        assignment,
        forLoop,
        whileLoop,
        typeGeneric,
        spread,
        builtinDecl,
        assignmentExpr,
        addressOf
      } = this.nodes(lexer);
      return {
        Lexer: lexer,
        ParserRules: [{ "name": "_$ebnf$1", "symbols": [] }, { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function(d) {
          return d[0].concat([d[1]]);
        } }, { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {
          return null;
        } }, { "name": "__$ebnf$1", "symbols": ["wschar"] }, { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function(d) {
          return d[0].concat([d[1]]);
        } }, { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {
          return null;
        } }, { "name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id }, { "name": "Struct", "symbols": ["TYPE", "__", "Identifier", "_", "EQUALS", "_", "Union", "SEPARATOR"], "postprocess": struct }, { "name": "Struct", "symbols": ["TYPE", "__", "Identifier", "_", "EQUALS", "_", "NativeType", "SEPARATOR"], "postprocess": struct }, { "name": "Union", "symbols": ["StructDefinition"], "postprocess": id }, { "name": "Union", "symbols": ["StructDefinition", "_", "OR", "_", "Union"], "postprocess": node(Syntax2.UnionType) }, { "name": "StructDefinition", "symbols": ["ArrayType"], "postprocess": id }, { "name": "StructDefinition", "symbols": ["Identifier"], "postprocess": id }, { "name": "StructDefinition", "symbols": ["LCB", "_", "StructBody", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral), flatten2) }, { "name": "StructBody", "symbols": ["StructNameAndType"], "postprocess": id }, { "name": "StructBody", "symbols": ["StructNameAndType", "_", "COMMA", "_", "StructBody"], "postprocess": flatten2 }, { "name": "StructNameAndType", "symbols": ["Identifier", "_", "COLON", "_", "Type"], "postprocess": node(Syntax2.Pair) }, { "name": "StructNameAndType", "symbols": ["AddressOf", "_", "COLON", "_", "Type"], "postprocess": node(Syntax2.Pair) }, { "name": "AddressOf", "symbols": ["AND", "Identifier"], "postprocess": addressOf }, { "name": "TypeDef", "symbols": ["TYPE", "__", "Identifier", "_", "EQUALS", "_", "TypeDefinition", "_", "FATARROW", "_", "Type", "_", "SEPARATOR"], "postprocess": compose2(typedef) }, { "name": "TypeDefinition", "symbols": ["LB", "_", "TypeList", "_", "RB"], "postprocess": flatten2 }, { "name": "TypeDefinition", "symbols": ["LB", "_", "RB"], "postprocess": flatten2 }, { "name": "TypeList", "symbols": ["Type"], "postprocess": id }, { "name": "TypeList", "symbols": ["Type", "_", "COMMA", "_", "TypeList"], "postprocess": flatten2 }, { "name": "_Type", "symbols": ["NativeType"], "postprocess": id }, { "name": "_Type", "symbols": ["GenericType"], "postprocess": id }, { "name": "_Type", "symbols": ["Identifier"], "postprocess": id }, { "name": "ArrayType", "symbols": ["_Type", "_", "LSB", "_", "RSB"], "postprocess": arrayType }, { "name": "Type", "symbols": ["_Type"], "postprocess": id }, { "name": "Type", "symbols": ["ArrayType"], "postprocess": id }, { "name": "GenericType", "symbols": ["Identifier", "LT", "_", "StaticObjectLiteral", "_", "GT"], "postprocess": typeGeneric }, { "name": "StaticObjectLiteral", "symbols": ["LCB", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral)) }, { "name": "StaticObjectLiteral", "symbols": ["LCB", "_", "StaticPropertyList", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral), flatten2) }, { "name": "StaticPropertyValue", "symbols": ["Number"], "postprocess": id }, { "name": "StaticPropertyValue", "symbols": ["Boolean"], "postprocess": id }, { "name": "StaticPropertyValue", "symbols": ["StringLiteral"], "postprocess": id }, { "name": "StaticProperty", "symbols": ["Identifier", "_", "COLON", "_", "StaticPropertyValue"], "postprocess": node(Syntax2.Pair) }, { "name": "StaticPropertyList", "symbols": ["StaticProperty"], "postprocess": id }, { "name": "StaticPropertyList", "symbols": ["StaticProperty", "_", "COMMA", "_", "StaticPropertyList"], "postprocess": flatten2 }, { "name": "ObjectLiteral", "symbols": ["LCB", "_", "RCB"], "postprocess": node(Syntax2.ObjectLiteral) }, { "name": "ObjectLiteral", "symbols": ["LCB", "_", "PropertyList", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral), flatten2) }, { "name": "PropertyList", "symbols": ["Property"], "postprocess": id }, { "name": "PropertyList", "symbols": ["Property", "_", "COMMA", "_", "PropertyList"], "postprocess": flatten2 }, { "name": "Property", "symbols": ["Identifier", "_", "COLON", "_", "Ternary"], "postprocess": node(Syntax2.Pair) }, { "name": "Property", "symbols": ["SPREAD", "Identifier"], "postprocess": spread }, { "name": "Property", "symbols": ["Identifier"], "postprocess": id }, { "name": "Import", "symbols": ["IMPORT", "_", "ImportDefinition", "__", "FROM", "__", "StringLiteral", "_", "SEPARATOR"], "postprocess": node(Syntax2.Import) }, { "name": "ImportDefinition", "symbols": ["LCB", "_", "ImportAndTypeList", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral), flatten2) }, { "name": "ImportAndTypeList", "symbols": ["ImportName"], "postprocess": id }, { "name": "ImportAndTypeList", "symbols": ["ImportAndType"], "postprocess": id }, { "name": "ImportAndTypeList", "symbols": ["ImportName", "_", "COMMA", "_", "ImportAndTypeList"], "postprocess": flatten2 }, { "name": "ImportAndTypeList", "symbols": ["ImportAndType", "_", "COMMA", "_", "ImportAndTypeList"], "postprocess": flatten2 }, { "name": "ImportAndType", "symbols": ["ImportName", "_", "COLON", "_", "Type"], "postprocess": node(Syntax2.Pair) }, { "name": "ImportAndType", "symbols": ["ImportName", "_", "AS", "_", "Identifier"], "postprocess": node(Syntax2.BinaryExpression, { value: "as" }) }, { "name": "ImportAndType", "symbols": ["ImportAndType", "_", "AS", "_", "Identifier"], "postprocess": node(Syntax2.BinaryExpression, { value: "as" }) }, { "name": "ImportName", "symbols": ["Identifier"], "postprocess": id }, { "name": "If", "symbols": ["IF", "_", "LB", "_", "Expression", "_", "RB", "_", "BranchBody"], "postprocess": node(Syntax2.IfThenElse) }, { "name": "If", "symbols": ["IF", "_", "LB", "_", "Expression", "_", "RB", "_", "BranchBody", "_", "Else"], "postprocess": node(Syntax2.IfThenElse) }, { "name": "Else", "symbols": ["ELSE", "_", "BranchBody"], "postprocess": node(Syntax2.Else) }, { "name": "BranchBody", "symbols": ["Statement"], "postprocess": id }, { "name": "BranchBody", "symbols": ["Block"], "postprocess": id }, { "name": "For", "symbols": ["FOR", "_", "LB", "_", "ForArg", "_", "SEPARATOR", "_", "Expression", "_", "SEPARATOR", "_", "ForArg", "_", "RB", "_", "BranchBody"], "postprocess": forLoop }, { "name": "ForArg", "symbols": ["_Assignment"], "postprocess": id }, { "name": "ForArg", "symbols": ["Ternary"], "postprocess": id }, { "name": "While", "symbols": ["WHILE", "_", "LB", "_", "Expression", "_", "RB", "_", "BranchBody"], "postprocess": whileLoop }, { "name": "Break", "symbols": ["BREAK", "_", "SEPARATOR"], "postprocess": node(Syntax2.Break) }, { "name": "Program", "symbols": ["_"], "postprocess": compose2(node("Program", { value: "ROOT_NODE" }), flatten2) }, { "name": "Program", "symbols": ["_", "SourceElementList", "_"], "postprocess": compose2(node("Program", { value: "ROOT_NODE" }), flatten2) }, { "name": "SourceElementList", "symbols": ["SourceElement"], "postprocess": flatten2 }, { "name": "SourceElementList", "symbols": ["SourceElement", "_", "SourceElementList"], "postprocess": compose2(drop2, flatten2, flatten2) }, { "name": "SourceElement", "symbols": ["Function"], "postprocess": id }, { "name": "SourceElement", "symbols": ["GlobalDeclaration"], "postprocess": id }, { "name": "SourceElement", "symbols": ["GlobalImmutableDeclaration"], "postprocess": id }, { "name": "SourceElement", "symbols": ["StaticDeclaration"], "postprocess": id }, { "name": "SourceElement", "symbols": ["Struct"], "postprocess": id }, { "name": "SourceElement", "symbols": ["TypeDef"], "postprocess": id }, { "name": "SourceElement", "symbols": ["Export"], "postprocess": id }, { "name": "SourceElement", "symbols": ["Import"], "postprocess": id }, { "name": "Statement", "symbols": ["ExpressionStatement"], "postprocess": id }, { "name": "Statement", "symbols": ["Declaration"], "postprocess": id }, { "name": "Statement", "symbols": ["ImmutableDeclaration"], "postprocess": id }, { "name": "Statement", "symbols": ["Assignment"], "postprocess": id }, { "name": "Statement", "symbols": ["If"], "postprocess": id }, { "name": "Statement", "symbols": ["For"], "postprocess": id }, { "name": "Statement", "symbols": ["While"], "postprocess": id }, { "name": "Statement", "symbols": ["Break"], "postprocess": id }, { "name": "Statement", "symbols": ["Unreachable"], "postprocess": id }, { "name": "Statement", "symbols": ["ReturnStatement"], "postprocess": id }, { "name": "Block", "symbols": ["LCB", "_", "RCB"], "postprocess": node(Syntax2.Block) }, { "name": "Block", "symbols": ["LCB", "_", "StatementList", "_", "RCB"], "postprocess": compose2(node(Syntax2.Block), flatten2) }, { "name": "StatementList", "symbols": ["Statement"], "postprocess": drop2 }, { "name": "StatementList", "symbols": ["Statement", "_", "StatementList"], "postprocess": flatten2 }, { "name": "Function", "symbols": ["FUNCTION", "__", "Identifier", "_", "FunctionParameters", "_", "Block"], "postprocess": voidFun }, { "name": "Function", "symbols": ["FUNCTION", "__", "Identifier", "_", "FunctionParameters", "_", "FunctionResult", "_", "Block"], "postprocess": fun }, { "name": "FunctionParameters", "symbols": ["LB", "_", "RB"], "postprocess": node(Syntax2.FunctionArguments) }, { "name": "FunctionParameters", "symbols": ["LB", "_", "ParameterList", "_", "RB"], "postprocess": compose2(node(Syntax2.FunctionArguments), flatten2, flatten2) }, { "name": "ParameterList", "symbols": ["NameAndType"], "postprocess": id }, { "name": "ParameterList", "symbols": ["NameAndType", "_", "COMMA", "_", "ParameterList"], "postprocess": flatten2 }, { "name": "NameAndType", "symbols": ["Identifier", "_", "COLON", "_", "DeclType"], "postprocess": node(Syntax2.Pair) }, { "name": "DeclType", "symbols": ["Type"], "postprocess": compose2(extendNode2({ Type: Syntax2.DeclType }), nth2(0)) }, { "name": "FunctionResult", "symbols": ["COLON", "_", "Type"], "postprocess": compose2(result, drop2) }, { "name": "GlobalDeclaration", "symbols": ["LET", "_", "NameAndType", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.Declaration) }, { "name": "GlobalDeclaration", "symbols": ["LET", "_", "NameAndType", "_", "EQUALS", "_", "Atom", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.Declaration) }, { "name": "GlobalImmutableDeclaration", "symbols": ["CONST", "_", "Identifier", "_", "COLON", "_", "GenericType", "_", "SEPARATOR"], "postprocess": builtinDecl }, { "name": "GlobalImmutableDeclaration", "symbols": ["CONST", "_", "NameAndType", "_", "EQUALS", "_", "ObjectLiteral", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.ImmutableDeclaration) }, { "name": "GlobalImmutableDeclaration", "symbols": ["CONST", "_", "NameAndType", "_", "EQUALS", "_", "Atom", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.ImmutableDeclaration) }, { "name": "Declaration", "symbols": ["LET", "_", "NameAndType", "_", "EQUALS", "_", "Expression", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.Declaration) }, { "name": "Declaration", "symbols": ["LET", "_", "NameAndType", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.Declaration) }, { "name": "ImmutableDeclaration", "symbols": ["CONST", "_", "NameAndType", "_", "EQUALS", "_", "Expression", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.ImmutableDeclaration) }, { "name": "ImmutableDeclaration", "symbols": ["CONST", "_", "NameAndType", "_", "EQUALS", "_", "ObjectLiteral", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.ImmutableDeclaration) }, { "name": "ImmutableDeclaration", "symbols": ["CONST", "_", "Identifier", "_", "COLON", "_", "GenericType", "_", "SEPARATOR"], "postprocess": builtinDecl }, { "name": "StaticNameAndType", "symbols": ["Identifier", "_", "COLON", "_", "ArrayType"], "postprocess": node(Syntax2.Pair) }, { "name": "StaticDeclaration", "symbols": ["CONST", "_", "StaticNameAndType", "_", "EQUALS", "_", "LSB", "_", "RSB", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.StaticDeclaration) }, { "name": "StaticDeclaration", "symbols": ["CONST", "_", "StaticNameAndType", "_", "EQUALS", "_", "LSB", "_", "StaticValueList", "_", "RSB", "_", "SEPARATOR"], "postprocess": compose2(declaration(Syntax2.StaticDeclaration), flatten2) }, { "name": "StaticValueList", "symbols": ["Atom"], "postprocess": id }, { "name": "StaticValueList", "symbols": ["Atom", "_", "COMMA", "_", "StaticValueList"], "postprocess": flatten2 }, { "name": "Unreachable", "symbols": ["THROW", "_", "SEPARATOR"], "postprocess": node(Syntax2.Unreachable) }, { "name": "Unreachable", "symbols": ["THROW", "_", "Expression", "_", "SEPARATOR"], "postprocess": node(Syntax2.Unreachable) }, { "name": "Pair", "symbols": ["Identifier", "_", "COLON", "_", "Identifier"], "postprocess": node(Syntax2.Pair) }, { "name": "Export", "symbols": ["EXPORT", "__", "ImmutableDeclaration"], "postprocess": node(Syntax2.Export, { value: "export" }) }, { "name": "Export", "symbols": ["EXPORT", "__", "Function"], "postprocess": node(Syntax2.Export, { value: "export" }) }, { "name": "Export", "symbols": ["EXPORT", "__", "TypeDef"], "postprocess": node(Syntax2.Export, { value: "export" }) }, { "name": "Export", "symbols": ["EXPORT", "__", "Struct"], "postprocess": node(Syntax2.Export, { value: "export" }) }, { "name": "ReturnStatement", "symbols": ["RETURN", "__", "Expression", "_", "SEPARATOR"], "postprocess": node(Syntax2.ReturnStatement) }, { "name": "ReturnStatement$subexpression$1", "symbols": [{ "literal": ";" }], "postprocess": nuller2 }, { "name": "ReturnStatement", "symbols": ["RETURN", "ReturnStatement$subexpression$1"], "postprocess": node(Syntax2.ReturnStatement) }, { "name": "Assignment", "symbols": ["_Assignment", "_", "SEPARATOR"], "postprocess": id }, { "name": "_Assignment", "symbols": ["Subscript", "_", "EQUALS", "_", "Expression"], "postprocess": (d) => assignment(d, "=") }, { "name": "_Assignment", "symbols": ["Subscript", "_", "PLSEQUALS", "_", "Expression"], "postprocess": (d) => assignment(d, "+=") }, { "name": "_Assignment", "symbols": ["Subscript", "_", "MINEQUALS", "_", "Expression"], "postprocess": (d) => assignment(d, "-=") }, { "name": "_Assignment", "symbols": ["Subscript", "_", "EQUALS", "_", "ObjectLiteral"], "postprocess": (d) => assignment(d, "=") }, { "name": "ExpressionStatement", "symbols": ["Call", "_", "SEPARATOR"], "postprocess": id }, { "name": "Expression", "symbols": ["AssignmentExpression"], "postprocess": id }, { "name": "AssignmentExpression", "symbols": ["Identifier", "_", "EQUALS", "_", "Ternary"], "postprocess": (d) => assignmentExpr(d, "=") }, { "name": "AssignmentExpression", "symbols": ["Identifier", "_", "PLSEQUALS", "_", "Ternary"], "postprocess": (d) => assignmentExpr(d, "+=") }, { "name": "AssignmentExpression", "symbols": ["Identifier", "_", "MINEQUALS", "_", "Ternary"], "postprocess": (d) => assignmentExpr(d, "-=") }, { "name": "AssignmentExpression", "symbols": ["Ternary"], "postprocess": id }, { "name": "Ternary", "symbols": ["Ternary", "_", "QUESTION", "_", "TernaryPair"], "postprocess": ternary }, { "name": "Ternary", "symbols": ["Binary"], "postprocess": id }, { "name": "TernaryPair", "symbols": ["Expression", "_", "COLON", "_", "Expression"], "postprocess": node(Syntax2.Pair) }, { "name": "Binary", "symbols": ["Logical"], "postprocess": id }, { "name": "Logical", "symbols": ["Logical", "_", { "literal": "||" }, "_", "Bitwise"], "postprocess": binary }, { "name": "Logical", "symbols": ["Logical", "_", { "literal": "&&" }, "_", "Bitwise"], "postprocess": binary }, { "name": "Logical", "symbols": ["Bitwise"], "postprocess": id }, { "name": "Bitwise", "symbols": ["Bitwise", "_", { "literal": "|" }, "_", "Sum"], "postprocess": binary }, { "name": "Bitwise", "symbols": ["Bitwise", "_", { "literal": "^" }, "_", "Sum"], "postprocess": binary }, { "name": "Bitwise", "symbols": ["Bitwise", "_", { "literal": "&" }, "_", "Sum"], "postprocess": binary }, { "name": "Bitwise", "symbols": ["Equality"], "postprocess": id }, { "name": "Equality", "symbols": ["Equality", "_", { "literal": "==" }, "_", "Comparison"], "postprocess": binary }, { "name": "Equality", "symbols": ["Equality", "_", { "literal": "!=" }, "_", "Comparison"], "postprocess": binary }, { "name": "Equality", "symbols": ["Comparison"], "postprocess": id }, { "name": "Comparison", "symbols": ["Comparison", "_", { "literal": "<" }, "_", "Shift"], "postprocess": binary }, { "name": "Comparison", "symbols": ["Comparison", "_", { "literal": ">" }, "_", "Shift"], "postprocess": binary }, { "name": "Comparison", "symbols": ["Comparison", "_", { "literal": "<=" }, "_", "Shift"], "postprocess": binary }, { "name": "Comparison", "symbols": ["Comparison", "_", { "literal": ">=" }, "_", "Shift"], "postprocess": binary }, { "name": "Comparison", "symbols": ["Shift"], "postprocess": id }, { "name": "Shift", "symbols": ["Shift", "_", { "literal": ">>" }, "_", "Sum"], "postprocess": binary }, { "name": "Shift", "symbols": ["Shift", "_", { "literal": "<<" }, "_", "Sum"], "postprocess": binary }, { "name": "Shift", "symbols": ["Shift", "_", { "literal": ">>>" }, "_", "Sum"], "postprocess": binary }, { "name": "Shift", "symbols": ["Sum"], "postprocess": id }, { "name": "Sum", "symbols": ["Sum", "_", { "literal": "+" }, "_", "Product"], "postprocess": binary }, { "name": "Sum", "symbols": ["Sum", "_", { "literal": "-" }, "_", "Product"], "postprocess": binary }, { "name": "Sum", "symbols": ["Product"], "postprocess": id }, { "name": "Product", "symbols": ["Product", "_", { "literal": "*" }, "_", "Typecast"], "postprocess": binary }, { "name": "Product", "symbols": ["Product", "_", { "literal": "/" }, "_", "Typecast"], "postprocess": binary }, { "name": "Product", "symbols": ["Product", "_", { "literal": "%" }, "_", "Typecast"], "postprocess": binary }, { "name": "Product", "symbols": ["Typecast"], "postprocess": id }, { "name": "Typecast", "symbols": ["Expression", "_", "COLON", "_", "DeclType"], "postprocess": node(Syntax2.Pair) }, { "name": "Typecast", "symbols": ["Expression", "_", "AS", "_", "DeclType"], "postprocess": node(Syntax2.Pair) }, { "name": "Typecast", "symbols": ["Unary"], "postprocess": id }, { "name": "Unary", "symbols": [{ "literal": "!" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "~" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "-" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "+" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "++" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "--" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": ["Call"], "postprocess": id }, { "name": "Call", "symbols": ["Subscript", "_", "LB", "_", "ArgumentList", "_", "RB"], "postprocess": compose2(call, flatten2) }, { "name": "Call", "symbols": ["Subscript", "_", "LB", "_", "RB"], "postprocess": call }, { "name": "Call", "symbols": ["Subscript"], "postprocess": id }, { "name": "ArgumentList", "symbols": ["Expression"], "postprocess": id }, { "name": "ArgumentList", "symbols": ["NativeType"], "postprocess": id }, { "name": "ArgumentList", "symbols": ["Expression", "_", "COMMA", "_", "ArgumentList"], "postprocess": flatten2 }, { "name": "Subscript", "symbols": ["Access", "LSB", "_", "Expression", "_", "RSB", "Subscript"], "postprocess": subscript }, { "name": "Subscript", "symbols": ["Access", "LSB", "_", "Expression", "_", "RSB"], "postprocess": subscript }, { "name": "Subscript", "symbols": ["Access"], "postprocess": id }, { "name": "Access", "symbols": ["Access", "DOT", "Identifier"], "postprocess": compose2(access, drop2) }, { "name": "Access", "symbols": ["NativeType", "DOT", "Access"], "postprocess": compose2(access, drop2) }, { "name": "Access", "symbols": ["Grouping"], "postprocess": id }, { "name": "Grouping", "symbols": ["LB", "_", "Expression", "_", "RB"], "postprocess": nth2(2) }, { "name": "Grouping", "symbols": ["Atom"], "postprocess": id }, { "name": "Atom", "symbols": ["Identifier"], "postprocess": id }, { "name": "Atom", "symbols": ["StringLiteral"], "postprocess": id }, { "name": "Atom", "symbols": ["CharacterLiteral"], "postprocess": id }, { "name": "Atom", "symbols": ["Number"], "postprocess": id }, { "name": "NativeType", "symbols": [lexer.has("type") ? { type: "type" } : type], "postprocess": type }, { "name": "Identifier", "symbols": [lexer.has("identifier") ? { type: "identifier" } : identifier], "postprocess": identifier }, { "name": "Number", "symbols": [lexer.has("number") ? { type: "number" } : number], "postprocess": constant }, { "name": "StringLiteral", "symbols": [lexer.has("string") ? { type: "string" } : string], "postprocess": string }, { "name": "CharacterLiteral", "symbols": [lexer.has("char") ? { type: "char" } : char], "postprocess": char }, { "name": "word", "symbols": [/[a-zA-Z_]/], "postprocess": id }, { "name": "word", "symbols": ["word", /[a-zA-Z0-9_]/], "postprocess": add2 }, { "name": "digit", "symbols": [/[0-9]/], "postprocess": id }, { "name": "digit", "symbols": ["digit", /[0-9]/], "postprocess": add2 }, { "name": "SEPARATOR", "symbols": ["_", { "literal": ";" }], "postprocess": nuller2 }, { "name": "QUESTION", "symbols": [{ "literal": "?" }], "postprocess": nuller2 }, { "name": "COMMA", "symbols": [{ "literal": "," }], "postprocess": nuller2 }, { "name": "AND", "symbols": [{ "literal": "&" }], "postprocess": nuller2 }, { "name": "DOT", "symbols": [{ "literal": "." }], "postprocess": nuller2 }, { "name": "LB", "symbols": [{ "literal": "(" }], "postprocess": nuller2 }, { "name": "RB", "symbols": [{ "literal": ")" }], "postprocess": nuller2 }, { "name": "LSB", "symbols": [{ "literal": "[" }], "postprocess": nuller2 }, { "name": "RSB", "symbols": [{ "literal": "]" }], "postprocess": nuller2 }, { "name": "LCB", "symbols": [{ "literal": "{" }], "postprocess": nuller2 }, { "name": "RCB", "symbols": [{ "literal": "}" }], "postprocess": nuller2 }, { "name": "OR", "symbols": [{ "literal": "|" }], "postprocess": nuller2 }, { "name": "COLON", "symbols": [{ "literal": ":" }], "postprocess": nuller2 }, { "name": "EQUALS", "symbols": [{ "literal": "=" }], "postprocess": nuller2 }, { "name": "PLSEQUALS", "symbols": [{ "literal": "+=" }], "postprocess": nuller2 }, { "name": "MINEQUALS", "symbols": [{ "literal": "-=" }], "postprocess": nuller2 }, { "name": "GT", "symbols": [{ "literal": ">" }], "postprocess": nuller2 }, { "name": "LT", "symbols": [{ "literal": "<" }], "postprocess": nuller2 }, { "name": "FATARROW", "symbols": [{ "literal": "=>" }], "postprocess": nuller2 }, { "name": "SPREAD", "symbols": [{ "literal": "..." }], "postprocess": nuller2 }, { "name": "FUNCTION", "symbols": [{ "literal": "function" }], "postprocess": nuller2 }, { "name": "LET", "symbols": [{ "literal": "let" }], "postprocess": nuller2 }, { "name": "CONST", "symbols": [{ "literal": "const" }], "postprocess": nuller2 }, { "name": "EXPORT", "symbols": [{ "literal": "export" }], "postprocess": nuller2 }, { "name": "IMPORT", "symbols": [{ "literal": "import" }], "postprocess": nuller2 }, { "name": "AS", "symbols": [{ "literal": "as" }], "postprocess": nuller2 }, { "name": "FROM", "symbols": [{ "literal": "from" }], "postprocess": nuller2 }, { "name": "RETURN", "symbols": [{ "literal": "return" }], "postprocess": nuller2 }, { "name": "TYPE", "symbols": [{ "literal": "type" }], "postprocess": nuller2 }, { "name": "IF", "symbols": [{ "literal": "if" }], "postprocess": nuller2 }, { "name": "ELSE", "symbols": [{ "literal": "else" }], "postprocess": nuller2 }, { "name": "FOR", "symbols": [{ "literal": "for" }], "postprocess": nuller2 }, { "name": "WHILE", "symbols": [{ "literal": "while" }], "postprocess": nuller2 }, { "name": "SWITCH", "symbols": [{ "literal": "switch" }], "postprocess": nuller2 }, { "name": "DO", "symbols": [{ "literal": "do" }], "postprocess": nuller2 }, { "name": "THROW", "symbols": [{ "literal": "throw" }], "postprocess": nuller2 }, { "name": "BREAK", "symbols": [{ "literal": "break" }], "postprocess": nuller2 }],
        ParserStart: "Program"
      };
    }
    function id$1(x) {
      return x[0];
    }
    function grammar$1() {
      const Syntax2 = this.Syntax;
      const { flatten: flatten2 } = this.helpers;
      const { node } = this.nodes(this.lexer);
      return {
        Lexer: void 0,
        ParserRules: [{ "name": "TypeList", "symbols": ["DefaultArgument"], "postprocess": id$1 }, { "name": "TypeList", "symbols": ["DefaultArgument", "_", "COMMA", "_", "TypeList"], "postprocess": flatten2 }, { "name": "DefaultArgument", "symbols": ["Type", "_", "EQUALS", "_", "Atom"], "postprocess": node(Syntax2.Assignment) }, { "name": "ParameterList", "symbols": ["DefaultFunctionArgument"], "postprocess": id$1 }, { "name": "ParameterList", "symbols": ["DefaultFunctionArgument", "_", "COMMA", "_", "ParameterList"], "postprocess": flatten2 }, { "name": "DefaultFunctionArgument", "symbols": ["NameAndType", "_", "EQUALS", "_", "Atom"], "postprocess": node(Syntax2.Assignment) }],
        ParserStart: "TypeList"
      };
    }
    var nearley = createCommonjsModule(function(module) {
      (function(root, factory2) {
        if (module.exports) {
          module.exports = factory2();
        } else {
          root.nearley = factory2();
        }
      })(commonjsGlobal, function() {
        function Rule(name, symbols, postprocess) {
          this.id = ++Rule.highestId;
          this.name = name;
          this.symbols = symbols;
          this.postprocess = postprocess;
          return this;
        }
        Rule.highestId = 0;
        Rule.prototype.toString = function(withCursorAt) {
          function stringifySymbolSequence(e) {
            return e.literal ? JSON.stringify(e.literal) : e.type ? "%" + e.type : e.toString();
          }
          var symbolSequence = typeof withCursorAt === "undefined" ? this.symbols.map(stringifySymbolSequence).join(" ") : this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(" ") + " \u25CF " + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(" ");
          return this.name + " \u2192 " + symbolSequence;
        };
        function State(rule, dot, reference, wantedBy) {
          this.rule = rule;
          this.dot = dot;
          this.reference = reference;
          this.data = [];
          this.wantedBy = wantedBy;
          this.isComplete = this.dot === rule.symbols.length;
        }
        State.prototype.toString = function() {
          return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
        };
        State.prototype.nextState = function(child) {
          var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
          state.left = this;
          state.right = child;
          if (state.isComplete) {
            state.data = state.build();
          }
          return state;
        };
        State.prototype.build = function() {
          var children = [];
          var node = this;
          do {
            children.push(node.right.data);
            node = node.left;
          } while (node.left);
          children.reverse();
          return children;
        };
        State.prototype.finish = function() {
          if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
          }
        };
        function Column(grammar2, index2) {
          this.grammar = grammar2;
          this.index = index2;
          this.states = [];
          this.wants = {};
          this.scannable = [];
          this.completed = {};
        }
        Column.prototype.process = function(nextColumn) {
          var states = this.states;
          var wants = this.wants;
          var completed = this.completed;
          for (var w = 0; w < states.length; w++) {
            var state = states[w];
            if (state.isComplete) {
              state.finish();
              if (state.data !== Parser.fail) {
                var wantedBy = state.wantedBy;
                for (var i = wantedBy.length; i--; ) {
                  var left = wantedBy[i];
                  this.complete(left, state);
                }
                if (state.reference === this.index) {
                  var exp = state.rule.name;
                  (this.completed[exp] = this.completed[exp] || []).push(state);
                }
              }
            } else {
              var exp = state.rule.symbols[state.dot];
              if (typeof exp !== "string") {
                this.scannable.push(state);
                continue;
              }
              if (wants[exp]) {
                wants[exp].push(state);
                if (completed.hasOwnProperty(exp)) {
                  var nulls = completed[exp];
                  for (var i = 0; i < nulls.length; i++) {
                    var right = nulls[i];
                    this.complete(state, right);
                  }
                }
              } else {
                wants[exp] = [state];
                this.predict(exp);
              }
            }
          }
        };
        Column.prototype.predict = function(exp) {
          var rules = this.grammar.byName[exp] || [];
          for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
          }
        };
        Column.prototype.complete = function(left, right) {
          var copy = left.nextState(right);
          this.states.push(copy);
        };
        function Grammar(rules, start) {
          this.rules = rules;
          this.start = start || this.rules[0].name;
          var byName = this.byName = {};
          this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
              byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
          });
        }
        Grammar.fromCompiled = function(rules, start) {
          var lexer = rules.Lexer;
          if (rules.ParserStart) {
            start = rules.ParserStart;
            rules = rules.ParserRules;
          }
          var rules = rules.map(function(r) {
            return new Rule(r.name, r.symbols, r.postprocess);
          });
          var g = new Grammar(rules, start);
          g.lexer = lexer;
          return g;
        };
        function StreamLexer() {
          this.reset("");
        }
        StreamLexer.prototype.reset = function(data, state) {
          this.buffer = data;
          this.index = 0;
          this.line = state ? state.line : 1;
          this.lastLineBreak = state ? -state.col : 0;
        };
        StreamLexer.prototype.next = function() {
          if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === "\n") {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return { value: ch };
          }
        };
        StreamLexer.prototype.save = function() {
          return {
            line: this.line,
            col: this.index - this.lastLineBreak
          };
        };
        StreamLexer.prototype.formatError = function(token, message) {
          var buffer = this.buffer;
          if (typeof buffer === "string") {
            var nextLineBreak = buffer.indexOf("\n", this.index);
            if (nextLineBreak === -1)
              nextLineBreak = buffer.length;
            var line = buffer.substring(this.lastLineBreak, nextLineBreak);
            var col = this.index - this.lastLineBreak;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += "  " + line + "\n";
            message += "  " + Array(col).join(" ") + "^";
            return message;
          } else {
            return message + " at index " + (this.index - 1);
          }
        };
        function Parser(rules, start, options) {
          if (rules instanceof Grammar) {
            var grammar2 = rules;
            var options = start;
          } else {
            var grammar2 = Grammar.fromCompiled(rules, start);
          }
          this.grammar = grammar2;
          this.options = {
            keepHistory: false,
            lexer: grammar2.lexer || new StreamLexer()
          };
          for (var key in options || {}) {
            this.options[key] = options[key];
          }
          this.lexer = this.options.lexer;
          this.lexerState = void 0;
          var column = new Column(grammar2, 0);
          this.table = [column];
          column.wants[grammar2.start] = [];
          column.predict(grammar2.start);
          column.process();
          this.current = 0;
        }
        Parser.fail = {};
        Parser.prototype.feed = function(chunk) {
          var lexer = this.lexer;
          lexer.reset(chunk, this.lexerState);
          var token;
          while (token = lexer.next()) {
            var column = this.table[this.current];
            if (!this.options.keepHistory) {
              delete this.table[this.current - 1];
            }
            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);
            var literal = token.text !== void 0 ? token.text : token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
              var state = scannable[w];
              var expect = state.rule.symbols[state.dot];
              if (expect.test ? expect.test(value) : expect.type ? expect.type === token.type : expect.literal === literal) {
                var next = state.nextState({ data: value, token, isToken: true, reference: n - 1 });
                nextColumn.states.push(next);
              }
            }
            nextColumn.process();
            if (nextColumn.states.length === 0) {
              var message = this.lexer.formatError(token, "invalid syntax") + "\n";
              message += "Unexpected " + (token.type ? token.type + " token: " : "");
              message += JSON.stringify(token.value !== void 0 ? token.value : token) + "\n";
              var err = new Error(message);
              err.offset = this.current;
              err.token = token;
              throw err;
            }
            if (this.options.keepHistory) {
              column.lexerState = lexer.save();
            }
            this.current++;
          }
          if (column) {
            this.lexerState = lexer.save();
          }
          this.results = this.finish();
          return this;
        };
        Parser.prototype.save = function() {
          var column = this.table[this.current];
          column.lexerState = this.lexerState;
          return column;
        };
        Parser.prototype.restore = function(column) {
          var index2 = column.index;
          this.current = index2;
          this.table[index2] = column;
          this.table.splice(index2 + 1);
          this.lexerState = column.lexerState;
          this.results = this.finish();
        };
        Parser.prototype.rewind = function(index2) {
          if (!this.options.keepHistory) {
            throw new Error("set option `keepHistory` to enable rewinding");
          }
          this.restore(this.table[index2]);
        };
        Parser.prototype.finish = function() {
          var considerations = [];
          var start = this.grammar.start;
          var column = this.table[this.table.length - 1];
          column.states.forEach(function(t) {
            if (t.rule.name === start && t.dot === t.rule.symbols.length && t.reference === 0 && t.data !== Parser.fail) {
              considerations.push(t);
            }
          });
          return considerations.map(function(c) {
            return c.data;
          });
        };
        return {
          Parser,
          Grammar,
          Rule
        };
      });
    });
    var nearley_1 = nearley.Parser;
    var nearley_2 = nearley.Grammar;
    var compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var objectWithoutProperties = function(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    };
    const extendNode = curry_1((_ref, node) => {
      let { meta } = _ref, options = objectWithoutProperties(_ref, ["meta"]);
      return _extends({}, node, {
        meta: _extends({}, node.meta, meta)
      }, options);
    });
    const nth = (n) => (d) => d[n];
    const nuller = () => null;
    const nonEmpty = (d) => {
      return Array.isArray(d) ? !!d.length : d != null;
    };
    const add = (d) => `${d[0]}${d[1]}`;
    const flatten = (d) => d.reduce((acc, v) => {
      if (Array.isArray(v)) {
        return acc.concat(v);
      }
      return acc.concat(v);
    }, []);
    const drop = (d) => {
      return d.filter(nonEmpty);
    };
    var helpers = {
      nth,
      nuller,
      nonEmpty,
      add,
      flatten,
      compose,
      drop,
      extendNode
    };
    const marker = (lexer) => {
      const { col, line } = lexer;
      if (!lexer.lines.length) {
        return { col, line, sourceLine: "" };
      }
      return {
        col,
        line,
        sourceLine: lexer.lines[lexer.line - 1]
      };
    };
    function factory(lexer) {
      const node = (Type, seed = {}) => (d) => {
        const params = d.filter(nonEmpty);
        const { value = "", meta = {} } = seed;
        const start = marker(lexer);
        const end = params[params.length - 1] && params[params.length - 1].range ? params[params.length - 1].range[1] : _extends({}, start, { col: start.col + value.length });
        return {
          value,
          type: null,
          Type,
          toString() {
          },
          meta,
          range: [start, end],
          params
        };
      };
      const binary = (d) => {
        const [lhs, operator, rhs] = d.filter(nonEmpty);
        let Type = Syntax.BinaryExpression;
        if (operator.value === "||" || operator.value === "&&") {
          Type = Syntax.Select;
        }
        return node(Type, { value: operator.value })([lhs, rhs]);
      };
      const result = (d) => {
        const [type] = drop(d);
        return extendNode({
          type: type != null && type.value !== "void" ? type.value : null
        }, node(Syntax.FunctionResult)(d));
      };
      return {
        node,
        binary,
        constant: (d) => {
          const value = d[0].value;
          return extendNode({
            value: `${value}`,
            type: value.toString().indexOf(".") !== -1 ? "f32" : "i32"
          }, node(Syntax.Constant)([]));
        },
        identifier: (d) => node("Identifier", { value: d.join("") })([]),
        unary: ([operator, target]) => {
          let params = [target];
          if (operator.value === "-") {
            params = [_extends({}, target, {
              value: "0",
              Type: Syntax.Constant,
              params: [],
              meta: {}
            }), target];
          }
          return extendNode({
            value: operator.value,
            params
          }, node(Syntax.UnaryExpression)([operator, target]));
        },
        ternary: (d) => {
          return extendNode({
            value: "?"
          }, node(Syntax.TernaryExpression)(d));
        },
        subscript: (d) => {
          const [id2, field] = d.filter(nonEmpty);
          return extendNode({
            value: id2.value,
            params: [id2, field]
          }, node(Syntax.ArraySubscript)([id2, field]));
        },
        access(d) {
          return extendNode({
            value: d[0].value + "." + d[1].value
          }, node(Syntax.Access)(d));
        },
        fun: (d) => {
          const [name, args, result2, block] = d.filter(nonEmpty);
          return _extends({}, name, {
            Type: Syntax.FunctionDeclaration,
            meta: [],
            params: [args, result2, block]
          });
        },
        declaration: (Type) => (d) => {
          const [pair, ...init] = drop(d);
          const [id2, type] = pair.params;
          return extendNode({
            value: id2.value,
            type: type.value
          }, node(Type)(init));
        },
        call: (d) => {
          let [id2, ...params] = drop(d);
          return extendNode({
            value: id2.value
          }, node(Syntax.FunctionCall)([id2, ...params]));
        },
        struct: (d) => {
          const [id2, ...params] = drop(d);
          return extendNode({
            value: id2.value
          }, node(Syntax.Struct)(params));
        },
        result,
        string: (d) => {
          return extendNode({
            value: d[0].value,
            type: "i32"
          }, node(Syntax.StringLiteral)([]));
        },
        char(d) {
          return extendNode({
            value: d[0].value,
            type: "i32"
          }, node(Syntax.CharacterLiteral)([]));
        },
        type(d) {
          return extendNode({
            value: d[0].value,
            type: d[0].value,
            params: []
          }, node(Syntax.Type)(d));
        },
        arrayType(d) {
          const p = drop(d);
          const type = p[0];
          return extendNode({
            value: type.value + "[]",
            type: type.type + "[]",
            params: []
          }, node(Syntax.ArrayType)(d));
        },
        typeGeneric(d) {
          const [id2, obj] = drop(d);
          return extendNode({
            value: id2.value,
            type: id2.value,
            params: [obj]
          }, node(Syntax.Type)(d));
        },
        typedef: (d) => {
          const [id2, args, res] = drop(d);
          return extendNode({
            value: id2.value,
            params: [node(Syntax.FunctionArguments)(args), extendNode({
              type: res.value
            }, node(Syntax.FunctionResult)([res]))],
            type: res.type
          }, node(Syntax.Typedef)([id2, args, result]));
        },
        voidFun: (d) => {
          const params = drop(d);
          const [name, args, block] = params;
          const result2 = extendNode({ type: null }, node(Syntax.FunctionResult)([]));
          return extendNode({
            value: name.value,
            params: [args, result2, block]
          }, node(Syntax.FunctionDeclaration)(params));
        },
        assignment(d, value) {
          if (["-=", "+="].includes(value)) {
            const operator = value[0];
            const [target, amount] = drop(d);
            const b = binary([target, { value: operator }, amount]);
            return node(Syntax.Assignment, {
              value: "="
            })([target, b]);
          }
          return node(Syntax.Assignment, { value })(d);
        },
        assignmentExpr(d, value) {
          if (["-=", "+="].includes(value)) {
            const operator = value[0];
            const [target, amount] = drop(d);
            const b = binary([target, { value: operator }, amount]);
            return node(Syntax.AssignmentExpression, {
              value: "="
            })([target, b]);
          }
          return node(Syntax.AssignmentExpression, { value })(d);
        },
        forLoop(d) {
          const [initializer, condition, afterthought, ...body] = drop(d);
          return node(Syntax.Loop)([initializer, condition, ...body, afterthought]);
        },
        whileLoop(d) {
          const noop = node(Syntax.Noop)([]);
          return node(Syntax.Loop)([noop, ...d]);
        },
        spread(d) {
          return node(Syntax.Spread)(d);
        },
        builtinDecl(d) {
          const [id2, typeNode] = drop(d);
          return extendNode({
            value: id2.value,
            type: typeNode.value,
            params: [typeNode]
          }, node(Syntax.ImmutableDeclaration)(d));
        },
        addressOf(d) {
          const [id2] = drop(d);
          return extendNode({
            value: id2.value,
            params: []
          }, node("AddressOf")(d));
        }
      };
    }
    function makeLexer() {
      const mooLexer = moo.compile(waltSyntax_1);
      return {
        current: null,
        lines: [],
        get line() {
          return mooLexer.line;
        },
        get col() {
          return mooLexer.col;
        },
        save() {
          return mooLexer.save();
        },
        reset(chunk, info) {
          this.lines = chunk.split("\n");
          return mooLexer.reset(chunk, info);
        },
        next() {
          let token = mooLexer.next();
          while (token && token.type === "comment") {
            token = mooLexer.next();
          }
          this.current = token;
          return this.current;
        },
        formatError(token) {
          return mooLexer.formatError(token);
        },
        has(name) {
          return mooLexer.has(name);
        }
      };
    }
    var makeParser = curry_1(function(extraGrammar, source) {
      const grammarList = [grammar, grammar$1, ...extraGrammar];
      const context = {
        lexer: makeLexer(),
        nodes: factory,
        helpers,
        Syntax
      };
      const grammar$$1 = grammarList.slice(1).reduce((acc, value) => {
        const extra = value.call(context);
        return _extends({}, acc, {
          ParserRules: acc.ParserRules.concat(extra.ParserRules)
        });
      }, grammarList[0].call(context));
      const parser = new nearley_1(nearley_2.fromCompiled(grammar$$1));
      parser.feed(source);
      invariant_1(parser.results.length === 1, `PANIC - Ambiguous Syntax! Number of productions (${parser.results.length})`);
      return parser.results[0];
    });
    const combineMiddleware = (transforms) => {
      let transform;
      const chain = transforms.reduce((stack, go) => {
        return go((args) => {
          return stack(args, transform);
        });
      }, ([id2]) => id2);
      return (args, topLevelTranfrom) => {
        transform = topLevelTranfrom;
        return chain(args, transform);
      };
    };
    const combineParsers = (sortedParsers) => {
      const wildcards = [];
      const parsersByType = sortedParsers.reduce((acc, parser) => {
        Object.entries(parser).forEach(([type, cb]) => {
          if (type === "*") {
            wildcards.push(cb);
            return;
          }
          if (acc[type] == null) {
            acc[type] = [...wildcards];
          }
          acc[type].push(cb);
        });
        return acc;
      }, {});
      return Object.entries(parsersByType).reduce((acc, [key, transforms]) => {
        acc[key] = combineMiddleware(transforms);
        return acc;
      }, {});
    };
    const namespace$1 = Symbol("scope namespace");
    const signature$1 = Symbol("signature");
    function enter$1(scopes, scopeName) {
      return [...scopes, { [namespace$1]: scopeName, [signature$1]: { result: null, arguments: null } }];
    }
    function exit$1(scopes) {
      return scopes.slice(0, -1);
    }
    function current$1(scopes) {
      return scopes[scopes.length - 1];
    }
    function add$2(scopes, key, node) {
      const cur = current$1(scopes);
      if (cur) {
        cur[key] = node;
      }
      return cur;
    }
    function find$1(scopes, key) {
      const len = scopes.length;
      let i = len - 1;
      for (i; i >= 0; i--) {
        const ref = scopes[i][key];
        if (ref) {
          return ref;
        }
      }
      return null;
    }
    function index$1(scope2, key) {
      const pos = Object.keys(scope2).indexOf(key);
      return pos > -1 ? pos : Object.keys(scope2).length;
    }
    var scope$2 = {
      enter: enter$1,
      exit: exit$1,
      add: add$2,
      find: find$1,
      current: current$1,
      index: index$1,
      namespace: namespace$1,
      signature: signature$1
    };
    const {
      enter,
      exit,
      add: add$1,
      find,
      current,
      namespace,
      signature,
      index
    } = scope$2;
    var scope = {
      enter,
      exit,
      add: add$1,
      find,
      current,
      namespace,
      index,
      signature
    };
    var scope_1 = scope.enter;
    var scope_2 = scope.exit;
    var scope_3 = scope.current;
    var scope_4 = scope.find;
    var scope_5 = scope.add;
    var scope_6 = scope.index;
    var scope_7 = scope.namespace;
    var scope_8 = scope.signature;
    const FUNCTION_INDEX = "function/index";
    const LOCAL_INDEX = "LOCAL_INDEX";
    const GLOBAL_INDEX = "global/index";
    const TYPE_CONST = "type/const";
    const TYPE_INDEX = "TYPE_INDEX";
    const OBJECT_SIZE = "OBJECT_SIZE";
    const TYPE_CAST = "type/cast";
    const AST_METADATA = "AST_METADATA";
    const FUNCTION_METADATA = "FUNCTION_METADATA";
    const typeWeight = (typeString) => {
      switch (typeString) {
        case "i32":
        case "bool":
          return 0;
        case "i64":
          return 1;
        case "f32":
          return 2;
        case "f64":
          return 3;
        default:
          return -1;
      }
    };
    const balanceTypesInMathExpression = (expression) => {
      const type = expression.params.reduce((acc, { type: childType }) => {
        if (typeWeight(acc) < typeWeight(childType)) {
          return childType;
        }
        return acc;
      }, expression.type);
      const params = expression.params.map((paramNode) => {
        if (paramNode.type != null && typeWeight(paramNode.type) !== typeWeight(type)) {
          if (paramNode.Type === Syntax.Constant) {
            return extendNode({
              type
            }, paramNode);
          }
          return extendNode({
            type,
            value: paramNode.value,
            Type: Syntax.TypeCast,
            meta: {
              [TYPE_CAST]: { to: type, from: paramNode.type }
            },
            params: [paramNode]
          }, paramNode);
        }
        return paramNode;
      });
      return _extends({}, expression, {
        params,
        type
      });
    };
    function Core() {
      return {
        semantics() {
          const declaration = (next) => ([node, context]) => {
            const scope$$1 = scope_3(context.scopes);
            const index$$1 = scope_6(scope$$1, node.value);
            scope$$1[node.value] = extendNode({
              params: node.params.map(extendNode({ type: node.type })),
              meta: _extends({}, node.meta, {
                [scope$$1[scope_7]]: index$$1,
                [TYPE_CONST]: node.Type === Syntax.ImmutableDeclaration
              }),
              Type: Syntax.Declaration
            }, node);
            return next([scope$$1[node.value], context]);
          };
          return {
            [Syntax.Export]: (next) => ([node, context]) => {
              const parsed = next([node, context]);
              const [child] = parsed.params;
              context.exports[child.value] = child;
              return parsed;
            },
            [Syntax.Declaration]: declaration,
            [Syntax.ImmutableDeclaration]: declaration,
            // CharacterLiteral: next => ([node]) => next([mapCharacterLiteral(node)]),
            [Syntax.Select]: (_) => ([node, context], transform) => balanceTypesInMathExpression(_extends({}, node, {
              params: node.params.map((child) => transform([child, context]))
            })),
            [Syntax.BinaryExpression]: (_) => ([node, context], transform) => balanceTypesInMathExpression(_extends({}, node, {
              params: node.params.map((child) => transform([child, context]))
            })),
            [Syntax.Pair]: (_next) => (args, transform) => {
              const [typeCast, context] = args;
              const params = typeCast.params.map((p) => transform([p, context]));
              const [targetNode, typeNode] = params;
              const { type: from } = targetNode;
              const { value: to } = typeNode;
              return _extends({}, typeCast, {
                type: to,
                value: targetNode.value,
                Type: Syntax.TypeCast,
                meta: _extends({}, typeCast.meta, { [TYPE_CAST]: { to, from } }),
                // We need to drop the typeNode here, because it's not something we can generate
                params: [targetNode]
              });
            },
            [Syntax.Identifier]: (next) => (args) => {
              const [node, context] = args;
              let ref = scope_4(context.scopes, node.value);
              if (ref) {
                return _extends({}, node, {
                  meta: _extends({}, node.meta, ref.meta),
                  type: ref.type
                });
              }
              if (node.value === "null") {
                return _extends({}, node, {
                  value: "0",
                  type: "i32",
                  Type: Syntax.Constant
                });
              }
              return next(args);
            },
            [Syntax.TernaryExpression]: (next) => ([node, context]) => {
              return next([balanceTypesInMathExpression(_extends({}, node, {
                // Flatten out the parameters, put the condition node last
                params: [...node.params[1].params, node.params[0]]
              })), context]);
            }
          };
        }
      };
    }
    function base() {
      return {
        semantics() {
          return {
            "*": (_) => function([node, ...rest], t) {
              const result = _extends({}, node, {
                params: node.params.map((child) => t([child, ...rest]))
              });
              return result;
            }
          };
        }
      };
    }
    function typePlugin() {
      return {
        semantics() {
          return {
            [Syntax.Typedef]: (_) => ([node]) => node,
            [Syntax.Program]: (next) => (args) => {
              const [ast, context] = args;
              const { types } = context;
              const astWithTypes = mapNode_2({
                [Syntax.Export]: (node, transform) => {
                  const [maybeType] = node.params;
                  if (maybeType != null && [Syntax.Typedef, Syntax.Struct].includes(maybeType.Type)) {
                    return transform(_extends({}, maybeType, {
                      meta: _extends({}, maybeType.meta, {
                        EXPORTED: true
                      })
                    }));
                  }
                  return node;
                },
                [Syntax.Typedef]: (node, _) => {
                  let argumentsCount = 0;
                  const [fnArgs] = node.params;
                  const defaultArgs = [];
                  walkNode({
                    Assignment(assignment) {
                      const defaultValue = assignment.params[1];
                      defaultArgs.push(defaultValue);
                    },
                    Type() {
                      argumentsCount += 1;
                    }
                  })(fnArgs);
                  const parsed = _extends({}, node, {
                    meta: _extends({}, node.meta, {
                      FUNCTION_METADATA: {
                        argumentsCount
                      },
                      DEFAULT_ARGUMENTS: defaultArgs
                    })
                  });
                  types[node.value] = parsed;
                  return parsed;
                }
              })(ast);
              return next([astWithTypes, context]);
            }
          };
        }
      };
    }
    const shifts = {
      i64: 63,
      f64: 63,
      i32: 31,
      f32: 31
    };
    const masks = {
      i64: "0xffffffffffff",
      f64: "0xffffffffffff",
      i32: "0xffffff",
      f32: "0xffffff"
    };
    function unary() {
      return {
        semantics({ stmt }) {
          return {
            [Syntax.UnaryExpression]: (_ignore) => (args, transform) => {
              const [unaryNode, context] = args;
              const [lhs, rhs] = unaryNode.params.map((p) => transform([p, context]));
              switch (unaryNode.value) {
                case "!":
                  const shift = shifts[lhs.type];
                  return transform([stmt`(((${lhs} >> ${shift}) | ((~${lhs} + 1) >> ${shift})) + 1);`, context]);
                case "~":
                  const mask = masks[transform([lhs, context]).type];
                  return transform([stmt`(${lhs} ^ ${mask});`, context]);
                case "-":
                  if (rhs.Type === Syntax.Constant) {
                    return _extends({}, rhs, {
                      meta: _extends({}, rhs.meta, {
                        // Hint for generator
                        SIGN: -1
                      })
                    });
                  }
                default:
                  return transform([_extends({}, unaryNode, {
                    type: rhs.type,
                    params: [_extends({}, lhs, {
                      type: rhs.type
                    }), rhs],
                    Type: Syntax.BinaryExpression
                  }), context]);
              }
            }
          };
        }
      };
    }
    function coreFunctionPlugin() {
      return {
        semantics() {
          return {
            [Syntax.FunctionDeclaration]: (_ignore) => ([fun, context], transform) => {
              context.scopes = scope_1(context.scopes, LOCAL_INDEX);
              const currentScope = scope_3(context.scopes);
              const [argsNode, resultNode, block] = fun.params;
              const [args, result] = [argsNode, resultNode].map((p) => transform([p, context]));
              const ref = _extends({}, fun, {
                // This is set by the parsers below if necessary, defaults to null
                type: currentScope[scope_8].result,
                meta: _extends({}, fun.meta, {
                  [FUNCTION_INDEX]: Object.keys(context.functions).length,
                  [FUNCTION_METADATA]: {
                    argumentsCount: currentScope[scope_8].arguments.length,
                    locals: scope_3(context.scopes)
                  }
                })
              });
              context.functions[fun.value] = ref;
              ref.params = [args, result, transform([block, context])];
              context.scopes = scope_2(context.scopes);
              return ref;
            },
            [Syntax.FunctionResult]: (_next) => ([result, context]) => {
              const currentScope = scope_3(context.scopes);
              currentScope[scope_8].result = result.type;
              return result;
            },
            [Syntax.FunctionArguments]: (_next) => ([args, context], transform) => {
              const currentScope = scope_3(context.scopes);
              currentScope[scope_8].arguments = [];
              const mapped = mapNode_2({
                [Syntax.Pair]: (node, _) => {
                  const [identifier, utype] = node.params;
                  const typeNode = transform([utype, context]);
                  currentScope[scope_8].arguments.push(node);
                  transform([_extends({}, node, {
                    value: identifier.value,
                    type: typeNode.value,
                    params: [],
                    Type: Syntax.Declaration
                  }), context]);
                  return _extends({}, node, { params: [identifier, typeNode] });
                }
              })(_extends({}, args, { params: args.params.filter(Boolean) }));
              return mapped;
            },
            // Regular function calls
            [Syntax.FunctionCall]: (next) => ([call, context]) => {
              const { functions } = context;
              const index2 = Object.keys(functions).indexOf(call.value);
              return next([_extends({}, call, {
                type: functions[call.value] != null ? functions[call.value].type : null,
                meta: { [FUNCTION_INDEX]: index2 },
                params: call.params.slice(1)
              }), context]);
            },
            [Syntax.ReturnStatement]: (_next) => ([returnNode, context], transform) => {
              const currentScope = scope_3(context.scopes);
              const [expression] = returnNode.params.map((p) => transform([p, context]));
              const { result } = currentScope[scope_8];
              if (expression != null && expression.Type === Syntax.Constant && typeWeight(expression.type) !== typeWeight(result)) {
                return _extends({}, returnNode, {
                  type: result,
                  params: [_extends({}, expression, { type: result })]
                });
              }
              const type = expression ? expression.type : null;
              return _extends({}, returnNode, {
                params: [expression],
                type
              });
            }
          };
        }
      };
    }
    function Imports() {
      return {
        semantics: () => ({
          [Syntax.Import]: (_next) => (args) => {
            const [node, context] = args;
            return mapNode_2({
              [Syntax.BinaryExpression]: (as, transform) => {
                const [maybePair, asIdentifier] = as.params;
                if (maybePair.Type !== Syntax.Pair) {
                  return as;
                }
                const [original, typeNode] = maybePair.params;
                return transform(_extends({}, maybePair, {
                  params: [_extends({}, asIdentifier, {
                    meta: _extends({}, original.meta, {
                      // <new-value> AS <original-value>
                      AS: original.value
                    })
                  }), typeNode]
                }));
              },
              [Syntax.Pair]: (pairNode, __) => {
                const { types, functions } = context;
                const [identifierNode, typeNode] = pairNode.params;
                if (types[typeNode.value] != null) {
                  const functionIndex = Object.keys(functions).length;
                  const typeIndex = Object.keys(types).indexOf(typeNode.value);
                  const functionNode = _extends({}, identifierNode, {
                    id: identifierNode.value,
                    type: types[typeNode.value].type,
                    meta: _extends({}, identifierNode.meta, {
                      [FUNCTION_INDEX]: functionIndex,
                      [TYPE_INDEX]: typeIndex,
                      FUNCTION_METADATA: types[typeNode.value].meta.FUNCTION_METADATA,
                      DEFAULT_ARGUMENTS: types[typeNode.value].meta.DEFAULT_ARGUMENTS
                    })
                  });
                  functions[identifierNode.value] = functionNode;
                  return _extends({}, pairNode, {
                    params: [functionNode, types[typeNode.value]]
                  });
                }
                if (!["Table", "Memory"].includes(typeNode.value)) {
                  const scope$$1 = scope_3(context.scopes);
                  const index$$1 = scope_6(scope$$1, identifierNode.value);
                  scope_5(context.scopes, identifierNode.value, _extends({}, identifierNode, {
                    meta: { [scope$$1[scope_7]]: index$$1, [TYPE_CONST]: true },
                    type: typeNode.type
                  }));
                } else {
                  const bucket = typeNode.value === "Memory" ? "memories" : "tables";
                  context[bucket].push(identifierNode);
                }
                return pairNode;
              }
            })(node);
          }
        })
      };
    }
    function booleanPlugin() {
      return {
        semantics() {
          const declaration = (next) => ([decl, context]) => {
            if (decl.type === "bool") {
              return next([_extends({}, decl, { type: "i32" }), context]);
            }
            return next([decl, context]);
          };
          return {
            [Syntax.Identifier]: (next) => (args, transform) => {
              const [id2, context] = args;
              if (!(id2.value === "true" || id2.value === "false")) {
                return next(args);
              }
              return transform([_extends({}, id2, {
                Type: Syntax.Constant,
                value: id2.value === "true" ? "1" : "0",
                type: "i32"
              }), context]);
            },
            [Syntax.FunctionResult]: (next) => ([result, context]) => {
              if (result.type === "bool") {
                return next([_extends({}, result, { type: "i32" }), context]);
              }
              return next([result, context]);
            },
            [Syntax.Declaration]: declaration,
            [Syntax.ImmutableDeclaration]: declaration
          };
        }
      };
    }
    function withContext(transform, context) {
      const args = [null, context];
      return function(node) {
        args[0] = node;
        return transform(args);
      };
    }
    function pick(list, obj) {
      let result = {};
      let i = 0;
      for (i; i < list.length; i++) {
        result[list[i]] = obj[list[i]];
      }
      return result;
    }
    const shifts$1 = { i32: 2, f32: 2, i64: 3, f64: 3 };
    const NATIVE_ARRAY_TYPE = "i32";
    function semantics$2({ stmt }) {
      const declaration = (next) => (args) => {
        const [node, context] = args;
        if (!String(node.type).endsWith("[]")) {
          return next(args);
        }
        const decl = extendNode({
          type: NATIVE_ARRAY_TYPE,
          meta: { TYPE_ARRAY: node.type.slice(0, -2) }
        }, node);
        return next([decl, context]);
      };
      function arrayOffset(base2, offset) {
        const shift = shifts$1[base2.meta.TYPE_ARRAY] || 2;
        return offset.Type !== Syntax.Constant || Number(offset.value) ? stmt`(${base2} + (${offset} << ${shift}));` : stmt`(${base2});`;
      }
      function sanityCheck(subscript) {
        return !(subscript.type == null || subscript.index == null);
      }
      function produceSubscript([base2, offset]) {
        const type = base2.meta.TYPE_ARRAY;
        const index2 = arrayOffset(base2, offset);
        return { type, index: index2, TYPE_ARRAY: base2.meta.TYPE_ARRAY };
      }
      return {
        [Syntax.Declaration]: declaration,
        [Syntax.ImmutableDeclaration]: declaration,
        [Syntax.Identifier]: (next) => (args) => {
          const [node, context] = args;
          const ref = scope_4(context.scopes, node.value);
          if (!(ref && ref.meta.TYPE_ARRAY)) {
            return next(args);
          }
          return next([extendNode(pick(["type", "meta"], ref), node), context]);
        },
        [Syntax.Assignment]: (next) => (args, t) => {
          const [node, context] = args;
          const [lhs, rhs] = node.params;
          if (lhs.Type !== Syntax.ArraySubscript) {
            return next(args);
          }
          const transform = withContext(t, context);
          const subscript = produceSubscript(lhs.params.map(transform));
          const { type, index: index2 } = subscript;
          invariant_1(sanityCheck(subscript), `PANIC - Cannot assign to subscript of ${lhs.value}`);
          return transform(stmt`${type}.store(${index2}, ${rhs});`);
        },
        [Syntax.ArraySubscript]: (next) => (args, t) => {
          const [node, context] = args;
          const transform = withContext(t, context);
          const subscript = produceSubscript(node.params.map(transform));
          const { type, index: index2, TYPE_ARRAY } = subscript;
          if (!sanityCheck(subscript)) {
            return next(args);
          }
          return extendNode({ meta: { TYPE_ARRAY } }, transform(stmt`${type}.load(${index2});`));
        },
        // Function result types can be (pre) parsed exactly like declarations
        [Syntax.FunctionResult]: declaration
      };
    }
    function arrayPlugin() {
      return { semantics: semantics$2 };
    }
    const isMemoryIdentifier = (context, id2) => {
      const memory = context.memories[0];
      return memory && memory.value === id2.value;
    };
    function memoryPlugin() {
      return {
        semantics({ stmt }) {
          return {
            [Syntax.ImmutableDeclaration]: (next) => (args) => {
              const [decl, context] = args;
              const { scopes, memories } = context;
              if (!scopes.length < 2 && decl.type === "Memory" && !memories.length) {
                memories.push(_extends({}, decl, {
                  meta: _extends({}, decl.meta, {
                    [GLOBAL_INDEX]: -1
                  })
                }));
                return memories[0];
              }
              return next(args);
            },
            [Syntax.FunctionCall]: (next) => (args, transform) => {
              const [node, context] = args;
              const [subscript, ...rest] = node.params;
              const [id2 = {}, field = {}] = subscript.params;
              const callMap = {
                dataSize: transform([stmt`i32.load(0);`, context]),
                grow: _extends({}, id2, {
                  value: "grow_memory",
                  params: rest.map((p) => transform([p, context])),
                  Type: Syntax.NativeMethod
                }),
                size: _extends({}, id2, {
                  value: "current_memory",
                  params: [],
                  Type: Syntax.NativeMethod
                })
              };
              const mapped = callMap[field.value];
              if (!(subscript.Type === Syntax.Access && isMemoryIdentifier(context, id2) && mapped)) {
                return next(args);
              }
              return mapped;
            }
          };
        }
      };
    }
    const encodeSigned = (value) => {
      const encoding = [];
      while (true) {
        const byte = value & 127;
        value = value >> 7;
        const signbit = byte & 64;
        if (value === 0 && !signbit || value === -1 && signbit) {
          encoding.push(byte);
          break;
        } else {
          encoding.push(byte | 128);
        }
      }
      return encoding;
    };
    const encodeUnsigned = (value) => {
      const encoding = [];
      while (true) {
        const i = value & 127;
        value = value >>> 7;
        if (value === 0) {
          encoding.push(i);
          break;
        }
        encoding.push(i | 128);
      }
      return encoding;
    };
    const i32 = 1;
    const i64 = 1 << 1;
    const f32 = 1 << 2;
    const f64 = 1 << 3;
    const anyfunc = 1 << 4;
    const func = 1 << 5;
    const block_type = 1 << 6;
    const i8 = 1 << 7;
    const u8 = 1 << 8;
    const i16 = 1 << 9;
    const u16 = 1 << 10;
    const u32 = 1 << 11;
    const u64 = 1 << 12;
    const word = 4;
    const sizeof = {
      [i32]: word,
      [i64]: word * 2,
      [f32]: word,
      [f64]: word * 2,
      [u32]: word,
      [u16]: word >> 1,
      [u8]: word >> 2,
      [i8]: word >> 2,
      [i16]: word >> 1,
      [anyfunc]: word,
      [func]: word,
      [block_type]: word
    };
    const LITTLE_ENDIAN = true;
    const get$1 = (type, index2, dataView) => {
      switch (type) {
        case i32:
          return dataView.getInt32(index2, LITTLE_ENDIAN);
        case i64:
          return dataView.getInt64(index2, LITTLE_ENDIAN);
        case f32:
          return dataView.getFloat32(index2, LITTLE_ENDIAN);
        case f64:
          return dataView.getFloat64(index2, LITTLE_ENDIAN);
        case anyfunc:
          return dataView.getUint32(index2, LITTLE_ENDIAN);
        case func:
          return dataView.getUint32(index2, LITTLE_ENDIAN);
        case i8:
          return dataView.getInt8(index2, LITTLE_ENDIAN);
        case u8:
          return dataView.getUint8(index2, LITTLE_ENDIAN);
        case i16:
          return dataView.getInt16(index2, LITTLE_ENDIAN);
        case u16:
          return dataView.getUint16(index2, LITTLE_ENDIAN);
        case u32:
          return dataView.getUint32(index2, LITTLE_ENDIAN);
        case u64:
          return dataView.getUint64(index2, LITTLE_ENDIAN);
        default:
          return dataView.getUint8(index2, LITTLE_ENDIAN);
      }
    };
    const set$1 = (type, index2, dataView, value) => {
      switch (type) {
        case i32:
          return dataView.setInt32(index2, value, LITTLE_ENDIAN);
        case i64:
          return dataView.setInt64(index2, value, LITTLE_ENDIAN);
        case f32:
          return dataView.setFloat32(index2, value, LITTLE_ENDIAN);
        case f64:
          return dataView.setFloat64(index2, value, LITTLE_ENDIAN);
        case anyfunc:
          return dataView.setUint32(index2, value, LITTLE_ENDIAN);
        case func:
          return dataView.setUint32(index2, value, LITTLE_ENDIAN);
        case i8:
          return dataView.setInt8(index2, value, LITTLE_ENDIAN);
        case u8:
          return dataView.setUint8(index2, value, LITTLE_ENDIAN);
        case i16:
          return dataView.setInt16(index2, value, LITTLE_ENDIAN);
        case u16:
          return dataView.setUint16(index2, value, LITTLE_ENDIAN);
        case u32:
          return dataView.setUint32(index2, value, LITTLE_ENDIAN);
        case u64:
          return dataView.setUint64(index2, value, LITTLE_ENDIAN);
        default:
          return dataView.setUint8(index2, value, LITTLE_ENDIAN);
      }
    };
    var index$2 = {
      i32,
      i64,
      f32,
      f64,
      anyfunc,
      func,
      block_type,
      i8,
      u8,
      i16,
      u16,
      u32,
      u64,
      set: set$1,
      get: get$1,
      sizeof
    };
    var index_1 = index$2.i32;
    var index_2 = index$2.i64;
    var index_3 = index$2.f32;
    var index_4 = index$2.f64;
    var index_9 = index$2.u8;
    var index_12 = index$2.u32;
    var index_14 = index$2.set;
    var index_16 = index$2.sizeof;
    class OutputStream {
      constructor() {
        this.data = [];
        this.size = 0;
      }
      push(type, value, debug) {
        let size = 0;
        switch (type) {
          case "varuint7":
          case "varuint32":
          case "varint7":
          case "varint1": {
            value = encodeUnsigned(value);
            size = value.length;
            invariant_1(size, `Cannot write a value of size ${size}`);
            break;
          }
          case "varint32": {
            value = encodeSigned(value);
            size = value.length;
            invariant_1(size, `Cannot write a value of size ${size}`);
            break;
          }
          case "varint64": {
            value = encodeSigned(value);
            size = value.length;
            invariant_1(size, `Cannot write a value of size ${size}`);
            break;
          }
          default: {
            size = index_16[type];
            invariant_1(size, `Cannot write a value of size ${size}, type ${type}`);
          }
        }
        this.data.push({ type, value, debug });
        this.size += size;
        return this;
      }
      // Get the BUFFER, not data array.
      // Returns a new buffer unless one is passed in to be written to.
      buffer(buffer = new ArrayBuffer(this.size)) {
        const view = new DataView(buffer);
        let pc = 0;
        this.data.forEach(({ type, value }) => {
          if (Array.isArray(value)) {
            value.forEach((v) => index_14(index_9, pc++, view, v));
          } else {
            index_14(type, pc, view, value);
            pc += index_16[type];
          }
        });
        return buffer;
      }
      // Writes source OutputStream into the current buffer
      write(source) {
        if (source) {
          this.data = this.data.concat(source.data);
          this.size += source.size;
        }
        return this;
      }
    }
    function* stringDecoder(view, start) {
      let length = 0;
      let index2 = 0;
      let shift = 0;
      let addr = start;
      while (true) {
        const byte = view.getUint8(addr, true);
        length |= (byte & 127) << shift;
        addr += 1;
        if ((byte & 128) === 0) {
          break;
        }
        shift += 7;
      }
      let result = 0;
      while (index2 < length) {
        result = 0;
        shift = 0;
        while (true) {
          const byte = view.getUint8(addr, true);
          result |= (byte & 127) << shift;
          addr += 1;
          if ((byte & 128) === 0) {
            break;
          }
          shift += 7;
        }
        index2 += 1;
        yield result;
      }
    }
    function stringEncoder(value) {
      const resultStream = new OutputStream();
      const characterStream = new OutputStream();
      characterStream.push("varuint32", value.length, value);
      let i = 0;
      for (i = 0; i < value.length; i++) {
        characterStream.push("varuint32", value.codePointAt(i), value[i]);
      }
      resultStream.write(characterStream);
      return resultStream;
    }
    const escapeMap = {
      ["\\0"]: 0,
      ["\\a"]: 7,
      ["\\b"]: 8,
      ["\\t"]: 9,
      ["\\n"]: 10,
      ["\\v"]: 11,
      ["\\f"]: 12,
      ["\\r"]: 13,
      ["\\'"]: 39
    };
    const sizeMap = {
      i64: 8,
      f64: 8,
      i32: 4,
      f32: 4
    };
    function encodeArray(array, type) {
      const stream = new OutputStream();
      const encodeType = index$2[type];
      array.forEach((v) => {
        stream.push(encodeType, v, String(v));
      });
      return stream;
    }
    function Strings() {
      let count = 0;
      return {
        semantics: ({ stmt }) => ({
          [Syntax.StaticDeclaration]: (_next) => ([node, context], transform) => {
            const { userTypes, statics } = context;
            const bareType = String(node.type).slice(0, -2);
            const typeSize = sizeMap[bareType];
            const meta = node.params.reduce((acc, v, i) => {
              const n = transform([v, context]);
              acc.OBJECT_SIZE += typeSize;
              acc.TYPE_OBJECT[i] = i * typeSize;
              acc.OBJECT_KEY_TYPES[i] = bareType;
              acc.VALUES.push(Number(n.value));
              return acc;
            }, {
              OBJECT_SIZE: 0,
              TYPE_OBJECT: {},
              OBJECT_KEY_TYPES: {},
              VALUES: [],
              STATIC: bareType
            });
            const uid = `__auto_gen_${node.value}_${count}`;
            count += 1;
            userTypes[uid] = _extends({}, node, {
              value: uid,
              Type: Syntax.Type,
              meta,
              params: []
            });
            statics[uid] = encodeArray(meta.VALUES, bareType);
            return transform([_extends({}, node, {
              meta,
              type: uid,
              Type: Syntax.ImmutableDeclaration,
              params: [_extends({}, node.params[0], {
                value: uid,
                Type: Syntax.StaticValueList
              })]
            }), context]);
          },
          [Syntax.ArraySubscript]: (next) => ([node, context], transform) => {
            const [target, offset] = node.params.map((p) => transform([p, context]));
            if (!target.meta.STATIC) {
              return next([node, context]);
            }
            const shift = { i32: 2, f32: 2, i64: 3, f64: 3 }[target.meta.STATIC];
            return transform([stmt`${target.meta.STATIC}.load(${target} + (${offset} << ${shift}));`, context]);
          },
          [Syntax.CharacterLiteral]: (_) => ([node, context], transform) => {
            const codePoint = escapeMap[node.value] || node.value.codePointAt(0);
            return transform([_extends({}, node, {
              Type: "Constant",
              type: "i32",
              value: String(codePoint)
            }), context]);
          },
          [Syntax.StringLiteral]: (_ignore) => (args) => {
            const [stringLiteral, context] = args;
            const { statics } = context;
            const { value } = stringLiteral;
            if (!(value in statics)) {
              statics[value] = stringEncoder(value);
            }
            return stringLiteral;
          }
        })
      };
    }
    function functionPointer() {
      return {
        semantics() {
          return {
            // Handle Table definitions
            [Syntax.ImmutableDeclaration]: (next) => function(args) {
              const [decl, context] = args;
              if (!context.locals && decl.type === "Table") {
                return _extends({}, decl, {
                  meta: _extends({}, decl.meta, {
                    [GLOBAL_INDEX]: -1
                  })
                });
              }
              return next(args);
            },
            [Syntax.Identifier]: (next) => function(args) {
              const [node, context] = args;
              const { functions, table, scopes } = context;
              if (scope_4(scopes, node.value) || !functions[node.value]) {
                return next(args);
              }
              if (table[node.value] == null) {
                table[node.value] = functions[node.value];
              }
              return _extends({}, node, {
                type: "i32",
                meta: {
                  [FUNCTION_INDEX]: functions[node.value].meta[FUNCTION_INDEX]
                },
                value: Object.keys(table).indexOf(node.value),
                Type: Syntax.FunctionPointer
              });
            },
            [Syntax.FunctionResult]: (next) => (args, transform) => {
              const [node, context] = args;
              const { types } = context;
              if (!types[node.type]) {
                return next(args);
              }
              return next([extendNode({
                type: "i32",
                meta: { ALIAS: node.type },
                params: node.params.map((p) => transform([p, context]))
              }, node), context]);
            },
            [Syntax.FunctionCall]: (next) => function(args, transform) {
              const [call, context] = args;
              const { scopes, types } = context;
              const ref = scope_4(scopes, call.value);
              if (!ref) {
                return next(args);
              }
              const typedef = types[ref.type];
              const typeIndex = Object.keys(types).indexOf(ref.type);
              const params = [...call.params.slice(1), _extends({}, ref, { Type: Syntax.Identifier })].map((p) => transform([p, context]));
              return _extends({}, call, {
                meta: _extends({}, call.meta, ref.meta, {
                  [TYPE_INDEX]: typeIndex
                }),
                type: typedef != null ? typedef.type : call.type,
                params,
                Type: Syntax.IndirectFunctionCall
              });
            }
          };
        }
      };
    }
    const STRUCT_NATIVE_TYPE = "i32";
    const DIRECT_ADDRESS = "__DIRECT_ADDRESS__";
    const sizeMap$1 = {
      i64: 8,
      f64: 8,
      i32: 4,
      f32: 4,
      [DIRECT_ADDRESS]: 4
    };
    const getByteOffsetsAndSize = (objectLiteralNode) => {
      const offsetsByKey = {};
      const keyTypeMap = {};
      let size = 0;
      walkNode({
        [Syntax.Pair]: (keyTypePair) => {
          const [lhs] = keyTypePair.params;
          const key = lhs.value;
          const type = keyTypePair.params[1].value;
          invariant_1(offsetsByKey[key] == null, `Duplicate key ${key} not allowed in object type`);
          keyTypeMap[key] = `${lhs.Type === "AddressOf" ? "&" : ""}${type}`;
          offsetsByKey[key] = size;
          size += sizeMap$1[type] || 4;
        }
      })(objectLiteralNode);
      return [offsetsByKey, size, keyTypeMap];
    };
    const makeStruct = (stmt) => (base2, field) => {
      const unreachable = stmt`throw;`;
      const fatal = {
        load: extendNode({ range: field.range }, stmt`i32.load(${unreachable}, ${unreachable});`),
        store: (rhs) => extendNode({ range: field.range }, stmt`i32.store(${unreachable}, ${rhs});`),
        offset: unreachable,
        type: "void"
      };
      if (base2.meta.STRUCT_TYPE == null) {
        return fatal;
      }
      const typedef = base2.meta.STRUCT_TYPE;
      const offsetMap = typedef.meta.TYPE_OBJECT;
      const typeMap = typedef.meta.OBJECT_KEY_TYPES;
      const address = offsetMap[field.value];
      if (address == null) {
        return fatal;
      }
      let type = typeMap[field.value];
      const direct = type[0] === "&";
      const offset = address ? stmt`(${base2} + ${address});` : stmt`(${base2});`;
      let STRUCT_TYPE = null;
      let TYPE_ARRAY = null;
      if (type != null && typeof type === "object") {
        STRUCT_TYPE = type;
        type = STRUCT_NATIVE_TYPE;
      }
      if (String(type).endsWith("[]")) {
        TYPE_ARRAY = type.slice(0, -2).replace("&", "");
        type = "i32";
      }
      const withMeta = extendNode({
        range: base2.range,
        meta: { STRUCT_TYPE, TYPE_ARRAY }
      });
      return {
        offset,
        type,
        store: (rhs) => withMeta(stmt`${type}.store(${offset}, ${rhs});`),
        load: withMeta(direct ? offset : stmt`${type}.load(${offset});`)
      };
    };
    function Struct() {
      return {
        semantics({ stmt }) {
          const structure = makeStruct(stmt);
          function fieldAssignment(args, transform) {
            const [node, context] = args;
            const [lhs, rhs] = node.params;
            const [root, key] = lhs.params;
            const s = structure(transform([root, context]), key);
            return transform([s.store(rhs), context]);
          }
          function objectAssignment(args, transform) {
            const [node, context] = args;
            const [lhs, rhs] = node.params;
            const base2 = transform([lhs, context]);
            const kvs = [];
            walkNode({
              // Top level Identifiers _inside_ an object literal === shorthand
              // Notice that we ignore chld mappers in both Pairs and Spread(s) so the
              // only way this is hit is if the identifier is TOP LEVEL
              [Syntax.Identifier]: (value, _) => {
                const field = structure(base2, value);
                kvs.push({ field, value });
              },
              [Syntax.Pair]: (pair, _) => {
                const [property, value] = pair.params;
                const field = structure(base2, property);
                kvs.push({ field, value });
              },
              [Syntax.Spread]: (spread, _) => {
                const target = transform([spread.params[0], context]);
                Object.keys(target.meta.TYPE_OBJECT).forEach((key) => {
                  const field = structure(base2, {
                    value: key,
                    type: null,
                    range: target.range
                  });
                  const s = structure(target, {
                    value: key,
                    type: null,
                    range: target.range
                  });
                  kvs.push({
                    field,
                    value: s.load
                  });
                });
              }
            })(rhs);
            const params = kvs.filter(({ field }) => field != null).map((kv) => transform([kv.field.store(kv.value), context]));
            return _extends({}, lhs, {
              Type: Syntax.Block,
              params
            });
          }
          return {
            [Syntax.Struct]: (_) => ([node, context], transform) => {
              const { userTypes, aliases } = context;
              const [union] = node.params;
              let structNode = _extends({}, node, {
                meta: _extends({}, node.meta, {
                  TYPE_OBJECT: {},
                  OBJECT_SIZE: 0,
                  OBJECT_KEY_TYPES: {}
                })
              });
              const Alias = () => {
                aliases[node.value] = union.value;
              };
              const objectLiteral = (obj, __) => {
                const [offsets, size, typeMap] = getByteOffsetsAndSize(obj);
                structNode.meta.TYPE_OBJECT = _extends({}, structNode.meta.TYPE_OBJECT, offsets);
                structNode.meta.OBJECT_SIZE += size;
                structNode.meta.OBJECT_KEY_TYPES = _extends({}, structNode.meta.OBJECT_KEY_TYPES, typeMap);
              };
              const parsers = {
                [Syntax.Type]: Alias,
                [Syntax.Identifier]: Alias,
                [Syntax.ObjectLiteral]: () => {
                  objectLiteral(node);
                  userTypes[structNode.value] = structNode;
                },
                [Syntax.UnionType]: () => {
                  walkNode({
                    [Syntax.ObjectLiteral]: objectLiteral,
                    [Syntax.ArrayType]: (type) => {
                      structNode.meta.TYPE_ARRAY = type.type.slice(0, -2);
                    },
                    [Syntax.Identifier]: (id2) => {
                      const structReference = userTypes[transform([id2, context]).value];
                      structNode.meta.TYPE_OBJECT = _extends({}, structNode.meta.TYPE_OBJECT, structReference.meta.TYPE_OBJECT);
                      structNode.meta.OBJECT_SIZE = Math.max(structNode.meta.OBJECT_SIZE, structReference.meta.OBJECT_SIZE);
                      structNode.meta.OBJECT_KEY_TYPES = _extends({}, structNode.meta.OBJECT_KEY_TYPES, structReference.meta.OBJECT_KEY_TYPES);
                    }
                  })(union);
                  userTypes[structNode.value] = structNode;
                }
              };
              parsers[union.Type]();
              structNode.meta.OBJECT_KEY_TYPES = Object.entries(structNode.meta.OBJECT_KEY_TYPES).reduce((acc, [key, value]) => {
                acc[key] = userTypes[value] || value;
                return acc;
              }, {});
              return structNode;
            },
            // Declaration type remapping is done for aliases here but not for struct
            // types since that is achieved in the declaration parser.
            [Syntax.DeclType]: (next) => (args, transform) => {
              const [node, context] = args;
              const { aliases } = context;
              if (aliases[node.value]) {
                return transform([extendNode({ value: aliases[node.value], type: aliases[node.value] }, node), context]);
              }
              return next(args);
            },
            [Syntax.FunctionResult]: (next) => (args, transform) => {
              const [node, context] = args;
              const { userTypes, aliases } = context;
              if (aliases[node.type]) {
                return transform([extendNode({ type: aliases[node.type] }, node), context]);
              }
              if (!userTypes[String(node.type)]) {
                return next(args);
              }
              return next([extendNode({
                type: STRUCT_NATIVE_TYPE,
                meta: { STRUCT_TYPE: userTypes[node.type] },
                params: node.params.map((p) => transform([p, context]))
              }, node), context]);
            },
            [Syntax.Identifier]: (next) => (args) => {
              const [node, context] = args;
              const { userTypes, scopes } = context;
              const ref = scope_4(scopes, node.value);
              if (!(ref && userTypes[ref.type])) {
                return next(args);
              }
              return _extends({}, node, {
                meta: _extends({}, node.meta, ref.meta, userTypes[ref.type].meta, {
                  STRUCT_TYPE: userTypes[ref.type]
                }),
                type: STRUCT_NATIVE_TYPE
              });
            },
            [Syntax.Access]: function(_next) {
              return (args, transform) => {
                const [node, context] = args;
                const [lookup, key] = node.params;
                const s = structure(transform([lookup, context]), key);
                return transform([s.load, context]);
              };
            },
            [Syntax.Assignment]: (next) => (args, transform) => {
              const [node] = args;
              const [lhs, rhs] = node.params;
              if (lhs.Type === Syntax.Access) {
                return fieldAssignment(args, transform);
              }
              if (rhs.Type === Syntax.ObjectLiteral) {
                return objectAssignment(args, transform);
              }
              return next(args);
            },
            /**
             * Short-circuit parser for Struct[] type array subscripts. Since an
             * array of structs is a contiguous list of struct data in memory we
             * don't want to "load" the data at index into a variable, instead we
             * want the address-of the index!
             */
            [Syntax.ArraySubscript]: (next) => (args, t) => {
              const [node, context] = args;
              const parsed = next(args);
              if (context.userTypes[parsed.meta.TYPE_ARRAY] == null) {
                return parsed;
              }
              const [base2, offset] = node.params.map((p) => t([p, context]));
              return t([extendNode({
                type: STRUCT_NATIVE_TYPE,
                meta: {
                  STRUCT_TYPE: context.userTypes[parsed.meta.TYPE_ARRAY]
                }
              }, stmt`(${base2} + (${offset} * sizeof(${parsed.meta.TYPE_ARRAY})));`), context]);
            }
          };
        }
      };
    }
    function nativePlugin() {
      return {
        semantics() {
          return {
            [Syntax.FunctionCall]: (next) => (args, transform) => {
              const [node, context] = args;
              const [id2, ...fnArgs] = node.params;
              if (id2.Type === Syntax.Access && id2.params[0] && id2.params[0].Type === Syntax.Type) {
                const [type, method] = id2.params;
                return extendNode({
                  value: `${type.value}.${method.value}`,
                  type: type.value,
                  params: fnArgs.map((p) => transform([p, context])),
                  Type: Syntax.NativeMethod
                }, node);
              }
              return next(args);
            },
            [Syntax.Unreachable]: (_) => ([node]) => {
              return extendNode({
                value: "unreachable",
                params: [],
                Type: Syntax.NativeMethod
              }, node);
            }
          };
        }
      };
    }
    function defaultArguments() {
      return {
        grammar: grammar$1,
        semantics() {
          return {
            [Syntax.FunctionDeclaration]: (next) => (args) => {
              const [node, context] = args;
              const [argumentsNode] = node.params;
              const defaultArguments2 = [];
              walkNode({
                Assignment: (defaultArg) => {
                  const [, value] = defaultArg.params;
                  defaultArguments2.push(value);
                }
              })(argumentsNode);
              return next([_extends({}, node, {
                meta: _extends({}, node.meta, { DEFAULT_ARGUMENTS: defaultArguments2 })
              }), context]);
            },
            // There isn't a need to parse out the Assignment expressions as they are
            // not actually compiled/generated into the final binary
            // [Syntax.Assignment]: next => (args, transform) => {
            //   const [node, context] = args;
            //   // Not inside arguments
            //   const currentScope = current(context.scopes);
            //   // Arguments have not been set for scope yet and the current scope is
            //   // not global
            //   if (currentScope.arguments == null && context.scopes.length > 1) {
            //     return next(args);
            //   }
            //   // Assignment has higher precedence than ":" Pair expressions so the
            //   // children of this node will be [Pair(id:type), Constant(value)]
            //   // remove the constant return the pair.
            //   //
            //   // A helpful visual of a valid default argument syntax:
            //   //
            //   //      function fn(x : i32, y : i32, z : i32 = 0) { ... }
            //   const [pair] = node.params;
            //   // Short circuit the parsers since it does not make sense to process
            //   // assignment anymore. Instead parse the Pair, which is the argument.
            //   return transform([pair, context]);
            // },
            [Syntax.FunctionCall]: (next) => (args) => {
              const [call, context] = args;
              const { functions } = context;
              const [id2, ...fnArgs] = call.params;
              const target = functions[id2.value];
              if (!target) {
                return next(args);
              }
              const expectedArguments = target.meta.FUNCTION_METADATA.argumentsCount;
              const count = fnArgs.length;
              const difference = expectedArguments - count;
              if (difference > 0) {
                return next([_extends({}, call, {
                  params: [...call.params, ...target.meta.DEFAULT_ARGUMENTS.slice(difference - 1)]
                }), context]);
              }
              return next(args);
            }
          };
        }
      };
    }
    const sizes$1 = {
      i64: 8,
      f64: 8,
      i32: 4,
      f32: 4
    };
    function sizeofPlugin() {
      return {
        semantics() {
          return {
            [Syntax.FunctionCall]: (next) => (args) => {
              const [sizeof2, context] = args;
              if (sizeof2.value !== "sizeof") {
                return next(args);
              }
              const { scopes, userTypes, functions } = context;
              const [, target] = sizeof2.params;
              const ref = scope_4(scopes, target.value);
              const { type = "" } = ref || {};
              const userType = userTypes[target.value] || userTypes[type];
              const func2 = functions[target.value];
              if (userType != null) {
                const metaSize = userType.meta[OBJECT_SIZE];
                invariant_1(metaSize, "Object size information is missing");
                return _extends({}, sizeof2, {
                  value: metaSize,
                  params: [],
                  type: "i32",
                  Type: Syntax.Constant
                });
              }
              const node = ref || func2;
              return _extends({}, sizeof2, {
                value: sizes$1[String(node ? node.type : target.value)],
                type: "i32",
                params: [],
                Type: Syntax.Constant
              });
            }
          };
        }
      };
    }
    const getBuiltInParsers = () => {
      return [base().semantics, Core().semantics, Imports().semantics, typePlugin().semantics, unary().semantics, coreFunctionPlugin().semantics, booleanPlugin().semantics, arrayPlugin().semantics, memoryPlugin().semantics, Strings().semantics, functionPointer().semantics, Struct().semantics, nativePlugin().semantics, sizeofPlugin().semantics, defaultArguments().semantics];
    };
    function semantics(ast, extraSemantics, options) {
      const plugins2 = [...getBuiltInParsers(), ...extraSemantics];
      const combined = combineParsers(plugins2.map((p) => p(options)));
      const context = {
        functions: {},
        types: {},
        userTypes: {},
        table: {},
        hoist: [],
        statics: {},
        path: [],
        scopes: scope_1([], GLOBAL_INDEX),
        memories: [],
        tables: [],
        aliases: {},
        exports: {}
      };
      const parsed = mapNode_1(combined)([ast, context]);
      const {
        functions,
        scopes,
        types,
        userTypes,
        statics,
        hoist,
        exports: exports3
      } = context;
      return _extends({}, parsed, {
        meta: _extends({}, parsed.meta, {
          // Attach information collected to the AST
          [AST_METADATA]: {
            functions,
            globals: scopes[0],
            types,
            userTypes,
            statics,
            exports: exports3
          }
        }),
        params: [...parsed.params, ...hoist]
      });
    }
    function generateErrorString(msg, error, marker2, filename, func2) {
      const line = marker2.start.line;
      const col = marker2.start.col;
      const end = marker2.end.col;
      const Line = marker2.end.sourceLine;
      const highlight = new Array(end - col + 1).join("^").padStart(marker2.start.col - 1, " ");
      return "\n" + Line + "\n" + highlight + ` ${error}
` + msg + `
  at ${func2} (${filename}:${line}:${col})`;
    }
    const def = {};
    const opcodeMap = [];
    const textMap = {};
    const ___ = null;
    const opcode = (result, first, second, size, code, name, text) => {
      const definition = {
        result,
        first,
        second,
        size,
        code,
        name,
        text
      };
      def[name] = definition;
      opcodeMap[code] = definition;
      textMap[text] = definition;
      return definition;
    };
    opcode(___, ___, ___, 0, 0, "Unreachable", "unreachable");
    opcode(___, ___, ___, 0, 1, "Nop", "nop");
    opcode(___, ___, ___, 0, 2, "Block", "block");
    opcode(___, ___, ___, 0, 3, "Loop", "loop");
    opcode(___, ___, ___, 0, 4, "If", "if");
    opcode(___, ___, ___, 0, 5, "Else", "else");
    opcode(___, ___, ___, 0, 6, "Try", "try");
    opcode(___, ___, ___, 0, 7, "Catch", "catch");
    opcode(___, ___, ___, 0, 8, "Throw", "throw");
    opcode(___, ___, ___, 0, 9, "Rethrow", "rethrow");
    opcode(___, ___, ___, 0, 10, "CatchAll", "catch_all");
    opcode(___, ___, ___, 0, 11, "End", "end");
    opcode(___, ___, ___, 0, 12, "Br", "br");
    opcode(___, ___, ___, 0, 13, "BrIf", "br_if");
    opcode(___, ___, ___, 0, 14, "BrTable", "br_table");
    opcode(___, ___, ___, 0, 15, "Return", "return");
    opcode(___, ___, ___, 0, 16, "Call", "call");
    opcode(___, ___, ___, 0, 17, "CallIndirect", "call_indirect");
    opcode(___, ___, ___, 0, 26, "Drop", "drop");
    opcode(___, ___, ___, 0, 27, "Select", "select");
    opcode(___, ___, ___, 0, 32, "GetLocal", "get_local");
    opcode(___, ___, ___, 0, 33, "SetLocal", "set_local");
    opcode(___, ___, ___, 0, 34, "TeeLocal", "tee_local");
    opcode(___, ___, ___, 0, 35, "GetGlobal", "get_global");
    opcode(___, ___, ___, 0, 36, "SetGlobal", "set_global");
    opcode(index_1, index_1, ___, 4, 40, "i32Load", "i32.load");
    opcode(index_2, index_1, ___, 8, 41, "i64Load", "i64.load");
    opcode(index_3, index_1, ___, 4, 42, "f32Load", "f32.load");
    opcode(index_4, index_1, ___, 8, 43, "f64Load", "f64.load");
    opcode(index_1, index_1, ___, 1, 44, "i32Load8S", "i32.load8_s");
    opcode(index_1, index_1, ___, 1, 45, "i32Load8U", "i32.load8_u");
    opcode(index_1, index_1, ___, 2, 46, "i32Load16S", "i32.load16_s");
    opcode(index_1, index_1, ___, 2, 47, "i32Load16U", "i32.load16_u");
    opcode(index_2, index_1, ___, 1, 48, "i64Load8S", "i64.load8_s");
    opcode(index_2, index_1, ___, 1, 49, "i64Load8U", "i64.load8_u");
    opcode(index_2, index_1, ___, 2, 50, "i64Load16S", "i64.load16_s");
    opcode(index_2, index_1, ___, 2, 51, "i64Load16U", "i64.load16_u");
    opcode(index_2, index_1, ___, 4, 52, "i64Load32S", "i64.load32_s");
    opcode(index_2, index_1, ___, 4, 53, "i64Load32U", "i64.load32_u");
    opcode(___, index_1, index_1, 4, 54, "i32Store", "i32.store");
    opcode(___, index_1, index_2, 8, 55, "i64Store", "i64.store");
    opcode(___, index_1, index_3, 4, 56, "f32Store", "f32.store");
    opcode(___, index_1, index_3, 8, 57, "f64Store", "f64.store");
    opcode(___, index_1, index_1, 1, 58, "i32Store8", "i32.store8");
    opcode(___, index_1, index_1, 2, 59, "i32Store16", "i32.store16");
    opcode(___, index_1, index_2, 1, 60, "i64Store8", "i64.store8");
    opcode(___, index_1, index_2, 2, 61, "i64Store16", "i64.store16");
    opcode(___, index_1, index_2, 4, 62, "i64Store32", "i64.store32");
    opcode(index_1, ___, ___, 0, 63, "CurrentMemory", "current_memory");
    opcode(index_1, index_1, ___, 0, 64, "GrowMemory", "grow_memory");
    opcode(index_1, ___, ___, 0, 65, "i32Const", "i32.const");
    opcode(index_2, ___, ___, 0, 66, "i64Const", "i64.const");
    opcode(index_3, ___, ___, 0, 67, "f32Const", "f32.const");
    opcode(index_4, ___, ___, 0, 68, "f64Const", "f64.const");
    opcode(index_1, index_1, ___, 0, 69, "i32Eqz", "i32.eqz");
    opcode(index_1, index_1, index_1, 0, 70, "i32Eq", "i32.eq");
    opcode(index_1, index_1, index_1, 0, 71, "i32Ne", "i32.ne");
    opcode(index_1, index_1, index_1, 0, 72, "i32LtS", "i32.lt_s");
    opcode(index_1, index_1, index_1, 0, 73, "i32LtU", "i32.lt_u");
    opcode(index_1, index_1, index_1, 0, 74, "i32GtS", "i32.gt_s");
    opcode(index_1, index_1, index_1, 0, 75, "i32GtU", "i32.gt_u");
    opcode(index_1, index_1, index_1, 0, 76, "i32LeS", "i32.le_s");
    opcode(index_1, index_1, index_1, 0, 77, "i32LeU", "i32.le_u");
    opcode(index_1, index_1, index_1, 0, 78, "i32GeS", "i32.ge_s");
    opcode(index_1, index_1, index_1, 0, 79, "i32GeU", "i32.ge_u");
    opcode(index_1, index_2, ___, 0, 80, "i64Eqz", "i64.eqz");
    opcode(index_1, index_2, index_2, 0, 81, "i64Eq", "i64.eq");
    opcode(index_1, index_2, index_2, 0, 82, "i64Ne", "i64.ne");
    opcode(index_1, index_2, index_2, 0, 83, "i64LtS", "i64.lt_s");
    opcode(index_1, index_2, index_2, 0, 84, "i64LtU", "i64.lt_u");
    opcode(index_1, index_2, index_2, 0, 85, "i64GtS", "i64.gt_s");
    opcode(index_1, index_2, index_2, 0, 86, "i64GtU", "i64.gt_u");
    opcode(index_1, index_2, index_2, 0, 87, "i64LeS", "i64.le_s");
    opcode(index_1, index_2, index_2, 0, 88, "i64LeU", "i64.le_u");
    opcode(index_1, index_2, index_2, 0, 89, "i64GeS", "i64.ge_s");
    opcode(index_1, index_2, index_2, 0, 90, "i64GeU", "i64.ge_u");
    opcode(index_1, index_3, index_3, 0, 91, "f32Eq", "f32.eq");
    opcode(index_1, index_3, index_3, 0, 92, "f32Ne", "f32.ne");
    opcode(index_1, index_3, index_3, 0, 93, "f32Lt", "f32.lt");
    opcode(index_1, index_3, index_3, 0, 94, "f32Gt", "f32.gt");
    opcode(index_1, index_3, index_3, 0, 95, "f32Le", "f32.le");
    opcode(index_1, index_3, index_3, 0, 96, "f32Ge", "f32.ge");
    opcode(index_1, index_3, index_3, 0, 97, "f64Eq", "f64.eq");
    opcode(index_1, index_3, index_3, 0, 98, "f64Ne", "f64.ne");
    opcode(index_1, index_3, index_3, 0, 99, "f64Lt", "f64.lt");
    opcode(index_1, index_3, index_3, 0, 100, "f64Gt", "f64.gt");
    opcode(index_1, index_3, index_3, 0, 101, "f64Le", "f64.le");
    opcode(index_1, index_3, index_3, 0, 102, "f64Ge", "f64.ge");
    opcode(index_1, index_1, ___, 0, 103, "i32Clz", "i32.clz");
    opcode(index_1, index_1, ___, 0, 104, "i32Ctz", "i32.ctz");
    opcode(index_1, index_1, ___, 0, 105, "i32Popcnt", "i32.popcnt");
    opcode(index_1, index_1, index_1, 0, 106, "i32Add", "i32.add");
    opcode(index_1, index_1, index_1, 0, 107, "i32Sub", "i32.sub");
    opcode(index_1, index_1, index_1, 0, 108, "i32Mul", "i32.mul");
    opcode(index_1, index_1, index_1, 0, 109, "i32DivS", "i32.div_s");
    opcode(index_1, index_1, index_1, 0, 110, "i32DivU", "i32.div_u");
    opcode(index_1, index_1, index_1, 0, 111, "i32RemS", "i32.rem_s");
    opcode(index_1, index_1, index_1, 0, 112, "i32RemU", "i32.rem_u");
    opcode(index_1, index_1, index_1, 0, 113, "i32And", "i32.and");
    opcode(index_1, index_1, index_1, 0, 114, "i32Or", "i32.or");
    opcode(index_1, index_1, index_1, 0, 115, "i32Xor", "i32.xor");
    opcode(index_1, index_1, index_1, 0, 116, "i32Shl", "i32.shl");
    opcode(index_1, index_1, index_1, 0, 117, "i32ShrS", "i32.shr_s");
    opcode(index_1, index_1, index_1, 0, 118, "i32ShrU", "i32.shr_u");
    opcode(index_1, index_1, index_1, 0, 119, "i32Rotl", "i32.rotl");
    opcode(index_1, index_1, index_1, 0, 120, "i32Rotr", "i32.rotr");
    opcode(index_2, index_2, ___, 0, 121, "i64Clz", "i64.clz");
    opcode(index_2, index_2, ___, 0, 122, "i64Ctz", "i64.ctz");
    opcode(index_2, index_2, ___, 0, 123, "i64Popcnt", "i64.popcnt");
    opcode(index_2, index_2, index_2, 0, 124, "i64Add", "i64.add");
    opcode(index_2, index_2, index_2, 0, 125, "i64Sub", "i64.sub");
    opcode(index_2, index_2, index_2, 0, 126, "i64Mul", "i64.mul");
    opcode(index_2, index_2, index_2, 0, 127, "i64DivS", "i64.div_s");
    opcode(index_2, index_2, index_2, 0, 128, "i64DivU", "i64.div_u");
    opcode(index_2, index_2, index_2, 0, 129, "i64RemS", "i64.rem_s");
    opcode(index_2, index_2, index_2, 0, 130, "i64RemU", "i64.rem_u");
    opcode(index_2, index_2, index_2, 0, 131, "i64And", "i64.and");
    opcode(index_2, index_2, index_2, 0, 132, "i64Or", "i64.or");
    opcode(index_2, index_2, index_2, 0, 133, "i64Xor", "i64.xor");
    opcode(index_2, index_2, index_2, 0, 134, "i64Shl", "i64.shl");
    opcode(index_2, index_2, index_2, 0, 135, "i64ShrS", "i64.shr_s");
    opcode(index_2, index_2, index_2, 0, 136, "i64ShrU", "i64.shr_u");
    opcode(index_2, index_2, index_2, 0, 137, "i64Rotl", "i64.rotl");
    opcode(index_2, index_2, index_2, 0, 138, "i64Rotr", "i64.rotr");
    opcode(index_3, index_3, index_3, 0, 139, "f32Abs", "f32.abs");
    opcode(index_3, index_3, index_3, 0, 140, "f32Neg", "f32.neg");
    opcode(index_3, index_3, index_3, 0, 141, "f32Ceil", "f32.ceil");
    opcode(index_3, index_3, index_3, 0, 142, "f32Floor", "f32.floor");
    opcode(index_3, index_3, index_3, 0, 143, "f32Trunc", "f32.trunc");
    opcode(index_3, index_3, index_3, 0, 144, "f32Nearest", "f32.nearest");
    opcode(index_3, index_3, index_3, 0, 145, "f32Sqrt", "f32.sqrt");
    opcode(index_3, index_3, index_3, 0, 146, "f32Add", "f32.add");
    opcode(index_3, index_3, index_3, 0, 147, "f32Sub", "f32.sub");
    opcode(index_3, index_3, index_3, 0, 148, "f32Mul", "f32.mul");
    opcode(index_3, index_3, index_3, 0, 149, "f32Div", "f32.div");
    opcode(index_3, index_3, index_3, 0, 150, "f32Min", "f32.min");
    opcode(index_3, index_3, index_3, 0, 151, "f32Max", "f32.max");
    opcode(index_3, index_3, index_3, 0, 152, "f32Copysign", "f32.copysign");
    opcode(index_3, index_3, index_3, 0, 153, "f32Abs", "f64.abs");
    opcode(index_3, index_3, index_3, 0, 154, "f32Neg", "f64.neg");
    opcode(index_3, index_3, index_3, 0, 155, "f32Ceil", "f64.ceil");
    opcode(index_3, index_3, index_3, 0, 156, "f32Floor", "f64.floor");
    opcode(index_3, index_3, index_3, 0, 157, "f32Trunc", "f64.trunc");
    opcode(index_3, index_3, index_3, 0, 158, "f32Nearest", "f64.nearest");
    opcode(index_3, index_3, index_3, 0, 159, "f32Sqrt", "f64.sqrt");
    opcode(index_4, index_4, index_4, 0, 160, "f64Add", "f64.add");
    opcode(index_4, index_4, index_4, 0, 161, "f64Sub", "f64.sub");
    opcode(index_4, index_4, index_4, 0, 162, "f64Mul", "f64.mul");
    opcode(index_4, index_4, index_4, 0, 163, "f64Div", "f64.div");
    opcode(index_4, index_4, index_4, 0, 164, "f64Min", "f64.min");
    opcode(index_4, index_4, index_4, 0, 165, "f64Max", "f64.max");
    opcode(index_4, index_4, index_4, 0, 166, "f64Copysign", "f64.copysign");
    opcode(index_1, index_2, ___, 0, 167, "i32Wrapi64", "i32.wrap/i64");
    opcode(index_1, index_3, ___, 0, 168, "i32TruncSf32", "i32.trunc_s/f32");
    opcode(index_1, index_3, ___, 0, 169, "i32TruncUf32", "i32.trunc_u/f32");
    opcode(index_1, index_3, ___, 0, 170, "i32TruncSf64", "i32.trunc_s/f64");
    opcode(index_1, index_3, ___, 0, 171, "i32TruncUf64", "i32.trunc_u/f64");
    opcode(index_2, index_1, ___, 0, 172, "i64ExtendSi32", "i64.extend_s/i32");
    opcode(index_2, index_1, ___, 0, 173, "i64ExtendUi32", "i64.extend_u/i32");
    opcode(index_2, index_3, ___, 0, 174, "i64TruncSf32", "i64.trunc_s/f32");
    opcode(index_2, index_3, ___, 0, 175, "i64TruncUf32", "i64.trunc_u/f32");
    opcode(index_2, index_3, ___, 0, 176, "i64TruncSf64", "i64.trunc_s/f64");
    opcode(index_2, index_3, ___, 0, 177, "i64TruncUf64", "i64.trunc_u/f64");
    opcode(index_3, index_1, ___, 0, 178, "f32ConvertSi32", "f32.convert_s/i32");
    opcode(index_3, index_1, ___, 0, 179, "f32ConvertUi32", "f32.convert_u/i32");
    opcode(index_3, index_2, ___, 0, 180, "f32ConvertSi64", "f32.convert_s/i64");
    opcode(index_3, index_2, ___, 0, 181, "f32ConvertUi64", "f32.convert_u/i64");
    opcode(index_3, index_3, ___, 0, 182, "f32Demotef64", "f32.demote/f64");
    opcode(index_3, index_1, ___, 0, 183, "f64ConvertSi32", "f64.convert_s/i32");
    opcode(index_3, index_1, ___, 0, 184, "f64ConvertUi32", "f64.convert_u/i32");
    opcode(index_3, index_2, ___, 0, 185, "f64ConvertSi64", "f64.convert_s/i64");
    opcode(index_3, index_2, ___, 0, 186, "f64ConvertUi64", "f64.convert_u/i64");
    opcode(index_3, index_3, ___, 0, 187, "f64Promotef32", "f64.promote/f32");
    opcode(index_1, index_3, ___, 0, 188, "i32Reinterpretf32", "i32.reinterpret/f32");
    opcode(index_2, index_3, ___, 0, 189, "i64Reinterpretf64", "i64.reinterpret/f64");
    opcode(index_3, index_1, ___, 0, 190, "f32Reinterpreti32", "f32.reinterpret/i32");
    opcode(index_3, index_2, ___, 0, 191, "f32Reinterpreti64", "f64.reinterpret/i64");
    const getTypecastOpcode = (to, from) => {
      const toType = to[0];
      if (["i32", "bool"].includes(to) && from === "i64") {
        return def.i32Wrapi64;
      }
      if (to === "i64" && ["i32", "bool"].includes(from)) {
        return def.i64ExtendSi32;
      }
      if (to === "f32" && from === "f64") {
        return def.f32Demotef64;
      }
      if (to === "f64" && from === "f32") {
        return def.f64Promotef32;
      }
      const conversion = toType === "f" ? "ConvertS" : "TruncS";
      return def[to + conversion + from];
    };
    const opcodeFromOperator = ({
      type,
      value
    }) => {
      const mapping = {
        "+": def[String(type) + "Add"],
        "-": def[String(type) + "Sub"],
        "*": def[String(type) + "Mul"],
        "/": def[String(type) + "DivS"] || def[String(type) + "Div"],
        "%": def[String(type) + "RemS"] || def[String(type) + "RemU"],
        "==": def[String(type) + "Eq"],
        "!=": def[String(type) + "Ne"],
        ">": def[String(type) + "Gt"] || def[String(type) + "GtS"],
        "<": def[String(type) + "Lt"] || def[String(type) + "LtS"],
        "<=": def[String(type) + "Le"] || def[String(type) + "LeS"],
        ">=": def[String(type) + "Ge"] || def[String(type) + "GeS"],
        "?": def.If,
        ":": def.Else,
        "&": def[String(type) + "And"],
        "|": def[String(type) + "Or"],
        "^": def[String(type) + "Xor"],
        ">>": def[String(type) + "ShrS"],
        ">>>": def[String(type) + "ShrU"],
        "<<": def[String(type) + "Shl"]
      };
      return mapping[value];
    };
    const I32 = 127;
    const I64 = 126;
    const F32 = 125;
    const F64 = 124;
    const ANYFUNC = 112;
    const FUNC = 96;
    const stringToType = {
      i32: I32,
      i64: I64,
      f32: F32,
      f64: F64
    };
    const getTypeString = (type) => {
      switch (type) {
        case I64:
          return "i64";
        case F32:
          return "f32";
        case F64:
          return "f64";
        case FUNC:
          return "func";
        case ANYFUNC:
          return "anyfunc";
        case I32:
        default:
          return "i32";
      }
    };
    const parseBounds = (node) => {
      const memory = {};
      walkNode({
        [Syntax.Pair]: ({ params }) => {
          const [{ value: key }, { value }] = params;
          memory[key] = parseInt(value);
        }
      })(node);
      return memory;
    };
    const getText$1 = (node) => {
      const value = node.value || "??";
      const hasType = node.type;
      const op = opcodeFromOperator({ value, type: hasType || "i32" });
      if (!hasType) {
        return op.text.replace("i32", "??");
      }
      return op.text;
    };
    const parseParams = (node) => {
      const params = [];
      walkNode({
        [Syntax.Pair]: (pair, _) => {
          params.push(`${pair.params[0].value} ${pair.params[1].value}`);
        },
        [Syntax.Type]: (p) => {
          params.push(p.value);
        }
      })(node);
      return params.length ? " param(" + params.join(" ") + ")" : "";
    };
    const parseResult = (node) => {
      if (node == null) {
        return "";
      }
      return " (result " + (node.type || "??") + ")";
    };
    const typedefString = (node) => {
      const [paramsNode, resultNode] = node.params;
      return "(type " + node.value + ` (func${parseParams(paramsNode)}${parseResult(resultNode)}))`;
    };
    const printFormatted = (add2, print, { value, params }) => {
      if (params.filter(Boolean).length) {
        add2(`(${value}`, 2);
        params.forEach(print);
        add2(")", 0, -2);
      } else {
        add2(`(${value})`, 0, 0);
      }
    };
    const getPrinters = (add2) => ({
      [Syntax.Import]: (node, _print) => {
        const [nodes, mod] = node.params;
        walkNode({
          [Syntax.Pair]: ({ params }, _) => {
            const { value: field } = params[0];
            const type = params[1];
            if (type.value === "Memory") {
              const memory = parseBounds(type);
              add2(`(import "${mod.value}" "${field}" (memory ${memory.initial}${memory.max ? memory.max : ""}))`);
            } else {
              add2(`(import "${mod.value}" "${field}" ${typedefString(type)})`);
            }
          },
          [Syntax.Identifier]: (missing, _) => {
            const { value } = missing;
            add2(`(import "${mod.value}" "${value}" (type ??))`);
          }
        })(nodes);
      },
      [Syntax.Export]: (node, print) => {
        add2("(export", 2);
        node.params.forEach(print);
        add2(")", 0, -2);
      },
      [Syntax.GenericType]: (node, _print) => {
        add2(";; Pseudo type", 0, 0);
        add2("(type-generic " + node.value + ")", 0, 0);
      },
      [Syntax.FunctionCall]: ({ value, params }, print) => {
        printFormatted(add2, print, { value: `call ${value}`, params });
      },
      [Syntax.Block]: ({ params }, print) => {
        printFormatted(add2, print, { value: "block", params });
      },
      [Syntax.NativeMethod]: (node, print) => {
        printFormatted(add2, print, node);
      },
      [Syntax.BinaryExpression]: (node, print) => {
        const text = getText$1(node);
        printFormatted(add2, print, { value: text, params: node.params });
      },
      [Syntax.ArraySubscript]: ({ params }, print) => {
        add2(";; unparsed", 0, 0);
        printFormatted(add2, print, { value: "subscript", params });
      },
      [Syntax.Typedef]: (node, _) => {
        add2(typedefString(node));
      },
      [Syntax.Struct]: (node, print) => {
        add2(";; Pseudo struct type", 0, 0);
        printFormatted(add2, print, {
          value: "type-struct " + node.value,
          params: node.params
        });
      },
      [Syntax.Identifier]: (node) => {
        const scope2 = node.meta[GLOBAL_INDEX] != null ? "global" : "local";
        add2(`(get_${scope2} ${node.value})`);
      },
      [Syntax.Constant]: (node) => {
        add2(`(${String(node.type)}.const ${node.value})`);
      },
      [Syntax.FunctionPointer]: (node) => {
        add2(`(${String(node.type)}.table_pointer ${node.value})`);
      },
      [Syntax.FunctionDeclaration]: (node, print) => {
        const [params, result, ...rest] = node.params;
        add2(`(func ${node.value}${parseParams(params)}${parseResult(result)}`, 2);
        rest.forEach(print);
        add2(")", 0, -2);
      },
      [Syntax.ReturnStatement]: ({ params }, print) => {
        printFormatted(add2, print, { value: "return", params });
      },
      [Syntax.Declaration]: (node, print) => {
        add2("(local " + node.value + " " + String(node.type), 2, 0);
        node.params.forEach(print);
        add2(")", 0, -2);
      },
      [Syntax.ImmutableDeclaration]: (node, print) => {
        const scope2 = node.meta[GLOBAL_INDEX] != null ? "global" : "local";
        if (node.type === "Memory") {
          const memory = parseBounds(node);
          add2(`(memory ${memory.initial}${memory.max ? ` ${memory.max}` : ""})`);
        } else {
          add2(`(${scope2} ` + node.value + " " + String(node.type), 2, 0);
          node.params.forEach(print);
          add2(")", 0, -2);
        }
      },
      [Syntax.StringLiteral]: (node) => {
        add2(`; string "${node.value}"`, 0, 0);
        add2("(i32.const ??)", 0, 0);
      },
      [Syntax.Type]: (node) => {
        add2(node.value);
      },
      [Syntax.TypeCast]: (node, print) => {
        const from = node.params[0];
        const op = getTypecastOpcode(String(node.type), from.type);
        add2("(" + op.text, 2);
        node.params.forEach(print);
        add2(")", 0, -2);
      },
      [Syntax.Access]: ({ params }, print) => {
        add2(";; unparsed", 0, 0);
        printFormatted(add2, print, { value: "access", params });
      },
      [Syntax.MemoryAssignment]: (node, print) => {
        add2("(" + String(node.type) + ".store", 2, 0);
        node.params.forEach(print);
        add2(")", 0, -2);
      },
      [Syntax.Assignment]: (node, print) => {
        const [target, ...params] = node.params;
        const scope2 = target.meta[GLOBAL_INDEX] != null ? "global" : "local";
        add2(`(set_${scope2} ${target.value}`, 2);
        if ([Syntax.ArraySubscript, Syntax.Access].includes(target.Type)) {
          print(target);
        }
        params.forEach(print);
        add2(")", 0, -2);
      },
      [Syntax.TernaryExpression]: (node, print) => {
        const [lhs, rhs, condition] = node.params;
        add2("(select", 2);
        print(lhs);
        print(rhs);
        print(condition);
        add2(")", 0, -2);
      },
      [Syntax.IfThenElse]: (node, print) => {
        const [condition, then, ...rest] = node.params;
        add2("(if", 2);
        print(condition);
        add2("(then", 2);
        print(then);
        add2(")", 0, -2);
        if (rest.length > 0) {
          add2("(else", 2);
          rest.forEach(print);
          add2(")", 0, -2);
        }
        add2(")", 0, -2);
      },
      [Syntax.ObjectLiteral]: (_, __) => {
      }
    });
    const printNode = (node) => {
      if (node == null) {
        return "";
      }
      let depth = 0;
      const offsets = [];
      const pieces = [];
      const add2 = (piece, post = 0, pre = 0) => {
        depth += pre;
        pieces.push(piece);
        offsets.push(depth + piece.length);
        depth += post;
      };
      walkNode(getPrinters(add2))(node);
      const result = pieces.reduce((acc, val, i) => {
        acc += val.padStart(offsets[i], " ") + "\n";
        return acc;
      }, "");
      return result;
    };
    const scopeOperation = curry_1((op, node) => {
      const local = node.meta[LOCAL_INDEX];
      const _global = node.meta[GLOBAL_INDEX];
      const index2 = local != null ? local : _global;
      invariant_1(index2 != null, `Undefined index for scope Operation. Possibly missing metadata. op: ${JSON.stringify(op)} node: ${printNode(node)}`);
      const kind = local != null ? op + "Local" : op + "Global";
      const params = [Number(index2)];
      return {
        kind: def[kind],
        params,
        debug: `${node.value}<${node.meta.ALIAS || node.type}>`
      };
    });
    const getType = (str) => {
      switch (str) {
        case waltSyntax_3.f32:
          return F32;
        case waltSyntax_3.f64:
          return F64;
        case waltSyntax_3.i64:
          return I64;
        case waltSyntax_3.i32:
        default:
          return I32;
      }
    };
    const isBuiltinType = (type) => {
      return typeof type === "string" && waltSyntax_3[type] != null;
    };
    const generateValueType = (node) => ({
      mutable: node.meta[TYPE_CONST] ? 0 : 1,
      type: getType(node.type)
    });
    const setInScope = scopeOperation("Set");
    const getInScope = scopeOperation("Get");
    const GLOBAL_LABEL = "global";
    function validate(ast, {
      filename
    }) {
      const metadata = ast.meta[AST_METADATA];
      if (metadata == null) {
        throw new Error("Missing AST metadata!");
      }
      const { types, functions, userTypes } = metadata;
      const problems = [];
      walkNode({
        [Syntax.Import]: (importNode, _) => {
          walkNode({
            [Syntax.BinaryExpression]: (binary, __) => {
              const [start, end] = binary.range;
              problems.push(generateErrorString("Using an 'as' import without a type.", "A type for original import " + binary.params[0].value + " is not defined nor could it be inferred.", { start, end }, filename, GLOBAL_LABEL));
            },
            [Syntax.Identifier]: (identifier, __) => {
              const [start, end] = identifier.range;
              problems.push(generateErrorString("Infered type not supplied.", "Looks like you'd like to infer a type, but it was never provided by a linker. Non-concrete types cannot be compiled.", { start, end }, filename, GLOBAL_LABEL));
            },
            [Syntax.Pair]: (pair, __) => {
              const type = pair.params[1];
              if (!isBuiltinType(type.value) && types[type.value] == null) {
                const [start, end] = type.range;
                problems.push(generateErrorString(`Undefined Type ${type.value}`, `Invalid Import. ${type.value} type does not exist`, { start, end }, filename, GLOBAL_LABEL));
              }
            }
          })(importNode);
        },
        // All of the validators below need to be implemented
        [Syntax.Struct]: (_, __) => {
        },
        [Syntax.ImmutableDeclaration]: (_, __) => {
        },
        [Syntax.Declaration]: (decl, _validator) => {
          const [start, end] = decl.range;
          if (!isBuiltinType(decl.type) && !types[decl.type] && !userTypes[decl.type]) {
            problems.push(generateErrorString(`Unknown type used in a declaration, "${String(decl.type)}"`, "Variables must be assigned with a known type.", { start, end }, filename, GLOBAL_LABEL));
          }
        },
        [Syntax.FunctionDeclaration]: (func2, __) => {
          const functionName = `${func2.value}()`;
          walkNode({
            [Syntax.Declaration]: (node, _validator) => {
              const [start, end] = node.range;
              if (!isBuiltinType(node.type) && !types[node.type] && !userTypes[node.type]) {
                problems.push(generateErrorString(`Unknown type used in a declartion, "${String(node.type)}"`, "Variables must be assigned with a known type.", { start, end }, filename, functionName));
              }
            },
            [Syntax.Assignment]: (node) => {
              const [identifier] = node.params;
              const [start, end] = node.range;
              const isConst = identifier.meta[TYPE_CONST];
              if (isConst) {
                problems.push(generateErrorString(`Cannot reassign a const variable ${identifier.value}`, "const variables cannot be reassigned, use let instead.", { start, end }, filename, functionName));
              }
            },
            [Syntax.ArraySubscript]: (node) => {
              const [target] = node.params;
              const [start, end] = node.range;
              problems.push(generateErrorString("Invalid subscript target", `Expected array type for ${target.value}, received ${target.type}`, { start, end }, filename, functionName));
            },
            [Syntax.NativeMethod]: (node, _validator) => {
              const { value } = node;
              const [offset = {}, rhs] = node.params;
              const [start, end] = node.range;
              if (!(offset.value === "unreachable" && (value.includes("store") || value.includes("load")))) {
                return;
              }
              problems.push(generateErrorString("Cannot generate property access", `Cannot assign "${rhs.value}". Key is "${offset.value}"`, { start, end }, filename, functionName));
            },
            [Syntax.ReturnStatement]: (node, validator) => {
              node.params.map(validator);
              if (func2.type == null) {
                return;
              }
              const [expression] = node.params;
              const [start] = node.range;
              const end = expression != null ? expression.range[1] : node.range[1];
              const type = node.type;
              if (typeWeight(type) !== typeWeight(func2.type)) {
                problems.push(generateErrorString("Missing return value", "Inconsistent return value. Expected " + func2.type + " received " + String(type), { start, end }, filename, functionName));
              }
            },
            [Syntax.FunctionCall]: (node, _validator) => {
              if (functions[node.value] == null) {
                const [start, end] = node.range;
                problems.push(generateErrorString("Undefined function reference", `${node.value} is not defined.`, { start, end }, filename, functionName));
              }
            },
            [Syntax.IndirectFunctionCall]: (node, _validator) => {
              const identifier = node.params[node.params.length - 1];
              const type = types[identifier.type];
              if (!isBuiltinType(identifier.type) && type == null) {
                const [start, end] = node.range;
                problems.push(generateErrorString("Cannot make an indirect call without a valid function type", `${identifier.value} has type ${String(identifier.type)} which is not defined. Indirect calls must have pre-defined types.`, { start, end }, filename, functionName));
              }
            }
          })(func2);
        }
      })(ast);
      const problemCount = problems.length;
      if (problemCount > 0) {
        const errorString = problems.reduce((acc, value) => {
          return acc + `
${value}
`;
        }, `Cannot generate WebAssembly for ${filename}. ${problemCount} problems.
`);
        throw new Error(errorString);
      }
    }
    const mergeBlock = (block, v) => {
      if (Array.isArray(v)) {
        block = [...block, ...v];
      } else {
        block.push(v);
      }
      return block;
    };
    const generateFunctionCall = (node, parent) => {
      const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
      const metaFunctionIndex = node.meta[FUNCTION_INDEX];
      block.push({
        kind: def.Call,
        params: [metaFunctionIndex],
        debug: `${node.value}<${node.type ? node.type : "void"}>`
      });
      return block;
    };
    const generateIndirectFunctionCall = (node, parent) => {
      const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
      const localIndex = node.meta[LOCAL_INDEX];
      const typeIndexMeta = node.meta[TYPE_INDEX];
      invariant_1(localIndex != null, "Undefined local index, not a valid function pointer");
      invariant_1(typeIndexMeta != null, "Variable is not of a valid function pointer type");
      return [...block, {
        kind: def.CallIndirect,
        params: [typeIndexMeta, 0]
      }];
    };
    const generateBinaryExpression = (node, parent) => {
      const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
      block.push({
        kind: opcodeFromOperator(_extends({}, node, {
          type: node.type
        })),
        params: []
      });
      return block;
    };
    const generateTernary = (node, parent) => {
      const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
      block.push({
        kind: def.Select,
        params: []
      });
      return block;
    };
    const generateIf = (node, parent) => {
      const mapper = mapSyntax(parent);
      const [condition, thenBlock, ...restParams] = node.params;
      return [
        ...[condition].map(mapper).reduce(mergeBlock, []),
        {
          kind: def.If,
          // if-then-else blocks have no return value and the Wasm spec requires us to
          // provide a literal byte '0x40' for "empty block" in these cases
          params: [64]
        },
        // after the expression is on the stack and opcode is following it we can write the
        // implicit 'then' block
        ...[thenBlock].map(mapper).reduce(mergeBlock, []),
        // followed by the optional 'else'
        ...restParams.map(mapper).reduce(mergeBlock, []),
        { kind: def.End, params: [] }
      ];
    };
    const generateFunctionPointer = (node) => {
      return [{
        kind: def.i32Const,
        params: [Number(node.value)]
      }];
    };
    const generateReturn = (node) => {
      const block = node.params.filter(Boolean).map(mapSyntax(null)).reduce(mergeBlock, []);
      block.push({ kind: def.Return, params: [] });
      return block;
    };
    const generateExpression = (node, parent) => [node].map(mapSyntax(parent)).reduce(mergeBlock, []);
    const generateDeclaration = (node, parent) => {
      const initNode = node.params[0];
      if (initNode) {
        const metaIndex = node.meta[LOCAL_INDEX];
        const type = isBuiltinType(node.type) ? node.type : waltSyntax_5;
        return [...generateExpression(_extends({}, initNode, { type }), parent), {
          kind: def.SetLocal,
          params: [metaIndex],
          debug: `${node.value}<${String(node.type)}>`
        }];
      }
      return [];
    };
    const generateAssignment = (node) => {
      const [target, value] = node.params;
      const block = [value].map(mapSyntax(null)).reduce(mergeBlock, []);
      block.push(setInScope(target));
      return block;
    };
    const generateAssignment$2 = (node) => {
      const [target, value] = node.params;
      const block = [value].map(mapSyntax(null)).reduce(mergeBlock, []);
      block.push({
        kind: def.TeeLocal,
        params: [Number(target.meta.LOCAL_INDEX)],
        debug: `${target.value}<${String(target.meta.ALIAS || target.type)}>`
      });
      return block;
    };
    const generateLoop = (node, parent) => {
      const block = [];
      const mapper = mapSyntax(parent);
      const [initializer, condition, ...body] = node.params;
      block.push.apply(block, [initializer].map(mapper).reduce(mergeBlock, []));
      block.push({ kind: def.Block, params: [64] });
      block.push({ kind: def.Loop, params: [64] });
      block.push.apply(block, [condition].map(mapper).reduce(mergeBlock, []));
      block.push({ kind: def.i32Eqz, params: [] });
      block.push({ kind: def.BrIf, params: [1] });
      block.push.apply(block, body.map(mapper).reduce(mergeBlock, []));
      block.push({ kind: def.Br, params: [0] });
      block.push({ kind: def.End, params: [] });
      block.push({ kind: def.End, params: [] });
      return block;
    };
    const generateTypecast = (node, parent) => {
      const metaTypecast = node.meta[TYPE_CAST];
      invariant_1(metaTypecast, `Cannot generate typecast for node: ${JSON.stringify(node)}`);
      const { to, from } = metaTypecast;
      const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
      return [...block, {
        kind: getTypecastOpcode(to, from),
        params: []
      }];
    };
    const generateTypecast$2 = () => {
      return [{
        kind: def.Br,
        params: [2]
      }];
    };
    function generateNoop() {
      return [];
    }
    const generateBlock = (node, parent) => {
      return node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
    };
    const generateElse = (node, parent) => {
      return [{ kind: def.Else, params: [] }, ...node.params.map(mapSyntax(parent)).reduce(mergeBlock, [])];
    };
    const generateSelect = (node, parent) => {
      const [leftHandSide, rightHandSide] = node.params;
      const selectOpcode = { kind: def.Select, params: [] };
      const condition = [leftHandSide].map(mapSyntax(parent)).reduce(mergeBlock, []);
      if (node.value === "&&") {
        return [...[rightHandSide].map(mapSyntax(parent)).reduce(mergeBlock, []), { kind: def.i32Const, params: [0] }, ...condition, selectOpcode];
      }
      return [...condition, ...[rightHandSide].map(mapSyntax(parent)).reduce(mergeBlock, []), ...condition, selectOpcode];
    };
    const alignCodes = {
      load8_s: 0,
      load8_u: 0,
      store8: 0,
      load16_s: 1,
      load16_u: 1,
      store16: 1,
      store32: 2,
      load32_s: 2,
      load32_u: 2,
      store: 2,
      load: 2
    };
    const immediates = {
      grow_memory: 0,
      current_memory: 0
    };
    const generateNative = (node, parent) => {
      const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
      const operation = node.value.split(".").pop();
      if (alignCodes[operation] == null) {
        block.push({ kind: textMap[node.value], params: [immediates[node.value]] });
      } else {
        const alignment = alignCodes[operation];
        block.push({ kind: textMap[node.value], params: [alignment, 0] });
      }
      return block;
    };
    const generateConstant = (node) => {
      const kind = def[String(node.type) + "Const"];
      const value = (node.meta.SIGN || 1) * Number(node.value);
      return [{
        kind,
        params: [value]
      }];
    };
    const syntaxMap = {
      [Syntax.FunctionCall]: generateFunctionCall,
      [Syntax.IndirectFunctionCall]: generateIndirectFunctionCall,
      // Unary
      [Syntax.Constant]: generateConstant,
      [Syntax.BinaryExpression]: generateBinaryExpression,
      [Syntax.TernaryExpression]: generateTernary,
      [Syntax.IfThenElse]: generateIf,
      [Syntax.Else]: generateElse,
      [Syntax.Select]: generateSelect,
      [Syntax.Block]: generateBlock,
      [Syntax.Identifier]: getInScope,
      [Syntax.FunctionIdentifier]: getInScope,
      [Syntax.FunctionPointer]: generateFunctionPointer,
      [Syntax.ReturnStatement]: generateReturn,
      // Binary
      [Syntax.Declaration]: generateDeclaration,
      [Syntax.Assignment]: generateAssignment,
      [Syntax.AssignmentExpression]: generateAssignment$2,
      // Loops
      [Syntax.Loop]: generateLoop,
      [Syntax.Break]: generateTypecast$2,
      // Typecast
      [Syntax.TypeCast]: generateTypecast,
      [Syntax.Noop]: generateNoop,
      [Syntax.NativeMethod]: generateNative
    };
    const mapSyntax = curry_1((parent, operand) => {
      const mapping = syntaxMap[operand.Type];
      invariant_1(mapping, `Unsupported Syntax Token. ${operand.Type} "${operand.value}"`);
      return mapping(operand, parent);
    });
    const generateElement = (functionIndex) => {
      return { functionIndex };
    };
    const EXTERN_FUNCTION = 0;
    const EXTERN_TABLE = 1;
    const EXTERN_MEMORY = 2;
    const EXTERN_GLOBAL = 3;
    const externaKindMap = {
      Memory: EXTERN_MEMORY,
      Table: EXTERN_TABLE
    };
    function generateExport(node) {
      const functionIndexMeta = node.meta[FUNCTION_INDEX];
      const globalIndexMeta = node.meta[GLOBAL_INDEX];
      if (globalIndexMeta != null) {
        const kind = externaKindMap[String(node.type)] || EXTERN_GLOBAL;
        const index2 = [EXTERN_MEMORY, EXTERN_TABLE].includes(kind) ? 0 : globalIndexMeta;
        return {
          index: index2,
          kind,
          field: node.value
        };
      }
      return {
        index: functionIndexMeta,
        kind: EXTERN_FUNCTION,
        field: node.value
      };
    }
    const generateMemory = (node) => {
      const memory = { max: 0, initial: 0 };
      walkNode({
        [Syntax.Pair]: ({ params }) => {
          const [{ value: key }, { value }] = params;
          memory[key] = parseInt(value);
        }
      })(node);
      return memory;
    };
    function generateMemory$2(node) {
      const table = { max: 0, initial: 0, type: "element" };
      walkNode({
        [Syntax.Pair]: ({ params }) => {
          const [{ value: key }, { value }] = params;
          switch (key) {
            case "initial":
              table.initial = parseInt(value);
              break;
            case "element":
              table.type = value;
              break;
            case "max":
              table.max = parseInt(value);
              break;
          }
        }
      })(node);
      return table;
    }
    const generateInit = (node) => {
      const _global = generateValueType(node);
      const [initializer] = node.params;
      if (initializer != null) {
        const { value } = initializer;
        switch (_global.type) {
          case F32:
          case F64:
            _global.init = parseFloat(value);
            break;
          case I32:
          case I64:
          default:
            _global.init = parseInt(value);
        }
      }
      return _global;
    };
    const getKindConstant = (value) => {
      switch (value) {
        case "Memory":
          return EXTERN_MEMORY;
        case "Table":
          return EXTERN_TABLE;
        case "i32":
        case "f32":
        case "i64":
        case "f64":
          return EXTERN_GLOBAL;
        default:
          return EXTERN_FUNCTION;
      }
    };
    const getFieldName = (node) => {
      let name = node.value;
      if (node.meta.AS != null) {
        return node.meta.AS;
      }
      return name;
    };
    function generateImportFromNode(node) {
      const [importsNode, moduleStringLiteralNode] = node.params;
      const { value: module } = moduleStringLiteralNode;
      const imports = [];
      walkNode({
        [Syntax.Pair]: (pairNode, _) => {
          const [fieldIdentifierNode, typeOrIdentifierNode] = pairNode.params;
          const field = getFieldName(fieldIdentifierNode);
          const { value: importTypeValue } = typeOrIdentifierNode;
          const kind = getKindConstant(importTypeValue);
          const typeIndex = (() => {
            const typeIndexMeta = typeOrIdentifierNode.meta[TYPE_INDEX];
            if (typeIndexMeta) {
              return typeIndexMeta;
            }
            return null;
          })();
          const bounds = importTypeValue === "Memory" ? parseBounds(typeOrIdentifierNode) : {};
          imports.push(_extends({
            module,
            field,
            global: kind === EXTERN_GLOBAL,
            kind,
            type: stringToType[importTypeValue],
            typeIndex
          }, bounds));
        }
      })(importsNode);
      return imports;
    }
    const getType$1 = (str) => {
      switch (str) {
        case "f32":
          return F32;
        case "f64":
          return F64;
        case "i64":
          return I64;
        case "i32":
        case "Function":
        default:
          return I32;
      }
    };
    const generateImplicitFunctionType = (functionNode) => {
      const [argsNode] = functionNode.params;
      const resultType = functionNode.type ? getType$1(functionNode.type) : null;
      const params = [];
      walkNode({
        [Syntax.Pair]: (pairNode) => {
          const typeNode = pairNode.params[1];
          invariant_1(typeNode, "Undefined type in a argument expression");
          params.push(getType$1(typeNode.value));
        }
      })(argsNode);
      return {
        params,
        result: resultType,
        id: functionNode.value
      };
    };
    function generateType(node) {
      const id2 = node.value;
      invariant_1(typeof id2 === "string", `Generator: A type must have a valid string identifier, node: ${JSON.stringify(node)}`);
      const [args, result] = node.params;
      const params = [];
      walkNode({
        [Syntax.DeclType]: (t, __) => {
          params.push(getType$1(t.value));
        },
        [Syntax.Type]: (t, __) => {
          params.push(getType$1(t.value));
        },
        // Generate Identifiers as UserType pointers, so i32s
        [Syntax.Identifier]: (t, __) => {
          params.push(getType$1(t.value));
        }
      })(args);
      return {
        id: id2,
        params,
        result: result.type && result.type !== "void" ? getType$1(result.type) : null
      };
    }
    function generateData(statics, DATA_SECTION_HEADER_SIZE2) {
      let offsetAccumulator = DATA_SECTION_HEADER_SIZE2;
      const map2 = {};
      const data = Object.entries(statics).reduce((acc, [key, encoded]) => {
        acc.push({ offset: Number(offsetAccumulator), data: encoded });
        map2[key] = offsetAccumulator;
        offsetAccumulator += encoded.size;
        return acc;
      }, []);
      const lengthStream = new OutputStream();
      lengthStream.push(index_12, offsetAccumulator, String(offsetAccumulator));
      return {
        data: [{ offset: 0, data: lengthStream }, ...data],
        map: map2
      };
    }
    const DATA_SECTION_HEADER_SIZE = 4;
    const generateCode = (func2) => {
      const [argsNode, resultNode, ...body] = func2.params;
      const metadata = func2.meta[FUNCTION_METADATA];
      invariant_1(body, "Cannot generate code for function without body");
      invariant_1(metadata, "Cannot generate code for function without metadata");
      const { locals, argumentsCount } = metadata;
      const block = {
        code: [],
        // On this Episode of ECMAScript Spec: Object own keys traversal!
        // Sometimes it pays to know the spec. Keys are traversed in the order
        // they are added to the object. This includes Object.keys. Because the AST is traversed
        // depth-first we can guarantee that arguments will also be added first
        // to the locals object. We can depend on the spec providing the keys,
        // such that we can slice away the number of arguments and get DECLARED locals _only_.
        locals: Object.keys(locals).slice(argumentsCount).map((key) => generateValueType(locals[key])),
        debug: `Function ${func2.value}`
      };
      block.code = body.map(mapSyntax(block)).reduce(mergeBlock, []);
      return block;
    };
    function generator(ast, config) {
      const program = {
        Version: config.version,
        Types: [],
        Start: [],
        Element: [],
        Code: [],
        Exports: [],
        Imports: [],
        Globals: [],
        Functions: [],
        Memory: [],
        Table: [],
        Artifacts: [],
        Data: [],
        Name: {
          module: config.filename,
          functions: [],
          locals: []
        }
      };
      let { statics } = ast.meta[AST_METADATA];
      if (config.linker != null) {
        statics = _extends({}, config.linker.statics, statics);
      }
      const { map: staticsMap, data } = generateData(statics, DATA_SECTION_HEADER_SIZE);
      if (Object.keys(statics).length > 0) {
        program.Data = data;
      }
      const findTypeIndex = (functionNode) => {
        const search = generateImplicitFunctionType(functionNode);
        return program.Types.findIndex((t) => {
          const paramsMatch = t.params.length === search.params.length && t.params.reduce((a, v, i) => a && v === search.params[i], true);
          const resultMatch = t.result === search.result;
          return paramsMatch && resultMatch;
        });
      };
      const findTableIndex = (functionIndex) => program.Element.findIndex((n) => n.functionIndex === functionIndex);
      const typeMap = {};
      const astWithTypes = mapNode_2({
        [Syntax.Typedef]: (node, _ignore) => {
          let typeIndex = program.Types.findIndex(({ id: id2 }) => id2 === node.value);
          let typeNode = program.Types[typeIndex];
          if (typeNode == null) {
            typeIndex = program.Types.length;
            program.Types.push(generateType(node));
          }
          typeNode = _extends({}, node, {
            meta: _extends({}, node.meta, { [TYPE_INDEX]: typeIndex })
          });
          typeMap[node.value] = { typeIndex, typeNode };
          return typeNode;
        }
      })(mapNode_2({
        [Syntax.Import]: (node, _) => node,
        [Syntax.StringLiteral]: (node, _ignore) => {
          const { value } = node;
          if (staticsMap[value] == null) {
            return node;
          }
          return _extends({}, node, {
            value: String(staticsMap[value]),
            Type: Syntax.Constant
          });
        },
        [Syntax.StaticValueList]: (node) => {
          const { value } = node;
          return _extends({}, node, {
            value: String(staticsMap[value]),
            Type: Syntax.Constant
          });
        }
      })(ast));
      const nodeMap = {
        [Syntax.Typedef]: (_, __) => _,
        [Syntax.Export]: (node) => {
          const [nodeToExport] = node.params;
          program.Exports.push(generateExport(nodeToExport));
        },
        [Syntax.ImmutableDeclaration]: (node) => {
          switch (node.type) {
            case "Memory":
              program.Memory.push(generateMemory(node));
              break;
            case "Table":
              program.Table.push(generateMemory$2(node));
              break;
          }
        },
        [Syntax.Declaration]: (node) => {
          const globalMeta = node.meta[GLOBAL_INDEX];
          if (globalMeta != null) {
            program.Globals.push(generateInit(node));
          }
        },
        [Syntax.Import]: (node) => {
          program.Imports.push(...generateImportFromNode(node));
        },
        [Syntax.FunctionDeclaration]: (node) => {
          const typeIndex = (() => {
            const index3 = findTypeIndex(node);
            if (index3 === -1) {
              program.Types.push(generateImplicitFunctionType(node));
              return program.Types.length - 1;
            }
            return index3;
          })();
          const patched = mapNode_2({
            FunctionPointer(pointer) {
              const metaFunctionIndex = pointer.meta[FUNCTION_INDEX];
              const functionIndex = metaFunctionIndex;
              let tableIndex = findTableIndex(functionIndex);
              if (tableIndex < 0) {
                tableIndex = program.Element.length;
                program.Element.push(generateElement(functionIndex));
              }
              return pointer;
            }
          })(node);
          const index2 = node.meta[FUNCTION_INDEX];
          invariant_1(index2 != null, "Function index must be set");
          program.Functions[index2] = typeIndex;
          program.Code[index2] = generateCode(patched);
          if (patched.value === "start") {
            program.Start.push(index2);
          }
          if (config.encodeNames) {
            program.Name.functions.push({
              index: index2,
              name: node.value
            });
            const functionMetadata = node.meta[FUNCTION_METADATA];
            if (functionMetadata != null && Object.keys(functionMetadata.locals).length) {
              program.Name.locals[index2] = {
                index: index2,
                locals: Object.entries(functionMetadata.locals).map(([name, local]) => {
                  return {
                    name,
                    index: Number(local.meta["local/index"])
                  };
                })
              };
            }
          }
        }
      };
      walkNode(nodeMap)(astWithTypes);
      program.Code = program.Code.filter(Boolean);
      return program;
    }
    const VERSION_1 = 1;
    const MAGIC = 1836278016;
    function write(version) {
      return new OutputStream().push(index_12, MAGIC, "\\0asm").push(index_12, version, `version ${version}`);
    }
    const varuint7 = "varuint7";
    const varuint32 = "varuint32";
    const varint7 = "varint7";
    const varint1 = "varint1";
    const varint32 = "varint32";
    const varint64 = "varint64";
    function emitString(stream, string, debug) {
      stream.push(varuint32, string.length, debug);
      for (let i = 0; i < string.length; i++) {
        stream.push(index_9, string.charCodeAt(i), string[i]);
      }
      return stream;
    }
    const emit$1 = (entries) => {
      const payload = new OutputStream().push(varuint32, entries.length, "entry count");
      entries.forEach((entry) => {
        emitString(payload, entry.module, "module");
        emitString(payload, entry.field, "field");
        switch (entry.kind) {
          case EXTERN_GLOBAL: {
            payload.push(index_9, EXTERN_GLOBAL, "Global");
            payload.push(index_9, entry.type, getTypeString(entry.type));
            payload.push(index_9, 0, "immutable");
            break;
          }
          case EXTERN_FUNCTION: {
            payload.push(index_9, entry.kind, "Function");
            payload.push(varuint32, entry.typeIndex, "type index");
            break;
          }
          case EXTERN_TABLE: {
            payload.push(index_9, entry.kind, "Table");
            payload.push(index_9, ANYFUNC, "function table types");
            payload.push(varint1, 0, "has max value");
            payload.push(varuint32, 0, "iniital table size");
            break;
          }
          case EXTERN_MEMORY: {
            payload.push(index_9, entry.kind, "Memory");
            payload.push(varint1, !!entry.max, "has no max");
            payload.push(varuint32, entry.initial, "initial memory size(PAGES)");
            if (entry.max) {
              payload.push(varuint32, entry.max, "max memory size(PAGES)");
            }
            break;
          }
        }
      });
      return payload;
    };
    const emit$2 = (exports3) => {
      const payload = new OutputStream();
      payload.push(varuint32, exports3.length, "count");
      exports3.forEach(({ field, kind, index: index2 }) => {
        emitString(payload, field, "field");
        payload.push(index_9, kind, "Global");
        payload.push(varuint32, index2, "index");
      });
      return payload;
    };
    const encode2 = (payload, { type, init, mutable }) => {
      payload.push(index_9, type, getTypeString(type));
      payload.push(index_9, mutable, "mutable");
      switch (type) {
        case I32:
          payload.push(index_9, def.i32Const.code, def.i32Const.text);
          payload.push(varint32, init, `value (${init})`);
          break;
        case F32:
          payload.push(index_9, def.f32Const.code, def.f32Const.text);
          payload.push(index_3, init, `value (${init})`);
          break;
        case F64:
          payload.push(index_9, def.f64Const.code, def.f64Const.text);
          payload.push(index_4, init, `value (${init})`);
          break;
        case I64:
          payload.push(index_9, def.i64Const.code, def.i64Const.text);
          payload.push(varint64, init, `value (${init})`);
      }
      payload.push(index_9, def.End.code, "end");
    };
    const emit$3 = (globals) => {
      const payload = new OutputStream();
      payload.push(varuint32, globals.length, "count");
      globals.forEach((g) => encode2(payload, g));
      return payload;
    };
    const emit$4 = (functions) => {
      functions = functions.filter((func2) => func2 !== null);
      const stream = new OutputStream();
      stream.push(varuint32, functions.length, "count");
      functions.forEach((index2) => stream.push(varuint32, index2, "type index"));
      return stream;
    };
    function emitTables(start) {
      const stream = new OutputStream();
      stream.push(varuint32, start[0], "start function");
      return stream;
    }
    const emitElement = (stream) => ({ functionIndex }, index2) => {
      stream.push(varuint32, 0, "table index");
      stream.push(index_9, def.i32Const.code, "offset");
      stream.push(varuint32, index2, index2.toString());
      stream.push(index_9, def.End.code, "end");
      stream.push(varuint32, 1, "number of elements");
      stream.push(varuint32, functionIndex, "function index");
    };
    const emit$5 = (elements) => {
      const stream = new OutputStream();
      stream.push(varuint32, elements.length, "count");
      elements.forEach(emitElement(stream));
      return stream;
    };
    const emitType = (stream, { params, result }, index2) => {
      stream.push(varint7, FUNC, `func type (${index2})`);
      stream.push(varuint32, params.length, "parameter count");
      params.forEach((type) => stream.push(varint7, type, "param"));
      if (result) {
        stream.push(varint1, 1, "result count");
        stream.push(varint7, result, `result type ${getTypeString(result)}`);
      } else {
        stream.push(varint1, 0, "result count");
      }
    };
    const emit$6 = (types) => {
      const stream = new OutputStream();
      stream.push(varuint32, types.length, "count");
      types.forEach((type, index2) => emitType(stream, type, index2));
      return stream;
    };
    const emitLocal = (stream, local) => {
      stream.push(varuint32, 1, "number of locals of following type");
      stream.push(varint7, local.type, `${getTypeString(local.type)}`);
    };
    const emitFunctionBody = (stream, { locals, code, debug: functionName }) => {
      const body = new OutputStream();
      code.forEach(({ kind, params, debug }) => {
        invariant_1(typeof kind !== "undefined", `Fatal error! Generated undefined opcode. debug code: ${JSON.stringify(debug)}`);
        body.push(index_9, kind.code, `${kind.text}  ${debug ? debug : ""}`);
        params.filter((p) => typeof p !== "undefined").forEach((p) => {
          let type = varuint32;
          let stringType = "i32.literal";
          if (kind.code >= 40 && kind.code <= 64) {
            type = varuint32;
            stringType = "memory_immediate";
          } else {
            switch (kind.result) {
              case index_4:
                type = index_4;
                stringType = "f64.literal";
                break;
              case index_3:
                type = index_3;
                stringType = "f32.literal";
                break;
              case index_1:
                type = varint32;
                stringType = "i32.literal";
                break;
              case index_2:
                type = varint64;
                stringType = "i64.literal";
                break;
              default:
                type = varuint32;
            }
          }
          body.push(type, p, `${stringType}`);
        });
      });
      const localsStream = new OutputStream();
      locals.forEach((local) => emitLocal(localsStream, local));
      stream.push(varuint32, body.size + localsStream.size + 2, functionName);
      stream.push(varuint32, locals.length, "locals count");
      stream.write(localsStream);
      stream.write(body);
      stream.push(index_9, def.End.code, "end");
    };
    const emit$7 = (functions) => {
      const stream = new OutputStream();
      stream.push(varuint32, functions.length, "function count");
      functions.forEach((func2) => emitFunctionBody(stream, func2));
      return stream;
    };
    const emitEntry = (payload, entry) => {
      payload.push(varint1, entry.max ? 1 : 0, "has no max");
      payload.push(varuint32, entry.initial, "initial memory size(PAGES)");
      if (entry.max) {
        payload.push(varuint32, entry.max, "max memory size(PAGES)");
      }
    };
    const emit$8 = (memories) => {
      const stream = new OutputStream();
      stream.push(varuint32, memories.length, "count");
      memories.forEach((entry) => emitEntry(stream, entry));
      return stream;
    };
    const typeBytecodes = {
      anyfunc: 112
    };
    const emitEntry$1 = (payload, entry) => {
      payload.push(varint7, typeBytecodes[entry.type], entry.type);
      payload.push(varint1, entry.max ? 1 : 0, "has max");
      payload.push(varuint32, entry.initial, "initial table size");
      if (entry.max) {
        payload.push(varuint32, entry.max, "max table size");
      }
    };
    function emitTables$1(tables) {
      const stream = new OutputStream();
      stream.push(varuint32, tables.length, "count");
      tables.forEach((entry) => emitEntry$1(stream, entry));
      return stream;
    }
    const emitDataSegment = (stream, segment) => {
      stream.push(varuint32, 0, "memory index");
      const { offset, data } = segment;
      stream.push(index_9, def.i32Const.code, def.i32Const.text);
      stream.push(varint32, offset, `segment offset (${offset})`);
      stream.push(index_9, def.End.code, "end");
      stream.push(varuint32, data.size, "segment size");
      stream.write(data);
    };
    function emit$9(dataSection) {
      const stream = new OutputStream();
      stream.push(varuint32, dataSection.length, "entries");
      for (let i = 0, len = dataSection.length; i < len; i++) {
        const segment = dataSection[i];
        emitDataSegment(stream, segment);
      }
      return stream;
    }
    const emitModuleName = (name) => {
      const moduleSubsection = new OutputStream();
      emitString(moduleSubsection, name, `name_len: ${name}`);
      return moduleSubsection;
    };
    const emitFunctionNames = (names) => {
      const stream = new OutputStream();
      stream.push(varuint32, names.length, `count: ${String(names.length)}`);
      names.forEach(({ index: index2, name }) => {
        stream.push(varuint32, index2, `index: ${String(index2)}`);
        emitString(stream, name, `name_len: ${name}`);
      });
      return stream;
    };
    const emitLocals = (localsMap) => {
      const stream = new OutputStream();
      stream.push(varuint32, localsMap.length, `count: ${String(localsMap.length)}`);
      localsMap.forEach(({ index: funIndex, locals }) => {
        stream.push(varuint32, funIndex, `function index: ${String(funIndex)}`);
        stream.push(varuint32, locals.length, `number of params and locals ${locals.length}`);
        locals.forEach(({ index: index2, name }) => {
          stream.push(varuint32, index2, `index: ${String(index2)}`);
          emitString(stream, name, `name_len: ${name}`);
        });
      });
      return stream;
    };
    const emit$10 = (nameSection) => {
      const stream = new OutputStream();
      emitString(stream, "name", "name_len: name");
      const moduleSubsection = emitModuleName(nameSection.module);
      stream.push(varuint7, 0, "name_type: Module");
      stream.push(varuint32, moduleSubsection.size, "name_payload_len");
      stream.write(moduleSubsection);
      const functionSubsection = emitFunctionNames(nameSection.functions);
      stream.push(varuint7, 1, "name_type: Function");
      stream.push(varuint32, functionSubsection.size, "name_payload_len");
      stream.write(functionSubsection);
      const localsSubsection = emitLocals(nameSection.locals);
      stream.push(varuint7, 2, "name_type: Locals");
      stream.push(varuint32, localsSubsection.size, "name_payload_len");
      stream.write(localsSubsection);
      return stream;
    };
    const SECTION_TYPE = 1;
    const SECTION_IMPORT = 2;
    const SECTION_FUNCTION = 3;
    const SECTION_TABLE = 4;
    const SECTION_MEMORY = 5;
    const SECTION_GLOBAL = 6;
    const SECTION_EXPORT = 7;
    const SECTION_START = 8;
    const SECTION_ELEMENT = 9;
    const SECTION_CODE = 10;
    const SECTION_DATA = 11;
    const SECTION_NAME = 0;
    const writer = ({
      type,
      label,
      emitter
    }) => (ast) => {
      const field = ast[label];
      if (!field || Array.isArray(field) && !field.length) {
        return null;
      }
      const stream = new OutputStream().push(index_9, type, label + " section");
      const entries = emitter(field);
      stream.push(varuint32, entries.size, "size");
      stream.write(entries);
      return stream;
    };
    var section = {
      type: writer({ type: SECTION_TYPE, label: "Types", emitter: emit$6 }),
      imports: writer({ type: SECTION_IMPORT, label: "Imports", emitter: emit$1 }),
      function: writer({
        type: SECTION_FUNCTION,
        label: "Functions",
        emitter: emit$4
      }),
      table: writer({ type: SECTION_TABLE, label: "Table", emitter: emitTables$1 }),
      memory: writer({ type: SECTION_MEMORY, label: "Memory", emitter: emit$8 }),
      exports: writer({
        type: SECTION_EXPORT,
        label: "Exports",
        emitter: emit$2
      }),
      globals: writer({ type: SECTION_GLOBAL, label: "Globals", emitter: emit$3 }),
      start: writer({ type: SECTION_START, label: "Start", emitter: emitTables }),
      element: writer({
        type: SECTION_ELEMENT,
        label: "Element",
        emitter: emit$5
      }),
      code: writer({ type: SECTION_CODE, label: "Code", emitter: emit$7 }),
      data: writer({ type: SECTION_DATA, label: "Data", emitter: emit$9 }),
      name: writer({ type: SECTION_NAME, label: "Name", emitter: emit$10 })
    };
    function emit(program, config) {
      const stream = new OutputStream();
      const result = stream.write(write(program.Version)).write(section.type(program)).write(section.imports(program)).write(section.function(program)).write(section.table(program)).write(section.memory(program)).write(section.globals(program)).write(section.exports(program)).write(section.start(program)).write(section.element(program)).write(section.code(program)).write(section.data(program));
      if (config.encodeNames) {
        return result.write(section.name(program));
      }
      return result;
    }
    const _debug = (stream, begin = 0, end) => {
      let pc = 0;
      return stream.data.slice(begin, end).map(({ type, value, debug }) => {
        const pcString = `${pc.toString()} 0x${pc.toString(16)}`.padStart(6, " ").padEnd(stream.data.length.toString().length + 1);
        let valueString;
        if (Array.isArray(value)) {
          valueString = value.map((v) => v.toString(16)).join().padStart(16);
        } else {
          valueString = value.toString(16).padStart(16);
        }
        const out = `${pcString}: ${valueString} ; ${debug}`;
        pc += index_16[type] || value.length;
        return out;
      }).join("\n") + "\n ============ fin =============";
    };
    const makeFragment = (parser) => {
      const parse = (src) => {
        try {
          return parser(`function fragment() {
        ${src}
      }`).params[0].params[2].params[0];
        } catch (e) {
          throw new Error(`PANIC - Invalid fragment input:

${src}

Parse Error: ${e.stack}`);
        }
      };
      return (template, ...replacements) => {
        let expandNodes = false;
        const source = template.reduce((a, v, i) => {
          const rep = replacements[i];
          if (rep != null && typeof rep !== "object") {
            return a += v + String(rep);
          }
          if (rep != null) {
            expandNodes = true;
            return a += v + `$$rep_${i}`;
          }
          return a += v;
        }, "");
        const node = parse(source);
        if (expandNodes) {
          return mapNode_2({
            Identifier(id2) {
              const { value: name } = id2;
              if (!name.indexOf("$$rep_")) {
                return replacements[Number(name.replace("$$rep_", ""))];
              }
              return id2;
            }
          })(node);
        }
        return node;
      };
    };
    const VERSION2 = "0.21.0";
    const getIR = (source, config) => {
      const {
        version = VERSION_1,
        encodeNames = false,
        lines = source.split("\n"),
        filename = "unknown",
        extensions = []
      } = config || {};
      const parser = makeParser([]);
      const stmt = makeFragment(parser);
      const options = {
        version,
        encodeNames,
        lines,
        filename,
        extensions
      };
      const ast = parser(source);
      const semanticAST = semantics(ast, [], _extends({}, options, { parser, stmt }));
      validate(semanticAST, { lines, filename });
      const intermediateCode = generator(semanticAST, options);
      const wasm = emit(intermediateCode, {
        version,
        encodeNames,
        filename,
        lines
      });
      return wasm;
    };
    const compile3 = (source, config) => {
      const {
        filename = "unknown.walt",
        extensions = [],
        linker,
        encodeNames = false
      } = config || {};
      const options = {
        filename,
        lines: source.split("\n"),
        version: VERSION_1,
        encodeNames
      };
      const plugins2 = extensions.reduce((acc, plugin) => {
        const instance = _extends({
          semantics: (_) => ({}),
          grammar: () => ({ ParserRules: [] })
        }, plugin(options));
        acc.grammar.push(instance.grammar);
        acc.semantics.push(instance.semantics);
        return acc;
      }, {
        grammar: [],
        semantics: []
      });
      const parser = makeParser(plugins2.grammar);
      const stmt = makeFragment(parser);
      const ast = parser(source);
      const semanticAST = semantics(ast, plugins2.semantics, {
        parser,
        stmt
      });
      validate(semanticAST, options);
      const intermediateCode = generator(semanticAST, _extends({}, options, { linker }));
      const wasm = emit(intermediateCode, options);
      return {
        wasm,
        buffer() {
          return wasm.buffer();
        },
        ast,
        semanticAST
      };
    };
    exports2.makeParser = makeParser;
    exports2.makeFragment = makeFragment;
    exports2.semantics = semantics;
    exports2.validate = validate;
    exports2.generator = generator;
    exports2.emitter = emit;
    exports2.prettyPrintNode = printNode;
    exports2.debug = _debug;
    exports2.stringEncoder = stringEncoder;
    exports2.stringDecoder = stringDecoder;
    exports2.walkNode = walkNode;
    exports2.mapNode = mapNode_2;
    exports2.VERSION = VERSION2;
    exports2.getIR = getIR;
    exports2.compile = compile3;
    return exports2;
  }({});
  var walt_default = Walt;

  // plugins/walt/index.js
  var compile = (source) => walt_default.compile(source).buffer();
  var compileWalt = (source) => source.trim().length ? JSON.stringify([...new Uint8Array(walt_default.compile(source).buffer())]) : "[]";
  var bindThis = (_this) => {
    const result = {};
    Object.getOwnPropertyNames(Object.getPrototypeOf(_this)).filter((n) => ![
      "constructor",
      "nanoapp",
      "initial_state",
      "initial_component",
      "css",
      "__walt",
      "__src",
      "init"
    ].includes(n)).map((fn) => result[fn] = _this[fn].bind(_this));
    return result;
  };
  var initWalt = (source, _this) => {
    if (source.length) {
      const table = new WebAssembly.Table({
        initial: 10,
        element: "anyfunc"
      });
      const exports2 = new WebAssembly.Instance(
        new WebAssembly.Module(new Uint8Array(source).buffer),
        {
          tag: bindThis(_this),
          console,
          // global javascript console
          javascript: {
            table,
            setTimeout: (callback, interval) => window.setTimeout(table.get(callback), interval),
            setInterval
          }
        }
      ).exports;
      const result = {};
      Object.keys(exports2).map((fn) => result[fn] = exports2[fn]);
      return result;
    }
    return {};
  };
  var walt_default2 = {
    name: "Walt",
    uniqueBlock: "walt",
    compileWalt,
    compile,
    initWalt
  };

  // plugins/min.css/min.css.js
  function mincss(css) {
    return css;
    function hue2rgb(m1, m2, hue) {
      var v;
      if (hue < 0)
        hue += 1;
      else if (hue > 1)
        hue -= 1;
      if (6 * hue < 1)
        v = m1 + (m2 - m1) * hue * 6;
      else if (2 * hue < 1)
        v = m2;
      else if (3 * hue < 2)
        v = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
      else
        v = m1;
      return 255 * v;
    }
    function hsl2rgb(h, s, l) {
      var m1, m2, hue, r, g, b, M = Math;
      s /= 100;
      l /= 100;
      if (!s)
        r = g = b = l * 255;
      else {
        if (l <= 0.5)
          m2 = l * (s + 1);
        else
          m2 = l + s - l * s;
        m1 = l * 2 - m2;
        hue = h / 360;
        r = M.ceil(hue2rgb(m1, m2, hue + 1 / 3));
        g = M.ceil(hue2rgb(m1, m2, hue));
        b = M.ceil(hue2rgb(m1, m2, hue - 1 / 3));
      }
      return {
        r,
        g,
        b
      };
    }
    function rgb2hex(r, g, b) {
      return "#" + ((1 << 24) + (1 * r << 16) + (1 * g << 8) + 1 * b).toString(16).slice(1);
    }
    var whiteSpacePlaceHolder = "|_|";
    return String(css).replace(/(:not\(.*?\))\s+(?!{)/g, "$1" + whiteSpacePlaceHolder).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\s+/g, " ").replace(/^\s+/g, "").replace(/ \{/g, "{").replace(/\;\}/g, "}").replace(/ ([+~>]) /g, "$1").replace(/([\: ,\(\)\\/])(\-*0+)(%|px|pt|pc|rem|em|ex|cm|mm|in)([, ;\(\)}\/]*?)/g, "$10$4").replace(/([: ,=\-\(\{\}])0+\.(\d)/g, "$1.$2").replace(/([^\}]*\{\s*?\})/g, "").replace(/(\*)([.:\[])/g, "$2").replace(/(\[)([^"' \]]+)(["'])([^"' \]]+)(\3)(\])/g, "$1$2$4$6").replace(/(?:{)([^{}]+?)(?:})/g, function(m, s) {
      var url = [], r = [];
      s = s.replace(/(url\s*\([^)]*\))/g, function(m2) {
        url.push(m2);
        return "$" + (url.length - 1) + "$";
      });
      s = s.match(/([a-z\-]+)\:(.+?)(;|$)/gi);
      for (var i = 0; i < s.length; i++) {
        s[i] = /([a-z\-]+)\:(.+?)(;|$)/i.exec(s[i]);
        if (s[i])
          s[i][2] = s[i][2].replace(/\$([0-9]+)\$/g, function(m2, k) {
            return url[k] || "";
          });
      }
      m = {};
      for (var i = 0; i < s.length; i++) {
        if (s[i]) {
          if (s[i][1] == "background" || s[i][1] == "background-image") {
            r.push(s[i][1] + ":" + s[i][2]);
            continue;
          }
          m[s[i][1]] = s[i][2];
        }
      }
      for (var i in m)
        r.push(i + ":" + m[i]);
      return "{" + r.join(";") + "}";
    }).replace(/ (\!important)/g, "$1").replace(/\:(\:before|\:after)/g, "$1").replace(/(rgb|rgba|hsl|hsla)\s*\(\s*(\d+)[, %]+(\d+)[, %]+(\d+)[, %]+?([0-1]?)\s*\)/g, function(m, t, v1, v2, v3, v4) {
      if (v4 === "0")
        return " transparent ";
      t = t.toLowerCase();
      if (!t.indexOf("hsl")) {
        var o = hsl2rgb(v1, v2, v3);
        v1 = o.r;
        v2 = o.g;
        v3 = o.b;
      }
      return rgb2hex(v1, v2, v3);
    }).replace(/([,: \(]#)([0-9a-f])\2([0-9a-f])\3([0-9a-f])\4/gi, "$1$2$3$4").replace(/ ?([\(\)\{\}\:\;\,]) /g, "$1").replace(/(margin|padding|border-width|border-color|border-style)\:([^;}]+)/gi, function(m, k, v) {
      function chk() {
        var a = arguments, o2 = a.length > 1 ? a : a.length == 1 ? a[0] : [];
        for (var i = 0; i < o2.length; i++) {
          if (i == 0)
            continue;
          if (o2[i] != o2[i - 1])
            return false;
        }
        return true;
      }
      var o = v.toLowerCase().split(" ");
      var r = v;
      if (chk(o))
        r = o[0];
      else if (o.length == 4 && chk(o[0], o[2]) && chk(o[1], o[3]) || o.length == 3 && chk(o[0], o[2]))
        r = o[0] + " " + o[1];
      else if (o.length == 4 && chk(o[1], o[3]))
        r = o[0] + " " + o[1] + " " + o[2];
      r = k + ":" + r;
      return r;
    }).replace(/\:\s*calc\(([^;}]+)/g, function($0) {
      return $0.replace(/\s+/g, "").replace(/([-+*/]+)/g, " $1 ").replace(/(--)\s/g, "$1");
    }).replace(/\|_\|/g, " ");
  }
  var min_css_default = mincss;

  // plugins/min.css/index.js
  var min_default = {
    name: "min.css",
    processStyle: min_css_default
  };

  // src/plugins.js
  var plugins = {
    walt: walt_default2,
    mincss: min_default
  };
  var plugins_default = plugins;

  // src/runtime/baseClass.js
  var baseClassMixin = (superclass) => class baseClass extends superclass {
    baseInit() {
      this.component = this.initial_component;
      toProto(this.component);
      this.animate = TinyAnimate_default.animate;
      this.Spring = Spring;
      this.window_events = {};
      this.checkStateObjectChanges = {};
      this.state = this.initial_state;
      if (this.__walt) {
        this.walt = plugins_default.walt.initWalt(this.__walt, this, this.state);
      }
      delete this.__proto__.baseInit;
    }
    async connectedCallback() {
      if (this.renderer && !this.__rendererHTML && this.__rendererName !== this.parent.__rendererName) {
        throw `ui.js diffferent renderers ${this.__rendererName} and ${this.parent.__rendererName}`;
      }
      Enter_Children(this.document, this.component, { state: this.state });
      this.is_connected = true;
      if (this.connected)
        this.connected();
    }
    async disconnectedCallback() {
      this.disconnected && await this.disconnected();
      Object.keys(this.window_events).forEach(
        (event) => this.window_events[event].forEach(
          (callback) => window.removeEventListener(event, callback.cb)
        )
      );
    }
    render() {
      if (this.is_connected)
        UPDATE_Chidldren(this.document, this.component, { state: this.state });
    }
    attributeChangedCallback(key, old, value) {
      if (typeof value === "object") {
        if (Array.isArray(this.state[key]) && Array.isArray(value) && this.state[key].length == 0 && value.length == 0)
          return;
        if (this.checkStateObjectChanges[key] && JSON.stringify(this.state[key]) === JSON.stringify(value)) {
          return;
        }
      } else if (this.state[key] === value)
        return;
      this.state[key] = value;
      this.changed && this.changed({ [key]: value });
      this.render();
    }
    //--------------------------------
    //  SUGAR :)
    hasEventHandler(event) {
      if (!this._events)
        return !!this.getAttribute("on" + event);
      return !!this._events[event];
    }
    get cookies() {
      return typeof document !== "undefined" ? Object.assign(
        {},
        ...document.cookie.split(";").filter((s) => s).map((cookie) => cookie.split("=")).map(([key, value]) => ({ [key.trim()]: (value + "").trim() }))
      ) : {};
    }
    get hash() {
      return typeof window !== "undefined" ? window.location.hash.substr(1).split("/") : [];
    }
    //--------------------------------
    on(event, callback, options) {
      if (!this.window_events[event])
        this.window_events[event] = [];
      const found = this.window_events[event].find((x) => x.callback === callback);
      const cb = (...args) => callback.call(this, ...args);
      if (!found) {
        this.window_events[event].push({ callback, cb });
        window.addEventListener(event, cb, options);
      }
    }
    off(event, callback) {
      if (!this.window_events[event])
        return;
      const index = this.window_events[event].findIndex((x) => x.callback === callback);
      if (index !== -1) {
        window.removeEventListener(event, this.window_events[event][index].cb);
        this.window_events[event].splice(index, 1);
      }
    }
  };

  // src/runtime/htmlClass.js
  var htmlClassMixin = (superclass) => class baseClass extends superclass {
    htmlInit() {
      this.animateCSS = (property, { element, unit, from, to, duration, easing, done }) => {
        element._styles[property] = TinyAnimate_default.animateCSS(element || this, property, unit === void 0 ? "" : unit, from || 0, to, duration || 1e3, easing, () => {
          element._styleV[property] = to + unit;
          if (done)
            done();
        });
      };
      if (this.css.length) {
        const style = document.createElement("style");
        style.textContent = this.css;
        if (!this.ShadowDOM)
          setTimeout(() => {
            this.document.append(style);
          }, 0);
        else
          this.document.append(style);
      }
      delete this.__proto__.htmlInit;
    }
    setAttribute(key, value) {
      this.attributeChangedCallback(key, void 0, value);
      if (this.AddAttributes && typeof value !== "object")
        super.setAttribute(key, value);
    }
    //------------------------------------------------------------------------------
    //  SUGAR :)
    $(selector) {
      return this.document.querySelector(selector);
    }
    $$(selector) {
      return this.document.querySelectorAll(selector);
    }
    // -----------------------------------------------------------------------------
    emitNative(event, payload) {
      console.warn(`this.emitNative() is deprecated. Use this.emit(). "${this.__src}"`);
      this.emit(event, payload);
    }
    emit(event, payload) {
      this.dispatchEvent(new CustomEvent(event, {
        cancelable: false,
        bubbles: false,
        detail: payload
      }));
    }
  };

  // src/runtime/customElement.js
  var customElement;
  if (typeof window !== "undefined") {
    class _customElement extends HTMLElement {
      constructor() {
        super();
        this.AddAttributes = false;
        this.ShadowDOM = "open";
        this.MutationObserverOptions = { childList: true };
        this.baseInit();
        this.init && this.init();
        this.document = ["open", "closed"].includes(this.ShadowDOM) ? this.attachShadow({ mode: this.ShadowDOM }) : this;
        this.htmlInit();
        if (this.slotChange) {
          this._slot_observer = new MutationObserver((mut) => this.slotChange(mut));
          this._slot_observer.observe(this, this.MutationObserverOptions);
        }
      }
      //------------------------------------------------------------------------------
      //  SUGAR :)
      get slotted() {
        const slot = this.document.querySelector("slot");
        return slot ? slot.assignedElements() : [];
      }
      get element() {
        return this.ShadowDOM ? this.document.host : this.document;
      }
    }
    customElement = class extends htmlClassMixin(baseClassMixin(_customElement)) {
    };
  }

  // src/runtime/uiElement.js
  var _uiElement = class {
    constructor() {
      this.document = document.querySelector(this.container);
      if (!this.document)
        throw `i.js: target container "${this.container}" not found`;
      this.baseInit();
      this.htmlInit();
      this.init && this.init();
      this.connectedCallback();
    }
    //------------------------------------------------------------------------------
    //  SUGAR :)
    get element() {
      return this.document;
    }
  };
  var uiElement = class extends htmlClassMixin(baseClassMixin(_uiElement)) {
  };

  // src/runtime/baseElement.js
  var _baseElement = class {
    constructor(parent, tag) {
      this._BASE_ELEMENT = true;
      this.document = {
        _childNodes: [],
        __rendererName: this.__rendererName
      };
      this._childNodes = [];
      this._eventListeners = {};
      this.parent = parent;
      this.baseInit();
      if (this.renderer && !this.__rendererHTML && this.__rendererName !== this.parent.__rendererName) {
        throw `ui.js diffferent renderers ${this.__rendererName} and ${this.parent.__rendererName}`;
      }
      this.onReady = new Promise(async (Ready) => {
        var _a, _b, _c;
        if ((_a = this.renderer) == null ? void 0 : _a.onReady)
          await this.renderer.onReady;
        if ((_b = this.parent) == null ? void 0 : _b.onReady)
          await this.parent.onReady;
        if ((_c = this.renderer) == null ? void 0 : _c.onConnect)
          await this.renderer.onConnect(this);
        this.document.renderer = this.renderer;
        this.document.parent = this.document;
        this.init && await this.init();
        Enter_Children(this.document, this.component, { state: this.state });
        Ready();
        this.is_connected = true;
        if (this.connected)
          await this.connected();
      });
    }
    setAttribute(key, value) {
      this.attributeChangedCallback(key, void 0, value);
    }
    //------------------------------------------------------------------------------
    emit(event, payload) {
      if (this._eventListeners[event])
        this._eventListeners[event].forEach((ev) => ev.cb(new CustomEvent(event, {
          cancelable: false,
          bubbles: false,
          detail: payload
        })));
    }
    addEventListener(event, callback, options) {
      if (!this._eventListeners[event])
        this._eventListeners[event] = [];
      const found = this._eventListeners[event].find((x) => x.callback === callback);
      const cb = (...args) => callback.call(this, ...args);
      if (!found) {
        this._eventListeners[event].push({ callback, cb });
      }
    }
    removeEventListener(event, callback) {
      if (!this._eventListeners[event])
        return;
      const index = this._eventListeners[event].findIndex((x) => x.callback === callback);
      if (index !== -1) {
        this._eventListeners[event].splice(index, 1);
      }
    }
    //------------------------------------------------------------------------------
    async remove() {
      await this.disconnectedCallback();
      while (this.document._childNodes.length) {
        await this.document._childNodes[this.document._childNodes.length - 1].remove();
      }
      if (this.renderer.onDisconnect)
        await this.renderer.onDisconnect(this);
      const index = this.parent._childNodes.findIndex((x) => x == this);
      if (index !== -1)
        this.parent._childNodes.splice(index, 1);
      else
        throw "Element not found";
    }
    after(element) {
      this.renderer.insertAfter(this, element);
    }
    before(element) {
      this.renderer.insertBefore(this, element);
    }
  };
  var baseElement = class extends baseClassMixin(_baseElement) {
  };

  // src/compiler/hashName.js
  var cyrb53 = (str, seed = 0) => {
    var h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
    for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
  function hashName(source, url) {
    return "ui-" + String(url ? cyrb53(url) : cyrb53(source.trim())).replaceAll("-", "i");
  }

  // src/compiler/createTag.js
  var importsCache = {};
  var className = (name) => name.split("-").map((c) => c.slice(0, 1).toUpperCase() + c.slice(1)).join("");
  var Stringify = (obj) => ((placeholder, functions) => JSON.stringify(obj, (_, value) => typeof value === "function" ? functions.push(value) && placeholder : value).replace(
    new RegExp('"' + placeholder + '"', "g"),
    (_) => functions.shift()
  ))("____" + nanoid_default(50) + "____", []);
  var encode = (path, raw) => {
    if (importsCache[path])
      return importsCache[path];
    const u = URL.createObjectURL(new Blob([String.raw({ raw })], { type: "text/javascript" }));
    importsCache[path] = u;
    return u;
  };
  var includeImports = (imports, nodePath, BASE_URL, _path) => imports.reduce((prev, value) => {
    const path = nodePath ? value.path[0] === "@" ? value.path : "i.js:" + (value.path[0] === "/" ? BASE_URL : BASE_URL + _path) + "/" + value.path : encode(value.path, value.src);
    if (value.type === "*") {
      return prev + "const " + value.import + " = {...(await import(`" + path + "`))};\n";
    } else if (value.type === "object") {
      return prev + "const " + value.import + " =  (await import(`" + path + "`));\n";
    } else {
      return prev + "const " + value.import + " =  (await import(`" + path + "`)).default;\n";
    }
    return prev;
  }, "");
  function generateJS(component, baseClass, { inFunc = false, parent }) {
    const style = Object.values(plugins_default).filter((p) => p.processStyle).reduce((style2, plugin) => plugin.processStyle(style2), component.style || "");
    const walt = component.walt ? plugins_default.walt.compileWalt(component.walt) : "undefined";
    const state = `{${(component.state || "").trim()}}`;
    const observedAttributes = baseClass !== "customElement" ? "" : new Function(`return 'static get observedAttributes() { return '+JSON.stringify(Object.keys(${state}))+' }'`)();
    const class_name = className(component.name);
    const i_component = Stringify(parseTemplate(component.template, component.tag || []));
    const container = component.container ? `get container()         { return "${component.container}" }` : "";
    var renderer = "";
    if (component.renderer) {
      const split = component.renderer[0].split(" ");
      renderer = 'get __rendererName(){ return "' + split[0] + '" }';
      if (split.length == 2) {
        var rendererHTML = true;
        renderer += "\nget __rendererHTML(){ return true }";
      } else {
        renderer += "\nget renderer(){ return this.parent?.renderer }";
      }
    }
    ;
    const code1 = `

        ${component.static || ""};
        class ${class_name} extends ${baseClass} {
            ${observedAttributes}
            get nanoapp()           { return ${JSON.stringify(component.nanoapp)} }
            get initial_state()     { return ${state} }
            get initial_component() { return ${i_component} }
            get css()               { return \`${style}\`; }
            get __walt()            { return ${walt} }
            get __src()             { return "${component.src}" }
            ${renderer}
            ${container}
            ${component.class || ""}
        };
    `;
    switch (baseClass) {
      case "customElement":
        const _customElement = `
                ${component.import ? includeImports(component.import, component.nodePath, component.BASE_URL, component.path) : ""}
                if(!customElements.get('${component.name}')) {
                    ${code1}
                    customElements.define('${component.name}', ${class_name});
                    window['UIjs'].tags['${component.name}'] = true;
                };`;
        return inFunc ? `;(async () => {${_customElement}})();` : _customElement;
      case "uiElement":
        const _uiElement2 = `
                ${component.import ? includeImports(component.import, component.nodePath, component.BASE_URL, component.path) : ""}
                ${code1} return new ${class_name}("${"parentparentparent:" + parent}");`;
        return inFunc ? `;(async () => {${_uiElement2}})();` : _uiElement2;
      case "baseElement":
        const _baseElement2 = `
                ${component.import ? includeImports(component.import, component.nodePath, component.BASE_URL, component.path) : ""}
                ${code1} ;window['UIjs'].tags['${component.name}'] = ${class_name};`;
        return inFunc ? `;(async () => {${_baseElement2}})();` : _baseElement2;
    }
  }
  async function createAndReplaceSelf(script, path, nanoapp) {
    const name = hashName(script.innerText);
    await createTag(script.innerText, { name, path, nanoapp });
    script.replaceWith(document.createElement(name));
  }
  async function createNamed(source, name, path, nanoapp, path2, src) {
    await createTag(source, { name, path, nanoapp, src });
  }
  function AddBase(path, nanoapp) {
    if (path.startsWith("/https://"))
      path = path.replace("/https://", "https://");
    if (typeof window !== "undefined" && window.nanoapp_base_path && !path.startsWith(window.nanoapp_base_path)) {
      return window.nanoapp_base_path + "/app" + path;
    }
    return path;
  }
  async function _fetch(path, nanoapp) {
    if (window.document.location.protocol == "file:") {
      console.error(`WARNING!!! ui.js cannot fetch external resources from a 'local' filesystem: "file://${path}"`);
      var src = await fetch(AddBase(path, nanoapp), { mode: "no-cors" }).catch((e) => false);
    } else {
      var src = await fetch(AddBase(path, nanoapp)).catch((e) => false);
    }
    return src;
  }
  async function fetchFile(path, nodeFetch, nanoapp) {
    if (nodeFetch)
      return await nodeFetch(path);
    const src = await _fetch(path, nanoapp);
    if (src === false)
      throw "i.js  \u2764\uFE0F error loading " + path;
    return (await src.text()).trim();
  }
  async function fetchAndCreate(name, src, base = "", nanoapp) {
    if (tags_default[name])
      return true;
    const url = src.substr(-4) === ".tag" ? src : src + ".tag";
    const path = src[0] !== "/" ? normalizePath(base + url) : url;
    const source = await _fetch(path, nanoapp);
    if (source === false)
      throw "i.js  \u2764\uFE0F error loading " + url;
    const path2 = path.substring(0, path.lastIndexOf("/")) + "/";
    await createNamed(await source.text(), name, path2, nanoapp, path2, src);
  }
  async function mountToTarget(script, target, path) {
    await createTag(script.innerText, {
      name: hashName(script.innerText),
      path,
      container: target
    });
  }
  function normalizePath(path) {
    if (typeof window === "undefined")
      return path;
    return new URL(path, document.baseURI).pathname;
  }
  async function compile2({ source, path, keepName, nodeFetch, nodePath, BASE_URL }) {
    const name = keepName ? path.split("/").pop().split(".")[0] : hashName(path);
    return {
      name,
      compiled: await createTag(source, {
        name,
        path: path.substring(0, path.lastIndexOf("/")) + "/",
        bundle: true,
        nodeFetch,
        nodePath,
        BASE_URL
      })
    };
  }
  async function createTag(source, opts = {}) {
    const component = await parseComponent(source);
    if (!opts.name)
      throw "name is undefined !!!";
    component.name = opts.name || "i-component";
    component.path = opts.path;
    component.src = opts.src;
    component.container = opts.container || "";
    component.nodePath = opts.nodePath ? opts.nodePath : void 0;
    component.BASE_URL = opts.BASE_URL;
    component.nanoapp = opts.nanoapp || [];
    const nodeFetch = opts.nodeFetch || void 0;
    var style = "";
    if (component.style) {
      component.style = component.style.trim();
      if (component.style.length)
        style = component.style;
    }
    if (component.css) {
      for (const url of component.css) {
        const path = url[0] !== "/" ? normalizePath(component.path + url) : url;
        const src = await fetchFile(path, nodeFetch, component.nanoapp);
        if (src.length)
          style += "\n" + src;
      }
    }
    component.style = style.replaceAll("`", "`").trim();
    if (component.tag) {
      for (const tag of component.tag) {
        let path = tag.path;
        path = path.substr(-4) === ".tag" ? path : path + ".tag";
        if (nodeFetch)
          path = normalizePath(path[0] === "/" ? path : component.path + path);
        else {
          path = normalizePath(tag.path[0] === "/" ? path : component.path + path);
        }
        const name = hashName(path);
        tag.name = name;
        if (nodeFetch) {
          tag.src = await nodeFetch(path);
        } else {
          const x = component.nanoapp && component.nanoapp.children && component.nanoapp.children.find((x2) => "@" + x2.alias === tag.alias);
          if (x) {
            if (path.startsWith("/!" + x.alias + ".tag") && path.split("/").length == 2)
              path = window.nanoapp_base_path + path.replace("/!" + x.alias + ".tag", "/imports/" + x.child_release + "/index.tag");
            else if (path.startsWith("/!" + x.alias + "/"))
              path = window.nanoapp_base_path + path.replace("/!" + x.alias + "/", "/imports/" + x.child_release + "/");
          }
          await fetchAndCreate(name, path, component.path, x ? x : component.nanoapp);
        }
      }
    }
    if (component.import && !nodeFetch) {
      for (const js of component.import) {
        const path = js.path[0] !== "/" ? normalizePath(component.path + js.path) : js.path;
        js.path = path;
        const src = await fetchFile(path, nodeFetch, component.nanoapp);
        js.src = src;
      }
    }
    tags_default[component.name] = true;
    if (component.renderer && component.renderer[0].split(" ").length == 1) {
      const content = generateJS(component, "baseElement", { inFunc: false });
      const result = await new AsyncFunction_default("baseElement", content)(baseElement);
      return result;
    } else if (component.container) {
      const content = generateJS(component, "uiElement", { inFunc: false });
      const result = await new AsyncFunction_default("uiElement", content)(uiElement);
      return result;
    } else {
      const content = generateJS(component, "customElement", { inFunc: true });
      if (opts.bundle) {
        if (component.tag) {
          let subtags = "";
          for (const tag of component.tag) {
            if (!tags_default[tag.name]) {
              let path = tag.path.substr(-4) === ".tag" ? tag.path : tag.path + ".tag";
              if (path[0] !== "/") {
                path = component.path + path;
              }
              const { name, compiled } = await compile2({
                source: tag.src,
                path,
                name: tag.name,
                nodePath: normalizePath(component.nodePath + component.path),
                BASE_URL: component.BASE_URL,
                nodeFetch
              });
              subtags += compiled;
            } else {
              console.log(`              <${tag.name}> skipped`);
            }
          }
          return subtags + content;
        }
        return content;
      }
      await new AsyncFunction_default("customElement", content)(customElement);
    }
  }

  // src/processScripts.js
  function warnIfNotEmpty(script, attrs) {
    if (script.innerText.trim().length)
      console.warn(`ui.js warning: contents of "<script type=ui ${attrs.map((a) => a.name).join(" ")}> will be ignored"`);
  }
  function warnIfEmpty(script, attrs) {
    if (!script.innerText.trim().length)
      console.warn(`ui.js warning: empty "<script type=ui ${attrs.map((a) => a.name).join(" ")}>"`);
  }
  async function processScripts() {
    const scripts = Array.from(document.querySelectorAll('script[type="ui"],script[type="i"]'));
    try {
      for (const script of scripts) {
        const url = window.location.pathname;
        const path = url.substring(0, url.lastIndexOf("/")) + "/";
        const attrs = Array.prototype.slice.call(script.attributes).map((attr) => ({
          name: attr.name,
          value: script.getAttribute(attr.name).trim()
        }));
        const target = attrs.find((a) => a.name === "target" && a.value.length);
        if (target) {
          if (attrs.length > 2)
            console.warn(`ui.js warning: all other attributes for "<script type=ui target="${target.value}"> will be ignored"`);
          await mountToTarget(script, target.value, path);
          script.remove();
          continue;
        }
        const attrsWithHyphens = attrs.filter((a) => a.name.includes("-"));
        if (attrsWithHyphens.length > 1) {
          throw `ui.js ERROR: more then one attribute with hyphens "<script ${attrsWithHyphens.map((a) => a.name).join(" ")}>"`;
        } else {
          if (attrsWithHyphens.length === 1) {
            if (attrsWithHyphens[0].value) {
              warnIfNotEmpty(script, attrs);
              await fetchAndCreate(attrsWithHyphens[0].name, attrsWithHyphens[0].value, path, typeof window !== "undefined" && window.nanoapp_dependencies);
            } else {
              warnIfEmpty(script, attrs);
              await createNamed(script.innerText, attrsWithHyphens[0].name, path, typeof window !== "undefined" && window.nanoapp_dependencies);
            }
            script.remove();
          } else {
            warnIfEmpty(script, attrs);
            await createAndReplaceSelf(script, path);
          }
        }
      }
    } catch (e) {
      throw new CompileError(e);
    }
  }

  // src/index.js
  var VERSION = "0.7.5-dev";
  !VERSION.endsWith("-dev") && console.log(`ui.js \u2764\uFE0F ${VERSION} alpha experiment. Make user interfaces great again!`);
  var UIjs = {
    VERSION,
    tags: tags_default,
    customElement,
    createTag,
    compile: compile2,
    plugins: plugins_default
  };
  var src_default = UIjs;
  if (typeof window !== "undefined") {
    window["UIjs"] = UIjs;
    document.addEventListener("DOMContentLoaded", processScripts);
  }
})();
/**
 * WASM types
 *
 * https://github.com/WebAssembly/spec/tree/master/interpreter#s-expression-syntax
 *
 * Plus some extra C type mappings
 *
 * @author arthrubuldauskas@gmail.com
 * @license MIT
 */
/**
 * min.css
 *
 * min.css is a tiny, fast and efficient JavaScript library for minifying CSS
 * files that really makes your website faster
 *
 * Site: https://github.com/w3core/min.css/
 * Online: https://w3core.github.io/min.css/
 *
 * @version 1.3.1
 *
 * @license BSD License
 * @author Max Chuhryaev
 */
