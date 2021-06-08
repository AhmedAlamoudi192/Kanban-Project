import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent implements OnInit {
  canDelete: boolean;

  @Output() delete = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  buttonPressed() {
    this.canDelete = true;
  }
  buttonCanceled() {
    this.canDelete = false;
  }

  deleteConfirmed() {
    this.delete.emit(true);
    this.canDelete = false;
  }
}
