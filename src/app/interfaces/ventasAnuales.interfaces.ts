
// To parse this data:
//
//   import { Convert, VentasAnuales } from "./file";
//
//   const ventasAnuales = Convert.toVentasAnuales(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface VentasAnuales {
    succeeded: boolean;
    message:   null;
    errors:    null;
    data:      Data;
}

export interface Data {
    porModelo:       PorM[];
    porAgencia:      PorAgencia[];
    porMarca:        PorM[];
    totalAmbacar:    number;
    totalExonerados: number;
    totalCiauto:     number;
}

export interface PorAgencia {
    codAgencia:   null | string;
    agencia:      null | string;
    zona:         string;
    zonaAux:      string;
    posicion:     number;
    mes2:         number;
    presupuesto:  number;
    cumplimiento: number;
    comentario:   null | string;
    ambacar:      string;
    exonerados:   string;
    ciauto:       string;
}

export interface PorM {
    codModelo:    null | string;
    modelo:       string;
    marca:        Marca | null;
    linea:        null | string;
    subDivision:  SubDivision | null;
    cantidad:     number;
    presupuesto:  number;
    cumplimiento: number;
    comentario:   null | string;
    ambacar:      string;
    exonerados:   string;
    ciauto:       string;
}

export enum Marca {
    Dfsk = "DFSK",
    GreatWall = "GREAT WALL",
    KingLong = "KING LONG",
    Kyc = "KYC",
    Shineray = "SHINERAY",
    Soueast = "SOUEAST",
}

export enum SubDivision {
    Empty = "",
    PickUPS = "PICK UPS",
    Suv = "SUV",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toVentasAnuales(json: string): VentasAnuales {
        return cast(JSON.parse(json), r("VentasAnuales"));
    }

    public static ventasAnualesToJson(value: VentasAnuales): string {
        return JSON.stringify(uncast(value, r("VentasAnuales")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "VentasAnuales": o([
        { json: "succeeded", js: "succeeded", typ: true },
        { json: "message", js: "message", typ: null },
        { json: "errors", js: "errors", typ: null },
        { json: "data", js: "data", typ: r("Data") },
    ], false),
    "Data": o([
        { json: "porModelo", js: "porModelo", typ: a(r("PorM")) },
        { json: "porAgencia", js: "porAgencia", typ: a(r("PorAgencia")) },
        { json: "porMarca", js: "porMarca", typ: a(r("PorM")) },
        { json: "totalAmbacar", js: "totalAmbacar", typ: 0 },
        { json: "totalExonerados", js: "totalExonerados", typ: 0 },
        { json: "totalCiauto", js: "totalCiauto", typ: 0 },
    ], false),
    "PorAgencia": o([
        { json: "codAgencia", js: "codAgencia", typ: u(null, "") },
        { json: "agencia", js: "agencia", typ: u(null, "") },
        { json: "zona", js: "zona", typ: "" },
        { json: "zonaAux", js: "zonaAux", typ: "" },
        { json: "posicion", js: "posicion", typ: 0 },
        { json: "mes2", js: "mes2", typ: 0 },
        { json: "presupuesto", js: "presupuesto", typ: 0 },
        { json: "cumplimiento", js: "cumplimiento", typ: 0 },
        { json: "comentario", js: "comentario", typ: u(null, "") },
        { json: "ambacar", js: "ambacar", typ: "" },
        { json: "exonerados", js: "exonerados", typ: "" },
        { json: "ciauto", js: "ciauto", typ: "" },
    ], false),
    "PorM": o([
        { json: "codModelo", js: "codModelo", typ: u(null, "") },
        { json: "modelo", js: "modelo", typ: "" },
        { json: "marca", js: "marca", typ: u(r("Marca"), null) },
        { json: "linea", js: "linea", typ: u(null, "") },
        { json: "subDivision", js: "subDivision", typ: u(r("SubDivision"), null) },
        { json: "cantidad", js: "cantidad", typ: 0 },
        { json: "presupuesto", js: "presupuesto", typ: 0 },
        { json: "cumplimiento", js: "cumplimiento", typ: 0 },
        { json: "comentario", js: "comentario", typ: u(null, "") },
        { json: "ambacar", js: "ambacar", typ: "" },
        { json: "exonerados", js: "exonerados", typ: "" },
        { json: "ciauto", js: "ciauto", typ: "" },
    ], false),
    "Marca": [
        "DFSK",
        "GREAT WALL",
        "KING LONG",
        "KYC",
        "SHINERAY",
        "SOUEAST",
    ],
    "SubDivision": [
        "",
        "PICK UPS",
        "SUV",
    ],
};
