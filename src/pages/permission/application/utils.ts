export function formatNumberToChinese(val: string | number): string {
  const map: any = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十',
  }
  const num = Number(val)
  return map[num]
}

export function exchangeData(data: any[], dragIndex: number, dropIndex: number) {
  ;[data[dragIndex], data[dropIndex]] = [data[dropIndex], data[dragIndex]]
}

export function translateStepName(val: string) {
  const map: Record<string, string> = {
    [`01`]: '第一步',
    [`02`]: '第二步',
    [`03`]: '第三步',
    [`04`]: '第四步',
    [`05`]: '第五步',
    [`06`]: '第六步',
    [`07`]: '第七步',
    [`08`]: '第八步',
    [`09`]: '第九步',
    [`10`]: '第十步',
  }

  return map[val]
}
