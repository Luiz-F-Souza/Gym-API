

export class EmailAlreadyRegistered extends Error {
  constructor(){
    super('Email já cadastrado')
  }
}