import { Component, input, output } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input<string>('Pesquisar');
  initialValue = input<string>('');

  searchChange = output<string>();
  protected searchControl = new FormControl('');

  constructor() {
    toObservable(this.initialValue)
      .pipe(takeUntilDestroyed())
      .subscribe(initialValue => {
        if (initialValue !== this.searchControl.value) {
          this.searchControl.setValue(initialValue, { emitEvent: false });
        }
      });

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(value => {
        this.searchChange.emit(value || '');
      });
  }
}
