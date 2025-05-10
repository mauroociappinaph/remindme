import { create } from 'zustand';
import { z } from 'zod';

// Define the user schema for validation
export const userSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type User = z.infer<typeof userSchema>;

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  error: string | null;

  // Actions
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  // Starting with one hardcoded user
  users: [{ email: 'test@example.com', password: '123456' }],
  error: null,

  login: (email, password) => {
    // Find the user with matching credentials
    const user = get().users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      set({ isAuthenticated: true, user, error: null });
      return true;
    } else {
      set({ error: 'Invalid email or password' });
      return false;
    }
  },

  register: (email, password) => {
    // Check if user already exists
    if (get().users.some((u) => u.email === email)) {
      set({ error: 'Email already registered' });
      return false;
    }

    try {
      // Validate input
      const newUser = userSchema.parse({ email, password });

      // Add new user to users array
      set((state) => ({
        users: [...state.users, newUser],
        error: null,
      }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        set({ error: error.errors[0].message });
      } else {
        set({ error: 'Registration failed' });
      }
      return false;
    }
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
