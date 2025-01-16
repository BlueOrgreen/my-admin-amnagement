export type ProduceBrochureDetail = {
  refCode: string
  versionType: string
  recipeManufactureProcessList: {
    containerName: string
    containerNo: string
    contentList: ProcessContentType[]
  }[]
}

export type fileType = {
  uid: string
  status: string
  url: string
}

export type ProcessStepType = {
  detail: string
  stepName: string
  imgUrlList: any[]
}

export type ProcessContentType = {
  processName: string
  processContent: ProcessStepType[]
}

export type OperationHistoryType = {
  createdAt: string
  operationContent: string
  operationUserName: string
}

export type ExportResponseType = {
  name: string
  taskNo: string
  url: string
}

export type ContainerType = {
  containerName: string
  containerNo: string
  disabled: boolean
}

export type RawMaterialItemDataType = {
  containerCode: string
  dosage: number
  materialCode: string
  materialType: string
  ratio: number
  unitCode: string
}

export type RawMaterialDataType = {
  preparationVolume: string
  rawMaterialData: RawMaterialItemDataType[]
}

export type MaterialRatioDetail = {
  refCode: string
  versionType: string
  ratioType: string
  pickledTime: number
  isPickled: string
  containerContentList: {
    containerName: string
    containerNo: string
    rawMaterialData: RawMaterialDataType[]
  }[]
}

export type SemiAndMaterialType = {
  label: string
  value: string
  materialType: string
  unitCode: string
  name: string
  code: string
  type: string
  unit: string
}
