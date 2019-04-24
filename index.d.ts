// abstract interfaces for extending
interface basicRule<T> {
    type: string,
    optional?: boolean,
    oneOf?: Array<T>,
    custom?: (arg: any, object: this) => boolean,
}

interface basicNumberRule extends basicRule<number> {
    min?: number,
    max?: number,
    equal?: number,
}

interface basicStringRule extends basicRule<string> {
    minLength?: number,
    maxLength?: number,
    match?: RegExp,
    notEmpty?: boolean,
}

interface simpleStringRule extends basicStringRule {
    equal?: string,
}

interface complexStringRule<T> extends basicStringRule {
    equal?: T,
}


// interfaces for implementation
interface intRule extends basicNumberRule {
    type: 'int',
}

interface booleanRule extends basicRule<boolean> {
    type: 'boolean',
    toBe?: boolean,
}

interface stringRule extends simpleStringRule {
    type: 'string',
}

interface emailRule extends simpleStringRule {
    type: 'email',
    user?: (user: string) => boolean,
    domain?: (domain: string) => boolean,
}

interface passwordRule extends simpleStringRule {
    type: 'password',
    uppercase?: number,
    specialChars?: number,
    numbers?: number,
    matchesOneOf?: Array<string|number>,
    matchesAllOf?: Array<string|number>,
}

interface urlRule extends simpleStringRule {
    type: 'url',
    protocol?: (protocol: string) => boolean,
    domain?: (domain: string) => boolean,
}

interface dateRule extends basicRule<Date> {
    type: 'date',
    after?: Date,
    before?: Date,
    between?: [Date, Date],
    equal?: Date,
}

interface floatRule extends basicNumberRule {
    type: 'float',
}

interface arrayRule extends basicRule<any> {
    type: 'array',
    of?: Rule,
    notEmpty?: boolean,
    length?: number,
}

interface functionRule extends basicRule<Function> {
    type: 'function',
    result?: {
        of: any,
        toBe: Rule,
    },
}

interface stringIntRule extends complexStringRule<number> {
    type: 'string-int',
    min?: number,
    max?: number,
}

interface stringFloatRule extends complexStringRule<number> {
    type: 'string-float',
    min?: number,
    max?: number,
}

interface stringDateRule extends complexStringRule<Date> {
    type: 'string-date',
    after?: Date,
    before?: Date,
    between?: [Date, Date],
}

interface stringBooleanRule extends complexStringRule<boolean> {
    type: 'string-boolean',
    toBe?: boolean,
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

export declare class Rule {
    public constructor (rule: ruleType|string, error?: string|null|undefined);

    public static addCustom(name: string, rules: {[key: string]: (val: any, arg?: any) => boolean}): void;

    public test(value: any): boolean;
}

export declare class Validator {
    public constructor (fields: {[key: string]: Rule});

    public test(object: {[key: string]: any}): boolean;
    public testAll(objects: Array< {[key: string]: any} >): number;
    public getErrors(object: {[key: string]: any}): Array<string>;
}
