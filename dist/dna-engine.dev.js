//! dna-engine v3.2.7 ~~ https://dna-engine.org ~~ MIT License

const dnaName = {
    animating: 'dna-animating',
    animatingDone: 'dna-animating-done',
    array: 'dna-array',
    clone: 'dna-clone',
    container: 'dna-container',
    displayed: 'dna-displayed',
    executed: 'dna-executed',
    field: 'dna-field',
    hidden: 'dna-hidden',
    hide: 'dna-hide',
    initialized: 'dna-initialized',
    lastSeparator: 'dna-last-separator',
    menu: 'dna-menu',
    menuItem: 'dna-menu-item',
    nucleotide: 'dna-nucleotide',
    onLoad: 'dna-on-load',
    panel: 'dna-panel',
    panels: 'dna-panels',
    panelsInitialized: 'dna-panels-initialized',
    selected: 'dna-selected',
    separator: 'dna-separator',
    subClone: 'dna-sub-clone',
    template: 'dna-template',
    unhide: 'dna-unhide',
    unselected: 'dna-unselected',
    updateModel: 'dna-update-model',
};
const dnaArray = {
    find: (array, value, key = 'code') => {
        const find = () => array.findIndex(object => object[key] === value);
        const index = Array.isArray(array) ? find() : -1;
        const item = index === -1 ? null : array[index];
        return { index, item };
    },
    fromMap(map, options) {
        const defaults = { key: 'code', kebabCodes: false };
        const settings = { ...defaults, ...options };
        const codeValue = (key) => settings.kebabCodes ? dna.util.toKebab(key) : key;
        const toObj = (item) => dna.util.isObj(item) ? item : { value: item };
        return Object.keys(map).map(key => ({ ...{ [settings.key]: codeValue(key) }, ...toObj(map[key]) }));
    },
    toMap(array, options) {
        const defaults = { key: 'code', camelKeys: false };
        const settings = { ...defaults, ...options };
        const map = {};
        const keyName = settings.key;
        const getKeyRaw = (obj) => obj[keyName];
        const getKeyCamel = (obj) => dna.util.toCamel(String(obj[keyName]));
        const getKey = settings.camelKeys ? getKeyCamel : getKeyRaw;
        array.forEach(obj => map[getKey(obj)] = obj);
        return map;
    },
};
const dnaBrowser = {
    userAgentData() {
        const polyfill = () => {
            const brandEntry = globalThis.navigator.userAgent.split(' ').pop()?.split('/') ?? [];
            const hasTouch = !!navigator.maxTouchPoints;
            const platform = globalThis.navigator.platform;
            const mac = hasTouch ? 'iOS' : 'macOS';
            const platforms = { 'MacIntel': mac, 'Win32': 'Windows', 'iPhone': 'iOS', 'iPad': 'iOS' };
            return {
                brands: [{ brand: brandEntry[0] ?? '', version: brandEntry[1] ?? '' }],
                mobile: hasTouch || /Android|iPhone|iPad|Mobi/i.test(globalThis.navigator.userAgent),
                platform: platforms[platform] ?? platform,
            };
        };
        const uaData = globalThis.navigator['userAgentData'];
        return (uaData ?? polyfill());
    },
};
const dnaPageToken = {
    put: (key, value) => {
        globalThis.sessionStorage[key + globalThis.location.pathname] = JSON.stringify(value);
        return value;
    },
    get: (key, defaultValue) => {
        const pageKey = key + globalThis.location.pathname;
        const value = globalThis.sessionStorage[pageKey];
        return value === undefined ? defaultValue : JSON.parse(value);
    },
};
const dnaDom = {
    stateDepot: [],
    state(elem) {
        dna.core.assert(dna.dom.isElem(elem), 'Invalid element for getting state', elem);
        const data = elem.dataset;
        elem.classList.add('dna-state');
        if (!data.dnaState)
            data.dnaState = String(dna.dom.stateDepot.push({}) - 1);
        return dna.dom.stateDepot[Number(data.dnaState)];
    },
    componentState(elem) {
        const component = dna.ui.getComponent(elem);
        dna.core.assert(component, 'Component not found for element', elem);
        return dna.dom.state(component);
    },
    cloneState(clone) {
        dna.core.assert(dna.dom.isElem(clone), 'Invalid element for copying state', clone);
        const copy = (elem) => {
            const data = elem.dataset;
            const newState = { ...dna.dom.stateDepot[Number(data.dnaState)] };
            data.dnaState = String(dna.dom.stateDepot.push(newState) - 1);
        };
        if (clone.classList.contains('dna-state'))
            copy(clone);
        dna.dom.forEach(clone.getElementsByClassName('dna-state'), copy);
        return clone;
    },
    removeState(elem) {
        dna.core.assert(dna.dom.isElem(elem), 'Invalid element for removing state', elem);
        const data = elem.dataset;
        if (data.dnaState)
            dna.dom.stateDepot[Number(data.dnaState)] = {};
        return elem;
    },
    createCustom(tag, options) {
        const elem = globalThis.document.createElement(tag);
        if (options?.id)
            elem.id = options.id;
        if (options?.class)
            elem.classList.add(options.class);
        if (options?.href)
            elem.href = options.href;
        if (options?.html)
            elem.innerHTML = options.html;
        if (options?.name)
            elem.name = options.name;
        if (options?.rel)
            elem.rel = options.rel;
        if (options?.src)
            elem.src = options.src;
        if (options?.text)
            elem.textContent = options.text;
        if (options?.type)
            elem.type = options.type;
        if (options?.subTags)
            options.subTags.forEach(subTag => elem.appendChild(globalThis.document.createElement(subTag)));
        return elem;
    },
    create(tag, options) {
        const elem = globalThis.document.createElement(tag);
        if (options?.id)
            elem.id = options.id;
        if (options?.class)
            elem.classList.add(options.class);
        if (options?.href)
            elem.href = options.href;
        if (options?.html)
            elem.innerHTML = options.html;
        if (options?.name)
            elem.name = options.name;
        if (options?.rel)
            elem.rel = options.rel;
        if (options?.src)
            elem.src = options.src;
        if (options?.text)
            elem.textContent = options.text;
        if (options?.type)
            elem.type = options.type;
        if (options?.subTags)
            options.subTags.forEach(subTag => elem.appendChild(globalThis.document.createElement(subTag)));
        return elem;
    },
    hasClass(elems, className) {
        const elemHasClass = (elem) => elem.classList.contains(className);
        return Array.prototype.some.call(elems, elemHasClass);
    },
    toggleClass(elem, className, state) {
        if (state === undefined ? !elem.classList.contains(className) : state)
            elem.classList.add(className);
        else
            elem.classList.remove(className);
        return elem;
    },
    replaceClass(elem, oldName, newName) {
        elem.classList.remove(oldName);
        elem.classList.add(newName);
        return elem;
    },
    addClass(elems, className) {
        const addClass = (elem) => elem.classList.add(className);
        Array.prototype.forEach.call(elems, addClass);
        return elems;
    },
    forEach(elems, fn) {
        Array.prototype.forEach.call(elems, fn);
        return elems;
    },
    map(elems, fn) {
        return Array.prototype.map.call(elems, fn);
    },
    filter(elems, fn) {
        return Array.prototype.filter.call(elems, fn);
    },
    filterBySelector(elems, selector) {
        const elemMatches = (elem) => elem.matches(selector);
        return Array.prototype.filter.call(elems, elemMatches);
    },
    filterByClass(elems, ...classNames) {
        const hasClass = (elem) => elem.classList.contains(classNames[0]);
        const filtered = Array.prototype.filter.call(elems, hasClass);
        const filterMore = () => dna.dom.filterByClass(filtered, ...classNames.splice(1));
        return classNames.length === 1 ? filtered : filterMore();
    },
    find(elems, fn) {
        return Array.prototype.find.call(elems, fn) ?? null;
    },
    index(elem) {
        return Array.prototype.indexOf.call(elem.parentElement.children, elem);
    },
    indexOf(elems, elem) {
        return Array.prototype.indexOf.call(elems, elem);
    },
    findIndex(elems, selector) {
        const elemMatches = (elem) => elem.matches(selector);
        return Array.prototype.findIndex.call(elems, elemMatches);
    },
    insertAt(container, elem, index) {
        const inbounds = index >= 0 && index <= container.children.length;
        dna.core.assert(inbounds, 'Invalid index to insert element', index);
        if (index === 0)
            container.prepend(elem);
        else
            container.children[index - 1].insertAdjacentElement('afterend', elem);
        return elem;
    },
    isElem(elem) {
        return !!elem && typeof elem === 'object' && !!elem.nodeName;
    },
    getAttrs(elem) {
        return elem ? Object.values(elem.attributes) : [];
    },
    toElem(elemOrEvent) {
        return (dna.dom.isElem(elemOrEvent) ? elemOrEvent : elemOrEvent.target);
    },
    on(type, listener, options) {
        const defaults = { keyFilter: null, selector: null, container: null };
        const settings = { ...defaults, ...options };
        const noFilter = !settings.keyFilter;
        const noSelector = !settings.selector;
        const noContainer = !settings.container;
        const delegator = (event) => {
            const target = event.target;
            const elem = !target || noSelector ? target : target.closest(settings.selector);
            const expectedKey = () => noFilter || settings.keyFilter === event.key;
            const expectedElem = () => noContainer || settings.container.contains(target);
            if (elem && expectedKey() && expectedElem())
                listener(elem, event, settings.selector);
        };
        globalThis.document.addEventListener(type, delegator);
    },
    onClick(listener, selector) {
        dna.dom.on('click', listener, { selector: selector ?? null });
    },
    onChange(listener, selector) {
        dna.dom.on('change', listener, { selector: selector ?? null });
    },
    onInput(listener, selector) {
        dna.dom.on('input', listener, { selector: selector ?? null });
    },
    onKeyDown(listener, selector) {
        dna.dom.on('keydown', listener, { selector: selector ?? null });
    },
    onKeyUp(listener, selector) {
        dna.dom.on('keyup', listener, { selector: selector ?? null });
    },
    onEnterKey(listener, selector) {
        dna.dom.on('keyup', listener, { selector: selector ?? null, keyFilter: 'Enter' });
    },
    onFocusIn(listener, selector) {
        dna.dom.on('focusin', listener, { selector: selector ?? null });
    },
    onFocusOut(listener, selector) {
        dna.dom.on('focusout', listener, { selector: selector ?? null });
    },
    onCut(listener, selector) {
        dna.dom.on('cut', listener, { selector: selector ?? null });
    },
    onPaste(listener, selector) {
        dna.dom.on('paste', listener, { selector: selector ?? null });
    },
    onTouchStart(listener, selector) {
        dna.dom.on('touchstart', listener, { selector: selector ?? null });
    },
    onTouchEnd(listener, selector) {
        dna.dom.on('touchend', listener, { selector: selector ?? null });
    },
    onSubmit(listener, selector) {
        dna.dom.on('submit', listener, { selector: selector ?? null });
    },
    onHoverIn(listener, selector) {
        let ready = true;
        const delegator = (event) => {
            const target = event.target;
            const elem = target?.closest(selector);
            if (elem && ready)
                listener(elem, event, selector);
            ready = elem === null;
        };
        globalThis.document.addEventListener('pointerover', delegator);
    },
    onHoverOut(listener, selector) {
        let ready = false;
        let prevTarget = null;
        const delegator = (event) => {
            const target = event.target;
            const elem = target?.closest(selector);
            prevTarget = elem ?? prevTarget;
            if (elem === null && ready)
                listener(prevTarget, event, selector);
            ready = elem !== null;
        };
        globalThis.document.addEventListener('pointerover', delegator);
    },
    onReady(callback, options) {
        const browserless = !globalThis.document;
        const state = browserless ? 'browserless' : globalThis.document.readyState;
        const message = 'loaded into browserless context -- DOM status interactive';
        if (browserless && !options?.quiet)
            console.log(dna.util.timestampMsec(), `[dna-engine] ${message}`);
        if (['complete', 'browserless'].includes(state))
            callback();
        else
            globalThis.window.addEventListener('DOMContentLoaded', callback);
        return state;
    },
    triggerChange(elem, delay) {
        const event = new Event('change', { bubbles: true });
        if (delay)
            globalThis.setTimeout(() => elem.dispatchEvent(event), delay);
        else
            elem.dispatchEvent(event);
        return event;
    },
};
const dnaUi = {
    isHidden(elem) {
        const computed = globalThis.getComputedStyle(elem);
        return computed.display === 'none' || computed.visibility === 'hidden' ||
            computed.visibility === 'collapse' || computed.opacity === '0' || elem.clientHeight === 0;
    },
    isVisible(elem) {
        return !dna.ui.isHidden(elem);
    },
    show(elem) {
        const style = elem.style;
        style.removeProperty('display');
        style.removeProperty('opacity');
        style.removeProperty('visibility');
        const computed = globalThis.getComputedStyle(elem);
        const override = (prop, values, standIn) => values.includes(computed.getPropertyValue(prop)) && style.setProperty(prop, standIn);
        override('display', ['none'], 'block');
        override('opacity', ['0'], '1');
        override('visibility', ['collapse', 'hidden'], 'visible');
        return elem;
    },
    hide(elem) {
        elem.style.display = 'none';
        return elem;
    },
    toggle(elem, display) {
        return display ?? dna.ui.isHidden(elem) ? dna.ui.show(elem) : dna.ui.hide(elem);
    },
    fadeIn(elem, options) {
        const duration = options?.duration ?? 600;
        const computed = globalThis.getComputedStyle(elem);
        const startOpacity = options?.reset || dna.ui.isHidden(elem) ? '0' : computed.opacity;
        dna.ui.show(elem);
        const style = elem.style;
        style.transition = 'all 0ms';
        style.opacity = startOpacity;
        const animate = () => {
            style.transition = `all ${duration}ms`;
            style.opacity = '1';
        };
        globalThis.requestAnimationFrame(animate);
        const cleanup = () => {
            style.removeProperty('transition');
            style.removeProperty('opacity');
            dna.ui.show(elem);
            return elem;
        };
        return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), duration + 100));
    },
    fadeOut(elem, options) {
        const duration = options?.duration ?? 600;
        const style = elem.style;
        style.transition = 'all 0ms';
        style.opacity = globalThis.getComputedStyle(elem).opacity;
        const animate = () => {
            style.transition = `all ${duration}ms`;
            style.opacity = '0';
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
    slideFadeIn(elem, options) {
        const duration = options?.duration ?? 600;
        const reset = options?.reset ?? false;
        const style = elem.style;
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
            style.opacity = '0';
            style.overflow = 'hidden';
            const computed = globalThis.getComputedStyle(elem);
            const heights = verticals.map(prop => computed.getPropertyValue(prop));
            verticals.forEach(prop => style.setProperty(prop, '0px'));
            const animate = () => {
                style.transition = `all ${duration}ms`;
                style.opacity = '1';
                verticals.forEach((prop, i) => style.setProperty(prop, heights[i]));
            };
            globalThis.requestAnimationFrame(animate);
        };
        if (reset || dna.ui.isHidden(elem))
            start();
        const cleanup = () => {
            style.removeProperty('transition');
            style.removeProperty('opacity');
            style.removeProperty('overflow');
            verticals.forEach((prop) => style.removeProperty(prop));
            dna.ui.show(elem);
            return elem;
        };
        return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), duration + 100));
    },
    slideFadeOut(elem, options) {
        const duration = options?.duration ?? 600;
        const computed = globalThis.getComputedStyle(elem);
        const style = elem.style;
        style.transition = `all ${duration}ms`;
        style.opacity = String(Math.min(1, Number(computed.getPropertyValue('opacity'))));
        style.overflow = 'hidden';
        const verticals = [
            'height',
            'border-top-width',
            'border-bottom-width',
            'padding-top',
            'padding-bottom',
            'margin-top',
            'margin-bottom',
        ];
        const heights = verticals.map(prop => computed.getPropertyValue(prop));
        verticals.forEach((prop, i) => style.setProperty(prop, heights[i]));
        const animate = () => {
            style.opacity = '0';
            verticals.forEach(prop => style.setProperty(prop, '0px'));
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
        return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), duration + 100));
    },
    slideFade(elem, show) {
        return show ? dna.ui.slideFadeIn(elem) : dna.ui.slideFadeOut(elem);
    },
    slideFadeDelete(elem) {
        return dna.ui.slideFadeOut(elem).then(dna.core.remove);
    },
    smoothHeight(updateUI, options) {
        const defaults = {
            container: globalThis.document.body,
            overflow: true,
            duration: 1000,
        };
        const settings = { ...defaults, ...options };
        const container = settings.container;
        const style = container.style;
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
                style.maxHeight = 'none';
                container.classList.remove(dna.name.animating);
            };
            const animate = () => {
                style.minHeight = '0px';
                style.maxHeight = '100vh';
                globalThis.setTimeout(turnOffTransition, 1000);
            };
            const setAnimationLength = () => {
                style.transition = `all ${settings.duration}ms`;
                globalThis.requestAnimationFrame(animate);
            };
            globalThis.requestAnimationFrame(setAnimationLength);
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
    smoothMove(elem, up) {
        const blockingElem = up ? elem.previousElementSibling : elem.nextElementSibling;
        const move = () => {
            const submissiveElem = blockingElem;
            const ghostElem = submissiveElem.cloneNode(true);
            submissiveElem.style.display = 'none';
            elem.parentElement.insertBefore(ghostElem, submissiveElem);
            elem.parentElement.insertBefore(up ? elem : submissiveElem, up ? submissiveElem : elem);
            const animate = () => {
                dna.ui.slideFadeIn(submissiveElem);
                return dna.ui.slideFadeDelete(ghostElem).then(() => elem);
            };
            return new Promise(resolve => globalThis.requestAnimationFrame(() => resolve(animate())));
        };
        return blockingElem ? move() : new Promise(resolve => resolve(elem));
    },
    smoothMoveUp(elem) {
        return dna.ui.smoothMove(elem, true);
    },
    smoothMoveDown(elem) {
        return dna.ui.smoothMove(elem, false);
    },
    pulse(elem, options) {
        const defaults = {
            duration: 7000,
            durationIn: 600,
            durationOut: 3000,
            noFadeOut: false,
            text: null,
        };
        const settings = { ...defaults, ...options };
        dna.core.assert(dna.dom.isElem(elem), 'Invalid element for dna.ui.pulse()', elem);
        const data = elem.dataset;
        const pulseStart = String(Date.now());
        data.dnaPulseStart = pulseStart;
        const isLastPulse = () => data.dnaPulseStart === pulseStart;
        const style = elem.style;
        style.transition = 'all 0ms';
        style.opacity = '0';
        if (settings.text !== null)
            elem.textContent = settings.text;
        const animate = () => {
            style.transition = `all ${settings.durationIn}ms`;
            style.opacity = '1';
        };
        const fadeAway = () => {
            style.transition = `all ${settings.durationOut}ms`;
            if (isLastPulse())
                style.opacity = '0';
        };
        if (elem.clientHeight === 0)
            dna.ui.slideFadeIn(elem, { duration: settings.durationIn });
        else
            globalThis.requestAnimationFrame(animate);
        if (!settings.noFadeOut)
            globalThis.setTimeout(fadeAway, settings.durationIn + settings.duration);
        const cleanup = () => {
            if (isLastPulse())
                style.removeProperty('transition');
            return elem;
        };
        const total = settings.durationIn +
            (settings.noFadeOut ? 0 : settings.duration + settings.durationOut);
        return new Promise(resolve => globalThis.setTimeout(() => resolve(cleanup()), total + 100));
    },
    focus(elem, options) {
        const input = options?.firstInput ? elem.querySelector('input') : elem;
        globalThis.requestAnimationFrame(() => input?.focus());
        return elem;
    },
    setText(elem, text) {
        if (elem)
            elem.textContent = text;
        return elem;
    },
    toClone(elemOrEvent) {
        const elem = elemOrEvent instanceof Event ? elemOrEvent.target : elemOrEvent;
        return dna.getClone(elem);
    },
    getComponent(elem) {
        return elem?.closest('[data-component]') ?? null;
    },
};
const dnaUtil = {
    apply(fn, params) {
        const callback = !fn ? null :
            typeof fn === 'function' ? fn :
                typeof fn === 'string' ? dna.util.getFn(fn) :
                    null;
        dna.core.assert(callback, 'Invalid callback function', fn);
        return callback(params[0], ...params.slice(1));
    },
    getFn(name) {
        dna.core.assert(!/[^\p{Letter}\d.]/u.test(name), 'Invalid function name', name);
        const fields = name.split('.');
        const tag = fields[0];
        const tagValue = globalThis[tag];
        const toValue = (eval);
        const callable = () => ['object', 'function'].includes(toValue('typeof ' + tag));
        const getContext = () => dna.registerContext(tag, toValue(tag));
        const getTop = () => callable() ? getContext()[tag] : undefined;
        const top = tagValue ?? dna.events.db.context[tag] ?? getTop();
        const deep = (object, subfields) => !subfields.length ? object :
            !object ? undefined :
                deep(object[subfields[0]], subfields.slice(1));
        return fields.length === 1 ? top : deep(top, fields.slice(1));
    },
    assign(data, field, value) {
        const dataObj = data && typeof data === 'object' ? data : {};
        const fields = field.split('.');
        const name = fields[0];
        if (fields.length > 1 && !dna.util.isObj(dataObj[name]))
            dataObj[name] = {};
        if (fields.length === 1)
            dataObj[name] = value;
        else
            dna.util.assign(dataObj[name], fields.slice(1).join('.'), value);
        return dataObj;
    },
    printf: (format, ...values) => {
        return values.reduce((output, value) => output.replace(/%s/, String(value)), format);
    },
    round(value, precision) {
        return Number(value.toExponential(precision - 1));
    },
    realTruth: (value) => {
        const falseyStr = () => /^(f|false|n|no|0)$/i.test(String(value));
        const emptyArray = () => value instanceof Array && value.length === 0;
        return !!value && !emptyArray() && !falseyStr();
    },
    toCamel: (kebabStr) => {
        const hump = (match, letter) => letter.toUpperCase();
        return String(kebabStr).replace(/-(.)/g, hump);
    },
    toKebab: (camelStr) => {
        const dash = (word) => '-' + word.toLowerCase();
        return ('' + camelStr).replace(/([A-Z]+)/g, dash).replace(/\s|^-/g, '');
    },
    value(data, field) {
        const notFound = data === null || data === undefined || field === undefined;
        const parts = typeof field === 'string' ? field.split('.') : field;
        const fieldValue = notFound ? null : data[parts[0]];
        return notFound || parts.length < 2 ? fieldValue : dna.util.value(fieldValue, parts.slice(1));
    },
    isObj(value) {
        return !!value && typeof value === 'object' && !Array.isArray(value);
    },
    timestamp(date) {
        return dna.format.getDateFormatter('timestamp')(date ?? Date.now());
    },
    timestampMsec(date) {
        return dna.format.getDateFormatter('timestamp-msec')(date ?? Date.now());
    },
};
const dnaFormat = {
    getCurrencyFormatter(iso4217, units = 1) {
        const options = {
            style: 'currency',
            currency: iso4217.toUpperCase(),
        };
        const formatter = new Intl.NumberFormat([], options).format;
        return (value) => formatter(Number(value) / units);
    },
    getDateFormatter(format) {
        const simpleDate = (date) => date.toLocaleString([], { day: 'numeric', month: 'long', year: 'numeric' });
        const weekday = (date) => date.toLocaleString([], { weekday: 'long' });
        const month = (date) => date.toLocaleString([], { month: 'long' });
        const twoDigit = (value) => String(value).padStart(2, '0');
        const timestamp = (date) => date.toISOString().replace('T', '+').slice(0, -5);
        const timestampMsec = (date) => date.toISOString().replace('T', '+').slice(0, -1);
        const timeZone = (date) => date.toLocaleString([], { timeZoneName: 'short' }).split(' ').pop();
        const timeZoneLong = (date) => date.toLocaleString([], { timeZoneName: 'long', year: 'numeric' }).split(' ').slice(1).join(' ');
        const space = (format) => format.replace(/\s/g, ' ');
        const general = {
            date: (date) => `${date.getFullYear()}-${twoDigit(date.getMonth() + 1)}-${twoDigit(date.getDate())}`,
            time: (date) => date.toLocaleString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s/, '').toLowerCase(),
            weekday: (date) => date.toLocaleString([], { weekday: 'short' }),
            stamp: (date) => `${general.date(date)} ${general.time(date)} ${general.weekday(date)}`,
            long: (date) => `${general.stamp(date)} (${timeZone(date)})`,
        };
        const transformers = {
            date: (date) => date.toDateString(),
            general: (date) => general.stamp(date),
            generalDate: (date) => general.date(date),
            generalWeekday: (date) => general.weekday(date),
            generalLong: (date) => general.long(date),
            generalTime: (date) => general.time(date),
            iso: (date) => date.toISOString(),
            locale: (date) => space(date.toLocaleString()),
            localeDate: (date) => date.toLocaleDateString(),
            localeTime: (date) => space(date.toLocaleTimeString()),
            month: (date) => month(date),
            simpleDate: (date) => simpleDate(date),
            string: (date) => date.toString(),
            time: (date) => date.toTimeString(),
            timestamp: (date) => timestamp(date),
            timestampMsec: (date) => timestampMsec(date),
            timeZone: (date) => timeZone(date),
            timeZoneLong: (date) => timeZoneLong(date),
            utc: (date) => date.toUTCString(),
            weekday: (date) => weekday(date),
            year: (date) => String(date.getFullYear()),
        };
        const transformer = transformers[dna.util.toCamel(format)];
        dna.core.assert(transformer, 'Unknown date format code', format);
        const formatter = (msec) => transformer(new Date(msec));
        return formatter;
    },
    getNumberFormatter(format) {
        dna.core.assert(/^#([.]#+)?$/.test(format), 'Unknown numeric format code', format);
        const digits = format === '#' ? 0 : format.length - 2;
        const numeric = { minimumFractionDigits: digits, maximumFractionDigits: digits };
        return new Intl.NumberFormat([], numeric).format;
    },
    getPercentFormatter(format) {
        dna.core.assert(/^#([.]#+)?$/.test(format), 'Unknown percent format code', format);
        const digits = format === '#' ? 0 : format.length - 2;
        const options = {
            style: 'percent',
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        };
        return new Intl.NumberFormat([], options).format;
    },
    getFormatter(fn) {
        return (value, data) => String(dna.util.apply(fn, [value, data]));
    },
};
const dnaPlaceholder = {
    setup() {
        const hideSelect = (elem) => elem.closest('select')?.classList.add(dna.name.hide);
        globalThis.document.querySelectorAll('option.dna-template').forEach(hideSelect);
        const isEmpty = (elem) => !!dna.getClones(elem.dataset.placeholder).length;
        const fade = (elem) => isEmpty(elem) ? dna.ui.slideFadeOut(elem) : dna.ui.slideFadeIn(elem);
        const placeholders = globalThis.document.querySelectorAll('[data-placeholder]');
        placeholders.forEach(fade);
        return placeholders;
    },
};
const dnaPanels = {
    display(menu, location, updateUrl) {
        const menuData = menu.dataset;
        const menuNavName = menuData.menuNav;
        const callback = menuData.callback;
        const panels = dna.dom.state(menu).dnaPanels;
        const menuItems = menu.querySelectorAll('.dna-menu-item');
        const savedIndex = Number(dna.pageToken.get(menuNavName, 0));
        const bound = (loc) => Math.max(0, Math.min(loc, menuItems.length - 1));
        const index = bound(location === undefined ? savedIndex : location);
        const update = () => {
            if (menu.nodeName === 'SELECT')
                menu.selectedIndex = index;
            menuItems.forEach(elem => dna.dom.replaceClass(elem, dna.name.selected, dna.name.unselected));
            dna.dom.replaceClass(menuItems[index], dna.name.unselected, dna.name.selected);
            const hidePanel = (panel) => {
                panel.style.display = 'none';
                panel.classList.remove(dna.name.displayed);
                panel.classList.add(dna.name.hidden);
            };
            dna.dom.forEach(panels.children, hidePanel);
            const panel = panels.children[index];
            panel.classList.replace(dna.name.hidden, dna.name.displayed);
            dna.ui.fadeIn(panel);
            const hash = panel.dataset.hash;
            dna.pageToken.put(menuNavName, index);
            if (updateUrl && hash)
                globalThis.history.pushState(null, '', '#' + hash);
            if (callback)
                dna.util.apply(callback, [panel, hash]);
            return panel;
        };
        const heightTransition = 100;
        const startHieght = panels.clientHeight;
        const panel = update();
        const endHieght = panels.clientHeight;
        panels.style.transition = 'all 0ms';
        panels.style.height = String(startHieght) + 'px';
        const animate = () => {
            panels.style.transition = `all ${heightTransition}ms`;
            panels.style.height = String(endHieght) + 'px';
        };
        globalThis.requestAnimationFrame(animate);
        globalThis.setTimeout(() => panels.style.removeProperty('height'), heightTransition + 100);
        return panel;
    },
    clickRotate(menuItem) {
        const menu = menuItem.closest(dna.selector.menu);
        const index = dna.dom.indexOf(menu.querySelectorAll(dna.selector.menuItem), menuItem);
        return dna.panels.display(menu, index, true);
    },
    selectRotate(menu) {
        return dna.panels.display(menu, menu.selectedIndex, true);
    },
    nextMenuNav: 1,
    initialize(panels) {
        const generateNavName = () => {
            const menuNavName = 'dna-panels-' + String(dna.panels.nextMenuNav++);
            const setNavName = (elem) => elem.dataset.menuNav = menuNavName;
            const menu = panels.previousElementSibling;
            dna.core.assert(menu?.classList.contains('dna-menu'), 'Menu not found for panels', panels);
            setNavName(menu);
            setNavName(panels);
            return menuNavName;
        };
        const init = () => {
            const menuNavName = panels.dataset.menuNav || generateNavName();
            const menuSelector = '.dna-menu[data-menu-nav=' + menuNavName + ']';
            const menu = globalThis.document.querySelector(menuSelector);
            const hash = globalThis.location.hash.replace(/[^\w-]/g, '');
            const hashIndex = () => dna.dom.findIndex(panels.children, '[data-hash=' + hash + ']');
            const savedIndex = () => dna.pageToken.get(menuNavName, 0);
            const first = panels.children[0];
            const loc = hash && first.dataset.hash ? hashIndex() : savedIndex();
            dna.dom.addClass(panels.children, dna.name.panel);
            panels.classList.add(dna.name.panelsInitialized);
            dna.core.assert(menu, 'Menu not found for panels', menuNavName);
            menu.classList.add(dna.name.panelsInitialized);
            dna.dom.state(menu).dnaPanels = panels;
            if (!menu.getElementsByClassName(dna.name.menuItem).length)
                dna.dom.addClass(menu.children, dna.name.menuItem);
            dna.panels.display(menu, loc);
        };
        const isInitialized = !panels || panels.classList.contains(dna.name.panelsInitialized);
        if (!isInitialized && !dna.dom.hasClass(panels.children, dna.name.template))
            init();
        return panels;
    },
    setup() {
        const panels = globalThis.document.querySelectorAll(dna.selector.panels);
        panels.forEach(dna.panels.initialize);
        dna.dom.onClick(dna.panels.clickRotate, '.dna-menu .dna-menu-item');
        dna.dom.onChange(dna.panels.selectRotate, 'select.dna-menu');
        return panels;
    },
};
const dnaCompile = {
    getRules(elem) {
        const state = dna.dom.state(elem);
        if (!state.dnaRules)
            state.dnaRules = {};
        return state.dnaRules;
    },
    setRule(rules, key, value) {
        const settableRules = rules;
        settableRules[key] = value;
        return rules;
    },
    setElemRule(elem, key, value) {
        const rules = dna.compile.getRules(elem);
        rules[key] = value;
        return elem;
    },
    regex: {
        dnaField: /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,
        dnaBasePair: /~~|{{|}}/,
        dnaBasePairs: /~~|\{\{|\}\}/g,
    },
    setupNucleotide(elem) {
        dna.compile.getRules(elem);
        elem.classList.add(dna.name.nucleotide);
        return elem;
    },
    isDnaField(node) {
        const value = node.firstChild?.nodeValue;
        return !!value && dna.compile.regex.dnaField.test(value);
    },
    addFieldClass(elem) {
        const field = dna.dom.state(elem).dnaField;
        const htmlCase = () => dna.util.toKebab(field).replace(/[[\]]/g, '').replace(/[.]/g, '-');
        if (field)
            elem.classList.add('dna-field-' + htmlCase());
        return elem;
    },
    field(elem) {
        dna.compile.setupNucleotide(elem);
        const field = elem.textContent.replace(dna.compile.regex.dnaBasePairs, '').trim();
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
    propsAndAttrs(elem) {
        const data = elem.dataset;
        const rules = dna.compile.getRules(elem);
        const props = [];
        const attrs = [];
        const names = [];
        const compileProp = (key, value) => {
            names.push(key);
            key = key.replace(/^data-prop-/, '').toLowerCase();
            value = value.replace(dna.compile.regex.dnaBasePairs, '');
            props.push(key, value);
            const setupInput = () => {
                elem.classList.add(dna.name.updateModel);
                dna.dom.state(elem).dnaField = value;
            };
            if (key === 'checked' && elem.matches('input'))
                setupInput();
        };
        const compileAttr = (key, value) => {
            const parts = value.split(dna.compile.regex.dnaBasePair);
            const raw = ['[index]', '[count]', '[value]'].indexOf(parts[1]);
            if (raw !== -1)
                parts[1] = raw;
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
        const compile = (attr) => {
            if (/^data-prop-/.test(attr.name))
                compileProp(attr.name, attr.value);
            else if (attr.value.split(dna.compile.regex.dnaBasePair).length === 3)
                compileAttr(attr.name, attr.value);
        };
        dna.dom.getAttrs(elem).forEach(compile);
        const getRules = () => dna.compile.getRules(dna.compile.setupNucleotide(elem));
        if (props.length > 0)
            getRules().props = props;
        if (attrs.length > 0)
            getRules().attrs = attrs;
        if (data.precision)
            getRules().precision = Number(data.precision);
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
        if (data.transform)
            getRules().transform = data.transform;
        if (data.callback)
            getRules().callback = data.callback;
        dna.compile.addFieldClass(elem);
        names.forEach(name => elem.removeAttribute(name));
        return elem;
    },
    getDataField(elem, type) {
        return elem.dataset[type].replace(dna.compile.regex.dnaBasePairs, '').trim();
    },
    subTemplateName(holder, arrayField, index) {
        const getRules = () => dna.compile.getRules(dna.getClone(holder, { main: true }));
        const templateName = typeof holder === 'string' ? holder : getRules().template;
        return `${templateName}-${arrayField}--${index}`;
    },
    rules(elem, type, isLists = false, className, init) {
        const addRule = (subElem) => {
            dna.compile.setupNucleotide(subElem);
            const field = dna.compile.getDataField(subElem, type);
            const makeLists = () => field.split(';').map(list => list.replace(']', '').split(/[[,]/));
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
    separators(elem) {
        const isWhitespaceNode = (node) => node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue);
        const append = (elem, text, className) => {
            const lastChildNode = elem.childNodes[elem.childNodes.length - 1];
            if (lastChildNode && isWhitespaceNode(lastChildNode))
                lastChildNode.remove();
            elem.appendChild(dna.dom.create('span', { class: className, html: text }));
        };
        const processTemplate = (elem) => {
            const data = elem.dataset;
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
    template(name) {
        const elem = globalThis.document.getElementById(name);
        dna.core.assert(elem, 'Template not found', name);
        const initSubs = (elem) => dna.compile.setElemRule(elem, 'subs', []);
        const saveName = (elem) => {
            dna.dom.state(elem).dnaRules = { template: elem.id, subs: [] };
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
        const setTypeAttr = (inputElem) => inputElem.type = inputElem.dataset.attrType;
        globalThis.document.querySelectorAll('input[data-attr-type]').forEach(setTypeAttr);
        return dna.template.stash(elem);
    },
};
const dnaTemplate = {
    db: {},
    stash(elem) {
        const name = dna.compile.getRules(elem).template;
        const move = (subElem) => {
            const name = dna.compile.getRules(subElem).template;
            const container = subElem.parentElement;
            const containerState = dna.dom.state(container);
            const wrapped = container.children.length === 1 && !container.classList.contains(dna.name.container);
            const compileSiblings = () => {
                containerState.dnaContents = true;
                const templateName = (sibling) => {
                    const compileToName = (id) => id ? dna.compile.template(id).name : name;
                    const classes = sibling.classList;
                    return classes.contains(dna.name.template) ? compileToName(sibling.id) :
                        classes.contains(dna.name.subClone) ? dna.compile.getRules(sibling).template :
                            false;
                };
                containerState.dnaContents = dna.dom.map(container.children, templateName);
            };
            if (!wrapped && !containerState.dnaContents)
                compileSiblings();
            container.classList.add(dna.name.container, 'dna-contains-' + name);
            const template = {
                name: name,
                elem: subElem,
                container: container,
                nested: container.closest(dna.selector.clone) !== null,
                separators: subElem.querySelectorAll('.dna-separator, .dna-last-separator').length,
                wrapped: wrapped,
            };
            dna.template.db[name] = template;
            subElem.classList.remove(dna.name.template);
            subElem.classList.add(dna.name.clone, name);
            subElem.remove();
        };
        const prepLoop = (subElem) => {
            const rules = dna.compile.getRules(subElem);
            const parent = dna.compile.setupNucleotide(subElem.parentElement);
            const parentRules = dna.compile.getRules(parent);
            const containerRules = dna.compile.getRules(parent.closest('.dna-clone, .dna-sub-clone'));
            const index = containerRules.subs.length;
            parent.classList.add(dna.name.array);
            rules.template = dna.compile.subTemplateName(name, rules.array, index);
            parentRules.loop = { name: rules.template, field: rules.array };
            containerRules.subs.push(rules.array);
        };
        move(elem);
        elem.querySelectorAll(dna.selector.template).forEach(move);
        const subClones = elem.querySelectorAll(dna.selector.subClone);
        subClones.forEach(prepLoop);
        subClones.forEach(move);
        return dna.template.db[name];
    },
    get(name) {
        return dna.template.db[name] || dna.compile.template(name);
    },
};
const dnaEvents = {
    db: {
        context: {},
        initializers: [],
    },
    runOnLoads(options) {
        const defaults = { pollInterval: 300 };
        const settings = { ...defaults, ...options };
        const elems = globalThis.document.querySelectorAll(`[data-on-load]:not(.${dna.name.onLoad})`);
        elems.forEach(elem => elem.classList.add(dna.name.onLoad));
        const addStart = (elem) => dna.dom.state(elem).dnaOnLoad = { start: Date.now(), checks: 0 };
        elems.forEach(addStart);
        const runOnLoad = (elem) => {
            const data = elem.dataset;
            const fnName = data.onLoad;
            const fn = dna.util.getFn(fnName);
            const onLoad = dna.dom.state(elem).dnaOnLoad;
            const waitFor = data.waitFor?.split(',') ?? [];
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
    runInitializers(root) {
        const init = (initializer) => {
            const initElem = (elem) => {
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
    setup: () => {
        const runner = (elem, type, event) => {
            const target = elem.closest('[data-' + type + ']');
            const fn = target?.dataset[dna.util.toCamel(type)];
            const isLink = target?.nodeName === 'A';
            if (type === 'click' && isLink && fn?.match(/^dna[.]/))
                event.preventDefault();
            const nextClickTarget = target?.parentElement?.closest('[data-on-click]');
            if (type === 'click' && nextClickTarget)
                runner(nextClickTarget, type, event);
            return fn && dna.util.apply(fn, [target, event, dna.ui.getComponent(target)]);
        };
        const handleEvent = (target, event) => {
            const updateField = (elem, calc) => dna.util.assign(dna.getModel(elem), dna.dom.state(elem).dnaField, calc(elem));
            const getValue = (elem) => elem.value;
            const isChecked = (elem) => elem.checked;
            const updateOption = (elem) => updateField(elem, isChecked);
            const updateModel = () => {
                const mainClone = dna.getClone(target, { main: true });
                if (!mainClone) {
                    return;
                }
                if (target instanceof HTMLInputElement && target.type === 'checkbox')
                    updateField(target, isChecked);
                if (target instanceof HTMLInputElement && target.type === 'radio')
                    globalThis.document.querySelectorAll('input[type=radio][name=' + target.name + ']').forEach(updateOption);
                else if (dna.compile.getRules(target).val)
                    updateField(target, getValue);
                dna.refresh(mainClone);
            };
            if (target.classList.contains(dna.name.updateModel))
                updateModel();
            return runner(target, 'on-' + event.type.replace('key', 'key-'), event);
        };
        const handleSmartUpdate = (elem, event) => {
            const throttleDefault = 1000;
            const throttleSetting = elem.dataset.smartThrottle;
            const throttle = throttleSetting ? Number(throttleSetting) : throttleDefault;
            const state = dna.dom.state(elem);
            const value = () => elem.value;
            const doCallback = () => {
                state.dnaLastUpdated = Date.now();
                state.dnaLastValue = value();
                state.dnaTimeoutID = null;
                runner(elem, 'on-smart-update', event);
            };
            const handleChange = () => {
                if (Date.now() < state.dnaLastUpdated + throttle)
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
            globalThis.setTimeout(checkForValueChange);
        };
        const jumpToUrl = (elem) => {
            const useSameTab = dna.browser.userAgentData().mobile;
            const target = elem.closest('.external-site') ? '_blank' : '_self';
            const data = elem.dataset;
            globalThis.open(data.href, useSameTab ? '_self' : data.target ?? target);
        };
        dna.dom.onClick(handleEvent);
        dna.dom.onChange(handleEvent);
        dna.dom.onKeyDown(handleEvent);
        dna.dom.onKeyUp(handleEvent);
        dna.dom.onInput(handleEvent);
        dna.dom.onEnterKey((elem, event) => runner(elem, 'on-enter-key', event), '[data-on-enter-key]');
        dna.dom.onFocusIn((elem, event) => runner(elem, 'on-focus-in', event), '[data-on-focus-in]');
        dna.dom.onFocusOut((elem, event) => runner(elem, 'on-focus-out', event), '[data-on-focus-out]');
        dna.dom.onHoverIn((elem, event) => runner(elem, 'on-hover-in', event), '[data-on-hover-in]');
        dna.dom.onHoverOut((elem, event) => runner(elem, 'on-hover-out', event), '[data-on-hover-out]');
        dna.dom.onKeyDown(handleSmartUpdate, '[data-on-smart-update]');
        dna.dom.onKeyUp(handleSmartUpdate, '[data-on-smart-update]');
        dna.dom.onChange(handleSmartUpdate, '[data-on-smart-update]');
        dna.dom.onClick(jumpToUrl, '[data-href]');
        return dna.events.runOnLoads();
    },
};
const dnaCore = {
    inject(clone, data, index, options) {
        const injectField = (elem, field, rules) => {
            const rawValue = field === '[value]' ? data :
                field === '[index]' ? index :
                    field === '[count]' ? index + 1 :
                        dna.util.value(data, field);
            const hasPrecision = !!rules.precision && typeof rawValue === 'number';
            const value = hasPrecision ? dna.util.round(rawValue, rules.precision) : rawValue;
            const formatted = () => rules.formatter ?
                rules.formatter(value, data) : String(value);
            const injectable = ['string', 'number', 'boolean'].includes(typeof value);
            if (injectable && options.html)
                elem.innerHTML = formatted();
            else if (injectable)
                elem.textContent = formatted();
        };
        const injectValue = (elem, field) => {
            const value = field === '[value]' ? data :
                field === '[index]' ? index :
                    field === '[count]' ? index + 1 :
                        dna.util.value(data, field);
            if (value !== null && value !== elem.value)
                elem.value = String(value);
        };
        const setProperty = (elem, property, state) => {
            dna.core.assert(['checked', 'disabled'].includes(property), 'Invalid element property type', property);
            if (property === 'checked')
                elem.checked = state;
            else
                elem.disabled = state;
            return elem;
        };
        const injectProps = (elem, props) => {
            for (let prop = 0; prop * 2 < props.length; prop++)
                setProperty(elem, props[prop * 2], dna.util.realTruth(dna.util.value(data, props[prop * 2 + 1])));
        };
        const injectAttrs = (elem, rules) => {
            const attrs = rules.attrs;
            const inject = (key, parts) => {
                const field = parts[1];
                const core = field === 0 ? index : field === 1 ? index + 1 : field === 2 ? data : dna.util.value(data, field);
                const value = [parts[0], core, parts[2]].join('');
                const formatted = rules.formatter ?
                    rules.formatter(value, data) : value;
                elem.setAttribute(key, formatted);
                if (key === 'value' && value !== elem.value)
                    elem.value = value;
            };
            for (let i = 0; i * 2 < attrs.length; i++)
                inject(attrs[i * 2], attrs[i * 2 + 1]);
        };
        const injectClass = (elem, classLists) => {
            const process = (classList) => {
                const value = dna.util.value(data, classList[0]);
                const truth = dna.util.realTruth(value);
                const setBooleanClasses = () => {
                    dna.dom.toggleClass(elem, classList[1], truth);
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
        const fieldExists = (fieldName) => {
            const value = dna.util.value(data, fieldName);
            return value !== undefined && value !== null;
        };
        const processLoop = (elem, loop) => {
            const dataArray = dna.util.value(data, loop.field);
            const subClones = dna.dom.filterByClass(elem.children, loop.name);
            const injectSubClone = (subElem, index) => {
                if (!subElem.matches('option'))
                    dna.core.inject(subElem, dataArray[index], index, options);
            };
            const rebuildSubClones = () => {
                subClones.forEach(subClone => subClone.remove());
                dna.clone(loop.name, dataArray, { container: elem, html: !!options.html });
            };
            if (!dataArray)
                (data[loop.field]) = [];
            else if (dataArray.length === subClones.length)
                subClones.forEach(injectSubClone);
            else
                rebuildSubClones();
        };
        const process = (elem) => {
            const rules = dna.compile.getRules(elem);
            if (rules.transform)
                dna.util.apply(rules.transform, [data]);
            if (rules.loop)
                processLoop(elem, rules.loop);
            if (rules.text)
                injectField(elem, dna.dom.state(elem).dnaField, rules);
            if (rules.val)
                injectValue(elem, dna.dom.state(elem).dnaField);
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
            if (rules.callback)
                dna.util.apply(rules.callback, [elem]);
        };
        if (options.transform)
            options.transform(data);
        const notSubClone = (elem) => !elem.classList.contains(dna.name.subClone);
        const dig = (elem) => {
            if (elem.classList.contains(dna.name.nucleotide))
                process(elem);
            dna.dom.filter(elem.children, notSubClone).forEach(dig);
        };
        dig(clone);
        dna.dom.state(clone).dnaModel = data;
        dna.dom.state(clone).dnaIndex = index;
        return clone;
    },
    replicate(template, data, settings) {
        const subclass = () => 'dna-contains-' + template.name;
        const getContainer = (name) => settings.container.classList.contains(name) ?
            settings.container : settings.container.getElementsByClassName(name).item(0);
        const container = settings.container ? getContainer(subclass()) : template.container;
        const containerState = dna.dom.state(container);
        const clone = dna.dom.cloneState(template.elem.cloneNode(true));
        const name = dna.compile.getRules(clone).template;
        if (!containerState.dnaCountsMap)
            containerState.dnaCountsMap = {};
        const countsMap = containerState.dnaCountsMap;
        const count = countsMap[name];
        countsMap[name] = !count ? 1 : count + 1;
        dna.core.inject(clone, data, countsMap[name] - 1, settings);
        const intoUnwrapped = () => {
            const allClones = dna.dom.filterByClass(container.children, dna.name.clone);
            const firstClone = () => {
                const contents = containerState.dnaContents;
                const index = contents.indexOf(template.name);
                const adjustment = (clonesAbove, name) => clonesAbove + (name && contents.indexOf(name) < index ?
                    allClones.filter(clone => clone.classList.contains(name)).length - 1 : 0);
                const target = container.children[index + contents.reduce(adjustment, 0)];
                return target ? container.insertBefore(clone, target) : container.appendChild(clone);
            };
            const sameClones = allClones.filter(clone => clone.classList.contains(template.name));
            if (!sameClones.length)
                firstClone();
            else if (settings.top)
                container.insertBefore(clone, sameClones.at(0));
            else
                container.insertBefore(clone, sameClones.at(-1).nextSibling);
        };
        if (!template.wrapped)
            intoUnwrapped();
        else if (settings.top)
            container.prepend(clone);
        else
            container.append(clone);
        const displaySeparators = () => {
            const clones = dna.dom.filterByClass(container.children, template.name);
            const process = (clone, index) => {
                const separator = clone.getElementsByClassName(dna.name.separator)[0];
                const lastSeparator = clone.getElementsByClassName(dna.name.lastSeparator)[0];
                const isAlmostLast = index === clones.length - 2;
                const isLast = index === clones.length - 1;
                const display = (elem, show) => show ? elem.style.removeProperty('display') : elem.style.display = 'none';
                if (separator)
                    display(separator, !isAlmostLast && !isLast);
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
            dna.ui.slideFadeIn(clone, { reset: true });
        return clone;
    },
    getArrayName(subClone) {
        return subClone.classList.contains(dna.name.subClone) ?
            dna.compile.getRules(subClone).array : null;
    },
    updateModelArray(container) {
        dna.core.assert(container.classList.contains(dna.name.array), 'Invalid array container', container);
        const array = dna.compile.getRules(container).loop;
        const subs = dna.dom.filterByClass(container.children, array.name);
        const model = dna.getModel(container);
        model[array.field] = subs.map(node => dna.getModel(node));
        return container;
    },
    remove(clone, callback) {
        const container = clone.parentElement;
        clone.remove();
        if (clone.classList.contains(dna.name.subClone))
            dna.core.updateModelArray(container);
        dna.placeholder.setup();
        if (callback)
            callback(clone, dna.getModel(clone));
        return clone;
    },
    assert(ok, message, info) {
        const quoteStr = (info) => typeof info === 'string' ? `"${info}"` : String(info);
        if (!ok)
            throw new Error(`[dna-engine] ${message} --> ${quoteStr(info)}`);
    },
    setup() {
        if (!globalThis.dna)
            globalThis.dna = dna;
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
    version: '3.2.7',
    clone(name, data, options) {
        const defaults = {
            callback: null,
            clones: 1,
            container: null,
            empty: false,
            fade: false,
            formatter: null,
            holder: null,
            html: false,
            top: false,
            transform: null,
        };
        const settings = { ...defaults, ...options };
        const template = dna.template.get(name);
        const makeCopies = options?.clones !== undefined;
        const missing = template.nested && !settings.container;
        dna.core.assert(!missing, 'Container missing for nested template', name);
        if (settings.empty)
            dna.empty(name);
        const finish = (firstClone) => {
            dna.placeholder.setup();
            dna.panels.initialize(firstClone.closest(dna.selector.panels));
            while (firstClone.closest(dna.selector.hide))
                dna.dom.replaceClass(firstClone.closest(dna.selector.hide), dna.name.hide, dna.name.unhide);
        };
        const many = () => {
            const models = makeCopies ? Array(settings.clones).fill(data) : data;
            const clones = models.map(data => dna.core.replicate(template, data, settings));
            if (clones.length)
                finish(clones[0]);
            return clones;
        };
        const single = () => {
            const clone = dna.core.replicate(template, data, settings);
            finish(clone);
            return clone;
        };
        const result = Array.isArray(data) || makeCopies ? many() : single();
        return result;
    },
    arrayPush(holderClone, arrayField, data, options) {
        const cloneSub = (field, index) => {
            const clone = () => {
                const name = dna.compile.subTemplateName(holderClone, arrayField, index);
                const className = 'dna-contains-' + name;
                const find = () => holderClone.getElementsByClassName(className)[0];
                const container = holderClone.classList.contains(className) ? holderClone : find();
                dna.clone(name, data, { ...{ container }, ...options });
                dna.core.updateModelArray(container);
            };
            if (field === arrayField)
                clone();
        };
        dna.compile.getRules(holderClone).subs.forEach(cloneSub);
        return holderClone;
    },
    createTemplate(name, html, holder) {
        const elem = dna.dom.create('div', { html }).firstElementChild;
        elem.id = name;
        elem.classList.add(dna.name.template);
        holder.appendChild(elem);
        return dna.template.get(name);
    },
    templateExists(name) {
        return !!dna.template.db[name] ||
            globalThis.document.querySelector('.dna-template#' + name) !== null;
    },
    getModel(elem, options) {
        return dna.dom.state(dna.getClone(elem, options)).dnaModel;
    },
    getModels(template, options) {
        return dna.getClones(template).map(elem => dna.getModel(elem, options));
    },
    empty(name, options) {
        const defaults = { fade: false };
        const settings = { ...defaults, ...options };
        const template = dna.template.get(name);
        const clones = dna.dom.filterByClass(template.container.children, dna.name.clone);
        const countsMap = dna.dom.state(template.container).dnaCountsMap;
        if (countsMap)
            countsMap[name] = 0;
        if (settings.fade)
            clones.forEach(clone => dna.ui.slideFadeDelete(clone));
        else
            clones.forEach(clone => dna.core.remove(clone));
        return clones;
    },
    insert(name, data, options) {
        const clones = dna.getClones(name);
        return clones.length ? dna.refresh(clones.at(0), { data: data, html: !!options?.html }) :
            dna.clone(name, data, options);
    },
    refresh(clone, options) {
        const defaults = { data: null, html: false, main: false };
        const settings = { ...defaults, ...options };
        const elem = dna.getClone(clone, options);
        const model = settings.data ? settings.data : dna.getModel(elem);
        const index = dna.dom.state(elem).dnaIndex;
        return dna.core.inject(elem, model, index, settings);
    },
    refreshAll(name, options) {
        const clones = dna.getClones(name);
        clones.forEach(clone => dna.refresh(clone, options));
        return clones;
    },
    updateField(inputElem, value) {
        const field = dna.dom.state(inputElem).dnaField;
        const update = () => {
            if (inputElem.matches('input[type=checkbox]'))
                inputElem.checked = !!value;
            else if (inputElem.matches('input[type=radio]'))
                inputElem.checked = !!value;
            else if (inputElem.matches('input, select, textarea'))
                inputElem.value = String(value);
            const model = dna.getModel(inputElem);
            model[field] = value;
        };
        if (field)
            update();
        return inputElem;
    },
    recount(elem, options) {
        const clone = dna.getClone(elem);
        const name = dna.compile.getRules(clone).template;
        const update = (subElem, index) => {
            dna.dom.state(subElem).dnaIndex = index;
            dna.refresh(subElem, options);
        };
        const container = clone.parentElement;
        const containerState = dna.dom.state(container);
        const clones = dna.dom.filterByClass(container.children, 'dna-clone', name);
        clones.forEach(update);
        containerState.dnaCountsMap = containerState.dnaCountsMap || {};
        containerState.dnaCountsMap[name] = clones.length;
        return clone;
    },
    destroy(elem, options) {
        const defaults = { main: false, fade: false };
        const settings = { ...defaults, ...options };
        const clone = dna.getClone(elem, options);
        const arrayField = dna.core.getArrayName(clone);
        if (arrayField)
            dna.getModel(clone.parentElement)[arrayField]
                .splice(dna.getIndex(clone), 1);
        return settings.fade ? dna.ui.slideFadeDelete(clone) :
            new Promise(resolve => resolve(dna.core.remove(clone)));
    },
    isClone(elem) {
        return !!elem.closest('.dna-clone');
    },
    getClone(elem, options) {
        const defaults = { main: false };
        const settings = { ...defaults, ...options };
        dna.core.assert(dna.dom.isElem(elem), 'Invalid element', elem);
        const clone = elem.closest(settings.main ? '.dna-clone:not(.dna-sub-clone)' : '.dna-clone');
        dna.core.assert(clone, 'Cannot find clone', elem);
        return clone;
    },
    getClones(name) {
        return dna.dom.filterByClass(dna.template.get(name).container.children, dna.name.clone, name);
    },
    getIndex(elem, options) {
        const clone = dna.getClone(elem, options);
        const rules = dna.compile.getRules(clone);
        const clones = dna.dom.filterByClass(clone.parentElement.children, 'dna-clone', rules.template);
        return clones.indexOf(clone);
    },
    up(elemOrEvent) {
        return dna.ui.smoothMoveUp(dna.ui.toClone(elemOrEvent));
    },
    down(elemOrEvent) {
        return dna.ui.smoothMoveDown(dna.ui.toClone(elemOrEvent));
    },
    bye(elemOrEvent) {
        return dna.destroy(dna.ui.toClone(elemOrEvent), { fade: true });
    },
    registerInitializer(fn, options) {
        const defaults = {
            selector: null,
            params: [],
            onDomReady: true,
        };
        const settings = { ...defaults, ...options };
        const rootSelector = settings.selector;
        const notTemplate = (elem) => !elem.classList.contains(dna.name.template);
        const selectElems = () => dna.dom.filter(globalThis.document.querySelectorAll(rootSelector), notTemplate);
        const onDomReadyElems = () => !rootSelector ? [globalThis.document.body] :
            dna.dom.addClass(selectElems(), dna.name.initialized);
        if (settings.onDomReady)
            dna.dom.onReady(() => onDomReadyElems().forEach(elem => dna.util.apply(fn, [elem, settings.params].flat())));
        const initializer = { fn: fn, selector: rootSelector, params: settings.params };
        dna.events.db.initializers.push(initializer);
        return dna.events.db.initializers;
    },
    clearInitializers() {
        return dna.events.db.initializers.splice(0);
    },
    registerContext(contextName, contextObjOrFn) {
        dna.events.db.context[contextName] = contextObjOrFn;
        return dna.events.db.context;
    },
    initGlobal(thisWindow) {
        thisWindow.dna = dna;
        const writable = (prop) => !globalThis[prop] ||
            !!Object.getOwnPropertyDescriptor(globalThis, prop)?.writable;
        if (writable('window'))
            globalThis.window = thisWindow;
        if (writable('document'))
            globalThis.document = thisWindow.document;
        return dna.core.setup();
    },
    info() {
        const names = Object.keys(dna.template.db);
        const panels = globalThis.document.querySelectorAll('.dna-menu.dna-panels-initialized');
        return {
            version: dna.version,
            templates: names.length,
            clones: globalThis.document.querySelectorAll('.dna-clone:not(.dna-sub-clone)').length,
            subs: globalThis.document.querySelectorAll('.dna-sub-clone').length,
            names: names,
            store: dna.template.db,
            initializers: dna.events.db.initializers,
            panels: dna.dom.map(panels, panel => panel.dataset.menuNav),
            state: dna.dom.stateDepot,
        };
    },
    name: dnaName,
    selector: Object.fromEntries(Object.entries(dnaName).map(pair => [pair[0], '.' + pair[1]])),
    array: dnaArray,
    browser: dnaBrowser,
    pageToken: dnaPageToken,
    dom: dnaDom,
    ui: dnaUi,
    util: dnaUtil,
    format: dnaFormat,
    placeholder: dnaPlaceholder,
    panels: dnaPanels,
    compile: dnaCompile,
    template: dnaTemplate,
    events: dnaEvents,
    core: dnaCore,
};
dna.dom.onReady(dna.core.setup);
globalThis.dna = dna;
