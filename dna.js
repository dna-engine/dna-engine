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
   templates: $('.dna-template'),
   findFieldElems: function(template) {
      //Returns list of elements whose content is a dna field
      var regex = /^(~~|{{).*(~~|}})$/;  //dna field, example: ~~title~~
      return template.find('*').filter(
         function() { return $(this).text().match(regex); }
         );
      },
   compile: function(template) {
      //Prepares template to be cloned
      var regex = /~~|{{|}}/g;  //dna base pairs
      dna.core.findFieldElems(template).each(function() {
         var elem = $(this);
         elem.addClass('dna-field').data('dna-field', elem.text().replace(regex, '')).empty();
         });
      return template.addClass('dna-compiled').data('dna', 0);
      },
   getTemplate: function(name) {
      var template = dna.core.templates.filter('[data-dna-name=' + name + ']');
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
         console.log($(this).data('dna-field'));
         $(this).html(dataObj[$(this).data('dna-field')]);
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
