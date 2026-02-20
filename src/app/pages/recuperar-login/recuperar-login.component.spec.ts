import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarLoginComponent } from './recuperar-login.component';

describe('RecuperarLoginComponent', () => {
  let component: RecuperarLoginComponent;
  let fixture: ComponentFixture<RecuperarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
