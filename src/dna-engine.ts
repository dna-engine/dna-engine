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
export type DnaOptionsClone<T> = Partial<{
   callback:     DnaCallbackFn<T> | null,
   clones:       number,
   container:    Element | null,
   empty:        boolean,
   fade:         boolean,
   formatter:    DnaFormatter | null,
   holder:       Element | null,
   html:         boolean,
   top:          boolean,
   transform:    DnaTransformFn<T> | null,
   }>;
export type DnaOptionsArrayPush = Partial<{
   fade:         boolean,
   top:          boolean,
   }>;
export type DnaOptionsGetModel = Partial<{
   main:         boolean,
   }>;
export type DnaOptionsEmpty = Partial<{
   fade:         boolean,
   }>;
export type DnaOptionsRefresh = Partial<{
   data:         unknown,
   html:         boolean,
   main:         boolean,
   }>;
export type DnaOptionsRefreshAll = Partial<{
   data:         unknown,
   html:         boolean,
   main:         boolean,
   }>;
export type DnaOptionsRecount = Partial<{
   html:         boolean,
   }>;
export type DnaOptionsDestroy = Partial<{
   fade:         boolean,
   main:         boolean,
   }>;
export type DnaOptionsGetClone = Partial<{
   main:         boolean,
   }>;
export type DnaOptionsGetIndex = Partial<{
   main:         boolean,
   }>;
export type DnaOptionsRegisterInitializer = Partial<{
   onDomReady:   boolean,
   params:       unknown[],
   selector:     string | null,
   }>;
export type DnaOptionsRunOnLoads = Partial<{
   pollInterval:number,  //milliseconds
   }>;
export type DnaOptionsEventsOn = Partial<{
   keyFilter:    KeyboardEvent["key"] | null,
   selector:     string | null,
   }>;
export type DnaOptionsPulse = Partial<{
   duration:     number,   //milliseconds
   durationIn:   number,   //milliseconds
   durationOut:  number,   //milliseconds
   noFadeOut:    boolean,  //if true, duration and durationOut are ignored
   text:         string | null,
   }>;
export type DnaOptionsSmoothHeight = Partial<{
   container:    Element,
   overflow:     boolean,
   duration:     number,  //milliseconds
   }>;

// Types: Data, Templates, and Callbacks
export type DnaModel =          JsonData;
export type DnaDataObject =     JsonObject;
export type DnaFormatter =      <T>(value: DnaFormatterValue, model?: T) => string;
export type DnaFormatterValue = number | string | boolean;
export type DnaMsec =           number | string;  //milliseconds UTC (or ISO 8601 string)
export type DnaCallback =       (...args: unknown[]) => unknown;
export interface DnaTransformFn<T> { (data: T): unknown }
export interface DnaCallbackFn<T> { (elem: Element, data?: T): unknown }
export interface DnaInitializerFn { (elem: Element, ...params: unknown[]): void }
export type DnaEventListener = (elem: Element, event: Event, selector: string | null) => void;
export type DnaInitializer = {
   fn:       DnaFunctionName | DnaInitializerFn,
   selector: string | null,
   params:   unknown[],
   };
export type DnaTemplate = {
   name:       string,
   elem:       Element,
   container:  Element,
   nested:     boolean,
   separators: number,
   wrapped:    boolean,
   };
export type DnaTemplateDB =   { [name: string]: DnaTemplate };
export type DnaTemplateName = string;
export type DnaCountsMap =    { [name: string]: number };
export type DnaOnLoad =       { start: number, checks: number, waiting?: number };
export type DnaContext =      { [app: string]: { [field: string]: unknown } | DnaCallback };
export type DnaFieldName =    string;
export type DnaFunctionName = string;
export type DnaClassName =    string;
export type DnaClassRule =    [DnaFieldName, DnaClassName, DnaClassName];
export type DnaAttrName =     string;
export type DnaAttrParts =    [string, DnaFieldName | 0 | 1 | 2, string];
export type DnaAttrs =        (DnaAttrName | DnaAttrParts)[];
export type DnaPropName =     string;
export type DnaProps =        (DnaPropName | DnaFieldName)[];
export type DnaLoop =         { name: string, field: DnaFieldName };
export type DnaRulesKey =     keyof DnaRules;
export type DnaRulesValue =   DnaRules[DnaRulesKey];
export type DnaRules = Partial<{
   template:  DnaTemplateName,
   array:     DnaFieldName,
   text:      boolean,
   val:       boolean,
   attrs:     DnaAttrs,
   props:     DnaProps,
   option:    DnaFieldName,
   formatter: DnaFormatter | null,
   transform: DnaFunctionName,
   callback:  DnaFunctionName,
   class:     DnaClassRule[],
   require:   DnaFieldName,
   missing:   DnaFieldName,
   true:      DnaFieldName,
   false:     DnaFieldName,
   loop:      DnaLoop,
   subs:      DnaFieldName[],
   }>;
export type DnaInfo = {
   version:      string,
   templates:    number,
   clones:       number,
   subs:         number,
   names:        string[],
   store:        DnaTemplateDB,
   initializers: DnaInitializer[],
   panels:       string[],
   state:        unknown[],
   };

// Types: Top Level
type GlobalKey =    keyof typeof globalThis;
type GlobalWindow = Window & typeof globalThis;
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
   wrap<T>(itemOrItems: T | T[]): T[] {
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
      // Class added to element:
      //    <body class=dna-state data-dna-state=21>
      dna.core.assert(dna.dom.isElem(elem), 'Invalid element for getting state', elem);
      const data = (<HTMLElement>elem).dataset;
      elem.classList.add('dna-state');
      if (!data.dnaState)
         data.dnaState = String(dna.dom.stateDepot.push({}) - 1);
      return dna.dom.stateDepot[Number(data.dnaState)]!;
      },
   cloneState(clone: Element): Element {
      // Use imediately after cloning an element in order to grant the clone its own state
      // data (note: it's a shallow copy).
      dna.core.assert(dna.dom.isElem(clone), 'Invalid element for copying state', clone);
      const copy = (elem: Element) => {
         const data =     (<HTMLElement>elem).dataset;
         const newState = { ...dna.dom.stateDepot[Number(data.dnaState)] };
         data.dnaState = String(dna.dom.stateDepot.push(newState) - 1);
         };
      if (clone.classList.contains('dna-state'))
         copy(clone);
      dna.dom.forEach(clone.getElementsByClassName('dna-state'), copy);
      return clone;
      },
   create<K extends keyof HTMLElementTagNameMap | string>(tag: K, options?: { id?: string, subTags?: string[], class?: string, href?: string, html?: string, name?: string, rel?: string, src?: string, text?: string, type?: string }) {
      const elem = globalThis.document.createElement(tag);
      if (options?.id)
         elem.id = options.id;
      if (options?.class)
         elem.classList.add(options.class);
      if (options?.href)
         (<HTMLAnchorElement>elem).href = options.href;
      if (options?.html)
         elem.innerHTML = options.html;
      if (options?.name)
         (<HTMLInputElement>elem).name = options.name;
      if (options?.rel)
         (<HTMLLinkElement>elem).rel = options.rel;
      if (options?.src)
         (<HTMLImageElement>elem).src = options.src;
      if (options?.text)
         elem.textContent = options.text;
      if (options?.type)
         (<HTMLInputElement>elem).type = options.type;
      if (options?.subTags)
         options.subTags.forEach(
            subTag => elem.appendChild(globalThis.document.createElement(subTag)));
      return <K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : HTMLElement>elem;
      },
   removeState(elem: Element): Element {
      dna.core.assert(dna.dom.isElem(elem), 'Invalid element for removing state', elem);
      const data = (<HTMLElement>elem).dataset;
      if (data.dnaState)
         dna.dom.stateDepot[Number(data.dnaState)] = {};
      return elem;
      },
   hasClass(elems: Element[] | HTMLCollection | NodeListOf<Element>, className: string): boolean {
      // Returns true if any of the elements in the given list have the specified class.
      return Array.prototype.some.call(elems, elem => elem.classList.contains(className));
      },
   toggleClass(elem: Element, className: string, state?: boolean): Element {
      // Adds or removes an element class.
      // Example:
      //    dna.dom.toggleClass(document.body, 'dark-mode', new Date().getHours() > 17);
      if (state === undefined ? !elem.classList.contains(className) : state)
         elem.classList.add(className);
      else
         elem.classList.remove(className);
      return elem;
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
   forEach<T extends HTMLCollection>(elems: T, fn: (elem: Element, index: number, elems: unknown[]) => unknown): T {
      // Loops over the given list of elements to pass each element to the specified function.
      Array.prototype.forEach.call(elems, fn);
      return elems;
      },
   map<T>(elems: HTMLCollection | NodeListOf<Element>, fn: (elem: Element, index: number, elems: unknown[]) => T): T[] {
      // Loops over the given list of elements to pass each element to the specified function.
      return <T[]>Array.prototype.map.call(elems, fn);
      },
   filter(elems: HTMLCollection | NodeListOf<Element>, fn: (elem: Element, index: number, elems: unknown[]) => unknown): Element[] {
      // Filters a list of elements.
      return Array.prototype.filter.call(elems, fn);
      },
   filterBySelector(elems: Element[] | HTMLCollection, selector: string): Element[] {
      // Returns direct child elements filtered by the specified selector.
      return Array.prototype.filter.call(elems, elem => elem.matches(selector));
      },
   filterByClass(elems: Element[] | HTMLCollection, ...classNames: string[]): Element[] {
      // Returns direct child elements filtered by one or more class names.
      const hasClass = (elem: Element) => elem.classList.contains(classNames[0]!);
      const filtered = Array.prototype.filter.call(elems, hasClass);
      return classNames.length === 1 ? filtered : dna.dom.filterByClass(filtered, ...classNames.splice(1));
      },
   find(elems: HTMLCollection | NodeListOf<Element>, fn: (elem: Element, index: number, elems: unknown[]) => boolean): Element | null {
      // Finds the first element that satisfies the given condition.
      return Array.prototype.find.call(elems, fn) ?? null;
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
   toElem(elemOrEvent: Element | Event): HTMLElement {
      // Allows convenient support of both:
      //    dna.dom.onClick(addBorder, 'h1');
      //    titleElem.addEventListener('click', addBorder);
      return <HTMLElement>(dna.dom.isElem(elemOrEvent) ? elemOrEvent : (<Event>elemOrEvent).target);
      },
   on(type: string, listener: DnaEventListener, options?: DnaOptionsEventsOn) {
      // Resources:
      //    type ->      https://developer.mozilla.org/en-US/docs/Web/Events
      //    keyFilter -> https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
      const defaults: Required<DnaOptionsEventsOn> = { keyFilter: null, selector: null };
      const settings =   { ...defaults, ...options };
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
      dna.dom.on('click', listener, { selector: selector ?? null });
      },
   onChange(listener: DnaEventListener, selector?: string) {
      dna.dom.on('change', listener, { selector: selector ?? null });
      },
   onInput(listener: DnaEventListener, selector?: string) {
      dna.dom.on('input', listener, { selector: selector ?? null });
      },
   onKeyDown(listener: DnaEventListener, selector?: string) {
      dna.dom.on('keydown', listener, { selector: selector ?? null });
      },
   onKeyUp(listener: DnaEventListener, selector?: string) {
      dna.dom.on('keyup', listener, { selector: selector ?? null });
      },
   onEnterKey(listener: DnaEventListener, selector?: string) {
      dna.dom.on('keyup', listener, { selector: selector ?? null, keyFilter: 'Enter' });
      },
   onFocusIn(listener: DnaEventListener, selector?: string) {
      dna.dom.on('focusin', listener, { selector: selector ?? null });
      },
   onFocusOut(listener: DnaEventListener, selector?: string) {
      dna.dom.on('focusout', listener, { selector: selector ?? null });
      },
   onCut(listener: DnaEventListener, selector?: string) {
      dna.dom.on('cut', listener, { selector: selector ?? null });
      },
   onPaste(listener: DnaEventListener, selector?: string) {
      dna.dom.on('paste', listener, { selector: selector ?? null });
      },
   onTouchStart(listener: DnaEventListener, selector?: string) {
      dna.dom.on('touchstart', listener, { selector: selector ?? null });
      },
   onTouchEnd(listener: DnaEventListener, selector?: string) {
      dna.dom.on('touchend', listener, { selector: selector ?? null });
      },
   onSubmit(listener: DnaEventListener, selector?: string) {
      dna.dom.on('submit', listener, { selector: selector ?? null });
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
   onReady(callback: (...args: unknown[]) => unknown, options?: { quiet?: boolean, name?: string }): DocumentReadyState | 'browserless' {
      // Calls the specified function once the web page is loaded and ready.
      // Example (execute myApp.setup() as soon as the DOM is interactive):
      //    dna.dom.onReady(myApp.setup);
      const state = globalThis.document ? globalThis.document.readyState : 'browserless';
      const name =  options?.name ?? 'dna-engine';
      if (state === 'browserless' && !options?.quiet)
         console.log(dna.util.timestampMsec(), name, 'loaded into browserless context');
      if (['complete', 'browserless'].includes(state))
         callback();
      else
         globalThis.window.addEventListener('DOMContentLoaded', callback);
      return state;
      },
   triggerChange(elem: Element, delay?: number): Event {
      // Simulate user interaction to change an element.
      const event = new Event('change', { bubbles: true });
      if (delay)
         globalThis.setTimeout(() => elem.dispatchEvent(event), delay);
      else
         elem.dispatchEvent(event);
      return event;
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
   toggle(elem: Element, display: boolean): Element {
      return display ? dna.ui.show(elem) : dna.ui.hide(elem);
      },
   fadeIn(elem: Element, options?: { duration: number }): Promise<Element> {
      // Smooth fade in effect.
      const duration =     options?.duration ?? 600;
      const computed =     globalThis.getComputedStyle(elem);
      const startOpacity = dna.ui.isVisible(elem) ? computed.opacity : '0';
      dna.ui.show(elem);
      const style = (<HTMLElement>elem).style;
      style.transition = 'all 0ms';
      style.opacity =    startOpacity;
      const animate = () => {
         style.transition = `all ${duration}ms`;
         style.opacity =    '1';
         };
      globalThis.requestAnimationFrame(animate);
      const cleanup = () => {
         style.removeProperty('transition');
         style.removeProperty('opacity');
         dna.ui.show(elem);  //ensure visibility in case another animation interfered
         return elem;
         };
      return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), duration + 100));
      },
   fadeOut(elem: Element, options?: { duration: number }): Promise<Element> {
      // Smooth fade out effect.
      const duration =   options?.duration ?? 600;
      const style =      (<HTMLElement>elem).style;
      style.transition = 'all 0ms';
      style.opacity =    globalThis.getComputedStyle(elem).opacity;
      const animate = () => {
         style.transition = `all ${duration}ms`;
         style.opacity =    '0';
         };
      if (dna.ui.isVisible(elem))
         globalThis.requestAnimationFrame(animate);
      const cleanup = () => {
         style.removeProperty('transition');
         style.opacity = '0';
         return elem;
         };
      return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), duration + 100));
      },
   slideFadeIn(elem: Element, options?: { force: boolean }): Promise<Element> {
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
      if (dna.ui.isHidden(elem) || options?.force)
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
   smoothHeight(updateUI: () => unknown, options?: DnaOptionsSmoothHeight): Promise<Element> {
      // Smoothly animates the height of a container element from a beginning height to a final
      // height.
      const defaults: Required<DnaOptionsSmoothHeight> = {
         container:  globalThis.document.body,
         overflow:   true,
         duration: 1000,
         };
      const settings =  { ...defaults, ...options };
      const container = settings.container;
      const style =     (<HTMLElement>container).style;
      const setBaseline = () => {
         const height = String(container.clientHeight) + 'px';
         style.minHeight = height;
         style.maxHeight = height;
         if (settings.overflow)
            style.overflow = 'hidden';
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
            style.transition = `all ${settings.duration}ms`;
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
      const delay = settings.duration + 100;
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
   pulse(elem: Element, options?: DnaOptionsPulse): Promise<Element> {
      // Fades in an element after hiding it to create a single smooth flash effect (intended for
      // temporary status messages, like "Saving...").  Set showDuration to the length of time to
      // display the message or to null to leave the element visible indefinitely.
      const defaults: Required<DnaOptionsPulse> = {
         duration: 7000,
         durationIn:  600,
         durationOut: 3000,
         noFadeOut:   false,
         text:        null,
         };
      const settings = { ...defaults, ...options };
      dna.core.assert(dna.dom.isElem(elem), 'Invalid element for dna.ui.pulse()', elem);
      const pulseStart = Date.now();
      dna.dom.state(elem).dnaPulseStart = pulseStart;
      const style = (<HTMLElement>elem).style;
      style.transition = 'all 0ms';
      style.opacity =    '0';
      if (settings.text !== null)
         elem.textContent = settings.text;
      const animate = () => {
         style.transition = `all ${settings.durationIn}ms`;
         style.opacity =    '1';
         };
      const isLastPulse = () => dna.dom.state(elem).dnaPulseStart === pulseStart;
      const fadeAway = () => {
         style.transition = `all ${settings.durationOut}ms`;
         if (isLastPulse())
            style.opacity = '0';
         };
      globalThis.requestAnimationFrame(animate);
      if (!settings.noFadeOut)
         globalThis.setTimeout(fadeAway, settings.durationIn + settings.duration);
      const cleanup = () => {
         if (isLastPulse())
            style.removeProperty('transition');
         return elem;
         };
      const total = settings.noFadeOut ? settings.durationIn :
         settings.durationIn + settings.duration + settings.durationOut;
      return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), total + 100));
      },
   focus(elem: Element): Element {
      // Sets focus on an element.
      // <input data-on-load=dna.ui.focus>
      (<HTMLInputElement>elem)?.focus();
      return elem;
      },
   setText(elem: Element | null, text: string): Element | null {
      if (elem)
         elem.textContent = text;
      return elem;
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
      const top =        tagValue ?? dna.events.db.context[tag] ?? getTop();
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
   isObj(value: unknown): boolean {
      return !!value && typeof value === 'object' && !Array.isArray(value);
      },
   timestamp(date?: number): string {
      // Example: "2030-05-04+08:00:00"
      return dna.format.getDateFormatter('timestamp')(date ?? Date.now());
      },
   timestampMsec(date?: number): string {
      // Example: "2030-05-04+08:00:00.000"
      return dna.format.getDateFormatter('timestamp-msec')(date ?? Date.now());
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
      const timestamp =     (date: Date) => date.toISOString().replace('T', '+').slice(0, -5);
      const timestampMsec = (date: Date) => date.toISOString().replace('T', '+').slice(0, -1);
      const timeZone =      (date: Date) => date.toLocaleString([], { timeZoneName: 'short' }).split(' ').pop();
      const timeZoneLong =  (date: Date) => date.toLocaleString([], { year: 'numeric', timeZoneName: 'long' }).split(' ').slice(1).join(' ');
      const space =         (date: string) => date.replace(/\s/g, ' ');
      const general = {  //format parts of the general timestamp, ex: "2030-05-04 1:00am Sat"
         date:  (d: Date) => `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`,
         time:  (d: Date) => d.toLocaleString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s/, '').toLowerCase(),
         day:   (d: Date) => d.toLocaleString([], { weekday: 'short' }),
         stamp: (d: Date) => `${general.date(d)} ${general.time(d)} ${general.day(d)}`,
         long:  (d: Date) => `${general.stamp(d)} (${timeZone(d)})`,
         };
      const dateFormatters = <{ [format: string]: DnaFormatter }>{                      //ex: 1904112000000 (msec)
         date:          (msec: DnaMsec) => new Date(msec).toDateString(),               //ex: "Sat May 04 2030"
         general:       (msec: DnaMsec) => general.stamp(new Date(msec)),               //ex: "2030-05-04 1:00am Sat"
         generalDate:   (msec: DnaMsec) => general.date(new Date(msec)),                //ex: "2030-05-04"
         generalDay:    (msec: DnaMsec) => general.day(new Date(msec)),                 //ex: "Sat"
         generalLong:   (msec: DnaMsec) => general.long(new Date(msec)),                //ex: "2030-05-04 1:00am Sat (PDT)"
         generalTime:   (msec: DnaMsec) => general.time(new Date(msec)),                //ex: "1:00am"
         iso:           (msec: DnaMsec) => new Date(msec).toISOString(),                //ex: "2030-05-04T08:00:00.000Z"
         locale:        (msec: DnaMsec) => space(new Date(msec).toLocaleString()),      //ex: "5/4/2030, 1:00:00 AM"
         localeDate:    (msec: DnaMsec) => new Date(msec).toLocaleDateString(),         //ex: "5/4/2030"
         localeTime:    (msec: DnaMsec) => space(new Date(msec).toLocaleTimeString()),  //ex: "1:00:00 AM"
         string:        (msec: DnaMsec) => new Date(msec).toString(),                   //ex: "Sat May 04 2030 01:00:00 GMT-0700 (PDT)"
         time:          (msec: DnaMsec) => new Date(msec).toTimeString(),               //ex: "01:00:00 GMT-0700 (PDT)"
         timestamp:     (msec: DnaMsec) => timestamp(new Date(msec)),                   //ex: "2030-05-04+08:00:00"
         timestampMsec: (msec: DnaMsec) => timestampMsec(new Date(msec)),               //ex: "2030-05-04+08:00:00.000"
         timeZone:      (msec: DnaMsec) => timeZone(new Date(msec)),                    //ex: "PDT"
         timeZoneLong:  (msec: DnaMsec) => timeZoneLong(new Date(msec)),                //ex: "Pacific Daylight Time"
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
   //    <nav class=dna-menu data-menu-nav={NAME} data-callback={CALLBACK}>  <-- menu         [role=tablist]  -->
   //       <button>See X1</button>                                          <-- menu item #1 [role=tab]      -->
   //       <button>See X2</button>                                          <-- menu item #2 [role=tab]      -->
   //    </nav>
   //    <div class=dna-panels data-menu-nav={NAME}>                         <-- panels                       -->
   //       <section data-hash=x1>The X1</section>                           <-- panel #1     [role=tabpanel] -->
   //       <section data-hash=x2>The X2</section>                           <-- panel #2     [role=tabpanel] -->
   //    </div>
   // Note 1:
   // The optional "data-hash" attribute on the .dna-menu element specifies the hash (URL
   // fragment ID) and updates the location bar.
   // Note 2:
   // The "data-menu-nav" attributes can be omitted if the ".dna-panels" element immediately
   // follows the ".dna-menu" element.
   display(menu: Element, location?: number, updateUrl?: boolean): Element {
      // Shows the panel at the given location (index).
      const menuData =    (<HTMLElement>menu).dataset;
      const menuNavName = menuData.menuNav!;
      const callback =    menuData.callback;
      const panels =      <HTMLElement>dna.dom.state(menu).dnaPanels;
      const menuItems =   menu.querySelectorAll('.dna-menu-item');
      const savedIndex =  Number(dna.pageToken.get(menuNavName, 0));
      const bound =       (loc: number) => Math.max(0, Math.min(loc, menuItems.length - 1));
      const index =       bound(location === undefined ? savedIndex : location);
      const update = () => {
         if (menu.nodeName === 'SELECT')  //check if elem is a drop-down control
            (<HTMLSelectElement>menu).selectedIndex = index;
         menuItems.forEach(elem => dna.dom.replaceClass(elem, dna.name.selected, dna.name.unselected));
         dna.dom.replaceClass(menuItems[index]!, dna.name.unselected, dna.name.selected);
         const hidePanel = (panel: Element) => {
            // dna.ui.hide(panel);
            (<HTMLElement>panel).style.display = 'none';
            panel.classList.remove(dna.name.displayed);
            panel.classList.add(dna.name.hidden);
            };
         dna.dom.forEach(panels.children, hidePanel);
         const panel = panels.children[index]!;
         panel.classList.replace(dna.name.hidden, dna.name.displayed);
         dna.ui.fadeIn(panel);
         const hash = (<HTMLElement>panel).dataset.hash;  //example: <nav class=dna-menu data-hash=about-page ...
         dna.pageToken.put(menuNavName, index);
         if (updateUrl && hash)
            globalThis.history.pushState(null, '', '#' + hash);
         if (callback)
            dna.util.apply(callback, [panel, hash]);
         return panel;
         };
      const heightTransition =  100;
      const startHieght =       panels.clientHeight
      const panel =             update();
      const endHieght =         panels.clientHeight
      panels.style.transition = 'all 0ms';
      panels.style.height =     String(startHieght) + 'px';
      const animate = () => {
         panels.style.transition = `all ${heightTransition}ms`;
         panels.style.height =     String(endHieght) + 'px';
         };
      globalThis.requestAnimationFrame(animate);
      globalThis.setTimeout(() => panels.style.removeProperty('height'), heightTransition + 100);
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
   nextMenuNav: 1,
   initialize(panels: Element | null): Element | null {
      const generateNavName = (): string => {
         // Automatically generates a name for unnamed menus.
         const menuNavName = 'dna-panels-' + String(dna.panels.nextMenuNav++);
         const setNavName =  (elem: Element) => (<HTMLElement>elem).dataset.menuNav = menuNavName;
         const menu =        panels!.previousElementSibling!;
         dna.core.assert(menu?.classList.contains('dna-menu'), 'Menu not found for panels', panels);
         setNavName(menu);
         setNavName(panels!);
         return menuNavName;
         };
      const init = () => {
         const menuNavName =  (<HTMLElement>panels!).dataset.menuNav || generateNavName();
         const menuSelector = '.dna-menu[data-menu-nav=' + menuNavName + ']';
         const menu =         globalThis.document.querySelector(menuSelector);
         const hash =         globalThis.location.hash.replace(/[^\w-]/g, '');  //remove leading "#"
         const hashIndex =    (): number => dna.dom.findIndex(panels!.children, '[data-hash=' + hash + ']');
         const savedIndex =   (): number => <number>dna.pageToken.get(menuNavName, 0);
         const first =        <HTMLElement>panels!.children[0]!;
         const loc =          hash && first.dataset.hash ? hashIndex() : savedIndex();
         dna.dom.addClass(panels!.children, dna.name.panel);
         panels!.classList.add(dna.name.panelsInitialized);
         dna.core.assert(menu, 'Menu not found for panels', menuNavName);
         menu!.classList.add(dna.name.panelsInitialized);
         dna.dom.state(menu!).dnaPanels = panels;
         if (!menu!.getElementsByClassName(dna.name.menuItem).length)  //set .dna-menu-item elems if not set in the html
            dna.dom.addClass(menu!.children, dna.name.menuItem);
         dna.panels.display(menu!, loc);
         };
      const isInitialized = !panels || panels.classList.contains(dna.name.panelsInitialized);
      if (!isInitialized && !dna.dom.hasClass(panels.children, dna.name.template))
         init();
      return panels;
      },
   setup() {
      const panels = globalThis.document.querySelectorAll(dna.selector.panels)
      panels.forEach(dna.panels.initialize);
      dna.dom.onClick(dna.panels.clickRotate, '.dna-menu .dna-menu-item');
      dna.dom.onChange(dna.panels.selectRotate, 'select.dna-menu');
      return panels;
      },
   };

const dnaCompile = {
   // Pre-compile  Example                           Post-compile class   + new rule
   // -----------  --------------------------------  -------------------------------
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
   // Pre-compile data attribute                     Post-compile new rule
   // ---------------------------------------------  ---------------------
   // data-class=~~field[name-true,name-false]~~     class=[['field','name-true','name-false']]
   // data-attr-{NAME}=pre~~field~~post              attrs=['{NAME}', ['pre', 'field', 'post']]
   // data-prop-{NAME}=pre~~field~~post              props=['{NAME}', 'field']
   // data-option=~~field~~                          option='field'
   // data-require=~~field~~                         require='field'
   // data-missing=~~field~~                         missing='field'
   // data-true=~~field~~                            true='field'
   // data-false=~~field~~                           false='field'
   // data-format=fn                                 formatter=fn()
   // data-transform=fn                              transform='fn'
   // data-callback=fn                               callback='fn'
   //
   getRules(elem: Element): DnaRules {
      const state = dna.dom.state(elem);
      if (!state.dnaRules)
         state.dnaRules = {};
      return <DnaRules>state.dnaRules;
      },
   setRule(rules: DnaRules, key: DnaRulesKey, value: DnaRulesValue): DnaRules {
      // Usage:
      //    const rules = <DnaRules>dna.dom.state(elem).dnaRules;
      //    dna.compile.setRule(rules, 'transform', 'app.cart.addTax');
      (<DnaRulesValue>rules[key]) = value;
      return rules;
      },
   setElemRule(elem: Element, key: DnaRulesKey, value: DnaRulesValue): Element {
      // Usage:
      //    const rules = <DnaRules>dna.dom.state(elem).dnaRules;
      //    dna.compile.setRule(rules, 'transform', 'app.cart.addTax');
      (<DnaRulesValue>dna.compile.getRules(elem)[key]) = value;
      return elem;
      },
   regex: {
      dnaField:     /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,  //example: ~~title~~
      dnaBasePair:  /~~|{{|}}/,  //matches the '~~' string
      dnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two '~~' strings so they can be removed
      },
   setupNucleotide(elem: Element): Element {
      dna.compile.getRules(elem);  //initializes rules
      elem.classList.add(dna.name.nucleotide);
      return elem;
      },
   isDnaField(node: Element): boolean {
      // <span>~~title~~<span>  ==> true
      const value = node.firstChild?.nodeValue;  //example: "~~title~~"
      return !!value && dna.compile.regex.dnaField.test(<string>value);
      },
   addFieldClass(elem: Element): Element {
      const field =    <DnaFieldName>dna.dom.state(elem).dnaField;
      const htmlCase = () => dna.util.toKebab(field).replace(/[[\]]/g, '').replace(/[.]/g, '-');
      if (field)
         elem.classList.add('dna-field-' + htmlCase());
      return elem;
      },
   field(elem: Element): Element {
      // Examples:
      //    <p>~~name~~</p>  ==>
      //       <p class=dna-nucleotide></p>  <!-- state: dnaField=name, rules: { text: true } -->
      //    <textarea>~~address~~</textarea>  ==>
      //       <textarea class=dna-nucleotide></p>  <!-- state: dnaField=address, rules: { val: true } -->
      dna.compile.setupNucleotide(elem);
      const field = <DnaFieldName>elem.textContent!.replace(dna.compile.regex.dnaBasePairs, '').trim();
      dna.dom.state(elem).dnaField = field;
      dna.compile.addFieldClass(elem);
      const rules = dna.compile.getRules(elem);
      const setupTextarea = () => {
         elem.classList.add(dna.name.updateModel);
         rules.val = true;
         };
      if (elem.matches('textarea'))
         setupTextarea();
      else
         rules.text = true;
      while (elem.firstChild)
         elem.removeChild(elem.firstChild);
      elem.classList.add(dna.name.field);
      return elem;
      },
   propsAndAttrs(elem: Element): Element {
      // Examples:
      //    <p id=~~num~~>                  ==>  <p class=dna-nucleotide>  <!-- rules: { attrs: ['id', ['', 'num', '']] } -->
      //    <p data-attr-src=~~url~~>       ==>  <p class=dna-nucleotide>  <!-- rules: { attrs: ['src', ['', 'url', '']] } -->
      //    <p data-tag=~~[index]~~>        ==>  <p class=dna-nucleotide>  <!-- rules: { attrs: ['data-tag', ['', 0, '']] } -->
      //    <p data-tag=~~[count]~~>        ==>  <p class=dna-nucleotide>  <!-- rules: { attrs: ['data-tag', ['', 1, '']] } -->
      //    <p data-tag=~~[value]~~>        ==>  <p class=dna-nucleotide>  <!-- rules: { attrs: ['data-tag', ['', 2, '']] } -->
      //    <input type=checkbox data-prop-checked=~~set~~>
      //                                    ==>  <option class=dna-nucleotide>  <!-- rules: { props: ['selected', 'set'] } -->
      //    <select data-option=~~color~~>  ==>  <select class=dna-nucleotide>  <!-- state: dnaField=color, rules: { val: true } -->
      const data =  (<HTMLElement>elem).dataset;
      const rules = dna.compile.getRules(elem);
      const props: DnaProps = [];
      const attrs: DnaAttrs = [];
      const names: string[] = [];
      const compileProp = (key: string, value: string) => {
         names.push(key);
         key =   key.replace(/^data-prop-/, '').toLowerCase();
         value = value.replace(dna.compile.regex.dnaBasePairs, '');
         props.push(key, value);
         const setupInput = () => {
            elem.classList.add(dna.name.updateModel);
            dna.dom.state(elem).dnaField = value;
            };
         if (key === 'checked' && elem.matches('input'))
            setupInput();
         };
      const compileAttr = (key: string, value: string) => {
         const parts = <DnaAttrParts>value.split(dna.compile.regex.dnaBasePair);
         const raw = ['[index]', '[count]', '[value]'].indexOf(<string>parts[1]);
         if (raw !== -1)
            parts[1] = <DnaAttrParts[1]>raw;
         attrs.push(key.replace(/^data-attr-/, ''), parts);
         names.push(key);
         const makeUpdatable = () => {
            dna.compile.setupNucleotide(elem).classList.add(dna.name.updateModel);
            dna.dom.state(elem).dnaField = parts[1];
            rules.val = true;
            };
         const hasTextVal = elem.matches('input:not([type=checkbox]):not([type=radio])') &&
            key === 'value' && parts[0] === '' && parts[2] === '';
         if (hasTextVal || elem.matches('select') && key === 'data-option')
            makeUpdatable();
         };
      const compile = (attr: Attr) => {
         if (/^data-prop-/.test(attr.name))
            compileProp(attr.name, attr.value);
         else if (attr.value.split(dna.compile.regex.dnaBasePair).length === 3)
            compileAttr(attr.name, attr.value);
         };
      dna.dom.getAttrs(elem).forEach(compile);
      const getRules = (): DnaRules => dna.compile.getRules(dna.compile.setupNucleotide(elem));
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
      dna.compile.addFieldClass(elem);
      names.forEach(name => elem.removeAttribute(name));
      return elem;
      },
   getDataField(elem: Element, type: DnaRulesKey): string {
      // Example:
      //    <p data-array=~~tags~~>, 'array'  ==>  'tags'
      return (<HTMLElement>elem).dataset[type]!.replace(dna.compile.regex.dnaBasePairs, '').trim();
      },
   subTemplateName(holder: Element | string, arrayField: string, index: number): string {
      // Holder can be element or template name.
      // Example:
      //    subTemplateName('book', 'authors') ==> 'book-authors--2'
      const getRules = () => dna.compile.getRules(dna.getClone(<Element>holder, { main: true }));
      const templateName = typeof holder === 'string' ? holder : getRules().template;
      return templateName + '-' + arrayField + '--' + String(index);
      },
   rules(elem: Element, type: DnaRulesKey, isLists = false, className?: string, init?: (elem: Element) => void): Element {
      // Examples:
      //    <p data-require=~~title~~>,          'require'  ==>  rule: { require: 'title' }
      //    <i data-class=~~onSale[red,blue]~~>, 'class'    ==>  rule: { class:   [['onSale','red','blue']] }
      const addRule = (subElem: Element) => {
         dna.compile.setupNucleotide(subElem);
         const field = dna.compile.getDataField(subElem, type);
         const makeLists = () =>
            <DnaClassRule[]>field.split(';').map(list => list.replace(']', '').split(/[[,]/));
         dna.compile.setElemRule(subElem, type, isLists ? makeLists() : field);
         if (className)
            subElem.classList.add(className);
         if (init)
            init(subElem);
         subElem.removeAttribute('data-' + type);
         };
      const selector = '[data-' + type + ']';
      if (elem.matches(selector))
         addRule(elem);
      elem.querySelectorAll(selector).forEach(addRule);
      return elem;
      },
   separators(elem: Element): Element {
      // Convert: data-separator=", "  ==>  <span class=dna-separator>, </span>
      const isWhitespaceNode = (node: Node): boolean =>
         node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue!);
      const append = (elem: Element, text: string, className: string) => {
         const lastChildNode = elem.childNodes[elem.childNodes.length - 1];
         if (lastChildNode && isWhitespaceNode(lastChildNode))
            lastChildNode.remove();
         elem.appendChild(dna.dom.create('span', { class: className, html: text }));
         };
      const processTemplate = (elem: Element) => {
         const data = (<HTMLElement>elem).dataset;
         if (data.separator)
            append(elem, data.separator, dna.name.separator);
         if (data.lastSeparator)
            append(elem, data.lastSeparator, dna.name.lastSeparator);
         };
      const selector = '.dna-template, .dna-sub-clone';
      processTemplate(elem);
      elem.querySelectorAll(selector).forEach(processTemplate);
      return elem;
      },
   template(name: string): DnaTemplate {  //prepare and stash template so it can be cloned
      const elem = globalThis.document.getElementById(name)!;
      dna.core.assert(elem, 'Template not found', name);
      const initSubs = (elem: Element) => dna.compile.setElemRule(elem, 'subs', []);
      const saveName = (elem: Element) => {
         dna.dom.state(elem).dnaRules = <DnaRules>{ template: elem.id, subs: [] };
         elem.removeAttribute('id');
         initSubs(elem);
         return elem;
         };
      saveName(elem);
      dna.dom.forEach(elem.getElementsByClassName(dna.name.template), saveName);
      const subElems = elem.querySelectorAll('*');
      const fieldElems = dna.dom.filter(subElems, dna.compile.isDnaField);
      if (dna.compile.isDnaField(elem))
         dna.compile.field(elem);
      fieldElems.forEach(dna.compile.field);
      dna.compile.rules(elem, 'array', false, dna.name.subClone, initSubs);
      dna.compile.rules(elem, 'class', true);
      dna.compile.rules(elem, 'require');
      dna.compile.rules(elem, 'missing');
      dna.compile.rules(elem, 'true');
      dna.compile.rules(elem, 'false');
      dna.compile.propsAndAttrs(elem);
      subElems.forEach(dna.compile.propsAndAttrs);
      dna.compile.separators(elem);
      //support html5 values for "type" attribute
      const setTypeAttr = (inputElem: Element) =>  //example: <input data-attr-type=date value=~~dueDate~~>
         inputElem.setAttribute('type', (<HTMLElement>inputElem).dataset.attrType!);
      globalThis.document.querySelectorAll('input[data-attr-type]').forEach(setTypeAttr);
      return dna.template.stash(elem);
      },
   };

const dnaTemplate = {
   // Handles storage and retrieval of templates.
   db: <DnaTemplateDB>{},
   stash(elem: Element): DnaTemplate {
      const name = dna.compile.getRules(elem).template!;
      const move = (subElem: Element) => {
         const name =           dna.compile.getRules(subElem).template!;
         const container =      subElem.parentElement!;
         const containerState = dna.dom.state(container);
         const wrapped =        container.children.length === 1 && !container.classList.contains(dna.name.container);
         const compileSiblings = () => {
            containerState.dnaContents = true;
            const templateName = (sibling: Element): string | false => {
               const compileToName = (id?: string) => id ? dna.compile.template(id).name : name!;
               const classes = sibling.classList;
               return classes.contains(dna.name.template) ? compileToName(sibling.id) :
                  classes.contains(dna.name.subClone) ?     dna.compile.getRules(sibling).template! :
                  false;
               };
            containerState.dnaContents = dna.dom.map(container.children, templateName);
            };
         if (!wrapped && !containerState.dnaContents)
            compileSiblings();
         container.classList.add(dna.name.container, 'dna-contains-' + name);
         const template = <DnaTemplate>{
            name:       name,
            elem:       subElem,
            container:  container,
            nested:     container.closest(dna.selector.clone) !== null,
            separators: subElem.querySelectorAll('.dna-separator, .dna-last-separator').length,
            wrapped:    wrapped,
            };
         dna.template.db[name] = template;
         subElem.classList.remove(dna.name.template);
         subElem.classList.add(dna.name.clone, name);
         subElem.remove();
         };
      const prepLoop = (subElem: Element) => {
         // Pre (sub-template array loops -- data-array):
         //    class=dna-sub-clone rules={ array: 'field' }
         // Post (elem):
         //    rules={ template: '{NAME}-{FIELD}--{INDEX}' }
         // Post (container)
         //    class=dna-nucleotide + rules={ loop: { name: '{NAME}-{FIELD}--{INDEX}', field: 'field' } }
         const rules =          dna.compile.getRules(subElem);
         const parent =         dna.compile.setupNucleotide(subElem.parentElement!);
         const parentRules =    dna.compile.getRules(parent);
         const containerRules = dna.compile.getRules(parent.closest('.dna-clone, .dna-sub-clone')!);
         const index =          containerRules.subs!.length;
         parent.classList.add(dna.name.array);
         rules.template =       dna.compile.subTemplateName(name, rules.array!, index);
         parentRules.loop = { name: rules.template, field: rules.array! };
         containerRules.subs!.push(rules.array!);
         };
      move(elem);
      elem.querySelectorAll(dna.selector.template).forEach(move);
      const subClones = elem.querySelectorAll(dna.selector.subClone)
      subClones.forEach(prepLoop);
      subClones.forEach(move);
      return dna.template.db[name]!;
      },
   get(name: string): DnaTemplate {
      return dna.template.db[name] || dna.compile.template(name);
      },
   };

const dnaEvents = {
   db: {
      context: <DnaContext>{},  //storage to register callbacks when dna-engine is module loaded without window scope (webpack)
      initializers: <DnaInitializer[]>[],  //example: [{ func: 'app.bar.setup', selector: '.progress-bar' }]
      },
   runOnLoads(options?: DnaOptionsRunOnLoads): NodeListOf<Element> {
      // Executes each of the data-on-load functions once the function and its dependencies have loaded.
      // Example:
      //    <p data-on-load=app.cart.setup data-wait-for=Chart,R,fetchJson>
      const defaults: Required<DnaOptionsRunOnLoads> = { pollInterval: 300 };
      const settings = { ...defaults, ...options };
      const elems =    globalThis.document.querySelectorAll(`[data-on-load]:not(.${dna.name.onLoad})`);
      elems.forEach(elem => elem.classList.add(dna.name.onLoad))
      const addStart = (elem: Element) =>
         dna.dom.state(elem).dnaOnLoad = <DnaOnLoad>{ start: Date.now(), checks: 0 };
      elems.forEach(addStart);
      const runOnLoad = (elem: Element) => {
         const data =     (<HTMLElement>elem).dataset;
         const fnName =   data.onLoad!;
         const fn =       dna.util.getFn(fnName);
         const onLoad =   <DnaOnLoad>dna.dom.state(elem).dnaOnLoad;
         const waitFor =  data.waitFor?.split(',') ?? [];
         onLoad.waiting = Date.now() - onLoad.start;
         onLoad.checks++;
         dna.core.assert(typeof fn === 'function' || !fn, 'Invalid data-on-load function', fnName);
         const run = () => {
            elem.classList.add(dna.name.executed);
            dna.util.apply(fnName, [elem, dna.ui.getComponent(elem)]);
            };
         if (fn && !waitFor.map(dna.util.getFn).includes(undefined))
            run();
         else
            globalThis.setTimeout(() => runOnLoad(elem), settings.pollInterval);
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
      dna.events.db.initializers.forEach(init);
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
            dna.util.assign(<DnaDataObject>dna.getModel(elem),
               <DnaFieldName>dna.dom.state(elem).dnaField, <Json>calc(elem));
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
            else if (dna.compile.getRules(target).val)
               updateField(target, <DnaCallback>getValue);
            dna.refresh(mainClone);
            };
         if (target.classList.contains(dna.name.updateModel))
            updateModel();
         return runner(target, 'on-' + event.type.replace('key', 'key-'), event);
         };
      const handleSmartUpdate = (elem: Element, event: Event) => {
         // <input data-on-smart-update=saveNote data-smart-throttle=2000 value=~~note~~>
         const throttleDefault = 1000;  //default 1 second delay between callbacks
         const throttleSetting = (<HTMLElement>elem).dataset.smartThrottle;
         const throttle =        throttleSetting ? Number(throttleSetting) : throttleDefault;
         const state =            dna.dom.state(elem);
         const value =           () => (<HTMLInputElement>elem).value;
         const doCallback = () => {
            state.dnaLastUpdated = Date.now();
            state.dnaLastValue =   value();
            state.dnaTimeoutID =   null;
            runner(elem, 'on-smart-update', event);
            };
         const handleChange = () => {
            if (Date.now() < <number>state.dnaLastUpdated + throttle)
               state.dnaTimeoutID = globalThis.setTimeout(doCallback, throttle);
            else
               doCallback();
            };
         const checkForValueChange = () => {
            if (value() !== state.dnaLastValue && !state.dnaTimeoutID)
               handleChange();
            };
         if (event.type === 'keydown' && state.dnaLastValue === undefined)
            state.dnaLastValue = value();
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
      dna.dom.onClick(handleEvent);
      dna.dom.onChange(handleEvent);
      dna.dom.onKeyDown(handleEvent);
      dna.dom.onKeyUp(handleEvent);
      dna.dom.onInput(handleEvent);
      dna.dom.onEnterKey((elem, event) => runner(elem, 'on-enter-key', event), '[data-on-enter-key]');
      dna.dom.onFocusIn((elem, event) =>  runner(elem, 'on-focus-in',  event), '[data-on-focus-in]');
      dna.dom.onFocusOut((elem, event) => runner(elem, 'on-focus-out', event), '[data-on-focus-out]');
      dna.dom.onHoverIn((elem, event) =>  runner(elem, 'on-hover-in',  event), '[data-on-hover-in]');
      dna.dom.onHoverOut((elem, event) => runner(elem, 'on-hover-out', event), '[data-on-hover-out]');
      dna.dom.onKeyDown(handleSmartUpdate, '[data-on-smart-update]');
      dna.dom.onKeyUp(handleSmartUpdate,   '[data-on-smart-update]');
      dna.dom.onChange(handleSmartUpdate,  '[data-on-smart-update]');
      dna.dom.onClick(jumpToUrl, '[data-href]');
      return dna.events.runOnLoads();
      },
   };

const dnaCore = {
   inject<T>(clone: Element, data: T, count: number, settings: DnaOptionsClone<T>): Element {
      // Inserts data into a clone and executes its rules.
      const index = count - 1;
      const injectField = (elem: Element, field: string, rules: DnaRules) => {  //example: <h2>~~title~~</h2>
         const value = field === '[value]' ? data :
            field === '[index]' ? index :
            field === '[count]' ? index + 1 :
            dna.util.value(data, field);
         const formatted = () => rules.formatter ?
            rules.formatter(<DnaFormatterValue>value, data) : String(value);
         const injectable = ['string', 'number', 'boolean'].includes(typeof value);
         if (injectable && settings.html)
            elem.innerHTML = formatted();
         else if (injectable)
            elem.textContent = formatted();  //consider switching to .innerText when supported by jsdom
         };
      const injectValue = (elem: Element, field: string) => {
         const value = field === '[value]' ? data :
            field === '[index]' ? index :
            field === '[count]' ? index + 1 :
            dna.util.value(data, field);
         if (value !== null && value !== (<HTMLInputElement>elem).value)
            (<HTMLInputElement>elem).value = String(value);
         };
      const setProperty = (elem: HTMLInputElement, property: string, state: boolean): HTMLInputElement => {
         dna.core.assert(['checked', 'disabled'].includes(property), 'Invalid element property type', property);
         if (property === 'checked')
            elem.checked = state;
         else
            elem.disabled = state;
         return elem;
         };
      const injectProps = (elem: Element, props: DnaProps) => {  //example props: ['selected', 'set'] from <input type=checkbox data-prop-checked=~~set~~>
         for (let prop = 0; prop*2 < props.length; prop++)  //each prop has a key and a field name
            setProperty(<HTMLInputElement>elem, props[prop*2]!,
               dna.util.realTruth(dna.util.value(data, props[prop*2 + 1]!)));
         };
      const injectAttrs = (elem: Element, rules: DnaRules) => {
         const attrs = rules.attrs!;  //example attrs: ['data-tag', ['', 'tag', '']]
         const inject = (key: DnaAttrName, parts: DnaAttrParts) => {  //example parts: 'J~~code.num~~' ==> ['J', 'code.num', '']
            const field =     parts[1];
            const core =      field === 0 ? index : field === 1 ? index + 1 : field === 2 ? data : dna.util.value(data, field);
            const value =     [parts[0], core, parts[2]].join('');
            const formatted = rules.formatter ?
               rules.formatter(<DnaFormatterValue>value, data) : value;
            elem.setAttribute(key, formatted);
            if (key === 'value' && value !== (<HTMLInputElement>elem).value)  //set elem val for input fields, example: <input value=~~tag~~>
               (<HTMLInputElement>elem).value = value;
            };
         for (let i = 0; i*2 < attrs.length; i++)  //each attr has a key and parts
            inject(<DnaAttrName>attrs[i*2], <DnaAttrParts>attrs[i*2 + 1]);
         };
      const injectClass = (elem: Element, classLists: string[][]) => {
         // classLists = [['field', 'class-true', 'class-false'], ...]
         const process = (classList: string[]) => {
            const value = dna.util.value(data, <string>classList[0]);
            const truth = dna.util.realTruth(value);
            const setBooleanClasses = () => {
               dna.dom.toggleClass(elem, classList[1]!, truth);
               if (classList[2])
                  dna.dom.toggleClass(elem, classList[2], !truth);
               };
            if (classList.length === 1)
               elem.classList.add(String(value));
            else if (classList.length > 1)
               setBooleanClasses();
            };
         classLists.forEach(process);
         };
      const fieldExists = (fieldName: string): boolean => {
         const value = dna.util.value(data, fieldName);
         return value !== undefined && value !== null;
         };
      const processLoop = (elem: Element, loop: DnaLoop) => {
         const dataArray = <T[]>dna.util.value(data, loop.field);
         const subClones = dna.dom.filterByClass(elem.children, loop.name);
         const injectSubClone = (subElem: Element, index: number) => {
            if (!subElem.matches('option'))  //prevent select from closing on chrome
               dna.core.inject(subElem, dataArray[index]!, index + 1, settings);
            };
         const rebuildSubClones = () => {
            subClones.forEach(subClone => subClone.remove());
            dna.clone(loop.name, dataArray, { container: elem, html: !!settings.html });
            };
         if (!dataArray)
            (data[<keyof typeof data>loop.field]) = <T[keyof T]><unknown>[];
         else if (dataArray.length === subClones.length)
            subClones.forEach(injectSubClone);
         else
            rebuildSubClones();
         };
      const process = (elem: Element) => {
         const rules = dna.compile.getRules(elem);
         if (rules.transform)  //alternate version of the "transform" option
            dna.util.apply(rules.transform, [data]);
         if (rules.loop)
            processLoop(elem, rules.loop);
         if (rules.text)
            injectField(elem, <DnaFieldName>dna.dom.state(elem).dnaField, rules);
         if (rules.val)
            injectValue(elem, <DnaFieldName>dna.dom.state(elem).dnaField);
         if (rules.props)
            injectProps(elem, rules.props);
         if (rules.attrs)
            injectAttrs(elem, rules);
         if (rules.class)
            injectClass(elem, rules.class);
         if (rules.require)
            dna.ui.toggle(elem, fieldExists(rules.require));
         if (rules.missing)
            dna.ui.toggle(elem, !fieldExists(rules.missing));
         if (rules.true)
            dna.ui.toggle(elem, dna.util.realTruth(dna.util.value(data, rules.true)));
         if (rules.false)
            dna.ui.toggle(elem, !dna.util.realTruth(dna.util.value(data, rules.false)));
         if (rules.callback)  //example: <span data-callback=blink>~~title~~<span>
            dna.util.apply(rules.callback, [elem]);
         };
      if (settings.transform)  //alternate version of data-transform
         settings.transform(data);
      const notSubClone = (elem: Element) => !elem.classList.contains(dna.name.subClone);
      const dig = (elem: Element) => {
         if (elem.classList.contains(dna.name.nucleotide))
            process(elem);
         dna.dom.filter(elem.children, notSubClone).forEach(dig);
         };
      dig(clone);
      dna.dom.state(clone).dnaModel = data;
      dna.dom.state(clone).dnaCount = index + 1;
      return clone;
      },
   replicate<T>(template: DnaTemplate, data: T, options: DnaOptionsClone<T>): Element {
      // Creates and sets up a clone.
      const settings = options;
      const subclass = () => 'dna-contains-' + template.name;
      const getContainer = (name: string) => settings.container!.classList.contains(name) ?
         settings.container! : settings.container!.getElementsByClassName(name).item(0)!;
      const container =      settings.container ? getContainer(subclass()) : template.container;
      const containerState = dna.dom.state(container);
      const clone =          dna.dom.cloneState(<Element>template.elem.cloneNode(true));
      const name =           dna.compile.getRules(clone).template!;
      if (!containerState.dnaCountsMap)
         containerState.dnaCountsMap = <DnaCountsMap>{};
      const countsMap = <DnaCountsMap>containerState.dnaCountsMap;
      countsMap[name] = !countsMap[name] ? 1 : countsMap[name]! + 1;
      dna.core.inject(clone, data, countsMap[name]!, settings);
      const intoUnwrapped = () => {
         const allClones =  dna.dom.filterByClass(container.children, dna.name.clone);
         const firstClone = () => {
            const contents = <string[]>containerState.dnaContents;  //todo: cleanup declaration
            const index =    contents.indexOf(template.name);
            const adjustment = (clonesAbove: number, name: string) =>
               clonesAbove + (name && contents.indexOf(name) < index ?
                  allClones.filter(clone => clone.classList.contains(name)).length - 1 : 0);
            const target = container.children[index + contents.reduce(adjustment, 0)];
            return target ? container.insertBefore(clone, target) : container.appendChild(clone);
            };
         const sameClones = allClones.filter(clone => clone.classList.contains(template.name));
         if (!sameClones.length)
            firstClone();
         else if (settings.top)
            container.insertBefore(clone, sameClones.at(0)!);
         else
            container.insertBefore(clone, sameClones.at(-1)!.nextSibling);
         };
      if (!template.wrapped)
         intoUnwrapped();
      else if (settings.top)
         container.prepend(clone);
      else
         container.append(clone);
      const displaySeparators = () => {
         // <span class=dna-clone data-separator=", " data-last-separator=" and ">
         //    <span>Apple</span>
         //    <span class=dna-separator>, </span>
         //    <span class=dna-last-separator> and </span>
         // </span>
         const clones = dna.dom.filterByClass(container.children, template.name);
         const process = (clone: Element, index: number) => {
            const separator =     (<HTMLElement>clone.getElementsByClassName(dna.name.separator)[0]);
            const lastSeparator = (<HTMLElement>clone.getElementsByClassName(dna.name.lastSeparator)[0]);
            const isAlmostLast =  index === clones.length - 2;
            const isLast =        index === clones.length - 1;
            const display = (elem: HTMLElement, show: boolean) =>
               show ? elem.style.removeProperty('display') : elem.style.display = 'none';
            if (separator)
               display(separator,     !isAlmostLast && !isLast);
            if (lastSeparator)
               display(lastSeparator, isAlmostLast);
            };
         clones.forEach(process);
         };
      if (template.separators)
         displaySeparators();
      dna.events.runInitializers(clone);
      if (settings.callback)
         settings.callback(clone, data);
      if (settings.fade)
         dna.ui.slideFadeIn(clone, { force: true });
      return clone;
      },
   getArrayName(subClone: Element): string | null {
      return subClone.classList.contains(dna.name.subClone) ?
         dna.compile.getRules(subClone).array! : null;
      },
   updateModelArray(container: Element): Element {
      // Sets the array field of the clone's data model to the list of sub-clone data models.
      dna.core.assert(container.classList.contains(dna.name.array), 'Invalid array container', container);
      const array =        dna.compile.getRules(container).loop!;
      const subs =         dna.dom.filterByClass(container.children, array.name);
      const model =        <DnaDataObject>dna.getModel(container);
      model[array.field] = <Json[]>subs.map(node => dna.getModel(node));
      return container;
      },
   remove<T>(clone: Element, callback?: DnaCallbackFn<T> | null): Element {
      const container = clone.parentElement!;
      clone.remove();
      if (clone.classList.contains(dna.name.subClone))
         dna.core.updateModelArray(container);
      dna.placeholder.setup();
      if (callback)
         callback(clone, <T>dna.getModel(clone));
      return clone;
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
   setup(): unknown {
      const setupBrowser = () => {
         dna.placeholder.setup();
         dna.panels.setup();
         dna.events.setup();
         };
      if (globalThis.document)
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
   clone<M extends T | T[], T>(name: string, data: M, options?: DnaOptionsClone<T>) {
      // Generates a copy of the template and populates the fields, attributes, and
      // classes from the supplied data.
      const defaults: Required<DnaOptionsClone<T>> = {
         callback:  null,
         clones:    1,
         container: null,
         empty:     false,
         fade:      false,
         formatter: null,
         holder:    null,
         html:      false,
         top:       false,
         transform: null,
         };
      const settings =   { ...defaults, ...options };
      const template =   dna.template.get(name);
      const makeCopies = options?.clones !== undefined;
      const missing =    template.nested && !settings.container;
      dna.core.assert(!missing, 'Container missing for nested template', name);
      if (settings.empty)
         dna.empty(name);
      const finish = (firstClone: Element) => {
         dna.placeholder.setup();
         dna.panels.initialize(firstClone.closest(dna.selector.panels));
         while (firstClone.closest(dna.selector.hide))
            dna.dom.replaceClass(firstClone.closest(dna.selector.hide)!, dna.name.hide, dna.name.unhide);
         };
      const many = (): Element[] => {
         const models = makeCopies ? <T[]>Array(settings.clones).fill(data) : <T[]>data;
         const clones = models.map(data => dna.core.replicate(template, data, settings));
         if (clones.length)
            finish(clones[0]!);
         return clones;
         };
      const single = (): Element => {
         const clone = dna.core.replicate(template, <T>data, settings);
         finish(clone);
         return clone;
         };
      const result = Array.isArray(data) || makeCopies ? many() : single();
      return <M extends T[] ? HTMLElement[] : HTMLElement>result;
      },
   arrayPush<T>(holderClone: Element, arrayField: string, data: T | T[], options?: DnaOptionsArrayPush): Element {
      // Clones a sub-template to append onto an array loop.
      const cloneSub = (field: string, index: number) => {
         const clone = () => {
            const name =      dna.compile.subTemplateName(holderClone, arrayField, index);
            const className = 'dna-contains-' + name;
            const find =      () => holderClone.getElementsByClassName(className)[0]!;
            const container = holderClone.classList.contains(className) ? holderClone : find();
            dna.clone(name, data, { ...{ container }, ...options });
            dna.core.updateModelArray(container);
            };
         if (field === arrayField)
            clone();
         };
      dna.compile.getRules(holderClone).subs!.forEach(cloneSub);
      return holderClone;
      },
   createTemplate(name: string, html: string, holder: Element): DnaTemplate {
      // Generates a template from an HTML string.
      const elem = dna.dom.create('div', { html }).firstElementChild!;
      elem.id =    name;
      elem.classList.add(dna.name.template);
      holder.appendChild(elem);
      return dna.template.get(name);
      },
   templateExists(name: string): boolean {
      return !!dna.template.db[name] ||
         globalThis.document.querySelector('.dna-template#' + name) !== null;
      },
   getModel<T>(elem: Element, options?: DnaOptionsGetModel): T | undefined {
      // Returns the underlying data of the clone.
      return <T>dna.dom.state(dna.getClone(elem, options)).dnaModel;
      },
   getModels<T>(template: string, options?: DnaOptionsGetModel): T[] {
      // Returns the underlying data of the clones for a given template.
      return dna.getClones(template).map(elem => dna.getModel(elem, options)!);
      },
   empty(name: string, options?: DnaOptionsEmpty): Element[] {
      // Deletes all clones generated from the template.
      const defaults: Required<DnaOptionsEmpty> = { fade: false };
      const settings =  { ...defaults, ...options };
      const template =  dna.template.get(name);
      const clones =    dna.dom.filterByClass(template.container.children, dna.name.clone);
      const countsMap = <DnaCountsMap>dna.dom.state(template.container).dnaCountsMap;
      if (countsMap)
         countsMap[name] = 0;
      if (settings.fade)
         clones.forEach(clone => dna.ui.slideFadeDelete(clone));
      else
         clones.forEach(clone => dna.core.remove(clone));
      return clones;
      },
   insert<T>(name: string, data: T, options?: DnaOptionsClone<T>): Element {
      // Updates the first clone if it already exists otherwise creates the first clone.
      const clones = dna.getClones(name);
      return clones.length ? dna.refresh(clones.at(0)!, { data: data, html: !!options?.html }) :
         <Element>dna.clone(name, data, options);
      },
   refresh(clone: Element, options?: DnaOptionsRefresh): Element {
      // Updates an existing clone to reflect changes to the data model.
      const defaults: Required<DnaOptionsRefresh> = { data: null, html: false, main: false };
      const settings = { ...defaults, ...options };
      const elem =     dna.getClone(clone, options);
      const model =    settings.data ? settings.data : dna.getModel(elem);
      const count =    <number>dna.dom.state(elem).dnaCount;
      return dna.core.inject(elem, model, count, settings);
      },
   refreshAll(name: string, options?: DnaOptionsRefreshAll): Element[] {
      // Updates all the clones of the specified template.
      const clones = dna.getClones(name);
      clones.forEach(clone => dna.refresh(clone, options));
      return clones;
      },
   updateField(inputElem: Element, value: Json): Element {
      const field = dna.dom.state(inputElem).dnaField;
      const update = () => {
         if (inputElem.matches('input[type=checkbox]'))
            (<HTMLInputElement>inputElem).checked = !!value;
         else if (inputElem.matches('input[type=radio]'))
            (<HTMLInputElement>inputElem).checked = !!value;  //TOOD: if true, deselect other buttons in model
         else if (inputElem.matches('input, select, textarea'))
            (<HTMLInputElement>inputElem).value = String(value);
         const model = <DnaDataObject>dna.getModel(inputElem);
         model[<DnaFieldName>field] = value;
         };
      if (field)
         update();
      return inputElem;
      },
   recount(elem: Element, options?: DnaOptionsRecount): Element {
      // Renumbers the counters starting from 1 for the clone and its siblings based on DOM order.
      const clone = dna.getClone(elem);
      const name = dna.compile.getRules(clone).template!;
      const update = (subElem: Element, index: number) => {
         dna.dom.state(subElem).dnaCount = index + 1;
         dna.refresh(subElem, options);
         };
      const container =      clone.parentElement!;
      const containerState = dna.dom.state(container);
      const clones =         dna.dom.filterByClass(container.children, 'dna-clone', name);
      clones.forEach(update);
      containerState.dnaCountsMap = <DnaCountsMap>containerState.dnaCountsMap || <DnaCountsMap>{};
      (<DnaCountsMap>containerState.dnaCountsMap)[name] = clones.length;
      return clone;
      },
   destroy(elem: Element, options?: DnaOptionsDestroy): Promise<Element> {
      // Removes an existing clone from the DOM.
      const defaults: Required<DnaOptionsDestroy> = { main: false, fade: false };
      const settings =   { ...defaults, ...options };
      const clone =      dna.getClone(elem, options);
      const arrayField = dna.core.getArrayName(clone);
      if (arrayField)
         (<Json[]>(<DnaModel>dna.getModel(clone.parentElement!))[<keyof DnaModel>arrayField])
            .splice(dna.getIndex(clone), 1);
      return settings.fade ? dna.ui.slideFadeDelete(clone) :
         new Promise(resolve => resolve(dna.core.remove(clone)));
      },
   isClone(elem: Element): boolean {
      // Returns true if the element is a clone or is inside a clone.
      return !!elem.closest('.dna-clone');
      },
   getClone(elem: Element, options?: DnaOptionsGetClone): Element {
      // Returns the clone (or sub-clone) for the specified element.
      const defaults: Required<DnaOptionsGetClone> = { main: false };
      const settings = { ...defaults, ...options };
      dna.core.assert(dna.dom.isElem(elem), 'Invalid element', elem);
      const clone = elem.closest(settings.main ? '.dna-clone:not(.dna-sub-clone)' : '.dna-clone')!;
      dna.core.assert(clone, 'Cannot find clone', elem);
      return clone;
      },
   getClones(name: string): Element[] {
      // Returns an array of all the existing clones for the given template.
      return dna.dom.filterByClass(dna.template.get(name).container.children, dna.name.clone, name);
      },
   getIndex(elem: Element, options?: DnaOptionsGetIndex): number {
      // Returns the index of the clone.
      const clone =  dna.getClone(elem, options)!;
      const rules =  dna.compile.getRules(clone);
      const clones = dna.dom.filterByClass(clone.parentElement!.children, 'dna-clone', rules.template!);
      return clones.indexOf(clone);
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
      const defaults: Required<DnaOptionsRegisterInitializer> = {
         selector:   null,
         params:     [],
         onDomReady: true,
         };
      const settings =        { ...defaults, ...options };
      const rootSelector =    settings.selector;
      const notTemplate =     (elem: Element) => !elem.classList.contains(dna.name.template);
      const selectElems =     () => dna.dom.filter(globalThis.document.querySelectorAll(rootSelector!), notTemplate);
      const onDomReadyElems = () => !rootSelector ? [globalThis.document.body] :
         dna.dom.addClass(selectElems(), dna.name.initialized);
      if (settings.onDomReady)
         onDomReadyElems().forEach(elem => dna.util.apply(fn, [elem, settings.params].flat()));
      const initializer = { fn: fn, selector: rootSelector, params: settings.params };
      dna.events.db.initializers.push(initializer);
      return dna.events.db.initializers;
      },
   clearInitializers(): DnaInitializer[] {
      // Deletes all initializers.
      return dna.events.db.initializers.splice(0);
      },
   registerContext(contextName: string, contextObjOrFn: { [name: string]: unknown } | DnaCallback): DnaContext {
      // Registers an application object or individual function to enable it to be used for event
      // callbacks.  Registration is needed when global namespace is not available to dna-engine, such
      // as when using webpack to load dna-engine as a module.
      dna.events.db.context[contextName] = contextObjOrFn;
      return dna.events.db.context;
      },
   initGlobal(thisWindow: GlobalWindow): unknown {
      thisWindow.dna = dna;
      const writable = (prop: string): boolean => !globalThis[<GlobalKey>prop] ||
         !!Object.getOwnPropertyDescriptor(globalThis, prop)?.writable;
      if (writable('window'))
         globalThis.window = thisWindow;
      if (writable('document'))
         globalThis.document = thisWindow.document;
      if (writable('dna'))
         globalThis.dna = dna;
      return dna.core.setup();
      },
   info(): DnaInfo {
      // Returns status information about templates on the current web page.
      const names =  Object.keys(dna.template.db);
      const panels = globalThis.document.querySelectorAll('.dna-menu.dna-panels-initialized');
      return {
         version:      dna.version,
         templates:    names.length,
         clones:       globalThis.document.querySelectorAll('.dna-clone:not(.dna-sub-clone)').length,
         subs:         globalThis.document.querySelectorAll('.dna-sub-clone').length,
         names:        names,
         store:        dna.template.db,
         initializers: dna.events.db.initializers,
         panels:       dna.dom.map(panels, panel => (<HTMLElement>panel).dataset.menuNav!),
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
   template:    dnaTemplate,
   events:      dnaEvents,
   core:        dnaCore,
   };

dna.dom.onReady(dna.core.setup);

export { dna };
