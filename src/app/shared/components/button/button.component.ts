import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() size: 'default' | 'small' | 'extra-small' = 'default';
  @HostBinding('class.w-full')
  @Input()
  block = false;
  @Input() disabled = false;
  @Input() text = '';
  @Input() loading = false;
  @Input() icon: string | undefined;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
}
