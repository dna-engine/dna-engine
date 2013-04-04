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
               if (typeof options[field] == 'undefined')
                  options[field] = defaults[field];
      return options ? options : defaults;
      }
   };

dna.core = {
   templates: null,
   regexDnaField: /^(~~|{{).*(~~|}})$/,  //example: ~~title~~
   regexDnaBasePairs: /~~|{{|}}/g,  //mathces the two "~~" strings so they can be removed
   getTemplates: function() {
      if (!dna.core.templates)
         dna.core.templates = $('.dna-template');
      return dna.core.templates;
      },
   findFieldElems: function(template) {
      //Returns list of elements whose content is a dna field
      return template.find('*').filter(
         function() { return $(this).text().match(dna.core.regexDnaField); }
         );
      },
   compile: function(template) {
      //Prepares template to be cloned
      dna.core.findFieldElems(template).each(function() {
         var elem = $(this);
         elem.addClass('dna-field').data('dna-field', elem.text().replace(dna.core.regexDnaBasePairs, '')).empty();
         });
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
      }
   };

dna.api = {
   clone: function(name, dataObj, options) {
      options = dna.util.defaults(options, { fade: false });
      var template = dna.core.getTemplate(name);
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
