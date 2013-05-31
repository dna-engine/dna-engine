// dna.js Template Cloner ~~ v0.1
// GPLv3/MIT ~~ dnajs.org/license.html
// Copyright (c) 2013 Center Key Software and other contributors

var dna = {};

dna.util = {
   value: function(data, fields) {  //example: { a: { b: 7 }}, 'a.b' --> 7
      if (typeof fields === 'string')
         fields = fields.split('.');
      return (data === null || fields === undefined) ? null :
         (fields.length === 1 ? data[fields[0]] : this.value(data[fields[0]], fields.slice(1)));
      },
   findAll: function(elem, selector) {
      return elem.find(selector).addBack(selector);
      },
   apply: function(elem, selector, func) {
      dna.util.findAll(elem, selector).each(func);
      }
   };

dna.compile = {
   regexDnaField: /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,  //example: ~~title~~
   regexDnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two "~~" strings so they can be removed
   isDnaField: function() {
      var firstNode = $(this)[0].childNodes[0];
      return firstNode && firstNode.nodeValue &&
         firstNode.nodeValue.match(dna.compile.regexDnaField);
      },
   fieldElem: function() {
      //Example: "<p>~~age~~</p>" --> "<p class=dna-field data-field-age></p>"
      $(this).addClass('dna-field').data('dna-field',
         $.trim($(this).text()).replace(dna.compile.regexDnaBasePairs, '')).empty();
      },
   attrElem: function() {
      //Example: "<p data-dna=id@code></p>" --> "<p class=dna-attr data-dna=['id','code']></p>"
      var list = $(this).data('dna').split(/[,@:]/);  //colon is alternative notation to at sign
      $(this).addClass('dna-attr').data('dna', list);
      },
   classElem: function() {
      //Example: "<p data-dna-class=c1,c2></p>" --> "<p class=dna-class data-dna-class=['c1','c2']></p>"
      var list = $(this).data('dna-class').split(',');
      $(this).addClass('dna-class').data('dna-class', list);
      },
   template: function(template) {  //prepare template to be cloned
      var elems = template.elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.fieldElem);
      elems.filter('[data-dna]').each(dna.compile.attrElem);
      elems.filter('[data-dna-class]').each(dna.compile.classElem);
      elems.filter('[data-dna-require]').addClass('dna-require');
      elems.filter('[data-dna-missing]').addClass('dna-missing');
      template.compiled = true;
      template.elem.removeClass('dna-template').addClass('dna-clone');
      }
   };

dna.store = {
   templates: null,
   stash: function() {
      var elem = $(this);
      if (!dna.store.templates)
         dna.store.templates = {};
      var name = elem.data('dna-name');
      dna.store.templates[name] = {
         name:      name,
         elem:      elem,
         container: elem.parent().addClass('dna-contains-' + name),
         compiled:  false,
         clones:    0
         };
      elem.detach();
      },
   getTemplate: function(name) {
      if (!dna.store.templates)
         $('.dna-template').each(dna.store.stash);
      var template = dna.store.templates[name];
      if (!template)
         dna.core.berserk('Template not found: ' + name);
      if (!template.compiled)
         dna.compile.template(template);
      return template;
      }
   };

dna.core = {
   inject: function(clone, data) {
      dna.util.apply(clone, '.dna-field', function() {
         $(this).html(dna.util.value(data, $(this).data('dna-field')));
         });
      var list, x;
      dna.util.apply(clone, '.dna-attr', function() {
         list = $(this).data('dna');
         for (x = 0; x < list.length / 2; x++)
            $(this).attr(list[x*2], dna.util.value(data, list[x*2 + 1]));
         });
      dna.util.apply(clone, '.dna-class', function() {
         list = $(this).data('dna-class');
         for (x = 0; x < list.length; x++)
            $(this).addClass(dna.util.value(data, list[x]));
         });
      },
   thimblerig: function(clone, data) {
      dna.util.apply(clone, '.dna-require', function() {
         $(this).toggle(dna.util.value(data, $(this).data('dna-require')) !== null);
         });
      dna.util.apply(clone, '.dna-missing', function() {
         $(this).toggle(dna.util.value(data, $(this).data('dna-missing')) === null);
         });
      },
   replicate: function(template, data, settings) {
      var clone = template.elem.clone(true, true);
      template.clones++;
      dna.core.inject(clone, data);
      dna.core.thimblerig(clone, data);
      var container = settings.holder ? dna.util.findAll(settings.holder,
         '.dna-contains-' + template.name) : template.container;
      settings.top ? container.prepend(clone) : container.append(clone);
      if (settings.task)
         settings.task(clone, data);
      if (settings.fade)
         clone.hide().fadeIn();
      return clone;
      },
   unload: function(name, data, options) {
      if (!data.error)
         dna.api.clone(name, data, options)
      },
   berserk: function(msg) {
      throw 'dna.js error -> ' + msg;
      }
   };

dna.api = {
   clone: function(name, data, options) {
      var settings =
         { fade: false, top: false, holder: null, empty: false, task: null };
      $.extend(settings, options);
      var template = dna.store.getTemplate(name);
      if (settings.empty)
         dna.api.empty(name);
      var list = data instanceof Array ? data : [data];
      var clones = $();
      for (var count = 0; count < list.length; count++)
         clones = clones.add(dna.core.replicate(template, list[count], settings));
      return clones;
      },
   load: function(name, url, options) {
      $.getJSON(url, function(data) { dna.core.unload(name, data, options) });
      },
   empty: function(name, options) {
      var settings = { fade: false };
      $.extend(settings, options);
      var clones = dna.store.getTemplate(name).container.find('.dna-clone');
      if (settings.fade)
         clones.fadeOut('normal', function() { $(this).remove(); });
      else
      	clones.remove();
      return clones;
      },
   mutate: function(clone, data) {
      dna.core.inject(clone, data);
      },
   debug: function() {
      if (console) {
         console.log('~~ dns.js ~~');
         console.log('template count: ' + Object.keys(dna.store.templates).length);
         console.log('template names: ' + Object.keys(dna.store.templates));
         console.log(dna.store.templates);
         }
      }
   };

dna.clone =  dna.api.clone;
dna.load =   dna.api.load;
dna.empty =  dna.api.empty;
dna.mutate = dna.api.mutate;
dna.debug =  dna.api.debug;
