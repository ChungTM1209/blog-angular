import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListsComponent } from './album-lists.component';

describe('AlbumListsComponent', () => {
  let component: AlbumListsComponent;
  let fixture: ComponentFixture<AlbumListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
