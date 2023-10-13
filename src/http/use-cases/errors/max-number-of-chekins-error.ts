
export class MaxCheckinsError extends Error {
  constructor(){
    super("Quantidade de chekins máxima atingida")
  }
}