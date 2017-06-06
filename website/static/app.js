// dna.js Website
// MIT ~~ dnajs.org/license
// Copyright (c) 2013-2017 individual contributors to dna.js

var app = {};

app.bookstore = {
   books: [
      { title: 'Go JavaScript', author: 'Jake' },
      { title: 'Styling CSS3',  author: 'Abby' },
      { title: 'Howdy HTML5',   author: 'Ed' }
      ],
   clear: function() {
      dna.empty('book', { fade: true });
      },
   feelLucky: function() {
      var lucky = Math.floor(Math.random() * app.bookstore.books.length);
      dna.clone('book', app.bookstore.books[lucky], { fade: true });
      },
   setup: function() {
      dna.clone('book', { title: 'The DOM', author: 'Jan' });
      }
   };

app.nav = {
   setup: function() {
      var folder = window.location.pathname.split('/').slice(-2)[0];
      var current = $('header nav a[href$="' + folder + '"]').closest('li');
      if (!current.length)
         current = $('header nav li').first();
      current.addClass('current');
      }
   };

app.documenation = {
   setup: function() {
      function addOutlineNumber(i, elem) {
         var letter = String.fromCharCode('A'.charCodeAt() + i);
         $(elem).text(letter + '. ' + $(elem).text());
         }
      if (window.location.pathname.indexOf('/docs') !== -1)
         $('h3').each(addOutlineNumber);
      }
   };

app.start = {
   go: function() {
      var newsItemsToShow = 3;
      function hideOldNews() {
         var revealButtonHtml = '<div class=reveal-action data-reveal=more-news>more...</div>';
         var hideSectionHtml =  '<div class=reveal-target data-reveal=more-news></div>';
         $('section.news h2').nextAll().eq(newsItemsToShow - 1).after($(revealButtonHtml)).next()
            .nextAll().wrapAll(hideSectionHtml);
         }
      app.nav.setup();
      app.documenation.setup();
      hideOldNews();
      }
   };

$(app.start.go);
