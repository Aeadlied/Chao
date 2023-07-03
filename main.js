import { promises as fs } from 'fs';
import fetch from 'node-fetch';

async function readRemoteFile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch remote file ${url}`);
  }
  return await response.text();
}

async function readLineFromFile(filePath) {
  try {
     // 读取颜表情
    const facePath = 'http://rx475xwwv.hb-bkt.clouddn.com/face.txt';
    const dataFace = await readRemoteFile(facePath);
    // 将文件内容按行分割
    const linesFace = dataFace.split('\n');
    // 随机生成要读取的行数
    const lineNumberFace = Math.floor(Math.random() * linesFace.length) + 1;
    // 获取指定行的内容
   const lineContentFace = linesFace[lineNumberFace - 1];

    //读取句子
    // 读取文件内容
    const data = await readRemoteFile(filePath);
    // 将文件内容按行分割
    const lines = data.split('\n');
    // 随机生成要读取的行数
    const lineNumber = Math.floor(Math.random() * lines.length) + 1;
    // 获取指定行的内容并返回
   const lineContent = lines[lineNumber - 1];
    // 使用正则表达式匹配行号和句子
    const matchResult = lineContent.match(/^(\d+)\.\s+(.*)$/);
    // 如果匹配成功，则返回去掉行号的句子；否则返回原始内容
    const content = matchResult ? matchResult[2].trim() : lineContent.trim();
    // 计算在一起的天数
    const now = new Date();
    const start = new Date('2023-02-04');
    const diffInDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    // 计算认识的天数
    const start2 = new Date('2005-09-01');
    const diffInDays2 = Math.floor((now - start2) / (1000 * 60 * 60 * 24));

    //读取图片
    const countOfImgPath = 'http://rx475xwwv.hb-bkt.clouddn.com/CountOfImage.txt';
    const dataCount = await readRemoteFile(countOfImgPath);
    // 将文件内容按行分割
    const linesCount = dataCount.split('\n');
    const count = linesCount[0];
    const number = Math.floor(Math.random() * count) + 1
    const imgUrl = `http://rx475xwwv.hb-bkt.clouddn.com/img/${number}.jpg`;

    // 拼接返回值
    return `今天是我们在一起的第${diffInDays}天\n<br>今天是我们认识的第${diffInDays2}天<br>${lineContentFace}<br><br>今日份问候：<br>${content}<br><br>今日份美图：<br><img src=${imgUrl} />`;
  } catch (error) {
    console.error(error);
  }
}

const notify1 = async (contents) => {
  const token = process.env.NOTIFY
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: '来自超超的每日请安',
      content: contents,
      template: 'markdown',
    }),
  })
}

const notify2 = async (contents) => {
  const token = process.env.NOTIFYTIAN
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: '来自超超的每日请安',
      content: contents,
      template: 'markdown',
    }),
  })
}

const main = async () => {
  readLineFromFile('http://rx475xwwv.hb-bkt.clouddn.com/file.txt')
  .then(lineContent => {notify1(lineContent);notify2(lineContent)})
  .catch(error => console.error(error));
}

main()
