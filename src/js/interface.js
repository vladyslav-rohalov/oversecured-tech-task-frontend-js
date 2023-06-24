import { refs } from './refs';

export function interfaceLogIn(email) {
  refs.loginBtn.classList.add('visually-hidden');
  refs.registerBtn.classList.add('visually-hidden');
  refs.heroUnauth.classList.add('visually-hidden');
  refs.loginFormHero.classList.add('visually-hidden');
  refs.logoutBtn.classList.remove('visually-hidden');
  refs.heroAuth.classList.remove('visually-hidden');
  refs.collapsBtn.classList.remove('visually-hidden');
  const userEmail = document.createElement('h2');
  userEmail.textContent = email;
  refs.hero.append(userEmail);
}

export function interfaceLogOut() {
  refs.loginBtn.classList.remove('visually-hidden');
  refs.registerBtn.classList.remove('visually-hidden');
  refs.heroUnauth.classList.remove('visually-hidden');
  refs.loginFormHero.classList.remove('visually-hidden');
  refs.logoutBtn.classList.add('visually-hidden');
  refs.heroAuth.classList.add('visually-hidden');
  refs.collapsBtn.classList.add('visually-hidden');
}
