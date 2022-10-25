//! dna-engine v2.2.1 ~~ https://dna-engine.org ~~ MIT License

/// <reference types="jquery" />
export declare type NavigatorUAData = {
    readonly brands: {
        brand: string;
        version: string;
    }[];
    readonly mobile: boolean;
    readonly platform: string;
};
export declare type Json = string | number | boolean | null | undefined | JsonObject | Json[];
export declare type JsonObject = {
    [key: string]: Json;
};
export declare type JsonData = JsonObject | Json[];
export declare type DnaForEachCallback = (elem: JQuery, index: number) => void;
export declare type DnaPluginAction = 'bye' | 'clone-sub' | 'destroy' | 'down' | 'refresh' | 'up';
declare global {
    interface JQuery {
        forEach: (fn: DnaForEachCallback) => JQuery;
        dna: (action: DnaPluginAction, ...params: unknown[]) => JQuery;
    }
}
export declare type DnaModel = JsonData;
export declare type DnaDataObject = JsonObject;
export declare type DnaOptionsClone<T> = {
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
export declare type DnaSettingsArrayPush = {
    fade: boolean;
    top: boolean;
};
export declare type DnaOptionsArrayPush = Partial<DnaSettingsArrayPush>;
export declare type DnaSettingsGetModel = {
    main: boolean;
};
export declare type DnaOptionsGetModel = Partial<DnaSettingsGetModel>;
export declare type DnaSettingsEmpty = {
    fade: boolean;
};
export declare type DnaOptionsEmpty = Partial<DnaSettingsEmpty>;
export declare type DnaOptionsInsert<T> = {
    fade?: boolean;
    html?: boolean;
    transform?: DnaTransformFn<T>;
    callback?: DnaCallbackFn<T>;
};
export declare type DnaSettingsRefresh = {
    data: unknown;
    main: boolean;
    html: boolean;
};
export declare type DnaOptionsRefresh = Partial<DnaSettingsRefresh>;
export declare type DnaSettingsRefreshAll = {
    data: unknown;
    main: boolean;
    html: boolean;
};
export declare type DnaOptionsRefreshAll = Partial<DnaSettingsRefreshAll>;
export declare type DnaSettingsRecount = {
    html: boolean;
};
export declare type DnaOptionsRecount = Partial<DnaSettingsRecount>;
export declare type DnaOptionsDestroy<T> = {
    main?: boolean;
    fade?: boolean;
    callback?: DnaCallbackFn<T> | null;
};
export declare type DnaSettingsGetClone = {
    main: boolean;
};
export declare type DnaOptionsGetClone = Partial<DnaSettingsGetClone>;
export declare type DnaSettingsGetIndex = {
    main: boolean;
};
export declare type DnaOptionsGetIndex = Partial<DnaSettingsGetIndex>;
export declare type DnaSettingsRegisterInitializer = {
    selector: string | null;
    params: DnaDataObject | unknown[] | null;
    onDocLoad: boolean;
};
export declare type DnaOptionsRegisterInitializer = Partial<DnaSettingsRegisterInitializer>;
export declare type DnaFormatter = <T>(value: DnaFormatterValue, model?: T) => string;
export declare type DnaFormatterValue = number | string | boolean;
export declare type DnaMSec = number | string;
export declare type DnaCallback = (...args: unknown[]) => unknown;
export interface DnaTransformFn<T> {
    (data: T): void;
}
export interface DnaCallbackFn<T> {
    (elem: JQuery, data?: T): void;
}
export interface DnaInitializerFn {
    (elem: JQuery, ...params: unknown[]): void;
}
export declare type DnaElemEventIndex = JQuery | JQuery.EventBase | number;
export declare type DnaInitializer = {
    fn: DnaFunctionName | DnaInitializerFn;
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
    [app: string]: {
        [field: string]: unknown;
    } | DnaCallback;
};
export declare type DnaFieldName = string;
export declare type DnaFunctionName = string;
export declare type DnaClassName = string;
export declare type DnaAttrName = string;
export declare type DnaAttrParts = [string, DnaFieldName | 1 | 2, string];
export declare type DnaAttrs = (DnaAttrName | DnaAttrParts)[];
export declare type DnaPropName = string;
export declare type DnaProps = (DnaPropName | DnaFieldName)[];
export declare type DnaLoop = {
    name: string;
    field: DnaFieldName;
};
export declare type DnaRules = {
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
export declare type DnaInfo = {
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
    cloneSub<T_2>(holderClone: JQuery, arrayField: string, data: T_2 | T_2[], options?: DnaOptionsArrayPush): JQuery;
    createTemplate(name: string, html: string, holder: JQuery): DnaTemplate;
    templateExists(name: string): boolean;
    getModel<T_3>(elemOrName: JQuery | string, options?: DnaOptionsGetModel): T_3 | T_3[] | undefined;
    empty(name: string, options?: DnaOptionsEmpty): JQuery;
    insert<T_4>(name: string, data: T_4, options?: DnaOptionsInsert<T_4> | undefined): JQuery;
    refresh(clone: JQuery, options?: DnaOptionsRefresh): JQuery;
    refreshAll(name: string, options?: DnaOptionsRefreshAll): JQuery;
    updateField(inputElem: JQuery, value: Json): JQuery;
    recount(clone: JQuery, options?: DnaOptionsRecount): JQuery;
    destroy<T_5>(clone: JQuery, options?: DnaOptionsDestroy<T_5> | undefined): JQuery;
    getClone(elem: JQuery, options?: DnaOptionsGetClone): JQuery;
    getClones(name: string): JQuery;
    getIndex(elem: JQuery, options?: DnaOptionsGetIndex): number;
    up<T_6>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T_6> | undefined): JQuery;
    down<T_7>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T_7> | undefined): JQuery;
    bye<T_8>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T_8> | undefined): JQuery;
    registerInitializer(fn: DnaFunctionName | DnaInitializerFn, options?: DnaOptionsRegisterInitializer): DnaInitializer[];
    clearInitializers(): DnaInitializer[];
    registerContext(contextName: string, contextObjOrFn: DnaCallback | {
        [name: string]: unknown;
    }): DnaContext;
    initGlobal(thisWindow: Window & typeof globalThis, thisJQuery: JQueryStatic): unknown;
    info(): DnaInfo;
    array: {
        find: <T_9, V>(array: T_9[], value: V, key?: string) => {
            index: number;
            item: T_9 | null;
        };
        last: <T_10>(array: T_10[]) => T_10 | undefined;
        fromMap: (map: JsonObject, options?: {
            key?: string;
            kebabCodes?: boolean;
        }) => JsonObject[];
        toMap: (array: DnaDataObject[], options?: {
            key: string;
            camelKeys: boolean;
        }) => DnaDataObject;
        wrap: <T_11>(itemOrItems: T_11 | T_11[]) => T_11[];
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
        deleteElem: <T_12>(elemOrEventOrIndex: DnaElemEventIndex, callback?: DnaCallbackFn<T_12> | null | undefined) => JQuery;
        focus: (elem: JQuery) => JQuery;
        getAttrs: (elem: JQuery) => Attr[];
        getComponent: (elem: JQuery) => JQuery;
        pulse: (elem: JQuery, options?: {
            duration: number;
            interval: number;
            out: number;
        }) => JQuery;
        slideFade: <T_13>(elem: JQuery, callback?: DnaCallbackFn<T_13> | null | undefined, show?: boolean) => JQuery;
        slideFadeIn: <T_14>(elem: JQuery, callback?: DnaCallbackFn<T_14> | null | undefined) => JQuery;
        slideFadeOut: <T_15>(elem: JQuery, callback?: DnaCallbackFn<T_15> | null | undefined) => JQuery;
        slideFadeToggle: <T_16>(elem: JQuery, callback?: DnaCallbackFn<T_16> | null | undefined) => JQuery;
        slideFadeDelete: <T_17>(elem: JQuery, callback?: DnaCallbackFn<T_17> | null | undefined) => JQuery;
        smoothHeightSetBaseline: (container: JQuery) => JQuery;
        smoothHeightAnimate: (delay: number, container: JQuery) => JQuery;
        smoothMove: <T_18>(elem: JQuery, up?: boolean, callback?: DnaCallbackFn<T_18> | null | undefined) => JQuery;
        smoothMoveUp: <T_19>(elem: JQuery, callback?: DnaCallbackFn<T_19> | null | undefined) => JQuery;
        smoothMoveDown: <T_20>(elem: JQuery, callback?: DnaCallbackFn<T_20> | null | undefined) => JQuery;
        toElem: (elemOrEventOrIndex: DnaElemEventIndex, that?: unknown) => JQuery;
    };
    util: {
        apply: <T_21>(fn: string | DnaInitializerFn | DnaCallbackFn<T_21>, params?: unknown | JQuery) => unknown;
        assign: (data: DnaDataObject, field: string | string[], value: Json) => DnaDataObject;
        printf: (format: string, ...values: unknown[]) => string;
        realTruth: (value: unknown) => boolean;
        toCamel: (kebabStr: string) => string;
        toKebab: (camelStr: string) => string;
        value: <T_22>(data: T_22, field: string | string[]) => unknown;
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
        runOnLoads: () => JQuery;
        runInitializers: (root: JQuery) => JQuery;
        setup: () => JQuery;
    };
    core: {
        inject: <T_23>(clone: JQuery, data: T_23, count: number, settings: DnaOptionsClone<T_23>) => JQuery;
        replicate: <T_24>(template: DnaTemplate, data: T_24, settings: DnaOptionsClone<T_24>) => JQuery;
        getArrayName: (subClone: JQuery) => string | null;
        updateModelArray: (container: JQuery) => JQuery;
        remove: <T_25>(clone: JQuery, callback?: DnaCallbackFn<T_25> | null | undefined) => JQuery;
        assert: (ok: boolean | unknown, message: string, info: unknown) => void;
        plugin: () => void;
        setup: () => unknown;
    };
};
export { dna };
