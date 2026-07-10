const Prefix = 'app';

export class LocalStorageService {
  private key(token: string): string {
    return `${Prefix}-${token}`;
  }

  getItem<T>(token: string): T | null {
    const raw = localStorage.getItem(this.key(token));
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  setItem<T>(token: string, value: T): void {
    localStorage.setItem(this.key(token), JSON.stringify(value));
  }

  removeItem(token: string): void {
    localStorage.removeItem(this.key(token));
  }
}

export const localStorageService = new LocalStorageService();
