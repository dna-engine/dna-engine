// dna.js Template Cloner, version 0.2 (beta)
// GPLv3/MIT, see: dnajs.org/license.html
// Copyright (c) 2013 Center Key Software and other contributors

var dna = {};

dna.util = {
   defaults: function(options, defaults) {
      //Sets each missing field in options to its default value
      if (options)
         for (var field in defaults)
            if (defaults.hasOwnProperty(field))
               if (options[field] === undefined)
                  options[field] = defaults[field];
      return options || defaults;
      },
   apply: function(elem, selector, func) {
      elem.find(selector).addBack(selector).each(func);
      },
   };

dna.compile = {
   fieldElem: function() {
      //Example: "<p>~~age~~</p>" --> "<p class=dna-field data-field-age></p>"
      $(this).addClass('dna-field').data('dna-field',
         $(this).text().replace(dna.core.regexDnaBasePairs, '')).empty();
      },
   attrElem: function() {
      //Example: "<p data-dna-attr=~~id:code~~></p>" --> "<p class=dna-attr data-dna-attr=['id','code']></p>"
      var list = $(this).data('dna-attr').replace(dna.core.regexDnaBasePairs, '').split(/[,:]/);
      $(this).addClass('dna-attr').data('dna-attr', list);
      },
   classElem: function() {
      //Example: "<p data-dna-class=~~c1,c2~~></p>" --> "<p class=dna-class data-dna-class=['c1','c2']></p>"
      var list = $(this).data('dna-class').replace(dna.core.regexDnaBasePairs, '').split(',');
      $(this).addClass('dna-class').data('dna-class', list);
      },
   template: function(template) {  //prepare template to be cloned
      var elems = template.elem.find('*').addBack();
      elems.filter(dna.core.isDnaField).each(dna.compile.fieldElem);
      elems.filter('[data-dna-attr]').each(dna.compile.attrElem);
      elems.filter('[data-dna-class]').each(dna.compile.classElem);
      template.compiled = true;
      template.elem.removeClass('dna-template').addClass('dna-clone');
      }
   };

dna.core = {
   templates: {},
   regexDnaField: /^(~~|\{\{).*(~~|\}\})$/,  //example: ~~title~~
   regexDnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two "~~" strings so they can be removed
   isDnaField: function() {
      var firstNode = $(this)[0].childNodes[0];
      return firstNode && firstNode.nodeValue &&
         firstNode.nodeValue.match(dna.core.regexDnaField);
      },
   storeTemplate: function() {
      dna.core.templates[$(this).data('dna-name')] =
         { elem: $(this), container: $(this).parent(), compiled: false, clones: 0 };
      $(this).detach();
      },
   getTemplate: function(name) {
      if ($.isEmptyObject(dna.core.templates))
         $('.dna-template').each(dna.core.storeTemplate);
      var template = dna.core.templates[name];
      if (template && !template.compiled)
         dna.compile.template(template);
      return template;
      },
   cloneOne: function(template, dataObj, options) {
      var clone = template.elem.clone(true, true);
      template.clones++;
      dna.util.apply(clone, '.dna-field', function() {
         $(this).html(dataObj[$(this).data('dna-field')]);
         });
      var list, len, x;
      dna.util.apply(clone, '.dna-attr', function() {
         list = $(this).data('dna-attr');
         len = list.length / 2;
         for (x = 0; x < len; x = x + 2)
            $(this).attr(list[x], dataObj[list[x + 1]]);
         });
      dna.util.apply(clone, '.dna-class', function() {
         list = $(this).data('dna-class');
         len = list.length;
         for (x = 0; x < len; x++)
            $(this).addClass(dataObj[list[x]]);
         });
      if (options.top)
         template.container.prepend(clone);
      else
         template.container.append(clone);
      if (options.fade)
         clone.hide().fadeIn();
      return clone;
      }
   };

dna.api = {
   clone: function(name, data, options) {
      options = dna.util.defaults(options, { fade: false, top: false });
      var template = dna.core.getTemplate(name);
      var list = data instanceof Array ? data : [data];
      var clones = $();
      for (var count = 0; count < list.length; count++)
         clones = clones.add(dna.core.cloneOne(template, list[count], options));
      return clones;
      },
   empty: function(name, options) {
      options = dna.util.defaults(options, { fade: false });
      var duration = options.fade ? 'normal' : 0;
      var clones = dna.core.getTemplate(name).container.find('.dna-clone');
      return clones.fadeOut(duration, function() { $(this).remove(); });
      },
   debug: function() {
      console.log('~~ dns.js ~~');
      console.log('template count: ' + Object.keys(dna.core.templates).length);
      console.log('template names: ' + Object.keys(dna.core.templates));
      console.log(dna.core.templates);
      }
   };

dna.clone = dna.api.clone;
dna.empty = dna.api.empty;
dna.debug = dna.api.debug;
