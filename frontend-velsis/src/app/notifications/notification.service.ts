import { Injectable, signal } from '@angular/core';

export type NotificationKind = 'success' | 'error';

export interface NotificationMessage {
  id: number;
  kind: NotificationKind;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly current = signal<NotificationMessage | null>(null);

  private nextId = 0;
  private dismissTimer: ReturnType<typeof setTimeout> | null = null;

  success(message: string): void {
    this.show('success', message);
  }

  error(message: string): void {
    this.show('error', message);
  }

  dismiss(): void {
    if (this.dismissTimer) clearTimeout(this.dismissTimer);
    this.dismissTimer = null;
    this.current.set(null);
  }

  private show(kind: NotificationKind, message: string): void {
    this.dismiss();
    const id = ++this.nextId;
    this.current.set({ id, kind, message });
    this.dismissTimer = setTimeout(() => {
      if (this.current()?.id === id) this.current.set(null);
      this.dismissTimer = null;
    }, 4000);
  }
}