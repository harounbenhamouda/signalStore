import { AsyncPipe, CommonModule, NgFor, TitleCasePipe } from "@angular/common";
import { SelectionService } from "../services/selection.service";
import { Category, Option } from "../models/option.model";
import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit, Signal } from "@angular/core";
import { map } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";
import { SelectionStore } from "../store/selection.store";

interface SelectionState {
  selectedOptions: (Option | null)[];
  selectedIndex: number;
}

@Component({
  selector: 'app-option-selector',
  standalone: true,
  imports: [AsyncPipe, CommonModule, TitleCasePipe],
  template: `
    @if (selectionState(); as selectionState) {
      <div class="selector-container">
        <div class="selector-header">
          <h2>Select Option for Box {{ selectionState.selectedIndex + 1 }}</h2>
          <p class="instruction">Choose from the categories below:</p>
        </div>
        
        @for (category of categorizedOptions(); track category.category) {
          <section class="category-section">
            <h3>{{ category.category | titlecase }}</h3>
            <div class="options-grid">
              @for (option of category.options; track option.id) {
                <div
                  class="option"
                  [class.active]="selectionState.selectedOptions[selectionState.selectedIndex]?.id === option.id"
                  (click)="selectOption(option)"
                >
                  <div class="option-label">{{ option.label }}</div>
                  <div class="option-value">{{ option.value }}</div>
                </div>
              }
            </div>
          </section>
        }
      </div>
    }
  `,
  styles: [`
    .selector-container {
      background: #fff;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-top: 2rem;
    }

    .selector-header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .selector-header h2 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .instruction {
      color: #666;
      margin: 0;
    }

    .category-section {
      margin-bottom: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .category-section h3 {
      margin: 0 0 1rem 0;
      color: #495057;
      font-weight: 600;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 0.75rem;
    }

    .option {
      padding: 1rem;
      border: 2px solid #dee2e6;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
      background: #fff;
    }

    .option:hover {
      background: #e9ecef;
      border-color: #adb5bd;
      transform: translateY(-1px);
    }

    .option.active {
      border-color: #007bff;
      background: #e3f2fd;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,123,255,0.2);
    }

    .option-label {
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .option-value {
      font-size: 0.9em;
      color: #666;
      font-weight: 600;
    }

    .option.active .option-value {
      color: #007bff;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionSelectorComponent  {
    private store = inject(SelectionStore);
  
protected selectionState: Signal<SelectionState> = computed(() => ({
  selectedOptions: this.store.selectedOptions(),
  selectedIndex: this.store.selectedIndex()
}));

protected categorizedOptions =
  this.store.categorizedOptions;

  
  protected selectOption(option: Option): void {
    this.store.setOptionForCurrentBox(option);
  }
}