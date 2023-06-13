//! dna-engine v3.0.2 ~~ https://dna-engine.org ~~ MIT License

export type Json = string | number | boolean | null | undefined | JsonObject | Json[];
export type JsonObject = {
    [key: string | number]: Json;
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
export type DnaOptionsClone<T> = Partial<{
    callback: DnaCallbackFn<T> | null;
    clones: number;
    container: Element | null;
    empty: boolean;
    fade: boolean;
    formatter: DnaFormatter | null;
    holder: Element | null;
    html: boolean;
    top: boolean;
    transform: DnaTransformFn<T> | null;
}>;
export type DnaOptionsArrayPush = Partial<{
    fade: boolean;
    top: boolean;
}>;
export type DnaOptionsGetModel = Partial<{
    main: boolean;
}>;
export type DnaOptionsEmpty = Partial<{
    fade: boolean;
}>;
export type DnaOptionsRefresh = Partial<{
    data: unknown;
    html: boolean;
    main: boolean;
}>;
export type DnaOptionsRefreshAll = Partial<{
    data: unknown;
    html: boolean;
    main: boolean;
}>;
export type DnaOptionsRecount = Partial<{
    html: boolean;
}>;
export type DnaOptionsDestroy = Partial<{
    fade: boolean;
    main: boolean;
}>;
export type DnaOptionsGetClone = Partial<{
    main: boolean;
}>;
export type DnaOptionsGetIndex = Partial<{
    main: boolean;
}>;
export type DnaOptionsRegisterInitializer = Partial<{
    onDomReady: boolean;
    params: unknown[];
    selector: string | null;
}>;
export type DnaOptionsRunOnLoads = Partial<{
    pollMsec: number;
}>;
export type DnaOptionsEventsOn = Partial<{
    keyFilter: KeyboardEvent["key"] | null;
    selector: string | null;
}>;
export type DnaOptionsPulse = Partial<{
    displayMsec: number | null;
    fadeInMsec: number;
    fadeOutMsec: number;
}>;
export type DnaOptionsSmoothHeight = Partial<{
    container: Element;
    overflow: boolean;
    smoothMsec: number;
}>;
export type DnaModel = JsonData;
export type DnaDataObject = JsonObject;
export type DnaFormatter = <T>(value: DnaFormatterValue, model?: T) => string;
export type DnaFormatterValue = number | string | boolean;
export type DnaMsec = number | string;
export type DnaCallback = (...args: unknown[]) => unknown;
export interface DnaTransformFn<T> {
    (data: T): unknown;
}
export interface DnaCallbackFn<T> {
    (elem: Element, data?: T): unknown;
}
export interface DnaInitializerFn {
    (elem: Element, ...params: unknown[]): void;
}
export type DnaEventListener = (elem: Element, event: Event, selector: string | null) => void;
export type DnaInitializer = {
    fn: DnaFunctionName | DnaInitializerFn;
    selector: string | null;
    params: unknown[];
};
export type DnaTemplate = {
    name: string;
    elem: Element;
    container: Element;
    nested: boolean;
    separators: number;
    wrapped: boolean;
};
export type DnaTemplateDB = {
    [name: string]: DnaTemplate;
};
export type DnaTemplateName = string;
export type DnaCountsMap = {
    [name: string]: number;
};
export type DnaOnLoad = {
    start: number;
    checks: number;
    waiting?: number;
};
export type DnaContext = {
    [app: string]: {
        [field: string]: unknown;
    } | DnaCallback;
};
export type DnaFieldName = string;
export type DnaFunctionName = string;
export type DnaClassName = string;
export type DnaClassRule = [DnaFieldName, DnaClassName, DnaClassName];
export type DnaAttrName = string;
export type DnaAttrParts = [string, DnaFieldName | 1 | 2, string];
export type DnaAttrs = (DnaAttrName | DnaAttrParts)[];
export type DnaPropName = string;
export type DnaProps = (DnaPropName | DnaFieldName)[];
export type DnaLoop = {
    name: string;
    field: DnaFieldName;
};
export type DnaRulesKey = keyof DnaRules;
export type DnaRulesValue = DnaRules[DnaRulesKey];
export type DnaRules = Partial<{
    template: DnaTemplateName;
    array: DnaFieldName;
    text: boolean;
    val: boolean;
    attrs: DnaAttrs;
    props: DnaProps;
    option: DnaFieldName;
    formatter: DnaFormatter | null;
    transform: DnaFunctionName;
    callback: DnaFunctionName;
    class: DnaClassRule[];
    require: DnaFieldName;
    missing: DnaFieldName;
    true: DnaFieldName;
    false: DnaFieldName;
    loop: DnaLoop;
    subs: DnaFieldName[];
}>;
export type DnaInfo = {
    version: string;
    templates: number;
    clones: number;
    subs: number;
    names: string[];
    store: DnaTemplateDB;
    initializers: DnaInitializer[];
    panels: string[];
    state: unknown[];
};
type GlobalWindow = Window & typeof globalThis;
type Dna = typeof dna;
declare global {
    var dna: Dna;
}
declare const dna: {
    version: string;
    clone<T>(name: string, data: T | T[], options?: Partial<{
        callback: DnaCallbackFn<T> | null;
        clones: number;
        container: Element | null;
        empty: boolean;
        fade: boolean;
        formatter: DnaFormatter | null;
        holder: Element | null;
        html: boolean;
        top: boolean;
        transform: DnaTransformFn<T> | null;
    }> | undefined): Element | Element[];
    arrayPush<T_1>(holderClone: Element, arrayField: string, data: T_1 | T_1[], options?: DnaOptionsArrayPush): Element;
    createTemplate(name: string, html: string, holder: Element): DnaTemplate;
    templateExists(name: string): boolean;
    getModel<T_2>(elem: Element, options?: DnaOptionsGetModel): T_2 | undefined;
    getModels<T_3>(template: string, options?: DnaOptionsGetModel): T_3[];
    empty(name: string, options?: DnaOptionsEmpty): Element[];
    insert<T_4>(name: string, data: T_4, options?: Partial<{
        callback: DnaCallbackFn<T_4> | null;
        clones: number;
        container: Element | null;
        empty: boolean;
        fade: boolean;
        formatter: DnaFormatter | null;
        holder: Element | null;
        html: boolean;
        top: boolean;
        transform: DnaTransformFn<T_4> | null;
    }> | undefined): Element;
    refresh(clone: Element, options?: DnaOptionsRefresh): Element;
    refreshAll(name: string, options?: DnaOptionsRefreshAll): Element[];
    updateField(inputElem: Element, value: Json): Element;
    recount(elem: Element, options?: DnaOptionsRecount): Element;
    destroy(elem: Element, options?: DnaOptionsDestroy): Promise<Element>;
    isClone(elem: Element): boolean;
    getClone(elem: Element, options?: DnaOptionsGetClone): Element;
    getClones(name: string): Element[];
    getIndex(elem: Element, options?: DnaOptionsGetIndex): number;
    up(elemOrEvent: Element | Event): Promise<Element>;
    down(elemOrEvent: Element | Event): Promise<Element>;
    bye(elemOrEvent: Element | Event): Promise<Element>;
    registerInitializer(fn: DnaFunctionName | DnaInitializerFn, options?: DnaOptionsRegisterInitializer): DnaInitializer[];
    clearInitializers(): DnaInitializer[];
    registerContext(contextName: string, contextObjOrFn: DnaCallback | {
        [name: string]: unknown;
    }): DnaContext;
    initGlobal(thisWindow: GlobalWindow): unknown;
    info(): DnaInfo;
    name: {
        animating: string;
        animatingDone: string;
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
        animating: string;
        animatingDone: string;
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
        find: <T_5, V>(array: T_5[], value: V, key?: string) => {
            index: number;
            item: T_5 | null;
        };
        fromMap<E>(map: {
            [code: string]: E;
            [code: number]: E;
        }, options?: {
            key?: string;
            kebabCodes?: boolean;
        }): ((E & {
            [key: string]: string;
        }) | {
            [keyOrValue: string]: string | E;
        })[];
        toMap<E_1>(array: E_1[], options?: {
            key?: string;
            camelKeys?: boolean;
        }): {
            [code: string]: E_1;
            [code: number]: E_1;
        };
        wrap<T_6>(itemOrItems: T_6 | T_6[]): T_6[];
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
    dom: {
        stateDepot: {
            [key: string]: unknown;
            [key: number]: unknown;
            [key: symbol]: unknown;
        }[];
        state(elem: Element): {
            [key: string]: unknown;
            [key: number]: unknown;
            [key: symbol]: unknown;
        };
        cloneState(clone: Element): Element;
        removeState(elem: Element): Element;
        hasClass(elems: Element[] | HTMLCollection | NodeListOf<Element>, className: string): boolean;
        toggleClass(elem: Element, className: string, state?: boolean): Element;
        replaceClass(elem: Element, oldName: string, newName: string): Element;
        addClass<T_7 extends HTMLCollection | Element[] | NodeListOf<Element>>(elems: T_7, className: string): T_7;
        forEach<T_8 extends HTMLCollection>(elems: T_8, fn: (elem: Element, index: number, elems: unknown[]) => unknown): T_8;
        map<T_9>(elems: HTMLCollection | NodeListOf<Element>, fn: (elem: Element, index: number, elems: unknown[]) => T_9): T_9[];
        filter(elems: HTMLCollection | NodeListOf<Element>, fn: (elem: Element, index: number, elems: unknown[]) => unknown): Element[];
        filterBySelector(elems: Element[] | HTMLCollection, selector: string): Element[];
        filterByClass(elems: Element[] | HTMLCollection, ...classNames: string[]): Element[];
        find(elems: HTMLCollection | NodeListOf<Element>, fn: (elem: Element, index: number, elems: unknown[]) => boolean): Element | null;
        index(elem: Element): number;
        indexOf(elems: NodeListOf<Element>, elem: Element): number;
        findIndex(elems: HTMLCollection | NodeListOf<Element>, selector: string): number;
        isElem(elem: unknown): boolean;
        getAttrs(elem: Element): Attr[];
        toElem(elemOrEvent: Element | Event): HTMLElement;
        on(type: string, listener: DnaEventListener, options?: DnaOptionsEventsOn): void;
        onClick(listener: DnaEventListener, selector?: string): void;
        onChange(listener: DnaEventListener, selector?: string): void;
        onInput(listener: DnaEventListener, selector?: string): void;
        onKeyDown(listener: DnaEventListener, selector?: string): void;
        onKeyUp(listener: DnaEventListener, selector?: string): void;
        onEnterKey(listener: DnaEventListener, selector?: string): void;
        onFocusIn(listener: DnaEventListener, selector?: string): void;
        onFocusOut(listener: DnaEventListener, selector?: string): void;
        onCut(listener: DnaEventListener, selector?: string): void;
        onPaste(listener: DnaEventListener, selector?: string): void;
        onTouchStart(listener: DnaEventListener, selector?: string): void;
        onTouchEnd(listener: DnaEventListener, selector?: string): void;
        onSubmit(listener: DnaEventListener, selector?: string): void;
        onHoverIn(listener: DnaEventListener, selector: string): void;
        onHoverOut(listener: DnaEventListener, selector: string): void;
        onReady(callback: (...args: unknown[]) => unknown, options?: {
            quiet?: boolean;
            name?: string;
        }): DocumentReadyState | 'browserless';
    };
    ui: {
        isHidden(elem: Element): boolean;
        isVisible(elem: Element): boolean;
        show(elem: Element): Element;
        hide(elem: Element): Element;
        toggle(elem: Element, display: boolean): Element;
        fadeIn(elem: Element): Promise<Element>;
        fadeOut(elem: Element): Promise<Element>;
        slideFadeIn(elem: Element, options?: {
            force: boolean;
        }): Promise<Element>;
        slideFadeOut(elem: Element): Promise<Element>;
        slideFade(elem: Element, show: boolean): Promise<Element>;
        slideFadeDelete(elem: Element): Promise<Element>;
        smoothHeight(updateUI: () => unknown, options?: DnaOptionsSmoothHeight): Promise<Element>;
        smoothMove(elem: Element, up: boolean): Promise<Element>;
        smoothMoveUp(elem: Element): Promise<Element>;
        smoothMoveDown(elem: Element): Promise<Element>;
        pulse(elem: Element, options?: DnaOptionsPulse): Promise<Element>;
        focus(elem: Element): Element;
        setText(elem: Element | null, text: string): Element | null;
        toClone(elemOrEvent: Element | Event): Element;
        getComponent(elem: Element): Element | null;
    };
    util: {
        apply<T_10>(fn: string | DnaInitializerFn | DnaCallbackFn<T_10>, params: unknown[]): unknown;
        getFn(name: string): any;
        assign(data: DnaDataObject, field: string, value: Json): DnaDataObject;
        printf: (format: string, ...values: unknown[]) => string;
        realTruth: (value: unknown) => boolean;
        toCamel: (kebabStr: string) => string;
        toKebab: (camelStr: string) => string;
        value<T_11>(data: T_11, field: string | string[]): unknown;
        isObj: (value: unknown) => boolean;
        timestamp(): string;
        timestampMsec(): string;
    };
    format: {
        getCurrencyFormatter(iso4217: string, units?: number): DnaFormatter;
        getDateFormatter(format: string): DnaFormatter;
        getNumberFormatter(format: string): DnaFormatter;
        getPercentFormatter(format: string): DnaFormatter;
        getFormatter(fn: string): DnaFormatter;
    };
    placeholder: {
        setup(): NodeListOf<Element>;
    };
    panels: {
        display(menu: Element, location?: number, updateUrl?: boolean): Element;
        clickRotate(menuItem: Element): Element;
        selectRotate(menu: Element): Element;
        nextNav: number;
        initialize(panels: Element | null): Element | null;
        setup(): NodeListOf<Element>;
    };
    compile: {
        getRules(elem: Element): DnaRules;
        setRule(rules: DnaRules, key: DnaRulesKey, value: DnaRulesValue): DnaRules;
        setElemRule(elem: Element, key: DnaRulesKey, value: DnaRulesValue): Element;
        regex: {
            dnaField: RegExp;
            dnaBasePair: RegExp;
            dnaBasePairs: RegExp;
        };
        setupNucleotide(elem: Element): Element;
        isDnaField(node: Element): boolean;
        addFieldClass(elem: Element): Element;
        field(elem: Element): Element;
        propsAndAttrs(elem: Element): Element;
        getDataField(elem: Element, type: DnaRulesKey): string;
        subTemplateName(holder: Element | string, arrayField: string, index: number): string;
        rules(elem: Element, type: DnaRulesKey, isLists?: boolean, className?: string, init?: ((elem: Element) => void) | undefined): Element;
        separators(elem: Element): Element;
        template(name: string): DnaTemplate;
    };
    template: {
        db: DnaTemplateDB;
        stash(elem: Element): DnaTemplate;
        get(name: string): DnaTemplate;
    };
    events: {
        db: {
            context: DnaContext;
            initializers: DnaInitializer[];
        };
        runOnLoads(options?: DnaOptionsRunOnLoads): NodeListOf<Element>;
        runInitializers(root: Element): Element;
        setup: () => NodeListOf<Element>;
    };
    core: {
        inject<T_12>(clone: Element, data: T_12, count: number, settings: Partial<{
            callback: DnaCallbackFn<T_12> | null;
            clones: number;
            container: Element | null;
            empty: boolean;
            fade: boolean;
            formatter: DnaFormatter | null;
            holder: Element | null;
            html: boolean;
            top: boolean;
            transform: DnaTransformFn<T_12> | null;
        }>): Element;
        replicate<T_13>(template: DnaTemplate, data: T_13, options: Partial<{
            callback: DnaCallbackFn<T_13> | null;
            clones: number;
            container: Element | null;
            empty: boolean;
            fade: boolean;
            formatter: DnaFormatter | null;
            holder: Element | null;
            html: boolean;
            top: boolean;
            transform: DnaTransformFn<T_13> | null;
        }>): Element;
        getArrayName(subClone: Element): string | null;
        updateModelArray(container: Element): Element;
        remove<T_14>(clone: Element, callback?: DnaCallbackFn<T_14> | null | undefined): Element;
        assert(ok: boolean | unknown, message: string, info?: unknown): void;
        setup(): unknown;
    };
};
export { dna };
