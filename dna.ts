// dna.js ~~ MIT License

export type DnaOptionsClone = {
   fade?:      boolean,
   top?:       boolean,
   clones?:    number,
   html?:      boolean,
   empty?:     boolean,
   holder?:    JQuery,
   container?: JQuery | null,
   transform?: DnaCallback | null,
   callback?:  DnaCallback | null,
   };
export type DnaOptionsCloneSub = {
   fade?:      boolean,
   top?:       boolean,
   };
export type DnaOptionsGetModel = {
   main?:      boolean,
   };
export type DnaOptionsEmpty = {
   fade?:      boolean,
   };
export type DnaOptionsInsert = {
   fade?:      boolean,
   html?:      boolean,
   transform?: DnaCallback,
   callback?:  DnaCallback,
   };
export type DnaOptionsRefresh = {
   data?:      unknown,
   main?:      boolean,
   html?:      boolean,
   };
export type DnaOptionsRefreshAll = {
   data?:      unknown,
   main?:      boolean,
   html?:      boolean,
   };
export type DnaOptionsRecount = {
   html?:      boolean,
   };
export type DnaOptionsDestroy = {
   main?:      boolean,
   fade?:      boolean,
   callback?:  DnaCallback | null,
   };
export type DnaOptionsGetClone = {
   main?:      boolean,
   };
export type DnaOptionsGetIndex = {
   main?:      boolean,
   };
export type DnaOptionsRegisterInitializer = {
   selector?:  string | null,
   params?:    DnaDataObject | unknown[] | null,
   onDocLoad?: boolean,
   };

export type DnaPluginAction = 'bye' | 'clone-sub' | 'destroy' | 'down' | 'refresh' | 'up';
export type DnaModel = unknown[] | Record<string | number, unknown>;
export type DnaDataObject = Record<string | number, unknown>;
export type DnaCallback = (arg1?: unknown, arg2?: unknown, arg3?: unknown, ...args: unknown[]) => unknown;
export type DnaElemEventIndex = JQuery | JQuery.EventBase | number;
export type DnaInitializer = {
   fn:       DnaFunctionName | DnaCallback,
   selector: string | null,
   params:   DnaDataObject | unknown[] | null,
   };
export type DnaTemplate = {
   name:       string,
   elem:       JQuery,
   container:  JQuery,
   nested:     boolean,
   separators: number,
   wrapped:    boolean,
   };
export type DnaTemplateDb = { [name: string]: DnaTemplate };
export type DnaTemplateName = string;
export type DnaContext = { [name: string]: Record<string, unknown> | DnaCallback };
export type DnaFieldName = string;
export type DnaFunctionName = string;
export type DnaClassName = string;
export type DnaAttrName = string;
export type DnaAttrItem = DnaAttrName | [string, DnaFieldName | 1 | 2, string];
export type DnaLoop = { name: string, field: DnaFieldName };
export type DnaRules = {
   template?:  DnaTemplateName,
   array?:     DnaFieldName,
   text?:      boolean,
   val?:       boolean,
   attrs?:     DnaAttrItem[],
   props?:     (string | DnaFieldName)[],
   option?:    DnaFieldName,
   transform?: DnaFunctionName,
   callback?:  DnaFunctionName,
   class?:     [DnaFieldName, DnaClassName, DnaClassName][],
   require?:   DnaFieldName,
   missing?:   DnaFieldName,
   true?:      DnaFieldName,
   false?:     DnaFieldName,
   loop?:      DnaLoop,
   };

const dnaArray = {
   find: (array: DnaDataObject[], value: unknown, key = 'code'): { index: number, item?: DnaDataObject } => {
      // Returns the index and a reference to the first array element with a key equal to the
      // supplied value.  The default key is "code".
      // Examples:
      //    const array = [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      //    result = dna.array.find(array, 'b');  //{ item: { code: 'b', word: 'Bat' }, index: 1 }
      //    result = dna.array.find(array, 'x');  //{ index: -1 }
      const valid = Array.isArray(array);
      let i = 0;
      if (valid)
         while (i < array.length && array[i]?.[key] !== value)
            i++;
      return valid && i < array.length ? { index: i, item: <DnaDataObject>array[i] } : { index: -1 };
      },
   last: (array: unknown[]): unknown | null => {
      // Returns the last element of the array (or undefined if not possible).
      // Example:
      //    dna.array.last([3, 21, 7]) === 7;
      return Array.isArray(array) && array.length ? array[array.length - 1] : null;
      },
   fromMap: (map: DnaDataObject, options?: { key?: string, kebabCodes?: boolean }): DnaDataObject[] => {
      // Converts an object (hash map) into an array of objects.  The default key is "code".
      // Example:
      //    dna.array.fromMap({ a: { word: 'Ant' }, b: { word: 'Bat' } })
      // converts:
      //    { a: { word: 'Ant' }, b: { word: 'Bat' } }
      // to:
      //    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }]
      const defaults = { key: 'code', kebabCodes: false };
      const settings = { ...defaults, ...options };
      const codeValue = (key: string): string => settings.kebabCodes ? dna.util.toKebab(key) : key;
      const toObj = (item: unknown): DnaDataObject => dna.util.isObj(item) ? <DnaDataObject>item : { value: item };
      return Object.keys(map).map(key => ({ ...{ [settings.key]: codeValue(key) }, ...toObj(map[key]) }));
      },
   toMap: (array: DnaDataObject[], options?: { key: string, camelKeys: boolean }): DnaDataObject => {
      // Converts an array of objects into an object (hash map).  The default key is "code".
      // Example:
      //    dna.array.toMap([{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }])
      // converts:
      //    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }]
      // to:
      //    { a: { code: 'a', word: 'Ant' }, b: { code: 'b', word: 'Bat' } }
      const defaults = { key: 'code', camelKeys: false };
      const settings = { ...defaults, ...options };
      const map = <DnaDataObject>{};
      const addObj = (obj: DnaDataObject) => map[<string | number>obj[settings.key]] = obj;
      const addObjCamelKey = (obj: DnaDataObject) => map[dna.util.toCamel(<string>obj[settings.key])] = obj;
      array.forEach(settings.camelKeys ? addObjCamelKey : addObj);
      return map;
      },
   wrap: (itemOrItems: unknown): unknown[] => {
      // Always returns an array.
      const isNothing = itemOrItems === null || itemOrItems === undefined;
      return isNothing ? [] : Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
      }
   };

const dnaBrowser = {
   getUrlParams: (): Record<string, string> => {
      // Returns the query parameters as an object literal.
      // Example:
      //    https://example.com?lang=jp&code=7 ==> { lang: 'jp', code: '7' }
      const params = <Record<string, string>>{};
      const addParam = (parts: [string, string]) => params[parts[0]] = parts[1];
      const addPair = (pair: string) => pair && addParam(<[string, string]>pair.split('='));
      window.location.search.slice(1).split('&').forEach(addPair);
      return params;
      }
   };

const dnaPageToken = {
   // A simple key/value store specific to the page (URL path) that is cleared out when the
   // user's browser session ends.
   put: (key: string, value: unknown): unknown => {
      // Example:
      //   dna.pageToken.put('favorite', 7);  //saves 7
      window.sessionStorage[key + window.location.pathname] = JSON.stringify(value);
      return value;
      },
   get: (key: string, defaultValue: unknown): unknown => {
      // Example:
      //   dna.pageToken.get('favorite', 0);  //returns 0 if not set
      const value = window.sessionStorage[key + window.location.pathname];
      return value === undefined ? defaultValue : JSON.parse(value);
      }
   };

const dnaUi = {
   deleteElem: function(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallback | null): JQuery {
      // A flexible function for removing a jQuery element.
      // Example:
      //    $('.box').fadeOut(dna.ui.deleteElem);
      const elem = dna.ui.toElem(elemOrEventOrIndex, this);
      return dna.core.remove(elem, callback);
      },
   focus: (elem: JQuery): JQuery => {
      // Sets focus on an element.
      return elem.trigger('focus');
      },
   getAttrs: (elem: JQuery): Attr[] => {
      // Returns the attributes of the DOM node in a regular array.
      return elem[0] ? Object.values(elem[0].attributes) : [];
      },
   getComponent: (elem: JQuery): JQuery => {
      // Returns the component (container element with a <code>data-component</code> attribute) to
      // which the element belongs.
      return elem.closest('[data-component]');
      },
   pulse: (elem: JQuery, options?: { duration: number, interval: number, out: number }): JQuery => {
      // Fades in an element after hiding it to create a single smooth flash effect.  The optional
      // interval fades out the element.
      const defaults = { duration: 400, interval: 0, out: 5000 };
      const settings = { ...defaults, ...options };
      const css = { hide: { opacity: 0 }, show: { opacity: 1 } };
      elem.stop(true).slideDown().css(css.hide).animate(css.show, settings.duration);
      if (settings.interval)
         elem.animate(css.show, settings.interval).animate(css.hide, settings.out);
      return elem;
      },
   slideFade: (elem: JQuery, callback?: DnaCallback | null, show?: boolean): JQuery => {
      // Smooth slide plus fade effect.
      const obscure = { opacity: 0, transition: 'opacity 0s' };
      const easeIn =  { opacity: 1, transition: 'opacity 400ms' };
      const easeOut = { opacity: 0, transition: 'opacity 400ms' };
      const reset =   { transition: 'opacity 0s' };
      const doEaseIn = () => elem.css(easeIn);
      const clearTransition = () => elem.css(reset);
      if (show && window.setTimeout(doEaseIn, 200))
         elem.css(obscure).hide().delay(100).slideDown(callback || undefined);
      else
         elem.css(easeOut).delay(100).slideUp(callback || undefined);
      elem.delay(200).promise().then(clearTransition);  //keep clean for other animations
      return elem;
      },
   slideFadeIn: (elem: JQuery, callback?: DnaCallback | null): JQuery => {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, true);
      },
   slideFadeOut: (elem: JQuery, callback?: DnaCallback | null): JQuery => {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, false);
      },
   slideFadeToggle: (elem: JQuery, callback?: DnaCallback | null): JQuery => {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, elem.is(':hidden'));
      },
   slideFadeDelete: (elem: JQuery, callback?: DnaCallback | null): JQuery => {
      // Smooth slide plus fade effect.
      return dna.ui.slideFadeOut(elem, () => dna.ui.deleteElem(elem, callback));
      },
   smoothHeightSetBaseline: (container: JQuery): JQuery => {
      // See: smoothHeightAnimate below
      const body = $('body');
      const elem = body.data().dnaCurrentContainer = container || body;
      const height = <number>elem.outerHeight();
      return elem.css({ minHeight: height, maxHeight: height, overflow: 'hidden' });
      },
   smoothHeightAnimate: (delay: number, container: JQuery): JQuery => {
      // Smoothly animates the height of a container element from a beginning height to a final
      // height.
      const elem = container || $('body').data().dnaCurrentContainer;
      const animate = () => {
         elem.css({ minHeight: 0, maxHeight: '100vh' });
         const turnOffTransition = () => elem.css({ transition: 'none', maxHeight: 'none' });
         window.setTimeout(turnOffTransition, 1000);  //allow 1s transition to finish
         };
      window.setTimeout(animate, delay || 50);  //allow container time to draw
      const setAnimationLength = () => elem.css({ transition: 'all 1s' });
      window.setTimeout(setAnimationLength, 10);  //allow baseline to lock in height
      return elem;
      },
   smoothMove: (elem: JQuery, up?: boolean, callback?: DnaCallback | null): JQuery => {
      // Uses animation to smoothly slide an element up or down one slot amongst its siblings.
      const fn = typeof callback === 'function' ? callback : null;
      const move = () => {
         const ghostElem = submissiveElem.clone(true);
         if (up)
            elem.after(submissiveElem.hide()).before(ghostElem);
         else
            elem.before(submissiveElem.hide()).after(ghostElem);
         let finishes = 0;
         const finish = () => finishes++ && fn && fn(elem);
         const animate = () => {
            dna.ui.slideFadeIn(submissiveElem, finish);
            dna.ui.slideFadeDelete(ghostElem, finish);
            };
         window.setTimeout(animate);
         };
      const submissiveElem = up ? elem.prev() : elem.next();
      if (submissiveElem.length)
         move();
      else if (fn)
         fn(elem);
      return elem;
      },
   smoothMoveUp: (elem: JQuery, callback?: DnaCallback | null): JQuery => {
      // Uses animation to smoothly slide an element up one slot amongst its siblings.
      return dna.ui.smoothMove(elem, true, callback);
      },
   smoothMoveDown: (elem: JQuery, callback?: DnaCallback | null): JQuery => {
      // Uses animation to smoothly slide an element down one slot amongst its siblings.
      return dna.ui.smoothMove(elem, false, callback);
      },
   toElem: (elemOrEventOrIndex: DnaElemEventIndex, that?: unknown): JQuery => {
      // A flexible way to get the jQuery element whether it is passed in directly, is a DOM
      // element, is the target of an event, or comes from the jQuery context.
      const elem = elemOrEventOrIndex instanceof $ && <JQuery>elemOrEventOrIndex;
      const target = elemOrEventOrIndex && (<JQuery.EventBase>elemOrEventOrIndex).target;
      return elem || $(target || elemOrEventOrIndex || that);
      }
   };

const dnaUtil = {
   apply: (fn: string | DnaCallback, params?: unknown | unknown[] | JQuery): unknown => {
      // Calls fn (string name or actual function) passing in params.
      // Usage:
      //    dna.util.apply('app.cart.buy', 7); ==> app.cart.buy(7);
      const args = dna.array.wrap(params);
      const elem = args[0] instanceof $ ? <JQuery>args[0] : null;
      let result;
      const contextApply = (context: DnaCallback | Record<string, unknown> | Window, names: string[]) => {
         const getFn = (): DnaCallback => <DnaCallback>(<Record<string, unknown>>context)[<string>names[0]];
         if (!context || names.length === 1 && typeof (<DnaDataObject>context)[<string>names[0]] !== 'function')
            dna.core.berserk('Callback function not found', fn);
         else if (names.length === 1)
            result = getFn().apply(elem, args);  //'app.cart.buy' ==> window['app']['cart']['buy']
         else
            contextApply(getFn(), names.slice(1));
         };
      const findFn = (names: string[]) => {
         if (elem)
            args.push(dna.ui.getComponent(elem));
         const context = dna.events.getContextDb();
         const name = <string>names[0];
         const idPattern = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/;
         const isUnknown = (): boolean => (window)[name] === undefined && !context[name];
         const topLevelGet = (null, eval);
         const callable = (): boolean =>
            ['object', 'function'].includes(topLevelGet('typeof ' + name));
         if (idPattern.test(name) && isUnknown() && callable())
            dna.registerContext(name, topLevelGet(name));
         contextApply(context[name] ? context : window, names);
         };
      if (elem && elem.length === 0)  //noop for emply list of elems
         result = elem;
      else if (typeof fn === 'function')  //run regular function with supplied arguments
         result = fn.apply(elem, args);
      else if (elem && (elem)[fn])  //run element's jQuery function
         result = (elem)[fn](args[1], args[2], args[3]);
      else if (typeof fn === 'string' && fn.length > 0)
         findFn(fn.split('.'));
      else if (fn === undefined || fn === null)
         result = null;
      else
         dna.core.berserk('Invalid callback function', fn);
      return result;
      },
   assign: (data: DnaDataObject, field: string | string[], value: unknown): DnaDataObject => {
      // Sets the field in the data object to the new value and returns the updated data object.
      // Example:
      //    dna.util.assign({ a: { b: 7 } }, 'a.b', 21);  //{ a: { b: 21 } }
      const fields = typeof field === 'string' ? field.split('.') : field;
      const name = <string>fields[0];
      const dataObj = $.isPlainObject(data) ? data : {};
      const nestedData = (): DnaDataObject =>
         dataObj[name] === undefined ? dataObj[name] = {} : <DnaDataObject>dataObj[name];
      if (fields.length === 1)
         dataObj[name] = value;
      else
         dna.util.assign(nestedData(), fields.slice(1), value);
      return dataObj;
      },
   printf: (format: string, ...values: unknown[]): string => {
      // Builds a formatted string by replacing the format specifiers with the supplied arguments.
      // Usage:
      //    dna.util.printf('Items in %s: %s', 'cart', 3) === 'Items in cart: 3';
      return values.reduce((output: string, value: unknown) =>
         output.replace(/%s/, String(value)), format);
      },
   realTruth: (value: unknown): boolean => {
      // Returns the "real" boolean truth of a value.
      // Examples:
      //    const trues =  [true,  1, '1', 't', 'T', 'TRue',  'Y', 'yes', 77, [5], {}, 'Colbert',  Infinity];
      //    const falses = [false, 0, '0', 'f', 'F', 'faLSE', 'N', 'no',  '', [], null, undefined, NaN];
      const falseyStr = () => /^(f|false|n|no|0)$/i.test(String(value));
      const emptyArray = () => value instanceof Array && value.length === 0;
      return !!value && !emptyArray() && !falseyStr();
      },
   toCamel: (kebabStr: string): string => {
      // Converts a kebab-case string (a code made of lowercase letters and dashes) to camelCase.
      // Example:
      //    dna.util.toCamel('ready-set-go') === 'readySetGo'
      const hump = (match: string, letter: string): string => letter.toUpperCase();
      return String(kebabStr).replace(/-(.)/g, hump);
      },
   toKebab: (camelStr: string): string => {
      // Converts a camelCase string to kebab-case (a code made of lowercase letters and dashes).
      // Example:
      //    dna.util.toKebab('readySetGo') === 'ready-set-go'
      const dash = (word: string) => '-' + word.toLowerCase();
      return ('' + camelStr).replace(/([A-Z]+)/g, dash).replace(/\s|^-/g, '');
      },
   value: (data: DnaDataObject, field: string | string[]): unknown => {
      // Returns the value of the field from the data object.
      // Example:
      //    dna.util.value({ a: { b: 7 } }, 'a.b') === 7
      if (typeof field === 'string')
         field = field.split('.');
      return data === null || data === undefined || field === undefined ? null :
         field.length === 1 ? data[<string>field[0]] :
         dna.util.value(<DnaDataObject>data[<string>field[0]], field.slice(1));
      },
   isObj: (value: unknown): boolean => {
      return !!value && typeof value === 'object' && !Array.isArray(value);
      },
   };

const dnaPlaceholder = {  //TODO: optimize
   // A template placeholder is only shown when its corresponding template is empty (has zero
   // clones).  The "data-placeholder" attribute specifies the name of the template.
   setup: (): JQuery => {
      $('option.dna-template').closest('select').addClass('dna-hide');
      const fade = (node: HTMLElement) => {
         const elem = $(node).stop(true);
         dna.getClones(elem.data().placeholder).length ? elem.fadeOut() : elem.fadeIn();
         };
      const placeholders = $('[data-placeholder]');
      placeholders.toArray().forEach(fade);
      return placeholders;
      }
   };

const dnaPanels = {
   // Each click of a menu item displays its corresponding panel and optionally passes the panel
   // element and hash to the function specified by the "data-callback" attribute.
   // Usage:
   //    <nav class=dna-menu data-nav={NAME} data-callback={CALLBACK}>
   //       <button>See X1</button>
   //       <button>See X2</button>
   //    </nav>
   //    <div class=dna-panels data-nav={NAME}>
   //       <section data-hash=x1>The X1</section>
   //       <section data-hash=x2>The X2</section>
   //    </div>
   // The optional "data-hash" attribute specifies the hash (URL fragment ID) and updates the
   // location bar.  The "data-nav" attributes can be omitted if the ".dna-panels" element
   // immediately follows the ".dna-menu" element.
   display: (menu: JQuery, location?: number, updateUrl?: boolean): JQuery => {
      // Shows the panel at the given location (index)
      const panels =    menu.data().dnaPanels;
      const navName =   menu.data().nav;
      const menuItems = menu.find('.menu-item');
      const bound = (loc: number) => Math.max(0, Math.min(loc, menuItems.length - 1));
      const index = bound(
         location === undefined ? <number>dna.pageToken.get(navName, 0) : <number>location);
      const dropDownElemType = 'SELECT';
      if ((<HTMLElement>menu[0]).nodeName === dropDownElemType)
         (<HTMLSelectElement>menu[0]).selectedIndex = index;
      menuItems.removeClass('selected').addClass('unselected');
      menuItems.eq(index).addClass('selected').removeClass('unselected');
      panels.hide().removeClass('displayed').addClass('hidden');
      const panel = panels.eq(index).fadeIn().addClass('displayed').removeClass('hidden');
      const hash = panel.data().hash;
      dna.pageToken.put(navName, index);
      if (updateUrl && hash)
         window.history.pushState(null, '', '#' + hash);
      dna.util.apply(menu.data().callback, [panel, hash]);
      return panel;
      },
   clickRotate: (event: JQuery.EventBase): JQuery => {
      // Moves to the selected panel
      const item = $(event.target).closest('.menu-item');
      const menu = item.closest('.dna-menu');
      return dna.panels.display(menu, menu.find('.menu-item').index(item), true);
      },
   selectRotate: (event: JQuery.EventBase): JQuery => {
      // Moves to the selected panel
      const menu = $(event.target);
      return dna.panels.display(menu, menu.find('option:selected').index(), true);
      },
   initialize: (panelHolder: JQuery): JQuery => {
      const initialized = 'dna-panels-initialized';
      const generateNavName = (): string => {
         const navName = 'dna-panels-' + $('body').data().dnaPanelNextNav++;
         panelHolder.attr('data-nav', navName).prev('.dna-menu').attr('data-nav', navName);
         return navName;
         };
      const init = () => {
         const navName =    panelHolder.data().nav || generateNavName();
         const menu =       $('.dna-menu[data-nav=' + navName + ']').addClass(initialized);
         const panels =     panelHolder.addClass(initialized).children().addClass('panel');
         const hash =       window.location.hash.replace(/[^\w-]/g, '');  //remove leading "#"
         const hashIndex =  (): number => panels.filter('[data-hash=' + hash + ']').index();
         const savedIndex = (): number => <number>dna.pageToken.get(navName, 0);
         const loc =        hash && panels.first().data().hash ? hashIndex() : savedIndex();
         if (!menu.length)
            dna.core.berserk('Menu not found for panels', navName);
         menu.data().dnaPanels = panels;
         if (!menu.find('.menu-item').length)  //set .menu-item elems if not set in the html
            menu.children().addClass('menu-item');
         dna.panels.display(menu, loc);
         };
      const isInitialized = !panelHolder.length || panelHolder.hasClass(initialized);
      if (!isInitialized && !panelHolder.children().hasClass('dna-template'))
         init();
      return panelHolder;
      },
   setup: (): JQuery => {
      $('body').data().dnaPanelNextNav = 1;
      const panels = $('.dna-panels');
      panels.toArray().forEach((node: HTMLElement) => dna.panels.initialize($(node)));
      $(window.document).on({ click:  dna.panels.clickRotate },  '.dna-menu .menu-item');
      $(window.document).on({ change: dna.panels.selectRotate }, '.dna-menu');
      return panels;
      }
   };

const dnaCompile = {
   // Pre-compile  Example                           Post-compile class + data().dnaRules
   // -----------  --------------------------------  ------------------------------------
   // template     <p id=x1 class=dna-template>      class=dna-clone
   // array        <p data-array=~~tags~~>           class=dna-nucleotide + array='tags'
   // field        <p>~~tag~~</p>                    class=dna-nucleotide + text='tag'
   // attribute    <p id=~~num~~>                    class=dna-nucleotide + attrs=['id', ['', 'num', '']]
   // rule         <p data-true=~~on~~>              class=dna-nucleotide + true='on'
   // attr rule    <p data-attr-src=~~url~~>         class=dna-nucleotide + attrs=['src', ['', 'url', '']]
   // prop rule    <input data-prop-checked=~~on~~>  class=dna-nucleotide + props=['checked', 'on']
   // select rule  <select data-option=~~day~~>      class=dna-nucleotide + option='day'
   // transform    <p data-transform=app.enhance>    class=dna-nucleotide + transform='app.enhance'
   // callback     <p data-callback=app.configure>   class=dna-nucleotide + callback='app.configure'
   //
   // Rules                                      data().dnaRules
   // -----------------------------------------  ---------------
   // data-class=~~field,name-true,name-false~~  class=[['field','name-true','name-false']]
   // data-attr-{NAME}=pre~~field~~post          attrs=['{NAME}', ['pre', 'field', 'post']]
   // data-prop-{NAME}=pre~~field~~post          props=['{NAME}', 'field']
   // data-option=~~field~~                      option='field'
   // data-require=~~field~~                     require='field'
   // data-missing=~~field~~                     missing='field'
   // data-true=~~field~~                        true='field'
   // data-false=~~field~~                       false='field'
   // data-transform=func                        transform='func'
   // data-callback=func                         callback='func'
   //
   regex: {
      dnaField:     /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,  //example: ~~title~~
      dnaBasePair:  /~~|{{|}}/,  //matches the '~~' string
      dnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two '~~' strings so they can be removed
      },
   setupNucleotide: (elem: JQuery): JQuery => {
      if (!elem.data().dnaRules)
         elem.data().dnaRules = <DnaRules>{};
      return elem.addClass('dna-nucleotide');
      },
   isDnaField: (index: number, node: HTMLElement): boolean => {
      const firstNode = <ChildNode>node.childNodes[0];
      const matches = (): boolean => !!firstNode.nodeValue?.match(dna.compile.regex.dnaField);
      return firstNode && !!firstNode.nodeValue && matches();
      },
   addFieldClass: (elem: JQuery): JQuery => {
      const field = elem.data().dnaField;
      const htmlCase = () => dna.util.toKebab(field).replace(/[[\]]/g, '').replace(/[.]/g, '-');
      return field ? elem.addClass('dna-field-' + htmlCase()) : elem;
      },
   field: (index: number, node: HTMLElement): void => {
      // Examples:
      //    <p>~~name~~</p>  ==>
      //       <p class=dna-nucleotide data-dnaField=name data-dnaRules={ text: true }></p>
      //    <textarea>~~address~~</textarea>  ==>
      //       <textarea class=dna-nucleotide data-dnaField=address data-dnaRules={ val: true }></p>
      const elem = dna.compile.setupNucleotide($(node));
      elem.data().dnaField = elem.text().replace(dna.compile.regex.dnaBasePairs, '').trim();
      dna.compile.addFieldClass(elem);
      if (elem.is('textarea'))
         elem.addClass('dna-update-model').data().dnaRules.val = true;
      else
         elem.data().dnaRules.text = true;
      elem.empty();
      },
   propsAndAttrs: (index: number, node: HTMLElement): void => {
      // Examples:
      //    <p id=~~num~~>                  ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['id', ['', 'num', '']] }>
      //    <p data-attr-src=~~url~~>       ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['src', ['', 'url', '']] }>
      //    <p data-tag=~~[count]~~>        ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['data-tag', ['', 1, '']] }>
      //    <p data-tag=~~[value]~~>        ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['data-tag', ['', 2, '']] }>
      //    <input type=checkbox data-prop-checked=~~set~~>
      //                                    ==>  <option class=dna-nucleotide + data-dnaRules={ props: ['selected', 'set'] }>
      //    <select data-option=~~color~~>  ==>  <select class=dna-nucleotide + data-dnaRules={ val: true } + data-dnaField=color>
      const elem = $(node);
      const props: string[] = [];
      const attrs: DnaAttrItem[] = [];
      const names: string[] = [];
      const compileProp = (key: string, value: string) => {
         names.push(key);
         key = key.replace(/^data-prop-/, '').toLowerCase();
         value = value.replace(dna.compile.regex.dnaBasePairs, '');
         props.push(key, value);
         if (key === 'checked' && elem.is('input'))
            elem.addClass('dna-update-model').data().dnaField = value;
         };
      const compileAttr = (key: string, value: string) => {
         const parts = <[string, DnaFieldName | 1 | 2, string]>value.split(dna.compile.regex.dnaBasePair);
         if (parts[1] === '[count]')
            parts[1] = 1;
         else if (parts[1] === '[value]')
            parts[1] = 2;
         attrs.push(<DnaAttrName>key.replace(/^data-attr-/, ''), <DnaAttrItem>parts);
         names.push(key);
         const makeUpdatable = () => {
            dna.compile.setupNucleotide(elem).addClass('dna-update-model');
            elem.data().dnaField = parts[1];
            elem.data().dnaRules.val = true;
            };
         const hasTextVal = elem.is('input:not(:checkbox, :radio)') &&
            key === 'value' && parts[0] === '' && parts[2] === '';
         if (hasTextVal || elem.is('select') && key === 'data-option')
            makeUpdatable();
         };
      const compile = (attr: Attr) => {
         if (/^data-prop-/.test(attr.name))
            compileProp(attr.name, attr.value);
         else if (attr.value.split(dna.compile.regex.dnaBasePair).length === 3)
            compileAttr(attr.name, attr.value);
         };
      dna.ui.getAttrs(elem).forEach(compile);
      const getRules = (): DnaRules => dna.compile.setupNucleotide(elem).data().dnaRules;
      if (props.length > 0)
         getRules().props = props;
      if (attrs.length > 0)
         getRules().attrs = attrs;
      if (elem.data().transform)  //TODO: Determine if it's better to process only at top-level of clone
         getRules().transform = elem.data().transform;  //TODO: string to fn
      if (elem.data().callback)
         getRules().callback = elem.data().callback;
      dna.compile.addFieldClass(elem);
      elem.removeAttr(names.join(' '));
      },
   getDataField: (elem: JQuery, type: string): string => {
      // Example:
      //    <p data-array=~~tags~~>, 'array'  ==>  'tags'
      return elem.data(type).replace(dna.compile.regex.dnaBasePairs, '').trim();
      },
   subTemplateName: (holder: JQuery | string, arrayField: string): string => {  //holder can be element or template name
      // Example:
      //    subTemplateName('book', 'authors') ==> 'book-authors-instance'
      const getRules = (): DnaRules => dna.getClone(<JQuery>holder, { main: true }).data().dnaRules;
      const templateName = holder instanceof $ ? getRules().template : holder;
      return templateName + '-' + arrayField + '-instance';
      },
   rules: (elems: JQuery, type: string, isLists?: boolean): JQuery => {
      // Example:
      //    <p data-require=~~title~~>, 'require'  ==>  <p data-dnaRules={ require: 'title' }>
      const typedElems = elems.filter('[data-' + type + ']');
      const addRule = (node: HTMLElement) => {
         const elem = dna.compile.setupNucleotide($(node));
         const field = dna.compile.getDataField(elem, type);
         const makeLists = () => field.split(';').map((list: string) => list.split(','));
         elem.data().dnaRules[type] = isLists ? makeLists() : field;
         };
      typedElems.toArray().forEach(addRule);
      return typedElems.removeAttr('data-' + type);
      },
   separators: (elem: JQuery): JQuery => {
      // Convert: data-separator=", "  ==>  <span class=dna-separator>, </span>
      const isWhitespaceNode = (index: number, node: Node): boolean =>
         node.nodeType === 3 && !/\S/.test(<string>node.nodeValue);
      const append = (templateElem: JQuery, text: string, className: string) => {
         const doAppend = () => {
            templateElem.contents().last().filter(isWhitespaceNode).remove();
            templateElem.append($('<span>').addClass(className).html(text));
            };
         return text && doAppend();
         };
      const processTemplate = (node: HTMLElement) => {
         const templateElem = $(node);
         append(templateElem, templateElem.data().separator,     'dna-separator');
         append(templateElem, templateElem.data().lastSeparator, 'dna-last-separator');
         };
      const clones = elem.find('.dna-template, .dna-sub-clone').addBack();
      clones.toArray().forEach(processTemplate);
      return clones;
      },
   template: (name: string): DnaTemplate => {  //prepare and stash template so it can be cloned
      const elem = $('#' + name);
      if (!elem.length)
         dna.core.berserk('Template not found', name);
      const saveName = (index: number, node: HTMLElement) => {
         $(node).data().dnaRules = <DnaRules>{ template: $(node).attr('id'), subs: [] };
         };
      const initSubs = (index: number, node: HTMLElement) => {
         $(node).data().dnaRules.subs = [];
         };
      elem.find('.dna-template').addBack().each(saveName).removeAttr('id').each(initSubs);
      const elems = elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.field).addClass('dna-field');
      dna.compile.rules(elems, 'array').addClass('dna-sub-clone').each(initSubs);
      dna.compile.rules(elems, 'class', true);
      dna.compile.rules(elems, 'require');
      dna.compile.rules(elems, 'missing');
      dna.compile.rules(elems, 'true');
      dna.compile.rules(elems, 'false');
      elems.each(dna.compile.propsAndAttrs);
      dna.compile.separators(elem);
      //support html5 values for "type" attribute
      const setTypeAttr = (index: number, node: HTMLElement) => {
         $(node).attr({ type: $(node).data().attrType });
         };
      $('input[data-attr-type]').each(setTypeAttr);
      return dna.store.stash(elem);
      }
   };

const dnaStore = {
   // Handles storage and retrieval of templates
   getTemplateDb: (): DnaTemplateDb => {
      const store = $('body').data();
      const initStore = () => store.dnaTemplateDb = {};
      return store.dnaTemplateDb || initStore();
      },
   stash: (elem: JQuery): DnaTemplate => {
      const name = elem.data().dnaRules.template;
      const move = (index: number, node: HTMLElement) => {
         const elem = $(node);
         const name = elem.data().dnaRules.template;
         const container = elem.parent();
         const wrapped = container.children().length === 1 && !container.hasClass('dna-container');
         const compileSiblings = () => {
            container.data().dnaContents = true;
            const templateName = (node: HTMLElement): boolean => {
               const elem = $(node);
               const compileToName = (id?: string) => id ? dna.compile.template(id).name : name;
               return elem.hasClass('dna-template') ? compileToName(elem.attr('id')) :
                  elem.hasClass('dna-sub-clone') ? elem.data().dnaRules.template : false;
               };
            container.data().dnaContents = container.children().toArray().map(templateName);
            };
         if (!wrapped && !container.data().dnaContents)
            compileSiblings();
         const template = <DnaTemplate>{
            name:       name,
            elem:       elem,
            container:  container.addClass('dna-container').addClass('dna-contains-' + name),
            nested:     container.closest('.dna-clone').length !== 0,
            separators: elem.find('.dna-separator, .dna-last-separator').length,
            wrapped:    wrapped
            };
         dna.store.getTemplateDb()[name] = template;
         elem.removeClass('dna-template').addClass('dna-clone').addClass(name).detach();
         };
      const prepLoop = (index: number, node: HTMLElement) => {
         // Pre (sub-template array loops -- data-array):
         //    class=dna-sub-clone data().dnaRules.array='field'
         // Post (elem):
         //    data().dnaRules.template='{NAME}-{FIELD}-instance'
         // Post (container)
         //    class=dna-nucleotide +
         //       data().dnaRules.loop={ name: '{NAME}-{FIELD}-instance', field: 'field' }
         const rules = $(node).data().dnaRules;
         const parent = dna.compile.setupNucleotide($(node).parent()).addClass('dna-array');
         rules.template = dna.compile.subTemplateName(name, rules.array);
         parent.data().dnaRules.loop = { name: rules.template, field: rules.array };
         parent.closest('.dna-clone, .dna-sub-clone').data().dnaRules.subs.push(rules.array);
         };
      elem.find('.dna-template').addBack().each(move);
      elem.find('.dna-sub-clone').each(prepLoop).each(move);
      return <DnaTemplate>dna.store.getTemplateDb()[name];
      },
   getTemplate: (name: string): DnaTemplate => {
      return dna.store.getTemplateDb()[name] || dna.compile.template(name);
      }
   };

const dnaEvents = {
   getContextDb: (): DnaContext => {
      const store = $('body').data();
      const initStore = () => store.dnaContextDb = {};
      return store.dnaContextDb || initStore();  //storage to register callbacks when dna.js is module loaded without window scope (webpack)
      },
   getInitializers: (): DnaInitializer[] => {
      const store = $('body').data();
      const initStore = () => store.dnaInitializers = [];
      return store.dnaInitializers || initStore();  //example: [{ func: 'app.bar.setup', selector: '.progress-bar' }]
      },
   runOnLoads: (): JQuery => {
      // Example:
      //    <p data-on-load=app.cart.setup>
      const elems = $('[data-on-load]').not('.dna-loaded');
      const run = (node: HTMLElement) => dna.util.apply($(node).data().onLoad, $(node));
      elems.toArray().forEach(run);
      return elems.addClass('dna-loaded');
      },
   runInitializers: (root: JQuery): JQuery => {
      // Executes data-callback functions plus registered initializers
      const init = (initializer: DnaInitializer) => {
         const find =   (selector: string): JQuery => root.find(selector).addBack(selector);
         const elems =  initializer.selector ? find(initializer.selector) : root;
         const data =   dna.array.wrap(initializer.params);
         const params = [<unknown>elems.addClass('dna-initialized')].concat(data);
         dna.util.apply(initializer.fn, params);
         };
      dna.events.getInitializers().forEach(init);
      return root;
      },
   setup: (): JQuery => {
      const runner = (elem: JQuery, type: string, event: JQuery.EventBase) => {
         // Finds elements for given event type and executes callback passing in the element,
         //    event, and component (container element with "data-component" attribute)
         // Types: click|change|input|key-up|key-down|key-press|enter-key
         const target = elem.closest('[data-' + type + ']');
         const fn = target.data(type);
         const isLink = target[0] && target[0].nodeName === 'A';
         if (type === 'click' && isLink && fn && fn.match(/^dna[.]/))
            event.preventDefault();
         const nextClickTarget = target.parent().closest('[data-click]');
         if (type === 'click' && nextClickTarget.length)
            runner(nextClickTarget, type, event);
         return dna.util.apply(fn, [target, event]);
         };
      const handleEvent = (event: JQuery.EventBase) => {
         const target =       $(event.target);
         const updateField =  (elem: JQuery, calc: DnaCallback) =>
            dna.util.assign(<DnaDataObject>dna.getModel(elem), elem.data().dnaField, calc(elem));
         const getValue =     (elem: JQuery) => elem.val();
         const isChecked =    (elem: JQuery): boolean => elem.is(':checked');
         const updateOption = (index: number, node: HTMLElement) => {
            updateField($(node), <DnaCallback>isChecked);
            };
         const updateModel =  () => {
            const mainClone = dna.getClone(target, { main: true });
            if (mainClone.length === 0) {  //TODO: figure out why some events are captured on the template instead of the clone
               //console.log('Error -- event not on clone:', event.timeStamp, event.type, target);
               return;
               }
            if (target.is('input:checkbox'))
               updateField(target, <DnaCallback>isChecked);
            else if (target.is('input:radio'))
               $('input:radio[name=' + target.attr('name') + ']').each(updateOption);
            else if (target.data().dnaRules.val)
               updateField(target, <DnaCallback>getValue);
            dna.refresh(mainClone);
            };
         if (target.hasClass('dna-update-model'))
            updateModel();
         return runner(target, event.type.replace('key', 'key-'), event);
         };
      const handleEnterKey = (event: JQuery.EventBase) => {
         return event.key === 'Enter' && runner($(event.target), 'enter-key', event);
         };
      const handleSmartUpdate = (event: JQuery.EventBase) => {
         const defaultThrottle = 1000;  //default 1 second delay between callbacks
         const elem = $(event.target);
         const data = elem.data();
         const doCallback = () => {
            data.dnaLastUpdated = Date.now();
            data.dnaLastValue = elem.val();
            data.dnaTimeoutId = null;
            runner(elem, 'smart-update', event);
            };
         const handleChange = () => {
            const throttle = data.smartThrottle ? +data.smartThrottle : defaultThrottle;
            if (Date.now() < data.dnaLastUpdated + throttle)
               data.dnaTimeoutId = window.setTimeout(doCallback, throttle);
            else
               doCallback();
            };
         const checkForValueChange = () => {
            if (elem.val() !== data.dnaLastValue && !data.dnaTimeoutId)
               handleChange();
            };
         const processSmartUpdate = () => {
            if (event.type === 'keydown' && data.dnaLastValue === undefined)
               data.dnaLastValue = elem.val();
            window.setTimeout(checkForValueChange);  //requeue so elem.val() is ready on paste event
            };
         if (data.smartUpdate)
            processSmartUpdate();
         };
      const jumpToUrl = (event: JQuery.EventBase) => {
         // Usage:
         //    <button data-href=https://dnajs.org>dna.js</button>
         // If element (or parent) has the class "external-site", page will be opened in a new tab.
         const elem = $(event.target).closest('[data-href]');
         const iOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
            /Apple/.test(window.navigator.vendor);
         const target = elem.closest('.external-site').length ? '_blank' : '_self';
         window.open(elem.data().href, iOS ? '_self' : elem.data().target || target);
         };
      const makeEventHandler = (type: string) =>
         (event: JQuery.EventBase) => runner($(event.target), type, event);
      const events = {
         click:    handleEvent,
         change:   handleEvent,
         keydown:  handleEvent,
         keypress: handleEvent,
         keyup:    handleEvent,
         input:    handleEvent
         };
      const smartUpdateEvents = {
         keydown: handleSmartUpdate,
         keyup:   handleSmartUpdate,
         change:  handleSmartUpdate,
         cut:     handleSmartUpdate,
         paste:   handleSmartUpdate
         };
      $(window.document)
         .on(events)
         .on(smartUpdateEvents)
         .on({ keyup:      handleEnterKey })
         .on({ click:      jumpToUrl }, '[data-href]')
         .on({ focusin:    makeEventHandler('focus-in') },  '[data-focus-in]')
         .on({ focusout:   makeEventHandler('focus-out') }, '[data-focus-out]')
         .on({ mouseenter: makeEventHandler('hover-in') },  '[data-hover-in]')
         .on({ mouseleave: makeEventHandler('hover-out') }, '[data-hover-out]');
      return dna.events.runOnLoads();
      }
   };

const dnaCore = {
   inject: (clone: JQuery, data: DnaModel, count: number, settings: DnaOptionsClone): JQuery => {
      // Inserts data into clone and runs rules
      const injectField = (elem: JQuery, field: string) => {
         const value = field === '[count]' ? count : field === '[value]' ? data :
            dna.util.value(<DnaDataObject>data, field);
         if (['string', 'number', 'boolean'].indexOf(typeof value) !== -1)
            elem = settings.html ? elem.html(String(value)) : elem.text(String(value));
         };
      const injectValue = (elem: JQuery, field: string) => {
         const value = field === '[count]' ? count : field === '[value]' ? data :
            dna.util.value(<DnaDataObject>data, field);
         if (value !== null && value !== elem.val())
            elem.val(String(value));
         };
      const injectProps = (elem: JQuery, props: string[]) => {  //example props: ['selected', 'set']
         for (let prop = 0; prop < props.length/2; prop++)  //each prop has a key and a field name
            elem.prop(<string>props[prop*2],
               dna.util.realTruth(dna.util.value(<DnaDataObject>data, <string>props[prop*2 + 1])));
         };
      const injectAttrs = (elem: JQuery, attrs: DnaAttrItem[]) => {  //example attrs: ['data-tag', ['', 'tag', '']]
         for (let i = 0; i < attrs.length / 2; i++) {  //each attr has a key and parts
            const key = <DnaAttrName>attrs[i*2];
            const parts = <[string, string | 1 | 2, string]>attrs[i*2 + 1];  //example: 'J~~code.num~~' ==> ['J', 'code.num', '']
            const field = parts[1];
            const core = field === 1 ? count : field === 2 ? data : dna.util.value(<DnaDataObject>data, field);
            const value = [parts[0], core, parts[2]].join('');
            elem.attr(key, value);
            if (/^data-./.test(key))
               elem.data(key.substring(5), value);
            if (key === 'value' && value !== elem.val())  //set elem val for input fields (example: <input value=~~tag~~>)
               elem.val(value);
            }
         };
      const injectClass = (elem: JQuery, classLists: string[][]) => {
         // classLists = [['field', 'class-true', 'class-false'], ...]
         const process = (classList: string[]) => {
            const value = dna.util.value(<DnaDataObject>data, <string>classList[0]);
            const truth = dna.util.realTruth(value);
            const setBooleanClasses = () => {
               elem.toggleClass(<string>classList[1], truth);
               if (classList[2])
                  elem.toggleClass(classList[2], !truth);
               };
            if (classList.length === 1)
               elem.addClass(String(value));
            else if (classList.length > 1)
               setBooleanClasses();
            };
         classLists.forEach(process);
         };
      const fieldExists = (fieldName: string): boolean => {
         const value = dna.util.value(<DnaDataObject>data, fieldName);
         return value !== undefined && value !== null;
         };
      const processLoop = (elem: JQuery, loop: DnaLoop) => {
         const dataArray = <DnaModel[]>dna.util.value(<DnaDataObject>data, loop.field);
         const subClones = elem.children('.' + loop.name.replace(/[.]/g, '\\.'));
         const injectSubClone = (index: number, node: HTMLElement) => {
            const elem = $(node);
            if (!elem.is('option'))  //prevent select from closing on chrome
               dna.core.inject(elem, <DnaModel>dataArray[index], index + 1, settings);
            };
         const rebuildSubClones = () => {
            subClones.remove();
            dna.clone(loop.name, dataArray, { container: elem, html: settings.html });
            };
         if (!dataArray)
            (data[loop.field]) = [];
         else if (dataArray.length === subClones.length)
            subClones.each(injectSubClone);
         else
            rebuildSubClones();
         };
      const process = (index: number, node: HTMLElement) => {
         const elem = $(node);
         const dnaRules = <DnaRules>elem.data().dnaRules;
         if (dnaRules.transform)  //alternate version of the "transform" option
            dna.util.apply(dnaRules.transform, data);
         if (dnaRules.loop)
            processLoop(elem, dnaRules.loop);
         if (dnaRules.text)
            injectField(elem, elem.data().dnaField);
         if (dnaRules.val)
            injectValue(elem, elem.data().dnaField);
         if (dnaRules.props)
            injectProps(elem, dnaRules.props);
         if (dnaRules.attrs)
            injectAttrs(elem, dnaRules.attrs);
         if (dnaRules.class)
            injectClass(elem, dnaRules.class);
         if (dnaRules.require)
            elem.toggle(fieldExists(dnaRules.require));
         if (dnaRules.missing)
            elem.toggle(!fieldExists(dnaRules.missing));
         if (dnaRules.true)
            elem.toggle(dna.util.realTruth(dna.util.value(<DnaDataObject>data, dnaRules.true)));
         if (dnaRules.false)
            elem.toggle(!dna.util.realTruth(dna.util.value(<DnaDataObject>data, dnaRules.false)));
         if (dnaRules.callback)
            dna.util.apply(dnaRules.callback, elem);
         };
      const dig = (elems: JQuery) => {
         elems.filter('.dna-nucleotide').each(process);
         if (elems.length)
            dig(elems.children().not('.dna-sub-clone'));
         };
      if (settings.transform)  //alternate version of data-transform
         settings.transform(data);
      dig(clone);
      clone.data().dnaModel = data;
      clone.data().dnaCount = count;
      return clone;
      },
   replicate: (template: DnaTemplate, data: DnaModel, settings: DnaOptionsClone): JQuery => {  //make and setup the clone
      const displaySeparators = () => {
         const clones = container.children('.' + template.name);
         clones.find('.dna-separator').show().end().last().find('.dna-separator').hide();
         clones.find('.dna-last-separator').hide().end().eq(-2).find('.dna-last-separator').show()
            .closest('.dna-clone').find('.dna-separator').hide();
         };
      const selector =  '.dna-contains-' + template.name.replace(/[.]/g, '\\.');
      const container = settings.container ?
         settings.container.find(selector).addBack(selector) : template.container;
      const clone = template.elem.clone(true, true);
      const name = clone.data().dnaRules.template;
      if (!container.data().dnaCountsMap)
         container.data().dnaCountsMap = {};
      const countsMap = container.data().dnaCountsMap;
      countsMap[name] = (countsMap[name] || 0) + 1;
      dna.core.inject(clone, data, countsMap[name], settings);
      const intoUnwrapped = () => {
         const firstClone = () => {
            const contents = container.data().dnaContents;
            const i = contents.indexOf(template.name);
            const adjustment = (clonesAbove: number, name: string) =>
               clonesAbove + (name && contents.indexOf(name) < i ?
                  allClones.filter('.' + name).length - 1 : 0);
            const target = container.children().eq(i + contents.reduce(adjustment, 0));
            if (target.length)
               target.before(clone);
            else
               container.append(clone);
            };
         const allClones = container.children('.dna-clone');
         const sameClones = allClones.filter('.' + template.name);
         if (!sameClones.length)
            firstClone();
         else if (settings.top)
            sameClones.first().before(clone);
         else
            sameClones.last().after(clone);
         };
      if (!template.wrapped)
         intoUnwrapped();
      else if (settings.top)
         container.prepend(clone);
      else
         container.append(clone);
      if (template.separators)
         displaySeparators();
      dna.events.runInitializers(clone);
      if (settings.callback)
         settings.callback(clone, data);
      if (settings.fade)
         dna.ui.slideFadeIn(clone);
      return clone;
      },
   getArrayName: (subClone: JQuery): string | null => {
      return subClone.hasClass('dna-sub-clone') ? subClone.data().dnaRules.array : null;
      },
   updateArrayByName: (clone: JQuery, arrayField: string | null): JQuery => {
      const update = (elem: JQuery, field: string): JQuery => {
         const name = dna.compile.subTemplateName(elem, field);
         if (elem.data().dnaRules.subs.includes(field))
            (<DnaDataObject>dna.getModel(elem))[field] =
               elem.find('.' + name).toArray().map(node => dna.getModel($(node)));
         return elem;
         };
      return arrayField ? update(dna.getClone(clone), arrayField) : clone;
      },
   updateArray: (subClone: JQuery): JQuery => {
      const elem = dna.getClone(subClone.first());
      dna.core.updateArrayByName(elem.parent(), dna.core.getArrayName(elem));
      return elem;
      },
   remove: (clone: JQuery, callback?: DnaCallback | null): JQuery => {
      const container = clone.parent();
      clone.detach();
      dna.core.updateArrayByName(container, dna.core.getArrayName(clone));
      dna.placeholder.setup();
      clone.remove();
      if (callback)
         callback(clone);
      return clone;
      },
   berserk: (message: string, info: unknown): void => {  //oops, file a tps report
      try {
         throw Error('dna.js ~~ ' + message + ' [' + String(info) + ']');
         }
      catch (e) {
         console.error(e.stack);
         throw Error(e);
         }
      },
   plugin: (): void => {
      // Example:
      //    dna.getClone(elem).dna('up');
      // Supported actions:
      //    'bye', 'clone-sub', 'destroy', 'down', 'refresh', 'up'
      $.fn['dna'] = function(action: DnaPluginAction, ...params: unknown[]) {  //any additional parameters are passed to the api call
         const dnaApi = dna[dna.util.toCamel(action)];
         if (!dnaApi)
            dna.core.berserk('Unknown plugin action', action);
         const callApi = (index: number, node: HTMLElement) =>
            dnaApi($(node), params[0], params[1], params[2]);
         this.each(callApi);
         };
      },
   setup: (): unknown => {
      const setupBrowser = () => {
         dna.core.plugin();
         $(dna.placeholder.setup);
         $(dna.panels.setup);
         $(dna.events.setup);
         };
      if (typeof window === 'object' && typeof $ === 'function')
         setupBrowser();
      return dna;
      }
   };

const dna = {
   version: '[VERSION]',
   // API:
   //    dna.clone()
   //    dna.cloneSub()
   //    dna.createTemplate()
   //    dna.templateExists()
   //    dna.getModel()
   //    dna.empty()
   //    dna.insert()
   //    dna.refresh()
   //    dna.refreshAll()
   //    dna.updateField()
   //    dna.recount()
   //    dna.destroy()
   //    dna.getClone()
   //    dna.getClones()
   //    dna.getIndex()
   //    dna.up()
   //    dna.down()
   //    dna.bye()
   //    dna.registerInitializer()
   //    dna.registerContext()
   //    dna.info()
   // See: https://dnajs.org/docs/#api
   clone(name: string, data: DnaModel, options?: DnaOptionsClone): JQuery {
      // Generates a copy of the template and populates the fields, attributes, and
      // classes from the supplied data.
      const defaults = {
         fade:      false,
         top:       false,
         container: null,
         empty:     false,
         clones:    1,
         html:      false,
         transform: null,
         callback:  null
         };
      const settings = { ...defaults, ...options };
      const template = dna.store.getTemplate(name);
      if (template.nested && !settings.container)
         dna.core.berserk('Container missing for nested template', name);
      if (settings.empty)
         dna.empty(name);
      const list = [].concat(...Array(settings.clones).fill(data));
      let clones = $();
      const addClone = (model: DnaModel) =>
         clones = clones.add(dna.core.replicate(template, model, settings));
      list.forEach(addClone);
      dna.placeholder.setup();
      dna.panels.initialize(clones.first().closest('.dna-panels'));
      clones.first().parents('.dna-hide').removeClass('dna-hide').addClass('dna-unhide');
      return clones;
      },
   cloneSub(holderClone: JQuery, arrayField: string, data: DnaModel, options?: DnaOptionsCloneSub): JQuery {
      // Clones a sub-template to append onto an array loop.
      const name = dna.compile.subTemplateName(holderClone, arrayField);
      const selector = '.dna-contains-' + name;
      const settings = { container: holderClone.find(selector).addBack(selector) };
      const clones = dna.clone(name, data, { ...settings, ...options });
      dna.core.updateArray(clones);
      return clones;
      },
   createTemplate(name: string, html: string, holder: JQuery): DnaTemplate {
      // Generates a template from an HTML string.
      $(html).attr({ id: name }).addClass('dna-template').appendTo(holder);
      return dna.store.getTemplate(name);
      },
   templateExists(name: string): boolean {
      return !!dna.store.getTemplateDb()[name] || $('.dna-template#' + name).length > 0;
      },
   getModel(elemOrName: JQuery | string, options?: DnaOptionsGetModel): DnaModel | undefined {
      // Returns the underlying data of the clone.
      const getOne = (elem: JQuery) =>
         dna.getClone($(elem), options).data('dnaModel');
      const getAll = (name: string) =>
         dna.getClones(name).toArray().map(node => getOne($(node)));
      return typeof elemOrName === 'string' ? getAll(elemOrName) : getOne(elemOrName);
      },
   empty(name: string, options?: DnaOptionsEmpty): JQuery {
      // Deletes all clones generated from the template.
      const defaults = { fade: false, callback: null };
      const settings = { ...defaults, ...options };
      const template = dna.store.getTemplate(name);
      const clones = template.container.children('.dna-clone');
      if (template.container.data().dnaCountsMap)
         template.container.data().dnaCountsMap[name] = 0;
      const fadeDelete = () => dna.ui.slideFadeDelete(clones, settings.callback);
      return settings.fade ? fadeDelete() : dna.core.remove(clones, settings.callback);
      },
   insert(name: string, data: DnaModel, options?: DnaOptionsInsert): JQuery {
      // Updates the first clone if it already exists otherwise creates the first clone.
      const clone = dna.getClones(name).first();
      return clone.length ? dna.refresh(clone, { data: data, html: options && options.html }) :
         dna.clone(name, data, options);
      },
   refresh(clone: JQuery, options?: DnaOptionsRefresh): JQuery {
      // Updates an existing clone to reflect changes to the data model.
      const defaults = { html: false };
      const settings = { ...defaults, ...options };
      const elem = dna.getClone(clone, options);
      const data = settings.data ? <DnaModel>settings.data : <DnaModel>dna.getModel(elem);
      return dna.core.inject(elem, data, elem.data().dnaCount, settings);
      },
   refreshAll(name: string, options?: DnaOptionsRefreshAll): JQuery {
      // Updates all the clones of the specified template.
      const clones = dna.getClones(name);
      const refresh = (node: HTMLElement) => { dna.refresh($(node), options); };
      clones.toArray().forEach(refresh);
      return clones;
      },
   updateField(inputElem: JQuery, value: unknown): JQuery {
      const field = inputElem.data() && inputElem.data().dnaField;
      const update = () => {
         if (inputElem.is('input:checkbox'))
            inputElem.prop('checked', !!value);
         else if (inputElem.is('input:radio'))
            inputElem.prop('checked', !!value);  //TOOD: if true, deselect other buttons in model
         else if (inputElem.is('input, select, textarea'))
            inputElem.val(String(value));
         const model = <DnaDataObject>dna.getModel(inputElem);
         model[field] = value;
         };
      if (field)
         update();
      return inputElem;
      },
   recount(clone: JQuery, options?: DnaOptionsRecount): JQuery {
      // Renumbers the counters starting from 1 for the clone and its siblings based on DOM order.
      clone = dna.getClone(clone);
      const renumber = () => {
         const name = clone.data().dnaRules.template;
         const update = (index: number, node: HTMLElement) => {
            const elem = $(node);
            elem.data().dnaCount = index + 1;
            dna.refresh(elem, options);
            };
         const container = clone.parent();
         const clones = container.children('.dna-clone.' + name).each(update);
         container.data().dnaCountsMap = container.data().dnaCountsMap || {};
         container.data().dnaCountsMap[name] = clones.length;
         };
      if (clone.length)
         renumber();
      return clone;
      },
   destroy(clone: JQuery, options?: DnaOptionsDestroy): JQuery {
      // Removes an existing clone from the DOM.
      const defaults = { main: false, fade: false, callback: null };
      const settings = { ...defaults, ...options };
      clone = dna.getClone(clone, options);
      const arrayField = dna.core.getArrayName(clone);
      if (arrayField)
         (<DnaModel>dna.getModel(clone.parent()))[arrayField].splice(dna.getIndex(clone), 1);
      const fadeDelete = () => dna.ui.slideFadeDelete(clone, settings.callback);
      return settings.fade ? fadeDelete() : dna.core.remove(clone, settings.callback);
      },
   getClone(elem: JQuery, options?: DnaOptionsGetClone): JQuery {
      // Returns the clone (or sub-clone) for the specified element.
      const defaults = { main: false };
      const settings = { ...defaults, ...options };
      const selector = settings.main ? '.dna-clone:not(.dna-sub-clone)' : '.dna-clone';
      return elem instanceof $ ? elem.closest(selector) : $();
      },
   getClones(name: string): JQuery {
      // Returns an array of all the existing clones for the given template.
      return dna.store.getTemplate(name).container.children('.dna-clone.' + name);
      },
   getIndex(elem: JQuery, options?: DnaOptionsGetIndex): number {
      // Returns the index of the clone.
      const clone = dna.getClone(elem, options);
      return clone.parent().children('.dna-clone.' + clone.data().dnaRules.template).index(clone);
      },
   up(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallback): JQuery {
      // Smoothly moves a clone up one slot effectively swapping its position with the previous
      // clone.
      const elem = dna.ui.toElem(elemOrEventOrIndex, this);
      return dna.ui.smoothMoveUp(dna.getClone(elem), callback);
      },
   down(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallback): JQuery {
      // Smoothly moves a clone down one slot effectively swapping its position with the next
      // clone.
      const elem = dna.ui.toElem(elemOrEventOrIndex, this);
      return dna.ui.smoothMoveDown(dna.getClone(elem), callback);
      },
   bye(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallback): JQuery {
      // Performs a sliding fade out effect on the clone and then removes the element.
      const elem = dna.ui.toElem(elemOrEventOrIndex, this);
      const fn = typeof callback === 'function' ? callback : null;
      return dna.destroy(elem, { fade: true, callback: fn });
      },
   registerInitializer(fn: DnaCallback, options?: DnaOptionsRegisterInitializer): DnaInitializer[] {
      // Adds a callback function to the list of initializers that are run on all DOM elements.
      const defaults = { selector: null, params: null, onDocLoad: true };
      const settings = { ...defaults, ...options };
      const rootSelector = settings.selector;
      const onDocLoadElems = () => !rootSelector ? $(window.document) :
         $(rootSelector).not('.dna-template').not(rootSelector).addClass('dna-initialized');
      if (settings.onDocLoad)
         dna.util.apply(fn, [<unknown>onDocLoadElems()].concat(dna.array.wrap(settings.params)));
      const initializer = { fn: fn, selector: rootSelector, params: settings.params };
      dna.events.getInitializers().push(initializer);
      return dna.events.getInitializers();
      },
   clearInitializers(): DnaInitializer[] {
      // Deletes all initializers.
      return dna.events.getInitializers().splice(0);
      },
   registerContext(contextName: string, contextObjOrFn: Record<string, unknown> | DnaCallback): DnaContext {
      // Registers an application object or individual function to enable it to be used for event
      // callbacks.  Registration is needed when global namespace is not available to dna.js, such
      // as when using webpack to load dna.js as a module.
      dna.events.getContextDb()[contextName] = contextObjOrFn;
      return dna.events.getContextDb();
      },
   initGlobal(thisWindow: Window & typeof globalThis, thisJQuery: JQueryStatic): unknown {
      const jQuery$ = String('$');
      thisWindow[jQuery$] = thisJQuery;
      thisWindow['dna'] =   dna;
      const writable = (prop: string): boolean =>
         !globalThis[prop] || !!Object.getOwnPropertyDescriptor(globalThis, prop)?.writable;
      if (writable('window'))
         globalThis.window = thisWindow;
      if (writable('document'))
         globalThis.document = thisWindow.document;
      if (writable(jQuery$))
         globalThis[jQuery$] = thisJQuery;
      if (writable('dna'))
         globalThis['dna'] = dna;
      return dna.core.setup();
      },
   info(): DnaDataObject {
      // Returns status information about templates on the current web page.
      const names =  Object.keys(dna.store.getTemplateDb());
      const panels = $('.dna-menu.dna-panels-initialized');
      return {
         version:      dna.version,
         templates:    names.length,
         clones:       $('.dna-clone:not(.dna-sub-clone)').length,
         subs:         $('.dna-sub-clone').length,
         names:        names,
         store:        dna.store.getTemplateDb(),
         initializers: dna.events.getInitializers(),
         panels:       panels.toArray().map(elem => $(elem).attr('data-nav'))
         };
      },
   array:       dnaArray,
   browser:     dnaBrowser,
   pageToken:   dnaPageToken,
   ui:          dnaUi,
   util:        dnaUtil,
   placeholder: dnaPlaceholder,
   panels:      dnaPanels,
   compile:     dnaCompile,
   store:       dnaStore,
   events:      dnaEvents,
   core:        dnaCore,
   };

dna.core.setup();

export { dna };
