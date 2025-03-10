const tableColumn = [
  {
    name: "id",
    label: "ID",
    field: "id",
    sortable: true,
    align: 'left' as any,
  },
  {
    name: "name",
    label: "Nome",
    field: "name",
    sortable: false,
    align: 'left' as any,
  },
  {
    name: "cel",
    label: "Wpp",
    field: "whatsapp",
    sortable: false,
    align: 'left' as any,
  },
  {
    name: "wallet",
    label: "Carteira",
    field: "wallet",
    sortable: false,
    align: 'left' as any,
  },
  {
    name: 'actions',
    label: 'Acões',
    field: 'id',
    align: 'center' as any,
  }
]

export default tableColumn
