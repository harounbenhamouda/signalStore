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
  { id: 'back-7', label: '3.4', value: 3.4, category: 'back' },
  { id: 'back-8', label: '4.5', value: 4.5, category: 'back' },
  { id: 'back-9', label: '5.6', value: 5.6, category: 'back' },
  { id: 'back-10', label: '6.7', value: 6.7, category: 'back' },
  { id: 'back-11', label: '7.8', value: 7.8, category: 'back' },
  { id: 'back-12', label: '1-0-1-<', value: 1, category: 'back' },
  { id: 'back-13', label: '-1-0-1-<', value: 1, category: 'back' },
  { id: 'back-14', label: '-1-2-0-2-<', value: 2, category: 'back' },
  { id: 'back-15', label: '21/22', value: 22, category: 'back' },
  { id: 'back-16', label: '22o', value: 22, category: 'back' },
  { id: 'back-17', label: '23o', value: 23, category: 'back' },
  { id: 'back-18', label: '23/24', value: 24, category: 'back' },
  { id: 'back-19', label: '24o', value: 24, category: 'back' },
  { id: 'back-20', label: '44/', value: 44, category: 'back' },
  { id: 'back-21', label: '----', value: 0, category: 'back' },
  { id: 'back-22', label: '---/', value: 0, category: 'back' },
  { id: 'back-23', label: '---|', value: 0, category: 'back' },
  { id: 'back-24', label: '---0', value: 0, category: 'back' },
  { id: 'back-25', label: '1-<', value: 1, category: 'back' },
  { id: 'back-26', label: '2-=0', value: 2, category: 'back' },
  { id: 'back-27', label: '2-==', value: 2, category: 'back' },
  { id: 'back-28', label: '====', value: 0, category: 'back' },


  { id: 'other-1', label: '(', value: 0, category: 'other' },
  { id: 'other-2', label: 'H', value: 0, category: 'other' },
  { id: 'other-3', label: 'F', value: 0, category: 'other' },
  { id: 'other-4', label: '^', value: 0, category: 'other' },
];
