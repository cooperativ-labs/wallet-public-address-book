import fileDownload from 'js-file-download';

export const GetSignatoriesFromAgreement = (agreement) => {
  return agreement.signatories.map((signatories) => {
    return signatories;
  });
};

export function DownloadFile(content: string, fileName: string) {
  fileDownload(content, fileName);
}
