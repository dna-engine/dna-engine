// dna.js
// Mock Data

const html = `
   <!doctype html>
   <html lang=en>
      <head>
         <meta charset=utf-8>
         <title>Specification Runner</title>
      </head>
      <body>
         <h1>Featured Books</h1>
         <section class=books>
            <div id=book class=dna-template data-attr-id=~~isbn~~>
               <h2>~~title~~</h2>
               Author: <cite>~~author~~</cite>
               Event:
                  <output class=locale  data-format-date=locale>~~event~~</output>
                  <output class=general data-format-date=general>~~event~~</output>
            </div>
         </section>
      </body>
   </html>
   `;

const timestamp = new Date('2030-05-04T01:00:00').getTime();  //May 4, 2030 at 1:00am (local time)

const bookCatalog = [
   { isbn: '978-1', title: 'The DOM',      author: 'Jan',  price: 2499, sale: false, language: 'en' },
   { isbn: '978-2', title: 'Styling CSS3', author: 'Abby', price: 1999, sale: true,  language: 'fr' },
   { isbn: '978-3', title: 'Howdy HTML5',  author: 'Ed',   price: 2999, event: timestamp },
   ];

export { html, timestamp, bookCatalog };
