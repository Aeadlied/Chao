import { promises as fs } from 'fs';

async function readLineFromFile(filePath) {
  try {
    // 读取文件内容
    const data = await fs.readFile(filePath, 'utf8');
    // 将文件内容按行分割
    const lines = data.split('\n');
    // 随机生成要读取的行数
    const lineNumber = Math.floor(Math.random() * lines.length) + 1;
    // 获取指定行的内容并返回
    return lines[lineNumber - 1];
  } catch (error) {
    console.error(error);
  }
}
const notify = async (contents) => {
  const token = process.env.NOTIFY
  if (!token || !contents) return
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: '来自超超的每日请安',
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  })
}

const main = async () => {
  readLineFromFile('./file.txt')
  .then(lineContent => notify(lineContent))
  .catch(error => console.error(error));
}

main()
