const axios = require("axios");
const { Webhook, MessageBuilder } = require("discord-webhook-node");

const hook = new Webhook(process.env.DISCORD_URL);

const VALUE = {
  0: null,
  1: {
    title: "오늘까지 코딩테스트 문제를 풀어주세요",
    desc: "월요일 자정까지 코딩테스트 문제를 풀어 PR을 올려주세요!",
    link: `[GITHUB 바로가기](${process.env.GITHUB_URL})`,
  },
  2: null,
  3: {
    title: "스터디 전까지 코드리뷰를 달아주세요",
    desc: "스터디 전까지 코딩테스트 문제 PR을 확인하고 코드리뷰를 달아주세요",
    link: `[GITHUB 바로가기](${process.env.GITHUB_URL})`,
  },
  4: {
    title: "조금 뒤에 스터디가 시작해요",
    desc: "7시에 스터디가 있어요",
    link: `<#${process.env.STUDY_CHANNEL_ID}>`,
  },
  5: {
    title: "코딩테스트 문제를 골라 공유해주세요",
    desc: "프로그래머스에서 문제를 골라 채널에 문제를 공유해주세요",
    link: `<#${process.env.STUDY_QUESTION_CHANNEL_ID}>`,
  },
  6: null,
};

exports.handler = async (event) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  if (!VALUE[dayOfWeek]) return;

  const embed = new MessageBuilder()
    .setTitle(VALUE[dayOfWeek].title)
    .addField(" ", "")
    .addField("", `🔗 ${VALUE[dayOfWeek].link}`)
    .addField("", "🛎 @everyone")
    .addField(" ", "")
    .setColor("#e0b88a")
    .setThumbnail("https://avatars.githubusercontent.com/u/164152763?s=200&v=4")
    .setDescription(VALUE[dayOfWeek].desc)
    .setFooter(
      "코테스터디 봇",
      "https://avatars.githubusercontent.com/u/164152763?s=200&v=4"
    )
    .setTimestamp();

  try {
    await hook.send(embed);
    console.info("디스코드 웹훅 성공");
  } catch (err) {
    console.log("error", err);
  }
};
