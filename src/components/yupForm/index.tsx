import React from 'react';
import { Button, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormValues = {
  email: string;
  username: string;
  password: string;
};

const Wrapper = styled.div`
  margin: 50px 0 50px  ;
`;

const ErrorText = styled.div`
  color: red;
`;

const YupForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema) as any,
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  return (
    <Wrapper>
      <Heading my="4">Yup Validations - RHF</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Email</label>
          <Input type="text" id="email" {...register('email')} />
          <ErrorText>{errors?.email?.message}</ErrorText>
        </div>

        <div className="form-control">
          <label>Username</label>
          <Input type="text" id="username" {...register('username')} />
          <ErrorText>{errors?.username?.message}</ErrorText>
        </div>
        <div className="form-control">
          <label>Password</label>
          <Input type="text" id="password" {...register('password')} />
          <ErrorText>{errors?.password?.message}</ErrorText>
        </div>
        <Button mt="20px" width="100%" type="submit">
          Submit
        </Button>
      </form>
    </Wrapper>
  );
};

export default YupForm;
