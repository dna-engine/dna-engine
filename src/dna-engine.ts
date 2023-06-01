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
   model:      unknown,
   main:       boolean,
   html:       boolean,
   };
export type DnaOptionsRefresh = Partial<DnaSettingsRefresh>;
export type DnaSettingsRefreshAll = {
   model:      unknown,
   main:       boolean,
   html:       boolean,
   };
export type DnaOptionsRefreshAll = Partial<DnaSettingsRefreshAll>;
export type DnaSettingsRecount = {
   html:       boolean,
   };
export type DnaOptionsRecount = Partial<DnaSettingsRecount>;
export type DnaOptionsDestroy = {
   main?:      boolean,
   fade?:      boolean,
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
   params:     unknown[],
   onDocLoad:  boolean,
   };
export type DnaOptionsRegisterInitializer = Partial<DnaSettingsRegisterInitializer>;
export type DnaSettingsRunOnLoads = {
   msec:       number,  //milliseconds
   };
export type DnaOptionsEventsOn = Partial<DnaSettingsEventsOn>;
export type DnaSettingsEventsOn = {
   keyFilter:  string | null,
   selector:   string | null,
   };
export type DnaOptionsRunOnLoads = Partial<DnaSettingsRunOnLoads>;

// Types: Data, Templates, and Callbacks
export type DnaForEachCallback = (elem: JQuery, index: number) => void;
declare global { interface JQuery {
   forEach: (fn: DnaForEachCallback) => JQuery,
   } }
export type DnaModel =          JsonData;
export type DnaDataObject =     JsonObject;
export type DnaFormatter =      <T>(value: DnaFormatterValue, model?: T) => string;
export type DnaFormatterValue = number | string | boolean;
export type DnaMsec =           number | string;  //milliseconds UTC (or ISO 8601 string)
export type DnaCallback =       (...args: unknown[]) => unknown;
export interface DnaTransformFn<T> { (model: T): void }
export interface DnaCallbackFn<T> { (elem: Element, model?: T): void }
export interface DnaInitializerFn { (elem: Element, ...params: unknown[]): void }
export type DnaEventListener = (elem: Element, event: Event, selector: string | null) => void;
export type DnaInitializer = {
   fn:       DnaFunctionName | DnaInitializerFn,
   selector: string | null,
   params:   unknown[],
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
   state:        unknown[],
   };

// Types: Top Level
type GlobalKey =    keyof typeof globalThis;
type GlobalWindow = Window & typeof globalThis & { $: JQueryStatic };
type Dna =          typeof dna;
declare global { var dna: Dna }  //eslint-disable-line no-var

const dnaName = {  //class name lookup table
   animating:         'dna-animating',
   animatingDone:     'dna-animating-done',
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
   stateDepot: <{ [key: string | number | symbol]: unknown }[]>[],
   state(elem: Element) {
      // Returns an object associated with the element that can be used to store values.
      // Usage:
      //    dna.dom.state(document.body).lastUpdate = Date.now();
      dna.core.assert(dna.dom.isElem(elem), 'Invalid HTML element', elem);
      const data = (<HTMLElement>elem).dataset;
      if (!data.dnaStoreIndex)
         data.dnaStoreIndex = String(dna.dom.stateDepot.push({}) - 1);
      return dna.dom.stateDepot[parseInt(data.dnaStoreIndex)]!;
      },
   removeState(elem: Element): Element {
      dna.core.assert(dna.dom.isElem(elem), 'Invalid HTML element', elem);
      const data = (<HTMLElement>elem).dataset;
      if (data.dnaStoreIndex)
         dna.dom.stateDepot[parseInt(data.dnaStoreIndex)] = {};
      return elem;
      },
   hasClass(elems: Element[] | HTMLCollection | NodeListOf<Element>, className: string): boolean {
      // Returns true if any of the elements in the given list have the specified class.
      return Array.prototype.some.call(elems, elem => elem.classList.contains(className));
      },
   replaceClass(elem: Element, oldName: string, newName: string): Element {
      // Same as native elem.classList.replace() except the new class name is always added.
      elem.classList.remove(oldName);
      elem.classList.add(newName);
      return elem;
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
   index(elem: Element): number {
      // Returns the index of element within its container (relative to all its sibling elements).
      let index = 0;
      let prev =  elem.previousElementSibling;
      while (prev) {
         index++;
         prev = prev.previousElementSibling;
         }
      return index;
      },
   indexOf(elems: NodeListOf<Element>, elem: Element): number {
      // Returns the location an element within an array of elements.
      return Array.prototype.indexOf.call(elems, elem);
      },
   findIndex(elems: HTMLCollection | NodeListOf<Element>, selector: string): number {
      // Returns the location of the first matching element within an array of elements.
      return Array.prototype.findIndex.call(elems, (elem) => elem.matches(selector));
      },
   isElem(elem: unknown): boolean {
      return !!elem && typeof elem === 'object' && !!(<Element>elem).nodeName;
      },
   getAttrs(elem: Element): Attr[] {
      // Returns the attributes of the element in a regular array.
      return elem ? Object.values(elem.attributes) : [];
      },
   };

const dnaUi = {
   isHidden(elem: Element): boolean {
      const computed = globalThis.getComputedStyle(elem);
      return computed.display === 'none' || computed.visibility === 'hidden' ||
         computed.visibility === 'collapse' || computed.opacity === '0' || elem.clientHeight === 0;
      },
   isVisible(elem: Element): boolean {
      return !dna.ui.isHidden(elem);
      },
   show(elem: Element): Element {
      const style = (<HTMLElement>elem).style;
      style.removeProperty('display');
      style.removeProperty('opacity');
      style.removeProperty('visibility');
      const computed = globalThis.getComputedStyle(elem);
      const override = (prop: string, values: string[], standIn: string) =>
         values.includes(computed.getPropertyValue(prop)) && style.setProperty(prop, standIn);
      override('display',    ['none'],               'block');
      override('opacity',    ['0'],                  '1');
      override('visibility', ['collapse', 'hidden'], 'visible');
      return elem;
      },
   hide(elem: Element): Element {
      (<HTMLElement>elem).style.display = 'none';
      return elem;
      },
   fadeIn(elem: Element): Promise<Element> {
      // Smooth fade in effect.
      const fadeTransition =  600;
      const computed =        globalThis.getComputedStyle(elem);
      const startOpacity =    dna.ui.isVisible(elem) ? computed.opacity : '0';
      dna.ui.show(elem);
      const style = (<HTMLElement>elem).style;
      style.transition = 'all 0ms';
      style.opacity =    startOpacity;
      const animate = () => {
         style.transition = `all ${fadeTransition}ms`;
         style.opacity =    '1';
         };
      globalThis.requestAnimationFrame(animate);
      const cleanup = () => {
         style.removeProperty('transition');
         style.removeProperty('opacity');
         dna.ui.show(elem);  //ensure visibility in case another animation interfered
         return elem;
         };
      return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), fadeTransition + 100));
      },
   slideFadeIn(elem: Element): Promise<Element> {
      // Smooth slide in plus fade in effect.
      const fadeTransition =  600;
      const style =           (<HTMLElement>elem).style;
      const verticals = [
         'height',
         'border-top-width',
         'border-bottom-width',
         'padding-top',
         'padding-bottom',
         'margin-top',
         'margin-bottom',
         ];
      const start = () => {
         dna.ui.show(elem);
         style.transition = 'all 0ms';
         style.opacity =    '0';
         style.overflow =   'hidden';
         const computed =   globalThis.getComputedStyle(elem);
         const heights =    verticals.map(prop => computed.getPropertyValue(prop));  //store natural heights
         verticals.forEach(prop => style.setProperty(prop, '0px'));                  //squash down to zero
         const animate = () => {
            style.transition = `all ${fadeTransition}ms`;
            style.opacity =    '1';
            verticals.forEach((prop, i) => style.setProperty(prop, heights[i]!));  //slowly restore natural heights
            };
         globalThis.requestAnimationFrame(animate);
         };
      if (dna.ui.isHidden(elem))
         start();
      const cleanup = () => {
         style.removeProperty('transition');
         style.removeProperty('opacity');
         style.removeProperty('overflow');
         verticals.forEach((prop) => style.removeProperty(prop));
         dna.ui.show(elem);  //ensure visibility in case another animation interfered
         return elem;
         };
      return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), fadeTransition + 100));
      },
   slideFadeOut(elem: Element): Promise<Element> {
      // Smooth slide out plus fade out effect.
      const fadeTransition =  600;
      const computed =        globalThis.getComputedStyle(elem);
      const style =           (<HTMLElement>elem).style;
      style.transition = `all ${fadeTransition}ms`;
      style.opacity =    String(Math.min(1, Number(computed.getPropertyValue('opacity'))));
      style.overflow =   'hidden';
      const verticals = [
         'height',
         'border-top-width',
         'border-bottom-width',
         'padding-top',
         'padding-bottom',
         'margin-top',
         'margin-bottom',
         ];
      const heights = verticals.map(prop => computed.getPropertyValue(prop));  //store natural heights
      verticals.forEach((prop, i) => style.setProperty(prop, heights[i]!));    //lock in natural heights
      const animate = () => {
         style.opacity = '0';
         verticals.forEach(prop => style.setProperty(prop, '0px'));  //squash down to zero
         };
      globalThis.requestAnimationFrame(animate);
      const cleanup = () => {
         style.display = 'none';
         style.removeProperty('transition');
         style.removeProperty('opacity');
         style.removeProperty('overflow');
         verticals.forEach((prop) => style.removeProperty(prop));
         return elem;
         };
      return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), fadeTransition + 100));
      },
   slideFade(elem: Element, show: boolean): Promise<Element> {
      return show ? dna.ui.slideFadeIn(elem) : dna.ui.slideFadeOut(elem);
      },
   slideFadeDelete(elem: Element): Promise<Element> {
      // Smooth slide out plus fade out effect followed by removing the element.
      return dna.ui.slideFadeOut(elem).then(dna.core.remove);
      },
   smoothHeight(updateUI: () => unknown, options?: { container?: Element, transition?: number }): Promise<Element> {
      // Smoothly animates the height of a container element from a beginning height to a final
      // height.
      const defaults = { container: globalThis.document.body, transition: 1000 };
      const settings = { ...defaults, ...options };
      const container = settings.container;
      const style = (<HTMLElement>container).style;
      const setBaseline = () => {
         const height = String(container.clientHeight) + 'px';
         style.minHeight = height;
         style.maxHeight = height;
         style.overflow =  'hidden';
         container.classList.add(dna.name.animating);
         };
      const animate = () => {
         const turnOffTransition = () => {
            style.transition = 'none';
            style.maxHeight =  'none';
            container.classList.remove(dna.name.animating);
            };
         const animate = () => {
            style.minHeight = '0px';
            style.maxHeight = '100vh';
            globalThis.setTimeout(turnOffTransition, 1000);  //allow 1s transition to finish
            };
         const setAnimationLength = () => {
            style.transition = `all ${settings.transition}ms`;
            globalThis.requestAnimationFrame(animate);  //allow transition to lock-in before animating
            };
         globalThis.requestAnimationFrame(setAnimationLength);  //allow baseline to lock-in starting height
         };
      const cleanup = () => {
         container.classList.replace(dna.name.animating, dna.name.animatingDone);
         return container;
         };
      setBaseline();
      updateUI();
      animate();
      const delay = settings.transition + 100;
      return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), delay));
      },
   smoothMove(elem: Element, up: boolean): Promise<Element> {
      // Uses animation to smoothly slide an element up or down one slot amongst its siblings.
      const blockingElem = up ? elem.previousElementSibling : elem.nextElementSibling;
      const move = (): Promise<Element> => {
         const submissiveElem = <HTMLElement>blockingElem!;
         const ghostElem =      <HTMLElement>submissiveElem.cloneNode(true);
         submissiveElem.style.display = 'none';
         elem.parentElement!.insertBefore(ghostElem, submissiveElem!);
         elem.parentElement!.insertBefore(up ? elem : submissiveElem!, up ? submissiveElem! : elem);
         const animate = () => {
            dna.ui.slideFadeIn(submissiveElem);
            return dna.ui.slideFadeDelete(ghostElem).then(() => elem);
            };
         return new Promise(resolve => globalThis.requestAnimationFrame(() => resolve(animate())));
         };
      return blockingElem ? move() : new Promise(resolve => resolve(elem));
      },
   smoothMoveUp(elem: Element): Promise<Element> {
      // Uses animation to smoothly slide an element up one slot amongst its siblings.
      return dna.ui.smoothMove(elem, true);
      },
   smoothMoveDown(elem: Element): Promise<Element> {
      // Uses animation to smoothly slide an element down one slot amongst its siblings.
      return dna.ui.smoothMove(elem, false);
      },
   pulse(elem: Element, options?: { fadeIn?: number, showDuration?: number | null, fadeOut?: number }): Promise<Element> {
      // Fades in an element after hiding it to create a single smooth flash effect (intended for
      // temporary status messages, like "Saving...").  Set showDuration to the length of time to
      // display the message or to null to leave the element visible indefinitely.
      const defaults = { fadeIn: 600, showDuration: 7000, fadeOut: 3000 };
      const settings = { ...defaults, ...options };
      dna.core.assert(dna.dom.isElem(elem), 'Invalid element for dna.ui.pulse()', elem);
      const pulseStart = Date.now();
      dna.dom.state(elem).pulseStart = pulseStart;
      const style = (<HTMLElement>elem).style;
      style.transition = 'all 0ms';
      style.opacity =    '0';
      const animate = () => {
         style.transition = `all ${settings.fadeIn}ms`;
         style.opacity =    '1';
         };
      const isLastPulse = () => dna.dom.state(elem).pulseStart === pulseStart;
      const fadeAway = () => {
         style.transition = `all ${settings.fadeOut}ms`;
         if (isLastPulse())
            style.opacity = '0';
         };
      globalThis.requestAnimationFrame(animate);
      if (settings.showDuration)
         globalThis.setTimeout(fadeAway, settings.fadeIn + settings.showDuration);
      const cleanup = () => {
         if (isLastPulse())
            style.removeProperty('transition');
         return elem;
         };
      const total = !settings.showDuration ? settings.fadeIn :
         settings.fadeIn + settings.showDuration + settings.fadeOut;
      return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), total + 100));
      },
   focus: (elem: JQuery): JQuery => {
      // Sets focus on an element.
      return elem.trigger('focus');
      },
   toClone(elemOrEvent: Element | Event) {
      // Returns the clone for the given element or event with a target element.
      const elem = elemOrEvent instanceof Event ? <Element>elemOrEvent.target : elemOrEvent;
      return dna.getClone(elem);
      },
   getComponent(elem: Element): Element | null {
      // Returns the component (container element with a <code>data-component</code> attribute) to
      // which the element belongs.
      return elem?.closest('[data-component]') ?? null;
      },
   };

const dnaUtil = {
   apply<T>(fn: string | DnaCallbackFn<T> | DnaInitializerFn, params: unknown[]): unknown {
      // Calls fn (string name or actual function) passing in params.
      // Usage:
      //    dna.util.apply('app.cart.buy', [7]);       //equivalent to: app.cart.buy(7);
      //    dna.util.apply(addTootip, [elem, 'hi!']);  //equivalent to: addTootip(elem, 'hi!');
      const callback = !fn ?        null :
         typeof fn === 'function' ? fn :
         typeof fn === 'string' ?   dna.util.getFn(fn) :
         null;
      dna.core.assert(callback, 'Invalid callback function', fn);
      return callback(...params);
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
   assign(data: DnaDataObject, field: string, value: Json): DnaDataObject {
      // Sets the field in the data object to the new value and returns the updated data object.
      // Example:
      //    dna.util.assign({ a: { b: 7 } }, 'a.b', 21);  //{ a: { b: 21 } }
      const dataObj = data && typeof data === 'object' ? data : {};
      const fields =  field.split('.');
      const name =    fields[0]!;
      if (fields.length > 1 && !dna.util.isObj(dataObj[name]))
         dataObj[name] = {};
      if (fields.length === 1)
         dataObj[name] = value;
      else
         dna.util.assign(<DnaDataObject>dataObj[name]!, fields.slice(1).join('.'), value);
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
      const twoDigit =      (value: number) => String(value).padStart(2, '0');
      const timestamp =     (date: Date) => date.toISOString().replace('T', '@').slice(0, -5);
      const timestampMsec = (date: Date) => date.toISOString().replace('T', '@').slice(0, -1);
      const space =         (date: string) => date.replace(/\s/g, ' ');
      const general = {  //format parts of the general timestamp, ex: "2030-05-04 1:00am Sat"
         date:  (d: Date) => `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`,
         time:  (d: Date) => d.toLocaleString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s/, '').toLowerCase(),
         day:   (d: Date) => d.toLocaleString([], { weekday: 'short' }),
         stamp: (d: Date) => general.date(d) + ' ' + general.time(d) + ' ' + general.day(d),
         };
      const dateFormatters = <{ [format: string]: DnaFormatter }>{                      //ex: 1904112000000 (msec)
         date:          (msec: DnaMsec) => new Date(msec).toDateString(),               //ex: "Sat May 04 2030"
         general:       (msec: DnaMsec) => general.stamp(new Date(msec)),               //ex: "2030-05-04 1:00am Sat"
         generalDate:   (msec: DnaMsec) => general.date(new Date(msec)),                //ex: "2030-05-04"
         generalDay:    (msec: DnaMsec) => general.day(new Date(msec)),                 //ex: "Sat"
         generalTime:   (msec: DnaMsec) => general.time(new Date(msec)),                //ex: "1:00am"
         iso:           (msec: DnaMsec) => new Date(msec).toISOString(),                //ex: "2030-05-04T08:00:00.000Z"
         locale:        (msec: DnaMsec) => space(new Date(msec).toLocaleString()),      //ex: "5/4/2030, 1:00:00 AM"
         localeDate:    (msec: DnaMsec) => new Date(msec).toLocaleDateString(),         //ex: "5/4/2030"
         localeTime:    (msec: DnaMsec) => space(new Date(msec).toLocaleTimeString()),  //ex: "1:00:00 AM"
         string:        (msec: DnaMsec) => new Date(msec).toString(),                   //ex: "Sat May 04 2030 01:00:00 GMT-0700 (PDT)"
         time:          (msec: DnaMsec) => new Date(msec).toTimeString(),               //ex: "01:00:00 GMT-0700 (PDT)"
         timestamp:     (msec: DnaMsec) => timestamp(new Date(msec)),                   //ex: "2030-05-04@08:00:00"
         timestampMsec: (msec: DnaMsec) => timestampMsec(new Date(msec)),               //ex: "2030-05-04@08:00:00.000"
         utc:           (msec: DnaMsec) => new Date(msec).toUTCString(),                //ex: "Sat, 04 May 2030 08:00:00 GMT"
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

const dnaPlaceholder = {
   // A template placeholder is only shown when its corresponding template is empty (has zero
   // clones).  The "data-placeholder" attribute specifies the name of the template.
   // Usage:
   //    <ol class=books>
   //       <li id=book class=dna-template>~~title~~</li>
   //    </ol>
   //    <p data-placeholder=book>No books</p>  <!-- element hidden unless there are no books -->
   setup() {
      const hideSelect = (elem: Element) => elem.closest('select')?.classList.add(dna.name.hide);
      globalThis.document.querySelectorAll('option.dna-template').forEach(hideSelect);
      const isEmpty = (elem: Element) => !!dna.getClones((<HTMLElement>elem).dataset.placeholder!).length;
      const fade =    (elem: Element) => isEmpty(elem) ? dna.ui.slideFadeOut(elem) : dna.ui.slideFadeIn(elem);
      const placeholders = globalThis.document.querySelectorAll('[data-placeholder]');
      placeholders.forEach(fade);
      return placeholders;
      },
   };

const dnaPanels = {
   // Each click of a menu item displays its corresponding panel and optionally passes the panel
   // element and hash to the function specified by the "data-callback" attribute.
   // Usage:
   //    <nav class=dna-menu data-nav={NAME} data-callback={CALLBACK}>  <-- menu         [role=tablist]  -->
   //       <button>See X1</button>                                     <-- menu item #1 [role=tab]      -->
   //       <button>See X2</button>                                     <-- menu item #2 [role=tab]      -->
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
      const menuData =   (<HTMLElement>menu).dataset;
      const navName =    menuData.nav!;
      const callback =   menuData.callback;
      const panels =     <HTMLCollection>dna.dom.state(menu).dnaPanels;
      const menuItems =  menu.querySelectorAll('.dna-menu-item');
      const savedIndex = Number(dna.pageToken.get(navName, 0));
      const bound =      (loc: number) => Math.max(0, Math.min(loc, menuItems.length - 1));
      const index =      bound(location === undefined ? savedIndex : location);
      if (menu.nodeName === 'SELECT')  //check if elem is a drop-down control
         (<HTMLSelectElement>menu).selectedIndex = index;
      menuItems.forEach(elem => dna.dom.replaceClass(elem, dna.name.selected, dna.name.unselected));
      dna.dom.replaceClass(menuItems[index]!, dna.name.unselected, dna.name.selected);
      const hidePanel = (panel: Element) => {
         dna.ui.hide(panel);
         panel.classList.remove(dna.name.displayed);
         panel.classList.add(dna.name.hidden);
         };
      dna.dom.forEach(panels, hidePanel);
      const panel = <Element>panels[index]!;
      panel.classList.replace(dna.name.hidden, dna.name.displayed);
      dna.ui.fadeIn(panel);
      const hash = (<HTMLElement>panel).dataset.hash;  //example: <nav class=dna-menu data-hash=about-page ...
      dna.pageToken.put(navName, index);
      if (updateUrl && hash)
         globalThis.history.pushState(null, '', '#' + hash);
      if (callback)
         dna.util.apply(callback, [panel, hash]);
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
   nextNav: 1,
   initialize(panelHolder?: Element) {
      const generateNavName = (): string => {
         // Automatically generates a name for unnamed menus.
         const navName =    'dna-panels-' + String(dna.panels.nextNav++);
         const setNavName = (elem: Element) => (<HTMLElement>elem).dataset.nav = navName;
         const menu =       panelHolder!.previousElementSibling!;
         dna.core.assert(menu?.classList.contains('dna-menu'), 'Menu not found for panels', panelHolder);
         setNavName(menu);
         setNavName(panelHolder!);
         return navName;
         };
      const init = () => {
         const navName =    (<HTMLElement>panelHolder!).dataset.nav || generateNavName();
         const menu =       globalThis.document.querySelector('.dna-menu[data-nav=' + navName + ']');
         const panels =     dna.dom.addClass(panelHolder!.children, dna.name.panel);
         const hash =       globalThis.location.hash.replace(/[^\w-]/g, '');  //remove leading "#"
         const hashIndex =  (): number => dna.dom.findIndex(panels, '[data-hash=' + hash + ']');
         const savedIndex = (): number => <number>dna.pageToken.get(navName, 0);
         const loc =        hash && (<HTMLElement>panels[0]).dataset.hash ? hashIndex() : savedIndex();
         panelHolder!.classList.add(dna.name.panelsInitialized);
         dna.core.assert(menu, 'Menu not found for panels', navName);
         menu!.classList.add(dna.name.panelsInitialized);
         dna.dom.state(menu!).dnaPanels = panels;
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
   isDnaField: (index: number, node: Element): boolean => {
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
      const data = (<HTMLElement>elem).dataset;
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
      dna.dom.getAttrs(elem).forEach(compile);
      const getRules = (): DnaRules => dna.compile.setupNucleotide(elemJ).data().dnaRules;
      if (props.length > 0)
         getRules().props = props;
      if (attrs.length > 0)
         getRules().attrs = attrs;
      if (data.formatCurrency)
         getRules().formatter = dnaFormat.getCurrencyFormatter(data.formatCurrency);
      if (data.formatCurrency10)
         getRules().formatter = dnaFormat.getCurrencyFormatter(data.formatCurrency10, 100);
      if (data.formatCurrency100)
         getRules().formatter = dnaFormat.getCurrencyFormatter(data.formatCurrency100, 100);
      if (data.formatCurrency1000)
         getRules().formatter = dnaFormat.getCurrencyFormatter(data.formatCurrency1000, 1000);
      if (data.formatCurrency10000)
         getRules().formatter = dnaFormat.getCurrencyFormatter(data.formatCurrency10000, 10000);
      if (data.formatDate)
         getRules().formatter = dnaFormat.getDateFormatter(data.formatDate);
      if (data.formatNumber)
         getRules().formatter = dnaFormat.getNumberFormatter(data.formatNumber);
      if (data.formatPercent)
         getRules().formatter = dnaFormat.getPercentFormatter(data.formatPercent);
      if (data.format)
         getRules().formatter = dnaFormat.getFormatter(data.format);
      if (data.transform)  //TODO: Determine if it's better to process only at top-level of clone
         getRules().transform = data.transform;  //TODO: string to fn
      if (data.callback)
         getRules().callback = data.callback;
      dna.compile.addFieldClass(elemJ);
      elemJ.removeAttr(names.join(' '));
      },
   getDataField: (elem: JQuery, type: string): string => {
      // Example:
      //    <p data-array=~~tags~~>, 'array'  ==>  'tags'
      return elem.data(type).replace(dna.compile.regex.dnaBasePairs, '').trim();
      },
   subTemplateName(holder: Element | string, arrayField: string, index: number): string {
      // Holder can be element or template name.
      // Example:
      //    subTemplateName('book', 'authors') ==> 'book-authors--2'
      const getRules = (): DnaRules =>
         $(dna.getClone(<Element>holder, { main: true })).data().dnaRules;
      const templateName = typeof holder === 'string' ? holder : getRules().template;
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
      const processTemplate = (elem: Element) => {
         const data = (<HTMLElement>elem).dataset;
         append(<JQuery>$(elem), data.separator ?? null,     dna.name.separator);
         append(<JQuery>$(elem), data.lastSeparator ?? null, dna.name.lastSeparator);
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
            const templateName = (elem: Element): boolean => {
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
         const target = <Element>event.target;
         const elem =   !target || noSelector ? target : <Element>target.closest(settings.selector!);
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
         const target = <Element>(<Element>event.target)?.closest(selector);
         if (target !== null && ready)
            listener(target, event, selector);
         ready = target === null;
         };
      globalThis.document.addEventListener('pointerover', delegator);
      },
   onHoverOut(listener: DnaEventListener, selector: string) {
      let ready = false;
      let prevTarget: Element | null = null;
      const delegator = (event: Event) => {
         const target = <Element>(<Element>event.target)?.closest(selector);
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
   runOnLoads(options?: DnaOptionsRunOnLoads): NodeListOf<Element> {
      // Executes each of the data-on-load functions once the function and its dependencies have loaded.
      // Example:
      //    <p data-on-load=app.cart.setup data-wait-for=Chart,R,fetchJson>
      const defaults = { msec: 300 };
      const settings = { ...defaults, ...options };
      const elems =    document.querySelectorAll(`[data-on-load]:not(.${dna.name.onLoad})`);
      // const elems =    $('[data-on-load]').not(dna.selector.onLoad);
      elems.forEach(elem => elem.classList.add(dna.name.onLoad))
      const addStart = (elem: Element) => $(elem).data().dnaOnLoad = { start: Date.now(), checks: 0 };
      elems.forEach(addStart);
      const runOnLoad = (elem: Element) => {
         const data =     (<HTMLElement>elem).dataset;
         const fnName =   data.onLoad!;
         const fn =       dna.util.getFn(fnName);
         const onLoad =   $(elem).data().dnaOnLoad;
         const waitFor =  data.waitFor?.split(',') ?? [];
         onLoad.waiting = Date.now() - onLoad.start;
         onLoad.checks++;
         dna.core.assert(typeof fn === 'function' || !fn, 'Invalid data-on-load function', fnName);
         const run = () => {
            elem.classList.add(dna.name.executed);
            const params = () => [elem, dna.getModel(elem), dna.ui.getComponent(elem)];
            dna.util.apply(fnName, dna.isClone(elem) ? params() : [elem]);
            };
         if (fn && !waitFor.map(dna.util.getFn).includes(undefined))
            run();
         else
            globalThis.setTimeout(() => runOnLoad(elem), settings.msec);
         };
      elems.forEach(runOnLoad);
      return elems;
      },
   runInitializers(root: Element): Element {
      // Executes the data-callback functions plus registered initializers.
      const init = (initializer: DnaInitializer) => {
         const initElem = (elem: Element) => {
            elem.classList.add(dna.name.initialized);
            dna.util.apply(initializer.fn, [elem, ...initializer.params]);
            };
         if (!initializer.selector || root.matches(initializer.selector))
            initElem(root);
         if (initializer.selector)
            root.querySelectorAll(initializer.selector).forEach(initElem);
         };
      dna.events.getInitializers().forEach(init);
      return root;
      },
   setup: (): NodeListOf<Element> => {
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
         return fn && dna.util.apply(fn, [target, event, dna.ui.getComponent(target)]);
         };
      const handleEvent = (target: Element, event: Event) => {
         const updateField =  (elem: Element, calc: DnaCallback) =>
            dna.util.assign(<DnaDataObject>dna.getModel(<JQuery>$(elem)), $(elem).data().dnaField, <Json>calc(elem));
         const getValue =     (elem: HTMLInputElement) => elem.value;
         const isChecked =    (elem: HTMLInputElement) => elem.checked;
         const updateOption = (elem: Element) => updateField(elem, <DnaCallback>isChecked);
         const updateModel =  () => {
            const mainClone = dna.getClone(target, { main: true });
            if (!mainClone) {  //TODO: figure out why some events are captured on the template instead of the clone
               //console.error('Event not on clone:', event.timeStamp, event.type, target);
               return;
               }
            if (target instanceof HTMLInputElement && target.type === 'checkbox')
               updateField(target, <DnaCallback>isChecked);
            if (target instanceof HTMLInputElement && target.type === 'radio')
               globalThis.document.querySelectorAll('input[type=radio][name=' + target.name + ']').forEach(updateOption);
            else if ($(target).data().dnaRules.val)
               updateField(target, <DnaCallback>getValue);
            dna.refresh(<JQuery>$(mainClone));
            };
         if (target.classList.contains(dna.name.updateModel))
            updateModel();
         return runner(target, 'on-' + event.type.replace('key', 'key-'), event);
         };
      const handleSmartUpdate = (elem: Element, event: Event) => {
         // <input data-smart-update=saveNote data-smart-throttle=2000 value=~~note~~>
         const throttleDefault = 1000;  //default 1 second delay between callbacks
         const throttleSetting = (<HTMLElement>elem).dataset.smartThrottle;
         const throttle =        throttleSetting ? parseInt(throttleSetting) : throttleDefault;
         const data =            $(elem).data();
         const value =           () => (<HTMLInputElement>elem).value;
         const doCallback = () => {
            data.dnaLastUpdated = Date.now();
            data.dnaLastValue =   value();
            data.dnaTimeoutID =   null;
            runner(elem, 'smart-update', event);
            };
         const handleChange = () => {
            if (Date.now() < data.dnaLastUpdated + throttle)
               data.dnaTimeoutID = globalThis.setTimeout(doCallback, throttle);
            else
               doCallback();
            };
         const checkForValueChange = () => {
            if (value() !== data.dnaLastValue && !data.dnaTimeoutID)
               handleChange();
            };
         if (event.type === 'keydown' && data.dnaLastValue === undefined)
            data.dnaLastValue = value();
         globalThis.setTimeout(checkForValueChange);  //requeue so elem.value is ready on paste event
         };
      const jumpToUrl = (elem: Element) => {
         // Usage:
         //    <button data-href=https://dna-engine.org>dna-engine</button>
         // If element (or parent) has the class "external-site", page will be opened in a new tab.
         const useSameTab = dna.browser.userAgentData().mobile;
         const target =     elem.closest('.external-site') ? '_blank' : '_self';
         const data = (<HTMLElement>elem).dataset;
         globalThis.open(data.href, useSameTab ? '_self' : data.target ?? target);
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
   inject: <T>(clone: JQuery, model: T, count: number, settings: DnaOptionsClone<T>): JQuery => {
      // Inserts data into a clone and executes its rules.
      const injectField = (elem: JQuery, field: string, dnaRules: DnaRules) => {  //example: <h2>~~title~~</h2>
         const value = field === '[count]' ? count : field === '[value]' ? model :
            dna.util.value(model, field);
         const formatted = () => dnaRules.formatter ?
            dnaRules.formatter(<DnaFormatterValue>value, model) : String(value);
         if (['string', 'number', 'boolean'].includes(typeof value))
            elem = settings.html ? elem.html(formatted()) : elem.text(formatted());
         };
      const injectValue = (elemJ: JQuery, field: string) => {
         const elem = $(elemJ);
         const value = field === '[count]' ? count :
            field === '[value]' ? model : dna.util.value(model, field);
         if (value !== null && value !== elem.val())
            elem.val(String(value));
         };
      const injectProps = (elem: JQuery, props: DnaProps) => {  //example props: ['selected', 'set']
         for (let prop = 0; prop < props.length/2; prop++)  //each prop has a key and a field name
            elem.prop(props[prop*2]!,
               dna.util.realTruth(dna.util.value(model, props[prop*2 + 1]!)));
         };
      const injectAttrs = (elemJ: JQuery, dnaRules: DnaRules) => {
         const elem = $(elemJ);
         const attrs = dnaRules.attrs!;  //example attrs: ['data-tag', ['', 'tag', '']]
         const inject = (key: DnaAttrName, parts: DnaAttrParts) => {  //example parts: 'J~~code.num~~' ==> ['J', 'code.num', '']
            const field =     parts[1];
            const core =      field === 1 ? count : field === 2 ? model : dna.util.value(model, field);
            const value =     [parts[0], core, parts[2]].join('');
            const formatted = dnaRules.formatter ?
               dnaRules.formatter(<DnaFormatterValue>value, model) : value;
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
            const value = dna.util.value(model, <string>classList[0]);
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
         const value = dna.util.value(model, fieldName);
         return value !== undefined && value !== null;
         };
      const processLoop = (elem: JQuery, loop: DnaLoop) => {
         const dataArray = <T[]>dna.util.value(model, loop.field);
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
            (model[<keyof typeof model>loop.field]) = <T[keyof T]><unknown>[];
         else if (dataArray.length === subClones.length)
            subClones.forEach(injectSubClone);
         else
            rebuildSubClones();
         };
      const process = (elem: JQuery) => {
         const dnaRules = <DnaRules>elem.data().dnaRules;
         if (dnaRules.transform)  //alternate version of the "transform" option
            dna.util.apply(dnaRules.transform, [model]);
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
            elem.toggle(dna.util.realTruth(dna.util.value(model, dnaRules.true)));
         if (dnaRules.false)
            elem.toggle(!dna.util.realTruth(dna.util.value(model, dnaRules.false)));
         if (dnaRules.callback)
            dna.util.apply(dnaRules.callback, [elem]);
         };
      const dig = (elems: JQuery) => {
         elems.filter(dna.selector.nucleotide).forEach(process);
         if (elems.length)
            dig(elems.children().not(dna.selector.subClone));
         };
      if (settings.transform)  //alternate version of data-transform
         settings.transform(model);
      dig(clone);
      clone.data().dnaModel = model;
      clone.data().dnaCount = count;
      return clone;
      },
   replicate: <T>(template: DnaTemplate, model: T, settings: DnaOptionsClone<T>): JQuery => {
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
      const node =          <Element>templateNode.cloneNode(true);
      const nodes =         [node, ...node.getElementsByTagName('*')];
      nodes.forEach((subnode, i) => $(subnode).data(templateData[i]!));
      const clone = <JQuery>$(node);
      const name =  clone.data().dnaRules.template;
      if (!container.data().dnaCountsMap)
         container.data().dnaCountsMap = {};
      const countsMap = container.data().dnaCountsMap;
      countsMap[name] = (countsMap[name] || 0) + 1;
      dna.core.inject(clone, model, countsMap[name], settings);
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
      dna.events.runInitializers(node);
      if (settings.callback)
         settings.callback(node, model);
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
   remove: <T>(cloneNode: Element, callback?: DnaCallbackFn<T> | null): Element => {
      const clone =     <JQuery>$(cloneNode);
      const container = <JQuery>clone.parent();
      clone.detach();
      if (clone.hasClass(dna.name.subClone))
         dna.core.updateModelArray(container);
      dna.placeholder.setup();
      clone.remove();
      if (callback)
         callback(cloneNode, <T>dna.getModel(clone));
      return cloneNode;
      },
   assert(ok: boolean | unknown, message: string, info?: unknown): void {
      // Oops, file a tps report.
      if (!ok)
         try {
            throw Error('[dna-engine] ' + message);
            }
         catch (e) {
            console.error((<Error>e).stack);
            if (info !== undefined)
               console.error(info);
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
   //    dna.getModels()
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
   clone<T>(name: string, model: T | T[], options?: DnaOptionsClone<T>): JQuery {
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
      const list = [].concat(...Array(settings.clones).fill(model));
      let clones = $();
      const addClone = (model: T) =>
         clones = clones.add(dna.core.replicate(template, model, settings));
      list.forEach(addClone);
      dna.placeholder.setup();
      dna.panels.initialize(clones.first().closest(dna.selector.panels)[0]);
      clones.first().parents(dna.selector.hide).removeClass(dna.name.hide).addClass(dna.name.unhide);
      return clones;
      },
   arrayPush<T>(holderClone: JQuery, arrayField: string, model: T | T[], options?: DnaOptionsArrayPush): JQuery {
      // Clones a sub-template to append onto an array loop.
      const cloneSub = (field: string, index: number) => {
         const clone = () => {
            const name =     dna.compile.subTemplateName(holderClone[0]!, arrayField, index);
            const selector = '.dna-contains-' + name;
            const settings = { container: holderClone.find(selector).addBack(selector) };
            dna.clone(name, model, { ...settings, ...options });
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
   getModel<T>(elemJ: JQuery | Element, options?: DnaOptionsGetModel): T | undefined {
      // Returns the underlying data of the clone.
      const elem = elemJ instanceof $ ? (<JQuery>elemJ)[0]! : <Element>elemJ;
      return $(dna.getClone(elem, options)).data('dnaModel');
      },
   getModels<T>(template: string, options?: DnaOptionsGetModel): T[] {
      // Returns the underlying data of the clones for a given template.
      return dna.getClones(template).toArray().map(elem => dna.getModel(elem, options)!);
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
         clones.forEach(clone => dna.core.remove(clone));
      return clones;
      },
   insert<T>(name: string, model: T, options?: DnaOptionsInsert<T>): JQuery {
      // Updates the first clone if it already exists otherwise creates the first clone.
      const clone = dna.getClones(name).first();
      return clone.length ? dna.refresh(clone, { model: model, html: !!options?.html }) :
         dna.clone(name, model, options);
      },
   refresh(clone: JQuery, options?: DnaOptionsRefresh): JQuery {
      // Updates an existing clone to reflect changes to the data model.
      const defaults = { html: false };
      const settings = { ...defaults, ...options };
      const elem = dna.getClone(clone[0]!, options);
      const elemJ = <JQuery>$(elem);
      const model = settings.model ? settings.model : dna.getModel(elem);
      return dna.core.inject(elemJ, model, elemJ.data().dnaCount, settings);
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
   recount(elemJ: JQuery, options?: DnaOptionsRecount): Element {
      // Renumbers the counters starting from 1 for the clone and its siblings based on DOM order.
      const clone = dna.getClone(elemJ[0]!);
      dna.core.assert(clone, 'Cannot find clone', elemJ);
      const name = $(clone).data().dnaRules.template;
      const update = (elem: JQuery, index: number) => {
         elem.data().dnaCount = index + 1;
         dna.refresh(elem, options);
         };
      const container = $(clone).parent();
      const clones =    container.children('.dna-clone.' + name).forEach(update);
      container.data().dnaCountsMap =       container.data().dnaCountsMap || {};
      container.data().dnaCountsMap[name] = clones.length;
      return clone;
      },
   destroy(clone: Element, options?: DnaOptionsDestroy): Promise<Element> {
      // Removes an existing clone from the DOM.
      clone = clone instanceof $ ? $(clone)[0]! : clone;
      const defaults = { main: false, fade: false, callback: null };
      const settings = { ...defaults, ...options };
      const cloneNode =  <Element>dna.getClone(clone, options);
      const cloneElem =  <JQuery>$(dna.getClone($(clone)[0]!, options));
      const arrayField = dna.core.getArrayName(cloneElem);
      if (arrayField)
         (<Json[]>(<DnaModel>dna.getModel(cloneElem.parent()))[<keyof DnaModel>arrayField])
            .splice(dna.getIndex(cloneElem), 1);
      return settings.fade ? dna.ui.slideFadeDelete(cloneNode) :
         new Promise(resolve => resolve(dna.core.remove(cloneNode)));
      },
   isClone(elem: Element): boolean {
      // Returns true if the element is a clone or is inside a clone.
      return !!elem.closest('.dna-clone');
      },
   getClone(elem: Element, options?: DnaOptionsGetClone): Element {
      // Returns the clone (or sub-clone) for the specified element.
      const defaults = { main: false };
      const settings = { ...defaults, ...options };
      dna.core.assert(dna.dom.isElem(elem), 'Invalid element', elem);
      const clone = elem.closest(settings.main ? '.dna-clone:not(.dna-sub-clone)' : '.dna-clone')!;
      dna.core.assert(clone, 'Cannot find clone', elem);
      return clone;
      },
   getClones(name: string): JQuery {
      // Returns an array of all the existing clones for the given template.
      return dna.store.getTemplate(name).container.children('.dna-clone.' + name);
      },
   getIndex(elemJ: JQuery, options?: DnaOptionsGetIndex): number {
      // Returns the index of the clone.
      const clone = dna.getClone(elemJ[0]!, options)!;
      return $(clone).parent().children('.dna-clone.' + $(clone).data().dnaRules.template).index(clone);
      },
   up(elemOrEvent: Element | Event): Promise<Element> {
      // Smoothly moves a clone up one slot effectively swapping its position with the previous
      // clone.
      return dna.ui.smoothMoveUp(dna.ui.toClone(elemOrEvent));
      },
   down(elemOrEvent: Element | Event): Promise<Element> {
      // Smoothly moves a clone down one slot effectively swapping its position with the next
      // clone.
      return dna.ui.smoothMoveDown(dna.ui.toClone(elemOrEvent));
      },
   bye(elemOrEvent: Element | Event): Promise<Element> {
      // Performs a sliding fade out effect on the clone and then removes the element.
      return dna.destroy(dna.ui.toClone(elemOrEvent), { fade: true });
      },
   registerInitializer(fn: DnaFunctionName | DnaInitializerFn, options?: DnaOptionsRegisterInitializer): DnaInitializer[] {
      // Adds a callback function to the list of initializers that are run on all DOM elements.
      const defaults = { selector: null, params: [], onDocLoad: true };
      const settings = { ...defaults, ...options };
      const rootSelector = settings.selector;
      const onDocLoadElems = () => !rootSelector ? [globalThis.document] :
         $(rootSelector).not(dna.selector.template).not(rootSelector).addClass(dna.name.initialized).toArray();
      if (settings.onDocLoad)
         onDocLoadElems().forEach(elem => dna.util.apply(fn, [elem, settings.params].flat()));
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
         clones:       globalThis.document.querySelectorAll('.dna-clone:not(.dna-sub-clone)').length,
         subs:         globalThis.document.querySelectorAll('.dna-sub-clone').length,
         names:        names,
         store:        dna.store.getTemplateDb(),
         initializers: dna.events.getInitializers(),
         panels:       panels.toArray().map(elem => <string>$(elem).attr('data-nav')),
         state:        dna.dom.stateDepot,
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
