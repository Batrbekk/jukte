export type Orders = {
  readonly data: {
    readonly orders: [
      {
        readonly cubProduct: string,
        readonly date: string,
        readonly description: string,
        readonly detail: string,
        readonly distance: string,
        readonly from: string,
        readonly loadType: string,
        readonly logPrice: string,
        readonly owner: string,
        readonly ownerCompany: string,
        readonly ownerPhone: string,
        readonly ownerRole: string,
        readonly price: string,
        readonly product: string,
        readonly status: string,
        readonly time: string,
        readonly to: string,
        readonly transfer1: string,
        readonly transfer2: string,
        readonly transfer3: string,
        readonly transfer4: string,
        readonly type: string,
        readonly weight: string,
        readonly _id: string,
      }
    ]
  }
  readonly pagination: {
    readonly page: number,
    readonly total: number,
  }
}
