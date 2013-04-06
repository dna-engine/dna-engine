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
   getFieldElems: function(template) {
      return template.find('*').filter(dna.core.isDnaField);
      },
   compileFieldElem: function() {
      $(this).addClass('dna-field').data('dna-field',
         $(this).text().replace(dna.core.regexDnaBasePairs, '')).empty();
      },
   compile: function(template) {  //prepare template to be cloned
      dna.core.getFieldElems(template).each(dna.core.compileFieldElem);
      template.find('img[data-dna-src]').each(function () {
         $(this).addClass('dna-image-field')
            .data('dna-src', $(this).data('dna-src').replace(dna.core.regexDnaBasePairs, ''));
         });
      return template.addClass('dna-compiled').data('dna', 0);
      },
   getTemplate: function(name) {
      var template = dna.core.getTemplates().filter('[data-dna-name=' + name + ']');
      if (!template.hasClass('dna-compiled'))
         dna.core.compile(template);
      return template;
      },
   cloneOne: function(template, dataObj, options) {
      var elem = template.clone(true, true).removeClass('dna-template dna-compiled');
      template.data('dna', template.data('dna') + 1);
      elem.addClass('dna-clone').find('.dna-field').each(function() {
         $(this).html(dataObj[$(this).data('dna-field')]);
         });
      elem.find('.dna-image-field').each(function() {
         $(this).attr('src', dataObj[$(this).data('dna-src')]);
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
