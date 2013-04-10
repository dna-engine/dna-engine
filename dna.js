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
      }
   };

dna.core = {
   templates: null,
   regexDnaField: /^(~~|\{\{).*(~~|\}\})$/,  //example: ~~title~~
   regexDnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two "~~" strings so they can be removed
   getTemplates: function() {
      if (!dna.core.templates)
         dna.core.templates = $('.dna-template');
      return dna.core.templates;
      },
   isDnaField: function() {
      var firstNode = $(this)[0].childNodes[0];
      return firstNode && firstNode.nodeValue &&
         firstNode.nodeValue.match(dna.core.regexDnaField);
      },
   compileFieldElem: function() {
      //Example: "<p>~~age~~</p>" --> "<p class=dna-field data-field-age></p>"
      $(this).addClass('dna-field').data('dna-field',
         $(this).text().replace(dna.core.regexDnaBasePairs, '')).empty();
      },
   compileAttrElem: function() {
      //Example: "<p data-dna-attr=~~id:code~~></p>" --> "<p class=dna-attr data-dna-attr=['id','code']></p>"
      var list = $(this).data('dna-attr').replace(dna.core.regexDnaBasePairs, '').split(/[,:]/);
      $(this).addClass('dna-attr').data('dna-attr', list);
      },
   compileClassElem: function() {
      //Example: "<p data-dna-class=~~c1,c2~~></p>" --> "<p class=dna-class data-dna-class=['c1','c2']></p>"
      var list = $(this).data('dna-class').replace(dna.core.regexDnaBasePairs, '').split(',');
      $(this).addClass('dna-class').data('dna-class', list);
      },
   compile: function(template) {  //prepare template to be cloned
      var templateElems = template.find('*').addBack();
      var fieldElems = templateElems.filter(dna.core.isDnaField);
      var attrElems =  templateElems.filter('[data-dna-attr]');
      var classElems = templateElems.filter('[data-dna-class]');
      fieldElems.each(dna.core.compileFieldElem);
      attrElems.each(dna.core.compileAttrElem);
      classElems.each(dna.core.compileClassElem);
      return template.addClass('dna-compiled').data('dna', 0);
      },
   getTemplate: function(name) {
      var template = dna.core.getTemplates().filter('[data-dna-name=' + name + ']');
      if (!template.hasClass('dna-compiled'))
         dna.core.compile(template);
      return template;
      },
   apply: function(elem, selector, func) {
      elem.find(selector).addBack(selector).each(func);
      },
   cloneOne: function(template, dataObj, options) {
      var elem = template.clone(true, true)
         .removeClass('dna-template dna-compiled').addClass('dna-clone');
      template.data('dna', template.data('dna') + 1);
      dna.core.apply(elem, '.dna-field', function() {
         $(this).html(dataObj[$(this).data('dna-field')]);
         });
      var list, len, x;
      dna.core.apply(elem, '.dna-attr', function() {
         list = $(this).data('dna-attr');
         len = list.length / 2;
         for (x = 0; x < len; x = x + 2)
            $(this).attr(list[x], dataObj[list[x + 1]]);
         });
      dna.core.apply(elem, '.dna-class', function() {
         list = $(this).data('dna-class');
         len = list.length;
         for (x = 0; x < len; x++)
            $(this).addClass(dataObj[list[x]]);
         });
      if (options.top)
         template.after(elem);
      else
         template.parent().append(elem);
      if (options.fade)
         elem.hide().fadeIn();
      return elem;
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
      var elems = dna.core.getTemplate(name).parent().children('.dna-clone');
      var duration = options.fade ? 'normal' : 0;
      return elems.fadeOut(duration, function() { $(this).remove(); });
      }
   };

dna.clone = dna.api.clone;
dna.empty = dna.api.empty;
