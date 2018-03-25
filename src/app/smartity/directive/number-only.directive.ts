import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[NumberOnly]'
})

export class NumberOnlyDirective {
    // // Allow decimal numbers and negative values
    // private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
    // // Allow key codes for special events. Reflect :
    // // Backspace, tab, end, home
    // private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', '-' ];
   
    regexStr = '^[0-9]*$';
    OnlyNumber: boolean = true;
    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', [ '$event' ]) onKeyDown(e: KeyboardEvent) {
        console.log('entro');  

        if (this.OnlyNumber) {
            if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode === 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+V
            (e.keyCode === 86 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
              // let it happen, don't do anything
              return;
            }

            const ch = String.fromCharCode(e.keyCode);
            const regEx =  new RegExp(this.regexStr);
            if(regEx.test(ch)){
                return;
            } else {
                e.preventDefault();
            }
          }

        // // Allow Backspace, tab, end, and home keys
        // if (this.specialKeys.indexOf(event.key) !== -1) {
        //     return;
        // }
        // console.log('entro2');
        // let current: string = this.el.nativeElement.value;
        // let next: string = current.concat(event.key);
        // if (next && !String(next).match(this.regex)) {
        //     event.preventDefault();
        // }
        // console.log('entro3');

      }

}
