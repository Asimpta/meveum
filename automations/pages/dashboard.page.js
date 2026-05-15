import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.topbar = page.getByTestId('topbar');
    this.saudacao = page.getByTestId('dashboard-greeting');
    this.botaoSair = page.getByTestId('logout-button');
  }

  async abrir() {
    await this.page.goto('/dashboard');
  }

  async validarUsuarioExibido(nome) {
    await expect(this.topbar).toBeVisible();
    await expect(this.saudacao).toContainText(nome);
  }

  async validarRedirecionamentoParaLogin() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.page.getByTestId('login-form')).toBeVisible();
  }

  async sair() {
    await expect(this.botaoSair).toBeVisible();
    await this.botaoSair.focus();
    await this.page.keyboard.press('Enter');
    await this.validarRedirecionamentoParaLogin();
  }
}
