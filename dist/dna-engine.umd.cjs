//! dna-engine v2.2.3 ~~ https://dna-engine.org ~~ MIT License

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dna = void 0;
    const dnaArray = {
        find: (array, value, key = 'code') => {
            const index = Array.isArray(array) ? array.findIndex(object => object[key] === value) : -1;
            const item = index === -1 ? null : array[index];
            return { index, item };
        },
        last: (array) => {
            return Array.isArray(array) ? array[array.length - 1] : undefined;
        },
        fromMap: (map, options) => {
            const defaults = { key: 'code', kebabCodes: false };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const codeValue = (key) => settings.kebabCodes ? dna.util.toKebab(key) : key;
            const toObj = (item) => dna.util.isObj(item) ? item : { value: item };
            return Object.keys(map).map(key => (Object.assign({ [settings.key]: codeValue(key) }, toObj(map[key]))));
        },
        toMap: (array, options) => {
            const defaults = { key: 'code', camelKeys: false };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const map = {};
            const addObj = (obj) => map[obj[settings.key]] = obj;
            const addObjCamelKey = (obj) => map[dna.util.toCamel(obj[settings.key])] = obj;
            array.forEach(settings.camelKeys ? addObjCamelKey : addObj);
            return map;
        },
        wrap: (itemOrItems) => {
            const isNothing = itemOrItems === null || itemOrItems === undefined;
            return isNothing ? [] : Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
        },
    };
    const dnaBrowser = {
        getUrlParams: () => {
            const params = {};
            const addParam = (parts) => params[parts[0]] = parts[1];
            const addPair = (pair) => pair && addParam(pair.split('='));
            globalThis.location.search.slice(1).split('&').forEach(addPair);
            return params;
        },
        userAgentData() {
            var _a;
            const polyfill = () => {
                var _a, _b, _c, _d, _e;
                const brandEntry = (_b = (_a = globalThis.navigator.userAgent.split(' ').pop()) === null || _a === void 0 ? void 0 : _a.split('/')) !== null && _b !== void 0 ? _b : [];
                const hasTouch = !!navigator.maxTouchPoints;
                const platform = globalThis.navigator.platform;
                const mac = hasTouch ? 'iOS' : 'macOS';
                const platforms = { 'MacIntel': mac, 'Win32': 'Windows', 'iPhone': 'iOS', 'iPad': 'iOS' };
                return {
                    brands: [{ brand: (_c = brandEntry === null || brandEntry === void 0 ? void 0 : brandEntry[0]) !== null && _c !== void 0 ? _c : '', version: (_d = brandEntry === null || brandEntry === void 0 ? void 0 : brandEntry[1]) !== null && _d !== void 0 ? _d : '' }],
                    mobile: hasTouch || /Android|iPhone|iPad|Mobi/i.test(globalThis.navigator.userAgent),
                    platform: (_e = platforms[platform]) !== null && _e !== void 0 ? _e : platform,
                };
            };
            return (_a = globalThis.navigator['userAgentData']) !== null && _a !== void 0 ? _a : polyfill();
        },
    };
    const dnaPageToken = {
        put: (key, value) => {
            globalThis.sessionStorage[key + globalThis.location.pathname] = JSON.stringify(value);
            return value;
        },
        get: (key, defaultValue) => {
            const value = globalThis.sessionStorage[key + globalThis.location.pathname];
            return value === undefined ? defaultValue : JSON.parse(value);
        },
    };
    const dnaUi = {
        deleteElem: function (elemOrEventOrIndex, callback) {
            const elem = dna.ui.toElem(elemOrEventOrIndex, this);
            return dna.core.remove(elem, callback);
        },
        focus: (elem) => {
            return elem.trigger('focus');
        },
        getAttrs: (elem) => {
            return elem[0] ? Object.values(elem[0].attributes) : [];
        },
        getComponent: (elem) => {
            return elem.closest('[data-component]');
        },
        pulse: (elem, options) => {
            const defaults = { duration: 400, interval: 0, out: 5000 };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const css = { hide: { opacity: 0 }, show: { opacity: 1 } };
            elem.stop(true).slideDown().css(css.hide).animate(css.show, settings.duration);
            if (settings.interval)
                elem.animate(css.show, settings.interval).animate(css.hide, settings.out);
            return elem;
        },
        slideFade: (elem, callback, show) => {
            const obscure = { opacity: 0, transition: 'opacity 0s' };
            const easeIn = { opacity: 1, transition: 'opacity 400ms' };
            const easeOut = { opacity: 0, transition: 'opacity 400ms' };
            const reset = { transition: 'opacity 0s' };
            const doEaseIn = () => elem.css(easeIn);
            const clearTransition = () => elem.css(reset);
            if (show && globalThis.setTimeout(doEaseIn, 200))
                elem.css(obscure).hide().delay(100).slideDown(callback || undefined);
            else
                elem.css(easeOut).delay(100).slideUp(callback || undefined);
            elem.delay(200).promise().then(clearTransition);
            return elem;
        },
        slideFadeIn: (elem, callback) => {
            return dna.ui.slideFade(elem, callback, true);
        },
        slideFadeOut: (elem, callback) => {
            return dna.ui.slideFade(elem, callback, false);
        },
        slideFadeToggle: (elem, callback) => {
            return dna.ui.slideFade(elem, callback, elem.is(':hidden'));
        },
        slideFadeDelete: (elem, callback) => {
            return dna.ui.slideFadeOut(elem, () => dna.ui.deleteElem(elem, callback));
        },
        smoothHeightSetBaseline: (container) => {
            const body = $('body');
            const elem = body.data().dnaCurrentContainer = container || body;
            const height = elem.outerHeight();
            return elem.css({ minHeight: height, maxHeight: height, overflow: 'hidden' });
        },
        smoothHeightAnimate: (delay, container) => {
            const elem = container || $('body').data().dnaCurrentContainer;
            const animate = () => {
                elem.css({ minHeight: 0, maxHeight: '100vh' });
                const turnOffTransition = () => elem.css({ transition: 'none', maxHeight: 'none' });
                globalThis.setTimeout(turnOffTransition, 1000);
            };
            globalThis.setTimeout(animate, delay || 50);
            const setAnimationLength = () => elem.css({ transition: 'all 1s' });
            globalThis.setTimeout(setAnimationLength, 10);
            return elem;
        },
        smoothMove: (elem, up, callback) => {
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
                globalThis.setTimeout(animate);
            };
            const submissiveElem = up ? elem.prev() : elem.next();
            if (submissiveElem.length)
                move();
            else if (fn)
                fn(elem);
            return elem;
        },
        smoothMoveUp: (elem, callback) => {
            return dna.ui.smoothMove(elem, true, callback);
        },
        smoothMoveDown: (elem, callback) => {
            return dna.ui.smoothMove(elem, false, callback);
        },
        toElem: (elemOrEventOrIndex, that) => {
            const elem = elemOrEventOrIndex instanceof $ && elemOrEventOrIndex;
            const target = elemOrEventOrIndex && elemOrEventOrIndex.target;
            return elem || $(target || elemOrEventOrIndex || that);
        },
    };
    const dnaUtil = {
        apply: (fn, params) => {
            const args = dna.array.wrap(params);
            const elem = args[0] instanceof $ ? args[0] : null;
            const isFnName = typeof fn === 'string' && fn.length > 0;
            if (elem && isFnName && !elem[fn])
                args.push(dna.ui.getComponent(elem));
            const applyByName = (name) => {
                const callback = dna.util.getFn(name);
                dna.core.assert(callback, 'Callback function not found', name);
                dna.core.assert(typeof callback === 'function', 'Callback is not a function', name);
                return callback.apply(elem, args);
            };
            return (elem === null || elem === void 0 ? void 0 : elem.length) === 0 ? elem :
                typeof fn === 'function' ? fn.apply(elem, args) :
                    (elem === null || elem === void 0 ? void 0 : elem[fn]) ? elem[fn](args[1], args[2], args[3]) :
                        isFnName ? applyByName(fn) :
                            fn === undefined ? null :
                                fn === null ? null :
                                    dna.core.assert(false, 'Invalid callback function', fn);
        },
        getFn(name) {
            var _a, _b;
            const fields = name.split('.');
            const tag = fields[0];
            const toValue = (null, eval);
            const callable = () => ['object', 'function'].includes(toValue('typeof ' + tag));
            const getContext = () => dna.registerContext(tag, toValue(tag));
            const getTop = () => callable() ? getContext()[tag] : undefined;
            const top = (_b = (_a = globalThis[tag]) !== null && _a !== void 0 ? _a : dna.events.getContextDb()[tag]) !== null && _b !== void 0 ? _b : getTop();
            const deep = (object, subfields) => !subfields.length ? object :
                !object ? undefined :
                    deep(object[subfields[0]], subfields.slice(1));
            return fields.length === 1 ? top : deep(top, fields.slice(1));
        },
        assign: (data, field, value) => {
            const fields = typeof field === 'string' ? field.split('.') : field;
            const name = fields[0];
            const dataObj = $.isPlainObject(data) ? data : {};
            const nestedData = () => dataObj[name] === undefined ? dataObj[name] = {} : dataObj[name];
            if (fields.length === 1)
                dataObj[name] = value;
            else
                dna.util.assign(nestedData(), fields.slice(1), value);
            return dataObj;
        },
        printf: (format, ...values) => {
            return values.reduce((output, value) => output.replace(/%s/, String(value)), format);
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
        value: (data, field) => {
            if (typeof field === 'string')
                field = field.split('.');
            return data === null || data === undefined || field === undefined ? null :
                field.length === 1 ? data[field[0]] :
                    dna.util.value(data[field[0]], field.slice(1));
        },
        isObj: (value) => {
            return !!value && typeof value === 'object' && !Array.isArray(value);
        },
    };
    const dnaFormat = {
        getCurrencyFormatter(iso4217, units = 1) {
            const currency = { style: 'currency', currency: iso4217.toUpperCase() };
            const formatter = new Intl.NumberFormat([], currency).format;
            return (value) => formatter(Number(value) / units);
        },
        getDateFormatter(format) {
            const twoDigit = (value) => String(value).padStart(2, '0');
            const generalDate = (date) => `${date.getFullYear()}-${twoDigit(date.getMonth() + 1)}-${twoDigit(date.getDate())}`;
            const generalTime = (date) => date.toLocaleString([], { hour: 'numeric', minute: '2-digit' }).replace(' ', '').toLowerCase();
            const generalDay = (date) => date.toLocaleString([], { weekday: 'short' });
            const generalTimestamp = (date) => generalDate(date) + ' ' + generalTime(date) + ' ' + generalDay(date);
            const timestamp = (date) => date.toISOString().replace('T', '@').slice(0, -5);
            const timestampMs = (date) => date.toISOString().replace('T', '@').slice(0, -1);
            const dateFormatters = {
                date: (msec) => new Date(msec).toDateString(),
                general: (msec) => generalTimestamp(new Date(msec)),
                generalDate: (msec) => generalDate(new Date(msec)),
                generalDay: (msec) => generalDay(new Date(msec)),
                generalTime: (msec) => generalTime(new Date(msec)),
                iso: (msec) => new Date(msec).toISOString(),
                locale: (msec) => new Date(msec).toLocaleString(),
                localeDate: (msec) => new Date(msec).toLocaleDateString(),
                localeTime: (msec) => new Date(msec).toLocaleTimeString(),
                string: (msec) => new Date(msec).toString(),
                time: (msec) => new Date(msec).toTimeString(),
                timestamp: (msec) => timestamp(new Date(msec)),
                timestampMs: (msec) => timestampMs(new Date(msec)),
                utc: (msec) => new Date(msec).toUTCString(),
            };
            const formatter = dateFormatters[dna.util.toCamel(format)];
            dna.core.assert(formatter, 'Unknown date format code', format);
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
            const percent = {
                style: 'percent',
                minimumFractionDigits: digits,
                maximumFractionDigits: digits,
            };
            return new Intl.NumberFormat([], percent).format;
        },
        getFormatter(fn) {
            return (value, data) => String(dna.util.apply(fn, [value, data]));
        },
    };
    const dnaPlaceholder = {
        setup: () => {
            $('option.dna-template').closest('select').addClass('dna-hide');
            const fade = (elem) => dna.getClones(elem.stop(true).data().placeholder).length ? elem.fadeOut() : elem.fadeIn();
            return $('[data-placeholder]').forEach(fade);
        },
    };
    const dnaPanels = {
        display: (menu, location, updateUrl) => {
            const panels = menu.data().dnaPanels;
            const navName = menu.data().nav;
            const menuItems = menu.find('.menu-item');
            const bound = (loc) => Math.max(0, Math.min(loc, menuItems.length - 1));
            const index = bound(location === undefined ? dna.pageToken.get(navName, 0) : location);
            const dropDownElemType = 'SELECT';
            if (menu[0].nodeName === dropDownElemType)
                menu[0].selectedIndex = index;
            menuItems.removeClass('selected').addClass('unselected');
            menuItems.eq(index).addClass('selected').removeClass('unselected');
            panels.hide().removeClass('displayed').addClass('hidden');
            const panel = panels.eq(index).fadeIn().addClass('displayed').removeClass('hidden');
            const hash = panel.data().hash;
            dna.pageToken.put(navName, index);
            if (updateUrl && hash)
                globalThis.history.pushState(null, '', '#' + hash);
            dna.util.apply(menu.data().callback, [panel, hash]);
            return panel;
        },
        clickRotate: (event) => {
            const item = $(event.target).closest('.menu-item');
            const menu = item.closest('.dna-menu');
            return dna.panels.display(menu, menu.find('.menu-item').index(item), true);
        },
        selectRotate: (event) => {
            const menu = $(event.target);
            return dna.panels.display(menu, menu.find('option:selected').index(), true);
        },
        initialize: (panelHolder) => {
            const initialized = 'dna-panels-initialized';
            const generateNavName = () => {
                const navName = 'dna-panels-' + $('body').data().dnaPanelNextNav++;
                panelHolder.attr('data-nav', navName).prev('.dna-menu').attr('data-nav', navName);
                return navName;
            };
            const init = () => {
                const navName = panelHolder.data().nav || generateNavName();
                const menu = $('.dna-menu[data-nav=' + navName + ']').addClass(initialized);
                const panels = panelHolder.addClass(initialized).children().addClass('panel');
                const hash = globalThis.location.hash.replace(/[^\w-]/g, '');
                const hashIndex = () => panels.filter('[data-hash=' + hash + ']').index();
                const savedIndex = () => dna.pageToken.get(navName, 0);
                const loc = hash && panels.first().data().hash ? hashIndex() : savedIndex();
                dna.core.assert(menu.length, 'Menu not found for panels', navName);
                menu.data().dnaPanels = panels;
                if (!menu.find('.menu-item').length)
                    menu.children().addClass('menu-item');
                dna.panels.display(menu, loc);
            };
            const isInitialized = !panelHolder.length || panelHolder.hasClass(initialized);
            if (!isInitialized && !panelHolder.children().hasClass('dna-template'))
                init();
            return panelHolder;
        },
        setup: () => {
            $('body').data().dnaPanelNextNav = 1;
            const panels = $('.dna-panels').forEach(dna.panels.initialize);
            $(globalThis.document).on({ click: dna.panels.clickRotate }, '.dna-menu .menu-item');
            $(globalThis.document).on({ change: dna.panels.selectRotate }, '.dna-menu');
            return panels;
        },
    };
    const dnaCompile = {
        regex: {
            dnaField: /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,
            dnaBasePair: /~~|{{|}}/,
            dnaBasePairs: /~~|\{\{|\}\}/g,
        },
        setupNucleotide: (elem) => {
            if (!elem.data().dnaRules)
                elem.data().dnaRules = {};
            return elem.addClass('dna-nucleotide');
        },
        isDnaField: (index, node) => {
            const firstNode = node.childNodes[0];
            const matches = () => { var _a; return !!((_a = firstNode.nodeValue) === null || _a === void 0 ? void 0 : _a.match(dna.compile.regex.dnaField)); };
            return firstNode && !!firstNode.nodeValue && matches();
        },
        addFieldClass: (elem) => {
            const field = elem.data().dnaField;
            const htmlCase = () => dna.util.toKebab(field).replace(/[[\]]/g, '').replace(/[.]/g, '-');
            return field ? elem.addClass('dna-field-' + htmlCase()) : elem;
        },
        field: (elem) => {
            dna.compile.setupNucleotide(elem);
            elem.data().dnaField = elem.text().replace(dna.compile.regex.dnaBasePairs, '').trim();
            dna.compile.addFieldClass(elem);
            if (elem.is('textarea'))
                elem.addClass('dna-update-model').data().dnaRules.val = true;
            else
                elem.data().dnaRules.text = true;
            elem.empty();
        },
        propsAndAttrs: (elem) => {
            const props = [];
            const attrs = [];
            const names = [];
            const compileProp = (key, value) => {
                names.push(key);
                key = key.replace(/^data-prop-/, '').toLowerCase();
                value = value.replace(dna.compile.regex.dnaBasePairs, '');
                props.push(key, value);
                if (key === 'checked' && elem.is('input'))
                    elem.addClass('dna-update-model').data().dnaField = value;
            };
            const compileAttr = (key, value) => {
                const parts = value.split(dna.compile.regex.dnaBasePair);
                if (parts[1] === '[count]')
                    parts[1] = 1;
                else if (parts[1] === '[value]')
                    parts[1] = 2;
                attrs.push(key.replace(/^data-attr-/, ''), parts);
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
            const compile = (attr) => {
                if (/^data-prop-/.test(attr.name))
                    compileProp(attr.name, attr.value);
                else if (attr.value.split(dna.compile.regex.dnaBasePair).length === 3)
                    compileAttr(attr.name, attr.value);
            };
            dna.ui.getAttrs(elem).forEach(compile);
            const getRules = () => dna.compile.setupNucleotide(elem).data().dnaRules;
            if (props.length > 0)
                getRules().props = props;
            if (attrs.length > 0)
                getRules().attrs = attrs;
            if (elem.data().formatCurrency)
                getRules().formatter = dnaFormat.getCurrencyFormatter(elem.data().formatCurrency);
            if (elem.data().formatCurrency100)
                getRules().formatter = dnaFormat.getCurrencyFormatter(elem.data().formatCurrency100, 100);
            if (elem.data().formatCurrency1000)
                getRules().formatter = dnaFormat.getCurrencyFormatter(elem.data().formatCurrency100, 1000);
            if (elem.data().formatDate)
                getRules().formatter = dnaFormat.getDateFormatter(elem.data().formatDate);
            if (elem.data().formatNumber)
                getRules().formatter = dnaFormat.getNumberFormatter(elem.data().formatNumber);
            if (elem.data().formatPercent)
                getRules().formatter = dnaFormat.getPercentFormatter(elem.data().formatPercent);
            if (elem.data().format)
                getRules().formatter = dnaFormat.getFormatter(elem.data().format);
            if (elem.data().transform)
                getRules().transform = elem.data().transform;
            if (elem.data().callback)
                getRules().callback = elem.data().callback;
            dna.compile.addFieldClass(elem);
            elem.removeAttr(names.join(' '));
        },
        getDataField: (elem, type) => {
            return elem.data(type).replace(dna.compile.regex.dnaBasePairs, '').trim();
        },
        subTemplateName: (holder, arrayField, index) => {
            const getRules = () => dna.getClone(holder, { main: true }).data().dnaRules;
            const templateName = holder instanceof $ ? getRules().template : holder;
            return templateName + '-' + arrayField + '--' + String(index);
        },
        rules: (elems, type, isLists) => {
            const addRule = (elem) => {
                dna.compile.setupNucleotide(elem);
                const field = dna.compile.getDataField(elem, type);
                const makeLists = () => field.split(';').map((list) => list.split(','));
                elem.data().dnaRules[type] = isLists ? makeLists() : field;
            };
            return elems.filter('[data-' + type + ']').forEach(addRule).removeAttr('data-' + type);
        },
        separators: (elem) => {
            const isWhitespaceNode = (index, node) => node.nodeType === 3 && !/\S/.test(node.nodeValue);
            const append = (templateElem, text, className) => {
                const doAppend = () => {
                    templateElem.contents().last().filter(isWhitespaceNode).remove();
                    templateElem.append($('<span>').addClass(className).html(text));
                };
                return text && doAppend();
            };
            const processTemplate = (elem) => {
                append(elem, elem.data().separator, 'dna-separator');
                append(elem, elem.data().lastSeparator, 'dna-last-separator');
            };
            const clones = elem.find('.dna-template, .dna-sub-clone').addBack();
            clones.forEach(processTemplate);
            return clones;
        },
        template: (name) => {
            const elem = $('#' + name);
            dna.core.assert(elem.length, 'Template not found', name);
            const saveName = (elem) => elem.data().dnaRules = { template: elem.attr('id'), subs: [] };
            const initSubs = (elem) => elem.data().dnaRules.subs = [];
            elem.find('.dna-template').addBack().forEach(saveName).removeAttr('id').forEach(initSubs);
            const elems = elem.find('*').addBack();
            elems.filter(dna.compile.isDnaField).forEach(dna.compile.field).addClass('dna-field');
            dna.compile.rules(elems, 'array').addClass('dna-sub-clone').forEach(initSubs);
            dna.compile.rules(elems, 'class', true);
            dna.compile.rules(elems, 'require');
            dna.compile.rules(elems, 'missing');
            dna.compile.rules(elems, 'true');
            dna.compile.rules(elems, 'false');
            elems.forEach(dna.compile.propsAndAttrs);
            dna.compile.separators(elem);
            const setTypeAttr = (inputElem) => inputElem.attr({ type: inputElem.data().attrType });
            $('input[data-attr-type]').forEach(setTypeAttr);
            return dna.store.stash(elem);
        },
    };
    const dnaStore = {
        getTemplateDb: () => {
            const store = $('body').data();
            const initStore = () => store.dnaTemplateDb = {};
            return store.dnaTemplateDb || initStore();
        },
        stash: (elem) => {
            const name = elem.data().dnaRules.template;
            const move = (elem) => {
                const name = elem.data().dnaRules.template;
                const container = elem.parent();
                const wrapped = container.children().length === 1 && !container.hasClass('dna-container');
                const compileSiblings = () => {
                    container.data().dnaContents = true;
                    const templateName = (node) => {
                        const elem = $(node);
                        const compileToName = (id) => id ? dna.compile.template(id).name : name;
                        return elem.hasClass('dna-template') ? compileToName(elem.attr('id')) :
                            elem.hasClass('dna-sub-clone') ? elem.data().dnaRules.template : false;
                    };
                    container.data().dnaContents = container.children().toArray().map(templateName);
                };
                if (!wrapped && !container.data().dnaContents)
                    compileSiblings();
                const template = {
                    name: name,
                    elem: elem,
                    container: container.addClass('dna-container').addClass('dna-contains-' + name),
                    nested: container.closest('.dna-clone').length !== 0,
                    separators: elem.find('.dna-separator, .dna-last-separator').length,
                    wrapped: wrapped,
                };
                dna.store.getTemplateDb()[name] = template;
                elem.removeClass('dna-template').addClass('dna-clone').addClass(name).detach();
            };
            const prepLoop = (elem) => {
                const rules = elem.data().dnaRules;
                const parent = dna.compile.setupNucleotide(elem.parent()).addClass('dna-array');
                const containerRules = parent.closest('.dna-clone, .dna-sub-clone').data().dnaRules;
                const index = containerRules.subs.length;
                rules.template = dna.compile.subTemplateName(name, rules.array, index);
                parent.data().dnaRules.loop = { name: rules.template, field: rules.array };
                containerRules.subs.push(rules.array);
            };
            elem.find('.dna-template').addBack().forEach(move);
            elem.find('.dna-sub-clone').forEach(prepLoop).forEach(move);
            return dna.store.getTemplateDb()[name];
        },
        getTemplate: (name) => {
            return dna.store.getTemplateDb()[name] || dna.compile.template(name);
        },
    };
    const dnaEvents = {
        getContextDb: () => {
            const store = $('body').data();
            const initStore = () => store.dnaContextDb = {};
            return store.dnaContextDb || initStore();
        },
        getInitializers: () => {
            const store = $('body').data() || {};
            const initStore = () => store.dnaInitializers = [];
            return store.dnaInitializers || initStore();
        },
        runOnLoads(options) {
            const defaults = { pollInterval: 200, maxWait: 5000 };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const abortTime = Date.now() + settings.maxWait;
            const elems = $('[data-on-load]').not('.dna-loaded');
            const fns = elems.toArray().map(node => $(node).data().onLoad);
            const run = (elem) => dna.util.apply(elem.data().onLoad, elem);
            const runAll = () => elems.forEach(run).addClass('dna-loaded');
            return new Promise((resolve) => {
                const waitForScripts = () => {
                    while (fns.length && dna.util.getFn(fns[0]))
                        fns.shift();
                    if (!fns.length || Date.now() > abortTime)
                        return resolve(runAll());
                    globalThis.setTimeout(waitForScripts, settings.pollInterval);
                };
                waitForScripts();
            });
        },
        runInitializers: (root) => {
            const init = (initializer) => {
                const find = (selector) => root.find(selector).addBack(selector);
                const elems = initializer.selector ? find(initializer.selector) : root;
                const params = [elems.addClass('dna-initialized'), ...dna.array.wrap(initializer.params)];
                dna.util.apply(initializer.fn, params);
            };
            dna.events.getInitializers().forEach(init);
            return root;
        },
        setup: () => {
            const runner = (elem, type, event) => {
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
            const handleEvent = (event) => {
                const target = $(event.target);
                const updateField = (elem, calc) => dna.util.assign(dna.getModel(elem), elem.data().dnaField, calc(elem));
                const getValue = (elem) => elem.val();
                const isChecked = (elem) => elem.is(':checked');
                const updateOption = (elem) => updateField(elem, isChecked);
                const updateModel = () => {
                    const mainClone = dna.getClone(target, { main: true });
                    if (mainClone.length === 0) {
                        return;
                    }
                    if (target.is('input:checkbox'))
                        updateField(target, isChecked);
                    else if (target.is('input:radio'))
                        $('input:radio[name=' + target.attr('name') + ']').forEach(updateOption);
                    else if (target.data().dnaRules.val)
                        updateField(target, getValue);
                    dna.refresh(mainClone);
                };
                if (target.hasClass('dna-update-model'))
                    updateModel();
                return runner(target, event.type.replace('key', 'key-'), event);
            };
            const handleEnterKey = (event) => {
                return event.key === 'Enter' && runner($(event.target), 'enter-key', event);
            };
            const handleSmartUpdate = (event) => {
                const defaultThrottle = 1000;
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
                        data.dnaTimeoutId = globalThis.setTimeout(doCallback, throttle);
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
                    globalThis.setTimeout(checkForValueChange);
                };
                if (data.smartUpdate)
                    processSmartUpdate();
            };
            const jumpToUrl = (event) => {
                var _a;
                const elem = $(event.target).closest('[data-href]');
                const useSameTab = dna.browser.userAgentData().mobile;
                const target = elem.closest('.external-site').length ? '_blank' : '_self';
                globalThis.open(elem.data().href, useSameTab ? '_self' : (_a = elem.data().target) !== null && _a !== void 0 ? _a : target);
            };
            const makeEventHandler = (type) => (event) => runner($(event.target), type, event);
            const events = {
                click: handleEvent,
                change: handleEvent,
                keydown: handleEvent,
                keypress: handleEvent,
                keyup: handleEvent,
                input: handleEvent,
            };
            const smartUpdateEvents = {
                keydown: handleSmartUpdate,
                keyup: handleSmartUpdate,
                change: handleSmartUpdate,
                cut: handleSmartUpdate,
                paste: handleSmartUpdate,
            };
            $(globalThis.document)
                .on(events)
                .on(smartUpdateEvents)
                .on({ keyup: handleEnterKey })
                .on({ click: jumpToUrl }, '[data-href]')
                .on({ focusin: makeEventHandler('focus-in') }, '[data-focus-in]')
                .on({ focusout: makeEventHandler('focus-out') }, '[data-focus-out]')
                .on({ mouseenter: makeEventHandler('hover-in') }, '[data-hover-in]')
                .on({ mouseleave: makeEventHandler('hover-out') }, '[data-hover-out]');
            return dna.events.runOnLoads();
        },
    };
    const dnaCore = {
        inject: (clone, data, count, settings) => {
            const injectField = (elem, field, dnaRules) => {
                const value = field === '[count]' ? count : field === '[value]' ? data :
                    dna.util.value(data, field);
                const formatted = () => dnaRules.formatter ?
                    dnaRules.formatter(value, data) : String(value);
                if (['string', 'number', 'boolean'].includes(typeof value))
                    elem = settings.html ? elem.html(formatted()) : elem.text(formatted());
            };
            const injectValue = (elem, field) => {
                const value = field === '[count]' ? count : field === '[value]' ? data :
                    dna.util.value(data, field);
                if (value !== null && value !== elem.val())
                    elem.val(String(value));
            };
            const injectProps = (elem, props) => {
                for (let prop = 0; prop < props.length / 2; prop++)
                    elem.prop(props[prop * 2], dna.util.realTruth(dna.util.value(data, props[prop * 2 + 1])));
            };
            const injectAttrs = (elem, dnaRules) => {
                const attrs = dnaRules.attrs;
                const inject = (key, parts) => {
                    const field = parts[1];
                    const core = field === 1 ? count : field === 2 ? data : dna.util.value(data, field);
                    const value = [parts[0], core, parts[2]].join('');
                    const formatted = dnaRules.formatter ?
                        dnaRules.formatter(value, data) : value;
                    elem.attr(key, formatted);
                    if (/^data-./.test(key))
                        elem.data(key.substring(5), formatted);
                    if (key === 'value' && value !== elem.val())
                        elem.val(value);
                };
                for (let i = 0; i < attrs.length / 2; i++)
                    inject(attrs[i * 2], attrs[i * 2 + 1]);
            };
            const injectClass = (elem, classLists) => {
                const process = (classList) => {
                    const value = dna.util.value(data, classList[0]);
                    const truth = dna.util.realTruth(value);
                    const setBooleanClasses = () => {
                        elem.toggleClass(classList[1], truth);
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
            const fieldExists = (fieldName) => {
                const value = dna.util.value(data, fieldName);
                return value !== undefined && value !== null;
            };
            const processLoop = (elem, loop) => {
                const dataArray = dna.util.value(data, loop.field);
                const subClones = elem.children('.' + loop.name.replace(/[.]/g, '\\.'));
                const injectSubClone = (elem, index) => {
                    if (!elem.is('option'))
                        dna.core.inject(elem, dataArray[index], index + 1, settings);
                };
                const rebuildSubClones = () => {
                    subClones.remove();
                    dna.clone(loop.name, dataArray, { container: elem, html: !!settings.html });
                };
                if (!dataArray)
                    (data[loop.field]) = [];
                else if (dataArray.length === subClones.length)
                    subClones.forEach(injectSubClone);
                else
                    rebuildSubClones();
            };
            const process = (elem) => {
                const dnaRules = elem.data().dnaRules;
                if (dnaRules.transform)
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
            const dig = (elems) => {
                elems.filter('.dna-nucleotide').forEach(process);
                if (elems.length)
                    dig(elems.children().not('.dna-sub-clone'));
            };
            if (settings.transform)
                settings.transform(data);
            dig(clone);
            clone.data().dnaModel = data;
            clone.data().dnaCount = count;
            return clone;
        },
        replicate: (template, data, settings) => {
            const displaySeparators = () => {
                const clones = container.children('.' + template.name);
                clones.find('.dna-separator').show().end().last().find('.dna-separator').hide();
                clones.find('.dna-last-separator').hide().end().eq(-2).find('.dna-last-separator').show()
                    .closest('.dna-clone').find('.dna-separator').hide();
            };
            const selector = '.dna-contains-' + template.name.replace(/[.]/g, '\\.');
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
                    const index = contents.indexOf(template.name);
                    const adjustment = (clonesAbove, name) => clonesAbove + (name && contents.indexOf(name) < index ?
                        allClones.filter('.' + name).length - 1 : 0);
                    const target = container.children().eq(index + contents.reduce(adjustment, 0));
                    return target.length ? target.before(clone) : container.append(clone);
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
        getArrayName: (subClone) => {
            return subClone.hasClass('dna-sub-clone') ? subClone.data().dnaRules.array : null;
        },
        updateModelArray: (container) => {
            dna.core.assert(container.hasClass('dna-array'), 'Invalid array container', container.attr('class'));
            const array = container.data().dnaRules.loop;
            const subs = container.children('.' + array.name);
            const model = dna.getModel(container);
            const nodeToModel = (node) => dna.getModel($(node));
            model[array.field] = subs.toArray().map(nodeToModel);
            return container;
        },
        remove: (clone, callback) => {
            const container = clone.parent();
            clone.detach();
            if (clone.hasClass('dna-sub-clone'))
                dna.core.updateModelArray(container);
            dna.placeholder.setup();
            clone.remove();
            if (callback)
                callback(clone, dna.getModel(clone));
            return clone;
        },
        assert: (ok, message, info) => {
            try {
                if (!ok)
                    throw Error('[dna-engine] ' + message + ': ' + String(info));
            }
            catch (e) {
                console.error(e.stack);
                throw Error(e.message);
            }
        },
        plugin: () => {
            $.fn.forEach = function (fn) {
                const elems = this;
                return elems.each((index, node) => fn($(node), index));
            };
            $.fn.dna = function (action, ...params) {
                const elems = this;
                const dnaApi = dna[dna.util.toCamel(action)];
                dna.core.assert(dnaApi, 'Unknown plugin action', action);
                const callApi = (elem) => dnaApi(elem, ...params);
                return elems.forEach(callApi);
            };
        },
        setup: () => {
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
        version: '2.2.3',
        clone(name, data, options) {
            const defaults = {
                fade: false,
                top: false,
                container: null,
                empty: false,
                clones: 1,
                html: false,
                transform: null,
                callback: null,
            };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const template = dna.store.getTemplate(name);
            const missing = template.nested && !settings.container;
            dna.core.assert(!missing, 'Container missing for nested template', name);
            if (settings.empty)
                dna.empty(name);
            const list = [].concat(...Array(settings.clones).fill(data));
            let clones = $();
            const addClone = (model) => clones = clones.add(dna.core.replicate(template, model, settings));
            list.forEach(addClone);
            dna.placeholder.setup();
            dna.panels.initialize(clones.first().closest('.dna-panels'));
            clones.first().parents('.dna-hide').removeClass('dna-hide').addClass('dna-unhide');
            return clones;
        },
        arrayPush(holderClone, arrayField, data, options) {
            const cloneSub = (field, index) => {
                const clone = () => {
                    const name = dna.compile.subTemplateName(holderClone, arrayField, index);
                    const selector = '.dna-contains-' + name;
                    const settings = { container: holderClone.find(selector).addBack(selector) };
                    dna.clone(name, data, Object.assign(Object.assign({}, settings), options));
                    dna.core.updateModelArray(settings.container);
                };
                if (field === arrayField)
                    clone();
            };
            holderClone.data().dnaRules.subs.forEach(cloneSub);
            return holderClone;
        },
        createTemplate(name, html, holder) {
            $(html).attr({ id: name }).addClass('dna-template').appendTo(holder);
            return dna.store.getTemplate(name);
        },
        templateExists(name) {
            return !!dna.store.getTemplateDb()[name] || $('.dna-template#' + name).length > 0;
        },
        getModel(elemOrName, options) {
            const getOne = (elem) => dna.getClone($(elem), options).data('dnaModel');
            const getAll = (name) => dna.getClones(name).toArray().map(node => getOne($(node)));
            return typeof elemOrName === 'string' ? getAll(elemOrName) : getOne(elemOrName);
        },
        empty(name, options) {
            const defaults = { fade: false, callback: null };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const template = dna.store.getTemplate(name);
            const clones = template.container.children('.dna-clone');
            if (template.container.data().dnaCountsMap)
                template.container.data().dnaCountsMap[name] = 0;
            const fadeDelete = () => dna.ui.slideFadeDelete(clones, settings.callback);
            return settings.fade ? fadeDelete() : dna.core.remove(clones, settings.callback);
        },
        insert(name, data, options) {
            const clone = dna.getClones(name).first();
            return clone.length ? dna.refresh(clone, { data: data, html: !!(options === null || options === void 0 ? void 0 : options.html) }) :
                dna.clone(name, data, options);
        },
        refresh(clone, options) {
            const defaults = { html: false };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const elem = dna.getClone(clone, options);
            const data = settings.data ? settings.data : dna.getModel(elem);
            return dna.core.inject(elem, data, elem.data().dnaCount, settings);
        },
        refreshAll(name, options) {
            const clones = dna.getClones(name);
            const refresh = (node) => { dna.refresh($(node), options); };
            clones.toArray().forEach(refresh);
            return clones;
        },
        updateField(inputElem, value) {
            const field = inputElem.data() && inputElem.data().dnaField;
            const update = () => {
                if (inputElem.is('input:checkbox'))
                    inputElem.prop('checked', !!value);
                else if (inputElem.is('input:radio'))
                    inputElem.prop('checked', !!value);
                else if (inputElem.is('input, select, textarea'))
                    inputElem.val(String(value));
                const model = dna.getModel(inputElem);
                model[field] = value;
            };
            if (field)
                update();
            return inputElem;
        },
        recount(clone, options) {
            clone = dna.getClone(clone);
            const renumber = () => {
                const name = clone.data().dnaRules.template;
                const update = (elem, index) => {
                    elem.data().dnaCount = index + 1;
                    dna.refresh(elem, options);
                };
                const container = clone.parent();
                const clones = container.children('.dna-clone.' + name).forEach(update);
                container.data().dnaCountsMap = container.data().dnaCountsMap || {};
                container.data().dnaCountsMap[name] = clones.length;
            };
            if (clone.length)
                renumber();
            return clone;
        },
        destroy(clone, options) {
            const defaults = { main: false, fade: false, callback: null };
            const settings = Object.assign(Object.assign({}, defaults), options);
            clone = dna.getClone(clone, options);
            const arrayField = dna.core.getArrayName(clone);
            if (arrayField)
                dna.getModel(clone.parent())[arrayField].splice(dna.getIndex(clone), 1);
            const fadeDelete = () => dna.ui.slideFadeDelete(clone, settings.callback);
            return settings.fade ? fadeDelete() : dna.core.remove(clone, settings.callback);
        },
        getClone(elem, options) {
            const defaults = { main: false };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const selector = settings.main ? '.dna-clone:not(.dna-sub-clone)' : '.dna-clone';
            return elem instanceof $ ? elem.closest(selector) : $();
        },
        getClones(name) {
            return dna.store.getTemplate(name).container.children('.dna-clone.' + name);
        },
        getIndex(elem, options) {
            const clone = dna.getClone(elem, options);
            return clone.parent().children('.dna-clone.' + clone.data().dnaRules.template).index(clone);
        },
        up(elemOrEventOrIndex, callback) {
            const elem = dna.ui.toElem(elemOrEventOrIndex, this);
            return dna.ui.smoothMoveUp(dna.getClone(elem), callback);
        },
        down(elemOrEventOrIndex, callback) {
            const elem = dna.ui.toElem(elemOrEventOrIndex, this);
            return dna.ui.smoothMoveDown(dna.getClone(elem), callback);
        },
        bye(elemOrEventOrIndex, callback) {
            const elem = dna.ui.toElem(elemOrEventOrIndex, this);
            const fn = typeof callback === 'function' ? callback : null;
            return dna.destroy(elem, { fade: true, callback: fn });
        },
        registerInitializer(fn, options) {
            const defaults = { selector: null, params: null, onDocLoad: true };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const rootSelector = settings.selector;
            const onDocLoadElems = () => !rootSelector ? $(globalThis.document) :
                $(rootSelector).not('.dna-template').not(rootSelector).addClass('dna-initialized');
            if (settings.onDocLoad)
                dna.util.apply(fn, [onDocLoadElems(), ...dna.array.wrap(settings.params)]);
            const initializer = { fn: fn, selector: rootSelector, params: settings.params };
            dna.events.getInitializers().push(initializer);
            return dna.events.getInitializers();
        },
        clearInitializers() {
            return dna.events.getInitializers().splice(0);
        },
        registerContext(contextName, contextObjOrFn) {
            dna.events.getContextDb()[contextName] = contextObjOrFn;
            return dna.events.getContextDb();
        },
        initGlobal(thisWindow, thisJQuery) {
            const jQuery$ = String('$');
            thisWindow[jQuery$] = thisJQuery;
            thisWindow['dna'] = dna;
            const writable = (prop) => { var _a; return !globalThis[prop] || !!((_a = Object.getOwnPropertyDescriptor(globalThis, prop)) === null || _a === void 0 ? void 0 : _a.writable); };
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
        info() {
            const names = Object.keys(dna.store.getTemplateDb());
            const panels = $('.dna-menu.dna-panels-initialized');
            return {
                version: dna.version,
                templates: names.length,
                clones: $('.dna-clone:not(.dna-sub-clone)').length,
                subs: $('.dna-sub-clone').length,
                names: names,
                store: dna.store.getTemplateDb(),
                initializers: dna.events.getInitializers(),
                panels: panels.toArray().map(elem => $(elem).attr('data-nav')),
            };
        },
        array: dnaArray,
        browser: dnaBrowser,
        pageToken: dnaPageToken,
        ui: dnaUi,
        util: dnaUtil,
        format: dnaFormat,
        placeholder: dnaPlaceholder,
        panels: dnaPanels,
        compile: dnaCompile,
        store: dnaStore,
        events: dnaEvents,
        core: dnaCore,
    };
    exports.dna = dna;
    dna.core.setup();
});
