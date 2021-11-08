import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIpComponent } from './update-ip.component';

describe('UpdateIpComponent', () => {
  let component: UpdateIpComponent;
  let fixture: ComponentFixture<UpdateIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
