import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IplogsComponent } from './iplogs.component';

describe('IplogsComponent', () => {
  let component: IplogsComponent;
  let fixture: ComponentFixture<IplogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IplogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IplogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
