
export class MaxCheckinsError extends Error {
  constructor(){
    super("Quantidade de checkins máxima atingida")
  }
}