import { FormEvent, FunctionComponent, useState } from 'react';
import encryptor from 'simple-encryptor';

import Button from '@/components/buttons/Button';

const Decoder: FunctionComponent = () => {
  const [inputTxt, setInputTxt] = useState<string>('');
  const [outputTxt, setOutputTxt] = useState<string>('');
  const [encDnc, setEncDnc] = useState<number>(0);
  const key = 'MESSI_IS_THE_GOAT_D10S';

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enCrypt = encryptor.createEncryptor(key);
    if (encDnc === 1) {
      setOutputTxt(enCrypt.encrypt(inputTxt));
    } else if (encDnc === 2) {
      const decrypted = enCrypt.decrypt(inputTxt);
      if (typeof decrypted === 'string') {
        setOutputTxt(decrypted);
      }
    }
  };

  return (
    <>
      <div className='flex-center h-screen w-full flex-col'>
        <form
          className='h-100 flex-center mb-4 h-screen w-1/2 flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md'
          onSubmit={(e) => {
            onSubmitHandler(e);
          }}
        >
          <div className='mb-4 w-full'>
            <label
              className='mb-2 block w-full text-sm font-bold text-gray-700'
              htmlFor='username'
            >
              Input Text
            </label>
            <textarea
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              id='username'
              placeholder='Input text....'
              value={inputTxt}
              onChange={(e) => setInputTxt(e.target.value)}
            />
          </div>
          <div className='flex-center w-full gap-5'>
            <button
              className='focus:shadow-outline w-1/3 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
              type='submit'
              onClick={() => {
                setEncDnc(1);
              }}
            >
              Encrypt
            </button>
            <button
              className='focus:shadow-outline w-1/3 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
              type='submit'
              onClick={() => {
                setEncDnc(2);
              }}
            >
              Decrypt
            </button>
          </div>
          <p className='my-5 w-full break-words text-center text-black'>
            {outputTxt}
          </p>
          {outputTxt && (
            <Button
              className='my-2'
              variant='outline'
              onClick={() => {
                navigator.clipboard.writeText(outputTxt);
              }}
            >
              Copy Text
            </Button>
          )}
        </form>
        <p className='text-center text-xs text-gray-500'>
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Decoder;
