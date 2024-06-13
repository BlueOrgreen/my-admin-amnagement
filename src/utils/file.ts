/**
 * 文件相关操作
 */

/**
 * @description 下载文件
 * @param blob 文件 Blob 流
 * @param name 文件名
 */
const downBlob = (blob: any, name: string) => {
    let downloadElement = document.createElement('a');
    let href = window.URL.createObjectURL(blob);
    downloadElement.href = href;
    downloadElement.download = name;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(href);
  };