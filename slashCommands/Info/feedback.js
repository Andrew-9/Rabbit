const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require("ms");
module.exports = {
	name: "feedback",
  description: "Give us feedback on what you think about rabbit",
	cooldown: 5,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
		try {
        const { member, options } = interaction;
		    const { guild } = member;
        let color = client.settings.get(guild.id, `colorlike`);
        let prefix = client.settings.get(guild.id, `prefix`);
        let emoji = client.settings.get(guild.id, `emoji`);
        let SlashEmoji = client.settings.get(guild.id, `SlashEmoji`);
        let embedtimer = client.settings.get(guild.id, `embedtimer`);
         /// Timer
         let time = embedtimer;
         let timer;
         timer = ms(time)
         if(!timer || timer === undefined){timer = embedtimer}
         const embedrow = new MessageActionRow()
         .addComponents(
         new MessageButton()
         .setURL(client.global.get("global", "invite"))
         .setLabel("Invite")
         .setEmoji('924819119860224082')
         .setStyle("LINK"),
       
         new MessageButton()
         .setLabel('Support')
         .setURL(client.global.get("global", "support"))
         .setStyle('LINK')
         .setEmoji('924818382908440606'),
 
         new MessageButton()
         .setLabel('Vote')
         .setURL(client.global.get("global", "vote"))
         .setStyle('LINK')
         .setEmoji('924819119860224082'),
         )

         const end_row = new MessageActionRow()
         .addComponents(
         new MessageButton()
         .setURL(client.global.get("global", "invite"))
         .setLabel("Invite")
         .setEmoji('924819119860224082')
         .setStyle("LINK"),
       
         new MessageButton()
         .setLabel('Support')
         .setURL(client.global.get("global", "support"))
         .setStyle('LINK')
         .setEmoji('924818382908440606'),
 
         new MessageButton()
         .setLabel('Vote')
         .setURL(client.global.get("global", "vote"))
         .setStyle('LINK')
         .setEmoji('924819119860224082'),

         new MessageButton()
         .setLabel('Instagram')
         .setURL("https://www.instagram.com/fumigramapp")
         .setStyle('LINK')
         .setEmoji('924819412505223188'),
         )
       
         const startbtn = new MessageActionRow()
         .addComponents(
         new MessageButton()
         .setCustomId('feedback')
         .setLabel('Feedback')
         .setStyle('SECONDARY')
         .setEmoji('929321080462655528'),

         new MessageButton()
         .setCustomId('review')
         .setLabel('Review')
         .setStyle('SECONDARY')
         .setEmoji('928010730081493023'),

         new MessageButton()
         .setCustomId('cancelembed')
         .setLabel('Cancel Action')
         .setStyle('DANGER')
         )
         const editbutton = new MessageActionRow()
         .addComponents(
         new MessageButton()
         .setCustomId('entertitle')
         .setLabel('Title')
         .setStyle('SECONDARY')
         .setEmoji('924326256642773093'),

         new MessageButton()
         .setCustomId('description')
         .setLabel('Feedback')
         .setStyle('SECONDARY')
         .setEmoji('926552814862344223'),

         new MessageButton()
         .setCustomId('footer')
         .setLabel('Footer')
         .setStyle('SECONDARY')
         .setEmoji('925404413496012830'),

         new MessageButton()
         .setCustomId('thumbnail')
         .setLabel('Thumbnail')
         .setStyle('SECONDARY')
         .setEmoji('924730251009998848'),
         )

         const feedbutton = new MessageActionRow()
         .addComponents(
         new MessageButton()
         .setCustomId('image')
         .setLabel('Image')
         .setStyle('SECONDARY')
         .setEmoji('924302582275526736'),

         new MessageButton()
         .setCustomId('preview')
         .setLabel('Preview')
         .setStyle('PRIMARY')
         .setEmoji('926552172991221821'),

         new MessageButton()
         .setCustomId('publish')
         .setLabel('Publish')
         .setStyle('SUCCESS')
         .setEmoji('925484563952709653'),

         new MessageButton()
         .setCustomId('cancelembed')
         .setLabel('Cancel Action')
         .setStyle('DANGER')
         )
         /////
         const reviewbutton = new MessageActionRow()
         .addComponents(
         new MessageButton()
         .setCustomId('stars')
         .setLabel('stars')
         .setStyle('SECONDARY')
         .setEmoji('928010730081493023'),

         new MessageButton()
         .setCustomId('reviewmsg')
         .setLabel('Review')
         .setStyle('SECONDARY')
         .setEmoji('924326256642773093'),

         new MessageButton()
         .setCustomId('reviewpreview')
         .setLabel('Preview')
         .setStyle('SECONDARY')
         .setEmoji('926552172991221821'),

         new MessageButton()
         .setCustomId('publishreview')
         .setLabel('Publish')
         .setStyle('SUCCESS')
         .setEmoji('925484563952709653'),

         new MessageButton()
         .setCustomId('cancelembed')
         .setLabel('Cancel Action')
         .setStyle('DANGER')
         )
         ///// Empty Details
         let reviewstars = ""
         let reviewmessage = ""
         let embedtitle = ""
         let embedthumb = ""
         let embedimage = ""
         let embedfooter = ""
         let embeddescription = ""
         client.global.ensure("global", { feedbackchannel: "929169050595098634" });
         let notice = client.global.get("global", "feedbackchannel");
         let channel = client.channels.cache.get(notice);
         let m = await interaction.reply({
         content: "**<:Home:924074197540565002> What** \`report\` **do you want to give us today?**",
         components: [startbtn]
         })
         const filter = i => i.user.id === interaction.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter,  max: 20, time: timer });
         collector.on('collect', async i => {
         if (i.customId === 'feedback') {
         await i.deferUpdate();
         return interaction.editReply({
         content: "**<:R_feedback:929321080462655528> Alright.. you're giving us a feedback...**",
         components: [editbutton, feedbutton]
         })
         } 
         /// Feedback title
         else if (i.customId === 'entertitle') {
         await i.deferUpdate();
         return interaction.editReply({
         content: '**<:chatbox:924326256642773093> Feedback Embed title?**', 
         components: [editbutton, feedbutton]
         }).then(async () => {
         const filter = m => m.content
         interaction.channel.awaitMessages({ filter, max: 1, time: 180000, errors: ['time'] })
         .then(collected => {
         embedtitle = collected.first().content;
         interaction.editReply({
         content: `**${emoji} Building...**`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setTitle(embedtitle)
         ],
         components: [editbutton, feedbutton]
         });
         collected.first().delete()        
         })
         .catch(collected => {
        interaction.editReply({
         content: "**<:rabbitslash:913423874182500352> Timeout. try \`/moderation embed\`**",
         embeds: [new MessageEmbed()
         .setColor(color)
         .setTitle("OUT OF TIME")
         .setDescription(`It seems you've ran out of time\nUse \`${prefix}embed\` to restart this process`)
         ],
         components: [embedrow]
         });
         collector.stop();
         });
         });
         } 
         /// Embed Description
         else if (i.customId === 'description') {
         await i.deferUpdate();
         return interaction.editReply({ 
         content: '**<:R_reading:926552814862344223> Feedback Embed description?**', 
         components: [editbutton, feedbutton]
         }).then(async () => {
         const filter = m => m.content
         interaction.channel.awaitMessages({ filter, max: 1, time: 180000, errors: ['time'] })
         .then(collected => {
         embeddescription = collected.first().content;
         interaction.editReply({
         content: `**${emoji} Building...**`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setDescription(embeddescription)
         ],
         components: [editbutton, feedbutton]
         });
         collected.first().delete()        
         })
         .catch(collected => {
        interaction.editReply({
         content: "**<:rabbitslash:913423874182500352> Timeout. try \`/moderation embed\`**",
         embeds: [new MessageEmbed()
         .setColor(color)
         .setTitle("OUT OF TIME")
         .setDescription(`It seems you've ran out of time\nUse \`${prefix}embed\` to restart this process`)
         ],
         components: [embedrow]
         });
         collector.stop();
         });
         });
         }
         /// Embed Footer
         else if (i.customId === 'footer') {
         await i.deferUpdate();
         return interaction.editReply({
         content: '**<:CR_chat:925404413496012830> Feedback Embed footer?**', 
         components: [editbutton, feedbutton]
         }).then(async () => {
         const filter = m => m.content
         interaction.channel.awaitMessages({ filter, max: 1, time: 180000, errors: ['time'] })
         .then(collected => {
         embedfooter = collected.first().content;
         interaction.editReply({
         content: `**${emoji} Building...**`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setFooter(embedfooter)
         ],
         components: [editbutton, feedbutton]
         });
         collected.first().delete()        
         })
         .catch(collected => {
        interaction.editReply({
         content: "**<:rabbitslash:913423874182500352> Timeout. try \`/moderation embed\`**",
         embeds: [new MessageEmbed()
         .setColor(color)
         .setTitle("OUT OF TIME")
         .setDescription(`It seems you've ran out of time\nUse \`${prefix}embed\` to restart this process`)
         ],
         components: [embedrow]
         });
         collector.stop();
         });
         });
         }
         /// Embed Thumbnail
         else if (i.customId === 'thumbnail') {
         await i.deferUpdate();
         return interaction.editReply({
         content: '**<:pixel:924730251009998848> Feedback Embed thumbnail?**', 
         components: [editbutton, feedbutton]
         }).then(async () => {
         const filter = m => m.content
         interaction.channel.awaitMessages({ filter, max: 1, time: 180000, errors: ['time'] })
         .then(collected => {
         embedthumb = collected.first().content;
         if (embedthumb.includes("https") || embedthumb.includes("http")){
        interaction.editReply({
         content: `**${emoji} Building...**`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setThumbnail(embedthumb)
         ],
         components: [editbutton, feedbutton]
         });
         collected.first().delete()  
         } else {
         collected.first().delete() 
         interaction.editReply({
         content: "<:attention:924255783695314964> Embed thumbnail image must include \`https\` or \`http\`",
         components: [editbutton, feedbutton]
         });
         }      
         })
         .catch(collected => {
        interaction.editReply({
         content: "**<:rabbitslash:913423874182500352> Timeout. try \`/moderation embed\`**",
         embeds: [new MessageEmbed()
         .setColor(color)
         .setTitle("OUT OF TIME")
         .setDescription(`It seems you've ran out of time\nUse \`${prefix}embed\` to restart this process`)
         ],
         components: [embedrow]
         });
         collector.stop();
         });
         });
         }
         /// Embed Image
         else if (i.customId === 'image') {
         await i.deferUpdate();
         return interaction.editReply({
         content: '**<:Image:924302582275526736> Feedback Embed Image?**', 
         components: [editbutton, feedbutton]
         }).then(async () => {
         const filter = m => m.content
         interaction.channel.awaitMessages({ filter, max: 1, time: 180000, errors: ['time'] })
         .then(collected => {
         embedimage = collected.first().content;
         if (embedimage.includes("https") || embedimage.includes("http")){
        interaction.editReply({
         content: `**${emoji} Building...**`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setImage(embedimage)
         ],
         components: [editbutton, feedbutton]
         });
         collected.first().delete()  
         } else {
         collected.first().delete() 
         interaction.editReply({
         content: "<:attention:924255783695314964> Embed image image must include \`https\` or \`http\`",
         components: [editbutton, feedbutton]
         });
         }      
         })
         .catch(collected => {
        interaction.editReply({
         content: "**<:rabbitslash:913423874182500352> Timeout. try \`/moderation embed\`**",
         embeds: [new MessageEmbed()
         .setColor(color)
         .setTitle("OUT OF TIME")
         .setDescription(`It seems you've ran out of time\nUse \`${prefix}embed\` to restart this process`)
         ],
         components: [embedrow]
         });
         collector.stop();
         });
         });
         }
         /// Embed Preview
         else if (i.customId === 'preview') {
         await i.deferUpdate();
         interaction.editReply({
         content: "<:R_television:926552172991221821> **You embed is ready for \`Publish\`**",
         embeds: [new MessageEmbed()
         .setTitle(embedtitle)
         .setColor("#2F3136")
         .setThumbnail(embedthumb || interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
         .setImage(embedimage)
         .setFooter(embedfooter)
         .setDescription(embeddescription)
         ],
         components: [editbutton, feedbutton]
         });
         }
         /// Embed Publish
         else if (i.customId === 'publish') {
         await i.deferUpdate();
         interaction.editReply({
         content: "<:megaphone:925484563952709653> **Feedback Published**",
         embeds: [new MessageEmbed()
         .setColor("#FD6600")
         .setThumbnail("https://media.discordapp.net/attachments/711910361133219903/927997400176541736/star-rating.png")
         .setDescription(`
         > Feedback Published Successfully
         > You can create another one to infinity

         > You can view it at the support guild here <#${client.global.get("global", `feedbackchannel`)}>
         > Liking **${client.user.username}?** then give us a vote [top.gg](${client.global.get("global", "vote")})
         > And leave some \`feedback\` in our support server.
         `)
         ],
         components: [end_row]
         });
         let feedchannel = await channel.send({ 
         content: `<:R_feedback:929321080462655528> **New feedback from** <@${interaction.user.id}>`,
         embeds: [new MessageEmbed()
         .setTitle(embedtitle)
         .setColor("#2F3136")
         .setThumbnail(embedthumb || interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
         .setImage(embedimage)
         .setFooter(embedfooter)
         .setDescription(embeddescription)
         ],
         });
         await feedchannel.react(emoji); 
         await feedchannel.react("<a:MC_verif_pink:888392360231329813>"); 
         await feedchannel.react("<:R_feedback:929321080462655528>"); 
         await feedchannel.react("<:R_stars:928010730081493023>"); 
         collector.stop();
         }
         //// Start Review
         client.global.ensure("global", { reviewchannel: "929331852458725376" });
         let notice = client.global.get("global", "reviewchannel");
         let rchannel = client.channels.cache.get(notice);
         if (i.customId === 'review') {
         await i.deferUpdate();
         return interaction.editReply({
         content: "**<:R_stars:928010730081493023> Alright.. you're giving us a review...**",
         components: [reviewbutton]
         })
         } else  if (i.customId === 'stars') {
         await i.deferUpdate();
         return interaction.editReply({
         content: '**<:R_stars:928010730081493023> How many stars?**', 
         components: [reviewbutton]
         }).then(async () => {
         const filter = m => m.content
         interaction.channel.awaitMessages({ filter, max: 1, time: 180000, errors: ['time'] })
         .then(collected => {
         reviewstars = collected.first().content;
         interaction.editReply({
         content: `${emoji} Building...`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setTitle(reviewstars)
         ],
         components: [reviewbutton]
         });
         collected.first().delete()        
         })
         .catch(collected => {
        interaction.editReply({
         content: "**<:rabbitslash:913423874182500352> Timeout. try \`/moderation embed\`**",
         embeds: [new MessageEmbed()
         .setColor(color)
         .setTitle("OUT OF TIME")
         .setDescription(`It seems you've ran out of time\nUse \`${prefix}embed\` to restart this process`)
         ],
         components: [embedrow]
         });
         collector.stop();
         });
         });
         } else  if (i.customId === 'reviewmsg') {
         await i.deferUpdate();
         return interaction.editReply({
         content: '**<:CR_chat:925404413496012830> Review message?**', 
         components: [reviewbutton]
         }).then(async () => {
         const filter = m => m.content
         interaction.channel.awaitMessages({ filter, max: 1, time: 180000, errors: ['time'] })
         .then(collected => {
         reviewmessage = collected.first().content;
         interaction.editReply({
         content: `${emoji} Building...`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setDescription(reviewmessage)
         ],
         components: [reviewbutton]
         });
         collected.first().delete()        
         })
         .catch(collected => {
        interaction.editReply({
         content: "**<:rabbitslash:913423874182500352> Timeout. try \`/moderation embed\`**",
         embeds: [new MessageEmbed()
         .setColor(color)
         .setTitle("OUT OF TIME")
         .setDescription(`It seems you've ran out of time\nUse \`${prefix}embed\` to restart this process`)
         ],
         components: [embedrow]
         });
         collector.stop();
         });
         });
         } else  if (i.customId === 'reviewpreview') {
         await i.deferUpdate();
         interaction.editReply({
         content: `**<:R_television:926552172991221821> Review Preview**`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setTitle(reviewstars)
         .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
         .setDescription(reviewmessage)
         ],
         components: [reviewbutton]
         });
         } else  if (i.customId === 'publishreview') {
         await i.deferUpdate();
         interaction.editReply({
         content: "<:megaphone:925484563952709653> **Review Published**",
         embeds: [new MessageEmbed()
         .setColor("#FD6600")
         .setThumbnail("https://media.discordapp.net/attachments/711910361133219903/927997400176541736/star-rating.png")
         .setDescription(`
         > Review Published Successfully
         > You can create another one to infinity

         > You can view it at the support guild here <#${client.global.get("global", `reviewchannel`)}>
         > Liking **${client.user.username}?** then give us a vote [top.gg](${client.global.get("global", "vote")})
         > And leave some \`feedback\` in our support server.
         `)
         ],
         components: [end_row]
         });
         let rcchannel = await rchannel.send({ 
         content: `<:R_stars:928010730081493023> **New Review from** <@${interaction.user.id}>`,
         embeds: [new MessageEmbed()
         .setColor("#2F3136")
         .setTitle(reviewstars)
         .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
         .setDescription(reviewmessage)
         ],
         });
         await rcchannel.react(emoji); 
         await rcchannel.react("<a:MC_verif_pink:888392360231329813>"); 
         await rcchannel.react("<:R_feedback:929321080462655528>"); 
         await rcchannel.react("<:R_stars:928010730081493023>"); 
         collector.stop();
         }
         /// Stop the embed collector
         else if (i.customId === 'cancelembed') {
         await i.deferUpdate();
         interaction.editReply({
         content: "<:attention:924255783695314964> **This feedback \`builder\` has now been canceled...**",
         components: [embedrow]
         })
         return collector.stop();
         }
         });
		} catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.editReply({
        content: `**<:thinkingkatana:913429281353371719> An error has occured**`,
        embeds: [
        new MessageEmbed()
        .setColor("#ff0079")
        .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
        .setFooter("Error in code: Report this error to kotlin#0427")
        .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
        ],
        });
		}
	}
}