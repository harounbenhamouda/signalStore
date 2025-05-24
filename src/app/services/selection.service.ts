import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Category, Option } from "../models/option.model";
import { MOCK_OPTIONS } from "../Data/mock-options";

@Injectable({ providedIn: 'root' })
export class SelectionService {
  public static readonly MAX_SELECTIONS = 10;
  private static readonly STORAGE_KEY = 'selectedOptions';
  private static readonly LAST_INDEX = SelectionService.MAX_SELECTIONS - 1;
  
  private _categoriesWithOptions: { category: Category; options: Option[] }[] | null = null;
  
  private selectedOptionsSubject = new BehaviorSubject<(Option | null)[]>(
    Array(SelectionService.MAX_SELECTIONS).fill(null)
  );
  public selectedOptions$ = this.selectedOptionsSubject.asObservable();
  
  private selectedIndexSubject = new BehaviorSubject<number>(-1);
  public selectedIndex$ = this.selectedIndexSubject.asObservable();
  
  public totalValue$ = this.selectedOptions$.pipe(
    map(options => options.reduce((sum, opt) => sum + (opt?.value || 0), 0))
  );
 
  constructor() {
    this.loadFromStorage();
  }

  /**
   * Lazily groups all available options by their category.
   * This getter performs the grouping only once on first access, and caches
   * the result for future calls.
   */
  public get categoriesWithOptions(): { category: Category; options: Option[] }[] {
    if (!this._categoriesWithOptions) {
      const grouped = new Map<Category, Option[]>();
  
      for (const option of MOCK_OPTIONS) {
        const current = grouped.get(option.category) || [];
        current.push(option);
        grouped.set(option.category, current);
      }
  
      this._categoriesWithOptions = Array.from(grouped.entries()).map(([category, options]) => ({
        category,
        options
      }));
    }
  
    return this._categoriesWithOptions;
  }

  public selectBox(index: number): void {
    if (index >= 0 && index < SelectionService.MAX_SELECTIONS) {
      this.selectedIndexSubject.next(index);
    }
  }

  public setOptionForCurrentBox(option: Option): void {
    const currentIndex = this.selectedIndexSubject.value;
    if (currentIndex < 0) return;
    
    const updated = [...this.selectedOptionsSubject.value];
    updated[currentIndex] = option;
    this.selectedOptionsSubject.next(updated);

    this.saveToStorage(updated);
    const nextIndex = this.findNextAvailableIndex(currentIndex);
    this.selectedIndexSubject.next(nextIndex);
  }

  public clearSelections(): void {
    const cleared = Array(SelectionService.MAX_SELECTIONS).fill(null);
    this.selectedOptionsSubject.next(cleared);
    this.selectedIndexSubject.next(0);
    this.removeFromStorage();
  }

  /**
   * Find the next available index for selection.
   * If all slots are filled, stay at the last index.
   */
  private findNextAvailableIndex(currentIndex: number): number {
    const options = this.selectedOptionsSubject.value;
    for (let i = currentIndex + 1; i < SelectionService.MAX_SELECTIONS; i++) {
      if (!options[i]) {
        return i;
      }
    }
    
   
    return currentIndex;
  }

  private saveToStorage(options: (Option | null)[]): void {
    try {
      localStorage.setItem(SelectionService.STORAGE_KEY, JSON.stringify(options));
    } catch (error) {
      console.warn('Failed to save selections to storage:', error);
    }
  }

  private removeFromStorage(): void {
    try {
      localStorage.removeItem(SelectionService.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to remove selections from storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem(SelectionService.STORAGE_KEY);
      if (!saved) return;
      
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === SelectionService.MAX_SELECTIONS) {
        this.selectedOptionsSubject.next(parsed);
      }
    } catch (error) {
      console.warn('Failed to load selections from storage:', error);
    }
  }
}