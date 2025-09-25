const fs = require('fs');
const path = require('path');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const { getSettings } = require('../../Database/config');

module.exports = {
  name: 'menu',
  aliases: ['help', 'commands', 'list'],
  description: 'Displays the Toxic-MD command menu with interactive buttons',
  run: async (context) => {
    const { client, m, mode, pict, botname, text, prefix } = context;

    if (text) {
      await client.sendMessage(
        m.chat,
        {
          text: `◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${m.pushName}, what's with the extra bullshit? Just say *${prefix}menu*, moron. 🖕\n┗━━━━━━━━━━━━━━━┛`,
        },
        { quoted: m, ad: true }
      );
      return;
    }

    const settings = await getSettings();
    const effectivePrefix = settings.prefix || '.'; // Dynamic prefix from database

    // Fancy font converter
    const toFancyFont = (text, isUpperCase = false) => {
      const fonts = {
        A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅', K: '𝙆', L: '𝙇', M: '𝙈',
        N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏', U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕',
        a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟', k: '𝙠', l: '𝙡', m: '𝙢',
        n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩', u: '𝙪', v: '𝙫', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯',
      };
      return (isUpperCase ? text.toUpperCase() : text.toLowerCase())
        .split('')
        .map((char) => fonts[char] || char)
        .join('');
    };

    // Menu text with Toxic-MD flair
    const menuText = `_______________________\n\n` +
      `🤖 *Bσƚ*: Njabulo Jb (bow down)\n` +
      `🔣 *Pɾҽϝιx*: ${effectivePrefix} (learn it, dumbass)\n` +
      `🌐 *Mσԃҽ*: ${mode} (deal with it)\n` +
      `\n________________________\n\n` +
      `*Select an option Below, Loser.* 😈`;

    // Interactive message with buttons using dynamic prefix
    const msg = generateWAMessageFromContent(
      m.chat,
      {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc?ccb=11-4&oh=01_Q5Aa2QGGiJj--6eHxoTTTTzuWtBgCrkcXBz9hN_y2s_Z1lrABA&oe=68D7901C&_nc_sid=5e03e0&mms3=true',
              mimetype: 'image/png',
              fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',
              fileLength: '1435',
              pageCount: 0,
              mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',
              fileName: 'Njabulo-Jb',
              fileEncSha256: 'ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=',
              directPath: '/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc?ccb=11-4&oh=01_Q5Aa2QGGiJj--6eHxoTTTTzuWtBgCrkcXBz9hN_y2s_Z1lrABA&oe=68D7901C&_nc_sid=5e03e0',
              mediaKeyTimestamp: '1756370084',
              jpegThumbnail: pict,
            },
            hasMediaAttachment: true,
          },
          body: { text: menuText },
          footer: { text: `Pσɯҽɾҽԃ Ⴆყ NנɐႦυℓσ נႦ` },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: 'GitHub Repo',
                  url: 'https://njabulo-repo.vercel.app',
                  merchant_url: 'https://njabulo-repo.vercel.app',
                }),
              },
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'VIEW OPTIONS',
                  sections: [
                    {
                      title: '🔥 CORE COMMANDS',
                      highlight_label: '© Njabulo Jb',
                      rows: [
                        { title: '📜 FULL MENU', description: 'Show all commands', id: `${effectivePrefix}fullmenu` },
                        { title: '⚠️ DEV', description: "Send developer's contact", id: `${effectivePrefix}dev` },
                      ],
                    },
                    {
                      title: 'ℹ BOT INFO',
                      highlight_label: '© Njabulo Jb',
                      rows: [
                        { title: '🔥 PING', description: 'Check bot speed', id: `${effectivePrefix}ping` },
                        { title: '💯 REPO', description: 'Get bot repository', id: `${effectivePrefix}repo` },
                      ],
                    },
                  ],
                }),
              },
            ],
            messageParamsJson: JSON.stringify({
              limited_time_offer: {
                text: 'Njabulo-Jb',
                url: 'https://njabulo-repo.vercel.app',
                copy_code: 'NjabuloJb',
                expiration_time: Date.now() * 1000,
              },
              bottom_sheet: {
                in_thread_buttons_limit: 2,
                divider_indices: [1, 2],
                list_title: 'Select Command',
                button_title: 'Njabulo-Jb',
              },
            }),
          },
          contextInfo: {
            externalAdReply: {
              title: "Njabulo Jb",
              body: `Yo, ${m.pushName}! Ready to fuck shit up?`,
              mediaType: 1,
              thumbnail: pict,
              mediaUrl: '',
              sourceUrl: 'https://github.com/NjabuloJ/Njabulo-Jb',
              showAdAttribution: false,
              renderLargerThumbnail: true,
            },
          },
        },
      },
      { quoted: m }
    );

    await client.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    // Audio message logic
    const possibleAudioPaths = [
      path.join(__dirname, 'xh_clinton', 'menu.mp3'),
      path.join(process.cwd(), 'xh_clinton', 'menu.mp3'),
      path.join(__dirname, '..', 'xh_clinton', 'menu.mp3'),
    ];

    let audioPath = null;
    for (const possiblePath of possibleAudioPaths) {
      if (fs.existsSync(possiblePath)) {
        audioPath = possiblePath;
        break;
      }
    }

    if (audioPath) {
      await client.sendMessage(
        m.chat,
        {
          audio: { url: audioPath },
          ptt: true,
          mimetype: 'audio/mpeg',
          fileName: 'menu.mp3',
        },
        { quoted: m }
      );
    }
  },
};
