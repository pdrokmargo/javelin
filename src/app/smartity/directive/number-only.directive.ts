import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[NumberOnly]'
})

export class NumberOnlyDirective {
    
    regexStr = '^[0-9]*$';
    OnlyNumber: boolean = true;
    constructor(private el: ElementRef) {

    }
    
    @HostListener('keydown', [ '$event' ]) onKeyDown(e: KeyboardEvent) {
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
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
        
            } 

            // const ch = String.fromCharCode(e.keyCode);
            // const regEx =  new RegExp(this.regexStr);
            // if(regEx.test(ch)){
            //     return;
            // } else {
            //     e.preventDefault();
            // }
          }
      }
}