import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificationService } from '../notifications/notification.service';
import { User } from './user.model';
import { UserService } from './user.service';

function cpfFormatValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim();
  if (!value) return null;
  return /^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(value) ? null : { cpf: true };
}

function dateFormatValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return { dateFormat: true };

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    ? null
    : { dateFormat: true };
}

@Component({
  selector: 'app-user-form-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.page.html',
  styleUrl: './user-form.page.css',
})
export class UserFormPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly notifications = inject(NotificationService);

  readonly userId = Number(this.route.snapshot.paramMap.get('id'));
  readonly editing = this.route.snapshot.paramMap.has('id');
  readonly loading = signal(this.editing);
  readonly saving = signal(false);
  readonly errorMessage = signal('');

  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(120)] }),
    birthDate: new FormControl('', { nonNullable: true, validators: [dateFormatValidator] }),
    document: new FormControl('', { nonNullable: true, validators: [cpfFormatValidator] }),
    addressLine: new FormControl('', { nonNullable: true }),
    addressNumber: new FormControl<number | null>(null),
    city: new FormControl('', { nonNullable: true }),
    state: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(2)] }),
    zip: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    if (!this.editing) return;
    this.userService.find(this.userId).subscribe({
      next: ({ data }) => {
        this.form.patchValue({
          name: data.name,
          birthDate: data.birthDate ?? '',
          document: data.document ?? '',
          addressLine: data.addressLine ?? '',
          addressNumber: data.addressNumber,
          city: data.city ?? '',
          state: data.state ?? '',
          zip: data.zip ?? '',
        });
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Não foi possível carregar os dados deste usuário.');
        this.loading.set(false);
      },
    });
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    const user: User = {
      ...values,
      birthDate: values.birthDate || null,
      addressNumber: values.addressNumber === null ? null : Number(values.addressNumber),
    };

    this.saving.set(true);
    this.errorMessage.set('');
    const observer = {
      next: () => {
        this.notifications.success(this.editing ? 'Usuário atualizado com sucesso.' : 'Usuário cadastrado com sucesso.');
        this.router.navigate(['/']);
      },
      error: (error: { error?: { message?: string } }) => {
        this.notifications.error(error.error?.message ?? 'Não foi possível salvar o usuário.');
        this.saving.set(false);
      },
    };

    if (this.editing) {
      this.userService.update(this.userId, user).subscribe(observer);
    } else {
      this.userService.create(user).subscribe(observer);
    }
  }
}