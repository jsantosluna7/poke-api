import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipospokeComponent } from './tipospoke.component';

describe('TipospokeComponent', () => {
  let component: TipospokeComponent;
  let fixture: ComponentFixture<TipospokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipospokeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipospokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
