import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { BoxComponent } from './box/box.component';
import { OptionSelectorComponent } from './option-selector/option-selector.component';
import { Option } from './models/option.model';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { SelectionService } from './services/selection.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoxComponent, OptionSelectorComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Interactive Box Selection </h1>
        <p>Click on boxes to select options</p>
      </header>

      <div class="box-grid">
        @for (i of boxes; track i) {
          <app-box
            [index]="i"
            [option]="(selectedOptions$ | async)?.[i] ?? null"
            [selected]="i === (selectedIndex$ | async)"
          ></app-box>
        }
      </div>

      <div class="footer">
        <div class="total-section">
          <span class="total-label">Total Value:</span>
          <span class="total-value">{{ totalValue$ | async }}</span>
        </div>
        <button 
          class="clear-button" 
          (click)="clearAllSelections()"
          type="button"
        >
          Clear All
        </button>
      </div>

      @let selectedIndex = selectedIndex$ | async;
      @if (selectedIndex !== null && selectedIndex >= 0) {
        <app-option-selector></app-option-selector>
      }
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .app-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .app-header h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .app-header p {
      color: #666;
      margin: 0;
    }

    .box-grid { 
      display: grid; 
      grid-template-columns: repeat(5, 1fr); 
      gap: 1rem; 
      margin-bottom: 2rem; 
    }

    @media (max-width: 768px) {
      .box-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .box-grid {
        grid-template-columns: 1fr;
      }
    }

    .footer { 
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .total-section {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .total-label {
      font-weight: 500;
      color: #495057;
    }

    .total-value {
      font-weight: 700;
      font-size: 1.2em;
      color: #007bff;
    }

    .clear-button {
      padding: 0.5rem 1rem;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .clear-button:hover {
      background: #c82333;
    }

    .clear-button:active {
      transform: translateY(1px);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  protected readonly boxes = Array.from({ length: SelectionService.MAX_SELECTIONS }, (_, i) => i);
  protected readonly selectedOptions$: Observable<(Option | null)[]>;
  protected readonly selectedIndex$: Observable<number>;
  protected readonly totalValue$: Observable<number>;

  constructor(private selectionService: SelectionService) {
   
    this.selectedOptions$ = this.selectionService.selectedOptions$;
    this.selectedIndex$ = this.selectionService.selectedIndex$;
    this.totalValue$ = this.selectionService.totalValue$;
  }

  protected clearAllSelections(): void {
    this.selectionService.clearSelections();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}