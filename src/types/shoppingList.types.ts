export interface ShoppingItem {
    id: string;
    name: string;
    quantity: number;
    completed: boolean;
    createdBy: string;
    createdAt: string;
}

export interface ShoppingList {
    id: string;
    name: string;
    items: ShoppingItem[];
    owners: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ShoppingListState {
    lists: ShoppingList[];
    currentList: ShoppingList | null;
    loading: boolean;
    error: string | null;
}