import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';

export const base =
  'font-semibold transition-all disabled:opacity-50 px-6 py-3 rounded-lg duration-300 flex justify-center gap-3 focus:outline-none focus:ring-2';

export type Variant = 'primary' | 'secondary' | 'ghost';
export const variantClasses: { [key in Variant]: string } = {
  primary: 'text-white',
  secondary: 'border',
  ghost: '',
};

export type Color = 'primary' | 'secondary' | 'danger';
export const colorsClasses: { [key in Variant]: { [key in Color]: string } } = {
  primary: {
    primary: 'bg-primary-500 hover:bg-primary-600 focus:ring-primary-300',
    secondary:
      'bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-300',
    danger: 'bg-danger-500 hover:bg-danger-600 focus:ring-danger-300',
  },
  secondary: {
    primary:
      'border-primary-500 hover:border-primary-600 text-primary-500 hover:text-primary-600 focus:ring-primary-300',
    secondary:
      'border-secondary-500 hover:border-secondary-600 text-secondary-500 hover:text-secondary-600 focus:ring-secondary-300',
    danger:
      'border-danger-500 hover:border-danger-600 text-danger-500 hover:text-danger-600 focus:ring-danger-300',
  },
  ghost: {
    primary: 'text-primary-500 hover:text-primary-600 focus:ring-primary-300',
    secondary:
      'text-secondary-500 hover:text-secondary-600 focus:ring-secondary-300',
    danger: 'text-danger-500 hover:text-danger-600 focus:ring-danger-300',
  },
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
  private _color: Color = 'primary';
  private originalContent: Node[] = [];

  @HostBinding('class')
  private classes = this.buildClasses(
    this._variant,
    this._color,
    this._size,
    this._block
  );

  @Input() set variant(value: Variant) {
    this._variant = value;
    this.classes = this.buildClasses(
      this._variant,
      this._color,
      this._size,
      this._block
    );
  }

  @Input() set size(value: Size) {
    this._size = value;
    this.classes = this.buildClasses(
      this._variant,
      this._color,
      this._size,
      this._block
    );
  }

  @Input() set color(value: Color) {
    this._color = value;
    this.classes = this.buildClasses(
      this._variant,
      this._color,
      this._size,
      this._block
    );
  }

  @Input() set block(value: boolean) {
    this._block = value;
    this.classes = this.buildClasses(
      this._variant,
      this._color,
      this._size,
      this._block
    );
  }

  @Input() set isLoading(value: boolean) {
    this.elementRef.nativeElement.disabled = value;
    if (value) {
      this.addSpinnerSpanElement();
    } else {
      this.removeSpinnerSpanElement();
      this.restoreOriginalContent();
    }
  }

  constructor(
    private elementRef: ElementRef<HTMLButtonElement>,
    private renderer2: Renderer2
  ) {}

  private addSpinnerSpanElement(): void {
    this.originalContent = Array.from(this.elementRef.nativeElement.childNodes);
    const width = this.elementRef.nativeElement.offsetWidth;
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'width',
      `${width}px`
    );
    this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', '');

    const spinner = this.renderer2.createElement('i') as HTMLElement;
    this.renderer2.addClass(spinner, 'fa-solid');
    this.renderer2.addClass(spinner, 'fa-circle-notch');
    this.renderer2.addClass(spinner, 'animate-spin');
    this.renderer2.insertBefore(
      this.elementRef.nativeElement,
      spinner,
      this.elementRef.nativeElement.firstChild
    );
  }

  private removeSpinnerSpanElement(): void {
    const spinner =
      this.elementRef.nativeElement.querySelector('i.animate-spin');
    if (spinner) {
      this.renderer2.setProperty(
        this.elementRef.nativeElement,
        'innerHTML',
        ''
      );
      this.renderer2.removeChild(this.elementRef.nativeElement, spinner);
    }
  }

  private restoreOriginalContent(): void {
    if (this.originalContent.length > 0) {
      this.originalContent.forEach(node => {
        this.renderer2.appendChild(
          this.elementRef.nativeElement,
          node.cloneNode(true)
        );
      });
    }
  }

  private buildClasses(
    variant: Variant,
    color: Color,
    size: Size,
    block: boolean
  ): string {
    return `${base} ${variantClasses[variant]} ${
      colorsClasses[variant][color]
    } ${sizeClasses[size]}
    ${block ? 'w-full' : ''}`;
  }
}
