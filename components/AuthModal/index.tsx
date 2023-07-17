'use client';

import Modal from '../Modal';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import useAuthModal from '@/hooks/useAuthModal';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';

const AuthModal = () => {
  const router = useRouter();

  const { session } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onClose } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  useEffect(() => {
    if (!session) return;

    router.refresh();
    onClose();
  }, [router, session, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Bem-vinda(o) de volta"
      description="Acesse sua conta"
    >
      <Auth
        magicLink
        theme="dark"
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
