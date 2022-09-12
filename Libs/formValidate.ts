const validate = (input: any) => {
  const errors : any = {};
  const regExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const regPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  
  //-------------------------name-----------------------//
  if (!input.name) {
    errors.name = 'Debe contener al menos 2 caracteres'
  } else if (input.name.length > 30) {
    errors.name = 'No puede ser mayor de 30 caracteres'
  }

  //-----------------------lastname---------------------//
  if (!input.lastname) {
    errors.lastname = 'Debe contener al menos 2 caracteres'
  } else if (input.lastname.length > 30) {
    errors.lastname = 'No puede ser mayor de 30 caracteres'
  }

  //------------------------email-----------------------//
  if (!input.email) {
    errors.email = 'El formato de tu correo no es válido'
  } else if (input.email.length && !regExp.test(input.email) ) {
    errors.email = 'El formato de tu correo no es válido'
  }

  //----------------------password-----------------------//
  if (!input.password) {
    errors.password = 'Debe contener al menos 8 characteres'
  } else if (input.password.length && !regPass.test(input.password) ) {
    errors.password = 'El formato de tu correo no es válido'
  }

  return errors;

};

export default validate;