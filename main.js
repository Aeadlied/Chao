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

//获取历史上的今天
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
  return fetch("https://www.mxnzp.com/api/history/today?type=0&app_id=bnknpcpjmpeuxpng&app_secret=8NepUiNHNsFT0sn4GExANY6hgbeEGY4h")
    .then(response => response.json())
    .then(data => {
      // 获取 data 数组的值
      const dataList = data.data;
      // 定义一个空字符串，用于拼接所有的数据
      let result = "";
      // 遍历 dataList 数组中的每个元素
      const length = dataList.length;
      for (let i = 0; i < dataList.length; i++) {
        // 获取每个元素的 title, year, month, day 和 details 字段的值
        const picUrl = dataList[i].picUrl;
        const title = dataList[i].title;
        const year = dataList[i].year;
        const month = dataList[i].month;
        const day = dataList[i].day;
        //const details = dataList[i].details;
        // 拼接这些值成一个字符串，并将其添加到 result 字符串中
        /* result += `【${year}年${month}月${day}日】<br><img src=${picUrl} /><br>${title}<br><br>`;*/
         result += `【${year}年${month}月${day}日】<br>${title}<br><br>`;
      }
      // 返回拼接好的字符串
      return result;
    })
    .catch(error => {
      console.log(error);
      return length;
    });
}

//获取每日壁纸
function getTodayPic() {
  return fetch("https://bing.biturl.top")
    .then(response => response.json())
    .then(data => {
      // 获取url
      const url = data.url;
      const copyright = data.copyright;
      let result = "";
      result += `今日份壁纸：<br><img src='${url}' /><br>${copyright}<br><br>`;
      // 返回拼接好的字符串
      return result;
    })
    .catch(error => {
      console.log(error);
      return length;
    });
}

//获取一句一言：
function getYJYY() {
  return fetch("https://api.vvhan.com/api/ian?type=json")
    .then(response => response.json())
    .then(data => {
      // 获取 data 字段的值
      const dataList = data.data;
      const sentence = dataList.vhan;
      const source = dataList.source;
      let result = "";
      result += `今日份一句一言：<br>${sentence}<br>——《${source}》<br><br>`;
      return result;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

//获取每日励志英文
function getLJYW() {
  return fetch("https://api.vvhan.com/api/en")
    .then(response => response.json())
    .then(data => {
      // 获取 data 字段的值
      const dataList = data.data;
      const en = dataList.en;
      const zh = dataList.zh;
      let result = "";
      result += `今日份励志英文：<br>${en}<br>${zh}<br><br>`;
      return result;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

//获取摸鱼人日历
function getMoyu() {
  return fetch("https://api.vvhan.com/api/moyu?type=json")
    .then(response => response.json())
    .then(data => {
      // 获取 data 字段的值
      const url = data.url;
      let result = "";
      result += `摸鱼人日历：<br><img src='${url}' /><br><br>`;
      return result;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

//获取星座运势天天的
function getXZ_TT() {
  return fetch("https://api.vvhan.com/api/horoscope?type=cancer&time=today")
    .then(response => response.json())
    .then(data => {
      const dataAll = data.data;
      const title = dataAll.title;
      const yi = dataAll.todo.yi;
      const ji = dataAll.todo.ji;
      const shortcomment = dataAll.shortcomment;
      const alln = dataAll.index.all;
      const allt = dataAll.fortunetext.all;
      const loven = dataAll.index.love;
      const lovet = dataAll.fortunetext.love;
      const workn = dataAll.index.work;
      const workt = dataAll.fortunetext.work;
      const moneyn = dataAll.index.money;
      const moneyt = dataAll.fortunetext.money;
      const healthn = dataAll.index.health;
      const healtht = dataAll.fortunetext.health;
      const luckynumber = dataAll.luckynumber;
      const luckycolor = dataAll.luckycolor;
      const luckyconstellation = dataAll.luckyconstellation;
      let result = "";
      result += `每日星座运势，天天的：<br>
      【${title}】<br>
      宜：${yi}<br>
      忌：${ji}<br>
      短评：${shortcomment}<br>
      幸运数字：${luckynumber}<br>
      幸运颜色：${luckycolor}<br>
      幸运搭档：${luckyconstellation}<br><br>
      今日运势：<br>
      【总体，指数${alln}】：<br>${allt}<br><br>
      【爱情，指数${loven}】：<br>${lovet}<br><br>
      【工作，指数${workn}】：<br>${workt}<br><br>
      【财富，指数${moneyn}】：<br>${moneyt}<br><br>
      【健康，指数${healthn}】：<br>${healtht}<br><br>`;
      return result;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

//获取星座运势超超的
function getXZ_CC() {
  return fetch("https://api.vvhan.com/api/horoscope?type=aries&time=today")
    .then(response => response.json())
    .then(data => {
      const dataAll = data.data;
      const title = dataAll.title;
      const yi = dataAll.todo.yi;
      const ji = dataAll.todo.ji;
      const shortcomment = dataAll.shortcomment;
      const alln = dataAll.index.all;
      const allt = dataAll.fortunetext.all;
      const loven = dataAll.index.love;
      const lovet = dataAll.fortunetext.love;
      const workn = dataAll.index.work;
      const workt = dataAll.fortunetext.work;
      const moneyn = dataAll.index.money;
      const moneyt = dataAll.fortunetext.money;
      const healthn = dataAll.index.health;
      const healtht = dataAll.fortunetext.health;
      const luckynumber = dataAll.luckynumber;
      const luckycolor = dataAll.luckycolor;
      const luckyconstellation = dataAll.luckyconstellation;
      let result = "";
      result += `每日星座运势，超超的：<br>
      【${title}】<br>
      宜：${yi}<br>
      忌：${ji}<br>
      短评：${shortcomment}<br>
      幸运数字：${luckynumber}<br>
      幸运颜色：${luckycolor}<br>
      幸运搭档：${luckyconstellation}<br<br>
      今日运势：<br>
      【总体，指数${alln}】：<br>${allt}<br><br>
      【爱情，指数${loven}】：<br>${lovet}<br><br>
      【工作，指数${workn}】：<br>${workt}<br><br>
      【财富，指数${moneyn}】：<br>${moneyt}<br><br>
      【健康，指数${healthn}】：<br>${healtht}<br><br>`;
      return result;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

//60秒读懂世界
function getNews() {
  return fetch("https://api.vvhan.com/api/60s?type=json")
    .then(response => response.json())
    .then(data => {
      // 获取 data 字段的值
      const url = data.imgUrl;
      let result = "";
      result += `每天60秒读懂世界：<br><img src='${url}' /><br><br>`;
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
    const facePath = './face.txt';
    const dataFace = await fs.readFile(facePath, 'utf8');
    // 将文件内容按行分割
    const linesFace = dataFace.split('\n');
    // 随机生成要读取的行数
    const lineNumberFace = Math.floor(Math.random() * linesFace.length) + 1;
    // 获取指定行的内容
    const lineContentFace = linesFace[lineNumberFace - 1];

    // 计算在一起的天数
    const now = new Date();
    const start = new Date('2023-02-04');
    const diffInDays = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
    // 计算认识的天数
    const start2 = new Date('2005-09-01');
    const diffInDays2 = Math.floor((now - start2) / (1000 * 60 * 60 * 24)) + 1;

   //调用API获取每日一句一言
    const DailyWordContent = await getYJYY();
    //调用API获取历史上的今天
    const History = await getTodayInHistory();
    //调用API获取壁纸
    const picurl = await getTodayPic();
    const engilsh = await getLJYW();
    const moyu = await getMoyu();
    const xingzuo_tt = await getXZ_TT();
    const xingzuo_cc = await getXZ_CC();
    const news = await getNews();

    // 拼接返回值
    return `今天是我们在一起的第${diffInDays}天\n<br>今天是我们认识的第${diffInDays2}天<br>${lineContentFace}<br><br><br>
    ${DailyWordContent}<br>
    ${engilsh}<br>
    ${moyu}<br>
    ${xingzuo_tt}<br>
    ${xingzuo_cc}<br>
    ${news}<br>
    ${picurl}<br>
    历史上的今天：<br>${History}`;
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
