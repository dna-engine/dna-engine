// dna.js Template Cloner, version 0.1 (beta)
// GPLv3/MIT, see: dnajs.org/license.html
// Copyright (c) 2013 Center Key Software and other contributors

'use strict';

var dna = {};

dna.util = {
   defaults: function(options, defaults) {
      if (options)
         for (var field in defaults)
            if (typeof options[field] == 'undefined')
               options[field] = defaults[field];
      return options ? options : defaults;
      }
   }

dna.core = {
   templates: $('.dna-template'),
   findFieldElems: function(template) {
      var regex = /^(~~|{{).*(~~|}})$/;  //dna field, example: ~~title~~
      return template.find('*').filter(
         function() { return $(this).text().match(regex); }
         );
      },
   compile: function(template) {
      var regex = /~~|{{|}}/g;  //dna gene
      dna.core.findFieldElems(template).each(function() {
         var elem = $(this);
         elem.addClass('dna-field-' + elem.text().replace(regex, '')).empty();
         });
      //debug(template);
      return template.addClass('dna-compiled').data('dna', 0);
      },
   get: function(templateName) {
      var template = dna.core.templates.filter('[data-dna-name=' + templateName + ']');
      if (!template.hasClass('dna-compiled'))
         dna.core.compile(template);
      return template;
      }
   };

dna.api = {
   clone: function(templateName, dataObj, options) {
      options = dna.util.defaults(options, { fade: false });
      var template = dna.core.get(templateName);
      var elem = template.clone(true, true).removeClass('dna-template dna-compiled');
      template.data('dna', template.data('dna') + 1);
      for (var field in dataObj)
         elem.find('.dna-field-' + field).html(dataObj[field]);
      elem.appendTo(template.parent()).addClass('dna-clone');
      if (options.fade)
         elem.hide().fadeIn();
      return elem;
      },
   empty: function(templateName, options) {
      options = dna.util.defaults(options, { fade: false });
      var elems = dna.core.get(templateName).parent().children('.dna-clone');
      var duration = options.fade ? 'normal' : 0;
      return elems.fadeOut(duration, function() { $(this).remove(); });
      },
   };

dna.clone = dna.api.clone;
dna.empty = dna.api.empty;
