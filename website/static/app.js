// dna.js Website ~~ dnajs.org ~~ MIT
// Copyright (c) 2013-2018 individual contributors to dna.js

const app = {
   setup: () => {
      app.nav.setup();
      app.documenation.setup();
      $('.version-number').text(dna.version);
      }
   };

app.bookstore = {
   books: [
      { title: 'Go JavaScript', author: 'Jake' },
      { title: 'Styling CSS3',  author: 'Abby' },
      { title: 'Howdy HTML5',   author: 'Ed' }
      ],
   clear: () => {
      dna.empty('book', { fade: true });
      },
   feelLucky: () => {
      const lucky = Math.floor(Math.random() * app.bookstore.books.length);
      dna.clone('book', app.bookstore.books[lucky], { fade: true });
      },
   setup: () => {
      dna.clone('book', { title: 'The DOM', author: 'Jan' });
      }
   };

app.nav = {
   setup: () => {
      const folder = window.location.pathname.split('/').slice(-2)[0];
      let current = $('header nav a[href$="' + folder + '"]').closest('li');
      if (!current.length)
         current = $('header nav li').first();
      current.addClass('current');
      }
   };

app.documenation = {
   setup: () => {
      const addOutlineNumber = (i, elem) => {
         const letter = String.fromCharCode('A'.charCodeAt() + i);
         $(elem).text(letter + '. ' + $(elem).text());
         };
      if (window.location.pathname.indexOf('/docs') !== -1)
         $('main >div >h3').each(addOutlineNumber);
      }
   };

$(app.setup);
