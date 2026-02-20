import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarAcessoComponent } from './recuperar-acesso.component';

describe('RecuperarAcessoComponent', () => {
  let component: RecuperarAcessoComponent;
  let fixture: ComponentFixture<RecuperarAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarAcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
