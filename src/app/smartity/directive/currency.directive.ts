import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { MycurrencyPipe } from '../pipe/mycurrency.pipe';
import { NgModel } from '@angular/forms';
@Directive({
  selector: '[ngModel][appMycurrency]',
  providers: [NgModel]
})
export class MycurrencyDirective implements OnInit {
  private el: any;

  constructor(
    private model: NgModel,
    private elementRef: ElementRef,
    private formatcurrencypipe: MycurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }
  ngOnInit() {
    this.el.value = this.formatcurrencypipe.transform(this.el.value);
    /*let that = this;
    let el = this.el;
    let _model = this.model;
    this.model.valueChanges.subscribe(function (value) {
      if (value) {
        el.value = that.formatcurrencypipe.transform(value);
        _model.valueChanges.unsubscribe();
      }
    });*/
  }

  @HostListener("focus", ["$event.target.value", "$event"])
  onFocus(value, event) {
    this.el.value = this.formatcurrencypipe.parse(value); // opossite of transform
    if (event.which == 9) {
      return false;
    }
    this.el.select();
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.formatcurrencypipe.transform(value);
  }
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();

    }
  }

}