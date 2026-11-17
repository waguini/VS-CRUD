import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../notifications/notification.service';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-list.page.html',
  styleUrl: './user-list.page.css',
})
export class UserListPage implements OnInit {
  private readonly userService = inject(UserService);
  private readonly notifications = inject(NotificationService);

  readonly users = signal<User[]>([]);
  searchTerm = '';
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  get filteredUsers(): User[] {
    const term = this.searchTerm.trim().toLocaleLowerCase('pt-BR');
    const users = this.users();
    if (!term) return users;
    return users.filter((user) =>
      [user.name, user.document, user.city, user.state]
        .join(' ')
        .toLocaleLowerCase('pt-BR')
        .includes(term),
    );
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.userService.list().subscribe({
      next: (response) => {
        this.users.set(response.data ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Não foi possível carregar os usuários. Verifique se a API está disponível.');
        this.loading.set(false);
      },
    });
  }

  removeUser(user: User): void {
    if (!user.id || !window.confirm(`Excluir o cadastro de ${user.name}?`)) return;
    this.userService.delete(user.id).subscribe({
      next: () => {
        this.notifications.success('Usuário excluído com sucesso.');
        this.loadUsers();
      },
      error: () => {
        this.notifications.error('Não foi possível excluir este usuário.');
      },
    });
  }
}