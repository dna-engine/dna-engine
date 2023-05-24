// dna-engine ~~ MIT License

// Types: Basic
export type Json =       string | number | boolean | null | undefined | JsonObject | Json[];
export type JsonObject = { [key: string | number]: Json };
export type JsonData =   JsonObject | Json[];
export type NavigatorUAData = {
   readonly brands: {
      brand:   string,  //examples: "Chromium", "Google Chrome"
      version: string,  //example: "106"
      }[],
   readonly mobile:   boolean;
   readonly platform: string;  //examples: "macOS", "Windows"
   };

// Types: Options
export type DnaOptionsClone<T> = {
   fade?:      boolean,
   top?:       boolean,
   clones?:    number,
   html?:      boolean,
   empty?:     boolean,
   holder?:    JQuery,
   container?: JQuery | null,
   formatter?: DnaFormatter | null,
   transform?: DnaTransformFn<T> | null,
   callback?:  DnaCallbackFn<T> | null,
   };
export type DnaSettingsArrayPush = {
   fade:       boolean,
   top:        boolean,
   };
export type DnaOptionsArrayPush = Partial<DnaSettingsArrayPush>;
export type DnaSettingsGetModel = {
   main:       boolean,
   };
export type DnaOptionsGetModel = Partial<DnaSettingsGetModel>;
export type DnaSettingsEmpty = {
   fade:       boolean,
   };
export type DnaOptionsEmpty = Partial<DnaSettingsEmpty>;
export type DnaOptionsInsert<T> = {
   fade?:      boolean,
   html?:      boolean,
   transform?: DnaTransformFn<T>,
   callback?:  DnaCallbackFn<T>,
   };
export type DnaSettingsRefresh = {
   data:       unknown,
   main:       boolean,
   html:       boolean,
   };
export type DnaOptionsRefresh = Partial<DnaSettingsRefresh>;
export type DnaSettingsRefreshAll = {
   data:       unknown,
   main:       boolean,
   html:       boolean,
   };
export type DnaOptionsRefreshAll = Partial<DnaSettingsRefreshAll>;
export type DnaSettingsRecount = {
   html:       boolean,
   };
export type DnaOptionsRecount = Partial<DnaSettingsRecount>;
export type DnaOptionsDestroy<T> = {
   main?:      boolean,
   fade?:      boolean,
   callback?:  DnaCallbackFn<T> | null,
   };
export type DnaSettingsGetClone = {
   main:       boolean,
   };
export type DnaOptionsGetClone = Partial<DnaSettingsGetClone>;
export type DnaSettingsGetIndex = {
   main:       boolean,
   };
export type DnaOptionsGetIndex = Partial<DnaSettingsGetIndex>;
export type DnaSettingsRegisterInitializer = {
   selector:   string | null,
   params:     DnaDataObject | unknown[] | null,
   onDocLoad:  boolean,
   };
export type DnaOptionsRegisterInitializer = Partial<DnaSettingsRegisterInitializer>;
export type DnaSettingsRunOnLoads = {
   msecs:      number,
   };
export type DnaOptionsEventsOn = Partial<DnaSettingsEventsOn>;
export type DnaSettingsEventsOn = {
   keyFilter:  string | null,
   selector:   string | null,
   };
export type DnaOptionsRunOnLoads = Partial<DnaSettingsRunOnLoads>;

// Types: Data, Templates, and Callbacks
export type DnaForEachCallback = (elem: JQuery, index: number) => void;
export type DnaPluginAction =    'bye' | 'clone-sub' | 'destroy' | 'down' | 'refresh' | 'up';
declare global { interface JQuery {
   forEach: (fn: DnaForEachCallback) => JQuery,
   dna:     (action: DnaPluginAction, ...params: unknown[]) => JQuery,
   } }
export type DnaModel =          JsonData;
export type DnaDataObject =     JsonObject;
export type DnaFormatter =      <T>(value: DnaFormatterValue, model?: T) => string;
export type DnaFormatterValue = number | string | boolean;
export type DnaMSec =           number | string;  //milliseconds UTC (or ISO 8601 string)
export type DnaCallback =       (...args: unknown[]) => unknown;
export interface DnaTransformFn<T> { (data: T): void }
export interface DnaCallbackFn<T> { (elem: JQuery, data?: T): void }
export interface DnaInitializerFn { (elem: JQuery, ...params: unknown[]): void }
export type DnaEventListener = (elem: HTMLElement, event: Event, selector: string | null) => void;
export type DnaElemEventIndex = Element | JQuery | JQuery.EventBase | number;
export type DnaInitializer = {
   fn:       DnaFunctionName | DnaInitializerFn,
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
export type DnaTemplateDb =   { [name: string]: DnaTemplate };
export type DnaTemplateName = string;
export type DnaContext =      { [app: string]: { [field: string]: unknown } | DnaCallback };
export type DnaFieldName =    string;
export type DnaFunctionName = string;
export type DnaClassName =    string;
export type DnaAttrName =     string;
export type DnaAttrParts =    [string, DnaFieldName | 1 | 2, string];
export type DnaAttrs =        (DnaAttrName | DnaAttrParts)[];
export type DnaPropName =     string;
export type DnaProps =        (DnaPropName | DnaFieldName)[];
export type DnaLoop =         { name: string, field: DnaFieldName };
export type DnaRules = {
   template?:  DnaTemplateName,
   array?:     DnaFieldName,
   text?:      boolean,
   val?:       boolean,
   attrs?:     DnaAttrs,
   props?:     DnaProps,
   option?:    DnaFieldName,
   formatter?: DnaFormatter | null,
   transform?: DnaFunctionName,
   callback?:  DnaFunctionName,
   class?:     [DnaFieldName, DnaClassName, DnaClassName][],
   require?:   DnaFieldName,
   missing?:   DnaFieldName,
   true?:      DnaFieldName,
   false?:     DnaFieldName,
   loop?:      DnaLoop,
   };
export type DnaInfo = {
   version:      string,
   templates:    number,
   clones:       number,
   subs:         number,
   names:        string[],
   store:        DnaTemplateDb,
   initializers: DnaInitializer[],
   panels:       string[],
   };

// Types: Top Level
type GlobalKey =    keyof typeof globalThis;
type GlobalWindow = Window & typeof globalThis & { $: JQueryStatic };
type Dna =          typeof dna;
declare global { var dna: Dna }  //eslint-disable-line no-var

const dnaName = {  //class name lookup table
   animating:         'dna-animating',
   array:             'dna-array',
   clone:             'dna-clone',
   container:         'dna-container',
   displayed:         'dna-displayed',
   executed:          'dna-executed',
   field:             'dna-field',
   hidden:            'dna-hidden',
   hide:              'dna-hide',
   initialized:       'dna-initialized',
   lastSeparator:     'dna-last-separator',
   menu:              'dna-menu',
   menuItem:          'dna-menu-item',
   nucleotide:        'dna-nucleotide',
   onLoad:            'dna-on-load',
   panel:             'dna-panel',
   panels:            'dna-panels',
   panelsInitialized: 'dna-panels-initialized',
   selected:          'dna-selected',
   separator:         'dna-separator',
   subClone:          'dna-sub-clone',
   template:          'dna-template',
   unhide:            'dna-unhide',
   unselected:        'dna-unselected',
   updateModel:       'dna-update-model',
   };

const dnaArray = {
   find: <T, V>(array: T[], value: V, key = 'code'): { index: number, item: T | null } => {
      // Returns the index and a reference to the first array element with a key equal to the
      // supplied value.  The default key is "code".
      // Examples:
      //    const array = [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      //    result = dna.array.find(array, 'b');  //{ index: 1, item: { code: 'b', word: 'Bat' } }
      //    result = dna.array.find(array, 'x');  //{ index: -1, item: null }
      const find =  () => array.findIndex(object => object[<keyof object>key] === value);
      const index = Array.isArray(array) ? find() : -1;
      const item =  index === -1 ? null : array[index]!;
      return { index, item };
      },
   last: <T>(array: T[]): T | undefined => {
      // Returns the last element of the array (or undefined if not possible).
      // Example:
      //    dna.array.last([3, 21, 7]) === 7;
      return Array.isArray(array) ? array[array.length - 1] : undefined;
      },
   fromMap<E>(map: { [code: string | number]: E }, options?: { key?: string, kebabCodes?: boolean }):
      (E & { [key: string]: string } | { [keyOrValue: string]: string | E })[] {
      // Converts an object (hash map) into an array of objects.  The default key is "code".
      // Example:
      //    dna.array.fromMap({ a: { word: 'Ant' }, b: { word: 'Bat' } })
      // converts:
      //    { a: { word: 'Ant' }, b: { word: 'Bat' } }
      // to:
      //    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }]
      const defaults =  { key: 'code', kebabCodes: false };
      const settings =  { ...defaults, ...options };
      const codeValue = (key: string): string => settings.kebabCodes ? dna.util.toKebab(key) : key;
      const toObj =     (item: E) => dna.util.isObj(item) ? item : { value: item };
      return Object.keys(map).map(key => ({ ...{ [settings.key]: codeValue(key) }, ...toObj(map[key]!) }));
      },
   toMap<E>(array: E[], options?: { key?: string, camelKeys?: boolean }): { [code: string | number]: E } {
      // Converts an array of objects into an object (hash map).  The default key is "code".
      // Example:
      //    dna.array.toMap([{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }])
      // converts:
      //    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }]
      // to:
      //    { a: { code: 'a', word: 'Ant' }, b: { code: 'b', word: 'Bat' } }
      const defaults =    { key: 'code', camelKeys: false };
      const settings =    { ...defaults, ...options };
      const map =         <{ [code: string | number]: E }>{};
      const keyName =     <keyof E>settings.key;
      const getKeyRaw =   (obj: E) => <string | number><unknown>obj[keyName];
      const getKeyCamel = (obj: E) => dna.util.toCamel(String(obj[keyName]));
      const getKey =      settings.camelKeys ? getKeyCamel : getKeyRaw;
      array.forEach(obj => map[getKey(obj)] = obj);
      return map;
      },
   wrap: <T>(itemOrItems: T | T[]): T[] => {
      // Always returns an array.
      const isNothing = itemOrItems === null || itemOrItems === undefined;
      return isNothing ? [] : Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
      },
   };

const dnaBrowser = {
   getUrlParams: (): { [param: string]: string } => {
      // Returns the query parameters as an object literal.
      // Example:
      //    https://example.com?lang=jp&code=7 ==> { lang: 'jp', code: '7' }
      const params: { [param: string]: string } = {};
      const addParam = (parts: [string, string]) => params[parts[0]] = parts[1];
      const addPair =  (pair: string) => pair && addParam(<[string, string]>pair.split('='));
      globalThis.location.search.slice(1).split('&').forEach(addPair);
      return params;
      },
   userAgentData(): NavigatorUAData {
      const polyfill = (): NavigatorUAData => {
         const brandEntry = globalThis.navigator.userAgent.split(' ').pop()?.split('/') ?? [];
         const hasTouch =   !!navigator.maxTouchPoints;
         const platform =   <keyof typeof platforms>globalThis.navigator.platform;
         const mac =        hasTouch ? 'iOS' : 'macOS';
         const platforms =  { 'MacIntel': mac, 'Win32': 'Windows', 'iPhone': 'iOS', 'iPad': 'iOS' };
         return {
            brands:   [{ brand: brandEntry?.[0] ?? '', version: brandEntry?.[1] ?? '' }],
            mobile:   hasTouch || /Android|iPhone|iPad|Mobi/i.test(globalThis.navigator.userAgent),
            platform: platforms[platform] ?? platform,
            };
         };
      const uaData = <unknown>globalThis.navigator[<keyof typeof globalThis.navigator>'userAgentData'];
      return <NavigatorUAData>uaData ?? polyfill();
      },
   };

const dnaPageToken = {
   // A simple key/value store specific to the page (URL path) that is cleared out when the
   // user's browser session ends.
   put: (key: string, value: Json): Json => {
      // Example:
      //   dna.pageToken.put('favorite', 7);  //saves 7
      globalThis.sessionStorage[key + globalThis.location.pathname] = JSON.stringify(value);
      return value;
      },
   get: (key: string, defaultValue: Json): Json => {
      // Example:
      //   dna.pageToken.get('favorite', 0);  //returns 0 if not set
      const value = globalThis.sessionStorage[key + globalThis.location.pathname];
      return value === undefined ? defaultValue : JSON.parse(value);
      },
   };

const dnaDom = {
   dataStorge: <{ [key: string | number | symbol]: unknown }[]>[],
   data(elem: HTMLElement) {
      dna.core.assert(elem instanceof Element, 'Expected an HTML element, got', elem);
      if (!elem.dataset.dnaStoreIndex)
         elem.dataset.dnaStoreIndex = String(dna.dom.dataStorge.push({}) - 1);
      return dna.dom.dataStorge[parseInt(elem.dataset.dnaStoreIndex)]!;
      },
   removeData(elem: HTMLElement): HTMLElement {
      dna.core.assert(elem instanceof Element, 'Expected an HTML element, got', elem);
      if (elem.dataset.dnaStoreIndex)
         dna.dom.dataStorge[parseInt(elem.dataset.dnaStoreIndex)] = {};
      return elem;
      },
   hasClass(elems: Element[] | HTMLCollection | NodeListOf<Element>, className: string): boolean {
      // Returns true if any of the elements in the given list have the specified class.
      return Array.prototype.some.call(elems, elem => elem.classList.contains(className));
      },
   addClass<T extends Element[] | HTMLCollection | NodeListOf<Element>>(elems: T, className: string): T {
      // Adds the specified class to each of the elements in the given list.
      Array.prototype.forEach.call(elems, elem => elem.classList.add(className));
      return elems;
      },
   forEach(elems: HTMLCollection, fn: (elem: Element, index?: number, elems?: HTMLCollection | unknown[]) => unknown): HTMLCollection {
      // Loops over the given list of elements to pass each element to the specified function.
      Array.prototype.forEach.call(elems, fn);
      return elems;
      },
   indexOf(elems: NodeListOf<Element>, elem: Element): number {
      return Array.prototype.indexOf.call(elems, elem);
      },
   };

const dnaUi = {
   focus: (elem: JQuery): JQuery => {
      // Sets focus on an element.
      return elem.trigger('focus');
      },
   getAttrs(elem: Element): Attr[] {
      // Returns the attributes of the element in a regular array.
      return elem ? Object.values(elem.attributes) : [];
      },
   getComponent(elem: Element): Element | null {
      // Returns the component (container element with a <code>data-component</code> attribute) to
      // which the element belongs.
      return elem.closest('[data-component]');
      },
   pulse(elem: Element, options?: { duration: number, interval: number, out: number }): Element {
      // Fades in an element after hiding it to create a single smooth flash effect.  The optional
      // interval fades out the element.
      const defaults = { duration: 400, interval: 0, out: 5000 };
      const settings = { ...defaults, ...options };
      const css =      { hide: { opacity: 0 }, show: { opacity: 1 } };
      $(elem).stop(true).slideDown().css(css.hide).animate(css.show, settings.duration);
      if (settings.interval)
         $(elem).animate(css.show, settings.interval).animate(css.hide, settings.out);
      return elem;
      },
   slideFade<T>(elem: HTMLElement, callback?: DnaCallbackFn<T> | null, show = false): HTMLElement {
      // Smooth slide plus fade effect.
      enum Opacity   { Hide = 0, Show = 1 }
      enum Transiton { Immediate = 'opacity 0s', Smooth = 'opacity 400ms' }
      const obscure = { opacity: Opacity.Hide, transition: Transiton.Immediate };
      const easeIn =  { opacity: Opacity.Show, transition: Transiton.Smooth };
      const easeOut = { opacity: Opacity.Hide, transition: Transiton.Smooth };
      const reset =   { transition: Transiton.Immediate };
      const doEaseIn = () => $(elem).css(easeIn);
      const clearTransition = () => $(elem).css(reset);
      if (show && globalThis.setTimeout(doEaseIn, 200))
         $(elem).css(obscure).hide().delay(100).slideDown(callback || undefined);
      else
         $(elem).css(easeOut).delay(100).slideUp(callback || undefined);
      $(elem).delay(200).promise().then(clearTransition);  //keep clean for other animations
      return elem;
      },
   slideFadeIn(elem: HTMLElement): Promise<HTMLElement> {
      // Smooth slide plus fade effect.
      const transitionMs = 600;
      elem.style.transition = 'all 0ms';
      elem.style.opacity =    '0';
      elem.style.overflow =   'hidden';
      const verticals = [
         'height',
         'border-top-width',
         'border-bottom-width',
         'padding-top',
         'padding-bottom',
         'margin-top',
         'margin-bottom',
         ];
      const computed = getComputedStyle(elem);
      const heights =  verticals.map(prop => computed.getPropertyValue(prop));  //store natural heights
      verticals.map(prop => elem.style.setProperty(prop, '0px'));               //squash down to zero
      const animate = () => {
         elem.style.transition = `all ${transitionMs}ms`;
         elem.style.opacity =    '1';
         verticals.map((prop, i) => elem.style.setProperty(prop, heights[i]!));  //slowly restore natural heights
         };
      globalThis.requestAnimationFrame(animate);
      const cleanup = () => {
         elem.style.removeProperty('transition');
         elem.style.removeProperty('opacity');
         elem.style.removeProperty('overflow');
         verticals.forEach((prop) => elem.style.removeProperty(prop));
         return elem;
         };
      return new Promise((resolve) => globalThis.setTimeout(() => resolve(cleanup()), transitionMs + 100));
      },
   slideFadeOut<T>(elem: HTMLElement, callback?: DnaCallbackFn<T> | null): HTMLElement {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, false);
      },
   slideFadeToggle<T>(elem: HTMLElement, callback?: DnaCallbackFn<T> | null): HTMLElement {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, $(elem).is(':hidden'));
      },
   slideFadeDelete<T>(elem: HTMLElement, callback?: DnaCallbackFn<T> | null): HTMLElement {
      // Smooth slide plus fade effect.
      return dna.ui.slideFadeOut(elem, () => dna.core.remove(<JQuery>$(elem), callback));
      },
   smoothHeightSetBaseline(container: HTMLElement = globalThis.document.body): HTMLElement {
      // See: smoothHeightAnimate below
      const height = String(container.clientHeight) + 'px';
      container.style.minHeight = height;
      container.style.maxHeight = height;
      container.style.overflow =  'hidden';
      container.classList.add(dna.name.animating);
      return container;
      },
   smoothHeightAnimate(container: HTMLElement = globalThis.document.body): HTMLElement {
      // Smoothly animates the height of a container element from a beginning height to a final
      // height.
      const inProgress = container.classList.contains(dna.name.animating);
      dna.core.assert(inProgress, 'Must call smoothHeightSetBaseline() first', container.nodeName);
      const turnOffTransition = () => {
         container.style.transition = 'none';
         container.style.maxHeight =  'none';
         container.classList.remove(dna.name.animating);
         };
      const animate = () => {
         container.style.minHeight = '0px';
         container.style.maxHeight = '100vh';
         globalThis.setTimeout(turnOffTransition, 1000);  //allow 1s transition to finish
         };
      const setAnimationLength = () => {
         container.style.transition = 'all 1s';
         globalThis.requestAnimationFrame(animate);  //allow transition to lock-in before animating
         };
      globalThis.requestAnimationFrame(setAnimationLength);  //allow baseline to lock-in starting height
      return container;
      },
   smoothMove<T>(elem: Element, up?: boolean, callback?: DnaCallbackFn<T> | null): Element {
      // Uses animation to smoothly slide an element up or down one slot amongst its siblings.
      const submissiveNode = up ? elem.previousElementSibling : elem.nextElementSibling;
      // const submissiveNode = submissiveElem[0];
      const fn = typeof callback === 'function' ? callback : null;
      const move = () => {
         const ghostNode = <HTMLElement>submissiveNode!.cloneNode(true);
         $(submissiveNode!).hide();
         elem.parentElement!.insertBefore(ghostNode, submissiveNode!);
         elem.parentElement!.insertBefore(up ? elem : submissiveNode!, up ? submissiveNode! : elem);
         let finishes = 0;
         const finish = () => finishes++ && fn && fn(<JQuery>$(elem));
         const animate = () => {
            dna.ui.slideFadeIn(<HTMLElement>submissiveNode!).then(finish);
            dna.ui.slideFadeDelete(ghostNode, finish);
            };
         globalThis.setTimeout(animate);
         };
      if (submissiveNode)
         move();
      else if (fn)
         fn(<JQuery>$(elem));
      return elem;
      },
   smoothMoveUp: <T>(elem: Element, callback?: DnaCallbackFn<T> | null): Element => {
      // Uses animation to smoothly slide an element up one slot amongst its siblings.
      return dna.ui.smoothMove(elem, true, callback);
      },
   smoothMoveDown: <T>(elem: Element, callback?: DnaCallbackFn<T> | null): Element => {
      // Uses animation to smoothly slide an element down one slot amongst its siblings.
      return dna.ui.smoothMove(elem, false, callback);
      },
   toElem(elemOrEventOrIndex: DnaElemEventIndex, that?: unknown): JQuery {
      // A flexible way to get the jQuery element whether it is passed in directly, is a DOM
      // element, is the target of an event, or comes from the jQuery context.
      const target = elemOrEventOrIndex && (<JQuery.EventBase>elemOrEventOrIndex).target;
      return elemOrEventOrIndex instanceof Element ? <JQuery>$(elemOrEventOrIndex) :
         elemOrEventOrIndex instanceof $ ?           <JQuery>elemOrEventOrIndex :
         $(target || elemOrEventOrIndex || that);
      },
   };

const dnaUtil = {
   apply<T>(fn: string | DnaCallbackFn<T> | DnaInitializerFn, params?: unknown | JQuery): unknown {
      // Calls fn (string name or actual function) passing in params.
      // Usage:
      //    dna.util.apply('app.cart.buy', 7); ==> app.cart.buy(7);
      const args =      dna.array.wrap(params);
      const elemJ =     args[0] instanceof $ ? <JQuery>args[0] : null;
      const elem =      elemJ?.[0] ?? null;
      const isFnName =  typeof fn === 'string' && fn.length > 0;
      const component = elem ? dna.ui.getComponent(elem) : null;
      const elemFn =   elemJ && isFnName ? (<DnaCallback>elemJ[<keyof typeof elemJ>fn])?.bind(elemJ) : null;
      if (elem && isFnName && !elemJ![<keyof typeof elemJ>fn])
         args.push(component ? $(component) : $());
      const applyByName = (name: string) => {
         const callback = dna.util.getFn(name);
         dna.core.assert(callback, 'Callback function not found', name);
         dna.core.assert(typeof callback === 'function', 'Callback is not a function', name);
         return callback.apply(elemJ, args);
         };
      return elemJ?.length === 0 ?  elemJ :                               //noop for emply list of elems
         typeof fn === 'function' ? fn.apply(elemJ, <[JQuery, T]>args) :  //run regular function with supplied arguments
         elemFn ?                   elemFn(args[1], args[2], args[3]) :   //run element's jQuery function
         isFnName ?                 applyByName(fn) :                     //run funciton from name, like 'app.cart.buy'
         fn === undefined ?         null :
         fn === null ?              null :
         dna.core.assert(false, 'Invalid callback function', fn);
      },
   getFn(name: string) {
      // Converts a dot notation name (string) to its callable function.
      // Example to find the buy() function:
      //    const buyFn = dna.util.getFn('app.cart.buy');
      dna.core.assert(!/[^\p{Letter}\d.]/u.test(name), 'Invalid function name', name);
      const fields =     name.split('.');  //dot notation to array
      const tag =        fields[0]!;       //string name of the root, example: 'app'
      const tagValue =   globalThis[<GlobalKey>tag];
      const toValue =    (eval);
      const callable =   () => ['object', 'function'].includes(toValue('typeof ' + tag));
      const getContext = () => dna.registerContext(tag, toValue(tag));
      const getTop =     () => callable() ? getContext()[tag] : undefined;
      const top =        tagValue ?? dna.events.getContextDb()[tag] ?? getTop();
      const deep = (object: object, subfields: string[]): unknown =>
         !subfields.length ? object :                                   //function found
         !object ?           undefined :                                //function missing
         deep(object[<keyof object>subfields[0]], subfields.slice(1));  //next object field
      return fields.length === 1 ? top : deep(top, fields.slice(1));
      },
   assign: (data: DnaDataObject, field: string | string[], value: Json): DnaDataObject => {
      // Sets the field in the data object to the new value and returns the updated data object.
      // Example:
      //    dna.util.assign({ a: { b: 7 } }, 'a.b', 21);  //{ a: { b: 21 } }
      const fields =  typeof field === 'string' ? field.split('.') : field;
      const name =    <string>fields[0];
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
      const falseyStr =  () => /^(f|false|n|no|0)$/i.test(String(value));
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
   value<T>(data: T, field: string | string[]): unknown {
      // Returns the value of the field from the data object.
      // Example:
      //    dna.util.value({ a: { b: 7 } }, 'a.b') === 7
      const notFound =   data === null || data === undefined || field === undefined;
      const parts =      typeof field === 'string' ? field.split('.') : field;
      const fieldValue = notFound ? null : data[<keyof typeof data>parts[0]];
      return notFound || parts.length < 2 ? fieldValue : dna.util.value(fieldValue, parts.slice(1));
      },
   isObj: (value: unknown): boolean => {
      return !!value && typeof value === 'object' && !Array.isArray(value);
      },
   };

const dnaFormat = {
   getCurrencyFormatter(iso4217: string, units = 1): DnaFormatter {
      // Returns a function to format monetary values into strings, like "¥2,499" and "$4.95".
      const currency =  { style: 'currency', currency: iso4217.toUpperCase() };
      const formatter = new Intl.NumberFormat([], currency).format;
      return (value: DnaFormatterValue) => formatter(Number(value) / units);
      },
   getDateFormatter(format: string): DnaFormatter {
      // Returns a function to format dates into strings, like "2030-05-04 1:00am".
      const twoDigit =    (value: number) => String(value).padStart(2, '0');
      const timestamp =   (date: Date) => date.toISOString().replace('T', '@').slice(0, -5);
      const timestampMs = (date: Date) => date.toISOString().replace('T', '@').slice(0, -1);
      const space =       (date: string) => date.replace(/\s/g, ' ');
      const general = {  //format parts of the general timestamp, ex: "2030-05-04 1:00am Sat"
         date:  (d: Date) => `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`,
         time:  (d: Date) => d.toLocaleString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s/, '').toLowerCase(),
         day:   (d: Date) => d.toLocaleString([], { weekday: 'short' }),
         stamp: (d: Date) => general.date(d) + ' ' + general.time(d) + ' ' + general.day(d),
         };
      const dateFormatters = <{ [format: string]: DnaFormatter }>{                    //ex: 1904112000000 (msec)
         date:        (msec: DnaMSec) => new Date(msec).toDateString(),               //ex: "Sat May 04 2030"
         general:     (msec: DnaMSec) => general.stamp(new Date(msec)),               //ex: "2030-05-04 1:00am Sat"
         generalDate: (msec: DnaMSec) => general.date(new Date(msec)),                //ex: "2030-05-04"
         generalDay:  (msec: DnaMSec) => general.day(new Date(msec)),                 //ex: "Sat"
         generalTime: (msec: DnaMSec) => general.time(new Date(msec)),                //ex: "1:00am"
         iso:         (msec: DnaMSec) => new Date(msec).toISOString(),                //ex: "2030-05-04T08:00:00.000Z"
         locale:      (msec: DnaMSec) => space(new Date(msec).toLocaleString()),      //ex: "5/4/2030, 1:00:00 AM"
         localeDate:  (msec: DnaMSec) => new Date(msec).toLocaleDateString(),         //ex: "5/4/2030"
         localeTime:  (msec: DnaMSec) => space(new Date(msec).toLocaleTimeString()),  //ex: "1:00:00 AM"
         string:      (msec: DnaMSec) => new Date(msec).toString(),                   //ex: "Sat May 04 2030 01:00:00 GMT-0700 (PDT)"
         time:        (msec: DnaMSec) => new Date(msec).toTimeString(),               //ex: "01:00:00 GMT-0700 (PDT)"
         timestamp:   (msec: DnaMSec) => timestamp(new Date(msec)),                   //ex: "2030-05-04@08:00:00"
         timestampMs: (msec: DnaMSec) => timestampMs(new Date(msec)),                 //ex: "2030-05-04@08:00:00.000"
         utc:         (msec: DnaMSec) => new Date(msec).toUTCString(),                //ex: "Sat, 04 May 2030 08:00:00 GMT"
         };
      const formatter = dateFormatters[dna.util.toCamel(format)];
      dna.core.assert(formatter, 'Unknown date format code', format);
      return <DnaFormatter>formatter;
      },
   getNumberFormatter(format: string): DnaFormatter {
      // Returns a function to format numeric values into strings, like "1,000.000" and "3.14",
      // based on the supplied fixed-point notation format ("#", "#.#", "#.##", "#.###", ...).
      dna.core.assert(/^#([.]#+)?$/.test(format), 'Unknown numeric format code', format);
      const digits =  format === '#' ? 0 : format.length - 2;
      const numeric = { minimumFractionDigits: digits, maximumFractionDigits: digits };
      return <DnaFormatter>new Intl.NumberFormat([], numeric).format;
      },
   getPercentFormatter(format: string): DnaFormatter {
      // Returns a function to format floats (generally from 0 to 1) into strings, like "82%"
      // and "12.57%", representing a percent value based on the supplied fixed-point notation
      // format ("#", "#.#", "#.##", "#.###", ...).
      dna.core.assert(/^#([.]#+)?$/.test(format), 'Unknown percent format code', format);
      const digits = format === '#' ? 0 : format.length - 2;
      const percent = {
         style:                 'percent',
         minimumFractionDigits: digits,
         maximumFractionDigits: digits,
         };
      return <DnaFormatter>new Intl.NumberFormat([], percent).format;
      },
   getFormatter(fn: string): DnaFormatter {
      return <T>(value: DnaFormatterValue, data: T) => String(dna.util.apply(fn, [value, data]));
      },
   };

const dnaPlaceholder = {  //TODO: optimize
   // A template placeholder is only shown when its corresponding template is empty (has zero
   // clones).  The "data-placeholder" attribute specifies the name of the template.
   // Usage:
   //    <ol class=books>
   //       <li id=book class=dna-template>~~title~~</li>
   //    </ol>
   //    <p data-placeholder=book>No books</p>  <!-- element hidden unless there are no books -->
   setup: () => {
      $(globalThis.document.querySelectorAll('option.dna-template')).closest('select').addClass(dna.name.hide);
      const isEmpty = (elem: Element) => !!dna.getClones((<HTMLElement>elem).dataset.placeholder!).length;
      const fade =    (elem: Element) => isEmpty(elem) ? $(elem).fadeOut() : $(elem).fadeIn();
      const placeholders = globalThis.document.querySelectorAll('[data-placeholder]');
      placeholders.forEach((elem: Element) => $(elem).stop(true));
      placeholders.forEach(fade);
      return placeholders;
      },
   };

const dnaPanels = {
   // Each click of a menu item displays its corresponding panel and optionally passes the panel
   // element and hash to the function specified by the "data-callback" attribute.
   // Usage:
   //    <nav class=dna-menu data-nav={NAME} data-callback={CALLBACK}>  <-- menu         [role=tablist] -->
   //       <button>See X1</button>                                     <-- menu item #1 [role=tab]     -->
   //       <button>See X2</button>                                     <-- menu item #2 [role=tab]     -->
   //    </nav>
   //    <div class=dna-panels data-nav={NAME}>                         <-- panels                       -->
   //       <section data-hash=x1>The X1</section>                      <-- panel #1     [role=tabpanel] -->
   //       <section data-hash=x2>The X2</section>                      <-- panel #2     [role=tabpanel] -->
   //    </div>
   // Note 1:
   // The optional "data-hash" attribute on the .dna-menu element specifies the hash (URL
   // fragment ID) and updates the location bar.
   // Note 2:
   // The "data-nav" attributes can be omitted if the ".dna-panels" element immediately follows
   // the ".dna-menu" element.
   display(menu: Element, location?: number, updateUrl?: boolean): Element {
      // Shows the panel at the given location (index).
      const menuData =   $(menu).data();
      const panels =     <HTMLCollection>menuData.dnaPanels;
      const navName =    menuData.nav;
      const menuItems =  $(menu).find(dna.selector.menuItem);
      const savedIndex = Number(dna.pageToken.get(navName, 0));
      const bound =      (loc: number) => Math.max(0, Math.min(loc, menuItems.length - 1));
      const index =      bound(location === undefined ? savedIndex : location);
      if (menu.nodeName === 'SELECT')  //check if elem is a drop-down control
         (<HTMLSelectElement>menu).selectedIndex = index;
      menuItems.removeClass(dna.name.selected).addClass(dna.name.unselected);
      menuItems.eq(index).addClass(dna.name.selected).removeClass(dna.name.unselected);
      const hidePanel = (panel: Element) => {
         $(panel).hide();
         panel.classList.remove(dna.name.displayed);
         panel.classList.add(dna.name.hidden);
         };
      dna.dom.forEach(panels, hidePanel);
      const panel = <HTMLElement>panels[index]!;
      panel.classList.replace(dna.name.hidden, dna.name.displayed);
      $(panel).fadeIn();
      const hash =  panel.dataset.hash;  //example: <nav class=dna-menu data-hash=about-page ...
      dna.pageToken.put(navName, index);
      if (updateUrl && hash)
         globalThis.history.pushState(null, '', '#' + hash);
      dna.util.apply(menuData.callback, [panel, hash]);
      return panel;
      },
   clickRotate(menuItem: Element): Element {
      // Moves to the selected panel.
      const menu =  menuItem.closest(dna.selector.menu)!;
      const index = dna.dom.indexOf(menu.querySelectorAll(dna.selector.menuItem), menuItem);
      return dna.panels.display(menu, index, true);
      },
   selectRotate(menu: Element): Element {
      // Moves to the selected panel.
      return dna.panels.display(menu, (<HTMLSelectElement>menu).selectedIndex, true);
      },
   initialize: (panelHolder?: Element) => {
      const generateNavName = (): string => {
         // Automatically generates a name for unnamed menus.
         const navName = 'dna-panels-' + $(globalThis.document.body).data().dnaPanelNextNav++;
         $(panelHolder!).attr('data-nav', navName).prev(dna.selector.menu).attr('data-nav', navName);
         return navName;
         };
      const init = () => {
         const navName =    (<HTMLElement>panelHolder!).dataset.nav || generateNavName();
         const menu =       globalThis.document.querySelector('.dna-menu[data-nav=' + navName + ']');
         const panels =     dna.dom.addClass(panelHolder!.children, dna.name.panel);
         const hash =       globalThis.location.hash.replace(/[^\w-]/g, '');  //remove leading "#"
         const hashIndex =  (): number => $(panels).filter('[data-hash=' + hash + ']').index();
         const savedIndex = (): number => <number>dna.pageToken.get(navName, 0);
         const loc =        hash && (<HTMLElement>panels[0]).dataset.hash ? hashIndex() : savedIndex();
         panelHolder!.classList.add(dna.name.panelsInitialized);
         dna.core.assert(menu, 'Menu not found for panels', navName);
         menu!.classList.add(dna.name.panelsInitialized);
         $(menu!).data().dnaPanels = panels;
         if (!menu!.getElementsByClassName(dna.name.menuItem).length)  //set .dna-menu-item elems if not set in the html
            dna.dom.addClass(menu!.children, dna.name.menuItem);
         dna.panels.display(menu!, loc);
         };
      const isInitialized = !panelHolder || panelHolder.classList.contains(dna.name.panelsInitialized);
      if (!isInitialized && !dna.dom.hasClass(panelHolder.children, dna.name.template))
         init();
      return panelHolder;
      },
   setup() {
      $(globalThis.document.body).data().dnaPanelNextNav = 1;
      const panels = globalThis.document.querySelectorAll(dna.selector.panels)
      panels.forEach(dna.panels.initialize);
      dna.events.onClick(dna.panels.clickRotate, '.dna-menu .dna-menu-item');
      dna.events.onChange(dna.panels.selectRotate, 'select.dna-menu');
      return panels;
      },
   };

const dnaCompile = {
   // Pre-compile  Example                           Post-compile class   + data().dnaRules
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
   // format       <p data-format-date=iso>          class=dna-nucleotide + formatter=fn()
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
   // data-format=fn                             formatter=fn()
   // data-transform=fn                          transform='fn'
   // data-callback=fn                           callback='fn'
   //
   regex: {
      dnaField:     /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,  //example: ~~title~~
      dnaBasePair:  /~~|{{|}}/,  //matches the '~~' string
      dnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two '~~' strings so they can be removed
      },
   setupNucleotide: (elem: JQuery): JQuery => {
      if (!elem.data().dnaRules)
         elem.data().dnaRules = <DnaRules>{};
      return elem.addClass(dna.name.nucleotide);
      },
   isDnaField: (index: number, node: HTMLElement): boolean => {
      const value = node.firstChild?.nodeValue;
      return !!value && dna.compile.regex.dnaField.test(<string>value);
      },
   addFieldClass: (elem: JQuery): JQuery => {
      const field =    elem.data().dnaField;
      const htmlCase = () => dna.util.toKebab(field).replace(/[[\]]/g, '').replace(/[.]/g, '-');
      return field ? elem.addClass('dna-field-' + htmlCase()) : elem;
      },
   field: (elem: JQuery): void => {
      // Examples:
      //    <p>~~name~~</p>  ==>
      //       <p class=dna-nucleotide data-dnaField=name data-dnaRules={ text: true }></p>
      //    <textarea>~~address~~</textarea>  ==>
      //       <textarea class=dna-nucleotide data-dnaField=address data-dnaRules={ val: true }></p>
      dna.compile.setupNucleotide(elem);
      elem.data().dnaField = elem.text().replace(dna.compile.regex.dnaBasePairs, '').trim();
      dna.compile.addFieldClass(elem);
      if (elem.is('textarea'))
         elem.addClass(dna.name.updateModel).data().dnaRules.val = true;
      else
         elem.data().dnaRules.text = true;
      elem.empty();
      },
   propsAndAttrs: (elemJ: JQuery): void => {
      // Examples:
      //    <p id=~~num~~>                  ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['id', ['', 'num', '']] }>
      //    <p data-attr-src=~~url~~>       ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['src', ['', 'url', '']] }>
      //    <p data-tag=~~[count]~~>        ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['data-tag', ['', 1, '']] }>
      //    <p data-tag=~~[value]~~>        ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['data-tag', ['', 2, '']] }>
      //    <input type=checkbox data-prop-checked=~~set~~>
      //                                    ==>  <option class=dna-nucleotide + data-dnaRules={ props: ['selected', 'set'] }>
      //    <select data-option=~~color~~>  ==>  <select class=dna-nucleotide + data-dnaRules={ val: true } + data-dnaField=color>
      const elem = elemJ[0]!;
      const props: DnaProps = [];
      const attrs: DnaAttrs = [];
      const names: string[] = [];
      const compileProp = (key: string, value: string) => {
         names.push(key);
         key =   key.replace(/^data-prop-/, '').toLowerCase();
         value = value.replace(dna.compile.regex.dnaBasePairs, '');
         props.push(key, value);
         if (key === 'checked' && elemJ.is('input'))
            elemJ.addClass(dna.name.updateModel).data().dnaField = value;
         };
      const compileAttr = (key: string, value: string) => {
         const parts = <DnaAttrParts>value.split(dna.compile.regex.dnaBasePair);
         if (parts[1] === '[count]')
            parts[1] = 1;
         else if (parts[1] === '[value]')
            parts[1] = 2;
         attrs.push(key.replace(/^data-attr-/, ''), parts);
         names.push(key);
         const makeUpdatable = () => {
            dna.compile.setupNucleotide(elemJ).addClass(dna.name.updateModel);
            elemJ.data().dnaField = parts[1];
            elemJ.data().dnaRules.val = true;
            };
         const hasTextVal = elemJ.is('input:not(:checkbox, :radio)') &&
            key === 'value' && parts[0] === '' && parts[2] === '';
         if (hasTextVal || elemJ.is('select') && key === 'data-option')
            makeUpdatable();
         };
      const compile = (attr: Attr) => {
         if (/^data-prop-/.test(attr.name))
            compileProp(attr.name, attr.value);
         else if (attr.value.split(dna.compile.regex.dnaBasePair).length === 3)
            compileAttr(attr.name, attr.value);
         };
      dna.ui.getAttrs(elem).forEach(compile);
      const getRules = (): DnaRules => dna.compile.setupNucleotide(elemJ).data().dnaRules;
      if (props.length > 0)
         getRules().props = props;
      if (attrs.length > 0)
         getRules().attrs = attrs;
      if (elem.dataset.formatCurrency)
         getRules().formatter = dnaFormat.getCurrencyFormatter(elem.dataset.formatCurrency);
      if (elem.dataset.formatCurrency10)
         getRules().formatter = dnaFormat.getCurrencyFormatter(elem.dataset.formatCurrency10, 100);
      if (elem.dataset.formatCurrency100)
         getRules().formatter = dnaFormat.getCurrencyFormatter(elem.dataset.formatCurrency100, 100);
      if (elem.dataset.formatCurrency1000)
         getRules().formatter = dnaFormat.getCurrencyFormatter(elem.dataset.formatCurrency1000, 1000);
      if (elem.dataset.formatCurrency10000)
         getRules().formatter = dnaFormat.getCurrencyFormatter(elem.dataset.formatCurrency10000, 10000);
      if (elem.dataset.formatDate)
         getRules().formatter = dnaFormat.getDateFormatter(elem.dataset.formatDate);
      if (elem.dataset.formatNumber)
         getRules().formatter = dnaFormat.getNumberFormatter(elem.dataset.formatNumber);
      if (elem.dataset.formatPercent)
         getRules().formatter = dnaFormat.getPercentFormatter(elem.dataset.formatPercent);
      if (elem.dataset.format)
         getRules().formatter = dnaFormat.getFormatter(elem.dataset.format);
      if (elem.dataset.transform)  //TODO: Determine if it's better to process only at top-level of clone
         getRules().transform = elem.dataset.transform;  //TODO: string to fn
      if (elem.dataset.callback)
         getRules().callback = elem.dataset.callback;
      dna.compile.addFieldClass(elemJ);
      elemJ.removeAttr(names.join(' '));
      },
   getDataField: (elem: JQuery, type: string): string => {
      // Example:
      //    <p data-array=~~tags~~>, 'array'  ==>  'tags'
      return elem.data(type).replace(dna.compile.regex.dnaBasePairs, '').trim();
      },
   subTemplateName: (holder: JQuery | string, arrayField: string, index: number): string => {  //holder can be element or template name
      // Example:
      //    subTemplateName('book', 'authors') ==> 'book-authors--2'
      const getRules = (): DnaRules => dna.getClone(<JQuery>holder, { main: true }).data().dnaRules;
      const templateName = holder instanceof $ ? getRules().template : holder;
      return templateName + '-' + arrayField + '--' + String(index);
      },
   rules: (elems: JQuery, type: string, isLists?: boolean): JQuery => {
      // Example:
      //    <p data-require=~~title~~>, 'require'  ==>  <p data-dnaRules={ require: 'title' }>
      const addRule = (elem: JQuery) => {
         dna.compile.setupNucleotide(elem);
         const field =     dna.compile.getDataField(elem, type);
         const makeLists = () => field.split(';').map((list: string) => list.split(','));
         elem.data().dnaRules[type] = isLists ? makeLists() : field;
         };
      return elems.filter('[data-' + type + ']').forEach(addRule).removeAttr('data-' + type);
      },
   separators: (elem: JQuery): JQuery => {
      // Convert: data-separator=", "  ==>  <span class=dna-separator>, </span>
      const isWhitespaceNode = (index: number, node: Node): boolean =>
         node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue!);
      const append = (templateElemJ: JQuery, text: string | null, className: string) => {
         const templateNode = templateElemJ[0]!;
         const doAppend = () => {
            templateElemJ.contents().last().filter(isWhitespaceNode).remove();
            const span = globalThis.document.createElement('span');
            span.classList.add(className);
            span.innerHTML = text!;
            templateNode.append(span);
            };
         return text && doAppend();
         };
      const processTemplate = (elem: HTMLElement) => {
         append($(elem), elem.dataset.separator ?? null,     dna.name.separator);
         append($(elem), elem.dataset.lastSeparator ?? null, dna.name.lastSeparator);
         };
      const clones = elem.find('.dna-template, .dna-sub-clone').addBack();
      clones.toArray().forEach(processTemplate);
      return clones;
      },
   template: (name: string): DnaTemplate => {  //prepare and stash template so it can be cloned
      const elem = globalThis.document.getElementById(name)!;
      dna.core.assert(elem, 'Template not found', name);
      const initSubs = (elem: JQuery) =>
         elem.data().dnaRules.subs = [];
      const saveName = (elem: Element) => {
         $(elem).data().dnaRules = <DnaRules>{ template: elem.id, subs: [] };
         elem.removeAttribute('id');
         return elem;
         };
      saveName(elem);
      dna.dom.forEach(elem.getElementsByClassName(dna.name.template), saveName);
      const elems = $(elem).find('*').addBack();
      elems.filter(dna.compile.isDnaField).forEach(dna.compile.field).addClass(dna.name.field);
      dna.compile.rules(elems, 'array').addClass(dna.name.subClone).forEach(initSubs);
      dna.compile.rules(elems, 'class', true);
      dna.compile.rules(elems, 'require');
      dna.compile.rules(elems, 'missing');
      dna.compile.rules(elems, 'true');
      dna.compile.rules(elems, 'false');
      elems.forEach(dna.compile.propsAndAttrs);
      dna.compile.separators($(elem));
      //support html5 values for "type" attribute
      const setTypeAttr = (inputElem: JQuery) =>  //example: <input data-attr-type=date  value=~~dueDate~~>
         inputElem.attr({ type: inputElem[0]!.dataset.attrType });
      $('input[data-attr-type]').forEach(setTypeAttr);
      return dna.store.stash($(elem));
      },
   };

const dnaStore = {
   // Handles storage and retrieval of templates.
   getTemplateDb: (): DnaTemplateDb => {
      const store = $(globalThis.document.body).data();
      const initStore = () => store.dnaTemplateDb = {};
      return store.dnaTemplateDb || initStore();
      },
   stash: (elem: JQuery): DnaTemplate => {
      const name = elem.data().dnaRules.template;
      const move = (elem: JQuery) => {
         const name =      elem.data().dnaRules.template;
         const container = elem.parent();
         const wrapped =   container.children().length === 1 && !container.hasClass(dna.name.container);
         const compileSiblings = () => {
            container.data().dnaContents = true;
            const templateName = (elem: HTMLElement): boolean => {
               const compileToName = (id?: string) => id ? dna.compile.template(id).name : name;
               return elem.classList.contains(dna.name.template) ? compileToName(elem.id) :
                  elem.classList.contains(dna.name.subClone) ? $(elem).data().dnaRules.template : false;
               };
            container.data().dnaContents = container.children().toArray().map(templateName);
            };
         if (!wrapped && !container.data().dnaContents)
            compileSiblings();
         const template = <DnaTemplate>{
            name:       name,
            elem:       elem,
            container:  container.addClass(dna.name.container).addClass('dna-contains-' + name),
            nested:     container.closest(dna.selector.clone).length !== 0,
            separators: elem.find('.dna-separator, .dna-last-separator').length,
            wrapped:    wrapped,
            };
         dna.store.getTemplateDb()[name] = template;
         elem.removeClass(dna.name.template).addClass(dna.name.clone).addClass(name).detach();
         };
      const prepLoop = (elem: JQuery) => {
         // Pre (sub-template array loops -- data-array):
         //    class=dna-sub-clone data().dnaRules.array='field'
         // Post (elem):
         //    data().dnaRules.template='{NAME}-{FIELD}--{INDEX}'
         // Post (container)
         //    class=dna-nucleotide +
         //       data().dnaRules.loop={ name: '{NAME}-{FIELD}--{INDEX}', field: 'field' }
         const rules =          elem.data().dnaRules;
         const parent =         dna.compile.setupNucleotide(elem.parent()).addClass(dna.name.array);
         const containerRules = parent.closest('.dna-clone, .dna-sub-clone').data().dnaRules;
         const index =          containerRules.subs.length;
         rules.template =       dna.compile.subTemplateName(name, rules.array, index);
         parent.data().dnaRules.loop = { name: rules.template, field: rules.array };
         containerRules.subs.push(rules.array);
         };
      elem.find(dna.selector.template).addBack().forEach(move);
      elem.find(dna.selector.subClone).forEach(prepLoop).forEach(move);
      return <DnaTemplate>dna.store.getTemplateDb()[name];
      },
   getTemplate: (name: string): DnaTemplate => {
      return dna.store.getTemplateDb()[name] || dna.compile.template(name);
      },
   };

const dnaEvents = {
      on(type: string, listener: DnaEventListener, options?: DnaOptionsEventsOn) {
         // See types: https://developer.mozilla.org/en-US/docs/Web/Events
         const defaults = { keyFilter: null, selector: null };
         const settings = { ...defaults, ...options };
         const noFilter =   !settings.keyFilter;
         const noSelector = !settings.selector;
         const delegator = (event: Event) => {
            const target = <HTMLElement>event.target;
            const elem =   !target || noSelector ? target : <HTMLElement>target.closest(settings.selector!);
            if (elem && (noFilter || settings.keyFilter === (<KeyboardEvent>event).key))
               listener(elem, event, settings.selector);
            };
         globalThis.document.addEventListener(type, delegator);
         },
      onClick(listener: DnaEventListener, selector?: string) {
         dna.events.on('click', listener, { selector: selector ?? null });
         },
      onChange(listener: DnaEventListener, selector?: string) {
         dna.events.on('change', listener, { selector: selector ?? null });
         },
      onInput(listener: DnaEventListener, selector?: string) {
         dna.events.on('input', listener, { selector: selector ?? null });
         },
      onKeyDown(listener: DnaEventListener, selector?: string) {
         dna.events.on('keydown', listener, { selector: selector ?? null });
         },
      onKeyUp(listener: DnaEventListener, selector?: string) {
         dna.events.on('keyup', listener, { selector: selector ?? null });
         },
      onEnterKey(listener: DnaEventListener, selector?: string) {
         dna.events.on('keyup', listener, { selector: selector ?? null, keyFilter: 'Enter' });
         },
      onFocus(listener: DnaEventListener, selector?: string) {
         dna.events.on('focus', listener, { selector: selector ?? null });
         },
      onBlur(listener: DnaEventListener, selector?: string) {
         dna.events.on('blur', listener, { selector: selector ?? null });
         },
      onCut(listener: DnaEventListener, selector?: string) {
         dna.events.on('cut', listener, { selector: selector ?? null });
         },
      onPaste(listener: DnaEventListener, selector?: string) {
         dna.events.on('paste', listener, { selector: selector ?? null });
         },
      onHoverIn(listener: DnaEventListener, selector: string) {
         let ready = true;
         const delegator = (event: Event) => {
            const target = <HTMLElement>(<HTMLElement>event.target)?.closest(selector);
            if (target !== null && ready)
               listener(target, event, selector);
            ready = target === null;
            };
         globalThis.document.addEventListener('pointerover', delegator);
         },
      onHoverOut(listener: DnaEventListener, selector: string) {
         let ready = false;
         let prevTarget: HTMLElement | null = null;
         const delegator = (event: Event) => {
            const target = <HTMLElement>(<HTMLElement>event.target)?.closest(selector);
            prevTarget = target ?? prevTarget;
            if (target === null && ready)
               listener(prevTarget!, event, selector);
            ready = target !== null;
            };
         globalThis.document.addEventListener('pointerover', delegator);
         },
   getContextDb: (): DnaContext => {
      const store =     $(globalThis.document.body).data();
      const initStore = () => store.dnaContextDb = {};
      return store.dnaContextDb || initStore();  //storage to register callbacks when dna-engine is module loaded without window scope (webpack)
      },
   getInitializers: (): DnaInitializer[] => {
      const store =     $(globalThis.document.body).data() || {};
      const initStore = () => store.dnaInitializers = [];
      return store.dnaInitializers || initStore();  //example: [{ func: 'app.bar.setup', selector: '.progress-bar' }]
      },
   runOnLoads(options?: DnaOptionsRunOnLoads): JQuery {
      // Executes each of the data-on-load functions once the function and its dependencies have loaded.
      // Example:
      //    <p data-on-load=app.cart.setup data-wait-for=Chart,R,fetchJson>
      const defaults = { msecs: 300 };
      const settings = { ...defaults, ...options };
      const elems =    $('[data-on-load]').not(dna.selector.onLoad);
      const addStart = (elem: JQuery) => elem.data().dnaOnLoad = { start: Date.now(), checks: 0 };
      elems.addClass(dna.name.onLoad).forEach(addStart);
      const runOnLoad = (elemJ: JQuery) => {
         const elem = elemJ[0]!;
         const fnName =   elem.dataset.onLoad!;
         const fn =       dna.util.getFn(fnName);
         const onLoad =   elemJ.data().dnaOnLoad;
         const waitFor =  elem.dataset.waitFor?.split(',') ?? [];
         onLoad.waiting = Date.now() - onLoad.start;
         onLoad.checks++;
         dna.core.assert(typeof fn === 'function' || !fn, 'Invalid data-on-load function', fnName);
         if (fn && !waitFor.map(dna.util.getFn).includes(undefined))
            dna.util.apply(fnName, elemJ.addClass(dna.name.executed));
         else
            globalThis.setTimeout(() => runOnLoad(elemJ), settings.msecs);
         };
      return elems.forEach(runOnLoad);
      },
   runInitializers: (root: JQuery): JQuery => {
      // Executes the data-callback functions plus registered initializers.
      const init = (initializer: DnaInitializer) => {
         const find =   (selector: string): JQuery => root.find(selector).addBack(selector);
         const elems =  initializer.selector ? find(initializer.selector) : root;
         const params = [elems.addClass(dna.name.initialized), ...dna.array.wrap(initializer.params)];
         dna.util.apply(initializer.fn, params);
         };
      dna.events.getInitializers().forEach(init);
      return root;
      },
   setup: (): JQuery => {
      const runner = (elem: Element, type: string, event: Event) => {
         // Finds elements for the given event type and executes the callback passing in the
         //    element, event, and component (container element with "data-component" attribute).
         // Types: click|change|input|key-up|key-down|enter-key
         const target = <HTMLElement>elem.closest('[data-' + type + ']');
         const fn =     target?.dataset[dna.util.toCamel(type)];
         const isLink = target?.nodeName === 'A';
         if (type === 'click' && isLink && fn?.match(/^dna[.]/))
            event.preventDefault();
         const nextClickTarget = target?.parentElement?.closest('[data-on-click]');
         if (type === 'click' && nextClickTarget)
            runner(nextClickTarget, type, event);
         return fn && dna.util.apply(fn, [target, event]);
         };
      const handleEvent = (target: HTMLElement, event: Event) => {
         const updateField =  (elem: Element, calc: DnaCallback) =>
            dna.util.assign(<DnaDataObject>dna.getModel(<JQuery>$(elem)), $(elem).data().dnaField, <Json>calc(elem));
         const getValue =     (elem: HTMLInputElement) => elem.value;
         const isChecked =    (elem: HTMLInputElement) => elem.checked;
         const updateOption = (elem: Element) => updateField(elem, <DnaCallback>isChecked);
         const updateModel =  () => {
            const mainClone = dna.getClone($(target), { main: true });
            if (mainClone.length === 0) {  //TODO: figure out why some events are captured on the template instead of the clone
               //console.error('Event not on clone:', event.timeStamp, event.type, target);
               return;
               }
            if (target instanceof HTMLInputElement && target.type === 'checkbox')
               updateField(target, <DnaCallback>isChecked);
            if (target instanceof HTMLInputElement && target.type === 'radio')
               globalThis.document.querySelectorAll('input[type=radio][name=' + target.name + ']').forEach(updateOption);
            else if ($(target).data().dnaRules.val)
               updateField(target, <DnaCallback>getValue);
            dna.refresh(mainClone);
            };
         if (target.classList.contains(dna.name.updateModel))
            updateModel();
         return runner(target, 'on-' + event.type.replace('key', 'key-'), event);
         };
      const handleSmartUpdate = (elem: HTMLElement, event: Event) => {
         // <input data-smart-update=saveNote data-smart-throttle=2000 value=~~note~~>
         const throttleDefault = 1000;  //default 1 second delay between callbacks
         const throttleSetting = elem.dataset.smartThrottle;
         const throttle =        throttleSetting ? parseInt(throttleSetting) : throttleDefault;
         const data =            $(elem).data();
         const value =           () => (<HTMLInputElement>elem).value;
         const doCallback = () => {
            data.dnaLastUpdated = Date.now();
            data.dnaLastValue =   value();
            data.dnaTimeoutId =   null;
            runner(elem, 'smart-update', event);
            };
         const handleChange = () => {
            if (Date.now() < data.dnaLastUpdated + throttle)
               data.dnaTimeoutId = globalThis.setTimeout(doCallback, throttle);
            else
               doCallback();
            };
         const checkForValueChange = () => {
            if (value() !== data.dnaLastValue && !data.dnaTimeoutId)
               handleChange();
            };
         if (event.type === 'keydown' && data.dnaLastValue === undefined)
            data.dnaLastValue = value();
         globalThis.setTimeout(checkForValueChange);  //requeue so elem.value is ready on paste event
         };
      const jumpToUrl = (elem: HTMLElement) => {
         // Usage:
         //    <button data-href=https://dna-engine.org>dna-engine</button>
         // If element (or parent) has the class "external-site", page will be opened in a new tab.
         const useSameTab = dna.browser.userAgentData().mobile;
         const target =     elem.closest('.external-site') ? '_blank' : '_self';
         globalThis.open(elem.dataset.href, useSameTab ? '_self' : elem.dataset.target ?? target);
         };
      dna.events.onClick(handleEvent);
      dna.events.onChange(handleEvent);
      dna.events.onKeyDown(handleEvent);
      dna.events.onKeyUp(handleEvent);
      dna.events.onInput(handleEvent);
      dna.events.onEnterKey((elem, event) => runner(elem, 'on-enter-key', event), '[data-on-enter-key]');
      dna.events.onFocus(   (elem, event) => runner(elem, 'on-focus',     event), '[data-on-focus]');
      dna.events.onBlur(    (elem, event) => runner(elem, 'on-blur',      event), '[data-on-blur]');
      dna.events.onHoverIn( (elem, event) => runner(elem, 'on-hover-in',  event), '[data-on-hover-in]');
      dna.events.onHoverOut((elem, event) => runner(elem, 'on-hover-out', event), '[data-on-hover-out]');
      dna.events.onKeyDown(handleSmartUpdate, 'input[data-smart-update]');
      dna.events.onKeyUp(  handleSmartUpdate, 'input[data-smart-update]');
      dna.events.onChange( handleSmartUpdate, 'input[data-smart-update]');
      dna.events.onClick(jumpToUrl, '[data-href]');
      return dna.events.runOnLoads();
      },
   };

const dnaCore = {
   inject: <T>(clone: JQuery, data: T, count: number, settings: DnaOptionsClone<T>): JQuery => {
      // Inserts data into a clone and executes its rules.
      const injectField = (elem: JQuery, field: string, dnaRules: DnaRules) => {  //example: <h2>~~title~~</h2>
         const value = field === '[count]' ? count : field === '[value]' ? data :
            dna.util.value(data, field);
         const formatted = () => dnaRules.formatter ?
            dnaRules.formatter(<DnaFormatterValue>value, data) : String(value);
         if (['string', 'number', 'boolean'].includes(typeof value))
            elem = settings.html ? elem.html(formatted()) : elem.text(formatted());
         };
      const injectValue = (elemJ: JQuery, field: string) => {
         const elem = $(elemJ);
         const value = field === '[count]' ? count :
            field === '[value]' ? data : dna.util.value(data, field);
         if (value !== null && value !== elem.val())
            elem.val(String(value));
         };
      const injectProps = (elem: JQuery, props: DnaProps) => {  //example props: ['selected', 'set']
         for (let prop = 0; prop < props.length/2; prop++)  //each prop has a key and a field name
            elem.prop(props[prop*2]!,
               dna.util.realTruth(dna.util.value(data, props[prop*2 + 1]!)));
         };
      const injectAttrs = (elemJ: JQuery, dnaRules: DnaRules) => {
         const elem = $(elemJ);
         const attrs = dnaRules.attrs!;  //example attrs: ['data-tag', ['', 'tag', '']]
         const inject = (key: DnaAttrName, parts: DnaAttrParts) => {  //example parts: 'J~~code.num~~' ==> ['J', 'code.num', '']
            const field =     parts[1];
            const core =      field === 1 ? count : field === 2 ? data : dna.util.value(data, field);
            const value =     [parts[0], core, parts[2]].join('');
            const formatted = dnaRules.formatter ?
               dnaRules.formatter(<DnaFormatterValue>value, data) : value;
            elem.attr(key, formatted);
            if (/^data-./.test(key))
               elem.data(key.substring(5), formatted);
            if (key === 'value' && value !== elem.val())  //set elem val for input fields, example: <input value=~~tag~~>
               elem.val(value);
            };
         for (let i = 0; i < attrs.length / 2; i++)  //each attr has a key and parts
            inject(<DnaAttrName>attrs[i*2], <DnaAttrParts>attrs[i*2 + 1]);
         };
      const injectClass = (elem: JQuery, classLists: string[][]) => {
         // classLists = [['field', 'class-true', 'class-false'], ...]
         const process = (classList: string[]) => {
            const value = dna.util.value(data, <string>classList[0]);
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
         const value = dna.util.value(data, fieldName);
         return value !== undefined && value !== null;
         };
      const processLoop = (elem: JQuery, loop: DnaLoop) => {
         const dataArray = <T[]>dna.util.value(data, loop.field);
         const subClones = elem.children('.' + loop.name.replace(/[.]/g, '\\.'));
         const injectSubClone = (elem: JQuery, index: number) => {
            if (!elem.is('option'))  //prevent select from closing on chrome
               dna.core.inject(elem, dataArray[index]!, index + 1, settings);
            };
         const rebuildSubClones = () => {
            subClones.remove();
            dna.clone(loop.name, dataArray, { container: elem, html: !!settings.html });
            };
         if (!dataArray)
            (data[<keyof typeof data>loop.field]) = <T[keyof T]><unknown>[];
         else if (dataArray.length === subClones.length)
            subClones.forEach(injectSubClone);
         else
            rebuildSubClones();
         };
      const process = (elem: JQuery) => {
         const dnaRules = <DnaRules>elem.data().dnaRules;
         if (dnaRules.transform)  //alternate version of the "transform" option
            dna.util.apply(dnaRules.transform, data);
         if (dnaRules.loop)
            processLoop(elem, dnaRules.loop);
         if (dnaRules.text)
            injectField(elem, elem.data().dnaField, dnaRules);
         if (dnaRules.val)
            injectValue(elem, elem.data().dnaField);
         if (dnaRules.props)
            injectProps(elem, dnaRules.props);
         if (dnaRules.attrs)
            injectAttrs(elem, dnaRules);
         if (dnaRules.class)
            injectClass(elem, dnaRules.class);
         if (dnaRules.require)
            elem.toggle(fieldExists(dnaRules.require));
         if (dnaRules.missing)
            elem.toggle(!fieldExists(dnaRules.missing));
         if (dnaRules.true)
            elem.toggle(dna.util.realTruth(dna.util.value(data, dnaRules.true)));
         if (dnaRules.false)
            elem.toggle(!dna.util.realTruth(dna.util.value(data, dnaRules.false)));
         if (dnaRules.callback)
            dna.util.apply(dnaRules.callback, elem);
         };
      const dig = (elems: JQuery) => {
         elems.filter(dna.selector.nucleotide).forEach(process);
         if (elems.length)
            dig(elems.children().not(dna.selector.subClone));
         };
      if (settings.transform)  //alternate version of data-transform
         settings.transform(data);
      dig(clone);
      clone.data().dnaModel = data;
      clone.data().dnaCount = count;
      return clone;
      },
   replicate: <T>(template: DnaTemplate, data: T, settings: DnaOptionsClone<T>): JQuery => {
      // Creates and sets up a clone.
      const displaySeparators = () => {
         const clones = container.children('.' + template.name);
         clones.find(dna.selector.separator).show().end().last().find(dna.selector.separator).hide();
         clones.find(dna.selector.lastSeparator).hide().end().eq(-2).find(dna.selector.lastSeparator).show()
            .closest(dna.selector.clone).find(dna.selector.separator).hide();
         };
      const selector =      '.dna-contains-' + template.name.replace(/[.]/g, '\\.');
      const getContainer =  () => settings.container!.find(selector).addBack(selector);
      const container =     settings.container ? getContainer() : template.container;
      const containerNode = container[0]!;
      const templateNode =  template.elem[0]!;
      const templateNodes = [templateNode, ...templateNode.getElementsByTagName('*')];
      const templateData =  templateNodes.map(subnode => $(subnode).data());
      const node =          <HTMLElement>templateNode.cloneNode(true);
      const nodes =         [node, ...node.getElementsByTagName('*')];
      nodes.forEach((subnode, i) => $(subnode).data(templateData[i]!));
      const clone = <JQuery>$(node);
      const name =  clone.data().dnaRules.template;
      if (!container.data().dnaCountsMap)
         container.data().dnaCountsMap = {};
      const countsMap = container.data().dnaCountsMap;
      countsMap[name] = (countsMap[name] || 0) + 1;
      dna.core.inject(clone, data, countsMap[name], settings);
      const intoUnwrapped = () => {
         const firstClone = () => {
            const contents = container.data().dnaContents;
            const index =    contents.indexOf(template.name);
            const adjustment = (clonesAbove: number, name: string) =>
               clonesAbove + (name && contents.indexOf(name) < index ?
                  allClones.filter('.' + name).length - 1 : 0);
            const target = container.children().eq(index + contents.reduce(adjustment, 0));
            const targetNode = target[0];
            return targetNode ? containerNode.insertBefore(node, targetNode) : containerNode.append(node);
            };
         const allClones = container.children(dna.selector.clone);
         const sameClones = allClones.filter('.' + template.name);
         if (!sameClones.length)
            firstClone();
         else if (settings.top)
            containerNode.insertBefore(node, sameClones.first()[0]!);
         else
            containerNode.insertBefore(node, sameClones.last()[0]!.nextSibling);
         };
      if (!template.wrapped)
         intoUnwrapped();
      else if (settings.top)
         containerNode.prepend(node);
      else
         containerNode.append(node);
      if (template.separators)
         displaySeparators();
      dna.events.runInitializers(clone);
      if (settings.callback)
         settings.callback(clone, data);
      if (settings.fade)
         dna.ui.slideFadeIn(node);
      return clone;
      },
   getArrayName: (subClone: JQuery): string | null => {
      return subClone.hasClass(dna.name.subClone) ? subClone.data().dnaRules.array : null;
      },
   updateModelArray: (container: JQuery): JQuery => {
      // Sets the array field of the clone's data model to the list of sub-clone data models.
      const containerNode = container[0]!;
      dna.core.assert(containerNode.classList.contains(dna.name.array), 'Invalid array container', container.attr('class'));
      const array =        container.data().dnaRules.loop;
      const subs =         container.children('.' + array.name);
      const model =        <DnaDataObject>dna.getModel(container);
      const nodeToModel =  (node: HTMLElement) => dna.getModel($(node));
      model[array.field] = <Json[]>subs.toArray().map(nodeToModel);
      return container;
      },
   remove: <T>(clone: JQuery, callback?: DnaCallbackFn<T> | null): JQuery => {
      const container = clone.parent();
      clone.detach();
      if (clone.hasClass(dna.name.subClone))
         dna.core.updateModelArray(container);
      dna.placeholder.setup();
      clone.remove();
      if (callback)
         callback(clone, <T>dna.getModel(clone));
      return clone;
      },
   assert: (ok: boolean | unknown, message: string, info: unknown): void => {
      // Oops, file a tps report.
      try {
         if (!ok)
            throw Error('[dna-engine] ' + message + ': ' + String(info));
         }
      catch (e) {
         console.error((<Error>e).stack);
         throw Error((<Error>e).message);
         }
      },
   plugin: (): void => {
      $.fn.forEach = function(fn: DnaForEachCallback): JQuery {
         // Usage:
         //    const addRandomNumber = (elem) => elem.text(Math.random());
         //    elems.forEach(addRandomNumber).fadeIn();
         const elems = <JQuery><unknown>this;
         return elems.each((index, node) => fn($(node), index));
         };
      $.fn.dna = function(action: DnaPluginAction, ...params: unknown[]) {  //any additional parameters are passed to the api call
         // Example:
         //    dna.getClone(elem).dna('up');
         // Supported actions:
         //    'bye', 'clone-sub', 'destroy', 'down', 'refresh', 'up'
         const elems =  <JQuery><unknown>this;
         const dnaApi = <DnaCallback>dna[<keyof Dna>dna.util.toCamel(action)];
         dna.core.assert(dnaApi, 'Unknown plugin action', action);
         const callApi = (elem: JQuery) => dnaApi(elem, ...params);
         return elems.forEach(callApi);
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
      },
   };

const dna = {
   version: '{{pkg.version}}',
   // API:
   //    dna.clone()
   //    dna.arrayPush()
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
   // See: https://dna-engine.org/docs/#api
   clone<T>(name: string, data: T | T[], options?: DnaOptionsClone<T>): JQuery {
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
         callback:  null,
         };
      const settings = { ...defaults, ...options };
      const template = dna.store.getTemplate(name);
      const missing =  template.nested && !settings.container;
      dna.core.assert(!missing, 'Container missing for nested template', name);
      if (settings.empty)
         dna.empty(name);
      const list = [].concat(...Array(settings.clones).fill(data));
      let clones = $();
      const addClone = (model: T) =>
         clones = clones.add(dna.core.replicate(template, model, settings));
      list.forEach(addClone);
      dna.placeholder.setup();
      dna.panels.initialize(clones.first().closest(dna.selector.panels)[0]);
      clones.first().parents(dna.selector.hide).removeClass(dna.name.hide).addClass(dna.name.unhide);
      return clones;
      },
   arrayPush<T>(holderClone: JQuery, arrayField: string, data: T | T[], options?: DnaOptionsArrayPush): JQuery {
      // Clones a sub-template to append onto an array loop.
      const cloneSub = (field: string, index: number) => {
         const clone = () => {
            const name =     dna.compile.subTemplateName(holderClone, arrayField, index);
            const selector = '.dna-contains-' + name;
            const settings = { container: holderClone.find(selector).addBack(selector) };
            dna.clone(name, data, { ...settings, ...options });
            dna.core.updateModelArray(settings.container);
            };
         if (field === arrayField)
            clone();
         };
      holderClone.data().dnaRules.subs.forEach(cloneSub);
      return holderClone;
      },
   createTemplate(name: string, html: string, holder: JQuery): DnaTemplate {
      // Generates a template from an HTML string.
      const holderNode = holder[0]!;
      const div =        globalThis.document.createElement('div');
      div.innerHTML = html;
      const elem = div.firstElementChild!;
      elem.id = name;
      elem.classList.add(dna.name.template);
      holderNode.append(elem);
      return dna.store.getTemplate(name);
      },
   templateExists(name: string): boolean {
      return !!dna.store.getTemplateDb()[name] || $('.dna-template#' + name).length > 0;
      },
   getModel<T>(elemOrName: JQuery | string, options?: DnaOptionsGetModel): T | T[] | undefined {
      // Returns the underlying data of the clone.
      const getOne = (elem: JQuery) =>
         dna.getClone($(elem), options).data('dnaModel');
      const getAll = (name: string) =>
         dna.getClones(name).toArray().map(node => getOne($(node)));
      return typeof elemOrName === 'string' ? getAll(elemOrName) : getOne(elemOrName);
      },
   empty(name: string, options?: DnaOptionsEmpty): Element[] {
      // Deletes all clones generated from the template.
      const defaults = { fade: false };
      const settings = { ...defaults, ...options };
      const template = dna.store.getTemplate(name);
      const clones =   template.container.children(dna.selector.clone).toArray();
      if (template.container.data().dnaCountsMap)
         template.container.data().dnaCountsMap[name] = 0;
      if (settings.fade)
         clones.forEach(clone => dna.ui.slideFadeDelete(clone));
      else
         clones.forEach(clone => dna.core.remove($(clone)));
      return clones;
      },
   insert<T>(name: string, data: T, options?: DnaOptionsInsert<T>): JQuery {
      // Updates the first clone if it already exists otherwise creates the first clone.
      const clone = dna.getClones(name).first();
      return clone.length ? dna.refresh(clone, { data: data, html: !!options?.html }) :
         dna.clone(name, data, options);
      },
   refresh(clone: JQuery, options?: DnaOptionsRefresh): JQuery {
      // Updates an existing clone to reflect changes to the data model.
      const defaults = { html: false };
      const settings = { ...defaults, ...options };
      const elem = dna.getClone(clone, options);
      const data = settings.data ? settings.data : dna.getModel(elem);
      return dna.core.inject(elem, data, elem.data().dnaCount, settings);
      },
   refreshAll(name: string, options?: DnaOptionsRefreshAll): JQuery {
      // Updates all the clones of the specified template.
      const clones =  dna.getClones(name);
      const refresh = (node: HTMLElement) => { dna.refresh($(node), options); };
      clones.toArray().forEach(refresh);
      return clones;
      },
   updateField(inputElemJ: JQuery, value: Json): JQuery {
      const inputElem = $(inputElemJ);
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
         const update = (elem: JQuery, index: number) => {
            elem.data().dnaCount = index + 1;
            dna.refresh(elem, options);
            };
         const container = clone.parent();
         const clones =    container.children('.dna-clone.' + name).forEach(update);
         container.data().dnaCountsMap =       container.data().dnaCountsMap || {};
         container.data().dnaCountsMap[name] = clones.length;
         };
      if (clone.length)
         renumber();
      return clone;
      },
   destroy<T>(clone: JQuery, options?: DnaOptionsDestroy<T>): JQuery {
      // Removes an existing clone from the DOM.
      const defaults = { main: false, fade: false, callback: null };
      const settings = { ...defaults, ...options };
      clone = dna.getClone(clone, options);
      const arrayField = dna.core.getArrayName(clone);
      if (arrayField)
         (<Json[]>(<DnaModel>dna.getModel(clone.parent()))[<keyof DnaModel>arrayField]).splice(dna.getIndex(clone), 1);
      const fadeDelete = () => dna.ui.slideFadeDelete(clone[0]!, settings.callback);
      return settings.fade ? <JQuery>$(fadeDelete()) : dna.core.remove(clone, settings.callback);
      },
   getClone(elem: JQuery, options?: DnaOptionsGetClone): JQuery {
      // Returns the clone (or sub-clone) for the specified element.
      const defaults = { main: false };
      const settings = { ...defaults, ...options };
      const selector = settings.main ? '.dna-clone:not(.dna-sub-clone)' : dna.selector.clone;
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
   up<T>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T>): Element {
      // Smoothly moves a clone up one slot effectively swapping its position with the previous
      // clone.
      const elem = dna.ui.toElem(elemOrEventOrIndex, this);
      return dna.ui.smoothMoveUp(dna.getClone(elem)[0]!, callback);
      },
   down<T>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T>): Element {
      // Smoothly moves a clone down one slot effectively swapping its position with the next
      // clone.
      const elem = dna.ui.toElem(elemOrEventOrIndex, this);
      return dna.ui.smoothMoveDown(dna.getClone(elem)[0]!, callback);
      },
   bye<T>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T>): JQuery {
      // Performs a sliding fade out effect on the clone and then removes the element.
      const elem = dna.ui.toElem(elemOrEventOrIndex, this);
      const fn = typeof callback === 'function' ? callback : null;
      return dna.destroy(elem, { fade: true, callback: fn });
      },
   registerInitializer(fn: DnaFunctionName | DnaInitializerFn, options?: DnaOptionsRegisterInitializer): DnaInitializer[] {
      // Adds a callback function to the list of initializers that are run on all DOM elements.
      const defaults = { selector: null, params: null, onDocLoad: true };
      const settings = { ...defaults, ...options };
      const rootSelector = settings.selector;
      const onDocLoadElems = () => !rootSelector ? $(globalThis.document) :
         $(rootSelector).not(dna.selector.template).not(rootSelector).addClass(dna.name.initialized);
      if (settings.onDocLoad)
         dna.util.apply(fn, [onDocLoadElems(), ...dna.array.wrap(settings.params)]);
      const initializer = { fn: fn, selector: rootSelector, params: settings.params };
      dna.events.getInitializers().push(initializer);
      return dna.events.getInitializers();
      },
   clearInitializers(): DnaInitializer[] {
      // Deletes all initializers.
      return dna.events.getInitializers().splice(0);
      },
   registerContext(contextName: string, contextObjOrFn: { [name: string]: unknown } | DnaCallback): DnaContext {
      // Registers an application object or individual function to enable it to be used for event
      // callbacks.  Registration is needed when global namespace is not available to dna-engine, such
      // as when using webpack to load dna-engine as a module.
      dna.events.getContextDb()[contextName] = contextObjOrFn;
      return dna.events.getContextDb();
      },
   initGlobal(thisWindow: GlobalWindow, thisJQuery: JQueryStatic): unknown {
      thisWindow.$ =   thisJQuery;
      thisWindow.dna = dna;
      const writable = (prop: string): boolean => !globalThis[<GlobalKey>prop] ||
         !!Object.getOwnPropertyDescriptor(globalThis, prop)?.writable;
      if (writable('window'))
         globalThis.window = thisWindow;
      if (writable('document'))
         globalThis.document = thisWindow.document;
      if (writable('$'))
         (<GlobalWindow><unknown>globalThis).$ = thisJQuery;
      if (writable('dna'))
         globalThis.dna = dna;
      return dna.core.setup();
      },
   info(): DnaInfo {
      // Returns status information about templates on the current web page.
      const names =  Object.keys(dna.store.getTemplateDb());
      const panels = $('.dna-menu.dna-panels-initialized');
      return {
         version:      dna.version,
         templates:    names.length,
         clones:       $('.dna-clone:not(.dna-sub-clone)').length,
         subs:         $(dna.selector.subClone).length,
         names:        names,
         store:        dna.store.getTemplateDb(),
         initializers: dna.events.getInitializers(),
         panels:       panels.toArray().map(elem => <string>$(elem).attr('data-nav')),
         };
      },
   name:        dnaName,
   selector:    <typeof dnaName>Object.fromEntries(Object.entries(dnaName).map(pair => [pair[0], '.' + pair[1]])),
   array:       dnaArray,
   browser:     dnaBrowser,
   pageToken:   dnaPageToken,
   dom:         dnaDom,
   ui:          dnaUi,
   util:        dnaUtil,
   format:      dnaFormat,
   placeholder: dnaPlaceholder,
   panels:      dnaPanels,
   compile:     dnaCompile,
   store:       dnaStore,
   events:      dnaEvents,
   core:        dnaCore,
   };

dna.core.setup();

export { dna };
