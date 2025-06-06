export type User = {
    id: string;
    name: string;
    role: 'admin' | 'owner' | 'server' | 'employee';
    storeId: string;
    tipRate: number;
    createdAt: string;
    updatedAt: string;
};

export type ShiftRecord = {
    id: string;
    userId: string;
    storeId: string;
    startTime: string;
    endTime: string;
    restMinutes: number;
    sales: number | null;
    tips: number | null;
    calculatedEarnings: number;
    createdAt: string;
    day: string;
};

export type Store = {
    id: string;
    name: string;
    ownerId: string;
    createdAt: string;
};

export type Database = {
    public: {
        Tables: {
            users: {
                Row: User;
                Insert: Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
                Update: Partial<Omit<User, 'id'>>;
            };
            shift_records: {
                Row: ShiftRecord;
                Insert: Omit<ShiftRecord, 'id' | 'createdAt' | 'calculatedEarnings'>;
                Update: Partial<Omit<ShiftRecord, 'id'>>;
            };
            stores: {
                Row: Store;
                Insert: Omit<Store, 'id' | 'createdAt'>;
                Update: Partial<Omit<Store, 'id'>>;
            };
        };
    };
}; 