export interface Option {
    id: string;
    label: string;
    value: number;
    category: Category;
}
export type Category = 'front' | 'back' | 'other';