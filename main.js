const glados = async () => {
  const url = './file.txt';
	fetch(url)
  .then(response => response.text())
  .then(data => {
    // 将文件内容按行分割
    const lines = data.split('\n');
    // 随机生成要读取的行数
    const lineNumber = Math.floor(Math.random() * lines.length) + 1;
    // 获取指定行的内容
    const lineContent = lines[lineNumber - 1];
	return lineContent;
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
  await notify(await glados())
}

main()
