import { Directive, ElementRef, AfterViewInit } from '@angular/core';

declare var $: any;

@Directive({ selector: '[myAppendSubmenuIcon]' })

export class AppendSubmenuIconDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const $el = $(this.el.nativeElement);
    $el.find('.prepend-icon').prepend('<i class="material-icons">keyboard_arrow_right</i>');
  }
}
