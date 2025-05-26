import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Category, Option } from "../models/option.model";
import { MOCK_OPTIONS } from "../Data/mock-options";

@Injectable({ providedIn: 'root' })
export class SelectionService {
private readonly STORAGE_KEY = 'selectedOptions';
  private readonly MAX_SELECTIONS = 10;

  private _groupedOptionsCache: { category: Category; options: Option[] }[] | null = null;

  get maxSelections(): number {
    return this.MAX_SELECTIONS;
  }

  getCategorizedOptions(): { category: Category; options: Option[] }[] {
    if (!this._groupedOptionsCache) {
      const grouped = new Map<Category, Option[]>();
      for (const option of MOCK_OPTIONS) {
        const current = grouped.get(option.category) || [];
        current.push(option);
        grouped.set(option.category, current);
      }
      this._groupedOptionsCache = Array.from(grouped.entries()).map(([category, options]) => ({
        category,
        options
      }));
    }
    return this._groupedOptionsCache;
  }

  loadFromStorage(): (Option | null)[] | null {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === this.MAX_SELECTIONS) {
        return parsed;
      }
    } catch (error) {
      console.warn('Failed to load selections from storage:', error);
    }
    return null;
  }

  saveToStorage(options: (Option | null)[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(options));
    } catch (error) {
      console.warn('Failed to save selections to storage:', error);
    }
  }

  removeFromStorage(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to remove selections from storage:', error);
    }
  }

  findNextAvailableIndex(currentIndex: number): number {
    const LAST_INDEX = this.MAX_SELECTIONS - 1;
    return currentIndex >= LAST_INDEX ? LAST_INDEX : currentIndex + 1;
  }
}