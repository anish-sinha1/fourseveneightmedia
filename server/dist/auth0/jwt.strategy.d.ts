declare const JwtStrategy_base: new (...args: any[]) => any;
export default class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: unknown): unknown;
}
export {};
