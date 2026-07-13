import { fakeAsync, tick } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let spectator: Spectator<SearchInputComponent>;
  const createComponent = createComponentFactory({
    component: SearchInputComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render the default placeholder', () => {
    const input = spectator.query<HTMLInputElement>('input');
    expect(input?.placeholder).toBe('Pesquisar');
  });

  it('should render a custom placeholder', () => {
    spectator.setInput('placeholder', 'Search products');
    const input = spectator.query<HTMLInputElement>('input');
    expect(input?.placeholder).toBe('Search products');
  });

  it('should render initialValue in the input element', () => {
    spectator.setInput('initialValue', 'initial value');
    expect(spectator.query<HTMLInputElement>('input')?.value).toBe(
      'initial value'
    );
  });

  it('should update searchControl when initialValue changes, without emitting searchChange', fakeAsync(() => {
    const emitSpy = jasmine.createSpy('emitSpy');
    spectator.component.searchChange.subscribe(emitSpy);

    spectator.setInput('initialValue', 'new value');
    tick(400);

    expect(spectator.query<HTMLInputElement>('input')?.value).toBe('new value');
    expect(emitSpy).not.toHaveBeenCalled();
  }));

  it('should not overwrite the value if initialValue equals the current control value', fakeAsync(() => {
    spectator.typeInElement('same value', 'input');
    tick(400);

    const emitSpy = jasmine.createSpy('emitSpy');
    spectator.component.searchChange.subscribe(emitSpy);
    spectator.setInput('initialValue', 'same value');
    tick(400);

    expect(emitSpy).not.toHaveBeenCalled();
  }));

  it('should emit searchChange after typing, respecting the 400ms debounce', fakeAsync(() => {
    const emitSpy = jasmine.createSpy('emitSpy');
    spectator.component.searchChange.subscribe(emitSpy);

    spectator.typeInElement('test', 'input');

    tick(399);
    expect(emitSpy).not.toHaveBeenCalled();

    tick(1);
    expect(emitSpy).toHaveBeenCalledWith('test');
    expect(emitSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not emit searchChange twice for the same value', fakeAsync(() => {
    const emitSpy = jasmine.createSpy('emitSpy');
    spectator.component.searchChange.subscribe(emitSpy);

    spectator.typeInElement('test', 'input');
    tick(400);

    spectator.typeInElement('test', 'input');
    tick(400);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  }));

  it('should emit an empty string when the value is null or empty', fakeAsync(() => {
    const emitSpy = jasmine.createSpy('emitSpy');
    spectator.component.searchChange.subscribe(emitSpy);

    spectator.typeInElement('', 'input');
    tick(400);

    expect(emitSpy).toHaveBeenCalledWith('');
  }));
});
