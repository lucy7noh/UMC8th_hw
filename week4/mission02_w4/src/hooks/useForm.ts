import { useEffect, useState, ChangeEvent } from "react";

interface useFormProps<T> {
  initialValues: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValues, validate }: useFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof T, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return {
      name,
      value,
      onChange,
      onBlur,
    };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
