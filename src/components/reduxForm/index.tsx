import React from 'react';
import { Button, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Field, SubmissionError, reduxForm, reset } from 'redux-form';
import { Input } from '@chakra-ui/react';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  margin-top: 50px;
`;

const ErrorText = styled.div`
  color: red;
`;

class ReduxForm extends React.Component {
  renderField = (field: any) => (
    <div className="input-row">
      <Input isInvalid={field.meta.error} {...field.input} type="text" />
      {field.meta.touched && field.meta.error && (
        <ErrorText className="error">{field.meta.error}</ErrorText>
      )}
    </div>
  );

  submit = (fields: any) => {
    const { firstName = '', lastName = '', email = '' } = fields;

    const error: any = {};
    let isError = false;
    if (firstName === '') {
      error.firstName = 'First name is required';
      isError = true;
    }

    if (lastName === '') {
      error.lastName = 'Last name is required';
      isError = true;
    }

    if (email === '') {
      error.email = 'Email is required';
      isError = true;
    }

    if (isError) {
      throw new SubmissionError(error);
    } else {
      console.log('Valid submition');
      // this?.props?.onSubmit(fields);
      this?.props?.dispatch(reset('contact'));
    }
  };

  render(): React.ReactNode {
    const { handleSubmit } = this.props; // this comes from props from redux forms (not from our parent)
    //const previousValues = this.props?.currentState?.form?.contact?.values;

    return (
      <Wrapper>
        <Heading>Redux Form handling</Heading>
        <Heading mb="4" as="h5" fontSize="lg" fontWeight="medium">
          Class based component
        </Heading>

        <form onSubmit={handleSubmit(this.submit)}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" component={this.renderField} type="text" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" component={this.renderField} type="text" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email">Email</label>
            <Field name="email" component={this.renderField} type="email" />
          </div>
          <Button style={{ width: '100%' }} type="submit">
            Submit
          </Button>
        </form>
      </Wrapper>
    );
  }
}

ReduxForm = reduxForm({ form: 'contact' })(ReduxForm);

const mapStateToProps = (state: any) => {
  return {
    currentState: state, // Fetch the entire current state
  };
};

export default connect(mapStateToProps)(ReduxForm);
