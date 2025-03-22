import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() name: string = '';
  @Input() img: string = '';
  @Input() height: string = '';
  @Input() weight: string = '';
  @Input() widthPercent: number = 0;
  @Input() types: any[] = [];
  @Input() colorType: string = '';
  @Input() stats: any[] = [];
  @Input() debilities: any[] = [];
  @Input() id: string = '';
}
