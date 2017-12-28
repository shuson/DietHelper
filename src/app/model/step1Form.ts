import * as _ from 'underscore';

export class Step1Form {
    fullName: string;
    email: string;
    age: number;
    gender: string;
    height: number;
    weight: number;

    public isValid() {
        return !_.isEmpty(this.fullName) && !_.isEmpty(this.email)
            && _.isNumber(this.age) && !_.isEmpty(this.gender) && _.isNumber(this.weight) && _.isNumber(this.height);
    }
}