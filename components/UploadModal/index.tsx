'use client';

import uniqid from 'uniqid';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';

import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface IUploadFile {
  file: File;
  title: string;
  uniqueID: string;
  tableName: string;
}

const UploadModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onClose } = useUploadModal();

  const [isLoading, setIsLoading] = useState(false);

  const { reset, register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      author: '',
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (open) return;

    reset();
    onClose();
  };

  async function uploadFile(params: IUploadFile) {
    try {
      const { file, tableName, title, uniqueID } = params;
      const filrOptions = { upsert: false, cacheControl: '3600' };

      const { data, error } = await supabaseClient.storage
        .from(tableName)
        .upload(`${tableName}-${title}-${uniqueID}`, file, filrOptions);

      return { data, error };
    } catch (error) {
      return { error };
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      if (!user) {
        toast.error('Usuário não encontrado.');
        return;
      }

      setIsLoading(true);

      const { author, song, image, title } = values;

      const songFile = song?.[0];
      const imageFile = image?.[0];

      if (!songFile || !imageFile) {
        toast.error('Oops, está faltando arquivos.');
        return;
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await uploadFile({
        title,
        uniqueID,
        file: songFile,
        tableName: 'songs',
      });

      if (songError) {
        toast.error('Oops, não foi possível carregar a música.');
        return;
      }

      const { data: imageData, error: imageError } = await uploadFile({
        title,
        uniqueID,
        file: imageFile,
        tableName: 'images',
      });

      if (imageError) {
        toast.error('Oops, não foi possível carregar a imagem.');
        return;
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          title,
          author,
          user_id: user.id,
          song_path: songData?.path,
          image_path: imageData?.path,
        });

      if (supabaseError) {
        toast.error(supabaseError.message);
        return;
      }

      reset();
      onClose();
      router.refresh();

      toast.success('Música adicionada!');
    } catch (error) {
      console.error(error);
      toast.error('Oops, não foi possível criar uma música.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Adicione uma música"
      description="Carregar um arquivo mp3"
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Título da Música"
          {...register('title', { required: true })}
        />

        <Input
          id="author"
          disabled={isLoading}
          placeholder="Autor da Música"
          {...register('author', { required: true })}
        />

        <div>
          <div className="pb-1">Selecione uma música</div>

          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register('song', { required: true })}
          />
        </div>

        <div>
          <div className="pb-1">Selecione uma imagem</div>

          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register('image', { required: true })}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Criar
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
