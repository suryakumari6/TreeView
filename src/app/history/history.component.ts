import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  fileArray: string[] | undefined;
  resetFlag: boolean = false;
  constructor(private _fileService: FileService) {}

  ngOnInit(): void {
    this.fileArray = this._fileService.GetFiles();
    if (this.fileArray.length > 0) this.resetFlag = true;
  }

  Reset() {
    localStorage.removeItem('fileArray');
    this.fileArray = [];
    this._fileService.ClearFile();
    this.resetFlag = false;
  }
}
