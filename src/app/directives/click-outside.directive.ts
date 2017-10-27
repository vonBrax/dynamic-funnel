import {Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  
  public isTouchDevice: boolean = false;
  @Output()
  public clickOutside = new EventEmitter<Event>();
  
    constructor(private _elementRef: ElementRef ) {
  } 
  
  @HostListener('document:click', ['$event', '$event.target'])
  public onClick (event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement || this.isTouchDevice == true) {
      return;
    }
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if(!clickedInside) {
      this.clickOutside.emit(event);
    }
  }

  @HostListener('document:touchstart', ['$event', '$event.target'])
  public onTouchStart(event: TouchEvent, targetElement: HTMLElement) {
    this.isTouchDevice = true;
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if(!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}

// TODO: Test if phone closes if touch event listener is registered
// If not: detect touch event and add is-touch class to some
// parent element, set CSS rules to cursor pointer if is-touch class
// and cursor auto (min-width: 992px)

/*
DIRECTIVE: IS-TOUCH-AVAILABLE

function isTouchAvailableDirective($window) {
  return {
    restrict: 'A',
    scope: false,
    link: function($scope, $element, $attr) {
      
      // Feature detection for passive event listener
      // Ref: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
      //
      
      var supportsPassive = false;

      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function() {
            supportsPassive = true;
          }
        });
        $window.addEventListener('test', null, opts);
      } catch (e) {}

       // Helper directive to detect touch interaction and
       // to add CSS class on the selected element e.g on the `body` tag.
       //
       // Example use case: older versions of iOS required `cursor pointer`
       // as an indicator for attached event listeners to arbitrary elements
       
      function onFirstTouch() {
        $element.addClass('is-touch');

        $window.removeEventListener(
          'touchstart',
          onFirstTouch,
          supportsPassive ? { passive: true } : false
        );
      }

      $window.addEventListener(
        'touchstart',
        onFirstTouch,
        supportsPassive ? { passive: true } : false
      );
    }
  }
}

export default isTouchAvailableDirective;

*/