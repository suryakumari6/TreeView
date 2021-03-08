import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  fileArray: string[] = [];
  constructor() {}

  AddFileName(name: string) {
    this.fileArray.push(name);
    localStorage.setItem('fileArray', JSON.stringify(this.fileArray).replace('\\r', ''));
  }

    ClearFile() {
    this.fileArray = [];
    localStorage.removeItem('fileArray');
  }

  GetFiles() {
    let temp = JSON.parse(JSON.stringify(localStorage.getItem('fileArray')));
    let arr: string[] = [];
    if (temp) {
      temp.split(',').forEach((data: string) => {
        data = data.replace('[', '');
        data = data.replace('"', '');
        data = data.replace('"', '');
        data = data.replace(']', '');
        data = data.replace('\\r', '');
        arr.push(data);
      });
    }

    return arr;
  }
}
