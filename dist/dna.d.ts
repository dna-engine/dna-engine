//! dna.js v1.7.4 ~~ dnajs.org ~~ MIT License

/// <reference types="jquery" />
declare type DnaOptionsClone = {
    fade?: boolean;
    top?: boolean;
    clones?: number;
    html?: boolean;
    empty?: boolean;
    holder?: JQuery;
    container?: JQuery | null;
    transform?: DnaCallback | null;
    callback?: DnaCallback | null;
};
declare type DnaOptionsCloneSub = {
    fade?: boolean;
    top?: boolean;
};
declare type DnaOptionsGetModel = {
    main?: boolean;
};
declare type DnaOptionsEmpty = {
    fade?: boolean;
};
declare type DnaOptionsInsert = {
    fade?: boolean;
    html?: boolean;
    transform?: DnaCallback;
    callback?: DnaCallback;
};
declare type DnaOptionsRefresh = {
    data?: unknown;
    main?: boolean;
    html?: boolean;
};
declare type DnaOptionsRefreshAll = {
    data?: unknown;
    main?: boolean;
    html?: boolean;
};
declare type DnaOptionsRecount = {
    html?: boolean;
};
declare type DnaOptionsDestroy = {
    main?: boolean;
    fade?: boolean;
    callback?: DnaCallback | null;
};
declare type DnaOptionsGetClone = {
    main?: boolean;
};
declare type DnaOptionsGetIndex = {
    main?: boolean;
};
declare type DnaOptionsRegisterInitializer = {
    selector?: string | null;
    params?: DnaDataObject | unknown[] | null;
    onDocLoad?: boolean;
};
declare type DnaModel = unknown[] | Record<string | number, unknown>;
declare type DnaDataObject = Record<string | number, unknown>;
declare type DnaCallback = (arg1?: unknown, arg2?: unknown, arg3?: unknown, ...args: unknown[]) => unknown;
declare type DnaElemEventIndex = JQuery | JQuery.EventBase | number;
declare type DnaInitializer = {
    fn: DnaFunctionName | DnaCallback;
    selector: string | null;
    params: DnaDataObject | unknown[] | null;
};
declare type DnaTemplate = {
    name: string;
    elem: JQuery;
    container: JQuery;
    nested: boolean;
    separators: number;
    wrapped: boolean;
};
declare type DnaTemplateDb = {
    [name: string]: DnaTemplate;
};
declare type DnaContext = {
    [name: string]: Record<string, unknown> | DnaCallback;
};
declare type DnaFunctionName = string;
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
        berserk: (message: string, info: unknown) => void;
        plugin: () => void;
        setup: () => unknown;
    };
};
export { dna };
