interface intRule {
    type: 'int',
    min?: number,
    max?: number,
    equal?: number,
    optional?: boolean,
    oneOf?: Array<number>,
    custom?: (arg: any, object: this) => boolean,
}

interface booleanRule {
    type: 'boolean',
    toBe?: boolean,
    optional?: boolean,
    oneOf?: Array<boolean>,
    custom?: (arg: any, object: this) => boolean,
}

interface stringRule {
    type: 'string',
    minLength?: number,
    maxLength?: number,
    equal?: string,
    match?: RegExp,
    notEmpty?: boolean,
    optional?: boolean,
    oneOf?: Array<string>,
    custom?: (arg: any, object: this) => boolean,
}

interface emailRule {
    type: 'email',
    minLength?: number,
    maxLength?: number,
    equal?: string,
    match?: RegExp,
    notEmpty?: boolean,
    user?: (user: any) => boolean,
    domain?: (domain: any) => boolean,
    optional?: boolean,
    oneOf?: Array<string>,
    custom?: (arg: any, object: this) => boolean,
}

interface passwordRule {
    type: 'password',
    minLength?: number,
    maxLength?: number,
    equal?: string,
    match?: RegExp,
    notEmpty?: boolean,
    uppercase?: number,
    number?: number,
    mathesOneOf?: Array<string|number>,
    mathesAllOf?: Array<string|number>,
    optional?: boolean,
    oneOf?: Array<string>,
    custom?: (arg: any, object: this) => boolean,
}

interface urlRule {
    type: 'url',
    minLength?: number,
    maxLength?: number,
    equal?: string,
    match?: RegExp,
    notEmpty?: boolean,
    usprotocoler?: (protocol: any) => boolean,
    domain?: (domain: any) => boolean,
    optional?: boolean,
    oneOf?: Array<string>,
    custom?: (arg: any, object: this) => boolean,
}

interface dateRule {
    type: 'date',
    after?: Date,
    before?: Date,
    between?: Array<Date>,
    equal?: Date,
    optional?: boolean,
    oneOf?: Array<Date>,
    custom?: (arg: any, object: this) => boolean,
}

interface floatRule {
    type: 'float',
    min?: number,
    max?: number,
    equal?: number,
    optional?: boolean,
    oneOf?: Array<number>,
    custom?: (arg: any, object: this) => boolean,
}

interface arrayRule{
    type: 'array',
    of?: Rule,
    notEmpty?: boolean,
    length?: number,
    optional?: boolean,
    oneOf?: Array<any>,
    custom?: (arg: any, object: this) => boolean,
}

interface functionRule {
    type: 'function',
    result?: {
        of: any,
        toBe: Rule,
    },
    optional?: boolean,
    oneOf?: Array<any>,
    custom?: (arg: any, object: this) => boolean,
}

interface stringIntRule {
    type: 'string-int',
    min?: number,
    max?: number,
    minLength?: number,
    maxLength?: number,
    equal?: number,
    match?: RegExp,
    notEmpty?: boolean,
    optional?: boolean,
    oneOf?: Array<string>,
    custom?: (arg: any, object: this) => boolean,
}

interface stringFloatRule {
    type: 'string-float',
    min?: number,
    max?: number,
    minLength?: number,
    maxLength?: number,
    equal?: number,
    match?: RegExp,
    notEmpty?: boolean,
    optional?: boolean,
    oneOf?: Array<string>,
    custom?: (arg: any, object: this) => boolean,
}

interface stringDateRule {
    type: 'string-date',
    minLength?: number,
    maxLength?: number,
    equal?: Date,
    match?: RegExp,
    notEmpty?: boolean,
    after?: Date,
    before?: Date,
    between?: Array<Date>,
    optional?: boolean,
    oneOf?: Array<string>,
    custom?: (arg: any, object: this) => boolean,
}

interface stringBooleanRule {
    type: 'string-boolean',
    toBe?: boolean,
    minLength?: number,
    maxLength?: number,
    equal?: boolean,
    match?: RegExp,
    notEmpty?: boolean,
    optional?: boolean,
    oneOf?: Array<string>,
    custom?: (arg: any, object: this) => boolean,
}

// There is no regex-validated string type, so make multipleRule is not easy
// interface multipleRule {}

type ruleType = intRule
                |booleanRule
                |stringRule
                |emailRule
                |passwordRule
                |urlRule
                |dateRule
                |floatRule
                |arrayRule
                |functionRule
                |stringIntRule
                |stringFloatRule
                |stringDateRule
                |stringBooleanRule;

declare class Rule {
    public constructor (rule: ruleType|string, error?: string|null|undefined);

    public static addCustom(name: string, rules: {[key: string]: (val: any, arg?: any) => boolean}): void;

    public test(value: any): boolean;
}

declare class Validator {
    public constructor (fields: {[key: string]: Rule});

    public test(object: {[key: string]: any}): boolean;
    public testAll(objects: Array< {[key: string]: any} >): number;
    public getErrors(object: {[key: string]: any}): Array<string>;
}
