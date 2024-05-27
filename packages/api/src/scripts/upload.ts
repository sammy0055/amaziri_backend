import fs from "node:fs/promises";
import path from "node:path";
import { ManageS3Storage } from "../services/aws/simple-storage";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
const sendObject = async () => {
  try {
    const filePath = `src/data/amazon_s3.pdf`;
    const data = await fs.readFile(filePath);

    const stats = await fs.stat(filePath);
    const fileName = path.extname(filePath);
console.log(fileName);
    // const metadata = {
    //   fileName,
    //   size: stats.size,
    //   createdAt: stats.birthtime,
    //   modifiedAt: stats.mtime,
    // };

    // const { createPresignedUrl } = new ManageS3Storage();
    // const url = await createPresignedUrl(fileName);
    // const res = await fetch(url, {
    //   method: "put",
    //   body: data,
    // });
    // if (!res.ok) throw { code: "error-occured" };
  } catch (err) {
    console.log(err);
  }
};

const getObject = async () => {
  try {
    const filePath = `src/data/amazon_s3.pdf`;
    const fileName = path.basename(filePath);

    const { downloadPresignedUrl } = new ManageS3Storage();
    const downloadUrl = await downloadPresignedUrl(fileName);
    const _res = await fetch(downloadUrl);

    const file = await _res.blob();
    // const decoder = new TextDecoder("utf-8");
    // const textContent = decoder.decode(file);
    const loader = new WebPDFLoader(file);
    const docs = await loader.load();
    if (!_res.ok) throw _res.json();
    console.log("file", docs[0].metadata);
  } catch (error: any) {
    console.log(error);
  }
};

// sendObject();
getObject();
