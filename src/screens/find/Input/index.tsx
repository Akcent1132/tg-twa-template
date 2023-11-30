import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';

import styles from './styles.module.css';
import TextInput from '@src/components/TextInput';

const SuggestInput: React.FC<{ onChange: (value: string) => void }> = (
  props,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      props.onChange(value);
      setValue(value);
    },
    [setValue, props],
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <TextInput
      ref={inputRef}
      className={styles.input}
      defaultValue={value}
      placeholder='Search movie'
      onChange={onChange}
    />
  );
};

export default SuggestInput;
