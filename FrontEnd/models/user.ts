export type IUser = {
  id: number
  addresses: IUserAddress[]
  email: string
  fullName: string
  phoneNumber: string
  userImage: string
  userDescription: string
  rateCount: number
  averageRate: number
  image?: string | null;
  role?: string | null;
}

export type IUserAddress = {
  city: string
  fullAddress: string
  id: number
  isDefault: boolean
  name: string
  phoneNumber: string
  postalCode: string
  state: string
  userId: number
}