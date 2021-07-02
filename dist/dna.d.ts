//! dna.js v1.8.3 ~~ dnajs.org ~~ MIT License

/// <reference types="jquery" />
export declare type DnaOptionsClone = {
    fade?: boolean;
    top?: boolean;
    clones?: number;
    html?: boolean;
    empty?: boolean;
    holder?: JQuery;
    container?: JQuery | null;
    formatter?: DnaFormatter | null;
    transform?: DnaCallback | null;
    callback?: DnaCallback | null;
};
export declare type DnaOptionsCloneSub = {
    fade?: boolean;
    top?: boolean;
};
export declare type DnaOptionsGetModel = {
    main?: boolean;
};
export declare type DnaOptionsEmpty = {
    fade?: boolean;
};
export declare type DnaOptionsInsert = {
    fade?: boolean;
    html?: boolean;
    transform?: DnaCallback;
    callback?: DnaCallback;
};
export declare type DnaOptionsRefresh = {
    data?: unknown;
    main?: boolean;
    html?: boolean;
};
export declare type DnaOptionsRefreshAll = {
    data?: unknown;
    main?: boolean;
    html?: boolean;
};
export declare type DnaOptionsRecount = {
    html?: boolean;
};
export declare type DnaOptionsDestroy = {
    main?: boolean;
    fade?: boolean;
    callback?: DnaCallback | null;
};
export declare type DnaOptionsGetClone = {
    main?: boolean;
};
export declare type DnaOptionsGetIndex = {
    main?: boolean;
};
export declare type DnaOptionsRegisterInitializer = {
    selector?: string | null;
    params?: DnaDataObject | unknown[] | null;
    onDocLoad?: boolean;
};
export declare type DnaPluginAction = 'bye' | 'clone-sub' | 'destroy' | 'down' | 'refresh' | 'up';
export declare type DnaModel = unknown[] | Record<string | number, unknown>;
export declare type DnaDataObject = Record<string | number, unknown>;
export declare type DnaFormatter = (value: DnaFormatterValue) => string;
export declare type DnaFormatterValue = number | string | boolean;
export declare type DnaMSec = number | string;
export declare type DnaCallback = (...args: unknown[]) => unknown;
export declare type DnaElemEventIndex = JQuery | JQuery.EventBase | number;
export declare type DnaInitializer = {
    fn: DnaFunctionName | DnaCallback;
    selector: string | null;
    params: DnaDataObject | unknown[] | null;
};
export declare type DnaTemplate = {
    name: string;
    elem: JQuery;
    container: JQuery;
    nested: boolean;
    separators: number;
    wrapped: boolean;
};
export declare type DnaTemplateDb = {
    [name: string]: DnaTemplate;
};
export declare type DnaTemplateName = string;
export declare type DnaContext = {
    [name: string]: Record<string, unknown> | DnaCallback;
};
export declare type DnaFieldName = string;
export declare type DnaFunctionName = string;
export declare type DnaClassName = string;
export declare type DnaAttrName = string;
export declare type DnaAttrItem = DnaAttrName | [string, DnaFieldName | 1 | 2, string];
export declare type DnaLoop = {
    name: string;
    field: DnaFieldName;
};
export declare type DnaRules = {
    template?: DnaTemplateName;
    array?: DnaFieldName;
    text?: boolean;
    val?: boolean;
    attrs?: DnaAttrItem[];
    props?: (string | DnaFieldName)[];
    option?: DnaFieldName;
    formatter?: DnaFormatter | null;
    transform?: DnaFunctionName;
    callback?: DnaFunctionName;
    class?: [DnaFieldName, DnaClassName, DnaClassName][];
    require?: DnaFieldName;
    missing?: DnaFieldName;
    true?: DnaFieldName;
    false?: DnaFieldName;
    loop?: DnaLoop;
};
declare const dna: {
    version: string;
    clone(name: string, data: DnaModel, options?: DnaOptionsClone | undefined): JQuery;
    cloneSub(holderClone: JQuery, arrayField: string, data: DnaModel, options?: DnaOptionsCloneSub | undefined): JQuery;
    createTemplate(name: string, html: string, holder: JQuery): DnaTemplate;
    templateExists(name: string): boolean;
    getModel(elemOrName: JQuery | string, options?: DnaOptionsGetModel | undefined): DnaModel | undefined;
    empty(name: string, options?: DnaOptionsEmpty | undefined): JQuery;
    insert(name: string, data: DnaModel, options?: DnaOptionsInsert | undefined): JQuery;
    refresh(clone: JQuery, options?: DnaOptionsRefresh | undefined): JQuery;
    refreshAll(name: string, options?: DnaOptionsRefreshAll | undefined): JQuery;
    updateField(inputElem: JQuery, value: unknown): JQuery;
    recount(clone: JQuery, options?: DnaOptionsRecount | undefined): JQuery;
    destroy(clone: JQuery, options?: DnaOptionsDestroy | undefined): JQuery;
    getClone(elem: JQuery, options?: DnaOptionsGetClone | undefined): JQuery;
    getClones(name: string): JQuery;
    getIndex(elem: JQuery, options?: DnaOptionsGetIndex | undefined): number;
    up(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallback | undefined): JQuery;
    down(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallback | undefined): JQuery;
    bye(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallback | undefined): JQuery;
    registerInitializer(fn: DnaCallback, options?: DnaOptionsRegisterInitializer | undefined): DnaInitializer[];
    clearInitializers(): DnaInitializer[];
    registerContext(contextName: string, contextObjOrFn: Record<string, unknown> | DnaCallback): DnaContext;
    initGlobal(thisWindow: Window & typeof globalThis, thisJQuery: JQueryStatic): unknown;
    info(): DnaDataObject;
    array: {
        find: (array: DnaDataObject[], value: unknown, key?: string) => {
            index: number;
            item?: DnaDataObject;
        };
        last: (array: unknown[]) => unknown | null;
        fromMap: (map: DnaDataObject, options?: {
            key?: string | undefined;
            kebabCodes?: boolean | undefined;
        } | undefined) => DnaDataObject[];
        toMap: (array: DnaDataObject[], options?: {
            key: string;
            camelKeys: boolean;
        } | undefined) => DnaDataObject;
        wrap: (itemOrItems: unknown) => unknown[];
    };
    browser: {
        getUrlParams: () => Record<string, string>;
    };
    pageToken: {
        put: (key: string, value: unknown) => unknown;
        get: (key: string, defaultValue: unknown) => unknown;
    };
    ui: {
        deleteElem: (elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallback | null | undefined) => JQuery;
        focus: (elem: JQuery) => JQuery;
        getAttrs: (elem: JQuery) => Attr[];
        getComponent: (elem: JQuery) => JQuery;
        pulse: (elem: JQuery, options?: {
            duration: number;
            interval: number;
            out: number;
        } | undefined) => JQuery;
        slideFade: (elem: JQuery, callback?: DnaCallback | null | undefined, show?: boolean | undefined) => JQuery;
        slideFadeIn: (elem: JQuery, callback?: DnaCallback | null | undefined) => JQuery;
        slideFadeOut: (elem: JQuery, callback?: DnaCallback | null | undefined) => JQuery;
        slideFadeToggle: (elem: JQuery, callback?: DnaCallback | null | undefined) => JQuery;
        slideFadeDelete: (elem: JQuery, callback?: DnaCallback | null | undefined) => JQuery;
        smoothHeightSetBaseline: (container: JQuery) => JQuery;
        smoothHeightAnimate: (delay: number, container: JQuery) => JQuery;
        smoothMove: (elem: JQuery, up?: boolean | undefined, callback?: DnaCallback | null | undefined) => JQuery;
        smoothMoveUp: (elem: JQuery, callback?: DnaCallback | null | undefined) => JQuery;
        smoothMoveDown: (elem: JQuery, callback?: DnaCallback | null | undefined) => JQuery;
        toElem: (elemOrEventOrIndex: DnaElemEventIndex, that?: unknown) => JQuery;
    };
    util: {
        apply: (fn: string | DnaCallback, params?: unknown | unknown[] | JQuery) => unknown;
        assign: (data: DnaDataObject, field: string | string[], value: unknown) => DnaDataObject;
        printf: (format: string, ...values: unknown[]) => string;
        realTruth: (value: unknown) => boolean;
        toCamel: (kebabStr: string) => string;
        toKebab: (camelStr: string) => string;
        value: (data: DnaDataObject, field: string | string[]) => unknown;
        isObj: (value: unknown) => boolean;
    };
    format: {
        getCurrencyFormatter(iso4217: string, units?: number): DnaFormatter;
        getDateFormatter(format: string): DnaFormatter;
        getNumberFormatter(format: string): DnaFormatter;
        getPercentFormatter(format: string): DnaFormatter;
    };
    placeholder: {
        setup: () => JQuery;
    };
    panels: {
        display: (menu: JQuery, location?: number | undefined, updateUrl?: boolean | undefined) => JQuery;
        clickRotate: (event: JQuery.EventBase) => JQuery;
        selectRotate: (event: JQuery.EventBase) => JQuery;
        initialize: (panelHolder: JQuery) => JQuery;
        setup: () => JQuery;
    };
    compile: {
        regex: {
            dnaField: RegExp;
            dnaBasePair: RegExp;
            dnaBasePairs: RegExp;
        };
        setupNucleotide: (elem: JQuery) => JQuery;
        isDnaField: (index: number, node: HTMLElement) => boolean;
        addFieldClass: (elem: JQuery) => JQuery;
        field: (index: number, node: HTMLElement) => void;
        propsAndAttrs: (index: number, node: HTMLElement) => void;
        getDataField: (elem: JQuery, type: string) => string;
        subTemplateName: (holder: JQuery | string, arrayField: string) => string;
        rules: (elems: JQuery, type: string, isLists?: boolean | undefined) => JQuery;
        separators: (elem: JQuery) => JQuery;
        template: (name: string) => DnaTemplate;
    };
    store: {
        getTemplateDb: () => DnaTemplateDb;
        stash: (elem: JQuery) => DnaTemplate;
        getTemplate: (name: string) => DnaTemplate;
    };
    events: {
        getContextDb: () => DnaContext;
        getInitializers: () => DnaInitializer[];
        runOnLoads: () => JQuery;
        runInitializers: (root: JQuery) => JQuery;
        setup: () => JQuery;
    };
    core: {
        inject: (clone: JQuery, data: DnaModel, count: number, settings: DnaOptionsClone) => JQuery;
        replicate: (template: DnaTemplate, data: DnaModel, settings: DnaOptionsClone) => JQuery;
        getArrayName: (subClone: JQuery) => string | null;
        updateArrayByName: (clone: JQuery, arrayField: string | null) => JQuery;
        updateArray: (subClone: JQuery) => JQuery;
        remove: (clone: JQuery, callback?: DnaCallback | null | undefined) => JQuery;
        assert: (ok: boolean | unknown, message: string, info: unknown) => void;
        plugin: () => void;
        setup: () => unknown;
    };
};
export { dna };
