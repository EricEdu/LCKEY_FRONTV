import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home'; // Importe o componente que você quer testar
import { useUser } from '@/assets/src/userContext';
import { useRouter } from 'expo-router';

jest.mock('@/assets/src/userContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

test('verifica se a tela Home está carregando corretamente', () => {
  useUser.mockReturnValue({ user: { entryCode: '123456', uid: 'test-uid' } });

  useRouter.mockReturnValue({ push: jest.fn() });

  render(<Home />);

  const titleElement = screen.getByText(/Bem-vindo à Home!/i);
  expect(titleElement).toBeInTheDocument();

  const subtitleElement = screen.getByText(/Você está logado!/i);
  expect(subtitleElement).toBeInTheDocument();

  const buttonElement = screen.getByRole('button', { name: /Sair/i });
  expect(buttonElement).toBeInTheDocument();
});