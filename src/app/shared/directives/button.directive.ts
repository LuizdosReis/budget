import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';

export const base =
  'font-semibold transition-all disabled:opacity-50 px-6 py-3 rounded-lg duration-300 flex justify-center gap-3';

type Variant = 'primary' | 'secondary' | 'ghost';
export const variantClasses: { [key in Variant]: string } = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary:
    'border border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600',
  ghost: 'text-blue-500 hover:text-blue-600',
};

type Size = 'default' | 'small' | 'extra-small';
export const sizeClasses: { [key in Size]: string } = {
  default: 'text-base',
  small: 'text-sm',
  'extra-small': 'text-xs',
};

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective {
  private _variant: Variant = 'primary';
  private _size: Size = 'default';
  private _block = false;

  @HostBinding('class')
  private classes = this.buildClasses(this._variant, this._size, this._block);

  @Input() set variant(value: Variant) {
    this._variant = value;
    this.classes = this.buildClasses(this._variant, this._size, this._block);
  }

  @Input() set size(value: Size) {
    this._size = value;
    this.classes = this.buildClasses(this._variant, this._size, this._block);
  }

  @Input() set block(value: boolean) {
    this._block = value;
    this.classes = this.buildClasses(this._variant, this._size, this._block);
  }

  @Input() set isLoading(value: boolean) {
    this.elementRef.nativeElement.disabled = value;
    if (value) {
      this.addSpinnerSpanElement();
    } else {
      this.removeSpinnerSpanElement();
    }
  }

  constructor(
    private elementRef: ElementRef<HTMLButtonElement>,
    private renderer2: Renderer2
  ) {}

  private addSpinnerSpanElement(): void {
    const spinner = this.renderer2.createElement('span') as HTMLSpanElement;
    this.renderer2.addClass(spinner, 'animate-spin');
    this.renderer2.addClass(spinner, 'material-symbols-rounded');
    this.renderer2.appendChild(
      spinner,
      this.renderer2.createText('progress_activity')
    );
    this.renderer2.insertBefore(
      this.elementRef.nativeElement,
      spinner,
      this.elementRef.nativeElement.firstChild
    );
  }

  private removeSpinnerSpanElement(): void {
    this.renderer2.removeChild(
      this.elementRef.nativeElement,
      'span.animate-spin'
    );
  }

  private buildClasses(variant: Variant, size: Size, block: boolean): string {
    return `${base} ${variantClasses[variant]} ${sizeClasses[size]}
    ${block ? 'w-full' : ''}`;
  }
}
