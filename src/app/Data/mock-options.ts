import { Option } from '../models/option.model';

export const MOCK_OPTIONS: Option[] = [

  { id: 'front-1', label: '-.0', value: 1, category: 'front' },
  { id: 'front-2', label: '-.<', value: 1, category: 'front' },
  { id: 'front-3', label: '.1', value: 1, category: 'front' },
  { id: 'front-4', label: '.2', value: 2, category: 'front' },
  { id: 'front-5', label: '.3.4', value: 3.4, category: 'front' },


  { id: 'back-1', label: '-.0', value: 1, category: 'back' },
  { id: 'back-2', label: '-.<', value: 1, category: 'back' },
  { id: 'back-3', label: '-/.', value: 1, category: 'back' },
  { id: 'back-4', label: '-.x', value: 1, category: 'back' },
  { id: 'back-5', label: '1./', value: 1, category: 'back' },
  { id: 'back-6', label: '.2.', value: 2, category: 'back' },
  { id: 'back-16', label: '22o', value: 22, category: 'back' },
  { id: 'back-17', label: '23o', value: 23, category: 'back' },
  { id: 'back-18', label: '23/24', value: 24, category: 'back' },
  { id: 'back-19', label: '24o', value: 24, category: 'back' },
  { id: 'back-20', label: '44/', value: 44, category: 'back' },

  { id: 'back-25', label: '1-<', value: 1, category: 'back' },
  { id: 'back-26', label: '2-=0', value: 2, category: 'back' },
  { id: 'back-27', label: '2-==', value: 2, category: 'back' },



  { id: 'other-1', label: '(', value: 1, category: 'other' },
  { id: 'other-2', label: 'H', value: 2, category: 'other' },
  { id: 'other-3', label: 'F', value: 3, category: 'other' },
  { id: 'other-4', label: '^', value: 4, category: 'other' },
];
