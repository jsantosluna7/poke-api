import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerpokeComponent } from './obtenerpoke.component';

describe('ObtenerpokeComponent', () => {
  let component: ObtenerpokeComponent;
  let fixture: ComponentFixture<ObtenerpokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtenerpokeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerpokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
