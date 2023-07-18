'use client';

import Input from '../Input';

import qs from 'query-string';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import useDebounce from '@/hooks/useDebounce';

const SearchInput = () => {
  const router = useRouter();

  const [value, setValue] = useState('');

  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      query,
      url: '/search',
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      value={value}
      placeholder="O que você quer ouvir?"
      onChange={({ target: { value } }) => setValue(value)}
    />
  );
};

export default SearchInput;
