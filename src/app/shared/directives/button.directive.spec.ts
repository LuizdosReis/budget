import { createDirectiveFactory } from '@ngneat/spectator';
import {
  base,
  ButtonDirective,
  sizeClasses,
  variantClasses,
} from './button.directive';

describe('ButtonDirective', () => {
  const createDirective = createDirectiveFactory({
    directive: ButtonDirective,
    template: '<button appButton>Text</button>',
  });

  it('should create', () => {
    const spectator = createDirective();
    expect(spectator.directive).toBeDefined();
  });

  it('should have base classes', () => {
    const spectator = createDirective();
    base
      .split(' ')
      .forEach(clazz => expect(spectator.element).toHaveClass(clazz));
  });

  it('should have primary variant classes by default', () => {
    const spectator = createDirective();
    variantClasses['primary']
      .split(' ')
      .forEach(clazz => expect(spectator.element).toHaveClass(clazz));
  });

  it('should have secondary variant classes when secondary variant is set', () => {
    const spectator = createDirective(
      '<button appButton variant="secondary">Text</button>'
    );
    variantClasses['secondary']
      .split(' ')
      .forEach(clazz => expect(spectator.element).toHaveClass(clazz));
  });

  it('should have ghost variant classes when ghost variant is set', () => {
    const spectator = createDirective(
      '<button appButton variant="ghost">Text</button>'
    );
    variantClasses['ghost']
      .split(' ')
      .forEach(clazz => expect(spectator.element).toHaveClass(clazz));
  });

  it('should have default size classes by default', () => {
    const spectator = createDirective();
    sizeClasses['default']
      .split(' ')
      .forEach(clazz => expect(spectator.element).toHaveClass(clazz));
  });

  it('should have small size classes when small size is set', () => {
    const spectator = createDirective(
      '<button appButton size="small">Text</button>'
    );
    sizeClasses['small']
      .split(' ')
      .forEach(clazz => expect(spectator.element).toHaveClass(clazz));
  });

  it('should have extra-small size classes when extra-small size is set', () => {
    const spectator = createDirective(
      '<button appButton size="extra-small">Text</button>'
    );
    sizeClasses['extra-small']
      .split(' ')
      .forEach(clazz => expect(spectator.element).toHaveClass(clazz));
  });

  it('should not have w-full class by default', () => {
    const spectator = createDirective();
    expect(spectator.element).not.toHaveClass('w-full');
  });

  it('should have w-full class when block is set', () => {
    const spectator = createDirective(
      '<button appButton block="true">Text</button>'
    );
    expect(spectator.element).toHaveClass('w-full');
  });

  it('should have animated spin span when isLoading is true', () => {
    const spectator = createDirective(
      '<button appButton [isLoading]="true">Text</button>'
    );
    const spinSpan = spectator.element.children.item(0);
    expect(spinSpan).toBeTruthy();
    expect(spinSpan).toHaveClass('animate-spin material-symbols-rounded');
    expect(spinSpan).toHaveText('progress_activity');
  });

  it('should not have animated spin span when isLoading is false', () => {
    const spectator = createDirective(
      '<button appButton [isLoading]="false">Text</button>'
    );
    const spinSpan = spectator.element.children.item(0);
    expect(spinSpan).toBeFalsy();
  });

  it('should remove the spinner when isLoading changes from true to false', () => {
    const spectator = createDirective(
      '<button appButton [isLoading]="isLoading">Text</button>'
    );
    spectator.setInput('isLoading', true);

    let spinSpan = spectator.element.querySelector('span.animate-spin');
    expect(spinSpan).toBeTruthy();
    expect(spinSpan).toHaveClass('animate-spin material-symbols-rounded');
    expect(spinSpan).toHaveText('progress_activity');

    spectator.setInput('isLoading', false);

    spinSpan = spectator.element.querySelector('span.animate-spin');
    expect(spinSpan).toBeFalsy();
  });

  it('should be disabled when isLoading is true', () => {
    const spectator = createDirective(
      '<button appButton [isLoading]="true">Text</button>'
    );
    expect(spectator.element).toHaveAttribute('disabled');
  });

  it('should not be disabled when isLoading is false', () => {
    const spectator = createDirective(
      '<button appButton [isLoading]="false">Text</button>'
    );
    expect(spectator.element).not.toHaveAttribute('disabled');
  });

  it('should remove original content when isLoading is true', () => {
    const spectator = createDirective(
      '<button appButton [isLoading]="isLoading">Text</button>'
    );

    expect(spectator.element.textContent).toContain('Text');

    spectator.setInput('isLoading', true);
    spectator.detectChanges();

    expect(spectator.element.textContent).not.toContain('Text');

    const spinnerElement = spectator.query('span.animate-spin');
    expect(spinnerElement).toBeTruthy();
    expect(spectator.element.children.length).toBe(1);
  });

  it('should add original content when isLoading is false', () => {
    const spectator = createDirective(
      '<button appButton [isLoading]="isLoading">Text</button>'
    );

    expect(spectator.element.textContent).toContain('Text');

    spectator.setInput('isLoading', true);
    spectator.detectChanges();

    expect(spectator.element.textContent).not.toContain('Text');

    spectator.setInput('isLoading', false);
    spectator.detectChanges();

    expect(spectator.element.textContent).toContain('Text');
    const spinnerElement = spectator.query('span.animate-spin');
    expect(spinnerElement).toBeFalsy();
  });
});
