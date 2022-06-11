// nameに半角スペースあったらErrorになる．
const ping = {
    name: "ping",
    description: "pong",
};
const translate = {
    name: "tl",
    description: "翻訳するよ :)",
    options: [
        {
          type: "STRING",
          name: "input",
          description: "翻訳したい文章 :)",
          required: true,
        }
    ]
}
module.exports = {
    commands: [ping, translate]
}