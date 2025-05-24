import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SelectionService } from '../services/selection.service';
import { Option } from '../models/option.model';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="box"
      [class.selected]="selected"
      (click)="handleBoxClick()"
    >
      @if (option; as selectedOption) {
        <div class="option-content">
          <span class="option-label">{{ selectedOption.label }}</span>
          <br>
          <span class="option-value">Value: {{ selectedOption.value }}</span>
        </div>
      } @else {
        <div class="empty-box-text">Click to select</div>
      }
    </div>
  `,
  styles: [`
    .box {
      cursor: pointer;
      border: 2px solid #ccc;
      padding: 1rem;
      text-align: center;
      border-radius: 8px;
      background-color: #ffffff;
      transition: all 0.3s ease;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .box:hover {
      border-color: #999;
      background-color: #f8f9fa;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .box.selected {
      border-color: #007bff !important;
      background-color: #e3f2fd !important;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      transform: scale(1.02);
    }
    
    .empty-box-text {
      color: #6c757d;
      font-style: italic;
      opacity: 0.7;
    }
    
    .box.selected .empty-box-text {
      color: #007bff;
      font-weight: 500;
      opacity: 1;
    }

    .option-content {
      width: 100%;
    }

    .option-label {
      font-weight: 500;
    }

    .option-value {
      font-size: 0.9em;
      color: #666;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent {
  @Input() index: number = 0;
  @Input() option: Option | null = null;
  @Input() selected = false;

  constructor(private selectionService: SelectionService) {}

  public handleBoxClick() {
    this.selectionService.selectBox(this.index);
  }
}