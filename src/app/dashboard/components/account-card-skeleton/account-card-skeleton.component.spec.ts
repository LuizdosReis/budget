import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCardSkeletonComponent } from './account-card-skeleton.component';

describe('AccountCardSkeletonComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      declarations: [AccountCardSkeletonComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(AccountCardSkeletonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
