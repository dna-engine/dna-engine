// dna.js Website
// MIT/GPLv3 ~~ dnajs.org/license
// Copyright (c) 2013-2016 individual contributors

window.app = {};

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
      var current = $('header nav a')
         .filter('[href="' + window.location.pathname.split('/').pop() + '"]')
         .closest('li');
      if (!current.length)
         current = $('header nav li').first();
      current.addClass('current');
      }
   };

app.documenation = {
   setup: function() {
      function addOutlineNumber(elemIndex) {
         var letter = String.fromCharCode('A'.charCodeAt() + elemIndex);
         $(this).text(letter + '. ' + $(this).text());
         }
      if (window.location.pathname.indexOf('/docs') !== -1)
         $('h3').each(addOutlineNumber);
      }
   };

app.start = {
   go: function() {
      app.nav.setup();
      app.documenation.setup();
      }
   };

$(app.start.go);
