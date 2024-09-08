"use client";
import React from "react";
import Encode from "@/components/encode";

const Prefix = "习近平总书记指出：“要"
const Suffix = "。”"
const Separator = "，"
const SentenceDic = [
  "坚持中国共产党领导",                //0 
  "高举中国特色社会主义伟大旗帜",       //1
  "全面建设社会主义现代化国家",         //2
  "坚持以人民为中心的发展思想",         //3
  "推进文化自信自强",                  //4
  "实现全体人民共同富裕",              //5 
  "发展全过程人民民主",                //6 
  "实施科教兴国战略",                  //7 
  "推进国家安全体系和能力现代化",       //8
  "实现建军一百年奋斗目标",            //9 
  "坚持和完善一国两制",                //10
  "促进世界和平与发展",                //11
  "推动构建人类命运共同体",            //12
  "坚定不移全面从严治党",              //13
  "丰富人民精神世界",                 //14
  "全面推进乡村振兴",                 //15
  "牢牢把握改革开放的前进方向",        //16
]

function Xi() {
  return <Encode encode={encode} decode={decode} />;
}

function stringToUtf8ByteArray(str: string) {
  var utf8 = new TextEncoder().encode(str);
  var singleHex: Array<number> = [];
  Array.from(utf8).forEach(function (byte) {
    singleHex.push(Math.floor(byte / 16))
    singleHex.push(byte % 16)
  });
  return singleHex;
}

function hexArrayToString(arr: number[]) {
  var byteArr = new Uint8Array(arr.length / 2);
  for (let i = 0; i < arr.length / 2; i++) {
    const e1 = arr[i*2];
    const e2 = arr[i*2+1];
    byteArr[i] = (e1*16+e2);
  }
  var utf8 = new TextDecoder();
  return utf8.decode(byteArr);
}

function getPesudoRandomNumbers(count: number) {
  var p = 114514;
  var res: Array<number> = [];
  for (let i = 0; i < count; i++) {
    p = (p * 656429 + 666666) % (1e9+7);
    res.push(p % 16);
  }
  return res;
}

function reMap(arr: Array<number>) {
  var mask = getPesudoRandomNumbers(arr.length);
  return arr.map((x,i)=>(x^mask[i]))
}

function encode(str: string): string {
  var last = -1;
  var arr = stringToUtf8ByteArray(str);
  var arr = reMap(arr);
  var Content: Array<string> = [];
  arr.forEach(cp => {
    if (last == cp){
      Content.push(SentenceDic[16]);
      Content.push(SentenceDic[cp]);
    }
    else {
      Content.push(SentenceDic[cp]);
    }
    last = cp;
  });
  return (Prefix + Content.join(Separator) + Suffix);
}

function decode(str: string): string {
  var cleaned = str.replaceAll(/[ ：“”".。]/g, "").replace(",", "，");
  var prefix = Prefix.replaceAll(/[ ：“”".。]/g, "");
  if (!cleaned.startsWith(prefix))
    return "【格式错误】";
  cleaned = cleaned.replace(prefix, "");
  var arr = cleaned.split(Separator);
  var cp_arr: number[] = [];
  arr.forEach(sen => {
    var idx = SentenceDic.findIndex(x=>x==sen);
    if (idx != -1){
      if (idx != 16){
        cp_arr.push(idx);
      }
    }
  });
  if (cp_arr.length == 0)
    return "【无效数据】";
  if (cp_arr.length % 2 == 1)
    return "【无效数据】";
  cp_arr = reMap(cp_arr);

  return hexArrayToString(cp_arr);
}

export default Xi;
