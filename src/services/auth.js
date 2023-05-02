import db from '../models';


export const register = () => new Promise((resolve, reject) => {
  try {
    resolve('Register service')
    console.log('after/////')

  } catch (error) {
    reject(error)
  }
})