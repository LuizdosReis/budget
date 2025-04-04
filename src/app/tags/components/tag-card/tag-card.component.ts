import { Component, input } from '@angular/core';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-tag-card',
  standalone: true,
  imports: [],
  templateUrl: './tag-card.component.html',
})
export class TagCardComponent {
  tag = input.required<Tag>();
}
