import { byTestId, createHostFactory, Spectator } from '@ngneat/spectator';
import { HeaderMenuComponent } from './header-menu.component';

describe('HeaderMenuComponent', () => {
  let spectator: Spectator<HeaderMenuComponent>;
  const createHost = createHostFactory<HeaderMenuComponent>({
    component: HeaderMenuComponent,
  });

  beforeEach(() => {
    spectator = createHost(
      '<div data-testid="header-menu-wrapper"><app-header-menu></app-header-menu></div>'
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should start with the class -left-1/2', () => {
    expect(spectator.query(byTestId('app-menu'))).not.toHaveClass('left-0');
    expect(spectator.query(byTestId('app-menu'))).toHaveClass('-left-1/2');
  });

  it('should have the class left-0 when click on the button', () => {
    spectator.click('button');

    expect(spectator.query(byTestId('app-menu'))).toHaveClass('left-0');
    expect(spectator.query(byTestId('app-menu'))).not.toHaveClass('-left-1/2');
  });

  it('should have the class -left-1/2 when click on the button twice', () => {
    for (let i = 1; i <= 2; i++) {
      spectator.click('button');
    }

    expect(spectator.query(byTestId('app-menu'))).not.toHaveClass('left-0');
    expect(spectator.query(byTestId('app-menu'))).toHaveClass('-left-1/2');
  });

  it('should have the class -left-1/2 when click out', () => {
    spectator.click('button');

    expect(spectator.query(byTestId('app-menu'))).toHaveClass('left-0');

    spectator.click(byTestId('header-menu-wrapper'));

    expect(spectator.query(byTestId('app-menu'))).toHaveClass('-left-1/2');
  });
});
