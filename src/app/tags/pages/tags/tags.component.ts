import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@shared/directives/button.directive';
import { TagCardComponent } from '../../components/tag-card/tag-card.component';
import { TagCardSkeletonComponent } from '../../components/tag-card-skeleton/tag-card-skeleton.component';
import { Tag } from '../../models/tag';
import { TagsApiService } from '../../services/tags-api.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [ButtonDirective, TagCardSkeletonComponent, TagCardComponent],
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  private readonly tagsApiService = inject(TagsApiService);
  private readonly destroyRef = inject(DestroyRef);

  protected tags: Tag[] = [];
  protected tagsLoaded = false;

  ngOnInit(): void {
    this.loadTags();
  }

  private loadTags(): void {
    this.tagsLoaded = false;
    this.tagsApiService
      .getTags()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tags: Tag[]) => {
        this.tags = tags;
        this.tagsLoaded = true;
      });
  }
}
