import type { UserInterface } from '@/interfaces/UserInterface';

export type BackendUserDTO = Omit<UserInterface, 'password'>;
