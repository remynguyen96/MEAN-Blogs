import { FormControl, AbstractControl } from "@angular/forms";

export class ValidateService {

  static validateEmail(controlName : AbstractControl){
    let Email_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Email_REGEXP.test(controlName.value) ? null : {validateEmail : true};
  }

  static validatePassword(controlName : FormControl){
    let Strong_Password = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{5,35}$/;
    return Strong_Password.test(controlName.value) ? null : {validatePassword : true};
  }

  static confirmPassword(controlName1 : string ,controlName2 : string){
    return (control) => {
      let password = control.get(controlName1).value;
      let confirm = control.get(controlName2).value;
      return (password === confirm) ? null : {confirmPassword : true};
    }
  }

  // static confirmPassword(controlName1, controlName2){
  //     return (control) => {
  //         let password1 = control.get(controlName1).value;
  //         let password2 = control.get(controlName2).value;
  //         return (password1 === password2) ? null : {confirmPassword: true};
  //     }
  // }
}
