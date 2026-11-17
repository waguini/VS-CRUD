import { Routes } from '@angular/router';
import { UserFormPage } from './users/user-form.page';
import { UserListPage } from './users/user-list.page';

export const routes: Routes = [
	{ path: '', component: UserListPage, title: 'Usuários | Velsis' },
	{ path: 'usuarios/novo', component: UserFormPage, title: 'Novo usuário | Velsis' },
	{ path: 'usuarios/:id/editar', component: UserFormPage, title: 'Editar usuário | Velsis' },
	{ path: '**', redirectTo: '' },
];
