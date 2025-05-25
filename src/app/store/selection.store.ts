import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Category, Option } from '../models/option.model';
import { MOCK_OPTIONS } from '../Data/mock-options';


interface SelectionState {
  selectedOptions: (Option | null)[];
  selectedIndex: number;
  maxSelections: number;
}


const initialState: SelectionState = {
  selectedOptions: Array(10).fill(null),
  selectedIndex: -1,
  maxSelections: 10
};

const STORAGE_KEY = 'selectedOptions';

const saveToStorage = (options: (Option | null)[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
  } catch (error) {
    console.warn('Failed to save selections to storage:', error);
  }
};

const loadFromStorage = (): (Option | null)[] | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length === 10) {
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to load selections from storage:', error);
  }
  return null;
};

const removeFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to remove selections from storage:', error);
  }
};

 
export const SelectionStore = signalStore(
  { providedIn: 'root' },
  
  
  withState(() => {
    const savedOptions = loadFromStorage();
    return {
      ...initialState,
      selectedOptions: savedOptions || initialState.selectedOptions
    };
  }),
    withComputed((store) => ({ 
   
    totalValue: computed(() => 
      store.selectedOptions().reduce((sum, opt) => sum + (opt?.value || 0), 0)
    ),
    
   
    currentSelectedOption: computed(() => {
      const index = store.selectedIndex();
      return index >= 0 ? store.selectedOptions()[index] : null;
    }),
     
    categorizedOptions: computed(() => {
      const grouped = new Map<Category, Option[]>();
      
      for (const option of MOCK_OPTIONS) {
        const current = grouped.get(option.category) || [];
        current.push(option);
        grouped.set(option.category, current);
      }
      
      return Array.from(grouped.entries()).map(([category, options]) => ({
        category,
        options
      }));
    })
  })),
  
 
  withMethods((store) => ({
  
    selectBox: (index: number) => {
      if (index >= 0 && index < store.maxSelections()) {
        patchState(store, { selectedIndex: index });
      }
    },
    setOptionForCurrentBox: (option: Option) => {
      const currentIndex = store.selectedIndex();
      if (currentIndex < 0) return;
      
      const updated = [...store.selectedOptions()];
      updated[currentIndex] = option;
      saveToStorage(updated);
      const nextIndex = findNextAvailableIndex(currentIndex);
      
      patchState(store, {
        selectedOptions: updated,
        selectedIndex: nextIndex
      });
    },
    
 
    clearSelections: () => {
      const cleared = Array(store.maxSelections()).fill(null);
      removeFromStorage();
      
      patchState(store, {
        selectedOptions: cleared,
        selectedIndex: 0
      });
    },
    
    isOptionSelected: (optionId: string) => {
      return store.selectedOptions().some(opt => opt?.id === optionId);
    },
    getOptionAtIndex: (index: number) => {
      return store.selectedOptions()[index] || null;
    },
  }))
);

function findNextAvailableIndex(currentIndex: number): number {
  const LAST_INDEX = initialState.maxSelections - 1;

  if (currentIndex >= LAST_INDEX) {
    return LAST_INDEX;
  }

  return currentIndex + 1;
}
