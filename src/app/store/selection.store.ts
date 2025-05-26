import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Category, Option } from '../models/option.model';
import { MOCK_OPTIONS } from '../Data/mock-options';
import { SelectionService } from '../services/selection.service';


interface SelectionState {
  selectedOptions: (Option | null)[];
  selectedIndex: number;
  maxSelections: number;
}


const MAX_SELECTIONS = 10;

const initialState: SelectionState = {
  selectedOptions: Array(MAX_SELECTIONS).fill(null),
  selectedIndex: -1,
  maxSelections: MAX_SELECTIONS,
};


export const SelectionStore = signalStore(
  { providedIn: 'root' },

 withState(() => {
  const service = inject(SelectionService);

  return {
    ...initialState,
    selectedOptions: service.loadFromStorage() || initialState.selectedOptions,
    maxSelections: service.maxSelections
  };
}),

  withComputed((store) => {
    const service = inject(SelectionService);

    return {
      totalValue: computed(() =>
        store.selectedOptions().reduce((sum, opt) => sum + (opt?.value || 0), 0)
      ),

      currentSelectedOption: computed(() => {
        const index = store.selectedIndex();
        return index >= 0 ? store.selectedOptions()[index] : null;
      }),

      categorizedOptions: computed(() => {
        return service.getCategorizedOptions();
      })
    };
  }),

  withMethods((store) => {
    const service = inject(SelectionService);

    return {
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
        service.saveToStorage(updated);

        patchState(store, {
          selectedOptions: updated,
          selectedIndex: service.findNextAvailableIndex(currentIndex)
        });
      },

      clearSelections: () => {
        const cleared = Array(store.maxSelections()).fill(null);
        service.removeFromStorage();

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
      }
    };
  })
);