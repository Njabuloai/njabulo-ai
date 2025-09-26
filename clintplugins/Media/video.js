const fs = require("fs");
const path = require("path");
const yts = require('yt-search');
const axios = require('axios');

const BASE_URL = 'https://noobs-api.top';

module.exports = async (context) => {
  const { client, m, text } = context;

    const formatStylishReply = (message) => {
    return `◈━━━━━━━━━━━━━━━━◈\n│❒ ${message}\n◈━━━━━━━━━━━━━━━━◈\n> Pσɯҽɾԃ Ⴆყ Tσxιƈ-ɱԃȥ`;
  };

    if (!text) {
    return client.sendMessage(
      m.chat,
      { text: formatStylishReply("Yo, drop a video name, fam! 📹 Ex: .video Alone ft Ava Max") },
      { quoted: m, ad: true }
    );
    }

      if (text.length > 100) {
    return client.sendMessage(
      m.chat,
      { text: formatStylishReply("Keep it short, homie! Video name max 100 chars. 📝") },
      { quoted: m, ad: true }
    );
      }
  

    try {
      const searchQuery = `${text} official`;
      const search = await yts(query);
      const video = search.videos[0];

      if (!video) {
        return client.sendMessage(m.chat, {
          text: 'No results found for your query.'
        }, { quoted: m, ad: true });
      }

      const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
      const fileName = `${safeTitle}.mp4`;
      const apiURL = `${BASE_URL}/api/ytmp4?url=${encodeURIComponent(video.url)}`;

      const response = await axios.get(apiURL);
      const data = response.data;

      if (!data.status || !data.result || !data.result.downloadUrl) {
        return client.sendMessage(m.chat, {
          text: 'Failed to retrieve the MP4 download link.'
        }, { quoted: m, ad: true });
      }

      const message = {
        image: { url: video.thumbnail },
        caption:
          `*VIDEO PLAYER*\n\n` +
          `╭───────────────◆\n` +
          `│⿻ *Title:* ${video.title}\n` +
          `│⿻ *Duration:* ${video.timestamp}\n` +
          `│⿻ *Views:* ${video.views.toLocaleString()}\n` +
          `│⿻ *Uploaded:* ${video.ago}\n` +
          `│⿻ *Channel:* ${video.author.name}\n` +
          `╰────────────────◆\n\n` +
          `🔗 ${video.url}`,
      };

      await client.sendMessage(m.chat, message, { quoted: m, ad: true });

      await client.sendMessage(m.chat, {
        video: { url: data.result.downloadUrl },
        mimetype: 'video/mp4',
        fileName,
        caption: '*VIDEO*'
      }, { quoted: m, ad: true });
      
    } catch (err) {
      console.error('[VIDEO] Error:', err);
      await client.sendMessage(m.chat, {
        text: 'An error occurred while processing your request.'
      }, { quoted: m, ad: true });
    }
  }
};
