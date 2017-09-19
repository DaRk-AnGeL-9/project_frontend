import { AbstractControl } from '@angular/forms';


export class CompareFormUtil {

    static MatchPassword(group: AbstractControl): any {
        let pass = group.get('password').value;
        let confirmPass = group.get('confirmpassword').value;

        return pass === confirmPass ? null : { notSame: true };
    }
}
