//! dna-engine v2.3.1 ~~ https://dna-engine.org ~~ MIT License

/// <reference types="jquery" />
export type Json = string | number | boolean | null | undefined | JsonObject | Json[];
export type JsonObject = {
    [key: string]: Json;
};
export type JsonData = JsonObject | Json[];
export type NavigatorUAData = {
    readonly brands: {
        brand: string;
        version: string;
    }[];
    readonly mobile: boolean;
    readonly platform: string;
};
export type DnaOptionsClone<T> = {
    fade?: boolean;
    top?: boolean;
    clones?: number;
    html?: boolean;
    empty?: boolean;
    holder?: JQuery;
    container?: JQuery | null;
    formatter?: DnaFormatter | null;
    transform?: DnaTransformFn<T> | null;
    callback?: DnaCallbackFn<T> | null;
};
export type DnaSettingsArrayPush = {
    fade: boolean;
    top: boolean;
};
export type DnaOptionsArrayPush = Partial<DnaSettingsArrayPush>;
export type DnaSettingsGetModel = {
    main: boolean;
};
export type DnaOptionsGetModel = Partial<DnaSettingsGetModel>;
export type DnaSettingsEmpty = {
    fade: boolean;
};
export type DnaOptionsEmpty = Partial<DnaSettingsEmpty>;
export type DnaOptionsInsert<T> = {
    fade?: boolean;
    html?: boolean;
    transform?: DnaTransformFn<T>;
    callback?: DnaCallbackFn<T>;
};
export type DnaSettingsRefresh = {
    data: unknown;
    main: boolean;
    html: boolean;
};
export type DnaOptionsRefresh = Partial<DnaSettingsRefresh>;
export type DnaSettingsRefreshAll = {
    data: unknown;
    main: boolean;
    html: boolean;
};
export type DnaOptionsRefreshAll = Partial<DnaSettingsRefreshAll>;
export type DnaSettingsRecount = {
    html: boolean;
};
export type DnaOptionsRecount = Partial<DnaSettingsRecount>;
export type DnaOptionsDestroy<T> = {
    main?: boolean;
    fade?: boolean;
    callback?: DnaCallbackFn<T> | null;
};
export type DnaSettingsGetClone = {
    main: boolean;
};
export type DnaOptionsGetClone = Partial<DnaSettingsGetClone>;
export type DnaSettingsGetIndex = {
    main: boolean;
};
export type DnaOptionsGetIndex = Partial<DnaSettingsGetIndex>;
export type DnaSettingsRegisterInitializer = {
    selector: string | null;
    params: DnaDataObject | unknown[] | null;
    onDocLoad: boolean;
};
export type DnaOptionsRegisterInitializer = Partial<DnaSettingsRegisterInitializer>;
export type DnaSettingsRunOnLoads = {
    msecs: number;
};
export type DnaOptionsRunOnLoads = Partial<DnaSettingsRunOnLoads>;
export type DnaForEachCallback = (elem: JQuery, index: number) => void;
export type DnaPluginAction = 'bye' | 'clone-sub' | 'destroy' | 'down' | 'refresh' | 'up';
declare global {
    interface JQuery {
        forEach: (fn: DnaForEachCallback) => JQuery;
        dna: (action: DnaPluginAction, ...params: unknown[]) => JQuery;
    }
}
export type DnaModel = JsonData;
export type DnaDataObject = JsonObject;
export type DnaFormatter = <T>(value: DnaFormatterValue, model?: T) => string;
export type DnaFormatterValue = number | string | boolean;
export type DnaMSec = number | string;
export type DnaCallback = (...args: unknown[]) => unknown;
export interface DnaTransformFn<T> {
    (data: T): void;
}
export interface DnaCallbackFn<T> {
    (elem: JQuery, data?: T): void;
}
export interface DnaInitializerFn {
    (elem: JQuery, ...params: unknown[]): void;
}
export type DnaElemEventIndex = JQuery | JQuery.EventBase | number;
export type DnaInitializer = {
    fn: DnaFunctionName | DnaInitializerFn;
    selector: string | null;
    params: DnaDataObject | unknown[] | null;
};
export type DnaTemplate = {
    name: string;
    elem: JQuery;
    container: JQuery;
    nested: boolean;
    separators: number;
    wrapped: boolean;
};
export type DnaTemplateDb = {
    [name: string]: DnaTemplate;
};
export type DnaTemplateName = string;
export type DnaContext = {
    [app: string]: {
        [field: string]: unknown;
    } | DnaCallback;
};
export type DnaFieldName = string;
export type DnaFunctionName = string;
export type DnaClassName = string;
export type DnaAttrName = string;
export type DnaAttrParts = [string, DnaFieldName | 1 | 2, string];
export type DnaAttrs = (DnaAttrName | DnaAttrParts)[];
export type DnaPropName = string;
export type DnaProps = (DnaPropName | DnaFieldName)[];
export type DnaLoop = {
    name: string;
    field: DnaFieldName;
};
export type DnaRules = {
    template?: DnaTemplateName;
    array?: DnaFieldName;
    text?: boolean;
    val?: boolean;
    attrs?: DnaAttrs;
    props?: DnaProps;
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
export type DnaInfo = {
    version: string;
    templates: number;
    clones: number;
    subs: number;
    names: string[];
    store: DnaTemplateDb;
    initializers: DnaInitializer[];
    panels: string[];
};
declare const dna: {
    version: string;
    clone<T>(name: string, data: T | T[], options?: DnaOptionsClone<T> | undefined): JQuery;
    arrayPush<T_1>(holderClone: JQuery, arrayField: string, data: T_1 | T_1[], options?: DnaOptionsArrayPush): JQuery;
    createTemplate(name: string, html: string, holder: JQuery): DnaTemplate;
    templateExists(name: string): boolean;
    getModel<T_2>(elemOrName: JQuery | string, options?: DnaOptionsGetModel): T_2 | T_2[] | undefined;
    empty(name: string, options?: DnaOptionsEmpty): JQuery;
    insert<T_3>(name: string, data: T_3, options?: DnaOptionsInsert<T_3> | undefined): JQuery;
    refresh(clone: JQuery, options?: DnaOptionsRefresh): JQuery;
    refreshAll(name: string, options?: DnaOptionsRefreshAll): JQuery;
    updateField(inputElem: JQuery, value: Json): JQuery;
    recount(clone: JQuery, options?: DnaOptionsRecount): JQuery;
    destroy<T_4>(clone: JQuery, options?: DnaOptionsDestroy<T_4> | undefined): JQuery;
    getClone(elem: JQuery, options?: DnaOptionsGetClone): JQuery;
    getClones(name: string): JQuery;
    getIndex(elem: JQuery, options?: DnaOptionsGetIndex): number;
    up<T_5>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T_5> | undefined): JQuery;
    down<T_6>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T_6> | undefined): JQuery;
    bye<T_7>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T_7> | undefined): JQuery;
    registerInitializer(fn: DnaFunctionName | DnaInitializerFn, options?: DnaOptionsRegisterInitializer): DnaInitializer[];
    clearInitializers(): DnaInitializer[];
    registerContext(contextName: string, contextObjOrFn: DnaCallback | {
        [name: string]: unknown;
    }): DnaContext;
    initGlobal(thisWindow: Window & typeof globalThis, thisJQuery: JQueryStatic): unknown;
    info(): DnaInfo;
    name: {
        array: string;
        clone: string;
        container: string;
        displayed: string;
        executed: string;
        field: string;
        hidden: string;
        hide: string;
        initialized: string;
        lastSeparator: string;
        menu: string;
        menuItem: string;
        nucleotide: string;
        onLoad: string;
        panel: string;
        panels: string;
        panelsInitialized: string;
        selected: string;
        separator: string;
        subClone: string;
        template: string;
        unhide: string;
        unselected: string;
        updateModel: string;
    };
    selector: {
        array: string;
        clone: string;
        container: string;
        displayed: string;
        executed: string;
        field: string;
        hidden: string;
        hide: string;
        initialized: string;
        lastSeparator: string;
        menu: string;
        menuItem: string;
        nucleotide: string;
        onLoad: string;
        panel: string;
        panels: string;
        panelsInitialized: string;
        selected: string;
        separator: string;
        subClone: string;
        template: string;
        unhide: string;
        unselected: string;
        updateModel: string;
    };
    array: {
        find: <T_8, V>(array: T_8[], value: V, key?: string) => {
            index: number;
            item: T_8 | null;
        };
        last: <T_9>(array: T_9[]) => T_9 | undefined;
        fromMap: (map: JsonObject, options?: {
            key?: string;
            kebabCodes?: boolean;
        }) => JsonObject[];
        toMap: (array: DnaDataObject[], options?: {
            key: string;
            camelKeys: boolean;
        }) => DnaDataObject;
        wrap: <T_10>(itemOrItems: T_10 | T_10[]) => T_10[];
    };
    browser: {
        getUrlParams: () => {
            [param: string]: string;
        };
        userAgentData(): NavigatorUAData;
    };
    pageToken: {
        put: (key: string, value: Json) => Json;
        get: (key: string, defaultValue: Json) => Json;
    };
    ui: {
        deleteElem: <T_11>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T_11> | null | undefined) => JQuery;
        focus: (elem: JQuery) => JQuery;
        getAttrs: (elem: JQuery) => Attr[];
        getComponent: (elem: JQuery) => JQuery;
        pulse: (elem: JQuery, options?: {
            duration: number;
            interval: number;
            out: number;
        }) => JQuery;
        slideFade: <T_12>(elem: JQuery, callback?: DnaCallbackFn<T_12> | null | undefined, show?: boolean) => JQuery;
        slideFadeIn: <T_13>(elem: JQuery, callback?: DnaCallbackFn<T_13> | null | undefined) => JQuery;
        slideFadeOut: <T_14>(elem: JQuery, callback?: DnaCallbackFn<T_14> | null | undefined) => JQuery;
        slideFadeToggle: <T_15>(elem: JQuery, callback?: DnaCallbackFn<T_15> | null | undefined) => JQuery;
        slideFadeDelete: <T_16>(elem: JQuery, callback?: DnaCallbackFn<T_16> | null | undefined) => JQuery;
        smoothHeightSetBaseline: (container: JQuery) => JQuery;
        smoothHeightAnimate: (delay: number, container: JQuery) => JQuery;
        smoothMove: <T_17>(elem: JQuery, up?: boolean, callback?: DnaCallbackFn<T_17> | null | undefined) => JQuery;
        smoothMoveUp: <T_18>(elem: JQuery, callback?: DnaCallbackFn<T_18> | null | undefined) => JQuery;
        smoothMoveDown: <T_19>(elem: JQuery, callback?: DnaCallbackFn<T_19> | null | undefined) => JQuery;
        toElem: (elemOrEventOrIndex: DnaElemEventIndex, that?: unknown) => JQuery;
    };
    util: {
        apply: <T_20>(fn: string | DnaInitializerFn | DnaCallbackFn<T_20>, params?: unknown | JQuery) => unknown;
        getFn(name: string): any;
        assign: (data: DnaDataObject, field: string | string[], value: Json) => DnaDataObject;
        printf: (format: string, ...values: unknown[]) => string;
        realTruth: (value: unknown) => boolean;
        toCamel: (kebabStr: string) => string;
        toKebab: (camelStr: string) => string;
        value: <T_21>(data: T_21, field: string | string[]) => unknown;
        isObj: (value: unknown) => boolean;
    };
    format: {
        getCurrencyFormatter(iso4217: string, units?: number): DnaFormatter;
        getDateFormatter(format: string): DnaFormatter;
        getNumberFormatter(format: string): DnaFormatter;
        getPercentFormatter(format: string): DnaFormatter;
        getFormatter(fn: string): DnaFormatter;
    };
    placeholder: {
        setup: () => JQuery;
    };
    panels: {
        display: (menu: JQuery, location?: number, updateUrl?: boolean) => JQuery;
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
        field: (elem: JQuery) => void;
        propsAndAttrs: (elem: JQuery) => void;
        getDataField: (elem: JQuery, type: string) => string;
        subTemplateName: (holder: JQuery | string, arrayField: string, index: number) => string;
        rules: (elems: JQuery, type: string, isLists?: boolean) => JQuery;
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
        runOnLoads(options?: DnaOptionsRunOnLoads): JQuery;
        runInitializers: (root: JQuery) => JQuery;
        setup: () => JQuery;
    };
    core: {
        inject: <T_22>(clone: JQuery, data: T_22, count: number, settings: DnaOptionsClone<T_22>) => JQuery;
        replicate: <T_23>(template: DnaTemplate, data: T_23, settings: DnaOptionsClone<T_23>) => JQuery;
        getArrayName: (subClone: JQuery) => string | null;
        updateModelArray: (container: JQuery) => JQuery;
        remove: <T_24>(clone: JQuery, callback?: DnaCallbackFn<T_24> | null | undefined) => JQuery;
        assert: (ok: boolean | unknown, message: string, info: unknown) => void;
        plugin: () => void;
        setup: () => unknown;
    };
};
export { dna };
