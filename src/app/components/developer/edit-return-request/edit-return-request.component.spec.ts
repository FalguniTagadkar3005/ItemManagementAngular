import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReturnRequestComponent } from './edit-return-request.component';

describe('EditReturnRequestComponent', () => {
  let component: EditReturnRequestComponent;
  let fixture: ComponentFixture<EditReturnRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReturnRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReturnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
