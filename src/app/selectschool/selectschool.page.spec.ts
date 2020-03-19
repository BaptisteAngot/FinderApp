import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectschoolPage } from './selectschool.page';

describe('SelectschoolPage', () => {
  let component: SelectschoolPage;
  let fixture: ComponentFixture<SelectschoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectschoolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectschoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
