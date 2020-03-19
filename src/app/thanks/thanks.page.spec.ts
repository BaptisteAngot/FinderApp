import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThanksPage } from './thanks.page';

describe('ThanksPage', () => {
  let component: ThanksPage;
  let fixture: ComponentFixture<ThanksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThanksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
