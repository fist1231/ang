import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'row',
  template: `
    <pre>{{ rowData }}</pre>
  `
})
export class RowComponent {
  @Input() public data: string;
  
  get rowData(): string {
    console.debug('getting row data');
    return this.data;
  }
  
  ngOnChanges(): void {
    console.debug('change');
  }
}