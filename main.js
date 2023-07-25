import { promises as fs } from 'fs';
import fetch from 'node-fetch';

async function readRemoteFile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch remote file ${url}`);
  }
  return await response.text();
}

//获取每日一问：
function getDailyWordContent() {
  return fetch("https://www.mxnzp.com/api/daily_word/recommend?count=1&app_id=bnknpcpjmpeuxpng&app_secret=8NepUiNHNsFT0sn4GExANY6hgbeEGY4h")
    .then(response => response.json())
    .then(data => {
      // 获取 data 字段的值
      const dataList = data.data;
      // 返回第一个元素的 content 值
      return dataList[0].content;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}


//{
//  "code": 1,
//    "msg": "数据返回成功",
//      "data": [
//        {
//          "picUrl": "http://www.todayonhistory.com/uploadfile/2016/0909/20160909104645350.jpg",
//          "title": "毛泽东逝世40周年纪念日",
//          "year": "2016",
//          "month": 9,
//          "day": 9,
//          "details": "毛泽东
//　　1976年9月9日，中国人民的领袖，伟大的无产阶级革命家、战略家和理论家，中国共产党、中国人民解放军和中华人民共和国的主要缔造者和领导人毛泽东逝世，享年83岁。
//          今天（2016年9月9日）是毛泽东逝世40周年纪念日，让我们一起回顾他的一生，缅怀这位伟人。
//          ..."
//        }
//      ...这里只显示了一条...
//     ]
//}
//获取历史上的今天
function getTodayInHistory() {
  return fetch("https://www.mxnzp.com/api/history/today?type=1&app_id=bnknpcpjmpeuxpng&app_secret=8NepUiNHNsFT0sn4GExANY6hgbeEGY4h")
    .then(response => response.json())
    .then(data => {
      // 获取 data 数组的值
      const dataList = data.data;
      // 定义一个空字符串，用于拼接所有的数据
      let result = "";
      // 遍历 dataList 数组中的每个元素
      for (let i = 0; i < dataList.length; i++) {
        // 获取每个元素的 title, year, month, day 和 details 字段的值
        const title = dataList[i].title;
        const year = dataList[i].year;
        const month = dataList[i].month;
        const day = dataList[i].day;
        const details = dataList[i].details;
        // 拼接这些值成一个字符串，并将其添加到 result 字符串中
        result += `【${year}年${month}月${day}日】<br>${title}<br>${details}<br><br>`;
      }
      // 返回拼接好的字符串
      return result;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
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

   // //读取句子
   // // 读取文件内容
   // const data = await readRemoteFile(filePath);
   // // 将文件内容按行分割
   // const lines = data.split('\n');
   // // 随机生成要读取的行数
   // const lineNumber = Math.floor(Math.random() * lines.length) + 1;
   // // 获取指定行的内容并返回
   //const lineContent = lines[lineNumber - 1];
   // // 使用正则表达式匹配行号和句子
   // const matchResult = lineContent.match(/^(\d+)\.\s+(.*)$/);
   // // 如果匹配成功，则返回去掉行号的句子；否则返回原始内容
   // const content = matchResult ? matchResult[2].trim() : lineContent.trim();

   ////读取图片
    //const countOfImgPath = 'http://rx475xwwv.hb-bkt.clouddn.com/CountOfImage.txt';
    //const dataCount = await readRemoteFile(countOfImgPath);
    //// 将文件内容按行分割
    //const linesCount = dataCount.split('\n');
    //const count = linesCount[0];
    //const number = Math.floor(Math.random() * count) + 1
    //const imgUrl = `http://rx475xwwv.hb-bkt.clouddn.com/img/${number}.jpg`;

   //调用API获取每日一句
    const DailyWordContent = await getDailyWordContent();
    //调用API获取历史上的今天
    const History = await getTodayInHistory();

    // 计算在一起的天数
    const now = new Date();
    const start = new Date('2023-02-04');
    const diffInDays = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
    // 计算认识的天数
    const start2 = new Date('2005-09-01');
    const diffInDays2 = Math.floor((now - start2) / (1000 * 60 * 60 * 24))  + 1;

    

    // 拼接返回值
    //return `今天是我们在一起的第${diffInDays}天\n<br>今天是我们认识的第${diffInDays2}天<br>${lineContentFace}<br><br>
    //每日一句：<br>${DailyWordContent}<br><br>历史上的今天：<br><img src=${imgUrl} />`;
    return `今天是我们在一起的第${diffInDays}天\n<br>今天是我们认识的第${diffInDays2}天<br>${lineContentFace}<br><br>
    每日一句：<br>${DailyWordContent}<br><br>历史上的今天：<br>${History}`;
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
