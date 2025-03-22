import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarpokeComponent } from './buscarpoke.component';

describe('BuscarpokeComponent', () => {
  let component: BuscarpokeComponent;
  let fixture: ComponentFixture<BuscarpokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarpokeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarpokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
