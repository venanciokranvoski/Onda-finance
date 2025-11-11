import * as yup from 'yup'

export const sendCryptoSchema = yup.object({
  destinationAddress: yup
    .string()
    .required('Endereço obrigatório')
    .matches(/^[a-zA-Z0-9]{26,35}$/, 'endereço inválido'),
  quantity: yup
    .string()
    .required('quantidade obrigatória')
    .test('is-positive-number', 'deve ser número positivo', (value) => {
        if (!value) return false
        return !isNaN(Number(value)) && Number(value) > 0
    })
})

export type sendCryptoSchemaType = yup.InferType<typeof sendCryptoSchema>